// Каталог homeb — данные из каталога «Коллекция 2026» (исходник: homeb_katalog_source.zip → gen.py).
// Цены, размеры и цвета правятся здесь.

export type Swatch = {
  id: string;
  name: string;
  note?: string; // мелкая подпись: «шпон», «металл», «глянец / мат»
  hex?: string; // цвет кружка-образца
  texture?: string; // фото фактуры вместо цвета
  images?: string[]; // фото, которые показываются при выборе этого варианта
};

// готовое сочетание столешницы и основания (у Axis)
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
  category: "table" | "chair";
  index: string;
  name: string;
  type: string; // «обеденный стол» — курсивом под названием
  short: string; // коротко о форме: «опора-ветвь»
  lead: string; // первая фраза описания
  description: string[];
  badge?: "Хит" | "Новинка";
  shape?: "rect" | "oval" | "round";
  materials: ("ceramic" | "wood" | "metal")[];
  cutout: string; // предмет на белом фоне
  images: string[];
  drawing?: string;
  sizeLabel: string;
  priceNote: string;
  sizes: Size[];
  tops: { label: string; options: Swatch[] };
  colors: { label: string; options: Swatch[] };
  variants?: Variant[];
  specs: { label: string; value: string }[];
  detail?: { eyebrow: string; title: string; text: string; images: { src: string; caption: string }[] };
};

const img = (slug: string, name: string) => `/img/${slug}/${name}.jpg`;
const ch = (name: string) => `/img/chairs/${name}.jpg`;
const tex = (name: string) => `/img/slabs/${name}.jpg`;

const seatsOf: Record<number, string> = { 900: "2–4 персоны", 1000: "4 персоны", 1200: "4–6 персон", 1400: "4 персоны", 1600: "4–6 персон", 1800: "6–8 персон", 2000: "6–8 персон" };

const rect = (len: number, width: number, price: number, seats = seatsOf[len]): Size => ({ id: String(len), size: `${len}×${width}×750`, seats, price });
const round = (d: number, price: number): Size => ({ id: String(d), size: `Ø ${d}×750`, seats: seatsOf[d], price });

const table = { category: "table" as const, drawing: undefined, sizeLabel: "Размер, Д × Ш × В", priceNote: "за стол, без стульев" };
const roundTable = { ...table, sizeLabel: "Размер, Ø × В" };

// рисунки керамогранита Axis — на выбор (раздел «Столешницы» на главной)
export const slabs: Swatch[] = [
  { id: "white", name: "Белый мрамор", note: "глянец / мат", texture: tex("white") },
  { id: "graphite", name: "Белый с графитом", note: "керамогранит", texture: tex("graphite") },
  { id: "sand", name: "Песочный камень", note: "керамогранит", texture: tex("sand") },
  { id: "grey", name: "Серо-белый камень", note: "керамогранит", texture: tex("grey") },
];

const black = { id: "black", name: "Чёрный", hex: "#1f1c19" };
const gold = { id: "gold", name: "Золото", hex: "linear-gradient(135deg,#e9cf8f,#b48a3c 55%,#dcbd73)" };
const bronze = { id: "beige", name: "Бежевый", hex: "linear-gradient(135deg,#b9a38b,#8d7763)" };

