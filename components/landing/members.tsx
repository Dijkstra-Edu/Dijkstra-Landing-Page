"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TeamVisualization } from "@/components/interactive/team-visualization";

export function Members() {
  return (
    <section id="members" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5, 177, 5,0.1),transparent_60%)]" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-1"
          >
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 md:mb-6">
              Current Members
            </h2>
            <p className="text-gray-300 mb-4 md:mb-6 text-sm sm:text-base md:text-lg">
              Founded in 2023, Dijkstra was created with a singular vision: to
              democratize access to cutting-edge technology. We believe that
              powerful tools should be accessible to everyone, regardless of
              technical expertise.
            </p>
            <p className="text-gray-300 mb-4 md:mb-6 text-sm sm:text-base md:text-lg">
              Our team of passionate engineers and designers work tirelessly to
              create intuitive, powerful solutions that solve real-world
              problems and empower our users to achieve more.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="bg-gray-800/50 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm md:text-base">
                <span className="text-green-400 font-medium">50+</span> Team
                Members
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm md:text-base">
                <span className="text-green-400 font-medium">10k+</span>{" "}
                Customers
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm md:text-base">
                <span className="text-green-400 font-medium">99.9%</span> Uptime
              </div>
            </div>
            <Button
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-950 text-sm sm:text-base bg-transparent"
            >
              Learn More About Us
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-2"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-gray-500/20 rounded-lg blur-xl" />
              <div className="relative rounded-lg overflow-hidden">
                <div className="w-full h-[300px] md:h-[400px]">
                  <TeamVisualization />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
