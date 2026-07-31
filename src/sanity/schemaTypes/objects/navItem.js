import { defineType, defineField } from "sanity";

export const navItem = defineType({
  name: "navItem",
  title: "Navigation Item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link (anchor or URL)",
      type: "string",
    }),
    defineField({
      name: "hasDropdown",
      title: "Has dropdown",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "dropdownType",
      title: "Dropdown type",
      type: "string",
      options: {
        list: [
          { title: "Single column", value: "single" },
          { title: "Multi column", value: "multi" },
        ],
        layout: "radio",
      },
      hidden: ({ parent }) => !parent?.hasDropdown,
    }),
    defineField({
      name: "singleDropdownItems",
      title: "Single-column dropdown items",
      type: "array",
      of: [{ type: "navDropdownItem" }],
      hidden: ({ parent }) => !parent?.hasDropdown || parent?.dropdownType !== "single",
    }),
    defineField({
      name: "multiColumnSections",
      title: "Multi-column dropdown sections",
      type: "array",
      of: [{ type: "navMultiColumnSection" }],
      hidden: ({ parent }) => !parent?.hasDropdown || parent?.dropdownType !== "multi",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
