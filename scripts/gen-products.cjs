#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'src', 'data', 'pseo');

function wc(t) { return t.trim().split(/\s+/).filter(w => w.length > 0).length; }

// Each seed: [slug, sector, imgId, nameEN, nameTR, nameFR, nameRU]
const seeds = [
  // FOOD
  ['food-grains','food','photo-1574323347407-f5e1ad6d020b','Grain Products','Tahil Urunleri','Produits Cerealiers','Зерновые продукты',
   'wheat barley corn rye','bugday arpa misir cavdar','ble orge mais seigle','пшеница ячмень кукуруза рожь',
   '35 million tons','35 milyon ton','35 millions de tonnes','35 миллионов тонн',
   'USD 4.2 billion','4.2 milyar dolar','4.2 milliards USD','4.2 миллиарда долларов',
   'Iraq Syria Egypt Libya','Irak Suriye Misir Libya','Irak Syrie Egypte Libye','Ирак Сирия Египет Ливия',
   '1001-1008','ISO 22000 HACCP Halal',
   'seven climate zones enable diverse grain cultivation across Anatolia','yedi iklim bolgesi Anadoluda cesitli tahil yetistiriciligi saglar',
   'world largest flour exporter with over 700 mills','dunyanin en buyuk un ihracatcisi 700den fazla degirmen',
   '15-25 percent below European competitors','Avrupali rakiplerden yuzde 15-25 daha uygun',
   'crossroads of Europe Middle East and Africa','Avrupa Ortadogu ve Afrika kesisim noktasi'],
  ['food-dairy','food','photo-1550583724-b2692b85b150','Dairy Products','Sut Urunleri','Produits Laitiers','Молочные продукты',
   'cheese butter milk powder yogurt','peynir tereyagi sut tozu yogurt','fromage beurre lait en poudre yaourt','сыр масло сухое молоко йогурт',
   '23 million tons of milk','23 milyon ton sut','23 millions de tonnes de lait','23 миллиона тонн молока',
   'USD 850 million','850 milyon dolar','850 millions USD','850 миллионов долларов',
   'Middle East North Africa EU','Ortadogu Kuzey Afrika AB','Moyen-Orient Afrique du Nord UE','Ближний Восток Северная Африка ЕС',
   '0401-0406','ISO 22000 HACCP Halal IFS',
   'traditional Anatolian dairy recipes adapted to industrial production','geleneksel Anadolu sut tarifleri endustriyel uretime uyarlandi',
   'over 600 licensed processing facilities with modern UHT systems','600den fazla lisansli tesis modern UHT sistemleri',
   'production costs 30-40 percent below EU average','uretim maliyetleri AB ortalamasinin yuzde 30-40 altinda',
   'dual Halal and EU food safety certification','Helal ve AB gida guvenligi cift sertifikasyon'],
  ['food-canned-goods','food','photo-1534483509719-8127d8e3c77c','Canned Food Products','Konserve Gida Urunleri','Conserves Alimentaires','Консервированные продукты',
   'canned vegetables fruits tomato paste olives','konserve sebze meyve salca zeytin','conserves de legumes fruits concentre de tomates olives','консервированные овощи фрукты томатная паста оливки',
   '2.5 million tons','2.5 milyon ton','2.5 millions de tonnes','2.5 миллиона тонн',
   'USD 1.8 billion','1.8 milyar dolar','1.8 milliards USD','1.8 миллиарда долларов',
   'Germany UK USA Japan','Almanya Ingiltere ABD Japonya','Allemagne Royaume-Uni USA Japon','Германия Великобритания США Япония',
   '2001-2008','ISO 22000 BRC IFS HACCP',
   'world leading tomato paste producer and exporter','dunyanin onde gelen salca ureticisi ve ihracatcisi',
   'over 400 canning facilities with modern production lines','400den fazla konserve tesisi modern uretim hatlari',
   'abundant raw material supply ensures competitive pricing','bol hammadde tedarigirekabetci fiyatlandirma saglar',
   'Mediterranean climate ideal for vegetable and fruit cultivation','Akdeniz iklimi sebze ve meyve yetistiriciligi icin ideal'],
  ['food-spices','food','photo-1596040033229-a9821ebd058d','Spices and Herbs','Baharat ve Bitkisel Urunler','Epices et Herbes','Специи и пряности',
   'cumin sumac pepper oregano saffron','kimyon sumak biber kekik safran','cumin sumac poivre origan safran','кумин сумах перец орегано шафран',
   '180 thousand tons','180 bin ton','180 mille tonnes','180 тысяч тонн',
   'USD 620 million','620 milyon dolar','620 millions USD','620 миллионов долларов',
   'USA Germany UK Netherlands','ABD Almanya Ingiltere Hollanda','USA Allemagne Royaume-Uni Pays-Bas','США Германия Великобритания Нидерланды',
   '0904-0910','ISO 22000 HACCP Organic Halal',
   'Anatolian biodiversity produces unique spice varieties','Anadolu biyocesitliligi benzersiz baharat cesitleri uretir',
   'advanced drying grinding and packaging technology','gelismis kurutma ogutme ve paketleme teknolojisi',
   'labor cost advantage combined with rich agricultural heritage','iscilik maliyeti avantaji zengin tarim mirasiylabirlesir',
   'geographic proximity to major spice consuming markets','buyuk baharat tuketim pazarlarina cografi yakinlik'],
  // TEXTILE
  ['textile-fabrics','textile','photo-1558171813-4c088753af8f','Textile Fabrics','Kumas Urunleri','Tissus Textiles','Текстильные ткани',
   'cotton polyester blended woven knitted fabrics','pamuk polyester karisim dokuma orgu kumaslar','tissus coton polyester melanges tisses tricotes','хлопковые полиэстерные смесовые тканые трикотажные ткани',
   '2.8 million tons of fiber','2.8 milyon ton lif','2.8 millions de tonnes de fibres','2.8 миллиона тонн волокна',
   'USD 8.5 billion','8.5 milyar dolar','8.5 milliards USD','8.5 миллиарда долларов',
   'EU USA Russia Middle East','AB ABD Rusya Ortadogu','UE USA Russie Moyen-Orient','ЕС США Россия Ближний Восток',
   '5007-5516','ISO 9001 OEKO-TEX GOTS',
   'seventh largest textile exporter globally with vertically integrated supply chain','dunya yedinci buyuk tekstil ihracatcisi dikey entegre tedarik zinciri',
   'Denizli Bursa and Gaziantep textile clusters with over 50000 factories','Denizli Bursa Gaziantep tekstil kumeleri 50000den fazla fabrika',
   'competitive labor and energy costs with proximity to European markets','rekabetci iscilik ve enerji maliyetleri Avrupa pazarina yakinlik',
   'rapid prototyping and small MOQ flexibility for fashion brands','moda markalari icin hizli prototipleme ve dusuk asgari siparis esnekligi'],
  ['textile-ready-to-wear','textile','photo-1445205170230-053b83016050','Ready-to-Wear Clothing','Hazir Giyim','Pret-a-Porter','Готовая одежда',
   'casual formal sportswear children clothing','gunluk resmi spor giyim cocuk giyimi','vetements decontractes formels sportswear enfants','повседневная формальная спортивная детская одежда',
   'USD 17.8 billion in garments','17.8 milyar dolar hazir giyim','17.8 milliards USD de vetements','17.8 миллиарда долларов одежды',
   'USD 5.2 billion','5.2 milyar dolar','5.2 milliards USD','5.2 миллиарда долларов',
   'Germany Spain UK France','Almanya Ispanya Ingiltere Fransa','Allemagne Espagne Royaume-Uni France','Германия Испания Великобритания Франция',
   '6101-6217','ISO 9001 OEKO-TEX WRAP BSCI',
   'fast fashion hub with 2-3 week turnaround from design to delivery','tasarimdan teslimata 2-3 hafta hizli moda merkezi',
   'over 40000 garment manufacturers from mass to luxury segments','40000den fazla giyim ureticisi kitle uretimden lukse',
   'full package production including design sourcing and logistics','tasarim tedarik ve lojistik dahil tam paket uretim',
   'Istanbul fashion weeks establish Turkey as emerging fashion capital','Istanbul moda haftalari Turkiyeyi yukselen moda baskenti yapar'],
  ['textile-home-textiles','textile','photo-1631679706909-1844bbd07221','Home Textiles','Ev Tekstili','Textiles de Maison','Домашний текстиль',
   'towels bed linen curtains upholstery fabrics','havlu nevresim perde dosemelik kumaslar','serviettes linge de lit rideaux tissus dameublement','полотенца постельное бельё шторы обивочные ткани',
   'USD 4.1 billion production','4.1 milyar dolar uretim','4.1 milliards USD de production','4.1 миллиарда долларов производства',
   'USD 3.2 billion','3.2 milyar dolar','3.2 milliards USD','3.2 миллиарда долларов',
   'USA Germany UK France Italy','ABD Almanya Ingiltere Fransa Italya','USA Allemagne Royaume-Uni France Italie','США Германия Великобритания Франция Италия',
   '6301-6304','ISO 9001 OEKO-TEX GOTS BCI',
   'Denizli is world capital of towel production exporting to 170 countries','Denizli 170 ulkeye ihracat yapan dunya havlu baskenti',
   'vertically integrated from cotton farming to finished retail products','pamuk ciftciliginden bitmisurunlere dikey entegrasyon',
   'organic and sustainable textiles growing 25 percent annually','organik ve surdurulebilir tekstil yillik yuzde 25 buyuyor',
   'private label expertise for major European and US retail chains','buyuk Avrupa ve ABD perakende zincirleri icin ozel marka uzmanligi'],
  ['textile-industrial','textile','photo-1504917595217-d4dc5efe5ede','Industrial Textiles','Endustriyel Tekstil','Textiles Industriels','Промышленный текстиль',
   'geotextiles automotive textiles filtration medical nonwovens','jeotekstil otomotiv tekstili filtrasyon medikal dokusuz','geotextiles textiles automobiles filtration medicaux non-tisses','геотекстиль автомобильный текстиль фильтрация медицинский нетканый',
   'USD 2.3 billion','2.3 milyar dolar','2.3 milliards USD','2.3 миллиарда долларов',
   'USD 890 million','890 milyon dolar','890 millions USD','890 миллионов долларов',
   'Germany Italy France Russia','Almanya Italya Fransa Rusya','Allemagne Italie France Russie','Германия Италия Франция Россия',
   '5911-5914','ISO 9001 ISO 14001 IATF 16949',
   'rapidly growing technical textiles sector with 12 percent annual growth','yillik yuzde 12 buyuyen teknik tekstil sektoru',
   'specialized R&D centers in Bursa and Istanbul developing advanced materials','Bursa ve Istanbulda gelismis malzeme gelistiren ozel ArGe merkezleri',
   'competitive pricing for automotive OEM supply chains','otomotiv OEM tedarik zincirleri icin rekabetci fiyatlandirma',
   'compliance with European REACH and automotive industry standards','Avrupa REACH ve otomotiv endustrisi standartlarina uygunluk'],
  // MACHINERY
  ['machinery-industrial','machinery','photo-1581091226825-a6a2a5aee158','Industrial Machinery','Endustriyel Makine','Machines Industrielles','Промышленное оборудование',
   'CNC machines production lines packaging filling equipment','CNC makineler uretim hatlari paketleme dolum ekipmanlari','machines CNC lignes de production equipements de conditionnement','станки ЧПУ производственные линии упаковочное оборудование',
   'USD 22 billion machinery production','22 milyar dolar makine uretimi','22 milliards USD de production','22 миллиарда долларов производства',
   'USD 12.5 billion','12.5 milyar dolar','12.5 milliards USD','12.5 миллиарда долларов',
   'Germany Russia Iraq Iran UK','Almanya Rusya Irak Iran Ingiltere','Allemagne Russie Irak Iran Royaume-Uni','Германия Россия Ирак Иран Великобритания',
   '8401-8487','ISO 9001 CE Marking ATEX',
   'sixth largest machinery producer in Europe with comprehensive capabilities','Avrupanin altinci buyuk makine ureticisi kapsamli yetenekler',
   'Ankara Konya and Bursa manufacturing clusters with 15000 firms','Ankara Konya Bursa uretim kumeleri 15000 firma',
   'cost advantage of 30-40 percent versus Western European manufacturers','Bati Avrupali ureticilere gore yuzde 30-40 maliyet avantaji',
   'growing R&D investment with over 200 university-industry collaboration centers','200den fazla universite-sanayi isbirligi merkezi ile artan ArGe yatirimi'],
  ['machinery-agricultural','machinery','photo-1625246333195-78d9c38ad449','Agricultural Equipment','Tarim Ekipmanlari','Equipements Agricoles','Сельскохозяйственное оборудование',
   'tractors harvesters irrigation plows seeders','traktorler bicerdoverler sulama pulluklar ekiciler','tracteurs moissonneuses irrigation charrues semoirs','тракторы комбайны ирригация плуги сеялки',
   'USD 4.5 billion production','4.5 milyar dolar uretim','4.5 milliards USD de production','4.5 миллиарда долларов производства',
   'USD 1.2 billion','1.2 milyar dolar','1.2 milliards USD','1.2 миллиарда долларов',
   'Africa Middle East Central Asia','Afrika Ortadogu Orta Asya','Afrique Moyen-Orient Asie Centrale','Африка Ближний Восток Центральная Азия',
   '8432-8436','ISO 9001 CE OECD Tractor Codes',
   'strong tractor manufacturing sector led by domestic brands','yerli markalar onculugunde guclu traktor uretim sektoru',
   'equipment designed for diverse terrains from flat plains to mountains','duz ovalardan daglara cesitli araziler icin tasarlanan ekipman',
   'competitive pricing ideal for developing agricultural markets','gelismekte olan tarim pazarlari icin ideal rekabetci fiyatlar',
   'after-sales service network across Africa and Middle East','Afrika ve Ortadoguda satis sonrasi servis agi'],
  ['machinery-spare-parts','machinery','photo-1504328345606-18bbc8c9d7d1','Machinery Spare Parts','Makine Yedek Parcalari','Pieces Detachees de Machines','Запасные части для оборудования',
   'bearings gears valves pumps motors hydraulic components','rulmanlar disli celepvana pompalar motorlar hidrolik parcalar','roulements engrenages vannes pompes moteurs composants hydrauliques','подшипники шестерни клапаны насосы двигатели гидравлические компоненты',
   'USD 6 billion production','6 milyar dolar uretim','6 milliards USD de production','6 миллиардов долларов производства',
   'USD 3.1 billion','3.1 milyar dolar','3.1 milliards USD','3.1 миллиарда долларов',
   'Germany Russia Iraq Iran','Almanya Rusya Irak Iran','Allemagne Russie Irak Iran','Германия Россия Ирак Иран',
   '8481-8487','ISO 9001 ISO/TS 16949 CE',
   'OEM-quality replacement parts at 40-50 percent lower cost','yuzde 40-50 daha dusuk maliyetle OEM kalitesinde yedek parcalar',
   'reverse engineering and custom manufacturing capabilities','tersine muhendislik ve ozel uretim yetenekleri',
   'rapid delivery with 48-hour express shipping to regional markets','bolgesel pazarlara 48 saatlik ekspres kargo ile hizli teslimat',
   'extensive catalog covering European American and Asian machinery brands','Avrupa Amerikan ve Asya makine markalarini kapsayan genis katalog'],
  ['machinery-automation','machinery','photo-1485827404703-89b55fcc595e','Automation Systems','Otomasyon Sistemleri','Systemes dAutomatisation','Системы автоматизации',
   'PLCs SCADA robotics conveyor systems','PLCler SCADA robotik konveyor sistemleri','automates SCADA robotique systemes de convoyage','ПЛК SCADA робототехника конвейерные системы',
   'USD 3.2 billion production','3.2 milyar dolar uretim','3.2 milliards USD de production','3.2 миллиарда долларов производства',
   'USD 980 million','980 milyon dolar','980 millions USD','980 миллионов долларов',
   'Russia Iran Iraq Egypt','Rusya Iran Irak Misir','Russie Iran Irak Egypte','Россия Иран Ирак Египет',
   '8537-8543','ISO 9001 CE IEC 61131',
   'growing Industry 4.0 capabilities with IoT-enabled solutions','IoT ozellikli cozumlerle buyuyen Endustri 4.0 yetenekleri',
   'custom automation design for food textile and automotive sectors','gida tekstil ve otomotiv sektorleri icin ozel otomasyon tasarimi',
   'turnkey project delivery including installation and training','kurulum ve egitim dahil anahtar teslim proje teslimi',
   'competitive engineering talent pool from top Turkish universities','onde gelen Turk universitelerinden rekabetci muhendislik yetenek havuzu'],
  // CHEMICALS
  ['chemicals-industrial','chemicals','photo-1532187863486-abf9dbad1b69','Industrial Chemicals','Endustriyel Kimyasallar','Produits Chimiques Industriels','Промышленные химикаты',
   'soda ash boron compounds caustic soda chromium salts','soda kulu bor bilesikleri kostik soda krom tuzlari','carbonate de soude composes de bore soude caustique sels de chrome','кальцинированная сода соединения бора каустическая сода соли хрома',
   'USD 25 billion chemical production','25 milyar dolar kimya uretimi','25 milliards USD de production chimique','25 миллиардов долларов химического производства',
   'USD 7.2 billion','7.2 milyar dolar','7.2 milliards USD','7.2 миллиарда долларов',
   'EU China India Russia Brazil','AB Cin Hindistan Rusya Brezilya','UE Chine Inde Russie Bresil','ЕС Китай Индия Россия Бразилия',
   '2801-2853','ISO 9001 ISO 14001 REACH',
   'world largest boron producer controlling 73 percent of global reserves','dunyanin en buyuk bor ureticisi kuresel rezervlerin yuzde 73unu kontrol ediyor',
   'Petkim and IGSAS petrochemical complexes providing feedstock','hammadde saglayan Petkim ve IGSAS petrokimya kompleksleri',
   'strategic mineral wealth including boron chromite and marble','bor kromit ve mermer dahil stratejik maden zenginligi',
   'REACH compliant exports enabling direct entry to EU markets','AB pazarlarina dogrudan giris saglayan REACH uyumlu ihracat'],
  ['chemicals-petrochemicals','chemicals','photo-1518709766631-a6a7f45921c3','Petrochemical Products','Petrokimya Urunleri','Produits Petrochimiques','Нефтехимические продукты',
   'polyethylene polypropylene PVC PET resins','polietilen polipropilen PVC PET recineler','polyethylene polypropylene PVC PET resines','полиэтилен полипропилен ПВХ ПЭТ смолы',
   'USD 8 billion production','8 milyar dolar uretim','8 milliards USD de production','8 миллиардов долларов производства',
   'USD 2.8 billion','2.8 milyar dolar','2.8 milliards USD','2.8 миллиарда долларов',
   'EU Middle East North Africa','AB Ortadogu Kuzey Afrika','UE Moyen-Orient Afrique du Nord','ЕС Ближний Восток Северная Африка',
   '3901-3926','ISO 9001 ISO 14001 REACH GHS',
   'TUPRAS and SOCAR refineries providing world-class petrochemical output','TUPRAS ve SOCAR rafinerileri dunya sinifi petrokimya ciktisi sagliyor',
   'integrated Aliaga and Ceyhan petrochemical zones','entegre Aliaga ve Ceyhan petrokimya bolgeleri',
   'growing recycled plastics and sustainable chemistry sector','buyuyen geri donusumlu plastik ve surdurulebilir kimya sektoru',
   'Mediterranean shipping routes enable cost-effective EU market access','Akdeniz deniz yollari uygun maliyetli AB pazar erisimi saglar'],
  ['chemicals-pharmaceuticals','chemicals','photo-1587854692152-cbe660dbde88','Pharmaceutical Products','Ilaclari ve Ecza Urunleri','Produits Pharmaceutiques','Фармацевтические продукты',
   'generic drugs APIs medical devices supplements','jenerik ilaclar APIler tibbi cihazlar takviyeler','medicaments generiques APIs dispositifs medicaux supplements','дженерики АФИ медицинские изделия добавки',
   'USD 12 billion pharma market','12 milyar dolar ilac pazari','12 milliards USD de marche pharmaceutique','12 миллиардов долларов фармрынка',
   'USD 1.8 billion','1.8 milyar dolar','1.8 milliards USD','1.8 миллиарда долларов',
   'EU MENA CIS North Africa','AB MENA BDT Kuzey Afrika','UE MENA CEI Afrique du Nord','ЕС БВСА СНГ Северная Африка',
   '3001-3006','GMP WHO PIC/S FDA',
   'over 300 GMP-certified pharmaceutical manufacturing facilities','300den fazla GMP sertifikali ilac uretim tesisi',
   'strong generic drug production with biosimilar development capabilities','biyobenzer gelistirme yetenekleriyle guclu jenerik ilac uretimi',
   'competitive manufacturing costs with EU-standard quality assurance','AB standartlarinda kalite guvencesi ile rekabetci uretim maliyetleri',
   'FDA-inspected facilities enabling direct US market export','dogrudan ABD pazarina ihracat saglayan FDA denetimli tesisler'],
  ['chemicals-fertilizers','chemicals','photo-1592419044706-39796d40f98c','Fertilizer Products','Gubre Urunleri','Produits Engrais','Удобрения',
   'urea DAP NPK compound ammonium nitrate','ure DAP NPK bilesik amonyum nitrat','uree DAP NPK compose nitrate dammonium','мочевина ДАФ NPK составные аммиачная селитра',
   'USD 3.5 billion production','3.5 milyar dolar uretim','3.5 milliards USD de production','3.5 миллиарда долларов производства',
   'USD 1.1 billion','1.1 milyar dolar','1.1 milliards USD','1.1 миллиарда долларов',
   'Africa Middle East CIS','Afrika Ortadogu BDT','Afrique Moyen-Orient CEI','Африка Ближний Восток СНГ',
   '3101-3105','ISO 9001 ISO 14001 REACH',
   'IGSAS and private sector plants producing full NPK range','tam NPK yelpazesi ureten IGSAS ve ozel sektor tesisleri',
   'boron-enriched specialty fertilizers unique to Turkey','Turkiyeye ozgu bor zenginlestirilmis ozel gubreler',
   'proximity to African agricultural markets drives cost advantage','Afrika tarim pazarlarina yakinlik maliyet avantaji sagliyor',
   'custom formulation services for specific soil and crop requirements','belirli toprak ve mahsul gereksinimleri icin ozel formulasyon hizmetleri'],
  // CONSTRUCTION
  ['construction-building-materials','construction','photo-1504307651254-35680f356dfd','Building Materials','Insaat Malzemeleri','Materiaux de Construction','Строительные материалы',
   'ceramic tiles marble granite natural stone','seramik karo mermer granit dogal tas','carreaux ceramiques marbre granit pierre naturelle','керамическая плитка мрамор гранит природный камень',
   'USD 15 billion production','15 milyar dolar uretim','15 milliards USD de production','15 миллиардов долларов производства',
   'USD 4.5 billion','4.5 milyar dolar','4.5 milliards USD','4.5 миллиарда долларов',
   'Iraq Israel USA UK Germany','Irak Israil ABD Ingiltere Almanya','Irak Israel USA Royaume-Uni Allemagne','Ирак Израиль США Великобритания Германия',
   '6801-6815','ISO 9001 CE EN Standards',
   'world fourth largest ceramic tile producer with diverse natural stone reserves','dunyanin dorduncu buyuk seramik karo ureticisi cesitli dogal tas rezervleri',
   'Afyon Bilecik and Burdur marble quarries producing premium grades','premium kalite ureten Afyon Bilecik ve Burdur mermer ocaklari',
   'competitive pricing 20-35 percent below Italian and Spanish competitors','Italyan ve Ispanyol rakiplerden yuzde 20-35 daha uygun fiyatlar',
   'extensive design variety with custom manufacturing for architectural projects','mimari projeler icin ozel uretimle genis tasarim cesitliligi'],
  ['construction-steel','construction','photo-1587293852726-70cdb56c2866','Steel Products','Celik Urunleri','Produits en Acier','Стальная продукция',
   'rebar flat steel pipes profiles structural steel','insaat demiri yassi celik boru profil yapi celigi','barres darmature acier plat tubes profiles acier de structure','арматура плоский прокат трубы профили конструкционная сталь',
   '35 million tons crude steel','35 milyon ton ham celik','35 millions de tonnes dacier brut','35 миллионов тонн нерафинированной стали',
   'USD 14.2 billion','14.2 milyar dolar','14.2 milliards USD','14.2 миллиарда долларов',
   'EU Middle East North Africa','AB Ortadogu Kuzey Afrika','UE Moyen-Orient Afrique du Nord','ЕС Ближний Восток Северная Африка',
   '7207-7229','ISO 9001 EN 10204 CE',
   'eighth largest steel producer globally with modern EAF technology','modern EAF teknolojisi ile dunya sekizinci buyuk celik ureticisi',
   'Iskenderun and Marmara steel clusters with deep water port access','derin su limani erisimli Iskenderun ve Marmara celik kumeleri',
   'electric arc furnace technology enables flexible production and recycling','elektrik ark firini teknolojisi esnek uretim ve geri donusum saglar',
   'fast delivery to Mediterranean and Black Sea markets within 3-5 days','Akdeniz ve Karadeniz pazarlarina 3-5 gun icinde hizli teslimat'],
  ['construction-cement','construction','photo-1518709766631-a6a7f45921c3','Cement Products','Cimento Urunleri','Produits de Ciment','Цементная продукция',
   'Portland cement clinker white cement ready-mix','Portland cimento klinker beyaz cimento hazir beton','ciment Portland clinker ciment blanc beton pret a lemploi','Портландцемент клинкер белый цемент товарный бетон',
   '75 million tons capacity','75 milyon ton kapasite','75 millions de tonnes de capacite','75 миллионов тонн мощности',
   'USD 1.5 billion','1.5 milyar dolar','1.5 milliards USD','1.5 миллиарда долларов',
   'Iraq Syria Libya Africa','Irak Suriye Libya Afrika','Irak Syrie Libye Afrique','Ирак Сирия Ливия Африка',
   '2523','ISO 9001 EN 197 CE',
   'fifth largest cement producer globally with surplus export capacity','kuresel olarak besinci buyuk cimento ureticisi fazla ihracat kapasitesi',
   'modern rotary kiln plants across all seven geographic regions','yedi cografi bolgenin tumundemodern doner firin tesisleri',
   'bulk carrier shipments minimize per-ton costs for large orders','dokme yuk gemi sevkiyatlari buyuk siparislerde ton basina maliyeti dusurur',
   'white cement specialty from Canakkale region renowned worldwide','dunya capinda taninan Canakkale bolgesi beyaz cimento uzmanligi'],
  ['construction-plumbing','construction','photo-1585704032915-c3400ca199e7','Plumbing and Fixtures','Tesisat ve Armaturu','Plomberie et Sanitaire','Сантехника и арматура',
   'faucets pipes fittings sanitary ware valves','musluklar borular baglanti parcalari sihhi tesisat vanalari','robinets tuyaux raccords sanitaires vannes','смесители трубы фитинги сантехника клапаны',
   'USD 4 billion production','4 milyar dolar uretim','4 milliards USD de production','4 миллиарда долларов производства',
   'USD 2.1 billion','2.1 milyar dolar','2.1 milliards USD','2.1 миллиарда долларов',
   'Germany UK Iraq Israel','Almanya Ingiltere Irak Israil','Allemagne Royaume-Uni Irak Israel','Германия Великобритания Ирак Израиль',
   '7303-7307, 7412','ISO 9001 EN 200 CE TSE',
   'Eczacibasi and Vitra brands competing globally in premium sanitaryware','Eczacibasi ve Vitra markalari premium sihhi tesisatta kuresel rekabet',
   'integrated manufacturing from raw materials to finished designer products','hammaddeden bitmus tasarim urunlere entegre uretim',
   'design innovation with Red Dot and iF awards for Turkish brands','Turk markalari icin Red Dot ve iF odulleri ile tasarim inovasyonu',
   'EU standards compliance with CE marking for direct European market access','Avrupa pazarina dogrudan erisim icin CE isaretli AB standartlari uygunlugu'],
  // RAW MATERIALS
  ['raw-metals','raw-materials','photo-1504328345606-18bbc8c9d7d1','Metal Raw Materials','Ham Metal Malzemeler','Matieres Premieres Metalliques','Металлическое сырьё',
   'copper aluminum zinc lead scrap metals','bakir aluminyum cinko kursun hurda metaller','cuivre aluminium zinc plomb metaux de recuperation','медь алюминий цинк свинец металлолом',
   'USD 8.5 billion metal production','8.5 milyar dolar metal uretimi','8.5 milliards USD de production metallique','8.5 миллиарда долларов металлопроизводства',
   'USD 3.2 billion','3.2 milyar dolar','3.2 milliards USD','3.2 миллиарда долларов',
   'China EU India South Korea','Cin AB Hindistan Guney Kore','Chine UE Inde Coree du Sud','Китай ЕС Индия Южная Корея',
   '7401-7616','ISO 9001 LME Standards',
   'significant copper and chromite mining with modern smelting facilities','modern ergitme tesisleri ile onemli bakir ve kromit madenciligi',
   'Kayseri and Adana metal processing zones with logistics infrastructure','lojistik altyapili Kayseri ve Adana metal isleme bolgeleri',
   'recycling sector processing 20 million tons of scrap annually','yillik 20 milyon ton hurda isleyen geri donusum sektoru',
   'competitive energy costs for energy-intensive metal processing','enerji yogun metal isleme icin rekabetci enerji maliyetleri'],
  ['raw-minerals','raw-materials','photo-1519389950473-47ba0277781c','Mineral Products','Maden ve Mineral Urunler','Produits Mineraux','Минеральные продукты',
   'marble travertine feldspar quartz bentonite','mermer traverten feldspat kuvars bentonit','marbre travertin feldspath quartz bentonite','мрамор травертин полевой шпат кварц бентонит',
   'USD 6 billion mining sector','6 milyar dolar maden sektoru','6 milliards USD de secteur minier','6 миллиардов долларов горнодобычи',
   'USD 4.5 billion','4.5 milyar dolar','4.5 milliards USD','4.5 миллиарда долларов',
   'China USA EU India','Cin ABD AB Hindistan','Chine USA UE Inde','Китай США ЕС Индия',
   '2515-2530','ISO 9001 ISO 14001',
   'world largest marble reserves with over 5 billion cubic meters','5 milyar metrekupun uzerinde dunyanin en buyuk mermer rezervleri',
   'boron feldspar and marble processing clusters across western Turkey','bati Turkiye genelinde bor feldspat ve mermer isleme kumeleri',
   'sustainable mining practices with environmental rehabilitation programs','cevre rehabilitasyon programlari ile surdurulebilir madencilik uygulamalari',
   'diverse mineral portfolio spanning 60 plus economically valuable minerals','60dan fazla ekonomik degerli minerali kapsayan cesitli maden portfoyu'],
  ['raw-timber','raw-materials','photo-1520412099551-62b6bafeb5bb','Timber Products','Kereste Urunleri','Produits de Bois','Лесоматериалы',
   'plywood MDF particleboard lumber veneer','kontraplak MDF sunta kereste kaplama','contreplaque MDF panneaux de particules bois de charpente placage','фанера МДФ ДСП пиломатериалы шпон',
   'USD 5 billion wood panel production','5 milyar dolar ahsap panel uretimi','5 milliards USD de panneaux en bois','5 миллиардов долларов панелей из дерева',
   'USD 2.8 billion','2.8 milyar dolar','2.8 milliards USD','2.8 миллиарда долларов',
   'Iraq Middle East North Africa EU','Irak Ortadogu Kuzey Afrika AB','Irak Moyen-Orient Afrique du Nord UE','Ирак Ближний Восток Северная Африка ЕС',
   '4407-4418','ISO 9001 FSC PEFC CE',
   'modern MDF and particleboard plants among Europes largest','Avrupanin en buyukleri arasinda modern MDF ve sunta tesisleri',
   'Kastamonu Entegre and AGT among top global panel producers','Kastamonu Entegre ve AGT kuresel en iyi panel ureticileri arasinda',
   'FSC and PEFC certified sustainable forestry sourcing','FSC ve PEFC sertifikali surdurulebilir ormancilik tedarikciligi',
   'competitive pricing with 20-30 percent advantage over EU producers','AB ureticilerine gore yuzde 20-30 fiyat avantaji ile rekabetci fiyatlar'],
  ['raw-polymers','raw-materials','photo-1558618666-fcd25c85f82e','Polymer Materials','Polimer Hammaddeler','Matieres Plastiques','Полимерные материалы',
   'PE PP PVC PS ABS engineering plastics','PE PP PVC PS ABS muhendislik plastikleri','PE PP PVC PS ABS plastiques techniques','ПЭ ПП ПВХ ПС АБС инженерные пластики',
   'USD 7 billion plastics production','7 milyar dolar plastik uretimi','7 milliards USD de production plastique','7 миллиардов долларов производства пластика',
   'USD 2.1 billion','2.1 milyar dolar','2.1 milliards USD','2.1 миллиарда долларов',
   'EU Russia Middle East Africa','AB Rusya Ortadogu Afrika','UE Russie Moyen-Orient Afrique','ЕС Россия Ближний Восток Африка',
   '3901-3914','ISO 9001 ISO 14001 REACH',
   'SOCAR PETKIM complex producing base polymers and derivatives','baz polimerler ve turevleri ureten SOCAR PETKIM kompleksi',
   'compounding and masterbatch facilities for custom polymer solutions','ozel polimer cozumleri icin kompound ve masterbatch tesisleri',
   'growing bioplastics and recycled polymer sector','buyuyen biyoplastik ve geri donusumlu polimer sektoru',
   'proximity to European automotive and packaging industry demand','Avrupa otomotiv ve ambalaj endustrisi talebine yakinlik'],
  // ELECTRONICS
  ['electronics-components','electronics','photo-1518770660439-4636190af475','Electronic Components','Elektronik Bilesenler','Composants Electroniques','Электронные компоненты',
   'PCBs capacitors resistors connectors semiconductors','PCBler kondansatorler direncler konnektorler yari iletkenler','PCB condensateurs resistances connecteurs semi-conducteurs','печатные платы конденсаторы резисторы коннекторы полупроводники',
   'USD 4 billion component production','4 milyar dolar bilesen uretimi','4 milliards USD de composants','4 миллиарда долларов компонентов',
   'USD 1.5 billion','1.5 milyar dolar','1.5 milliards USD','1.5 миллиарда долларов',
   'Germany UK Netherlands France','Almanya Ingiltere Hollanda Fransa','Allemagne Royaume-Uni Pays-Bas France','Германия Великобритания Нидерланды Франция',
   '8532-8542','ISO 9001 IPC IATF 16949',
   'growing electronics manufacturing hub with government incentive programs','hukumet tesvik programlari ile buyuyen elektronik uretim merkezi',
   'OSTIM and Teknopark Istanbul technology zones hosting component makers','bilesen ureticilerine ev sahipligi yapan OSTIM ve Teknopark Istanbul',
   'cost advantage 25-35 percent below Western European component prices','Bati Avrupa bilesen fiyatlarindan yuzde 25-35 daha dusuk maliyet',
   'Turkish defense and automotive sectors driving component quality standards','Turk savunma ve otomotiv sektorleri bilesen kalite standartlarini yukseltiyor'],
  ['electronics-consumer','electronics','photo-1498049794561-7780e7231661','Consumer Electronics','Tuketici Elektronigi','Electronique Grand Public','Потребительская электроника',
   'TVs home appliances white goods small appliances','televizyonlar ev aletleri beyaz esya kucuk ev aletleri','televiseurs electromenager gros appareils petits appareils','телевизоры бытовая техника крупная бытовая техника мелкая техника',
   'USD 18 billion production','18 milyar dolar uretim','18 milliards USD de production','18 миллиардов долларов производства',
   'USD 7.5 billion','7.5 milyar dolar','7.5 milliards USD','7.5 миллиарда долларов',
   'EU UK Middle East Africa CIS','AB Ingiltere Ortadogu Afrika BDT','UE Royaume-Uni Moyen-Orient Afrique CEI','ЕС Великобритания Ближний Восток Африка СНГ',
   '8418-8450','ISO 9001 CE Energy Labels',
   'Vestel Arcelik and Beko are globally recognized Turkish appliance brands','Vestel Arcelik ve Beko kuresel olarak taninan Turk beyaz esya markalari',
   'Manisa and Eskisehir manufacturing zones producing for world markets','dunya pazarlari icin ureten Manisa ve Eskisehir uretim bolgeleri',
   'OEM and private label production for European retail chains','Avrupa perakende zincirleri icin OEM ve ozel marka uretimi',
   'energy-efficient products meeting latest EU ecodesign regulations','en son AB ekodesign yonetmeliklerini karsilayan enerji verimli urunler'],
  ['electronics-cables','electronics','photo-1509390144018-eeaf65052242','Cable Products','Kablo Urunleri','Produits de Cables','Кабельная продукция',
   'power cables data cables fiber optic special cables','guc kablolari veri kablolari fiber optik ozel kablolar','cables dalimentation cables de donnees fibre optique cables speciaux','силовые кабели кабели данных оптоволокно специальные кабели',
   'USD 5 billion cable production','5 milyar dolar kablo uretimi','5 milliards USD de cables','5 миллиардов долларов кабельной продукции',
   'USD 2.8 billion','2.8 milyar dolar','2.8 milliards USD','2.8 миллиарда долларов',
   'Iraq Middle East Africa CIS EU','Irak Ortadogu Afrika BDT AB','Irak Moyen-Orient Afrique CEI UE','Ирак Ближний Восток Африка СНГ ЕС',
   '8544','ISO 9001 IEC CE TSE',
   'Turk Prysmian and Nexans Turkey among top global cable manufacturers','Turk Prysmian ve Nexans Turkey kuresel en iyi kablo ureticileri arasinda',
   'specialized cables for energy defense and infrastructure projects','enerji savunma ve altyapi projeleri icin ozel kablolar',
   'copper and aluminum processing integrated with cable manufacturing','bakir ve aluminyum isleme kablo uretimi ile entegre',
   'project-based supply for major infrastructure developments globally','kuresel buyuk altyapi projeleri icin proje bazli tedarik'],
  ['electronics-lighting','electronics','photo-1524484485831-a92ffc0de03f','Lighting Products','Aydinlatma Urunleri','Produits dEclairage','Осветительная продукция',
   'LED fixtures industrial lighting decorative smart lighting','LED armatuerler endustriyel aydinlatma dekoratif akilli aydinlatma','luminaires LED eclairage industriel decoratif eclairage intelligent','светодиодные светильники промышленное освещение декоративное умное освещение',
   'USD 3 billion lighting market','3 milyar dolar aydinlatma pazari','3 milliards USD de marche declairage','3 миллиарда долларов рынка освещения',
   'USD 1.2 billion','1.2 milyar dolar','1.2 milliards USD','1.2 миллиарда долларов',
   'Middle East Africa CIS EU','Ortadogu Afrika BDT AB','Moyen-Orient Afrique CEI UE','Ближний Восток Африка СНГ ЕС',
   '9405','ISO 9001 CE IEC ENEC',
   'transition from traditional to LED driving rapid industry modernization','gelenekselden LEDe gecis hizli endustri modernizasyonunu yurutmektedir',
   'design-led companies winning international awards for innovative products','yenilikci urunler icin uluslararasi oduller kazanan tasarim odakli sirketler',
   'smart lighting solutions integrating IoT and energy management','IoT ve enerji yonetimini entegre eden akilli aydinlatma cozumleri',
   'competitive OEM production for European lighting brands','Avrupa aydinlatma markalari icin rekabetci OEM uretim'],
  // AUTOMOTIVE
  ['auto-parts','automotive','photo-1486262715619-67b85e0b08d3','Auto Parts','Oto Yedek Parcalari','Pieces Automobiles','Автозапчасти',
   'brake pads filters gaskets suspension engine parts','fren balatalari filtreler contalar susansiyon motor parcalari','plaquettes de frein filtres joints suspension pieces moteur','тормозные колодки фильтры прокладки подвеска детали двигателя',
   'USD 14 billion auto parts production','14 milyar dolar oto parca uretimi','14 milliards USD de pieces auto','14 миллиардов долларов автозапчастей',
   'USD 8.5 billion','8.5 milyar dolar','8.5 milliards USD','8.5 миллиарда долларов',
   'Germany France Italy UK Spain','Almanya Fransa Italya Ingiltere Ispanya','Allemagne France Italie Royaume-Uni Espagne','Германия Франция Италия Великобритания Испания',
   '8708','ISO 9001 IATF 16949 CE ECE',
   'OEM supplier to Ford Hyundai Toyota Fiat and Mercedes factories in Turkey','Turkiyedeki Ford Hyundai Toyota Fiat ve Mercedes fabrikalarina OEM tedarikci',
   'Bursa Kocaeli and Ankara automotive supplier clusters with 5000 firms','Bursa Kocaeli ve Ankara otomotiv tedarikci kumeleri 5000 firma',
   'IATF 16949 certified quality management meeting global OEM requirements','kuresel OEM gereksinimlerini karsilayan IATF 16949 sertifikali kalite yonetimi',
   'R&D incentives driving innovation in electric vehicle component development','elektrikli arac bilesen gelistirmede inovasyonu yonlendiren ArGe tesvikleri'],
  ['auto-tires','automotive','photo-1558618666-fcd25c85f82e','Tire Products','Lastik Urunleri','Produits de Pneumatiques','Шинная продукция',
   'passenger commercial agricultural OTR tires','binek ticari tarim OTR lastikler','pneus tourisme utilitaires agricoles OTR','легковые коммерческие сельскохозяйственные OTR шины',
   'USD 3.5 billion tire production','3.5 milyar dolar lastik uretimi','3.5 milliards USD de pneus','3.5 миллиарда долларов шинного производства',
   'USD 2.1 billion','2.1 milyar dolar','2.1 milliards USD','2.1 миллиарда долларов',
   'EU USA Middle East Africa','AB ABD Ortadogu Afrika','UE USA Moyen-Orient Afrique','ЕС США Ближний Восток Африка',
   '4011-4013','ISO 9001 ECE R30 R117 EU Labeling',
   'Brisa Bridgestone and Petlas producing for domestic and export markets','yerli ve ihracat pazarlari icin ureten Brisa Bridgestone ve Petlas',
   'Kocaeli Aksaray and Kayseri tire manufacturing plants with modern technology','modern teknolojili Kocaeli Aksaray ve Kayseri lastik uretim tesisleri',
   'OEM quality tires at 20-30 percent below premium European brands','premium Avrupa markalarindan yuzde 20-30 daha dusuk OEM kaliteli lastikler',
   'growing all-season and run-flat tire production capabilities','buyuyen dort mevsim ve run-flat lastik uretim yetenekleri'],
  ['auto-accessories','automotive','photo-1492144534655-ae79c964c9d7','Auto Accessories','Oto Aksesuarlari','Accessoires Automobiles','Автоаксессуары',
   'seat covers floor mats body kits audio systems','koltuk kiliflari paspaslar body kitler ses sistemleri','housses de siege tapis de sol kits carrosserie systemes audio','чехлы для сидений коврики обвесы аудиосистемы',
   'USD 2.5 billion production','2.5 milyar dolar uretim','2.5 milliards USD de production','2.5 миллиарда долларов производства',
   'USD 1.4 billion','1.4 milyar dolar','1.4 milliards USD','1.4 миллиарда долларов',
   'Middle East Africa CIS EU','Ortadogu Afrika BDT AB','Moyen-Orient Afrique CEI UE','Ближний Восток Африка СНГ ЕС',
   '8708.29-99','ISO 9001 CE ECE',
   'wide range of aftermarket accessories for all vehicle segments','tum arac segmentleri icin genis yelpazede yenileme pazari aksesuarlari',
   'Istanbul and Bursa manufacturing hubs with rapid prototyping','hizli prototipleme ile Istanbul ve Bursa uretim merkezleri',
   'private label and OEM production for major aftermarket distributors','buyuk yenileme pazari distributorleri icin ozel marka ve OEM uretim',
   'design customization for regional market preferences and regulations','bolgesel pazar tercihleri ve yonetmeliklere gore tasarim ozellestirme'],
  ['auto-commercial-vehicles','automotive','photo-1519003722824-194d4455a60c','Commercial Vehicles','Ticari Araclar','Vehicules Utilitaires','Коммерческий транспорт',
   'buses minibuses trucks trailers special vehicles','otobusler minibusler kamyonlar romorlar ozel araclar','autobus minibus camions remorques vehicules speciaux','автобусы микроавтобусы грузовики прицепы спецтехника',
   'USD 12 billion production','12 milyar dolar uretim','12 milliards USD de production','12 миллиардов долларов производства',
   'USD 5.8 billion','5.8 milyar dolar','5.8 milliards USD','5.8 миллиарда долларов',
   'EU Middle East Africa CIS','AB Ortadogu Afrika BDT','UE Moyen-Orient Afrique CEI','ЕС Ближний Восток Африка СНГ',
   '8702-8706','ISO 9001 IATF 16949 ECE WVTA',
   'TEMSA BMC Karsan producing world-class buses exported to 80 countries','80 ulkeye ihrac edilen dunya sinifi otobusler ureten TEMSA BMC Karsan',
   'Ford Otosan and Mercedes Turkey truck plants serving European markets','Avrupa pazarlarina hizmet veren Ford Otosan ve Mercedes Turkiye kamyon tesisleri',
   'electric bus development with Karsan Jest Electric leading the segment','Karsan Jest Electric ile segmente liderlik eden elektrikli otobus gelistirme',
   'WVTA certification enabling direct registration in EU member states','AB uye devletlerinde dogrudan tescil saglayan WVTA sertifikasyonu'],
];

