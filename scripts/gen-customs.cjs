#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'src', 'data', 'pseo');

function wc(t) { return t.trim().split(/\s+/).filter(w => w.length > 0).length; }

// ─── Seed Data ──────────────────────────────────────────────────────────────
// [slug, imgId, nameEN, nameTR, nameFR, nameRU, focus]
// focus = 'regional' | 'topical'

const CUSTOMS = [
  // 8 Regional
  ['customs-eu','photo-1519677100203-a0e668c92439','EU Customs Regulations','AB Gumruk Mevzuati','Reglementation Douaniere UE','Таможенное Регулирование ЕС','regional',
   'European Union','Avrupa Birligi','Union Europeenne','Европейский Союз',
   'CE marking REACH compliance food safety','12-18%','Customs Union agreement simplifies','ATR movement certificate',
   'machinery chemicals food textiles automotive','EUR.1 ATR certificates of conformity',
   'RAPEX alert system strict consumer safety','Toko ensures full CE marking and REACH compliance for EU-bound shipments'],
  ['customs-russia-cis','photo-1547448415-e9f5b28e570d','Russia and CIS Customs','Rusya ve BDT Gumruk','Douanes Russie et CEI','Таможня России и СНГ','regional',
   'Russia and CIS countries','Rusya ve BDT ulkeleri','la Russie et les pays de la CEI','Россия и страны СНГ',
   'GOST EAC certification technical regulations','5-20%','Bilateral agreements facilitate','Certificate of Origin Form A',
   'food construction steel chemicals consumer goods','EAC declaration GOST certificates',
   'Phytosanitary certificates mandatory for food','Toko manages GOST and EAC certification processes for Russian and CIS market entry'],
  ['customs-middle-east','photo-1512453979798-5ea266f8880c','Middle East Customs Guide','Orta Dogu Gumruk Rehberi','Guide Douanier Moyen-Orient','Таможенный Гид Ближнего Востока','regional',
   'the Middle East region','Orta Dogu bolgesi','la region du Moyen-Orient','Ближневосточный регион',
   'Gulf Standards GCC conformity halal certification','0-15%','GCC unified customs framework','Certificate of Origin legalized by chamber',
   'food steel construction textiles consumer goods','legalized commercial invoice certificate of origin',
   'Halal certification mandatory for food products','Toko handles GCC conformity marking and halal certification for Middle Eastern markets'],
  ['customs-north-africa','photo-1572252009286-268acec5ca0a','North Africa Customs','Kuzey Afrika Gumruk','Douanes Afrique du Nord','Таможня Северной Африки','regional',
   'North African countries','Kuzey Afrika ulkeleri','les pays dAfrique du Nord','Североафриканские страны',
   'import licenses quotas local standards','10-30%','Bilateral trade agreements','Certificate of Origin with Arabic translation',
   'food chemicals steel machinery textiles','Arabic-translated documents import permits',
   'Foreign exchange controls affect payment flows','Toko navigates complex North African import licensing and documentation requirements'],
  ['customs-east-asia','photo-1508804185872-d7badad00f7d','East Asia Customs','Dogu Asya Gumruk','Douanes Asie de lEst','Таможня Восточной Азии','regional',
   'East Asian markets','Dogu Asya pazarlari','les marches dAsie de lEst','Восточноазиатские рынки',
   'CCC mark JIS PSE certification','3-25%','Growing bilateral trade agreements','Certificate of Origin with consular legalization',
   'minerals metals chemicals marble food','CCC JIS PSE certificates technical standards',
   'Strict food safety and chemical regulations','Toko manages complex East Asian certification requirements including CCC JIS and PSE marks'],
  ['customs-south-america','photo-1483729558449-99ef09a8c325','South America Customs','Guney Amerika Gumruk','Douanes Amerique du Sud','Таможня Южной Америки','regional',
   'South American countries','Guney Amerika ulkeleri','les pays dAmerique du Sud','Южноамериканские страны',
   'Mercosur INMETRO certification import licensing','10-35%','Mercosur-Turkey trade dialogue','Certificate of Origin apostilled',
   'chemicals steel food textiles machinery','INMETRO certification apostilled documents',
   'High tariff barriers and import quotas common','Toko helps navigate Mercosur tariff structures and INMETRO certification for South American exports'],
  ['customs-north-america','photo-1485738422979-f5c462d49f04','North America Customs','Kuzey Amerika Gumruk','Douanes Amerique du Nord','Таможня Северной Америки','regional',
   'North American markets','Kuzey Amerika pazarlari','les marches nord-americains','Североамериканские рынки',
   'FDA USDA EPA compliance UL certification','0-25%','GSP beneficiary preferential tariffs','FDA registration USDA import permits',
   'steel food textiles chemicals automotive','FDA USDA EPA registrations UL certification',
   'Anti-dumping duties on steel and aluminum','Toko ensures FDA USDA and EPA compliance for smooth North American market entry'],
  ['customs-southeast-asia','photo-1528164344885-1d40e8381b1a','Southeast Asia Customs','Guneydogu Asya Gumruk','Douanes Asie du Sud-Est','Таможня Юго-Восточной Азии','regional',
   'Southeast Asian markets','Guneydogu Asya pazarlari','les marches dAsie du Sud-Est','Рынки Юго-Восточной Азии',
   'ASEAN harmonized tariffs local standards','0-30%','ASEAN trade framework discussions','Form D for ASEAN Certificate of Origin',
   'food chemicals textiles electronics machinery','ASEAN Form D local compliance certificates',
   'Variable regulations across ASEAN member states','Toko navigates diverse ASEAN regulatory requirements across all member states'],

  // 7 Topical
  ['customs-food-safety','photo-1606787366850-de6330128bfc','Food Safety Import Regulations','Gida Guvenligi Ithalat Mevzuati','Reglementations de Securite Alimentaire','Правила Безопасности Пищевых Продуктов','topical',
   'international food markets','uluslararasi gida pazarlari','les marches alimentaires internationaux','международные продовольственные рынки',
   'HACCP ISO22000 FDA EFSA compliance','0-40%','Codex Alimentarius international standards','Health certificate phytosanitary certificate',
   'grains dairy canned goods spices oils','health certificate laboratory analysis reports',
   'Temperature-controlled transport mandatory','Toko manages comprehensive food safety certification across all destination markets'],
  ['customs-textile-regulations','photo-1558171813-4c088753af8f','Textile Import Regulations','Tekstil Ithalat Mevzuati','Reglementations Textiles','Правила Импорта Текстиля','topical',
   'global textile markets','kuresel tekstil pazarlari','les marches textiles mondiaux','мировые текстильные рынки',
   'Oeko-Tex GOTS composition labeling AZO-free','5-25%','Multi-fiber arrangement successor agreements','Oeko-Tex GOTS certificates composition reports',
   'fabrics ready-to-wear home textiles industrial','fiber composition test reports AZO-free certificates',
   'Strict labeling requirements in all markets','Toko ensures textile compliance with Oeko-Tex GOTS and destination-specific labeling requirements'],
  ['customs-chemicals-reach','photo-1532187863486-abf9dbad1b69','Chemical REACH Compliance','Kimyasal REACH Uyumluluk','Conformite REACH Chimique','Соответствие REACH для Химических Продуктов','topical',
   'chemical export destinations','kimyasal ihracat destinasyonlari','les destinations dexportation chimique','направления экспорта химической продукции',
   'REACH GHS SDS TSCA CLP classification','0-15%','International chemical conventions','Safety Data Sheets material declarations',
   'industrial chemicals petrochemicals pharmaceuticals fertilizers','SDS GHS labels REACH registration dossiers',
   'Hazardous material transport restrictions ADR/IMDG','Toko handles complete REACH registration and GHS classification for chemical exports'],
  ['customs-machinery-standards','photo-1581091226825-a6a2a5aee158','Machinery Import Standards','Makine Ithalat Standartlari','Normes dImportation de Machines','Стандарты Импорта Оборудования','topical',
   'machinery import markets','makine ithalat pazarlari','les marches dimportation de machines','рынки импорта оборудования',
   'CE UL CSA marking ISO9001 EN standards','0-20%','Mutual recognition agreements','CE declaration of conformity test reports',
   'industrial machinery agricultural automation spare parts','CE UL test reports ISO9001 certificates',
   'Electrical safety and EMC compliance required','Toko manages CE marking UL certification and ISO compliance for machinery exports worldwide'],
  ['customs-dangerous-goods','photo-1611348586804-61bf6c080437','Dangerous Goods Shipping','Tehlikeli Madde Tasimaciligi','Transport de Marchandises Dangereuses','Перевозка Опасных Грузов','topical',
   'dangerous goods shipping routes','tehlikeli madde tasimacilik guzergahlari','les routes de transport de marchandises dangereuses','маршруты перевозки опасных грузов',
   'ADR IMDG IATA DGR UN classification','varies by classification','UN Model Regulations framework','DG declaration packing certificates',
   'chemicals flammables corrosives compressed gases','UN number placard labels DG declarations',
   'Strict packaging labeling and documentation rules','Toko provides complete dangerous goods logistics including ADR IMDG and IATA compliance'],
  ['customs-organic-certification','photo-1574943320219-553eb213f72d','Organic Product Certification','Organik Urun Sertifikasyonu','Certification Produits Biologiques','Сертификация Органической Продукции','topical',
   'organic product markets','organik urun pazarlari','les marches de produits biologiques','рынки органической продукции',
   'EU organic USDA NOP JAS equivalent certification','0-15%','Organic equivalency agreements','Organic certificate transaction certificate',
   'organic grains organic oils organic spices organic textiles','organic certificates inspection reports',
   'Traceability and non-GMO verification required','Toko facilitates organic certification across EU USDA and JAS standards for Turkish organic exports'],
  ['customs-halal-certification','photo-1564769625905-50e93615e769','Halal Certification Guide','Helal Sertifikasyon Rehberi','Guide de Certification Halal','Руководство по Сертификации Халяль','topical',
   'halal-requiring markets','helal sertifikasi gereken pazarlar','les marches exigeant la certification halal','рынки требующие сертификацию халяль',
   'OIC SMIIC HAK certification standards','0-20%','OIC halal standards harmonization','Halal certificate from accredited body',
   'food cosmetics pharmaceuticals leather goods','halal certificate slaughterhouse approval',
   'Varying halal standards across markets','Toko manages halal certification from accredited Turkish bodies recognized across OIC member states'],
];