export const products: Product[] = [
  {
    ...table,
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
      img("scandi", "room-cover"),
      img("scandi", "walnut-room"),
      img("scandi", "studio"),
      img("scandi", "walnut-top"),
      img("scandi", "walnut-leg"),
      img("scandi", "black-room"),
      img("scandi", "light-1"),
      img("scandi", "light-2"),
      img("scandi", "black-2"),
    ],
    drawing: "/img/scandi/drawing.svg",
    sizes: [rect(1400, 800, 50160), rect(1600, 800, 53040), rect(1800, 900, 56520)],
    tops: { label: "Столешница", options: [{ id: "white", name: "Светлый мрамор", note: "керамогранит", texture: tex("white") }] },
    colors: {
      label: "Основание",
      options: [
        {
          id: "walnut",
          name: "Орех",
          hex: "#7b5537",
          images: [img("scandi", "room-cover"), img("scandi", "walnut-room"), img("scandi", "studio"), img("scandi", "walnut-leg")],
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
    ...table,
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
    images: [img("duna", "top"), img("duna", "cross"), img("duna", "front"), img("duna", "room-1"), img("duna", "room-2"), img("duna", "room-3"), img("duna", "room-4")],
    drawing: "/img/duna/drawing.svg",
    sizes: [rect(1400, 800, 52440), rect(1600, 800, 55800), rect(1800, 900, 59400)],
    tops: { label: "Столешница", options: [{ id: "white", name: "Белый мрамор", note: "керамогранит", texture: tex("white") }] },
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
    ...table,
    slug: "axis",
    index: "03",
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
    drawing: "/img/axis/drawing.svg",
    sizes: [rect(1400, 800, 40500), rect(1600, 800, 43200), rect(1800, 900, 44160)],
    tops: { label: "Столешница", options: slabs },
    colors: {
      label: "Основание",
      options: [
        { ...black, note: "металл" },
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
  {
    ...table,
    slug: "terra",
    index: "04",
    name: "Terra",
    type: "обеденный стол",
    short: "травертин · дуб",
    lead: "Спокойный прямоугольный стол: светлый камень сверху и тёплое дерево снизу.",
    description: [
      "Столешница из керамогранита 12 мм с рисунком травертина на подложке из дерева, в двух оттенках — светлом и тёплом. Мягко скруглённые углы и тонкий деревянный кант по краю.",
      "Ножки из шпонированного дуба, слегка наклонены наружу. Простая форма подходит к любому интерьеру — от скандинавского до классики.",
    ],
    badge: "Новинка",
    shape: "rect",
    materials: ["ceramic", "wood"],
    cutout: img("terra", "cutout"),
    images: [img("terra", "room"), img("terra", "light"), img("terra", "room-2"), img("terra", "warm"), img("terra", "light-angle"), img("terra", "warm-angle")],
    drawing: "/img/terra/drawing.svg",
    sizes: [rect(1400, 800, 38000), rect(1600, 800, 40000)],
    tops: {
      label: "Столешница",
      options: [
        { id: "light", name: "Светлый травертин", note: "керамогранит", texture: tex("terra-light"), images: [img("terra", "light"), img("terra", "light-angle")] },
        { id: "warm", name: "Тёплый", note: "керамогранит", texture: tex("terra-warm"), images: [img("terra", "warm"), img("terra", "warm-angle")] },
      ],
    },
    colors: { label: "Основание", options: [{ id: "oak", name: "Дуб", note: "шпон", hex: "#c9a074" }] },
    specs: [
      { label: "Столешница", value: "Керамогранит 12 мм под травертин, подложка из дерева" },
      { label: "Основание", value: "Шпонированный дуб" },
      { label: "Высота", value: "750 мм" },
    ],
    detail: {
      eyebrow: "Детали",
      title: "Дуб и травертин",
      text: "Тёплый дуб и светлый камень — сочетание, которое не надоедает. Деревянная царга по периметру делает стол прочным и аккуратным со всех сторон.",
      images: [
        { src: img("terra", "room-2"), caption: "Terra в интерьере" },
        { src: img("terra", "warm"), caption: "Тёплая столешница, ножки из дуба" },
      ],
    },
  },
  {
    ...table,
    slug: "kona",
    index: "05",
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
    images: [img("kona", "room"), img("kona", "column"), img("kona", "dark"), img("kona", "top"), img("kona", "room-2"), img("kona", "green")],
    drawing: "/img/kona/drawing.svg",
    sizes: [rect(1600, 800, 55200), rect(1800, 900, 57600)],
    tops: { label: "Столешница", options: [{ id: "marble", name: "Мрамор с прожилками", note: "керамогранит", texture: tex("graphite") }] },
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
    ...table,
    slug: "trio",
    index: "06",
    name: "Trio",
    type: "овальный обеденный стол",
    short: "три опоры · овал",
    lead: "Большой овальный стол на трёх цилиндрических опорах из нержавеющей стали.",
    description: [
      "Столешница из керамогранита 12 мм на подложке из МДФ 15 мм — светлый камень с тёплыми песочными и коричневыми прожилками.",
      "Три опоры-цилиндра из нержавеющей стали, в чёрном или золотом цвете. Длина 2 метра — места хватит большой семье или компании.",
    ],
    badge: "Новинка",
    shape: "oval",
    materials: ["ceramic", "metal"],
    cutout: img("trio", "cutout"),
    images: [img("trio", "room"), img("trio", "black"), img("trio", "room-2"), img("trio", "gold")],
    drawing: "/img/trio/drawing.svg",
    sizes: [rect(2000, 1000, 87000)],
    tops: { label: "Столешница", options: [{ id: "sand", name: "Песочный камень", note: "керамогранит", texture: tex("trio") }] },
    colors: {
      label: "Основание",
      options: [
        { ...gold, note: "нерж. сталь", images: [img("trio", "room"), img("trio", "gold"), img("trio", "room-2")] },
        { ...black, note: "нерж. сталь", images: [img("trio", "black")] },
      ],
    },
    specs: [
      { label: "Столешница", value: "Керамогранит 12 мм, подложка МДФ 15 мм" },
      { label: "Основание", value: "Нержавеющая сталь, три опоры" },
      { label: "Высота", value: "750 мм" },
    ],
    detail: {
      eyebrow: "Два цвета опор",
      title: "Три колонны",
      text: "Три цилиндрические опоры держат большую овальную столешницу. Золотая сталь добавляет интерьеру тепла, чёрная — графичности.",
      images: [
        { src: img("trio", "room-2"), caption: "Золотые опоры" },
        { src: img("trio", "room"), caption: "Trio в интерьере" },
      ],
    },
  },
  {
    ...table,
    slug: "cono",
    index: "07",
    name: "Cono",
    type: "овальный обеденный стол",
    short: "конус · овал",
    lead: "Овальная столешница на одной опоре-конусе — стол без углов и ножек по краям.",
    description: [
      "Столешница из керамогранита 12 мм на металлической подложке, к которой крепится опора. Тонкий край делает камень почти невесомым.",
      "Опора-конус из нержавеющей стали в трёх цветах: чёрный, бежевый и золото. Одна центральная опора — стулья свободно встают по всему периметру.",
    ],
    badge: "Новинка",
    shape: "oval",
    materials: ["ceramic", "metal"],
    cutout: img("cono", "cutout"),
    images: [
      img("cono", "room-bronze-hd"),
      img("cono", "room-gold"),
      img("cono", "black"),
      img("cono", "room-black"),
      img("cono", "gold"),
      img("cono", "room-beige"),
      img("cono", "beige"),
      img("cono", "black-front"),
    ],
    drawing: "/img/cono/drawing.svg",
    sizes: [rect(1600, 800, 61000), rect(2000, 900, 69000)],
    tops: {
      label: "Столешница",
      options: [
        { id: "white", name: "Белый мрамор", note: "керамогранит", texture: tex("cono-white") },
        { id: "gold", name: "Белый с золотом", note: "керамогранит", texture: tex("cono-gold") },
      ],
    },
    colors: {
      label: "Основание",
      options: [
        { ...black, note: "нерж. сталь", images: [img("cono", "room-black"), img("cono", "black"), img("cono", "black-front")] },
        { ...bronze, note: "нерж. сталь", images: [img("cono", "room-bronze-hd"), img("cono", "room-beige"), img("cono", "beige")] },
        { ...gold, note: "нерж. сталь", images: [img("cono", "room-gold"), img("cono", "gold")] },
      ],
    },
    specs: [
      { label: "Столешница", value: "Керамогранит 12 мм, металлическая подложка" },
      { label: "Основание", value: "Нержавеющая сталь, опора-конус" },
      { label: "Высота", value: "750 мм" },
    ],
    detail: {
      eyebrow: "Три цвета опоры",
      title: "Одна опора",
      text: "Широкий конус держит большую столешницу на одной точке. Под столом нет ножек — за ним свободно и семье, и гостям.",
      images: [
        { src: img("cono", "room-gold"), caption: "Золотая опора" },
        { src: img("cono", "room-beige"), caption: "Бежевая опора" },
      ],
    },
  },
  {
    ...roundTable,
    slug: "rondo",
    index: "08",
    name: "Rondo",
    type: "круглый обеденный стол",
    short: "круглый · массив",
    lead: "Круглый стол на скульптурной опоре из массива дерева — четыре крыла сходятся в центре.",
    description: [
      "Столешница из керамогранита 12 мм на подложке из МДФ — белый камень с мягкими серыми прожилками и тёмным кантом по краю.",
      "Опора из массива дерева: четыре плоских крыла с фигурным вырезом. Одна центральная опора — за столом удобно с любой стороны.",
    ],
    badge: "Новинка",
    shape: "round",
    materials: ["ceramic", "wood"],
    cutout: img("rondo", "cutout"),
    images: [img("rondo", "room"), img("rondo", "angle"), img("rondo", "room-2"), img("rondo", "side"), img("rondo", "room-3")],
    drawing: "/img/rondo/drawing.svg",
    sizes: [round(1000, 48000)],
    tops: { label: "Столешница", options: [{ id: "white", name: "Белый мрамор", note: "керамогранит", texture: tex("rondo") }] },
    colors: { label: "Основание", options: [{ id: "black", name: "Чёрное дерево", note: "массив", hex: "#1f1c19" }] },
    specs: [
      { label: "Столешница", value: "Керамогранит 12 мм, подложка МДФ" },
      { label: "Основание", value: "Массив дерева" },
      { label: "Высота", value: "750 мм" },
    ],
    detail: {
      eyebrow: "Детали",
      title: "Четыре крыла",
      text: "Круглая форма собирает всех за одним столом. Тёмное дерево опоры и светлый камень — спокойный контраст для светлого или тёплого интерьера.",
      images: [
        { src: img("rondo", "room"), caption: "Rondo в интерьере" },
        { src: img("rondo", "room-3"), caption: "Светлая столовая" },
      ],
    },
  },
  {
    ...roundTable,
    slug: "hora",
    index: "09",
    name: "Hora",
    type: "круглый обеденный стол",
    short: "круглый · песочные часы",
    lead: "Круглый стол на опоре в форме песочных часов — тонкая талия и широкий устойчивый конус.",
    description: [
      "Столешница из керамогранита 12 мм на металлической подложке, с тонким металлическим кантом по краю.",
      "Опора из металла в трёх цветах: чёрный, бежевый и золото. Три диаметра — от компактного стола для кухни до просторного на шесть персон.",
    ],
    badge: "Новинка",
    shape: "round",
    materials: ["ceramic", "metal"],
    cutout: img("hora", "cutout"),
    images: [img("hora", "room"), img("hora", "gold"), img("hora", "room-2"), img("hora", "dark")],
    drawing: "/img/hora/drawing.svg",
    sizes: [round(900, 45000), round(1000, 46000), round(1200, 48000)],
    tops: {
      label: "Столешница",
      options: [
        { id: "gold", name: "Белый с золотом", note: "керамогранит", texture: tex("hora-gold"), images: [img("hora", "room"), img("hora", "gold")] },
        { id: "grey", name: "Серый камень", note: "керамогранит", texture: tex("hora-grey"), images: [img("hora", "room-2"), img("hora", "dark")] },
      ],
    },
    colors: {
      label: "Основание",
      options: [
        { ...gold, note: "металл", images: [img("hora", "room"), img("hora", "gold")] },
        { ...black, note: "металл", images: [img("hora", "room-2"), img("hora", "dark")] },
        { ...bronze, note: "металл" },
      ],
    },
    specs: [
      { label: "Столешница", value: "Керамогранит 12 мм, металлическая подложка" },
      { label: "Основание", value: "Металл, опора «песочные часы»" },
      { label: "Высота", value: "750 мм" },
    ],
    detail: {
      eyebrow: "Три цвета опоры",
      title: "Песочные часы",
      text: "Изгиб опоры повторяет форму песочных часов: стол выглядит лёгким, но стоит устойчиво. Металл и камень — для строгого или тёплого интерьера.",
      images: [
        { src: img("hora", "room"), caption: "Hora в интерьере" },
        { src: img("hora", "room-2"), caption: "Тёмная опора" },
      ],
    },
  },

  // ---------- стулья ----------
  ...(
    [
      {
        slug: "onda",
        index: "01",
        name: "Onda",
        type: "обеденный стул",
        short: "спинка-волна · рогожка",
        lead: "Мягкая спинка-волна обнимает спину и держится на изогнутой дубовой опоре.",
        description: [
          "Каркас из массива дуба: круглые ножки, царга под сиденьем и выгнутая перекладина, на которой лежит спинка.",
          "Сиденье и спинка обиты плотной тканью рогожкой с выразительным плетением. Мягкий кант по краю спинки подчёркивает её форму.",
        ],
        fabric: "Ткань рогожка",
        size: "500×500×780",
        price: 8500,
        colors: ["walnut", "black", "oak"],
        extra: [ch("onda-group")],
      },
      {
        slug: "arca",
        index: "02",
        name: "Arca",
        type: "обеденный стул с подлокотниками",
        short: "подлокотники · букле",
        lead: "Цельная гнутая спинка плавно переходит в подлокотники — стул как одна непрерывная линия.",
        description: [
          "Каркас из массива дуба: широкая изогнутая спинка-дуга, подлокотники и чуть наклонённые ножки. Все соединения скруглены — дерево приятно держать в руке.",
          "Мягкое сиденье обито тканью букле с объёмной фактурой. Подлокотники делают стул удобным для долгих ужинов.",
        ],
        fabric: "Ткань букле",
        size: "550×550×800",
        price: 12500,
        colors: ["oak", "black", "walnut"],
        extra: [],
      },
      {
        slug: "kumo",
        index: "03",
        name: "Kumo",
        type: "обеденный стул",
        short: "спинка-облако · букле",
        lead: "Изогнутая перекладина-облако вместо спинки — лёгкий графичный силуэт в японском духе.",
        description: [
          "Каркас из массива дуба: круглые ножки, наклонные задние стойки и широкая гнутая перекладина, которая мягко поддерживает спину.",
          "Округлое сиденье обито тканью букле. Открытая спинка делает стул визуально лёгким — он не загромождает стол даже в небольшой кухне.",
        ],
        fabric: "Ткань букле",
        size: "610×540×830",
        price: 9800,
        colors: ["black", "walnut", "oak"],
        extra: [],
      },
    ] as const
  ).map((c): Product => {
    const woods = {
      walnut: { name: "Орех", hex: "#6b4126" },
      black: { name: "Чёрный", hex: "#1f1c19" },
      oak: { name: "Натуральный дуб", hex: "#d6ae78" },
    };
    const shots = c.colors.map((w) => ch(`${c.slug}-${w}`));
    return {
      slug: c.slug,
      category: "chair",
      index: c.index,
      name: c.name,
      type: c.type,
      short: c.short,
      lead: c.lead,
      description: [...c.description],
      badge: "Новинка",
      materials: ["wood"],
      cutout: shots[0],
      images: [...shots, ...c.extra],
      sizeLabel: "Размер, Ш × Г × В",
      priceNote: "за один стул",
      sizes: [{ id: "one", size: c.size, seats: "1 стул", price: c.price }],
      tops: { label: "Обивка", options: [{ id: "fabric", name: c.fabric, note: "молочный цвет", hex: "#efe9df" }] },
      colors: {
        label: "Каркас",
        options: c.colors.map((w, i) => ({ id: w, ...woods[w], note: "массив дуба", images: [shots[i]] })),
      },
      specs: [
        { label: "Каркас", value: "Массив дуба" },
        { label: "Обивка", value: c.fabric },
        { label: "Размер", value: `${c.size} мм` },
      ],
    };
  }),
];

export const tables = products.filter((p) => p.category === "table");
export const chairs = products.filter((p) => p.category === "chair");

export const tableGroups = [
  { id: "rect", title: "Прямоугольные", items: tables.filter((p) => p.shape === "rect") },
  { id: "round", title: "Круглые и овальные", items: tables.filter((p) => p.shape !== "rect") },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const minPrice = (p: Product) => Math.min(...p.sizes.map((s) => s.price));

export const rub = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;

export const formatFrom = (p: Product) => (p.sizes.length > 1 ? `от ${rub(minPrice(p))}` : rub(minPrice(p)));

// «9 моделей», «3 модели»
export const models = (n: number) => `${n} ${n % 10 === 1 && n % 100 !== 11 ? "модель" : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? "модели" : "моделей"}`;

// Фото предмета на белом фоне: их показываем целиком (object-contain) и «растворяем» в фоне страницы.
const STUDIO = new Set([
  "scandi/studio", "axis/studio-black", "axis/studio-beige",
  "terra/light", "terra/warm", "terra/light-angle", "terra/warm-angle",
  "trio/black", "trio/gold", "cono/black", "cono/gold", "cono/beige", "cono/black-front",
  "rondo/angle", "rondo/side", "hora/gold", "hora/dark",
]);
export const isStudio = (src: string) => {
  const key = src.replace(/^\/img\//, "").replace(/\.\w+$/, "");
  return key.endsWith("/cutout") || key.startsWith("axis/v-") || STUDIO.has(key) || (key.startsWith("chairs/") && /-(walnut|black|oak)$/.test(key));
};
