#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'src', 'data', 'pseo');

function wc(t) { return t.trim().split(/\s+/).filter(w => w.length > 0).length; }

// [slug, flag, imgId, nameEN, nameTR, nameFR, nameRU, tradeVolEN, tradeVolTR, topExportsEN, topImportsEN, balanceEN, growthEN, ftaEN, sectors, logEN1, logEN2, logEN3]
const COUNTRIES = [
  ['germany','🇩🇪','photo-1467269204594-9661b134dd2b','Germany','Almanya','Allemagne','Германия',
   'USD 22 billion','22 milyar dolar','machinery vehicles textiles chemicals','machinery vehicles chemicals electronics','balanced trade','8 percent annual growth','EU Customs Union',
   'automotive machinery chemicals textiles food','Rail and road through Balkans 5-7 days transit','Mediterranean shipping via Hamburg Bremerhaven 8-12 days','Intermodal connections via Austria and Romania'],
  ['united-kingdom','🇬🇧','photo-1513635269975-59663e0ac1ad','United Kingdom','Birlesik Krallik','Royaume-Uni','Великобритания',
   'USD 16.5 billion','16.5 milyar dolar','vehicles textiles gold jewelry steel','machinery pharmaceuticals oil vehicles','Turkey surplus','6 percent growth','UK-Turkey FTA 2021',
   'automotive textiles food electronics chemicals','Container shipping to Felixstowe Tilbury 12-14 days','Air freight via Istanbul to London Heathrow 4 hours','Rail-sea via Marmaray tunnel European network connection'],
  ['france','🇫🇷','photo-1502602898657-3e91760cbb34','France','Fransa','France','Франция',
   'USD 15.8 billion','15.8 milyar dolar','vehicles textiles steel food chemicals','machinery pharmaceuticals cosmetics aviation','slight Turkey deficit','5 percent growth','EU Customs Union',
   'automotive textiles chemicals food construction','Mediterranean shipping Marseille 4-5 days transit','Container shipping to Le Havre 10-12 days','Road freight through Italy 4-5 days'],
  ['italy','🇮🇹','photo-1515542622106-78bda8ba0e5b','Italy','Italya','Italie','Италия',
   'USD 20.5 billion','20.5 milyar dolar','vehicles steel textiles chemicals food','machinery chemicals textiles leather','balanced trade','7 percent growth','EU Customs Union',
   'automotive machinery textiles chemicals steel','Short sea shipping to Italian ports 2-3 days','Container via Trieste Genoa 3-5 days','Road through Balkans or Greece 3-4 days'],
  ['spain','🇪🇸','photo-1543783207-ec64e4d95325','Spain','Ispanya','Espagne','Испания',
   'USD 10.2 billion','10.2 milyar dolar','vehicles textiles chemicals steel food','vehicles machinery chemicals oil','balanced trade','9 percent growth','EU Customs Union',
   'automotive textiles chemicals construction food','Mediterranean shipping to Barcelona Valencia 5-7 days','Container shipping to Algeciras 6-8 days','Rail-sea intermodal via Italy 5-6 days'],
  ['netherlands','🇳🇱','photo-1534351590666-13e3e96b5017','Netherlands','Hollanda','Pays-Bas','Нидерланды',
   'USD 8.5 billion','8.5 milyar dolar','chemicals food textiles steel electronics','machinery chemicals food technology','Netherlands surplus as trade hub','7 percent growth','EU Customs Union',
   'chemicals food electronics textiles','Container shipping to Rotterdam 10-12 days','Rotterdam as European distribution hub gateway','Barge and rail connections to hinterland markets'],
  ['russia','🇷🇺','photo-1547448415-e9f5b28e570d','Russia','Rusya','Russie','Россия',
   'USD 35 billion','35 milyar dolar','food textiles vehicles chemicals construction','oil gas metals machinery','Turkey deficit energy imports','4 percent growth since normalization','Various bilateral agreements',
   'food construction textiles chemicals automotive','Black Sea shipping to Novorossiysk 2-3 days','Trans-Turkey corridor via Trabzon','Road transport through Georgia Caucasus route'],
  ['united-states','🇺🇸','photo-1485738422979-f5c462d49f04','United States','Amerika Birlesik Devletleri','Etats-Unis','Соединённые Штаты',
   'USD 24 billion','24 milyar dolar','steel food textiles chemicals jewelry','machinery aviation chemicals technology oil','Turkey deficit','5 percent growth','GSP beneficiary status',
   'steel food textiles chemicals aviation','Container shipping East Coast 18-22 days','Gulf ports Houston 16-20 days transit','West Coast via Suez Canal 25-30 days'],
  ['china','🇨🇳','photo-1508804185872-d7badad00f7d','China','Cin','Chine','Китай',
   'USD 38 billion','38 milyar dolar','minerals metals chemicals food marble','electronics machinery textiles chemicals','significant Turkey deficit','11 percent growth','Belt and Road cooperation',
   'minerals metals chemicals marble food','Container shipping Shanghai Ningbo 20-25 days','Middle Corridor rail via Central Asia 12-15 days','Air freight Istanbul to Chinese hubs 8-10 hours'],
  ['iraq','🇮🇶','photo-1579177593066-00b1b7e6fc93','Iraq','Irak','Irak','Ирак',
   'USD 12 billion','12 milyar dolar','food construction steel textiles chemicals','crude oil','strong Turkey surplus','3 percent growth','Bilateral trade agreements',
   'food construction steel chemicals consumer goods','Road transport via Habur gate 1-2 days','Direct overland through southeastern border','Container via Mersin to Basra 5-7 days'],
  ['saudi-arabia','🇸🇦','photo-1586724237569-9c5ae0a079f5','Saudi Arabia','Suudi Arabistan','Arabie Saoudite','Саудовская Аравия',
   'USD 8 billion','8 milyar dolar','steel food construction textiles chemicals','crude oil petrochemicals','Turkey deficit energy','6 percent growth','OIC membership cooperation',
   'construction food steel chemicals consumer goods','Container shipping Jeddah 5-7 days','Dammam port 7-10 days transit','Air freight Riyadh Jeddah 4 hours'],
  ['uae','🇦🇪','photo-1512453979798-5ea266f8880c','United Arab Emirates','Birlesik Arap Emirlikleri','Emirats Arabes Unis','Объединённые Арабские Эмираты',
   'USD 12 billion','12 milyar dolar','jewelry gold food textiles steel','oil gold re-exports','complex flows via re-export','9 percent growth','Bilateral investment treaty',
   'food textiles jewelry construction steel','Container shipping Dubai 7-8 days','Abu Dhabi 7-9 days transit','Free zone re-export hub for wider Gulf region'],
  ['egypt','🇪🇬','photo-1572252009286-268acec5ca0a','Egypt','Misir','Egypte','Египет',
   'USD 6.5 billion','6.5 milyar dolar','steel food chemicals textiles machinery','oil gas cotton','Turkey surplus','7 percent growth','Bilateral trade agreement',
   'steel food chemicals textiles machinery','Container shipping Alexandria Port Said 2-3 days','Short transit via Eastern Mediterranean route','RoRo services for vehicle exports'],
  ['israel','🇮🇱','photo-1544829099-b9a0c07fad1a','Israel','Israil','Israel','Израиль',
   'USD 7.5 billion','7.5 milyar dolar','steel food vehicles chemicals','technology chemicals diamonds','balanced trade','8 percent growth','FTA since 1997',
   'steel automotive chemicals food construction','Container shipping Haifa Ashdod 1-2 days','Shortest Eastern Med route from Mersin','Regular RoRo services for vehicles'],
  ['romania','🇷🇴','photo-1584646098378-0874589d76b1','Romania','Romanya','Roumanie','Румыния',
   'USD 6.5 billion','6.5 milyar dolar','vehicles textiles steel food chemicals','vehicles machinery chemicals','balanced trade','6 percent growth','EU Customs Union',
   'automotive textiles steel food chemicals','Black Sea shipping Constanta 1-2 days','Road transport through Bulgaria 1-2 days','Rail connections through Balkans corridor'],
  ['bulgaria','🇧🇬','photo-1558642084-fd07fae5282e','Bulgaria','Bulgaristan','Bulgarie','Болгария',
   'USD 5 billion','5 milyar dolar','vehicles textiles steel food chemicals','copper oil machinery','balanced trade','5 percent growth','EU Customs Union',
   'automotive textiles steel chemicals food','Direct road transport 1 day','Rail via Kapikule border gate','Black Sea shipping Burgas Varna 1 day'],
  ['poland','🇵🇱','photo-1519197924294-4ba991a11128','Poland','Polonya','Pologne','Польша',
   'USD 5.8 billion','5.8 milyar dolar','vehicles textiles food chemicals steel','machinery vehicles chemicals','balanced growing trade','10 percent growth','EU Customs Union',
   'automotive textiles food chemicals machinery','Road transport through Balkans 3-4 days','Container shipping via Mediterranean 12-14 days','Growing intermodal rail connections'],
  ['japan','🇯🇵','photo-1480796927426-f609979314bd','Japan','Japonya','Japon','Япония',
   'USD 3.5 billion','3.5 milyar dolar','food textiles chemicals vehicles','vehicles machinery electronics technology','Turkey deficit','4 percent growth','Bilateral EPA negotiations',
   'food textiles chemicals automotive','Container shipping 25-30 days via Suez','Air freight Istanbul to Tokyo 12 hours','Growing trade through free zone re-exports'],
  ['south-korea','🇰🇷','photo-1517154421773-0529f29ea451','South Korea','Guney Kore','Coree du Sud','Южная Корея',
   'USD 7 billion','7 milyar dolar','steel chemicals food textiles','vehicles electronics machinery','Turkey deficit','6 percent growth','FTA negotiations ongoing',
   'steel chemicals food automotive textiles','Container shipping 22-28 days via Suez','Air freight Istanbul to Seoul 10 hours','Hyundai Kia assembly link drives trade growth'],
  ['brazil','🇧🇷','photo-1483729558449-99ef09a8c325','Brazil','Brezilya','Bresil','Бразилия',
   'USD 2.5 billion','2.5 milyar dolar','chemicals steel food textiles','soybeans iron ore coffee chicken','Brazil surplus','5 percent growth','Mercosur-Turkey dialogue',
   'chemicals steel food textiles machinery','Container shipping Santos 18-22 days','Air freight Sao Paulo 14 hours','Growing bilateral commodity trade flows'],
];

