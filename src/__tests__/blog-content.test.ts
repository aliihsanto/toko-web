import { describe, it, expect, vi } from 'vitest';

// Mock '#site/content' with fixture data mirroring the 16 seed blog posts
vi.mock('#site/content', () => ({
  posts: [
    // Turkish posts
    {
      slug: 'blog/tr/turkiye-ithalat-rehberi',
      title: "Türkiye'den İthalat Rehberi 2026",
      description:
        "Türkiye'den ithalat yapmak isteyenler için kapsamlı rehber.",
      date: '2026-03-01',
      published: true,
      category: 'import',
      tags: ['ithalat', 'türkiye', 'rehber', 'belgeler'],
      image:
        'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Uluslararası ticaret limanında konteyner gemisi',
      excerpt: "Türkiye'den ithalat yapmak isteyenler için kapsamlı rehber...",
      toc: [
        { title: "Neden Türkiye'den İthalat?", url: '#neden', depth: 2 },
        { title: 'İthalat Sürecinin Adımları', url: '#adimlar', depth: 2 },
      ],
      metadata: { readingTime: 5, wordCount: 650 },
      body: 'compiled mdx code',
    },
    {
      slug: 'blog/tr/gumruk-islemleri-2026',
      title: '2026 Gümrük İşlemleri Rehberi',
      description: '2026 yılında gümrük işlemleri hakkında bilmeniz gereken her şey.',
      date: '2026-02-15',
      published: true,
      category: 'customs',
      tags: ['gümrük', 'mevzuat', 'hs-kodları', 'vergiler'],
      image:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Liman terminalinde gümrük kontrol noktası',
      excerpt: '2026 yılında gümrük işlemleri hakkında...',
      toc: [
        { title: 'HS Kod Sınıflandırması', url: '#hs-kod', depth: 2 },
        { title: 'Gümrük Vergisi Hesaplamaları', url: '#vergi', depth: 2 },
      ],
      metadata: { readingTime: 6, wordCount: 700 },
      body: 'compiled mdx code',
    },
    {
      slug: 'blog/tr/turkiye-ticaret-avantajlari',
      title: "Türkiye'nin Uluslararası Ticaretteki Avantajları",
      description:
        "Türkiye'yi uluslararası ticaret için ideal bir merkez yapan faktörler.",
      date: '2026-02-01',
      published: true,
      category: 'export',
      tags: ['ihracat', 'türkiye', 'avantajlar', 'ticaret'],
      image:
        'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=1200',
      imageAlt: "İstanbul Boğazı'ndan panoramik manzara",
      excerpt: "Türkiye'yi uluslararası ticaret için ideal bir merkez...",
      toc: [
        { title: 'Stratejik Coğrafi Konum', url: '#konum', depth: 2 },
        { title: 'AB Gümrük Birliği', url: '#ab', depth: 2 },
      ],
      metadata: { readingTime: 6, wordCount: 720 },
      body: 'compiled mdx code',
    },
    {
      slug: 'blog/tr/tekstil-sektoru-kaynak-rehberi',
      title: "Türkiye'den Tekstil Tedarik Rehberi",
      description:
        "Türkiye tekstil sektöründen tedarik yapmak isteyenler için kapsamlı rehber.",
      date: '2026-01-15',
      published: true,
      category: 'sourcing',
      tags: ['tedarik', 'tekstil', 'türkiye', 'üretim'],
      image:
        'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Tekstil fabrikasında renkli kumaş topları',
      excerpt: 'Türkiye tekstil sektöründen tedarik yapmak isteyenler...',
      toc: [
        { title: 'Başlıca Üretim Bölgeleri', url: '#bolgeler', depth: 2 },
        { title: 'Kalite Standartları', url: '#standartlar', depth: 2 },
      ],
      metadata: { readingTime: 6, wordCount: 680 },
      body: 'compiled mdx code',
    },
    // English posts
    {
      slug: 'blog/en/turkey-import-guide',
      title: 'Turkey Import Guide 2026: Everything You Need to Know',
      description:
        'A comprehensive guide to importing from Turkey.',
      date: '2026-03-01',
      published: true,
      category: 'import',
      tags: ['import', 'turkey', 'guide', 'documentation'],
      image:
        'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Container ship at an international trade port',
      excerpt: 'A comprehensive guide to importing from Turkey...',
      toc: [
        { title: 'Why Import from Turkey?', url: '#why', depth: 2 },
        { title: 'The Import Process', url: '#process', depth: 2 },
      ],
      metadata: { readingTime: 5, wordCount: 650 },
      body: 'compiled mdx code',
    },
    {
      slug: 'blog/en/customs-procedures-2026',
      title: 'Customs Procedures in 2026: A Complete Guide',
      description: 'Navigate customs procedures with confidence.',
      date: '2026-02-15',
      published: true,
      category: 'customs',
      tags: ['customs', 'regulations', 'hs-codes', 'duties'],
      image:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Customs control point at a port terminal',
      excerpt: 'Navigate customs procedures with confidence...',
      toc: [
        { title: 'Understanding HS Codes', url: '#hs-codes', depth: 2 },
        { title: 'Duty Calculations', url: '#duties', depth: 2 },
      ],
      metadata: { readingTime: 6, wordCount: 710 },
      body: 'compiled mdx code',
    },
    {
      slug: 'blog/en/turkey-trade-advantages',
      title: 'Why Turkey? Key Advantages for International Trade',
      description: 'Discover why Turkey is an ideal hub for international trade.',
      date: '2026-02-01',
      published: true,
      category: 'export',
      tags: ['export', 'turkey', 'advantages', 'trade'],
      image:
        'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Panoramic view of Istanbul and the Bosphorus strait',
      excerpt: 'Discover why Turkey is an ideal hub...',
      toc: [
        { title: 'Geographic Advantage', url: '#geography', depth: 2 },
        { title: 'EU Customs Union', url: '#eu', depth: 2 },
      ],
      metadata: { readingTime: 6, wordCount: 730 },
      body: 'compiled mdx code',
    },
    {
      slug: 'blog/en/textile-sourcing-guide',
      title: 'Sourcing Textiles from Turkey: A Comprehensive Guide',
      description: 'Everything you need to know about textile sourcing from Turkey.',
      date: '2026-01-15',
      published: true,
      category: 'sourcing',
      tags: ['sourcing', 'textile', 'turkey', 'manufacturing'],
      image:
        'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Colorful fabric rolls in a textile factory',
      excerpt: 'Everything you need to know about textile sourcing...',
      toc: [
        { title: 'Key Production Regions', url: '#regions', depth: 2 },
        { title: 'Quality Standards', url: '#standards', depth: 2 },
      ],
      metadata: { readingTime: 7, wordCount: 750 },
      body: 'compiled mdx code',
    },
    // French posts
    {
      slug: 'blog/fr/guide-importation-turquie',
      title: "Guide d'importation depuis la Turquie 2026",
      description: 'Guide complet pour importer depuis la Turquie.',
      date: '2026-03-01',
      published: true,
      category: 'import',
      tags: ['importation', 'turquie', 'guide', 'documentation'],
      image:
        'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Navire porte-conteneurs dans un port de commerce',
      excerpt: 'Guide complet pour importer depuis la Turquie...',
      toc: [
        { title: 'Pourquoi importer depuis la Turquie ?', url: '#pourquoi', depth: 2 },
        { title: "Le processus d'importation", url: '#processus', depth: 2 },
      ],
      metadata: { readingTime: 5, wordCount: 640 },
      body: 'compiled mdx code',
    },
    {
      slug: 'blog/fr/procedures-douanieres-2026',
      title: 'Procédures douanières en 2026 : Guide complet',
      description: 'Maîtrisez les procédures douanières pour le commerce international.',
      date: '2026-02-15',
      published: true,
      category: 'customs',
      tags: ['douanes', 'réglementations', 'codes-sh', 'droits'],
      image:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Point de contrôle douanier au terminal portuaire',
      excerpt: 'Maîtrisez les procédures douanières...',
      toc: [
        { title: 'Comprendre les codes SH', url: '#codes-sh', depth: 2 },
        { title: 'Calcul des droits de douane', url: '#droits', depth: 2 },
      ],
      metadata: { readingTime: 6, wordCount: 690 },
      body: 'compiled mdx code',
    },
    {
      slug: 'blog/fr/avantages-commerce-turquie',
      title: 'Pourquoi la Turquie ? Avantages clés pour le commerce international',
      description: "Découvrez pourquoi la Turquie est un hub idéal pour le commerce.",
      date: '2026-02-01',
      published: true,
      category: 'export',
      tags: ['exportation', 'turquie', 'avantages', 'commerce'],
      image:
        'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=1200',
      imageAlt: "Vue panoramique d'Istanbul et du détroit du Bosphore",
      excerpt: "Découvrez pourquoi la Turquie est un hub idéal...",
      toc: [
        { title: 'Avantage géographique', url: '#geographie', depth: 2 },
        { title: "Union douanière avec l'UE", url: '#ue', depth: 2 },
      ],
      metadata: { readingTime: 6, wordCount: 720 },
      body: 'compiled mdx code',
    },
    {
      slug: 'blog/fr/guide-approvisionnement-textile',
      title: 'Approvisionnement textile en Turquie : Guide complet',
      description: "Tout savoir sur l'approvisionnement textile depuis la Turquie.",
      date: '2026-01-15',
      published: true,
      category: 'sourcing',
      tags: ['approvisionnement', 'textile', 'turquie', 'fabrication'],
      image:
        'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Rouleaux de tissus colorés dans une ligne de production',
      excerpt: "Tout savoir sur l'approvisionnement textile...",
      toc: [
        { title: 'Principales régions de production', url: '#regions', depth: 2 },
        { title: 'Normes de qualité', url: '#normes', depth: 2 },
      ],
      metadata: { readingTime: 7, wordCount: 740 },
      body: 'compiled mdx code',
    },
    // Russian posts
    {
      slug: 'blog/ru/rukovodstvo-po-importu-turtsiya',
      title: 'Руководство по импорту из Турции 2026',
      description: 'Полное руководство по импорту товаров из Турции.',
      date: '2026-03-01',
      published: true,
      category: 'import',
      tags: ['импорт', 'турция', 'руководство', 'документация'],
      image:
        'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Контейнеровоз в порту международной торговли',
      excerpt: 'Полное руководство по импорту товаров из Турции...',
      toc: [
        { title: 'Почему стоит импортировать из Турции?', url: '#pochemu', depth: 2 },
        { title: 'Процесс импорта', url: '#protsess', depth: 2 },
      ],
      metadata: { readingTime: 5, wordCount: 660 },
      body: 'compiled mdx code',
    },
    {
      slug: 'blog/ru/tamozhennye-protsedury-2026',
      title: 'Таможенные процедуры в 2026 году: Полное руководство',
      description: 'Разберитесь в таможенных процедурах международной торговли.',
      date: '2026-02-15',
      published: true,
      category: 'customs',
      tags: ['таможня', 'регулирование', 'тн-вэд', 'пошлины'],
      image:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Пункт таможенного контроля на портовом терминале',
      excerpt: 'Разберитесь в таможенных процедурах...',
      toc: [
        { title: 'Классификация кодов ТН ВЭД', url: '#kody', depth: 2 },
        { title: 'Расчёт таможенных пошлин', url: '#poshliny', depth: 2 },
      ],
      metadata: { readingTime: 6, wordCount: 700 },
      body: 'compiled mdx code',
    },
    {
      slug: 'blog/ru/preimushchestva-torgovli-turtsiya',
      title: 'Почему Турция? Ключевые преимущества для международной торговли',
      description: 'Узнайте, почему Турция является идеальным хабом.',
      date: '2026-02-01',
      published: true,
      category: 'export',
      tags: ['экспорт', 'турция', 'преимущества', 'торговля'],
      image:
        'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Панорамный вид на Стамбул и пролив Босфор',
      excerpt: 'Узнайте, почему Турция является идеальным хабом...',
      toc: [
        { title: 'Географическое преимущество', url: '#geografiya', depth: 2 },
        { title: 'Таможенный союз с ЕС', url: '#es', depth: 2 },
      ],
      metadata: { readingTime: 6, wordCount: 730 },
      body: 'compiled mdx code',
    },
    {
      slug: 'blog/ru/rukovodstvo-po-zakupkam-tekstil',
      title: 'Закупка текстиля в Турции: Полное руководство',
      description: 'Всё о закупке текстиля в Турции.',
      date: '2026-01-15',
      published: true,
      category: 'sourcing',
      tags: ['закупки', 'текстиль', 'турция', 'производство'],
      image:
        'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Цветные рулоны ткани на производственной линии',
      excerpt: 'Всё о закупке текстиля в Турции...',
      toc: [
        { title: 'Основные производственные регионы', url: '#regiony', depth: 2 },
        { title: 'Стандарты качества', url: '#standarty', depth: 2 },
      ],
      metadata: { readingTime: 7, wordCount: 760 },
      body: 'compiled mdx code',
    },
  ],
}));