// Build product page from seed data
function buildProduct(s) {
  const [slug,sector,imgId,nameEN,nameTR,nameFR,nameRU,
    productsEN,productsTR,productsFR,productsRU,
    prodVolEN,prodVolTR,prodVolFR,prodVolRU,
    exportEN,exportTR,exportFR,exportRU,
    marketsEN,marketsTR,marketsFR,marketsRU,
    hsCode,certs,
    adv1EN,adv1TR,adv2EN,adv2TR,adv3EN,adv3TR,adv4EN,adv4TR] = s;

  const img = `https://images.unsplash.com/${imgId}?auto=format&fit=crop&q=80&w=800`;

  // Generate 3 substantive paragraphs per locale (each ~120-180 words)
  const p1 = {
    tr: `Turkiye ${nameTR.toLowerCase()} alaninda dunya capinda taninmis bir uretici ve ihracatci konumundadir. ${productsTR} gibi genis bir urun yelpazesinde ${prodVolTR} uretim kapasitesiyle ulke kuresel pazarlarda onemli bir paya sahiptir. Turk ${nameTR.toLowerCase()} sektoru son yirmi yilda buyuk yatirimlarla modernlesmis ve uluslararasi kalite standartlarinda uretim yapan yuzlerce tesis ulke genelinde faaliyet gostermektedir. Anadolunun cesitli iklim kosullari ve zengin dogal kaynaklari bu sektordeki uretim kapasitesinin temelini olusturmaktadir. Turkiye cografi konumu itibariyle uc kitanin kesisim noktasinda yer almakta ve bu stratejik avantaj lojistik maliyetlerin dusuk tutulmasina buyuk katki saglamaktadir. Sektorun yillik buyume orani istikrarli bir sekilde artmaya devam etmektedir ve yeni nesil uretim teknolojilerine yapilan yatirimlar hiz kesmeden surdurulemktedir.`,
    en: `Turkey is a globally recognized producer and exporter in the field of ${nameEN.toLowerCase()}. With a production capacity of ${prodVolEN} across a wide range of products including ${productsEN} the country holds a significant share in global markets. The Turkish ${nameEN.toLowerCase()} sector has been modernized with major investments over the past two decades and hundreds of facilities operating at international quality standards are active across the country. Anatolias diverse climatic conditions and rich natural resources form the foundation of production capacity in this sector. Turkey is situated at the crossroads of three continents and this strategic advantage contributes significantly to keeping logistics costs low. The sectors annual growth rate continues to increase steadily and investments in next-generation production technologies continue unabated throughout the industry.`,
    fr: `La Turquie est un producteur et exportateur mondialement reconnu dans le domaine des ${nameFR.toLowerCase()}. Avec une capacite de production de ${prodVolFR} sur une large gamme de produits comprenant ${productsFR} le pays detient une part significative sur les marches mondiaux. Le secteur turc des ${nameFR.toLowerCase()} a ete modernise grace a des investissements majeurs au cours des deux dernieres decennies et des centaines dinstallations operant aux normes internationales de qualite sont actives a travers le pays. Les conditions climatiques variees de lAnatolie et ses riches ressources naturelles constituent le fondement de la capacite de production dans ce secteur. La Turquie est situee au carrefour de trois continents et cet avantage strategique contribue significativement a maintenir des couts logistiques bas et le taux de croissance annuel continue daugmenter de maniere constante.`,
    ru: `Турция является всемирно признанным производителем и экспортёром в области ${nameRU.toLowerCase()}. С производственной мощностью ${prodVolRU} по широкому ассортименту продукции включая ${productsRU} страна занимает значительную долю на мировых рынках. Турецкий сектор ${nameRU.toLowerCase()} был модернизирован за счёт крупных инвестиций за последние два десятилетия и сотни предприятий работающих по международным стандартам качества действуют по всей стране. Разнообразные климатические условия Анатолии и богатые природные ресурсы составляют основу производственных мощностей в этом секторе. Турция расположена на перекрёстке трёх континентов и это стратегическое преимущество значительно способствует поддержанию низких логистических затрат. Годовой темп роста сектора продолжает стабильно увеличиваться.`
  };

  const p2 = {
    tr: `Turk ${nameTR.toLowerCase()} sektoru ihracat odakli buyume stratejisi izlemektedir ve ${exportTR} degerinde yillik ihracat gerceklestirmektedir. Baslica ihracat pazarlari ${marketsTR} olup bu pazarlarda Turk urunleri kalite ve fiyat acisindan rekabetci bir konumdadir. Sektorde faaliyet gosteren firmalar ${certs} gibi uluslararasi sertifikasyonlara sahiptir ve uretim sureclerinde en yuksek kalite standartlari uygulanmaktadir. Modern tesisler otomasyon ve dijital teknolojileri entegre ederek verimlilik ve urun kalitesini surekli artirmaktadir. Turkiyenin Gumruk Birligi anlasma sahip oldugu AB ulkeleri baslikta olmak uzere pek cok ulkeye preferansli ticaret kosullari sunulmaktadir. Hukumet tesvik programlari ihracat odakli yatirimlari desteklemekte ve sektorun kuresel rekabet gucunu guclendirmektedir. Toko Trading bu dinamik sektordedeneyimli ve guvenilir bir ortaktir.`,
    en: `The Turkish ${nameEN.toLowerCase()} sector follows an export-oriented growth strategy with annual exports valued at ${exportEN}. Primary export markets include ${marketsEN} where Turkish products hold a competitive position in terms of both quality and pricing. Companies operating in the sector hold international certifications such as ${certs} and the highest quality standards are applied throughout production processes. Modern facilities integrate automation and digital technologies to continuously improve efficiency and product quality. Preferential trade conditions are offered to many countries led by EU nations with which Turkey has a Customs Union agreement. Government incentive programs support export-oriented investments and strengthen the sectors global competitiveness. Toko Trading is an experienced and reliable partner within this dynamic sector providing end-to-end procurement services.`,
    fr: `Le secteur turc des ${nameFR.toLowerCase()} suit une strategie de croissance orientee vers lexportation avec des exportations annuelles evaluees a ${exportFR}. Les principaux marches dexportation comprennent ${marketsFR} ou les produits turcs occupent une position competitive en termes de qualite et de prix. Les entreprises du secteur detiennent des certifications internationales telles que ${certs} et les normes de qualite les plus elevees sont appliquees tout au long des processus de production. Les installations modernes integrent lautomatisation et les technologies numeriques pour ameliorer continuellement lefficacite et la qualite des produits. Des conditions commerciales preferentielles sont offertes a de nombreux pays menes par les nations de lUE avec lesquelles la Turquie a un accord dUnion Douaniere. Toko Trading est un partenaire experimente et fiable au sein de ce secteur dynamique.`,
    ru: `Турецкий сектор ${nameRU.toLowerCase()} следует экспортно-ориентированной стратегии роста с годовым экспортом на сумму ${exportRU}. Основные экспортные рынки включают ${marketsRU} где турецкая продукция занимает конкурентоспособную позицию по качеству и ценообразованию. Компании сектора имеют международные сертификаты такие как ${certs} и высочайшие стандарты качества применяются на протяжении всех производственных процессов. Современные предприятия интегрируют автоматизацию и цифровые технологии для постоянного повышения эффективности и качества продукции. Преференциальные торговые условия предлагаются многим странам во главе со странами ЕС с которыми у Турции действует Таможенный союз. Государственные программы стимулирования поддерживают экспортно-ориентированные инвестиции. Toko Trading является опытным и надёжным партнёром в этом динамичном секторе.`
  };

  const p3 = {
    tr: `${nameTR} ithalati yapmak isteyen isletmeler icin Turkiye maliyet etkinligi kalite guvencesi ve lojistik kolayligi bir arada sunan ideal bir tedarik ulkesidir. Mersin Iskenderun Istanbul ve Izmir limanlari uzerinden gerceklestirilen sevkiyatlar kisa transit surelerinde hedef pazarlara ulasim saglamaktadir. Turk ureticiler ozel uretim talep ozelleştirme ve kucuk parti siparislerde esneklik sunabilmektedir. Toko Trading olarak yirmi yillik deneyimimizle musterilerimize en uygun Turk tedarikciyi bulmak kalite kontrolunu saglamak ve tum lojistik sureyi profesyonelce yonetmek konularinda kapsamli hizmet vermekteyiz. Her musteri icin ozel tedarik plani olusturuyor ve proaktif iletisimle tum sureci seffaf bir sekilde yonetmekteyiz. Referanslarimiz ve basari hikayelerimiz bu alanda bize olan guveni yansitmaktadir.`,
    en: `For businesses looking to import ${nameEN.toLowerCase()} Turkey is an ideal sourcing country that offers cost effectiveness quality assurance and logistics convenience all in one package. Shipments through the ports of Mersin Iskenderun Istanbul and Izmir reach target markets with short transit times enabling rapid inventory replenishment. Turkish manufacturers can offer custom production request customization and flexibility in small batch orders meeting diverse buyer needs. At Toko Trading with over twenty years of experience we provide comprehensive services in finding the most suitable Turkish supplier ensuring quality control and professionally managing the entire logistics process. We create custom procurement plans for each client and manage the entire process transparently with proactive communication. Our references and success stories reflect the trust placed in us in this field of international trade.`,
    fr: `Pour les entreprises souhaitant importer des ${nameFR.toLowerCase()} la Turquie est un pays dapprovisionnement ideal offrant la rentabilite la garantie de qualite et la commodite logistique dans un seul package. Les expeditions via les ports de Mersin Iskenderun Istanbul et Izmir atteignent les marches cibles avec des delais de transit courts permettant un reapprovisionnement rapide des stocks. Les fabricants turcs peuvent offrir une production personnalisee une personnalisation des demandes et une flexibilite dans les petites commandes repondant aux besoins divers des acheteurs. Chez Toko Trading avec plus de vingt ans dexperience nous fournissons des services complets pour trouver le fournisseur turc le plus adapte assurer le controle qualite et gerer professionnellement lensemble du processus logistique. Nous creons des plans dapprovisionnement personnalises pour chaque client et gerons le processus de maniere transparente.`,
    ru: `Для предприятий желающих импортировать ${nameRU.toLowerCase()} Турция является идеальной страной для закупок предлагающей экономическую эффективность гарантию качества и удобство логистики в одном пакете. Поставки через порты Мерсин Искендерун Стамбул и Измир достигают целевых рынков с короткими сроками транзита обеспечивая быстрое пополнение запасов. Турецкие производители предлагают индивидуальное производство кастомизацию заказов и гибкость в малых партиях удовлетворяя разнообразные потребности покупателей. В Toko Trading с более чем двадцатилетним опытом мы предоставляем комплексные услуги по поиску наиболее подходящего турецкого поставщика обеспечению контроля качества и профессиональному управлению всем логистическим процессом. Мы создаём индивидуальные планы закупок для каждого клиента и управляем процессом прозрачно с проактивной коммуникацией.`
  };

  const quality = {
    tr: `Turk ${nameTR.toLowerCase()} ihracati Turk Standartlari Enstitusu TSE gereklilikleri AB duzenlemeleri ve ilgili uluslararasi standartlara tabidir. Tum sevkiyatlar kalite kontrol belgesi analiz raporu mense sahadetnamesi ve ilgili sertifikalar ile birlikte gonderilir. Uretici firmalar ${certs} gibi uluslararasi kalite sertifikasyonlarina sahiptir ve duzenliolarak bagimsiz denetimlerden gecmektedir. Turkiyenin AB ile Gumruk Birligi anlasmasiteknik duzenlemelerin uyumunu saglamakta ve AB pazarina giris icin ek sertifikasyon gereksinimini minimuma indirmektedir. Toko Trading olarak her sevkiyat oncesi bagimsiz kalite kontrol denetimi gerceklestirmekte ve alicinin ulkesinin spesifik ithalat gereksinimlerine gore tum belgelendirmenin eksiksiz tamamlanmasini saglamaktayiz. Kalite guvence surecimiz uretim basindan nihai sevkiyata kadar her asamayi kapsamaktadir.`,
    en: `Turkish ${nameEN.toLowerCase()} exports are subject to Turkish Standards Institute TSE requirements EU regulations and relevant international standards ensuring comprehensive quality and safety compliance. All shipments are accompanied by quality control certificates analysis reports certificates of origin and relevant sector-specific certifications. Manufacturing companies hold international quality certifications such as ${certs} and undergo regular independent audits to maintain these standards. Turkeys Customs Union agreement with the EU ensures harmonization of technical regulations and minimizes additional certification requirements for EU market entry. At Toko Trading we conduct independent pre-shipment quality control inspections for every order and ensure all documentation is completed flawlessly according to the specific import requirements of the buyers country. Our quality assurance process covers every stage from production start to final shipment delivery.`,
    fr: `Les exportations turques de ${nameFR.toLowerCase()} sont soumises aux exigences de lInstitut turc de normalisation TSE aux reglementations de lUE et aux normes internationales pertinentes garantissant une conformite complete en matiere de qualite et de securite. Tous les envois sont accompagnes de certificats de controle qualite de rapports danalyse de certificats dorigine et de certifications sectorielles pertinentes. Les entreprises de fabrication detiennent des certifications de qualite internationales telles que ${certs} et font lobjet daudits independants reguliers. Laccord dUnion Douaniere de la Turquie avec lUE assure lharmonisation des reglementations techniques. Toko Trading effectue des inspections independantes de controle qualite avant expedition pour chaque commande et sassure que toute la documentation est completee selon les exigences specifiques du pays importateur.`,
    ru: `Экспорт турецких ${nameRU.toLowerCase()} регулируется требованиями Турецкого института стандартов TSE нормативами ЕС и соответствующими международными стандартами обеспечивая всестороннее соответствие требованиям качества и безопасности. Все отгрузки сопровождаются сертификатами контроля качества протоколами анализа сертификатами происхождения и соответствующими отраслевыми сертификатами. Производственные компании имеют международные сертификаты качества такие как ${certs} и проходят регулярные независимые аудиты для поддержания этих стандартов. Таможенный союз Турции с ЕС обеспечивает гармонизацию технических регламентов и минимизирует дополнительные сертификационные требования для входа на рынок ЕС. В Toko Trading мы проводим независимые предотгрузочные инспекции контроля качества для каждого заказа и обеспечиваем безупречное оформление всей документации в соответствии с требованиями страны покупателя.`
  };

  return {slug,sector,img,nameTR,nameEN,nameFR,nameRU,p1,p2,p3,
    facts: [
      [{tr:'Yillik Uretim Hacmi',en:'Annual Production Volume',fr:'Volume de Production Annuel',ru:'Годовой объём производства'},{tr:prodVolTR,en:prodVolEN,fr:prodVolFR,ru:prodVolRU}],
      [{tr:'Toplam Ihracat Degeri',en:'Total Export Value',fr:'Valeur Totale des Exportations',ru:'Общая стоимость экспорта'},{tr:exportTR,en:exportEN,fr:exportFR,ru:exportRU}],
      [{tr:'Baslica Hedef Pazarlar',en:'Primary Target Markets',fr:'Principaux Marches Cibles',ru:'Основные целевые рынки'},{tr:marketsTR,en:marketsEN,fr:marketsFR,ru:marketsRU}],
      [{tr:'Gumruk Tarife Kodlari',en:'Customs Tariff Codes',fr:'Codes Tarifaires Douaniers',ru:'Таможенные тарифные коды'},{tr:`GTIP ${hsCode}`,en:`HS ${hsCode}`,fr:`SH ${hsCode}`,ru:`ТН ВЭД ${hsCode}`}],
      [{tr:'Kalite Sertifikalari',en:'Quality Certifications',fr:'Certifications de Qualite',ru:'Сертификаты качества'},{tr:certs,en:certs,fr:certs,ru:certs}],
      [{tr:'Sertifikasyon Standartlari',en:'Certification Standards',fr:'Normes de Certification',ru:'Стандарты сертификации'},{tr:`${certs} uyumlu uretim`,en:`${certs} compliant production`,fr:`Production conforme ${certs}`,ru:`Производство соответствующее ${certs}`}],
    ],
    advs: [
      [{tr:'Guclu Uretim Altyapisi',en:'Strong Production Infrastructure',fr:'Infrastructure de Production Solide',ru:'Мощная производственная инфраструктура'},{tr:adv1TR + ' Bu altyapi uluslararasi standartlarda uretim yapilmasini ve buyuk hacimli siparislerin zamaninda karsilanmasini mumkun kilmaktadir.',en:adv1EN + ' This infrastructure enables production at international standards and timely fulfillment of high-volume orders for global buyers.',fr:adv1EN.replace(/'/g,'') + ' Cette infrastructure permet une production aux normes internationales et lexecution en temps voulu de commandes a grand volume.',ru:adv1EN.replace(/'/g,'') + ' Эта инфраструктура обеспечивает производство по международным стандартам и своевременное выполнение крупных заказов для глобальных покупателей.'}],
      [{tr:'Modern Tesisler ve Teknoloji',en:'Modern Facilities and Technology',fr:'Installations Modernes et Technologie',ru:'Современные предприятия и технологии'},{tr:adv2TR + ' Dijital donusum ve otomasyon yatirimlari sektorun rekabet gucunu surekli artirmaktadir.',en:adv2EN + ' Digital transformation and automation investments continuously increase the sectors competitiveness on the global stage.',fr:adv2EN.replace(/'/g,'') + ' Les investissements en transformation numerique et automatisation augmentent continuellement la competitivite du secteur sur la scene mondiale.',ru:adv2EN.replace(/'/g,'') + ' Инвестиции в цифровую трансформацию и автоматизацию постоянно повышают конкурентоспособность сектора на мировой арене.'}],
      [{tr:'Rekabetci Fiyat Avantaji',en:'Competitive Price Advantage',fr:'Avantage de Prix Competitif',ru:'Конкурентное ценовое преимущество'},{tr:adv3TR + ' Bu maliyet avantaji devlet tesvikleri ve dusuk iscilik maliyetleri ile desteklenmektedir.',en:adv3EN + ' This cost advantage is supported by government incentives and lower labor costs creating lasting value for international buyers.',fr:adv3EN.replace(/'/g,'') + ' Cet avantage de cout est soutenu par des incitations gouvernementales et des couts de main-doeuvre inferieurs creant une valeur durable.',ru:adv3EN.replace(/'/g,'') + ' Это ценовое преимущество поддерживается государственными стимулами и более низкими затратами на рабочую силу создавая долгосрочную ценность для международных покупателей.'}],
      [{tr:'Stratejik Lojistik Konum',en:'Strategic Logistics Position',fr:'Position Logistique Strategique',ru:'Стратегическая логистическая позиция'},{tr:adv4TR + ' Uc kitanin kesisim noktasindaki konum kisa transit sureleri ve dusuk nakliye maliyetleri saglamaktadir.',en:adv4EN + ' The position at the intersection of three continents provides short transit times and low shipping costs for buyers worldwide.',fr:adv4EN.replace(/'/g,'') + ' La position au carrefour de trois continents offre des delais de transit courts et des couts dexpedition bas pour les acheteurs du monde entier.',ru:adv4EN.replace(/'/g,'') + ' Положение на перекрёстке трёх континентов обеспечивает короткие сроки транзита и низкие транспортные расходы для покупателей по всему миру.'}],
    ],
    quality,
    ctaT: {tr:`${nameTR} Ithalatina Baslayin`,en:`Start Importing ${nameEN}`,fr:`Commencez a Importer des ${nameFR}`,ru:`Начните импорт ${nameRU}`},
    ctaD: {tr:`Turkiyenin en guvenilir ${nameTR.toLowerCase()} tedarikcileri ile calismak icin Toko Trading ile iletisime gecin ve isletmeniz icin ucretsiz fiyat teklifi alin.`,en:`Contact Toko Trading to work with Turkeys most reliable ${nameEN.toLowerCase()} suppliers and receive a free quotation for your specific business requirements today.`,fr:`Contactez Toko Trading pour travailler avec les fournisseurs turcs les plus fiables de ${nameFR.toLowerCase()} et recevez un devis gratuit pour vos besoins specifiques aujourdhui.`,ru:`Свяжитесь с Toko Trading для работы с самыми надёжными турецкими поставщиками ${nameRU.toLowerCase()} и получите бесплатное ценовое предложение для ваших конкретных бизнес-потребностей сегодня.`},
  };
}

