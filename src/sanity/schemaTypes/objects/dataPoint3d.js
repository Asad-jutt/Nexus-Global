import { defineType, defineField } from "sanity";

export const dataPoint3d = defineType({
  name: "dataPoint3d",
  title: "3D Data Point",
  type: "object",
  fields: [
    defineField({
      name: "year",
      title: "Period",
      type: "string",
      description: "Quarter, phase, or year label (e.g. Q1 2024, Phase 1, 2022).",
    }),
    defineField({
      name: "value",
      title: "Value (index)",
      type: "number",
      description: "Index value, e.g. 100 base.",
    }),
    defineField({
      name: "benchmark",
      title: "Benchmark",
      type: "number",
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "year" },
  },
});
