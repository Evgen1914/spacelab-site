// Каталог Space.Lab. Названия моделей и столешниц — рабочие, их можно поменять здесь.

export type Swatch = {
  id: string;
  name: string;
  hex?: string; // цвет кружка-образца
  texture?: string; // фото фактуры вместо цвета
  images?: string[]; // фото, которые показываются при выборе этого варианта
};

export type Product = {
  slug: string;
  index: string;
  name: string;
  type: string;
  tagline: string;
  description: string;
  badge?: string;
  price?: number; // пусто — «цена по запросу»
  shape: "rect" | "oval";
  materials: ("ceramic" | "wood" | "metal")[];
  images: string[];
  drawing?: string;
  sizes: string[];
  colors?: { label: string; options: Swatch[] };
  tops?: { label: string; options: Swatch[]; note?: string };
  specs: { label: string; value: string }[];
};

const img = (slug: string, n: number) => `/img/${slug}/${String(n).padStart(2, "0")}.jpg`;

export const slabs: Swatch[] = [
  { id: "calacatta", name: "Calacatta", texture: "/img/slabs/calacatta.jpg" },
  { id: "grigio", name: "Grigio", texture: "/img/slabs/grigio.jpg" },
  { id: "patagonia", name: "Patagonia", texture: "/img/slabs/patagonia.jpg" },
  { id: "statuario", name: "Statuario", texture: "/img/slabs/statuario.jpg" },
];

export const products: Product[] = [
  {
    slug: "arbor",
    index: "01",
    name: "Arbor",
    type: "Обеденный стол",
    tagline: "Ветвь, которая держит стол",
    description:
      "Опоры Arbor расходятся, как ветви дерева, и держат стол легко, почти без усилия. Тёплое дерево и светлая столешница подходят и для сканди-интерьера, и для минимализма.",
    shape: "rect",
    materials: ["wood"],
    images: [img("arbor", 0), img("arbor", 5), img("arbor", 4), img("arbor", 6), img("arbor", 3), img("arbor", 1)],
    drawing: img("arbor", 2),
    sizes: ["140 × 80 × 75", "160 × 80 × 75", "180 × 90 × 75"],
    colors: {
      label: "Дерево",
      options: [
        { id: "light", name: "Светлое дерево", hex: "#d9c4a3", images: [img("arbor", 0), img("arbor", 5), img("arbor", 4)] },
        { id: "walnut", name: "Орех", hex: "#7b5537", images: [img("arbor", 6), img("arbor", 7), img("arbor", 3)] },
        { id: "black", name: "Чёрное дерево", hex: "#1f1c19", images: [img("arbor", 1)] },
      ],
    },
    specs: [
      { label: "Основание", value: "Массив дерева" },
      { label: "Столешница", value: "Светлая, один цвет — как на фото" },
      { label: "Высота", value: "75 см" },
    ],
  },
  {
    slug: "noir",
    index: "02",
    name: "Noir",
    type: "Обеденный стол",
    tagline: "Графика чёрного дерева",
    description:
      "Скрещённые опоры из шпонированного дерева выглядят как скульптура. Белая столешница из керамогранита на их фоне кажется ещё светлее.",
    shape: "rect",
    materials: ["ceramic", "wood"],
    images: [img("noir", 5), img("noir", 4), img("noir", 3), img("noir", 1), img("noir", 2)],
    drawing: img("noir", 0),
    sizes: ["160 × 80 × 75", "180 × 90 × 75"],
    specs: [
      { label: "Столешница", value: "Керамогранит 12 мм с подложкой из дерева" },
      { label: "Опоры", value: "Шпонированное дерево" },
      { label: "Цвет", value: "Чёрное дерево, белая столешница" },
    ],
  },
  {
    slug: "colonna",
    index: "03",
    name: "Colonna",
    type: "Овальный обеденный стол",
    tagline: "Две колонны и мягкий овал",
    description:
      "Рифлёные колонны с латунным кольцом у пола и овальная столешница из керамогранита. Стол без острых углов, за которым удобно и вдвоём, и большой компанией.",
    shape: "oval",
    materials: ["ceramic"],
    images: [img("colonna", 4), img("colonna", 0), img("colonna", 2), img("colonna", 3), img("colonna", 5)],
    drawing: img("colonna", 1),
    sizes: ["160 × 80 × 75", "180 × 90 × 75"],
    specs: [
      { label: "Столешница", value: "Керамогранит 12 мм" },
      { label: "Подложка", value: "МДФ 15 мм" },
      { label: "Опоры", value: "МДФ, рифлёная поверхность" },
    ],
  },
  {
    slug: "axis",
    index: "04",
    name: "Axis",
    type: "Обеденный стол",
    tagline: "Самая популярная модель",
    badge: "Бестселлер",
    description:
      "Металлическое X-основание и большая плоскость керамогранита. Цвет опоры и рисунок камня собираются под ваш интерьер.",
    shape: "rect",
    materials: ["ceramic", "metal"],
    images: [img("axis", 0), img("axis", 1)],
    sizes: [],
    colors: {
      label: "Опора",
      options: [
        { id: "beige", name: "Беж", hex: "#c9b79c", images: [img("axis", 0)] },
        { id: "black", name: "Чёрный", hex: "#1f1c19", images: [img("axis", 1)] },
      ],
    },
    tops: { label: "Столешница", options: slabs, note: "Больше вариантов камня — по запросу" },
    specs: [
      { label: "Столешница", value: "Керамогранит 12 мм" },
      { label: "Подложка", value: "МДФ 15 мм" },
      { label: "Опора", value: "Металл, чёрный или беж" },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatPrice = (p?: number) =>
  p ? `${p.toLocaleString("ru-RU")} ₽` : "Цена по запросу";