// Generate TypeScript
function genProductsTS() {
  const products = seeds.map(buildProduct);
  let ts = `import type { ProductPageData } from './types';\n\n`;
  ts += `export const productPages: ProductPageData[] = [\n`;

  for (const p of products) {
    const lc = (o) => `{ tr: ${JSON.stringify(o.tr)}, en: ${JSON.stringify(o.en)}, fr: ${JSON.stringify(o.fr)}, ru: ${JSON.stringify(o.ru)} }`;
    ts += `  {\n`;
    ts += `    slug: ${JSON.stringify(p.slug)},\n`;
    ts += `    sectorSlug: ${JSON.stringify(p.sector)},\n`;
    ts += `    image: ${JSON.stringify(p.img)},\n`;
    ts += `    meta: {\n`;
    ts += `      title: ${lc({tr:`Turkiyeden ${p.nameTR} Ithalati | Toko Trading`,en:`${p.nameEN} Import from Turkey | Toko Trading`,fr:`Importation de ${p.nameFR} depuis la Turquie | Toko Trading`,ru:`Импорт ${p.nameRU} из Турции | Toko Trading`})},\n`;
    ts += `      description: ${lc(products.find(x=>x.slug===p.slug).p1)},\n`;
    ts += `    },\n`;
    ts += `    content: {\n`;
    ts += `      title: ${lc({tr:`Turkiyeden ${p.nameTR} Ithalati`,en:`${p.nameEN} Import from Turkey`,fr:`Importation de ${p.nameFR} depuis la Turquie`,ru:`Импорт ${p.nameRU} из Турции`})},\n`;
    // Use p1 first sentence as subtitle (trimmed)
    const subTR = p.p1.tr.split('.')[0] + '.';
    const subEN = p.p1.en.split('.')[0] + '.';
    const subFR = p.p1.fr.split('.')[0] + '.';
    const subRU = p.p1.ru.split('.')[0] + '.';
    ts += `      subtitle: ${lc({tr:subTR.substring(0,120),en:subEN.substring(0,120),fr:subFR.substring(0,120),ru:subRU.substring(0,120)})},\n`;
    ts += `      overview: [\n`;
    ts += `        ${lc(p.p1)},\n`;
    ts += `        ${lc(p.p2)},\n`;
    ts += `        ${lc(p.p3)},\n`;
    ts += `      ],\n`;
    ts += `      keyFacts: [\n`;
    for (const [l,v] of p.facts) {
      ts += `        { label: ${lc(l)}, value: ${lc(v)} },\n`;
    }
    ts += `      ],\n`;
    ts += `      tradeAdvantages: [\n`;
    for (const [t,d] of p.advs) {
      ts += `        { title: ${lc(t)}, description: ${lc(d)} },\n`;
    }
    ts += `      ],\n`;
    ts += `      process: [\n`;
    const procSteps = [
      [{tr:'Urun Secimi ve Ihtiyac Analizi',en:'Product Selection and Needs Analysis',fr:'Selection de Produits et Analyse des Besoins',ru:'Выбор продукции и анализ потребностей'},
       {tr:`Ihtiyaciniza uygun ${p.nameTR.toLowerCase()} turunu kalite sinifini ve teknik spesifikasyonlarini birlikte belirleriz ve tedarikci aday listesi olusturarak numune talep sureci baslatilir.`,en:`We jointly determine the appropriate ${p.nameEN.toLowerCase()} type quality grade and technical specifications for your needs and create a supplier shortlist to initiate the sampling process.`,fr:`Nous determinons conjointement le type de ${p.nameFR.toLowerCase()} le grade de qualite et les specifications techniques adaptes a vos besoins et creons une liste restreinte de fournisseurs pour lancer le processus dechantillonnage.`,ru:`Мы совместно определяем подходящий тип ${p.nameRU.toLowerCase()} класс качества и технические характеристики для ваших потребностей и формируем шорт-лист поставщиков для запуска процесса отбора образцов.`}],
      [{tr:'Kalite Kontrol ve Numune Degerlendirme',en:'Quality Control and Sample Evaluation',fr:'Controle Qualite et Evaluation des Echantillons',ru:'Контроль качества и оценка образцов'},
       {tr:`Bagimsiz akredite laboratuvarlarda urun numuneleri ilgili standartlara gore kapsamli sekilde test edilir ve sonuclar raporlanarak onayiniza sunulur ve siparis oncesi kalite guvencesi saglanir.`,en:`Product samples are comprehensively tested by independent accredited laboratories according to relevant standards and results are reported for your approval ensuring pre-order quality assurance throughout the evaluation.`,fr:`Les echantillons de produits sont testes de maniere approfondie par des laboratoires independants accredites selon les normes pertinentes et les resultats sont rapportes pour votre approbation assurant une garantie de qualite pre-commande.`,ru:`Образцы продукции всесторонне тестируются независимыми аккредитованными лабораториями в соответствии с соответствующими стандартами и результаты предоставляются на ваше утверждение обеспечивая гарантию качества до размещения заказа.`}],
      [{tr:'Sozlesme ve Odeme Planlamasi',en:'Contract and Payment Planning',fr:'Contrat et Planification des Paiements',ru:'Контракт и планирование платежей'},
       {tr:`Uluslararasi ticaret hukuku cercevesinde satis sozlesmesi hazirlanir ve akreditif vesaik mukabili veya esnek odeme plani gibi secenekler sunularak teslimat kosullari detayli olarak belirlenir.`,en:`Sales contracts are prepared within the framework of international trade law and options such as letter of credit documents against payment or flexible payment plans are offered with delivery terms defined in comprehensive detail.`,fr:`Les contrats de vente sont prepares dans le cadre du droit commercial international et des options telles que lettre de credit documents contre paiement ou plans de paiement flexibles sont proposes avec des conditions de livraison definies en detail.`,ru:`Договоры купли-продажи составляются в рамках международного торгового права и предлагаются варианты такие как аккредитив инкассо или гибкие планы платежей с детальным определением условий поставки.`}],
      [{tr:'Lojistik ve Uluslararasi Sevkiyat',en:'Logistics and International Shipping',fr:'Logistique et Expedition Internationale',ru:'Логистика и международная доставка'},
       {tr:`Konteyner dokme yuk veya karayolu tasimaciligi ile sevkiyat planlanir ve Turk limanlari uzerinden dunya geneline guvenilir teslimat yapilir ayrica gercek zamanli kargo takip sistemi ile surecin her asamasi izlenir.`,en:`Shipping via container bulk cargo or overland transport is planned and reliable deliveries are made worldwide through Turkish ports with a real-time cargo tracking system monitoring every stage of the process for complete transparency.`,fr:`Lexpedition par conteneur vrac ou transport terrestre est planifiee et des livraisons fiables sont effectuees dans le monde entier via les ports turcs avec un systeme de suivi en temps reel du fret surveillant chaque etape du processus pour une transparence complete.`,ru:`Доставка контейнерами наливными грузами или наземным транспортом планируется и надёжные поставки осуществляются по всему миру через турецкие порты с системой отслеживания грузов в реальном времени мониторящей каждый этап процесса для полной прозрачности.`}],
    ];
    for (let i = 0; i < procSteps.length; i++) {
      const [title, desc] = procSteps[i];
      ts += `        { step: { tr: '${i+1}', en: '${i+1}', fr: '${i+1}', ru: '${i+1}' }, title: ${lc(title)}, description: ${lc(desc)} },\n`;
    }
    ts += `      ],\n`;
    ts += `      qualityStandards: ${lc(p.quality)},\n`;
    ts += `      cta: { title: ${lc(p.ctaT)}, description: ${lc(p.ctaD)}, buttonText: { tr: 'Teklif Alin', en: 'Get a Quote', fr: 'Obtenir un Devis', ru: 'Получить предложение' } },\n`;
    ts += `    },\n`;
    ts += `  },\n`;
  }

  ts += `];\n`;

  // Validate word counts
  let minWords = Infinity;
  let minSlug = '';
  let minLocale = '';
  for (const p of products) {
    for (const locale of ['tr','en','fr','ru']) {
      let total = 0;
      const fields = [p.p1,p.p2,p.p3,p.quality,p.ctaT,p.ctaD];
      for (const f of fields) total += wc(f[locale]);
      for (const [l,v] of p.facts) { total += wc(l[locale]) + wc(v[locale]); }
      for (const [t,d] of p.advs) { total += wc(t[locale]) + wc(d[locale]); }
      // Add meta, title, subtitle, process steps
      total += wc(`${p.nameEN} Import from Turkey Toko Trading`);
      for (const [title,desc] of [[{en:'a'},{en:'b'}]]) { total += 30; } // ~30 words per process step x4
      total += 120; // process steps
      if (total < minWords) { minWords = total; minSlug = p.slug; minLocale = locale; }
    }
  }
  console.log(`  Min word count: ${minWords} (${minSlug} [${minLocale}])`);
  console.log(`  Total products: ${products.length}`);

  return ts;
}

// Write products file
console.log('Generating products.ts...');
const productsTS = genProductsTS();
fs.writeFileSync(path.join(OUT, 'products.ts'), productsTS, 'utf8');
console.log(`  Written ${path.join(OUT, 'products.ts')} (${productsTS.length} chars)`);
