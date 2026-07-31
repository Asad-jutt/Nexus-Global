import { defineType, defineField } from "sanity";

export const metric = defineType({
  name: "metric",
  title: "Metric",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
