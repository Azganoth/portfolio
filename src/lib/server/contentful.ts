import {
  CONTENTFUL_DELIVERY_TOKEN,
  CONTENTFUL_PREVIEW_TOKEN,
  CONTENTFUL_SPACE_ID,
} from "$env/static/private";
import type { Tech } from "$lib/constants";
import {
  createClient,
  type EntryFieldTypes,
  type EntrySkeletonType,
} from "contentful";

interface ProjectEntryFields {
  name: EntryFieldTypes.Symbol;
  title: EntryFieldTypes.Symbol;
  summary: EntryFieldTypes.Text;
  description: EntryFieldTypes.RichText;
  website: EntryFieldTypes.Symbol;
  repository: EntryFieldTypes.Symbol;
  technologies?: EntryFieldTypes.Array<EntryFieldTypes.Symbol<Tech>>;
  previews: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

export type ProjectEntry = EntrySkeletonType<ProjectEntryFields, "project">;

interface PortfolioProjectsFields {
  name: EntryFieldTypes.Symbol;
  items: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<ProjectEntry>>;
}

export type PortfolioProjectsEntry = EntrySkeletonType<
  PortfolioProjectsFields,
  "portfolioProjects"
>;

export const contentfulClient = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? CONTENTFUL_PREVIEW_TOKEN
    : CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});
