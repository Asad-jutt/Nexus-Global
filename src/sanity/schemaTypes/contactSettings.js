import { defineType, defineField } from "sanity";

export const formFieldLabels = defineType({
  name: "formFieldLabels",
  title: "Form Field Labels",
  type: "object",
  fields: [
    defineField({ name: "fullName", title: "Full Name", type: "string" }),
    defineField({ name: "email", title: "Work Email", type: "string" }),
    defineField({ name: "company", title: "Enterprise / Organization", type: "string" }),
    defineField({ name: "serviceVector", title: "Service Vector", type: "string" }),
    defineField({ name: "message", title: "Strategic Objective / Executive Brief", type: "string" }),
  ],
});

export const formPlaceholders = defineType({
  name: "formPlaceholders",
  title: "Form Placeholders",
  type: "object",
  fields: [
    defineField({ name: "fullName", title: "Full Name", type: "string" }),
    defineField({ name: "email", title: "Work Email", type: "string" }),
    defineField({ name: "company", title: "Enterprise / Organization", type: "string" }),
    defineField({ name: "message", title: "Executive Brief", type: "string" }),
  ],
});

export const contactSettings = defineType({
  name: "contactSettings",
  title: "Contact Settings",
  type: "document",
  fields: [
    defineField({
      name: "sectionTag",
      title: "Section Tag",
      type: "string",
      description: "e.g. Strategic Engagement Pipeline",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "e.g. Initiate Transformation.",
    }),
    defineField({
      name: "intro",
      title: "Intro Text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "slaNote",
      title: "SLA Note",
      type: "string",
      description: "e.g. Response SLA: Within 4 Business Hours",
    }),
    defineField({
      name: "ndaNote",
      title: "NDA Note",
      type: "string",
      description: "e.g. NDA & Bilateral Confidentiality Enforced",
    }),
    defineField({
      name: "serviceOptions",
      title: "Service Vector Options",
      type: "array",
      of: [{ type: "string" }],
      description: "Dropdown options for the Service Vector field.",
    }),
    defineField({
      name: "fieldLabels",
      title: "Form Field Labels",
      type: "formFieldLabels",
    }),
    defineField({
      name: "placeholders",
      title: "Form Placeholders",
      type: "formPlaceholders",
    }),
    defineField({
      name: "submitButton",
      title: "Submit Button Label",
      type: "string",
      description: "e.g. Submit Strategic Brief",
    }),
    defineField({
      name: "submittingLabel",
      title: "Submitting Label",
      type: "string",
      description: "e.g. Transmitting Encrypted Brief...",
    }),
    defineField({
      name: "successTitle",
      title: "Success Title",
      type: "string",
      description: "e.g. Transmission Acknowledged",
    }),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "additionalBriefLabel",
      title: "Submit Additional Brief Label",
      type: "string",
    }),
  ],
});
