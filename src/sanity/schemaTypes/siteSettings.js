import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Company Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Shown next to the logo in the footer brand block.",
    }),
    defineField({
      name: "legalLine",
      title: "Legal Line",
      type: "string",
      description: "e.g. © {year} Nexus Global Management Consultancy LLC. All Rights Reserved.",
    }),
    defineField({
      name: "regulatoryNote",
      title: "Regulatory & Security Note",
      type: "string",
      description: "e.g. Post-Quantum Encrypted",
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Legal Links",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g. Privacy Notice, Security Audit",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "tagline" },
  },
});
