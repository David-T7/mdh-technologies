import { Button } from "@/components/Button";
import { site } from "@/content/site";

export default function NotFound() {
  const n = site.pages.notFound;
  return (
    <section className="band relative overflow-hidden">
      <div className="wrap relative flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center py-24">
        <p className="eyebrow">404</p>
        <h1 className="display mt-8 max-w-[14ch] text-[3.2rem] md:text-[6rem]">{n.heading}</h1>
        <p className="mt-8 max-w-[44ch] text-lg text-ink-muted">{n.body}</p>
        <div className="mt-12">
          <Button href="/">{n.cta}</Button>
        </div>
      </div>
    </section>
  );
}
