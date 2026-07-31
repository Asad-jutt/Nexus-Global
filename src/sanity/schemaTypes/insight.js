import { defineType, defineField } from "sanity";

export const insight = defineType({
  name: "insight",
  title: "Insight / Article",
  type: "document",
  fields: [
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
      description: "e.g. AI & Engineering, Operations, Strategy & Security",
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: "e.g. 6 min read",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "string",
      description: "Display date, e.g. July 2026",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "author",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
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
