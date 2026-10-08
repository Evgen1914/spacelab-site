// Приём заявки из корзины: отправка в Telegram и на почту.
// Пока переменные окружения не заданы, заявка просто пишется в лог сервера (демо-режим).
//
// TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID — бот и чат, куда слать заявки
// TELEGRAM_API_BASE — адрес Cloudflare-релея, если хостинг блокирует api.telegram.org
// RESEND_API_KEY, ORDER_EMAIL_TO, ORDER_EMAIL_FROM — дубль заявки на почту через Resend

type Item = { name: string; qty: number; options: { label: string; value: string }[] };
type Order = { name?: string; phone?: string; email?: string; contact?: string; comment?: string; items?: Item[] };

const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);

function format(o: Order) {
  const items = (o.items ?? [])
    .map((i, n) => `${n + 1}. <b>${esc(i.name)}</b> × ${i.qty}\n${i.options.map((x) => `   ${esc(x.label)}: ${esc(x.value)}`).join("\n")}`)
    .join("\n\n");
  const contacts = [
    `Имя: ${esc(o.name ?? "")}`,
    `Телефон: ${esc(o.phone ?? "")}`,
    o.email && `Email: ${esc(o.email)}`,
    `Связаться: ${esc(o.contact ?? "")}`,
    o.comment && `Комментарий: ${esc(o.comment)}`,
  ].filter(Boolean);
  return ["🪑 <b>Новая заявка Space.Lab</b>", contacts.join("\n"), items].join("\n\n");
}

export async function POST(req: Request) {
  const order = (await req.json().catch(() => null)) as Order | null;
  if (!order?.name?.trim() || !order.phone?.trim() || !order.items?.length) {
    return Response.json({ ok: false, error: "Заполните имя, телефон и добавьте товары" }, { status: 400 });
  }

  const text = format(order);
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, TELEGRAM_API_BASE, RESEND_API_KEY, ORDER_EMAIL_TO, ORDER_EMAIL_FROM } = process.env;
  const jobs: Promise<Response>[] = [];

  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    const base = TELEGRAM_API_BASE || "https://api.telegram.org";
    jobs.push(
      fetch(`${base}/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: "HTML" }),
      }),
    );
  }

  if (RESEND_API_KEY && ORDER_EMAIL_TO) {
    jobs.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: ORDER_EMAIL_FROM || "Space.Lab <onboarding@resend.dev>",
          to: ORDER_EMAIL_TO,
          subject: `Заявка Space.Lab — ${order.name}`,
          html: text.replace(/\n/g, "<br>"),
        }),
      }),
    );
  }

  if (jobs.length === 0) {
    console.log("[order] демо-режим, каналы не настроены:\n" + text);
    return Response.json({ ok: true, demo: true });
  }

  const results = await Promise.allSettled(jobs);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value.ok);
  if (!delivered) console.error("[order] не доставлено", results);
  return Response.json({ ok: delivered }, { status: delivered ? 200 : 502 });
}