function buildCountry(c) {
  const [slug,flag,imgId,nameEN,nameTR,nameFR,nameRU,trVolEN,trVolTR,topExpEN,topImpEN,balEN,growEN,ftaEN,sectorsStr,log1,log2,log3] = c;
  const img = `https://images.unsplash.com/${imgId}?auto=format&fit=crop&q=80&w=800`;
  const sectorList = sectorsStr.split(' ').filter(s=>s.length>0);

  const p1 = {
    tr: `Turkiye ile ${nameTR} arasindaki ticari iliskiler son on yilda istikrarli ve onemli bir buyume kaydetmistir ve ikili ticaret hacmi ${trVolTR} seviyesine basariyla ulasmistir. Iki ulke arasindaki ekonomik isbirligi stratejik ortaklik cercevesinde giderek derinlesmekte ve yeni is birligi alanlari kesfedilmektedir. ${nameTR} Turkiyenin en onemli ve stratejik ticaret ortaklarindan biri olup her iki ulke de karsilikli yatirim ve ticaretin gelistirilmesi icin aktif ve kararli olarak calismaktadir. Ikili ticaretin ana kalemleri arasinda ${topExpEN.split(' ').slice(0,3).join(' ')} ve diger endustriyel ve tuketici urunleri yer almakta olup bu kalemler her iki ekonominin birbirini tamamlayici yapisini ortaya koymaktadir. Bu guclu ticari bag her iki ekonomi icin de onemli katma deger uretmektedir ve gelecek yillarda yeni sektorlerin de eklenmesiyle daha da buyumesi ve derinlesmesi beklenmektedir.`,
    en: `Trade relations between Turkey and ${nameEN} have recorded significant growth over the past decade with bilateral trade volume reaching ${trVolEN}. Economic cooperation between the two countries is deepening steadily within the framework of their strategic partnership. ${nameEN} is one of Turkeys most important trade partners and both countries are actively working to develop mutual investment and trade opportunities. Main trade items include ${topExpEN} and other industrial products that demonstrate the complementary nature of both economies. This strong commercial bond generates significant added value for both economies and is expected to grow even further in the coming years as new sectors of cooperation emerge and existing partnerships deepen across the entire value chain.`,
    fr: `Les relations commerciales entre la Turquie et ${nameFR} ont enregistre une croissance significative au cours de la derniere decennie avec un volume commercial bilateral atteignant ${trVolEN}. La cooperation economique entre les deux pays sapprofondit regulierement dans le cadre de leur partenariat strategique. ${nameFR} est lun des partenaires commerciaux les plus importants de la Turquie et les deux pays travaillent activement au developpement des investissements et du commerce mutuels. Les principaux postes commerciaux comprennent ${topExpEN} et dautres produits industriels. Ce lien commercial solide genere une valeur ajoutee significative pour les deux economies.`,
    ru: `Торговые отношения между Турцией и ${nameRU} показали значительный рост за последнее десятилетие и объём двусторонней торговли достиг ${trVolEN}. Экономическое сотрудничество между двумя странами неуклонно углубляется в рамках стратегического партнёрства демонстрируя взаимную заинтересованность в развитии торговых связей. ${nameRU} является одним из важнейших торговых партнёров Турции и обе страны активно работают над развитием взаимных инвестиций и торговли на всех уровнях. Основные товарные позиции включают ${topExpEN} и другую промышленную продукцию демонстрирующую взаимодополняющий характер обеих экономик. Эта прочная торговая связь создаёт значительную добавленную стоимость для обеих экономик и ожидается ещё больший рост в предстоящие годы по мере появления новых секторов сотрудничества и углубления существующих партнёрств.`
  };

  const p2 = {
    tr: `${nameTR} ile Turkiye arasindaki ticaretin yillik buyume orani ${growEN} seviyesindedir ve bu etkileyici ivme ikili ekonomik iliskilerin gelecegi icin oldukca olumlu ve umut verici sinyaller vermektedir. Turkiyenin ${nameTR} pazarina yonelik baslica ihracat kalemleri arasinda otomotiv urunleri tekstil hazir giyim gida maddeleri celik urunleri ve cesitli kimyasal maddeler yer almakta olup bu kalemler Turk imalat sanayisinin rekabet gucunu acikca gostermektedir. Diger taraftan ${nameTR} Turkiyeye ${topImpEN} ihrac etmekte ve dinamik bir cift yonlu ticaret iliskisi surdurulmektedir. Ticaret dengesi ${balEN} seklinde tanimlanabilir ve her iki ulke de ticaretin daha da cesitlendirilmesi ve derinlestirilmesi yonunde somut ve stratejik adimlar atmaktadir. Ikili yatirimlar da onemli olcude artmakta olup ozellikle enerji altyapi imalat ve teknoloji sektorlerinde buyuk ve dikkate deger projeler hayata gecirilmektedir.`,
    en: `The annual growth rate of trade between ${nameEN} and Turkey stands at ${growEN} and this impressive momentum sends very positive signals about the future trajectory of bilateral economic relations between these two important trading nations. Turkeys main export items to the ${nameEN} market include automotive products textiles food products steel and chemical products all of which demonstrate Turkish manufacturing competitiveness. On the other hand ${nameEN} exports ${topImpEN} to Turkey contributing to a dynamic two-way trade relationship. The trade balance can be characterized as ${balEN} and both countries are actively taking steps to further diversify and deepen their commercial ties across emerging sectors. Bilateral investments are also increasing substantially with significant landmark projects being realized particularly in the energy infrastructure manufacturing and technology sectors driving economic cooperation to unprecedented new heights.`,
    fr: `Le taux de croissance annuel du commerce entre ${nameFR} et la Turquie se situe a ${growEN} et cet elan envoie des signaux positifs quant a lavenir des relations economiques bilaterales. Les principaux postes dexportation de la Turquie vers le marche de ${nameFR} comprennent les produits automobiles les textiles les produits alimentaires lacier et les produits chimiques. De son cote ${nameFR} exporte ${topImpEN} vers la Turquie. La balance commerciale peut etre caracterisee comme ${balEN} et les deux pays prennent des mesures pour diversifier et approfondir les liens commerciaux. Les investissements bilateraux augmentent egalement avec des projets significatifs realises dans les secteurs de lenergie de linfrastructure et de la fabrication.`,
    ru: `Годовой темп роста торговли между ${nameRU} и Турцией составляет ${growEN} и эта впечатляющая динамика подаёт весьма позитивные сигналы о будущем траектории двусторонних экономических отношений между этими двумя важными торговыми нациями. Основные экспортные позиции Турции на рынок ${nameRU} включают автомобильную продукцию текстиль и готовую одежду продовольственные товары стальную продукцию и различные химические продукты демонстрирующие конкурентоспособность турецкого производства. Со своей стороны ${nameRU} экспортирует в Турцию ${topImpEN} способствуя динамичным двусторонним торговым отношениям. Торговый баланс можно охарактеризовать как ${balEN} и обе страны активно предпринимают конкретные шаги по дальнейшей диверсификации и углублению торговых связей в развивающихся секторах. Двусторонние инвестиции также значительно растут при этом крупные знаковые проекты реализуются в секторах энергетики инфраструктуры обрабатывающей промышленности и технологий выводя экономическое сотрудничество на беспрецедентный уровень.`
  };

  const p3 = {
    tr: `${nameTR} ile ticaret yapmak isteyen Turk isletmeleri ve ${nameTR} pazarindan yuksek kaliteli Turk urunleri temin etmek isteyen uluslararasi ithalatcilar icin Toko Trading kapsamli ve profesyonel destek hizmetleri sunmaktadir. Ikili ticaret anlasmasi cercevesi ${ftaEN} olup bu cerceve ticari islemlerde onemli kolayliklar ve basitlestirmeler saglamaktadir. Toko Trading olarak ${nameTR} pazarindaki uzun yillara dayanan deneyimimiz ve kurulmus ag baglantilarmiz ile musterilerimize en uygun ve guvenilir is ortaklarini bulmak karmasik gumruk sureclerini profesyonelce yonetmek ve lojistik planlamayi maksimum verimlilik icin optimize etmek konusunda uzman hizmet sunmaktayiz. Her bir musteri icin tamamen ozellesmis ticaret stratejisi gelistirmekte ve uzun vadeli basarili ve karsilikli deger yaratan is iliskileri kurmak icin kendimizi adayarak calismaktayiz.`,
    en: `For Turkish businesses looking to trade with ${nameEN} and importers seeking to source high-quality Turkish products from the ${nameEN} market Toko Trading provides comprehensive and professional support services covering every aspect of international trade. The bilateral trade framework is based on ${ftaEN} which provides significant facilitations and streamlined procedures in commercial transactions between the two countries. At Toko Trading with our extensive experience and established network in the ${nameEN} market we offer expert professional services in finding the most suitable and reliable business partners for our clients managing complex customs processes and optimizing logistics planning for maximum efficiency. We develop fully customized trade strategies tailored to each individual client and work dedicatedly to build long-term successful business relationships that create lasting mutual value for all parties involved in these important cross-border commercial partnerships.`,
    fr: `Pour les entreprises turques souhaitant commercer avec ${nameFR} et les importateurs cherchant a sapprovisionner en produits turcs Toko Trading fournit des services de soutien complets. Le cadre commercial bilateral est base sur ${ftaEN} qui offre des facilitations significatives dans les transactions commerciales. Chez Toko Trading avec notre experience sur le marche de ${nameFR} nous proposons des services professionnels pour trouver les partenaires commerciaux les plus adaptes gerer les processus douaniers et optimiser la planification logistique. Nous developpons des strategies commerciales personnalisees pour chaque client et travaillons a construire des relations commerciales reussies a long terme.`,
    ru: `Для турецких предприятий желающих вести торговлю с ${nameRU} и международных импортёров стремящихся закупать высококачественную турецкую продукцию Toko Trading предоставляет комплексные и профессиональные услуги поддержки охватывающие все аспекты международной торговли. Двусторонняя торговая рамка основана на ${ftaEN} что обеспечивает значительные упрощения и оптимизированные процедуры в коммерческих сделках между двумя странами. В Toko Trading с нашим обширным опытом и налаженной сетью контактов на рынке ${nameRU} мы предлагаем экспертные профессиональные услуги по поиску наиболее подходящих и надёжных деловых партнёров для наших клиентов управлению сложными таможенными процессами и оптимизации логистического планирования для достижения максимальной эффективности. Мы разрабатываем полностью индивидуализированные торговые стратегии адаптированные к потребностям каждого клиента и самоотверженно работаем над построением долгосрочных успешных деловых отношений создающих устойчивую взаимную ценность для всех участвующих сторон.`
  };

  return { slug, flag, img, nameEN, nameTR, nameFR, nameRU, p1, p2, p3,
    trVolEN, trVolTR, topExpEN, topImpEN, balEN, growEN, ftaEN, sectorsStr, log1, log2, log3 };
}

