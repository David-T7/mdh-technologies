import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/Reveal";
import { company, site } from "@/content/site";

const description = site.hero.body;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: `${company.name} — Life doesn't have to be this hard`,
    template: `%s — ${company.name}`,
  },
  description,
  applicationName: company.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: "en_US",
    url: "/",
    description,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "light dark",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  legalName: company.legalName,
  url: company.url,
  logo: `${company.url}/icon`,
  email: company.email,
  telephone: company.phone.replace(/\s/g, ""),
  foundingDate: company.founded,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    addressCountry: company.address.country,
  },
  sameAs: [company.github],
  founder: site.team.members.map((m) => ({ "@type": "Person", name: m.name })),
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "SoftwareApplication",
      name: site.product.name,
      url: company.product.app,
      applicationCategory: "EducationalApplication",
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <MotionProvider>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
