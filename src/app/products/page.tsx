import type { Metadata } from "next";
import { Flagship, InsideProduct, PageHero } from "@/components/sections";
import { CtaBand, FactGrid, FaqList, FeatureGrid, Steps } from "@/components/blocks";
import { site } from "@/content/site";

const p = site.pages.products;

export const metadata: Metadata = {
  title: p.title,
  description: p.description,
  alternates: { canonical: "/products" },
  openGraph: { title: p.title, description: p.description, url: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero eyebrow={p.title} heading={p.heading} intro={p.intro} />
      <FactGrid block={p.glance} />
      <Flagship />
      <FeatureGrid block={p.audience} />
      <InsideProduct />
      <Steps block={p.start} />
      <FaqList block={p.faq} tone="surface" />
      <section aria-label="Coming next" className="py-20 md:py-28">
        <div className="wrap">
          <p className="display text-[2.2rem] italic text-muted md:text-[3.4rem]">{site.product.moreComing}</p>
        </div>
      </section>
      <CtaBand cta={p.cta} />
    </>
  );
}
