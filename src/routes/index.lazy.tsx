import { createLazyFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Welcome from "../components/Welcome";
import Navbar from "../components/Navbar";
import AnimatedBackground from "../components/AnimatedBackground";
import Home from "../components/Home";
import About from "../components/About";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [showWelcome, setShowWelcome] = useState(true);
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <Welcome onLoadingComplete={() => setShowWelcome(false)} />
        ) : null}
      </AnimatePresence>

      {!showWelcome ? (
        <>
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
        </>
      ) : null}
    </>
  );
}
