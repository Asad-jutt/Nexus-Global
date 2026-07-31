/**
 * Seed the Sanity dataset with the current site content.
 *
 * Usage:
 *   $env:SANITY_AUTH_TOKEN = "<token>"
 *   node scripts/seed.mjs
 *
 * The script creates/updates singleton documents (siteSettings, hero,
 * navigation, contactSettings, sectionHeadings, aboutSection) and all
 * collection documents (service, caseStudy, teamMember, insight,
 * testimonial, processStep, stat, pricingTier, expertiseSector,
 * corePillar, footerOffice) using explicit stable `_id`s so it is
 * safe to re-run. Images/avatars are intentionally left out of the
 * dataset — they stay static in code.
 */
import { createClient } from '@sanity/client';
import {
  DEFAULT_HERO,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_SECTION_HEADINGS,
  DEFAULT_ABOUT,
  DEFAULT_STATS,
  DEFAULT_PROCESS_STEPS,
  DEFAULT_ARTICLES,
  DEFAULT_TESTIMONIALS,
  DEFAULT_TIERS,
  DEFAULT_CONTACT,
  DEFAULT_FOOTER_OFFICES,
  SERVICES_DATA,
  CASE_STUDIES,
  TEAM_MEMBERS,
  CORE_PILLARS,
} from '../src/data/siteContent.ts';
import { NAVIGATION_DATA } from '../src/components/Header/navigationData.ts';
import { EXPERTISE_DETAILS } from '../src/components/ui/ExpertiseModal.tsx';

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  console.error('Missing SANITY_AUTH_TOKEN env var.');
  process.exit(1);
}

const client = createClient({
  projectId: 'c8o0bj6s',
  dataset: 'production',
  apiVersion: '2025-08-15',
  useCdn: false,
  token,
});

let counter = 0;
function key() {
  return `k${counter++}${Math.random().toString(36).slice(2, 6)}`;
}

function toPortableText(paragraphs) {
  return (paragraphs ?? []).map((text) => ({
    _type: 'block',
    _key: key(),
    style: 'normal',
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
    markDefs: [],
  }));
}

