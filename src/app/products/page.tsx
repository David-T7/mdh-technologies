import type { Metadata } from "next";
import { Flagship, InsideProduct, PageHero } from "@/components/sections";
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
      <Flagship />
      <InsideProduct />
      <section aria-label="Coming next" className="py-24 md:py-32">
        <div className="wrap">
          <p className="display text-[2.2rem] italic text-muted md:text-[3.4rem]">{site.product.moreComing}</p>
        </div>
      </section>
    </>
  );
}
