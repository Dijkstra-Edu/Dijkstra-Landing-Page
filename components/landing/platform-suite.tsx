"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PlatformSuite() {
  return (
    <section id="products" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(5, 177, 5,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              The DIjkstra Platform Suite
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our suite of innovative products designed to transform
              your digital experience.
            </p>
          </motion.div>
        </div>

        <div className="space-y-24">
          <div className="grid md:grid-cols-2 px-4 md:px-8 lg:px-16 xl:px-24 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold">Dijkstra GPT</h3>
              <p className="text-gray-300 text-lg">
                Our in-house AI Model, trained on data pertaining to Software
                Engineering prep. Consider it that senior in UNiversity who
                could advise you on a thing or two XD
              </p>
              <ul className="space-y-3">
                {[
                  "Auto-scaling",
                  "Global distribution",
                  "Pay-as-you-go pricing",
                  "99.9% uptime SLA",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="group border-2 border-gray-700 hover:border-green-500 bg-gray-900/50 hover:bg-gray-800/50 text-white transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  Learn More
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                </span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-green-500/20 to-gray-500/20 p-1 rounded-lg">
                <div className="relative h-[250px] md:h-[300px] lg:h-auto w-full rounded-lg overflow-hidden">
                  {/* <CloudPlatform /> */}
                  <Image
                    src="/dijkstra-gpt.png"
                    alt="Dijkstra GPT Interface"
                    width={1200}
                    height={1200}
                    className="max-w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 px-4 md:px-8 lg:px-16 xl:px-24 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-last space-y-4 md:space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-bold">
                Dijkstra Analytics & Tracking
              </h3>
              <p className="text-gray-300 text-base md:text-lg">
                Gain valuable insights across all your platforms, be it
                Leetcode, GitHub to research, all in one place.
              </p>
              <ul className="space-y-2 md:space-y-3">
                {[
                  "Real-time dashboards",
                  "Custom reports",
                  "AI-powered predictions",
                  "Data visualization",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 md:gap-3">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="group border-2 border-gray-700 hover:border-green-500 bg-gray-900/50 hover:bg-gray-800/50 text-white transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  Learn More
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                </span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-first"
            >
              <div className="bg-gradient-to-br from-green-500/20 to-gray-500/20 p-1 rounded-lg">
                <div className="relative h-[250px] md:h-[300px] lg:h-auto w-full rounded-lg overflow-hidden">
                  {/* <AnalyticsPlatform /> */}
                  <Image
                    src="/dashboard.png"
                    alt="Dijkstra Analytics Dashboard"
                    width={1200}
                    height={1200}
                    className="max-w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 px-4 md:px-8 lg:px-16 xl:px-24 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4 md:space-y-6 order-1 md:order-1"
            >
              <h3 className="text-2xl md:text-3xl font-bold">
                Dijkstra Mobile
              </h3>
              <p className="text-gray-300 text-base md:text-lg">
                Bring the tracking to your mobile too! With our Community
                developed Mobile Applications.
              </p>
              <ul className="space-y-2 md:space-y-3">
                {[
                  "Threat detection",
                  "Vulnerability scanning",
                  "Compliance monitoring",
                  "24/7 security operations",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 md:gap-3">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="group border-2 border-gray-700 hover:border-green-500 bg-gray-900/50 hover:bg-gray-800/50 text-white transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  Learn More
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                </span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-2"
            >
              <div className="bg-gradient-to-br from-green-500/20 to-gray-500/20 p-1 rounded-lg">
                <div className="relative h-[250px] md:h-[400px] w-full rounded-lg overflow-hidden">
                  {/* <SecurityPlatform /> */}
                  <div className="flex items-center justify-center h-full gap-2 md:gap-4">
                    <Image
                      src="/mobile1.png"
                      alt="Mobile App Screenshot 1"
                      width={120}
                      height={240}
                      className="rounded-lg shadow-lg object-contain"
                    />
                    <Image
                      src="/mobile2.jpeg"
                      alt="Mobile App Screenshot 2"
                      width={120}
                      height={240}
                      className="rounded-lg shadow-lg object-contain"
                    />
                    <Image
                      src="/mobile3.jpeg"
                      alt="Mobile App Screenshot 3"
                      width={120}
                      height={240}
                      className="rounded-lg shadow-lg object-contain"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
