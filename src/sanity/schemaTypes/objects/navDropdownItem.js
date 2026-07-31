import { defineType, defineField } from "sanity";

export const navDropdownItem = defineType({
  name: "navDropdownItem",
  title: "Dropdown Item",
  type: "object",
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
      name: "href",
      title: "Link (anchor or URL)",
      type: "string",
    }),
    defineField({
      name: "badge",
      title: "Badge (optional)",
      type: "string",
      description: "e.g. Core, New, Live Data",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "description" },
  },
});
