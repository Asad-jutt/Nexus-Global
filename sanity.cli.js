import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "c8o0bj6s";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: "nexus-global",
  deployment: {
    appId: "rwo3rfq6w34nlyeb4ddz4zlu",
  },
});
