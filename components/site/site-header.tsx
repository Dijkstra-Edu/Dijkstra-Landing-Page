"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Book,
  Brain,
  CheckCircle,
  ChevronDown,
  Code,
  Cpu,
  Github,
  Globe,
  Menu,
  MessageSquare,
  Trophy,
  X,
} from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { platformLinks, siteConfig } from "@/lib/site";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        onMouseLeave={() => setActiveMegaMenu(null)}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 text-white",
          "transition-all duration-500 ease-out",
          scrolled
            ? activeMegaMenu
              ? "bg-black/80 backdrop-blur-2xl border-b border-white/10"
              : "bg-black/95 backdrop-blur-md border-b border-gray-800/50"
            : "bg-black/80 backdrop-blur-xl border-b border-white/10",
        )}
        style={{
          paddingTop: activeMegaMenu ? "1.5rem" : scrolled ? "1rem" : "1.5rem",
          paddingBottom: activeMegaMenu ? "2rem" : scrolled ? "1rem" : "1.5rem",
        }}
      >
        <div className="container mx-auto px-4">
          {/* Top Navigation Bar */}
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <Link href="/" className="flex items-center gap-2">
                <img src="/icon.png" alt="" className="h-12 w-auto" />
                <span className="font-bold text-xl">{siteConfig.name}</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <nav className="hidden md:flex items-center gap-8">
                {/* Features Mega Menu */}
                <div
                  className="relative"
                  onMouseEnter={() => setActiveMegaMenu("features")}
                >
                  <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium py-2">
                    Features
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transition-transform duration-300",
                        activeMegaMenu === "features" && "rotate-180",
                      )}
                    />
                  </button>
                </div>

                {/* Products Mega Menu */}
                <div
                  className="relative"
                  onMouseEnter={() => setActiveMegaMenu("products")}
                >
                  <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium py-2">
                    Products
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transition-transform duration-300",
                        activeMegaMenu === "products" && "rotate-180",
                      )}
                    />
                  </button>
                </div>

                {/* About Mega Menu */}
                <div
                  className="relative"
                  onMouseEnter={() => setActiveMegaMenu("about")}
                >
                  <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium py-2">
                    About
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transition-transform duration-300",
                        activeMegaMenu === "about" && "rotate-180",
                      )}
                    />
                  </button>
                </div>

                {/* Pricing - Simple Link */}
                {/* <Link
                  href="#pricing"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium"
                >
                  Pricing
                </Link> */}

                {/* Testimonials - Simple Link */}
                <Link
                  href="/#testimonials"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium"
                >
                  Testimonials
                </Link>
              </nav>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="hidden md:flex items-center gap-4">
                <Button
                  className="h-9 px-4 py-2 bg-black hover:bg-neutral-900 border border-[#048304] text-[#048304] hover:opacity-90"
                  asChild
                >
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Dijkstra on GitHub"
                  >
                    <IconBrandGithub className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  className="h-9 px-4 py-2 bg-black hover:bg-neutral-900 border border-[#048304] text-[#048304] hover:opacity-90"
                  asChild
                >
                  <a href={platformLinks.login}>Login</a>
                </Button>

                <Button
                  className="h-9 px-4 py-2 bg-black hover:bg-neutral-900 border border-[#048304] text-[#048304] hover:opacity-90"
                  asChild
                >
                  <a href={platformLinks.onboarding}>Get Started</a>
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </motion.div>
          </div>

          {/* Expanded Mega Menu Content */}
          <AnimatePresence>
            {activeMegaMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-8 pb-4">
                  {/* Features Content */}
                  {activeMegaMenu === "features" && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-12 gap-8"
                    >
                      {/* Column 1 - Main Info */}
                      <div className="col-span-3 border-r border-gray-800/30 pr-8">
                        <h3 className="text-2xl font-bold mb-2">Features</h3>
                        <p className="text-gray-400 text-sm mb-6">
                          Powerful tools to enhance your workflow
                        </p>
                        <a
                          href="/#features"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#048304] text-[#048304] hover:bg-[#048304]/10 transition-colors text-sm font-medium"
                        >
                          All Features
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>

                      {/* Column 2 - Main Features */}
                      <div className="col-span-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                              Core Features
                            </h4>
                            <div className="space-y-3">
                              <a
                                href="/#features"
                                className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <div className="p-2 bg-purple-500/10 rounded-lg group-hover/item:bg-purple-500/20 transition-colors">
                                  <Code className="h-4 w-4 text-purple-400" />
                                </div>
                                <div>
                                  <div className="font-medium text-sm group-hover/item:text-purple-400 transition-colors">
                                    Advanced API
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    Robust developer tools
                                  </div>
                                </div>
                              </a>

                              <a
                                href="/#features"
                                className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <div className="p-2 bg-blue-500/10 rounded-lg group-hover/item:bg-blue-500/20 transition-colors">
                                  <Globe className="h-4 w-4 text-blue-400" />
                                </div>
                                <div>
                                  <div className="font-medium text-sm group-hover/item:text-blue-400 transition-colors">
                                    Global CDN
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    Lightning-fast delivery
                                  </div>
                                </div>
                              </a>

                              <a
                                href="/#features"
                                className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <div className="p-2 bg-green-500/10 rounded-lg group-hover/item:bg-green-500/20 transition-colors">
                                  <CheckCircle className="h-4 w-4 text-green-400" />
                                </div>
                                <div>
                                  <div className="font-medium text-sm group-hover/item:text-green-400 transition-colors">
                                    Enterprise Security
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    Bank-grade protection
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                              Advanced
                            </h4>
                            <div className="space-y-3">
                              <a
                                href="/#features"
                                className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <div className="p-2 bg-red-500/10 rounded-lg group-hover/item:bg-red-500/20 transition-colors">
                                  <Cpu className="h-4 w-4 text-red-400" />
                                </div>
                                <div>
                                  <div className="font-medium text-sm group-hover/item:text-red-400 transition-colors">
                                    AI-Powered
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    Smart automation
                                  </div>
                                </div>
                              </a>

                              <a
                                href="/#features"
                                className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <div className="p-2 bg-yellow-500/10 rounded-lg group-hover/item:bg-yellow-500/20 transition-colors">
                                  <MessageSquare className="h-4 w-4 text-yellow-400" />
                                </div>
                                <div>
                                  <div className="font-medium text-sm group-hover/item:text-yellow-400 transition-colors">
                                    24/7 Support
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    Always available
                                  </div>
                                </div>
                              </a>

                              <a
                                href="/#features"
                                className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <div className="p-2 bg-gray-500/10 rounded-lg group-hover/item:bg-gray-500/20 transition-colors">
                                  <Github className="h-4 w-4 text-gray-400" />
                                </div>
                                <div>
                                  <div className="font-medium text-sm group-hover/item:text-gray-300 transition-colors">
                                    Open Source
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    Community-driven
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Column 3 - Resources */}
                      <div className="col-span-3 border-l border-gray-800/30 pl-8">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                          Resources
                        </h4>
                        <div className="space-y-2">
                          <a
                            href={siteConfig.docsUrl}
                            className="block px-3 py-2 text-sm hover:text-[#048304] transition-colors rounded-lg hover:bg-white/5"
                          >
                            Documentation
                          </a>
                          <a
                            href="#"
                            className="block px-3 py-2 text-sm hover:text-[#048304] transition-colors rounded-lg hover:bg-white/5"
                          >
                            API Reference
                          </a>
                          <a
                            href="#"
                            className="block px-3 py-2 text-sm hover:text-[#048304] transition-colors rounded-lg hover:bg-white/5"
                          >
                            Changelog
                          </a>
                          <a
                            href={siteConfig.links.discord}
                            className="block px-3 py-2 text-sm hover:text-[#048304] transition-colors rounded-lg hover:bg-white/5"
                          >
                            Community
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Products Content */}
                  {activeMegaMenu === "products" && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-12 gap-8"
                    >
                      {/* Column 1 - Main Info */}
                      <div className="col-span-3 border-r border-gray-800/30 pr-8">
                        <h3 className="text-2xl font-bold mb-2">Products</h3>
                        <p className="text-gray-400 text-sm mb-6">
                          Enterprise solutions for modern teams
                        </p>
                        <a
                          href="/#products"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#048304] text-[#048304] hover:bg-[#048304]/10 transition-colors text-sm font-medium"
                        >
                          All Products
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>

                      {/* Column 2 - Products List */}
                      <div className="col-span-6">
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                              Infrastructure
                            </h4>
                            <div className="space-y-3">
                              <a
                                href="/#products"
                                className="group/item flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <div className="p-3 bg-green-500/10 rounded-xl group-hover/item:bg-green-500/20 transition-colors">
                                  <Brain className="h-5 w-5 text-green-400" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold mb-1 group-hover/item:text-green-400 transition-colors">
                                    Dijkstra GPT
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    A smart GPT catered towards students aiming
                                    to break into tech
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                              Analytics & Security
                            </h4>
                            <div className="space-y-3">
                              <a
                                href="/#products"
                                className="group/item flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <div className="p-3 bg-red-500/10 rounded-xl group-hover/item:bg-red-500/20 transition-colors">
                                  <Book className="h-5 w-5 text-red-400" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold mb-1 group-hover/item:text-red-400 transition-colors">
                                    Resume Builder
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    Data-driven insights and real-time
                                    dashboards
                                  </div>
                                </div>
                              </a>

                              <a
                                href="/#products"
                                className="group/item flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <div className="p-3 bg-yellow-500/10 rounded-xl group-hover/item:bg-yellow-500/20 transition-colors">
                                  <Trophy className="h-5 w-5 text-yellow-400" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold mb-1 group-hover/item:text-yellow-400 transition-colors">
                                    Ranking Algorithm
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    Advanced protection for your digital assets
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Column 3 - Explore Further */}
                      <div className="col-span-3 border-l border-gray-800/30 pl-8">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                          Explore Further
                        </h4>
                        <div className="space-y-2">
                          <a
                            href="#pricing"
                            className="block px-3 py-2 text-sm hover:text-[#048304] transition-colors rounded-lg hover:bg-white/5"
                          >
                            Plans & Pricing
                          </a>
                          <a
                            href="#"
                            className="block px-3 py-2 text-sm hover:text-[#048304] transition-colors rounded-lg hover:bg-white/5"
                          >
                            Product Roadmap
                          </a>
                          <a
                            href="#"
                            className="block px-3 py-2 text-sm hover:text-[#048304] transition-colors rounded-lg hover:bg-white/5"
                          >
                            Integrations
                          </a>
                          <a
                            href="#"
                            className="block px-3 py-2 text-sm hover:text-[#048304] transition-colors rounded-lg hover:bg-white/5"
                          >
                            Comparisons
                          </a>
                          <a
                            href="#"
                            className="block px-3 py-2 text-sm hover:text-[#048304] transition-colors rounded-lg hover:bg-white/5"
                          >
                            Case Studies
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* About Content */}
                  {activeMegaMenu === "about" && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-12 gap-8"
                    >
                      {/* Column 1 - Main Info */}
                      <div className="col-span-3 border-r border-gray-800/30 pr-8">
                        <h3 className="text-2xl font-bold mb-2">About</h3>
                        <p className="text-gray-400 text-sm mb-6">
                          Learn more about our mission and team
                        </p>
                        <a
                          href="/#members"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#048304] text-[#048304] hover:bg-[#048304]/10 transition-colors text-sm font-medium"
                        >
                          About Us
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>

                      {/* Column 2 - Links */}
                      <div className="col-span-5">
                        <div className="space-y-3">
                          <a
                            href="/#members"
                            className="block p-3 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <div className="font-medium mb-1 hover:text-[#048304] transition-colors">
                              Our Mission
                            </div>
                            <div className="text-sm text-gray-400">
                              Democratizing technology for everyone
                            </div>
                          </a>

                          <a
                            href="/#members"
                            className="block p-3 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <div className="font-medium mb-1 hover:text-[#048304] transition-colors">
                              Team
                            </div>
                            <div className="text-sm text-gray-400">
                              Meet the people behind Dijkstra
                            </div>
                          </a>

                          <a
                            href="#"
                            className="block p-3 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <div className="font-medium mb-1 hover:text-[#048304] transition-colors">
                              Careers
                            </div>
                            <div className="text-sm text-gray-400">
                              Join our growing team
                            </div>
                          </a>

                          <a
                            href="/#contact"
                            className="block p-3 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <div className="font-medium mb-1 hover:text-[#048304] transition-colors">
                              Contact Us
                            </div>
                            <div className="text-sm text-gray-400">
                              Get in touch with our team
                            </div>
                          </a>
                        </div>
                      </div>

                      {/* Column 3 - Featured Article */}
                      <div className="col-span-4 border-l border-gray-800/30 pl-8">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                          Featured Article
                        </h4>
                        <a href="#" className="block group/article">
                          <div className="aspect-video bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-lg mb-3 overflow-hidden">
                            <img
                              src="/blog.png"
                              alt="Featured article"
                              className="w-full h-full object-cover opacity-80 group-hover/article:opacity-100 transition-opacity"
                            />
                          </div>
                          <h5 className="font-semibold mb-2 group-hover/article:text-red-600 transition-colors">
                            Dijkstra Blog is Live!
                          </h5>
                          <p className="text-sm text-gray-400 mb-3">
                            Discover how students are sharing what they've
                            learnt through Dijkstra blog...
                          </p>
                          <span className="text-sm text-red-600 font-medium inline-flex items-center gap-1">
                            Read more
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-black text-white border-b border-gray-800 md:hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-6">
              {/* Features Accordion */}
              <div className="space-y-2">
                <button
                  onClick={() =>
                    setMobileAccordionOpen(
                      mobileAccordionOpen === "features" ? null : "features",
                    )
                  }
                  className="flex items-center justify-between w-full text-gray-300 hover:text-white transition-colors text-lg font-medium"
                >
                  Features
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      mobileAccordionOpen === "features" && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence>
                  {mobileAccordionOpen === "features" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 space-y-2">
                        <Link
                          href="/#features"
                          className="block text-gray-400 hover:text-white transition-colors text-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          All Features
                        </Link>
                        <Link
                          href="/#features"
                          className="block text-gray-400 hover:text-white transition-colors text-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Advanced API
                        </Link>
                        <Link
                          href="/#features"
                          className="block text-gray-400 hover:text-white transition-colors text-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Global CDN
                        </Link>
                        <Link
                          href="/#features"
                          className="block text-gray-400 hover:text-white transition-colors text-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Enterprise Security
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Products Accordion */}
              <div className="space-y-2">
                <button
                  onClick={() =>
                    setMobileAccordionOpen(
                      mobileAccordionOpen === "products" ? null : "products",
                    )
                  }
                  className="flex items-center justify-between w-full text-gray-300 hover:text-white transition-colors text-lg font-medium"
                >
                  Products
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      mobileAccordionOpen === "products" && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence>
                  {mobileAccordionOpen === "products" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 space-y-2">
                        <Link
                          href="/#products"
                          className="block text-gray-400 hover:text-white transition-colors text-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Dijkstra GPT
                        </Link>
                        <Link
                          href="/#products"
                          className="block text-gray-400 hover:text-white transition-colors text-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Resume Builder
                        </Link>
                        <Link
                          href="/#products"
                          className="block text-gray-400 hover:text-white transition-colors text-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Ranking Algorithm
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* About Accordion */}
              <div className="space-y-2">
                <button
                  onClick={() =>
                    setMobileAccordionOpen(
                      mobileAccordionOpen === "about" ? null : "about",
                    )
                  }
                  className="flex items-center justify-between w-full text-gray-300 hover:text-white transition-colors text-lg font-medium"
                >
                  About
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      mobileAccordionOpen === "about" && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence>
                  {mobileAccordionOpen === "about" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 space-y-2">
                        <Link
                          href="/#members"
                          className="block text-gray-400 hover:text-white transition-colors text-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Our Mission
                        </Link>
                        <Link
                          href="/#members"
                          className="block text-gray-400 hover:text-white transition-colors text-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Team
                        </Link>
                        <Link
                          href="/#members"
                          className="block text-gray-400 hover:text-white transition-colors text-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Careers
                        </Link>
                        <Link
                          href="/#contact"
                          className="block text-gray-400 hover:text-white transition-colors text-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Contact Us
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Simple Links */}
              <Link
                href="/#testimonials"
                className="text-gray-300 hover:text-white transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-[#048304] text-[#048304] hover:bg-[#048304]/10"
                  asChild
                >
                  <a href={platformLinks.login}>Login</a>
                </Button>
                <Button
                  className="w-full bg-green-700 hover:bg-green-800 text-white"
                  asChild
                >
                  <a href={platformLinks.onboarding}>Get Started</a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
