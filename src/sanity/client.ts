import { createClient, type SanityClient } from '@sanity/client';
import type {
  HeroContent,
  SectionHeadingsContent,
  AboutContent,
  StatItemContent,
  ProcessStepContent,
  ArticleContent,
  TestimonialContent,
  TierContent,
  ContactSettingsContent,
  SiteSettingsContent,
  FooterOfficeContent,
  CorePillarContent,
  ServiceItem,
  CaseStudy,
  TeamMember,
} from '../types';
import type { NavItemData, SingleDropdownItem } from '../components/Header/navigationData';
import type { ExpertiseDetail } from '../components/ui/ExpertiseModal';
import { DEFAULT_CONTENT } from '../data/siteContent';
import type { ContentBundle } from '../data/siteContent';

const projectId = import.meta.env?.PUBLIC_SANITY_PROJECT_ID || 'c8o0bj6s';
const dataset = import.meta.env?.PUBLIC_SANITY_DATASET || 'production';

export const sanityClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2025-08-15',
  useCdn: true,
});

export type SanityRawDoc = Record<string, unknown>;

export function blockToPlainText(blocks: unknown[] | undefined): string[] {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .filter((b) => b && typeof b === 'object' && (b as { _type?: string })._type === 'block')
    .map((b) => {
      const block = b as { children?: { _type?: string; text?: string }[] };
      if (!Array.isArray(block.children)) return '';
      return block.children
        .filter((c) => c && c._type === 'span' && typeof c.text === 'string')
        .map((c) => c.text)
        .join('');
    })
    .filter((t) => t.trim().length > 0);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface RawHero {
  eyebrow?: string;
  headlineLine1?: string;
  headlineHighlight?: string;
  headlineLine2?: string;
  subheadline?: string;
  primaryCta?: string;
  secondaryCta?: string;
  scrollLabel?: string;
  pulseLabel?: string;
  shapeLabels?: string[];
}

export function mapHero(doc: RawHero | null): HeroContent {
  const d = DEFAULT_CONTENT.hero;
  if (!doc) return d;
  return {
    eyebrow: doc.eyebrow ?? d.eyebrow,
    headlineLine1: doc.headlineLine1 ?? d.headlineLine1,
    headlineHighlight: doc.headlineHighlight ?? d.headlineHighlight,
    headlineLine2: doc.headlineLine2 ?? d.headlineLine2,
    subheadline: doc.subheadline ?? d.subheadline,
    primaryCta: doc.primaryCta ?? d.primaryCta,
    secondaryCta: doc.secondaryCta ?? d.secondaryCta,
    scrollLabel: doc.scrollLabel ?? d.scrollLabel,
    pulseLabel: doc.pulseLabel ?? d.pulseLabel,
    shapeLabels:
      Array.isArray(doc.shapeLabels) && doc.shapeLabels.length === 2
        ? doc.shapeLabels
        : d.shapeLabels,
  };
}

interface RawSectionHeading {
  tag?: string;
  title?: string;
  intro?: string;
}

function mapSectionHeading(doc: RawSectionHeading | undefined, fallback: { tag: string; title: string; intro: string }) {
  if (!doc) return fallback;
  return {
    tag: doc.tag ?? fallback.tag,
    title: doc.title ?? fallback.title,
    intro: doc.intro ?? fallback.intro,
  };
}

export function mapSectionHeadings(doc: Record<string, RawSectionHeading> | null): SectionHeadingsContent {
  const d = DEFAULT_CONTENT.sectionHeadings;
  if (!doc) return d;
  return {
    stats: mapSectionHeading(doc.stats, d.stats),
    process: mapSectionHeading(doc.process, d.process),
    pricing: mapSectionHeading(doc.pricing, d.pricing),
    insights: mapSectionHeading(doc.insights, d.insights),
    testimonials: mapSectionHeading(doc.testimonials, d.testimonials),
    services: mapSectionHeading(doc.services, d.services),
    caseStudies: mapSectionHeading(doc.caseStudies, d.caseStudies),
    team: mapSectionHeading(doc.team, d.team),
    search: mapSectionHeading(doc.search, d.search),
  };
}

interface RawComputeMetric {
  label?: string;
  value?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

interface RawSectorCard {
  key?: string;
  label?: string;
  desc?: string;
}

interface RawAbout {
  sectionTag?: string;
  headlineLine1?: string;
  headlineHighlight?: string;
  intro?: string;
  selectorTitle?: string;
  selectorHint?: string;
  computeTitle?: string;
  computeSubtitle?: string;
  computeMetrics?: RawComputeMetric[];
  sectors?: RawSectorCard[];
}

export function mapAbout(doc: RawAbout | null): AboutContent {
  const d = DEFAULT_CONTENT.about;
  if (!doc) return d;
  return {
    sectionTag: doc.sectionTag ?? d.sectionTag,
    headlineLine1: doc.headlineLine1 ?? d.headlineLine1,
    headlineHighlight: doc.headlineHighlight ?? d.headlineHighlight,
    intro: doc.intro ?? d.intro,
    selectorTitle: doc.selectorTitle ?? d.selectorTitle,
    selectorHint: doc.selectorHint ?? d.selectorHint,
    computeTitle: doc.computeTitle ?? d.computeTitle,
    computeSubtitle: doc.computeSubtitle ?? d.computeSubtitle,
    computeMetrics:
      Array.isArray(doc.computeMetrics) && doc.computeMetrics.length > 0
        ? doc.computeMetrics.map((m, i) => ({
            label: m.label ?? d.computeMetrics[i]?.label ?? '',
            value: m.value ?? d.computeMetrics[i]?.value ?? 0,
            prefix: m.prefix ?? d.computeMetrics[i]?.prefix,
            suffix: m.suffix ?? d.computeMetrics[i]?.suffix,
            decimals: m.decimals ?? d.computeMetrics[i]?.decimals,
          }))
        : d.computeMetrics,
    sectors:
      Array.isArray(doc.sectors) && doc.sectors.length > 0
        ? doc.sectors.map((s) => ({
            key: s.key ?? '',
            label: s.label ?? '',
            desc: s.desc ?? '',
          }))
        : d.sectors,
  };
}

interface RawMetric {
  label?: string;
  value?: string;
}

function mapMetrics(metrics: RawMetric[] | undefined): { label: string; value: string }[] {
  if (!Array.isArray(metrics)) return [];
  return metrics
    .filter((m) => m && typeof m === 'object')
    .map((m) => ({ label: m.label ?? '', value: m.value ?? '' }))
    .filter((m) => m.label || m.value);
}

interface RawDataPoint3d {
  year?: string;
  value?: number;
  benchmark?: number;
  label?: string;
  category?: string;
}

function mapDataPoints(points: RawDataPoint3d[] | undefined) {
  if (!Array.isArray(points)) return [];
  return points
    .filter((p) => p && typeof p === 'object')
    .map((p) => ({
      year: p.year ?? '',
      value: p.value ?? 0,
      benchmark: p.benchmark ?? 0,
      label: p.label ?? '',
      category: p.category ?? '',
    }));
}

interface RawService {
  title?: string;
  subtitle?: string;
  category?: string;
  categories?: string[];
  description?: string;
  keyOutcomes?: string[];
  metrics?: RawMetric[];
  order?: number;
}

export function mapServices(docs: RawService[] | null): ServiceItem[] {
  const d = DEFAULT_CONTENT.services;
  if (!Array.isArray(docs) || docs.length === 0) return d;
  const sorted = docs.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return sorted.map((doc, i) => {
    const fallback = d[i];
    const id = fallback?.id ?? slugify(doc.title ?? `service-${i}`);
    return {
      id,
      title: doc.title ?? fallback?.title ?? '',
      subtitle: doc.subtitle ?? fallback?.subtitle ?? '',
      category: doc.category ?? fallback?.category ?? '',
      categories: doc.categories && doc.categories.length > 0 ? doc.categories : fallback?.categories,
      description: doc.description ?? fallback?.description ?? '',
      keyOutcomes: doc.keyOutcomes && doc.keyOutcomes.length > 0 ? doc.keyOutcomes : fallback?.keyOutcomes ?? [],
      shapePreset: fallback?.shapePreset ?? 'cube',
      color: fallback?.color ?? 'from-cyan-500 to-blue-600',
      accentHex: fallback?.accentHex ?? '#00f0ff',
      metrics: mapMetrics(doc.metrics).length > 0 ? mapMetrics(doc.metrics) : fallback?.metrics ?? [],
    };
  });
}

interface RawCaseStudy {
  client?: string;
  industry?: string;
  title?: string;
  headlineStat?: string;
  statLabel?: string;
  summary?: string;
  challenge?: string;
  solution?: string;
  impactMetrics?: RawMetric[];
  dataPoints?: RawDataPoint3d[];
  order?: number;
}

export function mapCaseStudies(docs: RawCaseStudy[] | null): CaseStudy[] {
  const d = DEFAULT_CONTENT.caseStudies;
  if (!Array.isArray(docs) || docs.length === 0) return d;
  const sorted = docs.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return sorted.map((doc, i) => {
    const fallback = d[i];
    const id = fallback?.id ?? slugify(doc.title ?? doc.client ?? `case-${i}`);
    return {
      id,
      client: doc.client ?? fallback?.client ?? '',
      industry: doc.industry ?? fallback?.industry ?? '',
      title: doc.title ?? fallback?.title ?? '',
      headlineStat: doc.headlineStat ?? fallback?.headlineStat ?? '',
      statLabel: doc.statLabel ?? fallback?.statLabel ?? '',
      summary: doc.summary ?? fallback?.summary ?? '',
      challenge: doc.challenge ?? fallback?.challenge ?? '',
      solution: doc.solution ?? fallback?.solution ?? '',
      impactMetrics:
        mapMetrics(doc.impactMetrics).length > 0 ? mapMetrics(doc.impactMetrics) : fallback?.impactMetrics ?? [],
      dataPoints:
        mapDataPoints(doc.dataPoints).length > 0 ? mapDataPoints(doc.dataPoints) : fallback?.dataPoints ?? [],
      primaryColor: fallback?.primaryColor ?? '#00f0ff',
    };
  });
}

interface RawTeamMember {
  name?: string;
  role?: string;
  specialization?: string;
  location?: string;
  bio?: string;
  highlights?: string[];
  order?: number;
}

export function mapTeamMembers(docs: RawTeamMember[] | null): TeamMember[] {
  const d = DEFAULT_CONTENT.team;
  if (!Array.isArray(docs) || docs.length === 0) return d;
  const sorted = docs.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return sorted.map((doc, i) => {
    const fallback = d[i];
    const id = fallback?.id ?? slugify(doc.name ?? `member-${i}`);
    return {
      id,
      name: doc.name ?? fallback?.name ?? '',
      role: doc.role ?? fallback?.role ?? '',
      specialization: doc.specialization ?? fallback?.specialization ?? '',
      location: doc.location ?? fallback?.location ?? '',
      bio: doc.bio ?? fallback?.bio ?? '',
      highlights:
        doc.highlights && doc.highlights.length > 0 ? doc.highlights : fallback?.highlights ?? [],
      avatarGradient: fallback?.avatarGradient ?? 'from-cyan-500 via-blue-600 to-purple-700',
      shape: fallback?.shape ?? 'cube',
    };
  });
}

interface RawExpertise {
  key?: string;
  title?: string;
  category?: 'Industry Sector' | 'Core Capability';
  subtitle?: string;
  overview?: string;
  keyOutcomes?: string[];
  metrics?: RawMetric[];
  caseSnippet?: string;
  order?: number;
}

export function mapExpertise(docs: RawExpertise[] | null): Record<string, ExpertiseDetail> {
  const d = DEFAULT_CONTENT.expertise;
  if (!Array.isArray(docs) || docs.length === 0) return d;
  const sorted = docs.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const result: Record<string, ExpertiseDetail> = {};
  sorted.forEach((doc) => {
    const key = doc.key ?? '';
    if (!key) return;
    const fallback = d[key];
    result[key] = {
      id: key,
      title: doc.title ?? fallback?.title ?? '',
      category: doc.category ?? fallback?.category ?? 'Industry Sector',
      subtitle: doc.subtitle ?? fallback?.subtitle ?? '',
      overview: doc.overview ?? fallback?.overview ?? '',
      keyOutcomes:
        doc.keyOutcomes && doc.keyOutcomes.length > 0 ? doc.keyOutcomes : fallback?.keyOutcomes ?? [],
      metrics: mapMetrics(doc.metrics).length > 0 ? mapMetrics(doc.metrics) : fallback?.metrics ?? [],
      caseSnippet: doc.caseSnippet ?? fallback?.caseSnippet ?? '',
    };
  });
  return Object.keys(result).length > 0 ? result : d;
}

interface RawCorePillar {
  code?: string;
  title?: string;
  description?: string;
  order?: number;
}

export function mapCorePillars(docs: RawCorePillar[] | null): CorePillarContent[] {
  const d = DEFAULT_CONTENT.corePillars;
  if (!Array.isArray(docs) || docs.length === 0) return d;
  const sorted = docs.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return sorted.map((doc) => ({
    code: doc.code ?? '',
    title: doc.title ?? '',
    description: doc.description ?? '',
  }));
}

interface RawStat {
  label?: string;
  description?: string;
  value?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  order?: number;
}

export function mapStats(docs: RawStat[] | null): StatItemContent[] {
  const d = DEFAULT_CONTENT.stats;
  if (!Array.isArray(docs) || docs.length === 0) return d;
  const sorted = docs.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return sorted.map((doc, i) => {
    const fallback = d[i];
    return {
      id: fallback?.id ?? `stat-${i}`,
      value: doc.value ?? fallback?.value ?? 0,
      prefix: doc.prefix ?? fallback?.prefix,
      suffix: doc.suffix ?? fallback?.suffix ?? '',
      label: doc.label ?? fallback?.label ?? '',
      description: doc.description ?? fallback?.description ?? '',
      accentColor: fallback?.accentColor ?? '#00f0ff',
      shape: fallback?.shape ?? 'torus',
      decimals: doc.decimals ?? fallback?.decimals,
      iconKey: fallback?.iconKey ?? 'ShieldCheck',
    };
  });
}

interface RawProcessStep {
  stepNumber?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  deliverables?: string[];
  metrics?: string;
  order?: number;
}

export function mapProcessSteps(docs: RawProcessStep[] | null): ProcessStepContent[] {
  const d = DEFAULT_CONTENT.processSteps;
  if (!Array.isArray(docs) || docs.length === 0) return d;
  const sorted = docs.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return sorted.map((doc, i) => {
    const fallback = d[i];
    return {
      stepNumber: doc.stepNumber ?? fallback?.stepNumber ?? String(i + 1).padStart(2, '0'),
      title: doc.title ?? fallback?.title ?? '',
      subtitle: doc.subtitle ?? fallback?.subtitle ?? '',
      description: doc.description ?? fallback?.description ?? '',
      deliverables:
        doc.deliverables && doc.deliverables.length > 0 ? doc.deliverables : fallback?.deliverables ?? [],
      metrics: doc.metrics ?? fallback?.metrics ?? '',
      accentColor: fallback?.accentColor ?? '#00f0ff',
    };
  });
}

interface RawAuthor {
  name?: string;
  role?: string;
}

interface RawInsight {
  title?: string;
  category?: string;
  readTime?: string;
  date?: string;
  summary?: string;
  author?: RawAuthor;
  content?: unknown[];
  order?: number;
}

export function mapArticles(docs: RawInsight[] | null): ArticleContent[] {
  const d = DEFAULT_CONTENT.articles;
  if (!Array.isArray(docs) || docs.length === 0) return d;
  const sorted = docs.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return sorted.map((doc, i) => {
    const fallback = d[i];
    const id = fallback?.id ?? slugify(doc.title ?? `article-${i}`);
    return {
      id,
      title: doc.title ?? fallback?.title ?? '',
      category: doc.category ?? fallback?.category ?? '',
      readTime: doc.readTime ?? fallback?.readTime ?? '',
      date: doc.date ?? fallback?.date ?? '',
      summary: doc.summary ?? fallback?.summary ?? '',
      author: {
        name: doc.author?.name ?? fallback?.author.name ?? '',
        role: doc.author?.role ?? fallback?.author.role ?? '',
        avatar: fallback?.author.avatar ?? '',
      },
      content: blockToPlainText(doc.content).length > 0 ? blockToPlainText(doc.content) : fallback?.content ?? [],
    };
  });
}

interface RawTestimonial {
  quote?: string;
  author?: string;
  title?: string;
  company?: string;
  rating?: number;
  impact?: string;
  order?: number;
}

export function mapTestimonials(docs: RawTestimonial[] | null): TestimonialContent[] {
  const d = DEFAULT_CONTENT.testimonials;
  if (!Array.isArray(docs) || docs.length === 0) return d;
  const sorted = docs.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return sorted.map((doc, i) => {
    const fallback = d[i];
    return {
      id: fallback?.id ?? `testimonial-${i}`,
      quote: doc.quote ?? fallback?.quote ?? '',
      author: doc.author ?? fallback?.author ?? '',
      title: doc.title ?? fallback?.title ?? '',
      company: doc.company ?? fallback?.company ?? '',
      rating: doc.rating ?? fallback?.rating ?? 5,
      impact: doc.impact ?? fallback?.impact ?? '',
      avatar: fallback?.avatar ?? '',
      accentColor: fallback?.accentColor ?? '#00f0ff',
    };
  });
}

interface RawTier {
  name?: string;
  tagline?: string;
  price?: string;
  period?: string;
  popular?: boolean;
  features?: string[];
  cta?: string;
  order?: number;
}

export function mapTiers(docs: RawTier[] | null): TierContent[] {
  const d = DEFAULT_CONTENT.tiers;
  if (!Array.isArray(docs) || docs.length === 0) return d;
  const sorted = docs.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return sorted.map((doc, i) => {
    const fallback = d[i];
    return {
      id: fallback?.id ?? `tier-${i}`,
      name: doc.name ?? fallback?.name ?? '',
      tagline: doc.tagline ?? fallback?.tagline ?? '',
      price: doc.price ?? fallback?.price ?? '',
      period: doc.period ?? fallback?.period ?? '',
      popular: doc.popular ?? fallback?.popular,
      accentColor: fallback?.accentColor ?? '#00f0ff',
      features:
        doc.features && doc.features.length > 0 ? doc.features : fallback?.features ?? [],
      cta: doc.cta ?? fallback?.cta ?? '',
    };
  });
}

interface RawFooterOffice {
  deskLabel?: string;
  timezoneAbbr?: string;
  location?: string;
  order?: number;
}

export function mapFooterOffices(docs: RawFooterOffice[] | null): FooterOfficeContent[] {
  const d = DEFAULT_CONTENT.footerOffices;
  if (!Array.isArray(docs) || docs.length === 0) return d;
  const sorted = docs.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return sorted.map((doc) => ({
    deskLabel: doc.deskLabel ?? '',
    timezoneAbbr: doc.timezoneAbbr ?? '',
    location: doc.location ?? '',
  }));
}

interface RawContactSettings {
  sectionTag?: string;
  headline?: string;
  intro?: string;
  slaNote?: string;
  ndaNote?: string;
  serviceOptions?: string[];
  fieldLabels?: { fullName?: string; email?: string; company?: string; serviceVector?: string; message?: string };
  placeholders?: { fullName?: string; email?: string; company?: string; message?: string };
  submitButton?: string;
  submittingLabel?: string;
  successTitle?: string;
  successMessage?: string;
  additionalBriefLabel?: string;
}

function splitHeadline(headline: string | undefined, fallback1: string, fallback2: string): { line1: string; line2: string } {
  if (!headline || !headline.trim()) return { line1: fallback1, line2: fallback2 };
  const parts = headline.split(' ').filter(Boolean);
  if (parts.length <= 1) return { line1: '', line2: headline.trim() };
  const line2 = parts.pop() as string;
  return { line1: parts.join(' '), line2 };
}

export function mapContactSettings(doc: RawContactSettings | null): ContactSettingsContent {
  const d = DEFAULT_CONTENT.contact;
  if (!doc) return d;
  const headline = splitHeadline(doc.headline, d.headlineLine1, d.headlineLine2);
  return {
    sectionTag: doc.sectionTag ?? d.sectionTag,
    headlineLine1: headline.line1 || d.headlineLine1,
    headlineLine2: headline.line2 || d.headlineLine2,
    intro: doc.intro ?? d.intro,
    slaNote: doc.slaNote ?? d.slaNote,
    ndaNote: doc.ndaNote ?? d.ndaNote,
    serviceOptions:
      doc.serviceOptions && doc.serviceOptions.length > 0 ? doc.serviceOptions : d.serviceOptions,
    fieldLabels: {
      fullName: doc.fieldLabels?.fullName ?? d.fieldLabels.fullName,
      email: doc.fieldLabels?.email ?? d.fieldLabels.email,
      company: doc.fieldLabels?.company ?? d.fieldLabels.company,
      serviceVector: doc.fieldLabels?.serviceVector ?? d.fieldLabels.serviceVector,
      message: doc.fieldLabels?.message ?? d.fieldLabels.message,
    },
    placeholders: {
      fullName: doc.placeholders?.fullName ?? d.placeholders.fullName,
      email: doc.placeholders?.email ?? d.placeholders.email,
      company: doc.placeholders?.company ?? d.placeholders.company,
      message: doc.placeholders?.message ?? d.placeholders.message,
    },
    submitButton: doc.submitButton ?? d.submitButton,
    submittingLabel: doc.submittingLabel ?? d.submittingLabel,
    successTitle: doc.successTitle ?? d.successTitle,
    successMessage: doc.successMessage ?? d.successMessage,
    additionalBriefLabel: doc.additionalBriefLabel ?? d.additionalBriefLabel,
  };
}

interface RawSiteSettings {
  title?: string;
  tagline?: string;
  legalLine?: string;
  regulatoryNote?: string;
  footerLinks?: string[];
}

export function mapSiteSettings(doc: RawSiteSettings | null): SiteSettingsContent {
  const d = DEFAULT_CONTENT.siteSettings;
  if (!doc) return d;
  return {
    title: doc.title ?? d.title,
    tagline: doc.tagline ?? d.tagline,
    legalLine: doc.legalLine ?? d.legalLine,
    regulatoryNote: doc.regulatoryNote ?? d.regulatoryNote,
    footerLinks: doc.footerLinks && doc.footerLinks.length > 0 ? doc.footerLinks : d.footerLinks,
  };
}

interface RawNavDropdownItem {
  label?: string;
  description?: string;
  href?: string;
  badge?: string;
}

interface RawNavMultiColumnSection {
  title?: string;
  items?: RawNavDropdownItem[];
}

interface RawNavItem {
  label?: string;
  href?: string;
  hasDropdown?: boolean;
  dropdownType?: 'single' | 'multi';
  singleDropdownItems?: RawNavDropdownItem[];
  multiColumnSections?: RawNavMultiColumnSection[];
}

function findDefaultIcon(
  cmsLabel: string,
  fallbackItems: SingleDropdownItem[] | undefined
): SingleDropdownItem['icon'] {
  const match = fallbackItems?.find((f) => f.label === cmsLabel);
  return match?.icon;
}

export function mapNavigation(doc: { items?: RawNavItem[] } | null): NavItemData[] {
  const d = DEFAULT_CONTENT.navigation;
  if (!doc || !Array.isArray(doc.items) || doc.items.length === 0) return d;
  return doc.items.map((item) => {
    const fallback = d.find((n) => n.label === item.label);
    return {
      label: item.label ?? fallback?.label ?? '',
      href: item.href ?? fallback?.href ?? '#',
      hasDropdown: item.hasDropdown ?? fallback?.hasDropdown ?? false,
      dropdownType: item.dropdownType ?? fallback?.dropdownType,
      singleDropdownItems:
        item.singleDropdownItems && item.singleDropdownItems.length > 0
          ? item.singleDropdownItems.map((sd) => ({
              icon:
                findDefaultIcon(sd.label ?? '', fallback?.singleDropdownItems) ??
                fallback?.singleDropdownItems?.[0]?.icon,
              label: sd.label ?? '',
              description: sd.description ?? '',
              href: sd.href ?? '#',
              badge: sd.badge,
            }))
          : fallback?.singleDropdownItems,
      multiColumnSections:
        item.multiColumnSections && item.multiColumnSections.length > 0
          ? item.multiColumnSections.map((section, sIdx) => ({
              title: section.title ?? '',
              items: (section.items ?? []).map((sd) => ({
                icon:
                  findDefaultIcon(
                    sd.label ?? '',
                    fallback?.multiColumnSections?.[sIdx]?.items
                  ) ?? fallback?.multiColumnSections?.[sIdx]?.items?.[0]?.icon,
                label: sd.label ?? '',
                description: sd.description ?? '',
                href: sd.href ?? '#',
                badge: sd.badge,
              })),
            }))
          : fallback?.multiColumnSections,
    };
  });
}

async function safeFetch<T>(fetcher: () => Promise<T>, fallback: T): Promise<T> {
  try {
    const result = await fetcher();
    return result ?? fallback;
  } catch (err) {
    if (import.meta.env?.DEV) {
      console.warn('[sanity] fetch failed, using default content:', err);
    }
    return fallback;
  }
}

export async function getSiteContent(): Promise<ContentBundle> {
  const [hero, siteSettings, sectionHeadings, about, navigation, services, caseStudies, team, expertise, corePillars, stats, processSteps, articles, testimonials, tiers, contact, footerOffices] =
    await Promise.all([
      safeFetch(() => sanityClient.fetch('*[_type == "hero"][0]').then(mapHero), DEFAULT_CONTENT.hero),
      safeFetch(() => sanityClient.fetch('*[_type == "siteSettings"][0]').then(mapSiteSettings), DEFAULT_CONTENT.siteSettings),
      safeFetch(() => sanityClient.fetch('*[_type == "sectionHeadings"][0]').then(mapSectionHeadings), DEFAULT_CONTENT.sectionHeadings),
      safeFetch(() => sanityClient.fetch('*[_type == "aboutSection"][0]').then(mapAbout), DEFAULT_CONTENT.about),
      safeFetch(() => sanityClient.fetch('*[_type == "navigation"][0]').then(mapNavigation), DEFAULT_CONTENT.navigation),
      safeFetch(() => sanityClient.fetch('*[_type == "service"] | order(order asc)').then(mapServices), DEFAULT_CONTENT.services),
      safeFetch(() => sanityClient.fetch('*[_type == "caseStudy"] | order(order asc)').then(mapCaseStudies), DEFAULT_CONTENT.caseStudies),
      safeFetch(() => sanityClient.fetch('*[_type == "teamMember"] | order(order asc)').then(mapTeamMembers), DEFAULT_CONTENT.team),
      safeFetch(() => sanityClient.fetch('*[_type == "expertiseSector"] | order(order asc)').then(mapExpertise), DEFAULT_CONTENT.expertise),
      safeFetch(() => sanityClient.fetch('*[_type == "corePillar"] | order(order asc)').then(mapCorePillars), DEFAULT_CONTENT.corePillars),
      safeFetch(() => sanityClient.fetch('*[_type == "stat"] | order(order asc)').then(mapStats), DEFAULT_CONTENT.stats),
      safeFetch(() => sanityClient.fetch('*[_type == "processStep"] | order(order asc)').then(mapProcessSteps), DEFAULT_CONTENT.processSteps),
      safeFetch(() => sanityClient.fetch('*[_type == "insight"] | order(order asc)').then(mapArticles), DEFAULT_CONTENT.articles),
      safeFetch(() => sanityClient.fetch('*[_type == "testimonial"] | order(order asc)').then(mapTestimonials), DEFAULT_CONTENT.testimonials),
      safeFetch(() => sanityClient.fetch('*[_type == "pricingTier"] | order(order asc)').then(mapTiers), DEFAULT_CONTENT.tiers),
      safeFetch(() => sanityClient.fetch('*[_type == "contactSettings"][0]').then(mapContactSettings), DEFAULT_CONTENT.contact),
      safeFetch(() => sanityClient.fetch('*[_type == "footerOffice"] | order(order asc)').then(mapFooterOffices), DEFAULT_CONTENT.footerOffices),
    ]);

  return {
    hero,
    siteSettings,
    sectionHeadings,
    about,
    navigation,
    services,
    caseStudies,
    team,
    expertise,
    corePillars,
    stats,
    processSteps,
    articles,
    testimonials,
    tiers,
    contact,
    footerOffices,
  };
}
