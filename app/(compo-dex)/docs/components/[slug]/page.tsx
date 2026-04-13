import { components } from "@/content/docs/components/components";
import {
  componentDocs,
  type ComponentDocSlug,
} from "@/content/docs/components/component-docs";
import { registry } from "@/content/docs/components/register";
import { DocsPage } from "@/components/docs";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const component = components.find((c) => c.slug === slug);
  const entry = registry[slug];
  const Doc = componentDocs[slug as ComponentDocSlug];

  if (!component || !entry || !entry.examples || !Doc) {
    notFound();
  }

  return (
    <DocsPage>
      <Doc />
    </DocsPage>
  );
}
