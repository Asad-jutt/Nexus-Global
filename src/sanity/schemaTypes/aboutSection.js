import { defineType, defineField } from "sanity";

export const computeMetric = defineType({
  name: "computeMetric",
  title: "Compute Metric",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "value", title: "Value", type: "number" }),
    defineField({ name: "prefix", title: "Prefix", type: "string" }),
    defineField({ name: "suffix", title: "Suffix", type: "string" }),
    defineField({ name: "decimals", title: "Decimals", type: "number" }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});

export const sectorCard = defineType({
  name: "sectorCard",
  title: "Sector Card",
  type: "object",
  fields: [
    defineField({ name: "key", title: "Key", type: "string" }),
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "desc", title: "Description", type: "string" }),
  ],
  preview: {
    select: { title: "label", subtitle: "key" },
  },
});

export const aboutSection = defineType({
  name: "aboutSection",
  title: "About Section",
  type: "document",
  fields: [
    defineField({
      name: "sectionTag",
      title: "Section Tag",
      type: "string",
      description: "e.g. Core Philosophy & System Mechanics",
    }),
    defineField({
      name: "headlineLine1",
      title: "Headline — Line 1",
      type: "string",
      description: "e.g. Conventional advisory diagnoses the past.",
    }),
    defineField({
      name: "headlineHighlight",
      title: "Headline — Highlight",
      type: "string",
      description: "e.g. We simulate the future.",
    }),
    defineField({
      name: "intro",
      title: "Intro Text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "selectorTitle",
      title: "Sector Selector Title",
      type: "string",
      description: "e.g. Specialized Industry & Capability Sectors",
    }),
    defineField({
      name: "selectorHint",
      title: "Sector Selector Hint",
      type: "string",
      description: "e.g. Select Sector for Deep Dossier",
    }),
    defineField({
      name: "computeTitle",
      title: "Compute Banner Title",
      type: "string",
      description: "e.g. Real-Time Compute Simulation Pipeline",
    }),
    defineField({
      name: "computeSubtitle",
      title: "Compute Banner Subtitle",
      type: "string",
    }),
    defineField({
      name: "computeMetrics",
      title: "Compute Banner Metrics",
      type: "array",
      of: [{ type: "computeMetric" }],
    }),
    defineField({
      name: "sectors",
      title: "Sector Cards",
      type: "array",
      of: [{ type: "sectorCard" }],
    }),
  ],
});
