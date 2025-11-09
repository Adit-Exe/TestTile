"use client";
import React, { useEffect, useRef } from "react";
import Hero from "./Components/hero.js";
import Product from "./Components/product.js";
import Review from "./Components/review.js";
import Footer from "./Components/footer.js";
import Nav from "./Components/nav.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const homeRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // --- Split and Animate all h2 and p tags ---
      const textElements = document.querySelectorAll("h2, p");

      textElements.forEach((el) => {
        const split = new SplitType(el, { types: "lines" });

        gsap.from(split.lines, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 40,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
        });
      });
    }, homeRef);

    return () => ctx && ctx.revert();
  }, []);

  return (
    <>
      <Nav />

      <div ref={homeRef} className="flex flex-col overflow-x-hidden">
        {/* Hero Section */}
        <Hero />

        {/* Food Categories Section */}
        <div className="w-full sm:w-3xl px-4 py-12">
          <h2 className="font-bold text-2xl mb-3 text-amber-500">
            Our Food Categories
          </h2>
          <p className="text-base sm:text-lg text-gray-700">
            Ynot Food Products is an initiative of North East India where we are focusing on
            traditional process of preparing and preserving of food products by using minimal
            chemical preservatives. We are concentrating on fruits and vegetables locally grown in
            North East region and trying to promote it globally.
          </p>
        </div>

        {/* Products Section */}
        <Product />

        {/* Reviews Section */}
        <div className="px-4 py-12">
          <h2 className="font-bold text-2xl text-amber-500 mb-5">
            Reviews
          </h2>
          <Review />
        </div>
      </div>

      <Footer />
    </>
  );
}
