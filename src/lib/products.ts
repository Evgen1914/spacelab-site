// Каталог homeb — данные из каталога «Коллекция 2026» (Homeb_katalog_2026.pdf).
// Цены, размеры и цвета правятся здесь.

export type Swatch = {
  id: string;
  name: string;
  note?: string; // мелкая подпись: «шпон», «металл», «глянец / мат»
  hex?: string; // цвет кружка-образца
  texture?: string; // фото фактуры вместо цвета
  images?: string[]; // фото, которые показываются при выборе этого варианта
};

// готовое сочетание столешницы и основания (у Axis — стр. 12 каталога)
export type Variant = {
  id: string;
  top: string;
  finish: string;
  base: string;
  image: string;
};

export type Size = { id: string; size: string; seats: string; price: number };

export type Product = {
  slug: string;
  index: string;
  name: string;
  type: string; // «обеденный стол» — курсивом под названием
  short: string; // коротко о форме: «опора-ветвь»
  lead: string; // первая фраза описания
  description: string[];
  badge?: string;
  shape: "rect" | "oval";
  materials: ("ceramic" | "wood" | "metal")[];
  cutout: string; // стол на белом фоне
  images: string[];
  drawing: string;
  sizes: Size[];
  top: { name: string; note?: string; texture?: string };
  colors: { label: string; options: Swatch[] };
  variants?: Variant[];
  specs: { label: string; value: string }[];
  detail: { eyebrow: string; title: string; text: string; images: { src: string; caption: string }[] };
};

const img = (slug: string, name: string) => `/img/${slug}/${name}.jpg`;

const size = (len: 1400 | 1600 | 1800, price: number): Size => ({
  id: String(len),
  size: `${len}×${len === 1800 ? 900 : 800}×750`,
  seats: { 1400: "4 персоны", 1600: "4–6 персон", 1800: "6–8 персон" }[len],
  price,
});

// рисунки керамогранита (для Axis — на выбор)
export const slabs: Swatch[] = [
  { id: "white", name: "Белый мрамор", note: "глянец / мат", texture: "/img/slabs/white.jpg" },
  { id: "graphite", name: "Белый с графитом", note: "керамогранит", texture: "/img/slabs/graphite.jpg" },
  { id: "sand", name: "Песочный камень", note: "керамогранит", texture: "/img/slabs/sand.jpg" },
  { id: "grey", name: "Серо-белый камень", note: "керамогранит", texture: "/img/slabs/grey.jpg" },
];

