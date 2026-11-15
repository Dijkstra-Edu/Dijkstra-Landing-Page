import type { Metadata } from "next";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import ContactForm from "@/components/contact-form";
import { isContactTopic } from "@/lib/contact";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Dijkstra team â€” questions, partnerships, press or joining a team.",
};

const channels = [
  {
    icon: IconBrandDiscord,
    title: "Discord",
    text: "The fastest way to reach mentors and the community.",
    href: siteConfig.links.discord,
    cta: "Join the server",
  },
  {
    icon: IconBrandLinkedin,
    title: "LinkedIn",
    text: "Follow updates and message the organisation.",
    href: siteConfig.links.linkedin,
    cta: "Visit LinkedIn",
  },
  {
    icon: IconBrandGithub,
    title: "GitHub",
    text: "Report bugs or suggest features in the relevant repository.",
    href: siteConfig.links.github,
    cta: "Open GitHub",
  },
  {
    icon: GraduationCap,
    title: "GSoC applicants",
    text: "Send proposals and questions about Google Summer of Code.",
    href: "mailto:gsoc@dijkstra.org.in",
    cta: "gsoc@dijkstra.org.in",
  },
];

export default function ContactPage({
  searchParams,
}: {
  searchParams: { topic?: string };
}) {
  const topic = isContactTopic(searchParams.topic)
    ? searchParams.topic
    : "general";
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        description="Whether you are a student, a university, a company or a journalist, we would love to hear from you."
      />
      <Section className="pt-0 md:pt-0">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_minmax(0,32rem)]">
          <div className="grid gap-4 sm:grid-cols-2">
            {channels.map((c) => (
              <a
                key={c.title}
                href={c.href}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
              >
                <c.icon className="h-6 w-6 text-green-400" />
                <h2 className="mt-4 font-semibold">{c.title}</h2>
                <p className="mt-2 flex-1 text-sm text-neutral-400">{c.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-green-400 group-hover:text-green-300">
                  {c.cta} <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </a>
            ))}
          </div>
          <ContactForm defaultTopic={topic} showHeading={false} />
        </div>
      </Section>
    </PageShell>
  );
}
