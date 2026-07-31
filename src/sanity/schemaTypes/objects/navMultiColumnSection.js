import { defineType, defineField } from "sanity";

export const navMultiColumnSection = defineType({
  name: "navMultiColumnSection",
  title: "Multi-Column Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Column Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "navDropdownItem" }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "items" },
  },
});
