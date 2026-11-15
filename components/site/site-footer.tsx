import Link from "next/link";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { siteConfig } from "@/lib/site";
import { footerNav, legalNav, type NavLink } from "@/lib/navigation";

function FooterLink({ link, className }: { link: NavLink; className: string }) {
  return link.href.startsWith("/") ? (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  ) : (
    <a href={link.href} className={className}>
      {link.label}
    </a>
  );
}

const socials = [
  { label: "GitHub", href: siteConfig.links.github, Icon: IconBrandGithub },
  { label: "Discord", href: siteConfig.links.discord, Icon: IconBrandDiscord },
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    Icon: IconBrandLinkedin,
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-gray-800/50 bg-black py-14 text-white md:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(5,177,5,0.1),transparent_70%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6 lg:gap-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="mb-5 inline-flex items-center gap-2">
              <img src="/icon.png" alt="" className="h-11 w-11" />
              <span className="text-xl font-bold">{siteConfig.name}</span>
            </Link>
            <p className="mb-6 max-w-xs text-gray-400">
              Building <span className="text-white">Incredible Software</span>
              <br />
              For <span className="text-white">Students</span>,
              <br />
              By <span className="text-white">Students</span>.
            </p>
            <div className="flex gap-4">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {footerNav.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
                {column.title}
              </h2>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <FooterLink
                      link={link}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800/50 pt-8 text-center md:flex-row md:text-left">
          <p className="text-sm text-gray-400" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} JRS Studios. All rights reserved.
            Dijkstra is open source under the Apache&nbsp;2.0 license.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {legalNav.map((link) => (
              <FooterLink
                key={link.href}
                link={link}
                className="text-sm text-gray-400 transition-colors hover:text-white"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
