import { defineType, defineField } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headlineStat",
      title: "Headline Stat",
      type: "string",
      description: "e.g. +340%",
    }),
    defineField({
      name: "statLabel",
      title: "Stat Label",
      type: "string",
      description: "e.g. Cumulative Asset Yield Increase",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "challenge",
      title: "Challenge",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "impactMetrics",
      title: "Impact Metrics",
      type: "array",
      of: [{ type: "metric" }],
    }),
    defineField({
      name: "dataPoints",
      title: "Data Points (3D Chart)",
      type: "array",
      of: [{ type: "dataPoint3d" }],
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "client" },
  },
});
