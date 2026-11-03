// Контакты из каталога «Коллекция 2026».
// Чтобы добавить Instagram или почту — допишите строку в contacts, она сама появится в меню и в подвале.
export const PHONE = "+7 985 856-17-35";
export const PHONE_RAW = "79858561735";
export const WHATSAPP = `https://wa.me/${PHONE_RAW}`;

export const contacts: { label: string; value: string; href: string }[] = [
  { label: "Телефон", value: PHONE, href: `tel:+${PHONE_RAW}` },
  { label: "WhatsApp", value: PHONE, href: WHATSAPP },
  { label: "Telegram", value: PHONE, href: `https://t.me/+${PHONE_RAW}` },
  // { label: "Instagram", value: "@homeb", href: "https://instagram.com/homeb" },
  // { label: "Почта", value: "hello@homeb.ru", href: "mailto:hello@homeb.ru" },
];