const singletons = [
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: DEFAULT_SITE_SETTINGS.title,
    tagline: DEFAULT_SITE_SETTINGS.tagline,
    legalLine: DEFAULT_SITE_SETTINGS.legalLine,
    regulatoryNote: DEFAULT_SITE_SETTINGS.regulatoryNote,
    footerLinks: DEFAULT_SITE_SETTINGS.footerLinks,
  },
  {
    _id: 'hero',
    _type: 'hero',
    eyebrow: DEFAULT_HERO.eyebrow,
    headlineLine1: DEFAULT_HERO.headlineLine1,
    headlineHighlight: DEFAULT_HERO.headlineHighlight,
    headlineLine2: DEFAULT_HERO.headlineLine2,
    subheadline: DEFAULT_HERO.subheadline,
    primaryCta: DEFAULT_HERO.primaryCta,
    secondaryCta: DEFAULT_HERO.secondaryCta,
    scrollLabel: DEFAULT_HERO.scrollLabel,
    pulseLabel: DEFAULT_HERO.pulseLabel,
    shapeLabels: DEFAULT_HERO.shapeLabels,
  },
  {
    _id: 'navigation',
    _type: 'navigation',
    title: 'Main Navigation',
    items: NAVIGATION_DATA.map((item) => ({
      _type: 'navItem',
      _key: key(),
      label: item.label,
      href: item.href,
      hasDropdown: !!item.hasDropdown,
      dropdownType: item.dropdownType,
      singleDropdownItems: (item.singleDropdownItems ?? []).map((sd) => ({
        _type: 'navDropdownItem',
        _key: key(),
        label: sd.label,
        description: sd.description,
        href: sd.href,
        badge: sd.badge,
      })),
      multiColumnSections: (item.multiColumnSections ?? []).map((section) => ({
        _type: 'navMultiColumnSection',
        _key: key(),
        title: section.title,
        items: section.items.map((sd) => ({
          _type: 'navDropdownItem',
          _key: key(),
          label: sd.label,
          description: sd.description,
          href: sd.href,
          badge: sd.badge,
        })),
      })),
    })),
  },
  {
    _id: 'contactSettings',
    _type: 'contactSettings',
    sectionTag: DEFAULT_CONTACT.sectionTag,
    headline: `${DEFAULT_CONTACT.headlineLine1} ${DEFAULT_CONTACT.headlineLine2}`.trim(),
    intro: DEFAULT_CONTACT.intro,
    slaNote: DEFAULT_CONTACT.slaNote,
    ndaNote: DEFAULT_CONTACT.ndaNote,
    serviceOptions: DEFAULT_CONTACT.serviceOptions,
    fieldLabels: {
      _type: 'formFieldLabels',
      fullName: DEFAULT_CONTACT.fieldLabels.fullName,
      email: DEFAULT_CONTACT.fieldLabels.email,
      company: DEFAULT_CONTACT.fieldLabels.company,
      serviceVector: DEFAULT_CONTACT.fieldLabels.serviceVector,
      message: DEFAULT_CONTACT.fieldLabels.message,
    },
    placeholders: {
      _type: 'formPlaceholders',
      fullName: DEFAULT_CONTACT.placeholders.fullName,
      email: DEFAULT_CONTACT.placeholders.email,
      company: DEFAULT_CONTACT.placeholders.company,
      message: DEFAULT_CONTACT.placeholders.message,
    },
    submitButton: DEFAULT_CONTACT.submitButton,
    submittingLabel: DEFAULT_CONTACT.submittingLabel,
    successTitle: DEFAULT_CONTACT.successTitle,
    successMessage: DEFAULT_CONTACT.successMessage,
    additionalBriefLabel: DEFAULT_CONTACT.additionalBriefLabel,
  },
  {
    _id: 'sectionHeadings',
    _type: 'sectionHeadings',
    stats: { _type: 'sectionHeading', ...DEFAULT_SECTION_HEADINGS.stats },
    process: { _type: 'sectionHeading', ...DEFAULT_SECTION_HEADINGS.process },
    pricing: { _type: 'sectionHeading', ...DEFAULT_SECTION_HEADINGS.pricing },
    insights: { _type: 'sectionHeading', ...DEFAULT_SECTION_HEADINGS.insights },
    testimonials: { _type: 'sectionHeading', ...DEFAULT_SECTION_HEADINGS.testimonials },
    services: { _type: 'sectionHeading', ...DEFAULT_SECTION_HEADINGS.services },
    caseStudies: { _type: 'sectionHeading', ...DEFAULT_SECTION_HEADINGS.caseStudies },
    team: { _type: 'sectionHeading', ...DEFAULT_SECTION_HEADINGS.team },
    search: { _type: 'sectionHeading', ...DEFAULT_SECTION_HEADINGS.search },
  },
  {
    _id: 'aboutSection',
    _type: 'aboutSection',
    sectionTag: DEFAULT_ABOUT.sectionTag,
    headlineLine1: DEFAULT_ABOUT.headlineLine1,
    headlineHighlight: DEFAULT_ABOUT.headlineHighlight,
    intro: DEFAULT_ABOUT.intro,
    selectorTitle: DEFAULT_ABOUT.selectorTitle,
    selectorHint: DEFAULT_ABOUT.selectorHint,
    computeTitle: DEFAULT_ABOUT.computeTitle,
    computeSubtitle: DEFAULT_ABOUT.computeSubtitle,
    computeMetrics: DEFAULT_ABOUT.computeMetrics.map((m) => ({ _type: 'computeMetric', ...m })),
    sectors: DEFAULT_ABOUT.sectors.map((s) => ({ _type: 'sectorCard', ...s })),
  },
];

const services = SERVICES_DATA.map((s, i) => ({
  _id: `service-${s.id}`,
  _type: 'service',
  title: s.title,
  subtitle: s.subtitle,
  category: s.category,
  categories: s.categories ?? [s.category],
  description: s.description,
  keyOutcomes: s.keyOutcomes,
  metrics: s.metrics.map((m) => ({ _type: 'metric', ...m })),
  order: i,
}));

