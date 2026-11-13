import { copy, defaultLocale, flags, localeLabels, type Locale } from "@/content/site";

/**
 * Built for v2 (Amharic). Hidden until flags.showLanguageSwitcher is true.
 * Languages without copy in site.ts are shown as disabled.
 */
export function LanguageSwitcher({ current = defaultLocale }: { current?: Locale }) {
  if (!flags.showLanguageSwitcher) return null;

  const locales = Object.keys(localeLabels) as Locale[];

  return (
    <ul aria-label="Language" className="flex items-center gap-3 text-[0.8rem]">
      {locales.map((l) => {
        const available = Boolean(copy[l]);
        return (
          <li key={l}>
            {available ? (
              <a
                href={l === defaultLocale ? "/" : `/${l}`}
                lang={l}
                aria-current={l === current ? "true" : undefined}
                className={l === current ? "text-fg" : "text-muted hover:text-fg"}
              >
                {localeLabels[l]}
              </a>
            ) : (
              <span lang={l} aria-disabled="true" className="text-muted/50">
                {localeLabels[l]}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
