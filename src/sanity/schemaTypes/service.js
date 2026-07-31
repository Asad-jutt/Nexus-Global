import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Filter Categories",
      type: "array",
      of: [{ type: "string" }],
      description: "All categories this service should appear under.",
    }),
    defineField({
      name: "description",
      title: "Description",
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