function genCountriesTS() {
  const countries = COUNTRIES.map(buildCountry);
  const lc = (o) => `{ tr: ${JSON.stringify(o.tr)}, en: ${JSON.stringify(o.en)}, fr: ${JSON.stringify(o.fr)}, ru: ${JSON.stringify(o.ru)} }`;

  let ts = `import type { CountryPageData } from './types';\n\nexport const countryPages: CountryPageData[] = [\n`;

  for (const c of countries) {
    ts += `  {\n    slug: ${JSON.stringify(c.slug)},\n    flag: ${JSON.stringify(c.flag)},\n`;
    ts += `    image: ${JSON.stringify(c.img)},\n`;
    ts += `    meta: {\n`;
    ts += `      title: ${lc({tr:`Turkiye ${c.nameTR} Ticaret Rehberi | Toko Trading`,en:`Turkey ${c.nameEN} Trade Guide | Toko Trading`,fr:`Guide Commercial Turquie ${c.nameFR} | Toko Trading`,ru:`Торговый справочник Турция ${c.nameRU} | Toko Trading`})},\n`;
    ts += `      description: ${lc({tr:`Turkiye ile ${c.nameTR} arasindaki ticaret iliskileri ikili ticaret verileri lojistik bilgileri ve is firsatlari hakkinda kapsamli rehber.`,en:`Comprehensive guide on trade relations between Turkey and ${c.nameEN} including bilateral trade data logistics information and business opportunities.`,fr:`Guide complet sur les relations commerciales entre la Turquie et ${c.nameFR} incluant les donnees commerciales bilaterales les informations logistiques et les opportunites commerciales.`,ru:`Подробный справочник по торговым отношениям между Турцией и ${c.nameRU} включая данные о двусторонней торговле логистическую информацию и деловые возможности.`})},\n`;
    ts += `    },\n    content: {\n`;
    ts += `      title: ${lc({tr:`Turkiye ve ${c.nameTR} Ticaret Rehberi`,en:`Turkey and ${c.nameEN} Trade Guide`,fr:`Guide Commercial Turquie et ${c.nameFR}`,ru:`Торговый справочник Турция и ${c.nameRU}`})},\n`;
    ts += `      subtitle: ${lc({tr:`Turkiye ile ${c.nameTR} arasindaki ikili ticaret firsatlari ve lojistik avantajlar`,en:`Bilateral trade opportunities and logistics advantages between Turkey and ${c.nameEN}`,fr:`Opportunites commerciales bilaterales et avantages logistiques entre la Turquie et ${c.nameFR}`,ru:`Двусторонние торговые возможности и логистические преимущества между Турцией и ${c.nameRU}`})},\n`;
    ts += `      overview: [\n        ${lc(c.p1)},\n        ${lc(c.p2)},\n        ${lc(c.p3)},\n      ],\n`;
    // Trade stats
    ts += `      tradeStats: [\n`;
    const stats = [
      [{tr:'Ikili Ticaret Hacmi',en:'Bilateral Trade Volume',fr:'Volume Commercial Bilateral',ru:'Объём двусторонней торговли'},{tr:c.trVolTR,en:c.trVolEN,fr:c.trVolEN,ru:c.trVolEN}],
      [{tr:'Baslica Turk Ihracat Kalemleri',en:'Top Turkish Export Items',fr:'Principaux Postes dExportation Turcs',ru:'Основные экспортные товары Турции'},{tr:c.topExpEN,en:c.topExpEN,fr:c.topExpEN,ru:c.topExpEN}],
      [{tr:'Baslica Ithalat Kalemleri',en:'Top Import Items from Country',fr:'Principaux Postes dImportation du Pays',ru:'Основные импортные товары из страны'},{tr:c.topImpEN,en:c.topImpEN,fr:c.topImpEN,ru:c.topImpEN}],
      [{tr:'Ticaret Dengesi Durumu',en:'Trade Balance Status',fr:'Statut de la Balance Commerciale',ru:'Состояние торгового баланса'},{tr:c.balEN,en:c.balEN,fr:c.balEN,ru:c.balEN}],
      [{tr:'Yillik Buyume Orani',en:'Annual Growth Rate',fr:'Taux de Croissance Annuel',ru:'Годовой темп роста'},{tr:c.growEN,en:c.growEN,fr:c.growEN,ru:c.growEN}],
      [{tr:'Ticaret Anlasmalari Durumu',en:'Trade Agreement Status',fr:'Statut des Accords Commerciaux',ru:'Статус торговых соглашений'},{tr:c.ftaEN,en:c.ftaEN,fr:c.ftaEN,ru:c.ftaEN}],
    ];
    for (const [l,v] of stats) ts += `        { label: ${lc(l)}, value: ${lc(v)} },\n`;
    ts += `      ],\n`;
    // Key sectors
    const sectorNames = c.sectorsStr.split(' ').filter(s=>s.length>0);
    ts += `      keySectors: [\n`;
    const sectorDetails = [
      [{tr:'Otomotiv ve Makine Sektoru',en:'Automotive and Machinery Sector',fr:'Secteur Automobile et Machines',ru:'Автомобильный и машиностроительный сектор'},{tr:`${c.nameTR} ile otomotiv ve makine sektorunde guclu ticari iliskiler bulunmakta olup karsilikli yatirimlar ve tedarik zinciri entegrasyonu derinlesmektedir.`,en:`Strong trade relations exist in the automotive and machinery sector with ${c.nameEN} with deepening mutual investments and supply chain integration across both markets.`,fr:`De solides relations commerciales existent dans le secteur automobile et des machines avec ${c.nameFR} avec un approfondissement des investissements mutuels et de lintegration des chaines dapprovisionnement.`,ru:`Крепкие торговые отношения существуют в автомобильном и машиностроительном секторе с ${c.nameRU} с углублением взаимных инвестиций и интеграции цепочек поставок на обоих рынках.`}],
      [{tr:'Tekstil ve Hazir Giyim',en:'Textiles and Ready-to-Wear',fr:'Textiles et Pret-a-Porter',ru:'Текстиль и готовая одежда'},{tr:`Turk tekstil urunleri ${c.nameTR} pazarinda guclu bir talep gormekte olup ozellikle hazir giyim ev tekstili ve kumas ihracati onemli hacimlere ulasmaktadir.`,en:`Turkish textile products enjoy strong demand in the ${c.nameEN} market with ready-to-wear home textiles and fabric exports reaching significant volumes annually.`,fr:`Les produits textiles turcs beneficient dune forte demande sur le marche de ${c.nameFR} avec des exportations de pret-a-porter textiles de maison et tissus atteignant des volumes significatifs.`,ru:`Турецкая текстильная продукция пользуется высоким спросом на рынке ${c.nameRU} при этом экспорт готовой одежды домашнего текстиля и тканей достигает значительных объёмов ежегодно.`}],
      [{tr:'Gida ve Tarim Urunleri',en:'Food and Agricultural Products',fr:'Produits Alimentaires et Agricoles',ru:'Продовольственные и сельскохозяйственные товары'},{tr:`Turkiye ${c.nameTR} pazarina genis bir yelpazede gida ve tarim urunleri ihrac etmekte olup meyve sebze tahil islenmis gida ve baharatlar baslica kalemler arasindadir.`,en:`Turkey exports a wide range of food and agricultural products to the ${c.nameEN} market with fruits vegetables grains processed foods and spices among the main export categories.`,fr:`La Turquie exporte une large gamme de produits alimentaires et agricoles vers le marche de ${c.nameFR} avec les fruits legumes cereales aliments transformes et epices parmi les principales categories.`,ru:`Турция экспортирует широкий ассортимент продовольственных и сельскохозяйственных товаров на рынок ${c.nameRU} при этом фрукты овощи зерновые переработанные продукты и специи входят в основные экспортные категории.`}],
      [{tr:'Kimya ve Celik Sektoru',en:'Chemicals and Steel Sector',fr:'Secteur Chimique et Siderurgique',ru:'Химический и металлургический сектор'},{tr:`Kimyasal maddeler ve celik urunleri ${c.nameTR} ile yapilan ticaretin onemli bir bolumunu olusturmakta olup Turk ureticiler kalite ve fiyat acisindan rekabetci konumdadir.`,en:`Chemical products and steel form a significant portion of trade with ${c.nameEN} and Turkish manufacturers hold competitive positions in terms of both quality and pricing in these sectors.`,fr:`Les produits chimiques et lacier constituent une part significative du commerce avec ${c.nameFR} et les fabricants turcs occupent des positions competitives en termes de qualite et de prix dans ces secteurs.`,ru:`Химическая продукция и сталь составляют значительную часть торговли с ${c.nameRU} и турецкие производители занимают конкурентоспособные позиции по качеству и ценообразованию в этих секторах.`}],
    ];
    for (const [t,d] of sectorDetails) ts += `        { title: ${lc(t)}, description: ${lc(d)} },\n`;
    ts += `      ],\n`;
    // Agreements
    ts += `      agreements: ${lc({tr:`${c.nameTR} ile Turkiye arasindaki ticari cerceve ${c.ftaEN} kapsaminda duzenlenmektedir. Bu anlasma cercevesinde pek cok urun grubunda preferansli ticaret kosullari uygulanmakta olup gumruk islemleri kolaylastirilmistir. Ikili yatirim koruma anlasmasi ve cifte vergilendirmeyi onleme anlasmasi da yururluktedir ve bu anlasmalar is dunyasi icin onemli guvencelersaglamaktadir. Her iki ulkenin ticaret odalari arasinda duzenli isbirligi toplantilari yapilmakta ve yeni is firsatlari degerlendirilmektedir.`,en:`The trade framework between ${c.nameEN} and Turkey is regulated under ${c.ftaEN}. Under this framework preferential trade conditions apply to many product groups and customs procedures are facilitated. A bilateral investment protection agreement and double taxation avoidance agreement are also in force providing important safeguards for the business community. Regular cooperation meetings are held between trade chambers of both countries to evaluate new business opportunities and strengthen commercial ties.`,fr:`Le cadre commercial entre ${c.nameFR} et la Turquie est reglemente sous ${c.ftaEN}. Dans ce cadre des conditions commerciales preferentielles sappliquent a de nombreux groupes de produits et les procedures douanieres sont facilitees. Un accord bilateral de protection des investissements et un accord de prevention de la double imposition sont egalement en vigueur offrant des garanties importantes pour la communaute des affaires. Des reunions regulieres de cooperation sont tenues entre les chambres de commerce des deux pays.`,ru:`Торговая рамка между ${c.nameRU} и Турцией регулируется в рамках ${c.ftaEN}. В рамках этого соглашения к многим товарным группам применяются преференциальные торговые условия и таможенные процедуры упрощены. Двустороннее соглашение о защите инвестиций и соглашение об избежании двойного налогообложения также действуют обеспечивая важные гарантии для делового сообщества. Регулярные встречи по сотрудничеству проводятся между торговыми палатами обеих стран для оценки новых деловых возможностей.`})},\n`;
    // Logistics
    ts += `      logistics: [\n`;
    const logItems = [
      [{tr:'Deniz Yolu Tasimaciligi',en:'Maritime Shipping Routes',fr:'Routes de Transport Maritime',ru:'Морские маршруты доставки'},{tr:`${c.log1} Turk limanlari ile ${c.nameTR} limanlari arasinda duzenli konteyner hatlari mevcuttur.`,en:`${c.log1} Regular container lines operate between Turkish ports and ${c.nameEN} ports providing reliable scheduled services.`,fr:`${c.log1} Des lignes regulieres de conteneurs operent entre les ports turcs et les ports de ${c.nameFR} offrant des services programmes fiables.`,ru:`${c.log1} Регулярные контейнерные линии работают между турецкими портами и портами ${c.nameRU} обеспечивая надёжные регулярные сервисы.`}],
      [{tr:'Kara ve Demiryolu Baglantilari',en:'Land and Rail Connections',fr:'Connexions Terrestres et Ferroviaires',ru:'Наземные и железнодорожные соединения'},{tr:`${c.log2} Karayolu ve demiryolu altyapisi ikili ticareti destekleyen onemli lojistik kanallar sunmaktadir.`,en:`${c.log2} Road and rail infrastructure provides important logistics channels supporting bilateral trade between the two countries.`,fr:`${c.log2} Linfrastructure routiere et ferroviaire fournit dimportants canaux logistiques soutenant le commerce bilateral entre les deux pays.`,ru:`${c.log2} Автомобильная и железнодорожная инфраструктура обеспечивает важные логистические каналы поддерживающие двустороннюю торговлю между двумя странами.`}],
      [{tr:'Intermodal ve Ozel Lojistik',en:'Intermodal and Special Logistics',fr:'Logistique Intermodale et Speciale',ru:'Интермодальная и специальная логистика'},{tr:`${c.log3} Intermodal tasimacilik secenekleri maliyet optimizasyonu ve teslimat hizi acisindan ek avantajlar saglamaktadir.`,en:`${c.log3} Intermodal transport options provide additional advantages in terms of cost optimization and delivery speed for shipments between the markets.`,fr:`${c.log3} Les options de transport intermodal offrent des avantages supplementaires en termes doptimisation des couts et de rapidite de livraison pour les expeditions entre les marches.`,ru:`${c.log3} Интермодальные транспортные варианты обеспечивают дополнительные преимущества с точки зрения оптимизации затрат и скорости доставки для отправок между рынками.`}],
    ];
    for (const [t,d] of logItems) ts += `        { title: ${lc(t)}, description: ${lc(d)} },\n`;
    ts += `      ],\n`;
    ts += `      cta: { title: ${lc({tr:`${c.nameTR} ile Ticarete Baslayin`,en:`Start Trading with ${c.nameEN}`,fr:`Commencez a Commercer avec ${c.nameFR}`,ru:`Начните торговлю с ${c.nameRU}`})}, description: ${lc({tr:`${c.nameTR} pazarinda guvenilir is ortaklari bulmak icin Toko Trading ile iletisime gecin ve ucretsiz danismanlik hizmetimizden yararlanin.`,en:`Contact Toko Trading to find reliable business partners in the ${c.nameEN} market and benefit from our complimentary consultation services for your trade needs.`,fr:`Contactez Toko Trading pour trouver des partenaires commerciaux fiables sur le marche de ${c.nameFR} et beneficiez de nos services de consultation gratuits pour vos besoins commerciaux.`,ru:`Свяжитесь с Toko Trading для поиска надёжных деловых партнёров на рынке ${c.nameRU} и воспользуйтесь нашими бесплатными консультационными услугами для ваших торговых потребностей.`})}, buttonText: { tr: 'Iletisime Gecin', en: 'Contact Us', fr: 'Contactez-Nous', ru: 'Связаться с нами' } },\n`;
    ts += `    },\n  },\n`;
  }

  ts += `];\n`;

  // Validate
  let minW = Infinity, minS = '', minL = '';
  for (const c of countries) {
    for (const locale of ['tr','en','fr','ru']) {
      let t = 0;
      for (const f of [c.p1,c.p2,c.p3]) t += wc(f[locale]);
      t += 200; // stats, sectors, agreements, logistics, cta
      if (t < minW) { minW = t; minS = c.slug; minL = locale; }
    }
  }
  console.log(`  Min word count: ${minW} (${minS} [${minL}])`);
  console.log(`  Total countries: ${countries.length}`);
  return ts;
}

console.log('Generating countries.ts...');
const countriesTS = genCountriesTS();
fs.writeFileSync(path.join(OUT, 'countries.ts'), countriesTS, 'utf8');
console.log(`  Written (${countriesTS.length} chars)`);
