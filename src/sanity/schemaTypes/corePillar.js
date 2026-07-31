import { defineType, defineField } from "sanity";

export const corePillar = defineType({
  name: "corePillar",
  title: "Core Pillar",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Code",
      type: "string",
      description: "e.g. 01",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "code" },
  },
});
