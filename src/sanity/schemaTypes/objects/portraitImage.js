import { defineType, defineField } from "sanity";

export const portraitImage = defineType({
  name: "portraitImage",
  title: "Portrait Image",
  type: "image",
  description: "Static content image only (no decorative 3D/canvas graphics).",
  options: {
    hotspot: true,
    crop: true,
  },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Describe the image for accessibility and SEO.",
    }),
  ],
});
