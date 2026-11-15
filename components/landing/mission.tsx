"use client";

import { motion } from "framer-motion";

export function Mission() {
  return (
    <section id="mission" className=" bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
              Our Mission
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              IIt's 2025, and entry level roles have become nothing short of a
              bloodbath. Loads of students left without jobs, a natural
              saturation of the field, AI taking over roles... Quite a lot
              happening at once. We at Dijkstra firmly believe that it is
              possible to still land well compensated jobs in the field of tech,
              irrespective of everything happening in the world today.
              {/* button to redirect to Dijkstra's Mission as well as About Us */}
              <br />
              We want you to get back to your roots, and to systematically
              approach preapring for Software Engineering; ACTIVELY, not
              PASSIVELY.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
