import { defineType, defineField } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow Tag",
      type: "string",
      description: "e.g. Strategic Management & Digital Transformation",
    }),
    defineField({
      name: "headlineLine1",
      title: "Headline — Line 1",
      type: "string",
      description: "e.g. Architecting",
    }),
    defineField({
      name: "headlineHighlight",
      title: "Headline — Highlight",
      type: "string",
      description: "Highlighted word(s), e.g. Exponential",
    }),
    defineField({
      name: "headlineLine2",
      title: "Headline — Line 2",
      type: "string",
      description: "e.g. Growth.",
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA Label",
      type: "string",
      description: "e.g. Initiate Engagement",
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA Label",
      type: "string",
      description: "e.g. Explore Capabilities",
    }),
    defineField({
      name: "scrollLabel",
      title: "Scroll Hint Label",
      type: "string",
      description: "e.g. Scroll for Philosophy",
    }),
    defineField({
      name: "pulseLabel",
      title: "3D Pulse Trigger Label",
      type: "string",
      description: "e.g. Pulse 3D Model",
    }),
    defineField({
      name: "shapeLabels",
      title: "3D Shape Labels",
      type: "array",
      of: [{ type: "string" }],
      description: "Labels for the geometry morph control, e.g. Liquid Matrix, Fluid Flow.",
    }),
  ],
});
