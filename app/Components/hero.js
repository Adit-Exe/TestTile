"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ✅ RESET OPACITY for safety
      gsap.set(".split-text, .fade-up, .feature-item, .hero-image", { opacity: 1 });

      // --- TEXT SPLIT ANIMATION ---
      const splitTexts = document.querySelectorAll(".split-text");
      splitTexts.forEach((el) => {
        const split = new SplitType(el, { types: "lines" });
        gsap.from(split.lines, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });
    });

      // --- FADE-UP ELEMENTS ---
      gsap.utils.toArray(".fade-up").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
        });
      });

      // --- STAGGER FEATURE ICONS ---
      gsap.from(".feature-item", {
        scrollTrigger: {
          trigger: ".feature-item",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });

      // --- IMAGE ANIMATION ---
      gsap.from(".hero-image", {
        scrollTrigger: {
          trigger: ".hero-image",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
        integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
     <div
  ref={heroRef}
  className="min-h-screen flex flex-col items-center justify-center gap-10 px-4 pb-20 sm:pb-32"
>

        {/* Top Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 justify-evenly w-full max-w-6xl fade-up">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl mb-3 split-text">
              Y Not Food Products
            </h2>
            <p className="mb-5 text-base sm:text-lg split-text">
              Bringing the traditional and authentic taste of North East India across the world.
            </p>

            {/* Feature Items */}
            <div className="space-y-4">
              <div className="feature-item border-2 border-black p-4 sm:p-5 rounded-full text-base sm:text-xl flex items-center gap-3 justify-center lg:justify-start">
                <i className="fa-solid fa-shield-heart text-xl sm:text-3xl text-green-500"></i>
                <p>100% Pure</p>
              </div>
              <div className="feature-item border-2 border-black p-4 sm:p-5 rounded-full text-base sm:text-xl flex items-center gap-3 justify-center lg:justify-start">
                <i className="fa-solid fa-leaf text-xl sm:text-3xl text-green-500"></i>
                <p>Tradition from our Roots</p>
              </div>
              <div className="feature-item border-2 border-black p-4 sm:p-5 rounded-full text-base sm:text-xl flex items-center gap-3 justify-center lg:justify-start">
                <i className="fa-solid fa-seedling text-xl sm:text-3xl text-green-500"></i>
                <p>Farm Fresh Ingredients</p>
              </div>
            </div>
          </div>

          {/* Logo Image */}
          <div className="flex justify-center hero-image">
            <Image
              src="/images/logo.png"
              alt="Y Not Food Products Logo"
              width={300}
              height={400}
              className="w-full max-w-xs sm:max-w-sm lg:max-w-md h-auto"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-5 px-4 fade-up">
          <p className="text-center text-sm sm:text-lg split-text">
            <strong>Y Not Food Products</strong> was founded in 2019 by{" "}
            <strong>Ms. Kanak Lata Deka</strong> and <strong>Mr. Bishnu Deka</strong> in Guwahati,
            the biggest city of Assam. Traditional recipes, farm-sourced ingredients, and our sweet
            nostalgia from the rural kitchen — Y Not products are handcrafted with utmost care and
            love, enabling our customers to eat healthy food.
          </p>

          {/* Buttons */}
          <div className="flex sm:gap-5 gap-0 fade-up">
            <Link href="/Store">
              <button className="bg-amber-500 text-white px-5 py-3 rounded-full hover:shadow-lg duration-700 ease-out hover:shadow-amber-500/50 hover:scale-105 scale-75 sm:scale-100">
                Shop Now
              </button>
            </Link>
            <Link href="/About">
              <button className="border-2 border-amber-500 px-5 py-3 rounded-full duration-700 ease-out hover:bg-amber-500 hover:text-white scale-75 sm:scale-100">
                About Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
