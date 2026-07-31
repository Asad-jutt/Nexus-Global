import { defineType, defineField } from "sanity";

export const footerOffice = defineType({
  name: "footerOffice",
  title: "Footer Office",
  type: "document",
  fields: [
    defineField({
      name: "deskLabel",
      title: "Desk Label",
      type: "string",
      description: "e.g. London Desk",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "timezoneAbbr",
      title: "Timezone Abbreviation",
      type: "string",
      description: "e.g. GMT, EST, JST, SGT",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g. Mayfair HQ, Hudson Yards",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    }),
  ],
  preview: {
    select: { title: "deskLabel", subtitle: "location" },
  },
});
