import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-black text-white py-16 border-t border-gray-800/50 px-4 md:px-8 lg:px-16 xl:px-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(5, 177, 5,0.1),transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <a href="/" className="flex items-center gap-2">
                <img src="/icon.png" alt="" className="h-12 w-auto" />
                <span className="font-bold text-xl">Dijkstra</span>
              </a>
            </div>
            <p className="text-gray-400 mb-6">
              Building <span className="text-white">Incredible Software</span>{" "}
              <br />
              For <span className="text-white">Students</span>, <br />
              By <span className="text-white">Students</span>.
            </p>
            <div className="flex space-x-4">
              <a
                href={siteConfig.links.github}
                aria-label="GitHub"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <IconBrandGithub className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.links.discord}
                aria-label="Discord"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <IconBrandDiscord className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <IconBrandLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Get Started</h4>
            <ul className="space-y-4">
              {[
                "Onboarding",
                "Dashboard",
                "Opportunities",
                "API",
                "Documentation",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Organization</h4>
            <ul className="space-y-4">
              {["Mission", "About Us", "Blog", "Press", "Partners"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4">
              {["Terms", "Privacy", "Cookies", "Licenses", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} JRS Studios. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
