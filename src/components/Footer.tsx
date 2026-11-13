import Link from "next/link";
import { Logo } from "./Logo";
import { company, site } from "@/content/site";

export function Footer() {
  const year = company.copyrightYear;

  return (
    <footer className="ink">
      <div className="wrap grid gap-12 pb-10 pt-16 md:grid-cols-12 md:pt-24">
        <div className="md:col-span-5">
          <Logo size="lg" />
          <p className="mt-6 max-w-[34ch] text-ink-muted">
            An Ethiopian technology company. Built in Addis Ababa.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-[1fr_1fr_1.5fr]">
          <div>
            <h2 className="eyebrow">{site.footer.navHeading}</h2>
            <ul className="mt-5 space-y-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="u-link inline-block py-1.5">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow">{site.footer.productHeading}</h2>
            <p className="mt-5 py-1.5">{site.product.name}</p>
            <ul className="space-y-1 text-ink-muted">
              <li>
                <a
                  href={company.product.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-link inline-block py-1.5 hover:text-ink-fg"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h2 className="eyebrow">{site.footer.contactHeading}</h2>
            <address className="mt-5 space-y-1 not-italic">
              <p className="py-1.5">{company.address.short}</p>
              <a href={company.phoneHref} className="u-link block w-fit py-1.5">
                {company.phone}
              </a>
              {[company.infoEmail].map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="u-link block w-fit py-1.5 [overflow-wrap:anywhere]"
                >
                  {email}
                </a>
              ))}
            </address>
          </div>
        </nav>

        <div className="flex flex-col gap-3 border-t border-ink-line pt-8 text-[0.8rem] text-ink-muted md:col-span-12 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {company.legalName}. {site.footer.rights}
          </p>
          <p lang="am" className="font-ethiopic">
            አዲስ አበባ · ኢትዮጵያ
          </p>
        </div>
      </div>
    </footer>
  );
}
