import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";

const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID || "c8o0bj6s";
const dataset = import.meta.env.SANITY_STUDIO_DATASET || "production";

const singletonTypes = new Set(["siteSettings", "hero", "navigation", "contactSettings", "sectionHeadings"]);

export default defineConfig({
  name: "default",
  title: "Nexus Global",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter((template) => !singletonTypes.has(template.templateId));
      }
      return prev;
    },
  },
});
