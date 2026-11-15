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
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(5, 177, 5,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20 sm:p-8">
                <Quote className="h-7 w-7 text-green-500" aria-hidden />
                <blockquote className="mt-4 flex-1 leading-relaxed text-gray-300">
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
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </figcaption>
              </figure>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-medium text-green-400 hover:text-green-300"
          >
            Read their stories â†’
          </Link>
        </div>
      </div>
    </section>
  );
}
