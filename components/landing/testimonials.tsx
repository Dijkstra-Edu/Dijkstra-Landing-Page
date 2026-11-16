"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "./section-heading";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      data-nav-tone="dark"
      className="relative overflow-hidden border-t border-white/10 bg-black py-20 md:py-28"
    >
      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Testimonials"
          title="What our members say"
          description="Students who learned by building Dijkstra, in their own words."
        />

        <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {[
            {
              name: "Neha Amin",
              role: "Dijkstra student Â· Aspiring software engineer",
              image: "/neha.jpg",
              content:
                "As someone who ran away at the first mention of an API call or development, to actually enjoying the process of building your ideas into a software solution â€” Dijkstra has been that experience that helped me overcome my fears.",
            },
            {
              name: "Abdul Wahab",
              role: "Dijkstra student Â· Aspiring software engineer",
              image: "/abdul.jpg",
              content:
                "I always wanted to explore real backend development, and Dijkstra gave me that chance. Working under Jonathan's guidance helped me dive deep into core concepts. I not only learned the technical side but also how to approach problems logically. This experience has boosted my confidence to take on bigger backend challenges.",
            },
            {
              name: "Nishita Daryn",
              role: "Dijkstra student Â· Aspiring medical engineer",
              image: "/nishita.jpg",
              content:
                "As a non-CS major, I was initially intimidated by the idea of contributing to an open-source project. However, Dijkstra's supportive community and structured approach made it accessible and enjoyable. I've gained practical skills and confidence that I never thought possible.",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <figure className="flex h-full flex-col rounded-xl border border-white/10 p-6 sm:p-8">
                <Quote className="h-5 w-5 text-neutral-600" aria-hidden />
                <blockquote className="mt-4 flex-1 leading-relaxed text-neutral-300">
                  {testimonial.content}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.image}
                      alt=""
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {testimonial.role}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-300 underline-offset-4 hover:text-white hover:underline"
          >
            Read their stories â†’
          </Link>
        </div>
      </div>
    </section>
  );
}
