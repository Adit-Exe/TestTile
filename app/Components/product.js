"use client";
import React, { useEffect, useRef } from "react";
import Pbox from "./pbox.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Product() {
  const productRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.from(productRef.current, {
        scrollTrigger: {
          trigger: productRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
      });
    }, productRef);

    return () => ctx && ctx.revert();
  }, []);

  return (
    <div
      ref={productRef}
      className="w-full overflow-x-auto mt-10 flex sm:justify-center"
    >
      <div className="flex gap-6 sm:gap-10 justify-start flex-nowrap px-4">
        <Pbox title="Chutney" img="/images/chutney.jpg" />
        <Pbox title="Mouth Freshners" img="/images/fresh.jpg" />
        <Pbox title="Pickles" img="/images/pickle.jpg" />
        <Pbox title="Spices" img="/images/spices.jpg" />
        <Pbox title="Bamboo Shoot" img="/images/bamboo.jpg" />
      </div>
    </div>
  );
}

export default Product;
