import { defineType, defineField } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "portraitImage",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role" },
  },
});
