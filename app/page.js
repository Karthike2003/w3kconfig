// app/page.js (or wherever your main component is)

"use client";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';

import { AnimatePresence } from "framer-motion";
import Preloader from "../components/Preloader";
import Navbar from "../components/NavBar/Navbar";
import dynamic from "next/dynamic";
import Timer from "@/components/Timer/timer";
import { RegisterPage } from "@/components/Register";
import Paragraph from "@/components/Event-description/Paragraph";
import Word from "@/components/Event-description/Word";
import Character from "@/components/Event-description/Character";

const paragraph = "Gm GM, listen up! This site’s got all the deets on the event—speakers, location, date, all that jazz. But, you gotta hunt for it, fam!Happy Digging First hint: All the secrets are buried deep in the console.";

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const words = paragraph.split(" ");
  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 5000);
    })();
  }, []);

  console.log("/speaker");

  // Check the path to render the Timer component
  if (pathname === '/timer') {
    return (
      <div className="h-screen">
        <Timer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black pb-24">
      <Navbar />
      <main className="flex-grow items-center justify-center">
        <AnimatePresence mode="wait">
          {isLoading && <Preloader />}
        </AnimatePresence>
        <Scene />
      </main>
      <Word paragraph={paragraph} />
      <div className="mt-20"></div>
      {/* <Treasurehunt /> */}
      {/* <Timer /> */}
    </div>
  );
}
