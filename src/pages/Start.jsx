
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Intro } from "../ui/components/Intro";
import { Start } from "../ui/components/Start";

export default function Home() {
  const [displayView, setDisplayView] = useState("intro");

  return (
    <main className="h-viewport flex flex-col w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {
          {
            intro: (
              <Intro
                onGetStartedClick={() => {
                  setDisplayView("start");
                }}
              />
            ),
            start: <Start />,
          }[displayView]
        }
      </AnimatePresence>
    </main>
  );
}
