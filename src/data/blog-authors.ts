export interface BlogAuthor {
  slug: string;
  name: string;
  title: Record<string, string>;
  avatar: string;
  expertise: string[];
  bio: Record<string, string>;
  social?: {
    linkedin?: string;
    twitter?: string;
  };
}

export const blogAuthors: BlogAuthor[] = [
  {
    slug: "mehmet-yilmaz",
    name: "Mehmet Yılmaz",
    title: {
      tr: "Kıdemli Ticaret Analisti",
      en: "Senior Trade Analyst",
      fr: "Analyste Commercial Senior",
      ru: "Старший торговый аналитик",
    },
    avatar: "/images/authors/mehmet-yilmaz.webp",
    expertise: [
      "international-trade",
      "import-export",
      "market-analysis",
      "trade-agreements",
    ],
    bio: {
      tr: "15 yılı aşkın uluslararası ticaret deneyimine sahip Mehmet Yılmaz, Türkiye'nin dış ticaret ekosistemini yakından tanıyan bir sektör uzmanıdır. İstanbul Üniversitesi Uluslararası Ticaret bölümünden mezun olduktan sonra, çeşitli ihracat şirketlerinde ve ticaret danışmanlığı firmalarında üst düzey görevler üstlenmiştir. Avrupa, Orta Doğu ve Afrika pazarlarına yönelik ticaret stratejileri geliştirme konusunda derin uzmanlığa sahiptir. Toko Trading'de kıdemli ticaret analisti olarak, müşterilerin pazar giriş stratejilerini şekillendirir ve tedarik zinciri optimizasyonu konusunda danışmanlık sunar.",
      en: "With over 15 years of experience in international trade, Mehmet Yılmaz is a seasoned industry expert with deep knowledge of Turkey's foreign trade ecosystem. After graduating from Istanbul University's International Trade program, he held senior positions at various export companies and trade consultancy firms. He has extensive expertise in developing trade strategies for European, Middle Eastern, and African markets. As a Senior Trade Analyst at Toko Trading, he shapes clients' market entry strategies and provides consultancy on supply chain optimization.",
      fr: "Fort de plus de 15 ans d'expérience dans le commerce international, Mehmet Yılmaz est un expert chevronné possédant une connaissance approfondie de l'écosystème du commerce extérieur turc. Diplômé du programme de Commerce International de l'Université d'Istanbul, il a occupé des postes de direction dans diverses sociétés d'exportation et cabinets de conseil en commerce. Il possède une expertise approfondie dans le développement de stratégies commerciales pour les marchés européens, moyen-orientaux et africains. En tant qu'Analyste Commercial Senior chez Toko Trading, il élabore les stratégies d'entrée sur les marchés pour les clients et fournit des conseils en optimisation de la chaîne d'approvisionnement.",
      ru: "Обладая более чем 15-летним опытом в международной торговле, Мехмет Йылмаз является опытным отраслевым экспертом с глубоким знанием экосистемы внешней торговли Турции. После окончания программы международной торговли Стамбульского университета он занимал руководящие должности в различных экспортных компаниях и консалтинговых фирмах. Обладает обширным опытом в разработке торговых стратегий для европейских, ближневосточных и африканских рынков. В качестве старшего торгового аналитика в Toko Trading формирует стратегии выхода клиентов на рынки и консультирует по оптимизации цепочек поставок.",
    },
    social: {
      linkedin: "https://linkedin.com/in/mehmet-yilmaz-toko",
      twitter: "https://twitter.com/mehmetyilmaz_trade",
    },
  },
  {
    slug: "ayse-kara",
    name: "Ayşe Kara",
    title: {
      tr: "Gümrük ve Lojistik Uzmanı",
      en: "Customs & Logistics Expert",
      fr: "Experte en Douanes et Logistique",
      ru: "Эксперт по таможне и логистике",
    },
    avatar: "/images/authors/ayse-kara.webp",
    expertise: [
      "customs-procedures",
      "logistics",
      "supply-chain",
      "trade-compliance",
    ],
    bio: {
      tr: "Ayşe Kara, gümrük mevzuatı ve uluslararası lojistik alanında 12 yıllık deneyime sahip bir uzmandır. Ankara Üniversitesi Hukuk Fakültesi mezunu olan Ayşe, gümrük müşavirliği lisansına sahip olup, Türkiye Gümrük ve Ticaret Bakanlığı'nda çeşitli görevlerde bulunmuştur. Serbest ticaret anlaşmaları, gümrük rejimleri ve ticaret uyumu konularında kapsamlı bilgi birikimine sahiptir. Toko Trading'de gümrük ve lojistik uzmanı olarak, müşterilerin gümrük süreçlerini optimize eder ve maliyet tasarrufu stratejileri geliştirir.",
      en: "Ayşe Kara is a specialist with 12 years of experience in customs regulations and international logistics. A graduate of Ankara University Faculty of Law, Ayşe holds a customs brokerage license and has served in various capacities at Turkey's Ministry of Customs and Trade. She has comprehensive knowledge of free trade agreements, customs regimes, and trade compliance. As a Customs & Logistics Expert at Toko Trading, she optimizes clients' customs processes and develops cost-saving strategies.",
      fr: "Ayşe Kara est une spécialiste forte de 12 ans d'expérience dans la réglementation douanière et la logistique internationale. Diplômée de la Faculté de Droit de l'Université d'Ankara, Ayşe détient une licence de courtier en douane et a exercé diverses fonctions au sein du Ministère des Douanes et du Commerce de Turquie. Elle possède une connaissance approfondie des accords de libre-échange, des régimes douaniers et de la conformité commerciale. En tant qu'Experte en Douanes et Logistique chez Toko Trading, elle optimise les processus douaniers des clients et développe des stratégies d'économie de coûts.",
      ru: "Айше Кара — специалист с 12-летним опытом работы в области таможенного регулирования и международной логистики. Выпускница юридического факультета Анкарского университета, Айше имеет лицензию таможенного брокера и работала в различных подразделениях Министерства таможни и торговли Турции. Обладает всесторонними знаниями в области соглашений о свободной торговле, таможенных режимов и торгового соответствия. В качестве эксперта по таможне и логистике в Toko Trading оптимизирует таможенные процессы клиентов и разрабатывает стратегии экономии затрат.",
    },
    social: {
      linkedin: "https://linkedin.com/in/ayse-kara-customs",
    },
  },
  {
    slug: "emre-ozdemir",
    name: "Emre Özdemir",
    title: {
      tr: "Tekstil Sektörü Uzmanı",
      en: "Textile Industry Specialist",
      fr: "Spécialiste de l'Industrie Textile",
      ru: "Специалист текстильной отрасли",
    },
    avatar: "/images/authors/emre-ozdemir.webp",
    expertise: [
      "textile",
      "sourcing",
      "quality-control",
      "sustainable-fashion",
    ],
    bio: {
      tr: "Emre Özdemir, Türk tekstil sektöründe 10 yılı aşkın deneyime sahip bir kaynak bulma ve kalite kontrol uzmanıdır. İstanbul Teknik Üniversitesi Tekstil Mühendisliği bölümünden mezun olduktan sonra, İstanbul, Bursa ve Denizli'deki önde gelen tekstil üreticileriyle çalışmıştır. Kumaş teknolojileri, sürdürülebilir üretim yöntemleri ve kalite güvence sistemleri konularında derin uzmanlığa sahiptir. Uluslararası moda markalarının Türkiye'deki tedarik operasyonlarını yöneterek, kalite standartlarının korunmasını ve zamanında teslimatı sağlamıştır. Toko Trading'de tekstil sektörü uzmanı olarak, müşterilere tedarikçi seçiminden sevkiyata kadar uçtan uca destek sunar.",
      en: "Emre Özdemir is a sourcing and quality control specialist with over 10 years of experience in Turkey's textile sector. After graduating from Istanbul Technical University's Textile Engineering program, he worked with leading textile manufacturers in Istanbul, Bursa, and Denizli. He has deep expertise in fabric technologies, sustainable production methods, and quality assurance systems. He has managed Turkish sourcing operations for international fashion brands, ensuring quality standards and timely delivery. As a Textile Industry Specialist at Toko Trading, he provides end-to-end support from supplier selection to shipment.",
      fr: "Emre Özdemir est un spécialiste en approvisionnement et contrôle qualité avec plus de 10 ans d'expérience dans le secteur textile turc. Diplômé du programme d'Ingénierie Textile de l'Université Technique d'Istanbul, il a travaillé avec les principaux fabricants textiles d'Istanbul, Bursa et Denizli. Il possède une expertise approfondie en technologies des tissus, méthodes de production durables et systèmes d'assurance qualité. Il a géré les opérations d'approvisionnement en Turquie pour des marques de mode internationales, garantissant les normes de qualité et les délais de livraison. En tant que Spécialiste de l'Industrie Textile chez Toko Trading, il offre un accompagnement de bout en bout, de la sélection des fournisseurs à l'expédition.",
      ru: "Эмре Оздемир — специалист по сорсингу и контролю качества с более чем 10-летним опытом работы в текстильном секторе Турции. После окончания программы текстильной инженерии Стамбульского технического университета работал с ведущими текстильными производителями в Стамбуле, Бурсе и Денизли. Обладает глубокими знаниями в области технологий тканей, методов устойчивого производства и систем обеспечения качества. Управлял операциями по закупкам в Турции для международных модных брендов, обеспечивая стандарты качества и своевременные поставки. В качестве специалиста текстильной отрасли в Toko Trading предоставляет комплексную поддержку от выбора поставщика до отгрузки.",
    },
    social: {
      linkedin: "https://linkedin.com/in/emre-ozdemir-textile",
      twitter: "https://twitter.com/emreozdemir_tex",
    },
  },
  {
    slug: "zeynep-aktas",
    name: "Zeynep Aktaş",
    title: {
      tr: "Gıda ve Tarım Ticareti Uzmanı",
      en: "Food & Agriculture Trade Expert",
      fr: "Experte en Commerce Alimentaire et Agricole",
      ru: "Эксперт по торговле продуктами питания и сельским хозяйством",
    },
    avatar: "/images/authors/zeynep-aktas.webp",
    expertise: [
      "food-export",
      "agricultural-trade",
      "food-safety",
      "organic-products",
    ],
    bio: {
      tr: "Zeynep Aktaş, gıda ihracatı ve tarım ticareti alanında 8 yıllık deneyime sahip bir uzmandır. Ege Üniversitesi Gıda Mühendisliği bölümünden mezun olduktan sonra, Türkiye'nin önde gelen gıda ihracatçılarında çeşitli görevlerde bulunmuştur. Gıda güvenliği standartları, organik sertifikasyon süreçleri ve uluslararası gıda mevzuatı konularında kapsamlı bilgiye sahiptir. Akdeniz ve Ege bölgelerindeki tarım üreticileriyle yakın çalışarak, dünya pazarlarına kaliteli Türk gıda ürünleri ulaştırılmasına katkıda bulunmuştur. Toko Trading'de gıda ve tarım ticareti uzmanı olarak, müşterilere gıda tedarik zinciri yönetimi ve ihracat stratejileri konusunda danışmanlık sunar.",
      en: "Zeynep Aktaş is a specialist with 8 years of experience in food export and agricultural trade. After graduating from Ege University's Food Engineering program, she held various positions at Turkey's leading food exporters. She has comprehensive knowledge of food safety standards, organic certification processes, and international food regulations. Working closely with agricultural producers in the Mediterranean and Aegean regions, she has contributed to delivering quality Turkish food products to global markets. As a Food & Agriculture Trade Expert at Toko Trading, she advises clients on food supply chain management and export strategies.",
      fr: "Zeynep Aktaş est une spécialiste forte de 8 ans d'expérience dans l'exportation alimentaire et le commerce agricole. Diplômée du programme d'Ingénierie Alimentaire de l'Université Ege, elle a occupé divers postes chez les principaux exportateurs alimentaires turcs. Elle possède une connaissance approfondie des normes de sécurité alimentaire, des processus de certification biologique et de la réglementation alimentaire internationale. Travaillant en étroite collaboration avec les producteurs agricoles des régions méditerranéenne et égéenne, elle a contribué à la livraison de produits alimentaires turcs de qualité sur les marchés mondiaux. En tant qu'Experte en Commerce Alimentaire et Agricole chez Toko Trading, elle conseille les clients en gestion de la chaîne d'approvisionnement alimentaire et stratégies d'exportation.",
      ru: "Зейнеп Акташ — специалист с 8-летним опытом в области экспорта продуктов питания и сельскохозяйственной торговли. После окончания программы пищевой инженерии Эгейского университета занимала различные должности у ведущих турецких экспортёров продуктов питания. Обладает всесторонними знаниями в области стандартов безопасности пищевых продуктов, процессов органической сертификации и международного продовольственного законодательства. Тесно сотрудничая с сельскохозяйственными производителями Средиземноморского и Эгейского регионов, она внесла вклад в поставки качественных турецких продуктов на мировые рынки. В качестве эксперта по торговле продуктами питания и сельским хозяйством в Toko Trading консультирует клиентов по управлению пищевой цепочкой поставок и стратегиям экспорта.",
    },
    social: {
      linkedin: "https://linkedin.com/in/zeynep-aktas-food",
    },
  },
  {
    slug: "can-demir",
    name: "Can Demir",
    title: {
      tr: "E-Ticaret ve Dijital Ticaret Uzmanı",
      en: "E-Commerce & Digital Trade Specialist",
      fr: "Spécialiste du E-Commerce et du Commerce Digital",
      ru: "Специалист по электронной и цифровой торговле",
    },
    avatar: "/images/authors/can-demir.webp",
    expertise: [
      "e-commerce",
      "digital-trade",
      "cross-border-commerce",
      "marketplace-strategy",
    ],
    bio: {
      tr: "Can Demir, e-ticaret ve dijital ticaret alanında 7 yıllık deneyime sahip bir teknoloji odaklı ticaret uzmanıdır. Bilkent Üniversitesi Bilgisayar Mühendisliği ve İşletme çift dalından mezun olduktan sonra, uluslararası e-ticaret platformlarında ve teknoloji şirketlerinde çalışmıştır. Sınır ötesi e-ticaret, dijital pazar yeri stratejileri, ödeme sistemleri ve ticaret otomasyonu konularında kapsamlı bilgi birikimine sahiptir. Türk ihracatçıların dijital kanallarda büyümesine yardımcı olarak, Amazon, Alibaba ve diğer küresel platformlarda satış stratejileri geliştirmiştir. Toko Trading'de e-ticaret ve dijital ticaret uzmanı olarak, müşterilere dijital dönüşüm ve online ihracat stratejileri konusunda danışmanlık sunar.",
      en: "Can Demir is a technology-focused trade specialist with 7 years of experience in e-commerce and digital trade. After graduating from Bilkent University with a double major in Computer Engineering and Business Administration, he worked at international e-commerce platforms and technology companies. He has comprehensive knowledge of cross-border e-commerce, digital marketplace strategies, payment systems, and trade automation. He has helped Turkish exporters grow through digital channels, developing sales strategies for Amazon, Alibaba, and other global platforms. As an E-Commerce & Digital Trade Specialist at Toko Trading, he advises clients on digital transformation and online export strategies.",
      fr: "Can Demir est un spécialiste du commerce axé sur la technologie avec 7 ans d'expérience dans le e-commerce et le commerce digital. Diplômé de l'Université Bilkent avec une double spécialisation en Ingénierie Informatique et Administration des Affaires, il a travaillé dans des plateformes de e-commerce internationales et des entreprises technologiques. Il possède une connaissance approfondie du e-commerce transfrontalier, des stratégies de places de marché digitales, des systèmes de paiement et de l'automatisation du commerce. Il a aidé les exportateurs turcs à se développer via les canaux digitaux, en élaborant des stratégies de vente pour Amazon, Alibaba et d'autres plateformes mondiales. En tant que Spécialiste du E-Commerce et du Commerce Digital chez Toko Trading, il conseille les clients en transformation digitale et stratégies d'exportation en ligne.",
      ru: "Джан Демир — ориентированный на технологии торговый специалист с 7-летним опытом в электронной и цифровой торговле. После окончания Университета Билкент с двойной специализацией в области компьютерной инженерии и делового администрирования работал на международных платформах электронной коммерции и в технологических компаниях. Обладает всесторонними знаниями в области трансграничной электронной коммерции, стратегий цифровых торговых площадок, платёжных систем и автоматизации торговли. Помогал турецким экспортёрам расти через цифровые каналы, разрабатывая стратегии продаж для Amazon, Alibaba и других глобальных платформ. В качестве специалиста по электронной и цифровой торговле в Toko Trading консультирует клиентов по цифровой трансформации и стратегиям онлайн-экспорта.",
    },
    social: {
      linkedin: "https://linkedin.com/in/can-demir-digital",
      twitter: "https://twitter.com/candemir_ecom",
    },
  },
];

export function getAuthorBySlug(slug: string): BlogAuthor | undefined {
  return blogAuthors.find((author) => author.slug === slug);
}

export function getAuthorsByExpertise(expertise: string): BlogAuthor[] {
  return blogAuthors.filter((author) => author.expertise.includes(expertise));
}
