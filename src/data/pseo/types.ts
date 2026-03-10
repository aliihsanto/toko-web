/**
 * PSEO (Programmatic SEO) Data Types
 *
 * These interfaces define the shape of all programmatic SEO page data.
 * Content is stored as locale-keyed objects (NOT in next-intl message bundles)
 * to avoid bloating translation files with long-form content.
 */

/** Locale-keyed content string for all supported languages */
export interface LocaleContent {
  tr: string;
  en: string;
  fr: string;
  ru: string;
}

/** SEO meta fields */
export interface PageMeta {
  title: LocaleContent;
  description: LocaleContent;
}

/** Key fact entry (label-value pair) */
export interface KeyFact {
  label: LocaleContent;
  value: LocaleContent;
}

/** Trade advantage entry */
export interface TradeAdvantage {
  title: LocaleContent;
  description: LocaleContent;
}

/** Process step */
export interface ProcessStep {
  step: LocaleContent;
  title: LocaleContent;
  description: LocaleContent;
}

/** CTA (Call to Action) block */
export interface CTABlock {
  title: LocaleContent;
  description: LocaleContent;
  buttonText: LocaleContent;
}

/** Trade statistic entry */
export interface TradeStat {
  label: LocaleContent;
  value: LocaleContent;
}

/** Key sector entry for country pages */
export interface KeySector {
  title: LocaleContent;
  description: LocaleContent;
}

/** Logistics item for country pages */
export interface LogisticsItem {
  title: LocaleContent;
  description: LocaleContent;
}

/** FAQ question-answer pair */
export interface FAQItem {
  question: LocaleContent;
  answer: LocaleContent;
}

/** Related link for FAQ pages */
export interface RelatedLink {
  label: string;
  href: string;
}

/** Customs procedure entry */
export interface CustomsProcedure {
  title: LocaleContent;
  description: LocaleContent;
}

/** Required document entry */
export interface RequiredDocument {
  name: LocaleContent;
  description: LocaleContent;
}

/** HS code entry */
export interface HSCodeEntry {
  code: string;
  description: LocaleContent;
  dutyRate: LocaleContent;
}

// ─── Page Data Types ────────────────────────────────────────────────────────

/** Product import page data */
export interface ProductPageData {
  slug: string;
  sectorSlug: string;
  image: string;
  meta: PageMeta;
  content: {
    title: LocaleContent;
    subtitle: LocaleContent;
    overview: LocaleContent[];
    keyFacts: KeyFact[];
    tradeAdvantages: TradeAdvantage[];
    process: ProcessStep[];
    qualityStandards: LocaleContent;
    cta: CTABlock;
  };
}

/** Country trade guide page data */
export interface CountryPageData {
  slug: string;
  flag: string;
  image: string;
  meta: PageMeta;
  content: {
    title: LocaleContent;
    subtitle: LocaleContent;
    overview: LocaleContent[];
    tradeStats: TradeStat[];
    keySectors: KeySector[];
    agreements: LocaleContent;
    logistics: LogisticsItem[];
    cta: CTABlock;
  };
}

/** FAQ page data */
export interface FAQPageData {
  slug: string;
  topic: LocaleContent;
  meta: PageMeta;
  content: {
    title: LocaleContent;
    subtitle: LocaleContent;
    intro: LocaleContent;
    questions: FAQItem[];
    relatedLinks: RelatedLink[];
  };
}

/** Customs/regulations page data */
export interface CustomsPageData {
  slug: string;
  image: string;
  meta: PageMeta;
  content: {
    title: LocaleContent;
    subtitle: LocaleContent;
    overview: LocaleContent[];
    procedures: CustomsProcedure[];
    requiredDocuments: RequiredDocument[];
    hsCodes: HSCodeEntry[];
    restrictions: LocaleContent;
    tokoSupport: LocaleContent;
    cta: CTABlock;
  };
}
