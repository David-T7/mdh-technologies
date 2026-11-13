import Image from "next/image";
import Link from "next/link";
import type { TeamMember as Member } from "@/content/site";
import { portraitFor } from "@/lib/portraits";
import { Arrow } from "./Button";
import { Confirm } from "./Placeholder";
import { Reveal } from "./Reveal";

/** Portrait from /public/team/<slug>.*, or a plain user icon until one exists. */
export function Portrait({
  member,
  sizes,
  priority = false,
  className = "",
}: {
  member: Member;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const src = portraitFor(member.slug);
  return (
    <div suppressHydrationWarning data-spotlight className={`relative overflow-hidden bg-surface ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={`Portrait of ${member.name}`}
          fill
          sizes={sizes}
          priority={priority}
          // Served as the original file: re-encoding a ~400px photo only loses detail.
          unoptimized
          className="object-cover"
        />
      ) : (
        <div className="flex h-full items-end justify-center" role="img" aria-label={member.name}>
          {/* Generic user silhouette — head and shoulders */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="h-[58%] w-auto text-fg/15 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1"
            fill="currentColor"
          >
            <circle cx="50" cy="36" r="19" />
            <path d="M12 100c0-22 17-37 38-37s38 15 38 37Z" />
          </svg>
        </div>
      )}
    </div>
  );
}

function FounderCard({ member, cta }: { member: Member; cta: string }) {
  return (
    <article className="group">
      <Link href={`/team/${member.slug}`} className="block" aria-label={`${member.name} — ${cta}`}>
        {/* Square and capped at 300px: profile photos (e.g. from LinkedIn) are
            square and small (this one is 285px), so a larger box would upscale and blur them. */}
        <Portrait
          member={member}
          sizes="(min-width: 640px) 300px, 92vw"
          className="aspect-square w-full max-w-[300px] rounded-2xl"
        />
        <h3 className="display mt-7 text-[2.4rem] leading-[1] transition-colors duration-300 group-hover:text-highlight md:text-[3rem]">
          {member.name}
        </h3>
      </Link>
      <p className="mt-3 text-[0.95rem] font-medium">
        {member.role}
        <Confirm note={member.confirm} />
      </p>
      {member.location && <p className="mt-1 text-sm text-muted">{member.location}</p>}
      <p className="mt-4 max-w-[44ch] leading-relaxed text-muted">{member.bio}</p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
        <Link href={`/team/${member.slug}`} className="group/cta inline-flex min-h-11 items-center gap-3 font-medium">
          <span className="u-link">{cta}</span>
          <Arrow />
        </Link>
        {member.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="u-link inline-block py-2 text-[0.95rem] text-muted hover:text-fg"
          >
            {l.label}
            <span className="sr-only"> — {member.name} (opens in a new tab)</span>
          </a>
        ))}
      </div>
    </article>
  );
}

/** The founders, side by side; each card opens a full profile page. */
export function Team({ members, closing, cta }: { members: Member[]; closing: string; cta: string }) {
  return (
    <div>
      <div className="grid gap-16 md:grid-cols-2 md:gap-10 lg:gap-16">
        {members.map((m, i) => (
          <Reveal key={m.slug} delay={i * 0.1}>
            <FounderCard member={m} cta={cta} />
          </Reveal>
        ))}
      </div>
      <p className="display mt-20 max-w-[30ch] text-[1.8rem] italic text-muted md:mt-28 md:text-[2.4rem]">
        {closing}
      </p>
    </div>
  );
}