const caseStudies = CASE_STUDIES.map((c, i) => ({
  _id: `caseStudy-${c.id}`,
  _type: 'caseStudy',
  client: c.client,
  industry: c.industry,
  title: c.title,
  headlineStat: c.headlineStat,
  statLabel: c.statLabel,
  summary: c.summary,
  challenge: c.challenge,
  solution: c.solution,
  impactMetrics: c.impactMetrics.map((m) => ({ _type: 'metric', ...m })),
  dataPoints: c.dataPoints.map((p) => ({ _type: 'dataPoint3d', ...p })),
  order: i,
}));

const teamMembers = TEAM_MEMBERS.map((t, i) => ({
  _id: `teamMember-${t.id}`,
  _type: 'teamMember',
  name: t.name,
  role: t.role,
  specialization: t.specialization,
  location: t.location,
  bio: t.bio,
  highlights: t.highlights,
  order: i,
}));

const corePillars = CORE_PILLARS.map((p, i) => ({
  _id: `corePillar-${i + 1}`,
  _type: 'corePillar',
  code: p.code,
  title: p.title,
  description: p.description,
  order: i,
}));

const stats = DEFAULT_STATS.map((s, i) => ({
  _id: `stat-${s.id}`,
  _type: 'stat',
  label: s.label,
  description: s.description,
  value: s.value,
  prefix: s.prefix ?? '',
  suffix: s.suffix,
  decimals: s.decimals ?? 0,
  order: i,
}));

const processSteps = DEFAULT_PROCESS_STEPS.map((p, i) => ({
  _id: `processStep-${i + 1}`,
  _type: 'processStep',
  stepNumber: p.stepNumber,
  title: p.title,
  subtitle: p.subtitle,
  description: p.description,
  deliverables: p.deliverables,
  metrics: p.metrics,
  order: i,
}));

const insights = DEFAULT_ARTICLES.map((a, i) => ({
  _id: `insight-${a.id}`,
  _type: 'insight',
  title: a.title,
  category: a.category,
  readTime: a.readTime,
  date: a.date,
  summary: a.summary,
  author: {
    _type: 'author',
    name: a.author.name,
    role: a.author.role,
  },
  content: toPortableText(a.content),
  order: i,
}));

const testimonials = DEFAULT_TESTIMONIALS.map((t, i) => ({
  _id: `testimonial-${i + 1}`,
  _type: 'testimonial',
  quote: t.quote,
  author: t.author,
  title: t.title,
  company: t.company,
  rating: t.rating,
  impact: t.impact,
  order: i,
}));

const pricingTiers = DEFAULT_TIERS.map((t, i) => ({
  _id: `pricingTier-${t.id}`,
  _type: 'pricingTier',
  name: t.name,
  tagline: t.tagline,
  price: t.price,
  period: t.period,
  popular: !!t.popular,
  features: t.features,
  cta: t.cta,
  order: i,
}));

const expertiseSectors = Object.values(EXPERTISE_DETAILS).map((e, i) => ({
  _id: `expertiseSector-${e.id}`,
  _type: 'expertiseSector',
  key: e.id,
  title: e.title,
  category: e.category,
  subtitle: e.subtitle,
  overview: e.overview,
  keyOutcomes: e.keyOutcomes,
  metrics: e.metrics.map((m) => ({ _type: 'metric', ...m })),
  caseSnippet: e.caseSnippet,
  order: i,
}));

const footerOffices = DEFAULT_FOOTER_OFFICES.map((o, i) => ({
  _id: `footerOffice-${i + 1}`,
  _type: 'footerOffice',
  deskLabel: o.deskLabel,
  timezoneAbbr: o.timezoneAbbr,
  location: o.location,
  order: i,
}));

const allDocs = [
  ...singletons,
  ...services,
  ...caseStudies,
  ...teamMembers,
  ...corePillars,
  ...stats,
  ...processSteps,
  ...insights,
  ...testimonials,
  ...pricingTiers,
  ...expertiseSectors,
  ...footerOffices,
];

async function main() {
  console.log(`Seeding ${allDocs.length} documents...`);
  const transaction = client.transaction();
  for (const doc of allDocs) {
    transaction.createOrReplace(doc);
  }
  const result = await transaction.commit();
  console.log('Seed complete. Created/updated documents:', result.results.length);
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
