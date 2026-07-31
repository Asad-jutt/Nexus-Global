import { defineType, defineField } from "sanity";

export const expertiseSector = defineType({
  name: "expertiseSector",
  title: "Expertise Sector",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Key",
      type: "string",
      description: "Stable identifier for deep-linking (e.g. finance, cyber).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Industry Sector", value: "Industry Sector" },
          { title: "Core Capability", value: "Core Capability" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "keyOutcomes",
      title: "Key Outcomes",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [{ type: "metric" }],
    }),
    defineField({
      name: "caseSnippet",
      title: "Case Snippet",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
