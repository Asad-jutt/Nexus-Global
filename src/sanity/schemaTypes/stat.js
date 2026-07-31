import { defineType, defineField } from "sanity";

export const stat = defineType({
  name: "stat",
  title: "Statistic",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "prefix",
      title: "Prefix",
      type: "string",
      description: "e.g. $",
    }),
    defineField({
      name: "suffix",
      title: "Suffix",
      type: "string",
      description: "e.g. +, %, B+, Yrs",
    }),
    defineField({
      name: "decimals",
      title: "Decimals",
      type: "number",
      description: "Number of decimal places to display.",
      initialValue: 0,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
