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
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            ...singletonTypes
              .keys()
              .map((type) =>
                S.documentListItem().id(type).schemaType(type).title(
                  {
                    siteSettings: "Site Settings",
                    hero: "Hero",
                    navigation: "Navigation",
                    contactSettings: "Contact Settings",
                    sectionHeadings: "Section Headings",
                  }[type]
                )
              ),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !singletonTypes.has(item.getId())),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
