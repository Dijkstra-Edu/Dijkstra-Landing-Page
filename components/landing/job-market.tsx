"use client";

import Masonry from "@/components/masonry";
import { items } from "@/data/masonry";

export function JobMarket() {
  return (
    <section
      id="job-market"
      className="py-16 bg-white relative overflow-hidden min-h-[80vh]"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="relative">
          <Masonry
            items={items}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.95}
            blurToFocus={true}
            colorShiftOnHover={false}
          />
        </div>
      </div>
    </section>
  );
}