import { getPostsByLocale } from '@/lib/blog/utils';

const EXPECTED_CATEGORIES = [
  'import',
  'export',
  'customs',
  'regulations',
  'logistics',
  'sourcing',
  'general',
];

describe('Blog Seed Content Validation', () => {
  const locales = ['tr', 'en', 'fr', 'ru'];

  describe('post count per locale', () => {
    it.each(locales)(
      'at least 4 published posts exist for locale "%s"',
      (locale) => {
        const posts = getPostsByLocale(locale);
        expect(posts.length).toBeGreaterThanOrEqual(4);
      }
    );
  });

  describe('required frontmatter fields', () => {
    it('every post has title, description, date, and category', () => {
      for (const locale of locales) {
        const posts = getPostsByLocale(locale);
        for (const post of posts) {
          expect(post.title).toBeTruthy();
          expect(post.description).toBeTruthy();
          expect(post.date).toBeTruthy();
          expect(post.category).toBeTruthy();
        }
      }
    });
  });

  describe('excerpts', () => {
    it('every post has a non-empty excerpt', () => {
      for (const locale of locales) {
        const posts = getPostsByLocale(locale);
        for (const post of posts) {
          expect(post.excerpt).toBeTruthy();
          expect(post.excerpt.length).toBeGreaterThan(0);
        }
      }
    });
  });

  describe('table of contents', () => {
    it('every post has toc with at least one entry', () => {
      for (const locale of locales) {
        const posts = getPostsByLocale(locale);
        for (const post of posts) {
          expect(post.toc).toBeDefined();
          expect(Array.isArray(post.toc)).toBe(true);
          expect(post.toc.length).toBeGreaterThanOrEqual(1);
        }
      }
    });
  });

  describe('reading time', () => {
    it('every post has metadata.readingTime > 0', () => {
      for (const locale of locales) {
        const posts = getPostsByLocale(locale);
        for (const post of posts) {
          expect(post.metadata).toBeDefined();
          expect(post.metadata.readingTime).toBeGreaterThan(0);
        }
      }
    });
  });

  describe('categories', () => {
    it('categories used are from the expected set', () => {
      for (const locale of locales) {
        const posts = getPostsByLocale(locale);
        for (const post of posts) {
          expect(EXPECTED_CATEGORIES).toContain(post.category);
        }
      }
    });

    it('each locale has posts in at least 3 different categories', () => {
      for (const locale of locales) {
        const posts = getPostsByLocale(locale);
        const categories = new Set(posts.map((p) => p.category));
        expect(categories.size).toBeGreaterThanOrEqual(3);
      }
    });
  });
});
