"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(5, 177, 5,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What Our Members Say
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              What members of our community have to say:
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Neha Amin",
              role: "Dijkstra Student - Aspiring Software Engineer",
              image: "/neha.jpg",
              content:
                "As someone who ran away at the first mention of an API call or development , to actually enjoying the process of building your ideas into a software solution.  Dijikstra has been that experience that helped me overcome my fears.",
            },
            {
              name: "Abdul Wahab",
              role: "Dijkstra Student - Aspiring Software Engineer",
              image: "/abdul.jpg",
              content:
                "I always wanted to explore real backend development, and Dijkstra gave me that chance. Working under Jonathan's guidance helped me dive deep into core concepts. I not only learned the technical side but also how to approach problems logically. This experience has boosted my confidence to take on bigger backend challenges.",
            },
            {
              name: "Nishita Daryn",
              role: "Dijkstra Student - Aspiring Medical Engineer",
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
              <div className="h-full bg-gradient-to-b from-gray-900 to-gray-950 p-[1px] rounded-xl">
                <div className="h-full bg-gradient-to-b from-gray-900 to-gray-950 p-8 rounded-xl border border-gray-800/50 backdrop-blur-sm">
                  <div className="flex items-center mb-6">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">
                    "{testimonial.content}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
