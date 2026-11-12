import Image from "next/image";
import type { TeamMember as Member } from "@/content/site";
import { Confirm, ImagePlaceholderLabel } from "./Placeholder";
import { Reveal } from "./Reveal";
import { Tibeb } from "./Texture";

function Portrait({ member, large }: { member: Member; large?: boolean }) {
  const slug = member.name.split(" ")[0].toLowerCase();
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface">
      {member.portrait ? (
        <Image
          src={member.portrait}
          alt={`Portrait of ${member.name}`}
          fill
          sizes={large ? "(min-width: 768px) 40vw, 90vw" : "(min-width: 768px) 22vw, 90vw"}
          className="object-cover"
        />
      ) : (
        <div className="flex h-full flex-col justify-between p-5" role="img" aria-label={`${member.name} — portrait to come`}>
          <ImagePlaceholderLabel kind="portrait" path={`/public/team/${slug}.jpg`} className="text-muted" />
          <span
            aria-hidden="true"
            className={`display text-fg/80 ${large ? "text-[7rem] md:text-[10rem]" : "text-[5.5rem] md:text-[6.5rem]"}`}
          >
            {member.initials}
          </span>
        </div>
      )}
      <Tibeb id={`tibeb-${slug}`} className="absolute inset-x-0 bottom-0 text-gold/50" />
    </div>
  );
}

export function TeamMember({ member, large = false }: { member: Member; large?: boolean }) {
  return (
    <article>
      <Portrait member={member} large={large} />
      <h3 className={`display mt-6 ${large ? "text-[2.4rem] md:text-[3rem]" : "text-[2rem]"}`}>
        {member.name}
      </h3>
      <p className="mt-2 text-[0.95rem] font-medium">
        {member.role}
        <Confirm note={member.confirm} />
      </p>
      <p className="mt-1 text-sm text-muted">{member.location}</p>
      <p className={`mt-4 leading-relaxed text-muted ${large ? "max-w-[46ch] text-lg" : "max-w-[40ch]"}`}>
        {member.bio}
      </p>
      {member.links.length > 0 && (
        <ul className="mt-4 flex gap-6">
          {member.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="u-link inline-block py-2 text-[0.95rem] font-medium text-accent"
              >
                {l.label}
                <span className="sr-only"> — {member.name} (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

/** Asymmetric editorial team layout — a lead portrait and a staggered column. */
export function Team({ members, closing }: { members: Member[]; closing: string }) {
  const [lead, ...rest] = members;
  return (
    <div>
      <div className="grid gap-16 md:grid-cols-12 md:gap-x-10">
        <Reveal className="md:col-span-5 md:row-span-2">
          <TeamMember member={lead} large />
        </Reveal>
        <div className="grid gap-16 sm:grid-cols-2 md:col-span-7 md:grid-cols-2 md:gap-x-10">
          {rest.map((m, i) => (
            <Reveal
              key={m.name}
              delay={i * 0.08}
              className={i === 0 ? "md:mt-40" : i === 1 ? "md:mt-0" : "md:col-start-2 md:-mt-24"}
            >
              <TeamMember member={m} />
            </Reveal>
          ))}
        </div>
      </div>
      <p className="display mt-20 max-w-[24ch] text-[1.8rem] italic text-muted md:mt-28 md:text-[2.4rem]">
        {closing}
      </p>
    </div>
  );
}
