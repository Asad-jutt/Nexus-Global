import { defineType, defineField } from "sanity";

export const pricingTier = defineType({
  name: "pricingTier",
  title: "Pricing Tier",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      description: "e.g. $10,000, $50,000, Custom",
    }),
    defineField({
      name: "period",
      title: "Period",
      type: "string",
      description: "e.g. one-time engagement, / month (min 6 months)",
    }),
    defineField({
      name: "popular",
      title: "Popular (Most Requested)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "cta",
      title: "CTA Label",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "price" },
  },
});