export const products: Product[] = [
  {
    slug: "scandi",
    index: "01",
    name: "Scandi",
    type: "обеденный стол",
    short: "опора-ветвь",
    lead: "Дизайн стола напоминает скандинавский стиль.",
    description: [
      "Прямоугольный стол со светлой глянцевой столешницей и мягко закруглёнными краями. Столешница выполнена из 12 мм керамогранита и деревянной подложки.",
      "Основание из шпонированного дерева с фигурными опорами в скандинавском стиле. Изгиб и тонкие ножки делают стол лёгким на вид, а четыре точки опоры — устойчивым.",
    ],
    shape: "rect",
    materials: ["ceramic", "wood"],
    cutout: img("scandi", "cutout"),
    images: [
      img("scandi", "walnut-room"),
      img("scandi", "studio"),
      img("scandi", "walnut-top"),
      img("scandi", "walnut-leg"),
      img("scandi", "walnut-2"),
      img("scandi", "black-room"),
      img("scandi", "light-1"),
      img("scandi", "light-2"),
      img("scandi", "black-2"),
      img("scandi", "walnut-3"),
    ],
    drawing: "/img/scandi/drawing.png",
    sizes: [size(1400, 50160), size(1600, 53040), size(1800, 56520)],
    top: { name: "Светлый мрамор", note: "керамогранит", texture: "/img/slabs/white.jpg" },
    colors: {
      label: "Основание",
      options: [
        {
          id: "walnut",
          name: "Орех",
          hex: "#7b5537",
          images: [img("scandi", "walnut-room"), img("scandi", "studio"), img("scandi", "walnut-top"), img("scandi", "walnut-leg")],
        },
        { id: "black", name: "Чёрное дерево", hex: "#1f1c19", images: [img("scandi", "black-room"), img("scandi", "black-2")] },
        { id: "light", name: "Светлое дерево", hex: "#d9c4a3", images: [img("scandi", "light-1"), img("scandi", "light-2")] },
      ],
    },
    specs: [
      { label: "Столешница", value: "Керамогранит 12 мм на подложке из дерева" },
      { label: "Основание", value: "Шпонированное дерево, фигурные опоры" },
      { label: "Высота", value: "750 мм" },
    ],
    detail: {
      eyebrow: "Детали",
      title: "Тёплое дерево, холодный камень",
      text: "Деревянное основание контрастирует со светлой столешницей. Такое сочетание подходит и к скандинавскому интерьеру, и к строгому минимализму.",
      images: [
        { src: img("scandi", "walnut-leg"), caption: "Опора-ветвь, орех" },
        { src: img("scandi", "black-room"), caption: "Чёрное дерево в интерьере" },
      ],
    },
  },
  {
    slug: "duna",
    index: "02",
    name: "Duna",
    type: "обеденный стол",
    short: "скрещённые арки",
    lead: "Две арки, скрещённые под столешницей, — скульптурное основание, которое видно с любой стороны.",
    description: [
      "Столешница из керамогранита 12 мм на деревянной подложке — белый камень с выразительными серыми прожилками.",
      "Опоры из шпонированного дерева в чёрном цвете: две плавные арки перекрещиваются и оставляют по бокам место для стульев.",
    ],
    shape: "rect",
    materials: ["ceramic", "wood"],
    cutout: img("duna", "cutout"),
    images: [
      img("duna", "top"),
      img("duna", "cutout"),
      img("duna", "cross"),
      img("duna", "front"),
      img("duna", "room-1"),
      img("duna", "room-2"),
      img("duna", "room-3"),
      img("duna", "room-4"),
    ],
    drawing: "/img/duna/drawing.png",
    sizes: [size(1400, 52440), size(1600, 55800), size(1800, 59400)],
    top: { name: "Белый мрамор", note: "керамогранит", texture: "/img/slabs/white.jpg" },
    colors: { label: "Основание", options: [{ id: "black", name: "Чёрное дерево", note: "шпон", hex: "#1f1c19" }] },
    specs: [
      { label: "Столешница", value: "Керамогранит 12 мм на подложке из дерева" },
      { label: "Основание", value: "Шпонированное дерево" },
      { label: "Высота", value: "750 мм" },
    ],
    detail: {
      eyebrow: "Детали",
      title: "Перекрестье опор",
      text: "Опоры повторяют форму друг друга и перекрещиваются в центре. Текстура шпона видна вблизи, а издалека основание читается как единый графичный силуэт.",
      images: [
        { src: img("duna", "cross"), caption: "Перекрестье опор, шпон" },
        { src: img("duna", "front"), caption: "Вид спереди" },
      ],
    },
  },
  {
    slug: "kona",
    index: "03",
    name: "Kona",
    type: "овальный обеденный стол",
    short: "овальный · колонны",
    lead: "Овальная столешница на двух рифлёных колоннах — мягкая форма без острых углов.",
    description: [
      "Столешница из керамогранита 12 мм на подложке из МДФ 15 мм — белый камень с яркими графитовыми и золотистыми прожилками.",
      "Две опоры-колонны из МДФ с вертикальным рифлением и тонкой золотистой окантовкой у пола. Овальная форма удобна для большой компании: за столом нет «неудобных» мест.",
    ],
    shape: "oval",
    materials: ["ceramic"],
    cutout: img("kona", "cutout"),
    images: [
      img("kona", "room"),
      img("kona", "cutout"),
      img("kona", "column"),
      img("kona", "dark"),
      img("kona", "top"),
      img("kona", "room-2"),
      img("kona", "green"),
    ],
    drawing: "/img/kona/drawing.png",
    sizes: [size(1600, 55200), size(1800, 57600)],
    top: { name: "Мрамор с прожилками", note: "керамогранит", texture: "/img/slabs/graphite.jpg" },
    colors: { label: "Основание", options: [{ id: "cream", name: "Сливочный", note: "рифление", hex: "#e4d9c6" }] },
    specs: [
      { label: "Столешница", value: "Керамогранит 12 мм, подложка МДФ 15 мм" },
      { label: "Основание", value: "МДФ, рифлёные колонны" },
      { label: "Высота", value: "750 мм" },
    ],
    detail: {
      eyebrow: "Детали",
      title: "Камень и рифление",
      text: "Рисунок керамогранита у каждой столешницы свой. Рифление колонн собирает свет и тень, поэтому основание выглядит живым при любом освещении.",
      images: [
        { src: img("kona", "column"), caption: "Рифлёная колонна" },
        { src: img("kona", "dark"), caption: "Kona в интерьере" },
      ],
    },
  },
  {
    slug: "axis",
    index: "04",
    name: "Axis",
    type: "обеденный стол",
    short: "металлический X",
    lead: "Самая популярная модель: керамогранит на металлическом основании в форме буквы X.",
    description: [
      "Столешница из керамогранита 12 мм на подложке из МДФ 15 мм. Доступна в нескольких цветах камня.",
      "Металлическое основание: две скрещённые опоры на широкой плите. Ножки не мешают коленям, стулья можно ставить с любой стороны.",
    ],
    badge: "Хит",
    shape: "rect",
    materials: ["ceramic", "metal"],
    cutout: img("axis", "cutout"),
    images: [
      img("axis", "beige-room"),
      img("axis", "black-room-2"),
      img("axis", "studio-black"),
      img("axis", "black-room"),
      img("axis", "studio-beige"),
      img("axis", "beige-room-2"),
    ],
    drawing: "/img/axis/drawing.png",
    sizes: [size(1400, 40500), size(1600, 43200), size(1800, 44160)],
    top: { name: "4 рисунка камня", note: "керамогранит" },
    colors: {
      label: "Основание",
      options: [
        { id: "black", name: "Чёрный", note: "металл", hex: "#1f1c19" },
        { id: "beige", name: "Беж", note: "металл", hex: "#b9a283" },
      ],
    },
    variants: [
      { id: "graphite-black", top: "Белый с графитом", finish: "глянец", base: "чёрное", image: img("axis", "v-graphite-black") },
      { id: "white-beige", top: "Белый мрамор", finish: "глянец", base: "беж", image: img("axis", "v-white-beige") },
      { id: "sand-beige", top: "Песочный камень", finish: "глянец", base: "беж", image: img("axis", "v-sand-beige") },
      { id: "grey-beige", top: "Серо-белый камень", finish: "глянец", base: "беж", image: img("axis", "v-grey-beige") },
      { id: "white-black", top: "Белый мрамор", finish: "глянец", base: "чёрное", image: img("axis", "v-white-black") },
      { id: "white-matte-black", top: "Белый мрамор", finish: "матовая", base: "чёрное", image: img("axis", "v-white-matte-black") },
    ],
    specs: [
      { label: "Столешница", value: "Керамогранит 12 мм, подложка МДФ 15 мм" },
      { label: "Основание", value: "Металл, X-опора на плите" },
      { label: "Высота", value: "750 мм" },
    ],
    detail: {
      eyebrow: "Два цвета основания",
      title: "Чёрный или беж",
      text: "Чёрное основание делает стол графичным, бежевое — мягким и почти невесомым. Столешница остаётся главным акцентом в обоих вариантах.",
      images: [
        { src: img("axis", "black-room"), caption: "Чёрное основание" },
        { src: img("axis", "beige-room"), caption: "Бежевое основание" },
      ],
    },
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const minPrice = (p: Product) => Math.min(...p.sizes.map((s) => s.price));

export const rub = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;

export const formatFrom = (p: Product) => `от ${rub(minPrice(p))}`;
