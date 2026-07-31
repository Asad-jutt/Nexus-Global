import { defineType, defineField } from "sanity";

export const sectionHeading = defineType({
  name: "sectionHeading",
  title: "Section Heading",
  type: "object",
  fields: [
    defineField({
      name: "tag",
      title: "Eyebrow Tag",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "intro",
      title: "Intro Text",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "tag" },
  },
});

export const sectionHeadings = defineType({
  name: "sectionHeadings",
  title: "Section Headings",
  type: "document",
  fields: [
    defineField({ name: "stats", title: "Stats Section", type: "sectionHeading" }),
    defineField({ name: "process", title: "Process Section", type: "sectionHeading" }),
    defineField({ name: "pricing", title: "Pricing Section", type: "sectionHeading" }),
    defineField({ name: "insights", title: "Insights Section", type: "sectionHeading" }),
    defineField({ name: "testimonials", title: "Testimonials Section", type: "sectionHeading" }),
    defineField({ name: "services", title: "Services Section", type: "sectionHeading" }),
    defineField({ name: "caseStudies", title: "Case Studies Section", type: "sectionHeading" }),
    defineField({ name: "team", title: "Team Section", type: "sectionHeading" }),
    defineField({ name: "search", title: "Search Modal", type: "sectionHeading" }),
  ],
});
