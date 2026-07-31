import { defineType, defineField } from "sanity";

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Internal label for this navigation set.",
      initialValue: "Main Navigation",
    }),
    defineField({
      name: "items",
      title: "Navigation Items",
      type: "array",
      of: [{ type: "navItem" }],
    }),
  ],
});
