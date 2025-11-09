"use client"; // important for Next.js to run this component on the client

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Footer from "../Components/footer.js";
import Nav from "../Components/nav.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef(null);

  useEffect(() => {
    if (!aboutRef.current) return;

    const ctx = gsap.context(() => {
      // Fade-up animation for all sections with stagger
      gsap.from(".animate-section", {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Nav />
      <div ref={aboutRef} className="flex flex-col items-center justify-center pt-10 w-full">

        {/* Heading Section */}
        <div className="flex flex-col items-center animate-section px-4 text-center">
          <h2 className="font-bold sm:text-4xl text-3xl mb-3">Y Not Food Products</h2>
          <p className="sm:w-2/3 w-full">
            Not just a food product but a flavor of culture, authenticity of tradition, and purity of nature.
            Our Food Products focus on the traditional process of preparing and preserving. Every product is unique in its way.
            The ingredients used in making the products are grown in the chemical-free hills of North East India.
            We directly purchase our raw materials from local farmers to ensure an organic process. It’s not just nature, but the right people to believe and associate with in our journey of growth.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="flex justify-evenly mt-10 w-full flex-col sm:flex-row animate-section px-4">
          <div className="w-full sm:w-96 mb-5 sm:mb-0">
            <h2 className="font-bold text-2xl mb-3 text-amber-500 border-b-2 pb-2 w-fit">Vision</h2>
            <p>Our vision is to make an authentic brand and provide the best of the product and taste to the world.</p>
          </div>

          <div className="w-full sm:w-96">
            <h2 className="font-bold text-2xl mb-3 text-amber-500 border-b-2 pb-2 w-fit">Mission</h2>
            <p>Our mission is to create brand value for our product and showcase the rich diversity and beauty of Northeast India.</p>
          </div>
        </div>

        {/* Core Values */}
        <div className="sm:w-2/3 w-full mt-10 px-4 animate-section">
          <h2 className="font-bold text-2xl mb-3 text-amber-500 border-b-2 pb-2">Our Core Values</h2>
          <p>
            Healthy food is not always boring or bland. Y Not aims to create tastes that leave an impact you can cherish for life.
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>CUSTOMER FIRST: We value our customers and create products for them.</li>
            <li>AUTHENTIC: It's a family affair.</li>
            <li>QUALITY: Only the best ingredients are used.</li>
          </ul>
        </div>

        {/* Power Section */}
        <div className="flex items-center justify-evenly sm:w-11/12 w-full flex-col-reverse sm:flex-row mt-10 animate-section px-4 gap-5">
          <div className="sm:w-96 w-full">
            <h2 className="font-bold text-2xl mb-3 text-amber-500 border-b-2 pb-2">The Best Select Of Your Power</h2>
            <p>Y Not products create tastes which leave an impact on you which you can cherish for life.</p>
            <ul className="list-disc pl-5 mt-2">
              <li>100% Natural</li>
              <li>No preservatives</li>
              <li>Food safety certification (FSSAI)</li>
              <li>No growth hormones</li>
            </ul>
          </div>
          <Image src="/images/logo.png" alt="Logo" width={400} height={500} />
        </div>

        {/* Founders */}
        <div className="flex justify-evenly my-10 gap-10 flex-col sm:flex-row animate-section px-4">
          <div className="sm:w-96 w-full flex flex-col items-center bg-orange-50 border-2 border-amber-500 p-5 rounded-lg">
            <Image src="/images/Kanak-Deka.png" alt="Kanak Deka" width={150} height={150} />
            <h2 className="font-bold text-2xl text-center text-amber-500 mt-2">Kanak Deka</h2>
            <h3 className="text-lg mb-3 text-center font-bold border-b-2">Founder</h3>
            <p className="text-center">Born in Assam, Kanak has a great interest in Northeast's magical food culture and the aromatic flavours of its spices. After her graduation, she worked in corporate sectors for more than 10 years before starting Y Not Food Products.</p>
          </div>

          <div className="sm:w-96 w-full flex flex-col items-center bg-orange-50 border-2 border-amber-500 p-5 rounded-lg">
            <Image src="/images/Bhishnu-Deka.png" alt="Bishnu Deka" width={150} height={150} />
            <h2 className="font-bold text-2xl text-center text-amber-500 mt-2">Bishnu Deka</h2>
            <h3 className="text-lg mb-3 text-center font-bold border-b-2">Founder</h3>
            <p className="text-center">Bishnu Deka is a well-known Entrepreneur in Assam with a vision to grow the food industry and promote Northeast India's magical products globally.</p>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