// ─── Builder ────────────────────────────────────────────────────────────────

function buildCustoms(c) {
  const [slug, imgId, nameEN, nameTR, nameFR, nameRU, focus,
         regionEN, regionTR, regionFR, regionRU,
         certReqs, dutyRange, agreementNote, keyCert,
         productsStr, docsShort,
         restrictNote, tokoNote] = c;

  const img = `https://images.unsplash.com/${imgId}?auto=format&fit=crop&q=80&w=800`;
  const productList = productsStr.split(' ').filter(s=>s.length>0);
  const isRegional = focus === 'regional';

  // ─── Meta ─────────────────────────────────────────────────────────
  const meta = {
    title: {
      tr: `${nameTR} | Toko Trading Gumruk Rehberi`,
      en: `${nameEN} | Toko Trading Customs Guide`,
      fr: `${nameFR} | Guide Douanier Toko Trading`,
      ru: `${nameRU} | Таможенный Справочник Toko Trading`,
    },
    description: {
      tr: `${nameTR} hakkinda kapsamli gumruk mevzuati belgeler prosedurler ve uyumluluk gereksinimleri rehberi. Toko Trading ile guvende olun.`,
      en: `Comprehensive guide to ${nameEN} covering documentation procedures compliance requirements and duty rates. Navigate customs with Toko Trading expertise.`,
      fr: `Guide complet sur ${nameFR} couvrant la documentation les procedures les exigences de conformite et les taux de droits. Naviguez en douane avec Toko Trading.`,
      ru: `Полное руководство по теме ${nameRU} охватывающее документацию процедуры требования соответствия и ставки пошлин. Таможня с опытом Toko Trading.`,
    }
  };

  // ─── Title / Subtitle ────────────────────────────────────────────
  const title = {
    tr: nameTR,
    en: nameEN,
    fr: nameFR,
    ru: nameRU,
  };

  const subtitle = {
    tr: isRegional
      ? `${regionTR} icin kapsamli gumruk mevzuati ve ithalat prosedurlerine dair detayli rehberiniz`
      : `${regionTR} icin gumruk uyumluluk gereksinimleri sertifikasyon surecleri ve belgelendirme standartlari`,
    en: isRegional
      ? `Your comprehensive guide to customs regulations and import procedures for ${regionEN}`
      : `Customs compliance requirements certification processes and documentation standards for ${regionEN}`,
    fr: isRegional
      ? `Votre guide complet des reglementations douanieres et des procedures dimportation pour ${regionFR}`
      : `Exigences de conformite douaniere processus de certification et normes de documentation pour ${regionFR}`,
    ru: isRegional
      ? `Ваше полное руководство по таможенным правилам и процедурам импорта для ${regionRU}`
      : `Требования таможенного соответствия процессы сертификации и стандарты документации для ${regionRU}`,
  };

  // ─── Overview (3 paragraphs) ──────────────────────────────────────
  const overview = [];

  // Paragraph 1: Introduction
  overview.push({
    tr: `${nameTR} konusu uluslararasi ticaretin en kritik ve karmasik boyutlarindan birini olusturmaktadir. Turkiyeden ${regionTR} yonelik ihracat ve ithalat islemlerinde gumruk mevzuatina tam uyumluluk saglanmasi basarili ticaretin temel kosullarindan biridir. Gumruk prosedurlerinin dogru ve eksiksiz bir sekilde yonetilmesi sevkiyat surelerini onemli olcude kisaltir maliyetleri minimize eder ve olasi cezai yaptirimlardan korunmayi garantiler. Turkiye stratejik cografi konumu ve gelismis lojistik altyapisi sayesinde ${regionTR} yonelik ihracatta onemli bir avantaja sahiptir. ${certReqs} gibi gereksinimler bu pazarlarda basarili olmanin vazgecilmez unsurleri arasinda yer almaktadir. Toko Trading olarak bu karmasik surecte isletmelere kapsamli rehberlik sunuyor ve tum gumruk islemlerini profesyonel sekilde yonetiyoruz. Gumruk beyannamelerinin hazirlanmasindan belgelerin tamamlanmasina kadar her asamada yaninizdayiz.`,
    en: `${nameEN} represents one of the most critical and complex dimensions of international trade operations. Achieving full compliance with customs regulations for exports and imports from Turkey to ${regionEN} is a fundamental prerequisite for successful commercial transactions. Proper management of customs procedures significantly reduces shipping times minimizes costs and protects businesses from potential penalties and legal complications. Turkey leverages its strategic geographical position and advanced logistics infrastructure to provide substantial advantages for exports to ${regionEN}. Requirements such as ${certReqs} are indispensable elements for succeeding in these markets. At Toko Trading we provide comprehensive guidance through this complex process and manage all customs procedures professionally ensuring every step from declaration preparation to document completion is handled with expertise and precision.`,
    fr: `${nameFR} represente lune des dimensions les plus critiques et complexes des operations commerciales internationales. La conformite totale aux reglementations douanieres pour les exportations et importations de la Turquie vers ${regionFR} est une condition fondamentale pour des transactions commerciales reussies. La gestion correcte des procedures douanieres reduit considerablement les delais dexpedition minimise les couts et protege les entreprises contre les penalites potentielles et les complications juridiques. La Turquie tire parti de sa position geographique strategique et de son infrastructure logistique avancee pour offrir des avantages substantiels pour les exportations vers ${regionFR}. Des exigences telles que ${certReqs} sont des elements indispensables pour reussir sur ces marches. Chez Toko Trading nous fournissons un accompagnement complet a travers ce processus complexe et gerons toutes les procedures douanieres de maniere professionnelle.`,
    ru: `${nameRU} представляет собой одно из наиболее критических и сложных измерений международных торговых операций. Достижение полного соответствия таможенным правилам для экспорта и импорта из Турции в ${regionRU} является фундаментальным условием успешных коммерческих сделок. Правильное управление таможенными процедурами значительно сокращает сроки доставки минимизирует расходы и защищает бизнес от потенциальных штрафов и юридических осложнений. Турция использует свое стратегическое географическое положение и развитую логистическую инфраструктуру для обеспечения существенных преимуществ при экспорте в ${regionRU}. Такие требования как ${certReqs} являются обязательными элементами для успеха на этих рынках. В Toko Trading мы обеспечиваем комплексное сопровождение через этот сложный процесс и профессионально управляем всеми таможенными процедурами.`,
  });

  // Paragraph 2: Key requirements and duty rates
  overview.push({
    tr: `${regionTR} pazarlarinda gecerli gumruk vergisi oranlari genel olarak ${dutyRange} araliginda degismekte olup urun kategorisine ulke mensei anlasmalaryna ve ozel ticaret duzenlemelerine gore farkliliklar gostermektedir. ${agreementNote} ticaret akisini kolaylastirmakta ve isletmelere rekabet avantaji saglamaktadir. Temel belge gereksinimleri arasinda ${keyCert} gibi kritik evraklar yer almakta olup bu belgelerin eksiksiz ve dogru hazirlanmasi gumrukten sorunsuz gecis icin zorunludur. Ayrica urunlerin ilgili teknik standartlara ve kalite belgelerine uygunlugu da ithalat oncesinde dogrulanmak zorundadir. Yanlis veya eksik belgeler ciddi gecikmelere ek maliyetlere ve hatta malların gumrukte alikonulmasina neden olabilmektedir. Bu nedenle deneyimli bir gumruk danismani ile calismak buyuk onem tasimaktadir. Toko Trading uzman kadrosu ile tum bu surecleri sizin adınıza yoneterek ticaret operasyonlarınızın kesintisiz surmesini saglar.`,
    en: `Customs duty rates applicable in ${regionEN} generally range from ${dutyRange} varying according to product category country of origin trade agreements and special commercial arrangements. ${agreementNote} trade flows and provides businesses with competitive advantages in the market. Key documentary requirements include critical paperwork such as ${keyCert} and the complete and accurate preparation of these documents is mandatory for smooth customs clearance. Additionally product compliance with relevant technical standards and quality certifications must be verified prior to importation. Incorrect or incomplete documentation can lead to serious delays additional costs and even detention of goods at customs. Working with an experienced customs consultant is therefore of paramount importance for international traders. Toko Trading manages all these processes on your behalf through our expert team ensuring your trade operations continue without interruption across all stages of the supply chain.`,
    fr: `Les taux de droits de douane applicables dans ${regionFR} varient generalement de ${dutyRange} selon la categorie de produit le pays dorigine les accords commerciaux et les arrangements commerciaux speciaux. ${agreementNote} les flux commerciaux et offre aux entreprises des avantages competitifs. Les exigences documentaires cles comprennent des documents critiques tels que ${keyCert} et la preparation complete et exacte de ces documents est obligatoire pour un dedouanement en douceur. De plus la conformite des produits aux normes techniques et aux certifications de qualite pertinentes doit etre verifiee avant limportation. Des documents incorrects ou incomplets peuvent entrainer de graves retards des couts supplementaires et meme la retention des marchandises en douane. Toko Trading gere tous ces processus en votre nom grace a notre equipe dexperts assurant la continuite de vos operations commerciales.`,
    ru: `Ставки таможенных пошлин применимые в ${regionRU} обычно варьируются от ${dutyRange} в зависимости от категории товара страны происхождения торговых соглашений и специальных коммерческих договоренностей. ${agreementNote} торговые потоки и обеспечивает предприятиям конкурентные преимущества на рынке. Ключевые требования к документации включают такие критически важные документы как ${keyCert} и их полная и точная подготовка является обязательной для беспрепятственного таможенного оформления. Кроме того соответствие продукции соответствующим техническим стандартам и сертификатам качества должно быть подтверждено до импорта. Неправильная или неполная документация может привести к серьезным задержкам дополнительным расходам и даже задержанию товаров на таможне. Toko Trading управляет всеми этими процессами от вашего имени через нашу экспертную команду обеспечивая бесперебойность ваших торговых операций.`,
  });

  // Paragraph 3: Products and trade flow
  const prodListEN = productList.join(', ');
  overview.push({
    tr: `${regionTR} pazarlarina yonelik en cok talep goren ve en yuksek ticaret hacmine sahip urun kategorileri arasinda ${prodListEN} gibi stratejik kalemler bulunmaktadir. Bu urunlerin her biri farkli gumruk prosedurlerine teknik standartlara ve belgelendirme gereksinimlerine tabidir ve her bir kategori icin ozel bir yaklasim gerekmektedir. Turkiye bu urun kategorilerinin cogunluğunda guclu bir uretim kapasitesine ve uluslararasi kalite standartlarina uygun tesislere sahip olup kuresel pazarlarda rekabetci bir konumdadir. Turkiyenin AB Gumruk Birligi uyeliginden kaynaklanan avantajlar bircok urun kategorisinde ticaret kolayligi saglamakta ve gumruk surelerini kisaltmaktadir. Toko Trading tum bu urun kategorilerinde derinlemesine uzmanliga sahip olup musterilerimize pazar arastirmasindan sevkiyata kadar butunsel bir ticaret cozumu sunmaktadir. Her urun grubuna ozel gumruk stratejileri gelistirerek musterilerimizin maliyet optimizasyonu ve uyumluluk hedeflerine ulasmalarini sagliyoruz.`,
    en: `The most demanded product categories with the highest trade volume destined for ${regionEN} include strategic items such as ${prodListEN}. Each of these products is subject to different customs procedures technical standards and certification requirements and each category demands a specialized approach tailored to its specific regulatory environment. Turkey possesses strong manufacturing capacity and facilities compliant with international quality standards across most of these product categories maintaining a competitive position in global markets. Advantages stemming from Turkeys EU Customs Union membership facilitate trade across many product categories and shorten customs processing times considerably. Toko Trading has in-depth expertise across all these product categories offering our clients a holistic trade solution from market research to shipment and final delivery. We develop customs strategies specific to each product group ensuring our clients achieve their cost optimization and compliance objectives throughout the entire trading process.`,
    fr: `Les categories de produits les plus demandees avec le volume commercial le plus eleve destinees a ${regionFR} comprennent des articles strategiques tels que ${prodListEN}. Chacun de ces produits est soumis a des procedures douanieres differentes des normes techniques et des exigences de certification et chaque categorie exige une approche specialisee. La Turquie possede une forte capacite de fabrication et des installations conformes aux normes de qualite internationales dans la plupart de ces categories de produits maintenant une position competitive sur les marches mondiaux. Les avantages decoulant de ladhesion de la Turquie a lUnion Douaniere de lUE facilitent le commerce dans de nombreuses categories de produits et raccourcissent considerablement les delais de traitement douanier. Toko Trading dispose dune expertise approfondie dans toutes ces categories de produits offrant a nos clients une solution commerciale globale de la recherche de marche a lexpedition et la livraison finale.`,
    ru: `Наиболее востребованные категории товаров с наибольшим объемом торговли предназначенные для ${regionRU} включают стратегические позиции такие как ${prodListEN}. Каждый из этих товаров подлежит различным таможенным процедурам техническим стандартам и требованиям сертификации и каждая категория требует специализированного подхода. Турция обладает мощными производственными мощностями и объектами соответствующими международным стандартам качества в большинстве этих товарных категорий сохраняя конкурентные позиции на мировых рынках. Преимущества вытекающие из членства Турции в Таможенном союзе ЕС облегчают торговлю во многих товарных категориях и значительно сокращают сроки таможенного оформления. Toko Trading обладает глубокой экспертизой во всех этих товарных категориях предлагая нашим клиентам комплексное торговое решение от исследования рынка до отгрузки и окончательной доставки.`,
  });

  // ─── Procedures (4 per entry) ─────────────────────────────────────
  const procedures = [
    {
      title: {
        tr: 'On Inceleme ve Siniflandirma',
        en: 'Pre-screening and Classification',
        fr: 'Pre-examen et Classification',
        ru: 'Предварительная Проверка и Классификация',
      },
      description: {
        tr: `Ihracat oncesi tum urunlerin gumruk tarife numaralarinin belirlenmesi ve ilgili mevzuata gore siniflandirilmasi gerekmektedir. Bu asamada urunlerin HS kodlari dogrulanir gecerli gumruk vergisi oranlari hesaplanir ve olasi kisitlamalar veya kotalar arastirilir. Ayrica urunlerin ${regionTR} pazarina girisi icin gerekli sertifikalar ve izinler belirlenerek basvuru sureci baslatilir. Toko Trading bu siniflandirma surecini uzman kadrosuyla yoneterek en uygun tarife pozisyonunu belirler ve musteri adina tum basvurulari tamamlar.`,
        en: `Prior to export all products must have their customs tariff numbers determined and be classified according to relevant legislation. During this stage HS codes are verified applicable customs duty rates are calculated and potential restrictions or quotas are investigated. Additionally certificates and permits required for product entry into ${regionEN} are identified and application processes are initiated. Toko Trading manages this classification process with our expert team identifying the most appropriate tariff position and completing all applications on behalf of the client ensuring nothing is overlooked.`,
        fr: `Avant lexportation tous les produits doivent avoir leurs numeros tarifaires douaniers determines et etre classes conformement a la legislation pertinente. A ce stade les codes SH sont verifies les taux de droits de douane applicables sont calcules et les restrictions ou quotas potentiels sont examines. De plus les certificats et permis requis pour lentree des produits dans ${regionFR} sont identifies et les processus de demande sont inities. Toko Trading gere ce processus de classification avec notre equipe dexperts.`,
        ru: `Перед экспортом все товары должны иметь определенные таможенные тарифные номера и быть классифицированы в соответствии с соответствующим законодательством. На этом этапе проверяются коды HS рассчитываются применимые ставки таможенных пошлин и исследуются потенциальные ограничения или квоты. Кроме того определяются сертификаты и разрешения необходимые для ввоза товаров в ${regionRU} и инициируются процессы подачи заявок. Toko Trading управляет этим процессом классификации с помощью нашей экспертной команды.`,
      }
    },
    {
      title: {
        tr: 'Belge Hazırlama ve Dogrulama',
        en: 'Document Preparation and Verification',
        fr: 'Preparation et Verification des Documents',
        ru: 'Подготовка и Проверка Документов',
      },
      description: {
        tr: `Gumruk islemlerinin en kritik asamasi belge hazirlama ve dogrulamadir. ${docsShort} gibi temel belgelerin eksiksiz ve dogru hazirlanmasi gumrukten sorunsuz gecis icin zorunludur. Her belgenin ilgili makamlarca onaylanmasi ve gerekli hallerde noter tasdiki veya apostil islemlerinin tamamlanmasi gerekmektedir. Toko Trading deneyimli belge yonetimi ekibi tum evraklari titizlikle hazirlar kontrol eder ve zamaninda teslim edilmesini saglar. Belgelerdeki en kucuk hatalar bile ciddi gecikmelere ve ek maliyetlere yol acabileceginden profesyonel destek kritik onem tasimaktadir.`,
        en: `The most critical stage of customs operations is document preparation and verification. Essential documents such as ${docsShort} must be prepared completely and accurately for smooth customs clearance. Each document must be certified by relevant authorities and where necessary notarization or apostille procedures must be completed. Toko Trading experienced document management team meticulously prepares reviews and ensures timely delivery of all paperwork. Since even the smallest errors in documentation can lead to serious delays and additional costs professional support in this area is of critical importance for successful trade operations.`,
        fr: `Letape la plus critique des operations douanieres est la preparation et la verification des documents. Les documents essentiels tels que ${docsShort} doivent etre prepares completement et avec precision pour un dedouanement en douceur. Chaque document doit etre certifie par les autorites competentes et le cas echeant les procedures de notarisation ou dapostille doivent etre completees. Lequipe de gestion documentaire experimentee de Toko Trading prepare minutieusement et verifie tous les documents assurant leur livraison en temps voulu.`,
        ru: `Наиболее критическим этапом таможенных операций является подготовка и проверка документов. Основные документы такие как ${docsShort} должны быть подготовлены полностью и точно для беспрепятственного таможенного оформления. Каждый документ должен быть заверен соответствующими органами и при необходимости должны быть завершены процедуры нотариального заверения или апостиля. Опытная команда Toko Trading по управлению документами тщательно готовит проверяет и обеспечивает своевременную доставку всех документов.`,
      }
    },
    {
      title: {
        tr: 'Gumruk Beyani ve Islemler',
        en: 'Customs Declaration and Processing',
        fr: 'Declaration en Douane et Traitement',
        ru: 'Таможенная Декларация и Обработка',
      },
      description: {
        tr: `Gumruk beyannamesinin hazirlanmasi ve ilgili gumruk idaresine sunulmasi ihracat ve ithalat surecinin resmi baslangicini olusturur. Beyanname urun bilgileri deger beyan mensei ulke ve tarife siniflandirmasi gibi kritik verileri icerir. ${regionTR} gumruk idareleri bu beyanlari detayli incelemeye tabi tutarak urun numuneleri uzerinde fiziksel kontrol yapabilmektedir. Elektronik gumruk sistemleri uzerinden yapilan beyanlar sureci hizlandirmakta ancak teknik gereksinimlere tam uyum saglanmasini zorunlu kilmaktadir. Toko Trading gumruk musavirleri tum beyan surecini yoneterek hatasiz ve hizli islem tamamlanmasini garanti eder ve olasi sorunlari onceden tespit ederek cozum uretir.`,
        en: `The preparation and submission of customs declarations to relevant customs authorities constitutes the official commencement of export and import processes. Declarations contain critical data including product information declared value country of origin and tariff classification. ${regionEN} customs authorities subject these declarations to detailed examination and may conduct physical inspections of product samples. Electronic customs systems expedite the declaration process but mandate full compliance with technical requirements. Toko Trading customs brokers manage the entire declaration process guaranteeing error-free and rapid completion while proactively identifying and resolving potential issues before they cause delays.`,
        fr: `La preparation et la soumission des declarations en douane aux autorites douanieres concernees constituent le debut officiel des processus dexportation et dimportation. Les declarations contiennent des donnees critiques incluant les informations sur le produit la valeur declaree le pays dorigine et la classification tarifaire. Les autorites douanieres de ${regionFR} soumettent ces declarations a un examen detaille et peuvent effectuer des inspections physiques des echantillons de produits. Les courtiers en douane de Toko Trading gerent lensemble du processus de declaration garantissant un traitement sans erreur et rapide.`,
        ru: `Подготовка и подача таможенных деклараций в соответствующие таможенные органы является официальным началом процессов экспорта и импорта. Декларации содержат критически важные данные включая информацию о товаре заявленную стоимость страну происхождения и тарифную классификацию. Таможенные органы ${regionRU} подвергают эти декларации детальной проверке и могут проводить физический осмотр образцов продукции. Таможенные брокеры Toko Trading управляют всем процессом декларирования гарантируя безошибочное и быстрое завершение.`,
      }
    },
    {
      title: {
        tr: 'Teslim Sonrasi Uyumluluk ve Takip',
        en: 'Post-delivery Compliance and Follow-up',
        fr: 'Conformite et Suivi Post-livraison',
        ru: 'Послепоставочное Соответствие и Контроль',
      },
      description: {
        tr: `Mallarin gumrukten gecisi ve teslimi sonrasinda da uyumluluk sureci devam etmektedir. Ithalat sonrasi denetimler vergi mutabakatları ve gerekli raporlamalarin zamaninda yapilmasi yasal zorunluluklardan biridir. ${regionTR} pazarlarinda faaliyet gosteren isletmelerin yerel duzenleyici kurumlarla surekli iletisim halinde olmasi ve mevzuat degisikliklerini yakindan takip etmesi gerekmektedir. Toko Trading musteri iliskilerimiz sevkiyat tamamlandiktan sonra da devam etmekte olup ithalat sonrasi denetim destegi vergi iade surecleri ve mevzuat guncelleme bildirimleri gibi hizmetler sunmaktayiz. Bu butunsel yaklasim musterilerimizin uzun vadeli ticaret basarisini guvence altina almaktadir.`,
        en: `The compliance process continues even after goods have cleared customs and been delivered to their destination. Post-import audits tax reconciliations and timely completion of required reporting are among the legal obligations that businesses must fulfill. Companies operating in ${regionEN} must maintain continuous communication with local regulatory authorities and closely monitor legislative changes and regulatory updates. Toko Trading client relationships continue well after shipment completion offering post-import audit support tax refund processing and regulatory update notifications. This holistic approach safeguards our clients long-term trade success and ensures ongoing compliance with evolving regulations.`,
        fr: `Le processus de conformite se poursuit meme apres que les marchandises ont ete dedouanees et livrees. Les audits post-importation les rapprochements fiscaux et la completion en temps voulu des rapports requis font partie des obligations legales. Les entreprises operant dans ${regionFR} doivent maintenir une communication continue avec les autorites reglementaires locales et surveiller etroitement les changements legislatifs. Les relations clients de Toko Trading se poursuivent bien apres lachevement de lexpedition offrant un soutien daudit post-importation et des notifications de mises a jour reglementaires.`,
        ru: `Процесс соответствия продолжается даже после того как товары прошли таможенную очистку и были доставлены к месту назначения. Пост-импортные аудиты налоговые сверки и своевременное выполнение обязательной отчетности являются юридическими обязательствами бизнеса. Компании работающие в ${regionRU} должны поддерживать постоянную связь с местными регулирующими органами и внимательно следить за законодательными изменениями. Клиентские отношения Toko Trading продолжаются и после завершения отгрузки предлагая поддержку пост-импортного аудита и уведомления об обновлениях нормативных актов.`,
      }
    },
  ];

  // ─── Required Documents (4 per entry) ─────────────────────────────
  const requiredDocuments = [
    {
      name: {
        tr: 'Ticari Fatura (Commercial Invoice)',
        en: 'Commercial Invoice',
        fr: 'Facture Commerciale',
        ru: 'Коммерческий Счет-фактура',
      },
      description: {
        tr: `Ihracatci tarafindan duzenlenen urunlerin degerini miktarini birim fiyatini ve ticaret sartlarini gosteren resmi ticari belge. ${regionTR} gumruk idareleri tarafindan gumruk vergisi hesaplamasinda esas alinir.`,
        en: `Official commercial document issued by the exporter showing the value quantity unit price and trade terms of the products. Used by ${regionEN} customs authorities as the basis for customs duty calculation and assessment.`,
        fr: `Document commercial officiel emis par lexportateur indiquant la valeur la quantite le prix unitaire et les conditions commerciales des produits. Utilise par les autorites douanieres de ${regionFR} comme base de calcul des droits de douane.`,
        ru: `Официальный коммерческий документ выданный экспортером показывающий стоимость количество цену за единицу и условия торговли продукции. Используется таможенными органами ${regionRU} как основа для расчета таможенных пошлин.`,
      }
    },
    {
      name: {
        tr: 'Konisimento / Tasima Belgesi',
        en: 'Bill of Lading / Transport Document',
        fr: 'Connaissement / Document de Transport',
        ru: 'Коносамент / Транспортный Документ',
      },
      description: {
        tr: `Mallarin tasiyici tarafindan teslim alindigini ve belirlenen destinasyona tasinacagini gosteren yasal belge. Deniz tasimaciligi icin konisimento kara icin CMR hava icin AWB kullanilir. ${regionTR} ithalat gumrugunde sunulmasi zorunludur.`,
        en: `Legal document showing that goods have been received by the carrier and will be transported to the designated destination. Bill of lading is used for sea transport CMR for road and AWB for air freight. Mandatory presentation at ${regionEN} import customs for clearance processing.`,
        fr: `Document juridique montrant que les marchandises ont ete recues par le transporteur et seront transportees vers la destination designee. Le connaissement est utilise pour le transport maritime CMR pour la route et LTA pour le fret aerien. Presentation obligatoire a la douane dimportation de ${regionFR}.`,
        ru: `Юридический документ подтверждающий что товары были приняты перевозчиком и будут доставлены в указанный пункт назначения. Для морских перевозок используется коносамент для автомобильных CMR для воздушных AWB. Обязательное предъявление на импортной таможне ${regionRU}.`,
      }
    },
    {
      name: {
        tr: 'Mensei Sertifikasi',
        en: 'Certificate of Origin',
        fr: 'Certificat dOrigine',
        ru: 'Сертификат Происхождения',
      },
      description: {
        tr: `Urunlerin uretim ulkesini resmi olarak belgeleyen ve ticaret odasinca onaylanan sertifika. ${regionTR} pazarlarinda tercihli tarife uygulamasindan yararlanmak icin dogru mensei sertifikasi kritik oneme sahiptir. Turk Ticaret ve Sanayi Odalari Birligi tarafindan duzenlenir.`,
        en: `Certificate officially documenting the country of manufacture of products endorsed by the chamber of commerce. The correct certificate of origin is critically important for benefiting from preferential tariff treatment in ${regionEN}. Issued by the Union of Chambers and Commodity Exchanges of Turkey for Turkish exports.`,
        fr: `Certificat documentant officiellement le pays de fabrication des produits approuve par la chambre de commerce. Le certificat dorigine correct est dune importance critique pour beneficier du traitement tarifaire preferentiel dans ${regionFR}. Delivre par lUnion des Chambres de Commerce de Turquie.`,
        ru: `Сертификат официально подтверждающий страну производства товаров заверенный торговой палатой. Правильный сертификат происхождения критически важен для получения преференциального тарифного режима в ${regionRU}. Выдается Союзом Торговых и Товарных Палат Турции.`,
      }
    },
    {
      name: {
        tr: 'Paketleme Listesi',
        en: 'Packing List',
        fr: 'Liste de Colisage',
        ru: 'Упаковочный Лист',
      },
      description: {
        tr: `Sevkiyattaki tum mallarin detayli listesini agirliklarini boyutlarini ve ambalaj sekliini gosteren belge. ${regionTR} gumruk muayenesinde fiziksel kontrol sirasinda beyanname ile karsilastirma icin kullanilir. Ticari fatura ile tutarli olmasi gerekmektedir.`,
        en: `Document showing the detailed list of all goods in the shipment their weights dimensions and packaging type. Used during ${regionEN} customs examination for comparison with the declaration during physical inspection. Must be consistent with the commercial invoice for verification purposes.`,
        fr: `Document montrant la liste detaillee de toutes les marchandises dans lexpedition leurs poids dimensions et type demballage. Utilise lors de lexamen douanier de ${regionFR} pour comparaison avec la declaration lors de linspection physique. Doit etre coherent avec la facture commerciale.`,
        ru: `Документ содержащий подробный перечень всех товаров в партии их вес размеры и тип упаковки. Используется при таможенном досмотре в ${regionRU} для сравнения с декларацией при физической проверке. Должен соответствовать коммерческому счету-фактуре.`,
      }
    },
  ];

  // ─── HS Codes (3 per entry based on product focus) ────────────────
  const hsProducts = productList.slice(0, 3);
  const hsCodes = [
    {
      code: isRegional ? '8401-8485' : '0100-9999',
      description: {
        tr: `${hsProducts[0] || 'genel urunler'} kategorisi icin gecerli gumruk tarife numaralari. Urun alt kategorisine gore spesifik HS kodu belirlenir.`,
        en: `Customs tariff numbers applicable for the ${hsProducts[0] || 'general products'} category. Specific HS code is determined based on product subcategory classification.`,
        fr: `Numeros tarifaires douaniers applicables pour la categorie ${hsProducts[0] || 'produits generaux'}. Le code SH specifique est determine en fonction de la classification de la sous-categorie.`,
        ru: `Таможенные тарифные номера применимые для категории ${hsProducts[0] || 'общие товары'}. Конкретный код HS определяется на основе классификации подкатегории товара.`,
      },
      dutyRate: {
        tr: `${dutyRange} araliginda urun cesidine gore degisir`,
        en: `Ranges from ${dutyRange} depending on product variety`,
        fr: `Varie de ${dutyRange} selon la variete du produit`,
        ru: `Варьируется от ${dutyRange} в зависимости от вида товара`,
      }
    },
    {
      code: isRegional ? '2801-3826' : '2800-3900',
      description: {
        tr: `${hsProducts[1] || 'kimyasal urunler'} kategorisi icin gumruk siniflandirmasi. Anti-damping vergileri ve ek gumruk vergileri uygulanabilir.`,
        en: `Customs classification for the ${hsProducts[1] || 'chemical products'} category. Anti-dumping duties and additional customs levies may apply depending on origin.`,
        fr: `Classification douaniere pour la categorie ${hsProducts[1] || 'produits chimiques'}. Des droits antidumping et des prelevements douaniers supplementaires peuvent sappliquer.`,
        ru: `Таможенная классификация для категории ${hsProducts[1] || 'химические продукты'}. Могут применяться антидемпинговые пошлины и дополнительные таможенные сборы.`,
      },
      dutyRate: {
        tr: `Ozel vergi oranlari uygulanabilir urun bazinda kontrol gereklidir`,
        en: `Special duty rates may apply product-specific verification required`,
        fr: `Des taux de droits speciaux peuvent sappliquer verification specifique au produit requise`,
        ru: `Могут применяться специальные ставки пошлин требуется проверка конкретного товара`,
      }
    },
    {
      code: isRegional ? '7201-8113' : '7000-8200',
      description: {
        tr: `${hsProducts[2] || 'metal ve celik urunleri'} kategorisi icin tarife pozisyonu. Miktar kisitlamalari ve kota uygulamalari soz konusu olabilir.`,
        en: `Tariff position for the ${hsProducts[2] || 'metal and steel products'} category. Quantity restrictions and quota applications may be in effect for certain items.`,
        fr: `Position tarifaire pour la categorie ${hsProducts[2] || 'metaux et produits en acier'}. Des restrictions quantitatives et des applications de quotas peuvent etre en vigueur.`,
        ru: `Тарифная позиция для категории ${hsProducts[2] || 'металлы и стальная продукция'}. Для определенных товаров могут действовать количественные ограничения и квоты.`,
      },
      dutyRate: {
        tr: `Kota dahilinde dusuk oran kota disinda yuksek oran uygulanabilir`,
        en: `Lower rate within quota higher rate outside quota may apply`,
        fr: `Taux inferieur dans le quota taux superieur hors quota peut sappliquer`,
        ru: `Более низкая ставка в рамках квоты более высокая ставка вне квоты может применяться`,
      }
    },
  ];

  // ─── Restrictions ─────────────────────────────────────────────────
  const restrictions = {
    tr: `${regionTR} pazarlarinda belirli urun kategorileri icin ozel ithalat kisitlamalari ve duzenleyici gereksinimler bulunmaktadir. ${restrictNote}. Bu kisitlamalar urun guvenligini tuketici sagligini ve cevre korumasini saglamak amaciyla uygulanmaktadir. Bazi urunler icin on izin lisans veya ozel sertifikasyon gerekliligi bulunabilir ve bu gereksinimler duzenli olarak guncellenmektedir. Kisitlanan urunler arasinda belirli kimyasal maddeler gida katki maddeleri tibbi cihazlar ve cift kullanumli teknolojiler yer alabilmektedir. Toko Trading uzman kadrosu guncel kisitlamalari surekli takip ederek musterilerine proaktif bilgilendirme saglar ve uyumluluk stratejileri gelistirir.`,
    en: `Specific import restrictions and regulatory requirements exist for certain product categories in ${regionEN}. ${restrictNote}. These restrictions are implemented to ensure product safety consumer health protection and environmental compliance. Some products may require prior authorization licensing or special certification and these requirements are regularly updated to reflect evolving standards. Restricted products may include certain chemical substances food additives medical devices and dual-use technologies. Toko Trading expert team continuously monitors current restrictions providing proactive information to clients and developing comprehensive compliance strategies that anticipate regulatory changes.`,
    fr: `Des restrictions dimportation specifiques et des exigences reglementaires existent pour certaines categories de produits dans ${regionFR}. ${restrictNote}. Ces restrictions sont mises en oeuvre pour assurer la securite des produits la protection de la sante des consommateurs et la conformite environnementale. Certains produits peuvent necessiter une autorisation prealable une licence ou une certification speciale. Lequipe dexperts de Toko Trading surveille en permanence les restrictions actuelles et developpe des strategies de conformite completes.`,
    ru: `Для определенных категорий товаров в ${regionRU} существуют специальные ограничения на импорт и нормативные требования. ${restrictNote}. Эти ограничения применяются для обеспечения безопасности продукции защиты здоровья потребителей и соблюдения экологических норм. Некоторые товары могут требовать предварительного разрешения лицензирования или специальной сертификации. Экспертная команда Toko Trading постоянно отслеживает текущие ограничения и разрабатывает комплексные стратегии соответствия.`,
  };

  // ─── Toko Support ─────────────────────────────────────────────────
  const tokoSupport = {
    tr: `${tokoNote}. Uzman gumruk danismanlari ve deneyimli dis ticaret ekibimiz ile ${regionTR} pazarlarinda gumruk islemlerinizin tamamini profesyonel olarak yonetiyoruz. Belge hazirlama surecinden gumruk beyanina sertifikasyon islemlerinden teslim sonrasi takibe kadar her asamada yaninizdayiz. Turkiyenin onde gelen ticaret platformu olarak geniş tedarikci agimiz ve sektör deneyimimizle musterilerimize butunsel bir ticaret cozumu sunuyoruz. Toko Trading farki kaliteli hizmet anlayisi uzmanlik bilgisi ve musteri memnuniyetine olan bagliliktir.`,
    en: `${tokoNote}. With our expert customs consultants and experienced international trade team we professionally manage all your customs operations in ${regionEN}. We stand by you at every stage from document preparation through customs declaration from certification processes to post-delivery follow-up ensuring seamless operations. As Turkeys leading trade platform our extensive supplier network and deep sector experience enable us to offer our clients a holistic trade solution. The Toko Trading difference lies in our commitment to quality service deep expertise and unwavering dedication to client satisfaction across every transaction.`,
    fr: `${tokoNote}. Avec nos consultants douaniers experts et notre equipe experimentee en commerce international nous gerons professionnellement toutes vos operations douanieres dans ${regionFR}. Nous vous accompagnons a chaque etape de la preparation des documents a la declaration en douane des processus de certification au suivi post-livraison. En tant que plateforme commerciale leader de la Turquie notre vaste reseau de fournisseurs et notre profonde experience sectorielle nous permettent doffrir a nos clients une solution commerciale holistique.`,
    ru: `${tokoNote}. С нашими экспертными таможенными консультантами и опытной командой международной торговли мы профессионально управляем всеми вашими таможенными операциями в ${regionRU}. Мы стоим рядом с вами на каждом этапе от подготовки документов до таможенного декларирования от процессов сертификации до послепоставочного контроля. Как ведущая торговая платформа Турции наша обширная сеть поставщиков и глубокий отраслевой опыт позволяют нам предлагать нашим клиентам комплексное торговое решение.`,
  };

  // ─── CTA ──────────────────────────────────────────────────────────
  const cta = {
    title: {
      tr: `${nameTR} Hakkinda Destek Alin`,
      en: `Get Support on ${nameEN}`,
      fr: `Obtenez de lAide sur ${nameFR}`,
      ru: `Получите Поддержку по ${nameRU}`,
    },
    description: {
      tr: `${regionTR} pazarlarina yonelik gumruk islemleriniz icin Toko Trading uzmanlarindan ucretsiz danismanlik alin. Ihracat ve ithalat sureclerinizi optimize etmenize yardimci olalim.`,
      en: `Get free consultation from Toko Trading experts for your customs operations targeting ${regionEN}. Let us help you optimize your export and import processes for maximum efficiency and compliance.`,
      fr: `Obtenez une consultation gratuite des experts de Toko Trading pour vos operations douanieres ciblant ${regionFR}. Laissez-nous vous aider a optimiser vos processus dexportation et dimportation.`,
      ru: `Получите бесплатную консультацию от экспертов Toko Trading по вашим таможенным операциям нацеленным на ${regionRU}. Позвольте нам помочь вам оптимизировать ваши процессы экспорта и импорта.`,
    },
    buttonText: {
      tr: 'Ucretsiz Danismanlik Alin',
      en: 'Get Free Consultation',
      fr: 'Obtenir une Consultation Gratuite',
      ru: 'Получить Бесплатную Консультацию',
    }
  };

  return { slug, image: img, meta, content: { title, subtitle, overview, procedures, requiredDocuments, hsCodes, restrictions, tokoSupport, cta } };
}

// ─── Generate ───────────────────────────────────────────────────────────────

const pages = CUSTOMS.map(buildCustoms);

// Validate word counts
let minWc = Infinity, minSlug = '', minLocale = '';
for (const p of pages) {
  for (const loc of ['tr','en','fr','ru']) {
    let total = 0;
    // count all LocaleContent strings recursively
    function countAll(obj) {
      if (!obj || typeof obj !== 'object') return;
      if (typeof obj.tr === 'string' && typeof obj.en === 'string' && typeof obj.fr === 'string' && typeof obj.ru === 'string') {
        total += wc(obj[loc]);
      }
      if (Array.isArray(obj)) { obj.forEach(countAll); }
      else { Object.values(obj).forEach(countAll); }
    }
    countAll(p);
    if (total < minWc) { minWc = total; minSlug = p.slug; minLocale = loc; }
  }
}

console.log(`Generating customs.ts...`);
console.log(`  Min word count: ${minWc} (${minSlug} [${minLocale}])`);
console.log(`  Total customs entries: ${pages.length}`);

if (minWc < 500) {
  console.error(`ERROR: ${minSlug} [${minLocale}] has only ${minWc} words (need 500+)`);
  process.exit(1);
}

// Write output
const lines = [
  "import type { CustomsPageData } from './types';",
  '',
  '/** All customs/regulation guide pages – generated by scripts/gen-customs.cjs */',
  'export const customsPages: CustomsPageData[] = ',
  JSON.stringify(pages, null, 2) + ';',
];

fs.writeFileSync(path.join(OUT, 'customs.ts'), lines.join('\n'), 'utf-8');
console.log(`  Written (${lines.join('\n').length} chars)`);
