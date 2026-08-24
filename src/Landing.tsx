import { useRevealOnScroll } from "./lib/reveal";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Stats from "./components/Stats";
import Features from "./components/Features";
import InstallSection from "./components/InstallSection";
import DownloadSection from "./components/DownloadSection";
import Portal from "./components/Portal";
import SiteFooter from "./components/SiteFooter";

export default function Landing() {
  useRevealOnScroll();

  return (
    <>
      <div className="noise" aria-hidden="true"></div>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Features />
        <InstallSection />
        <DownloadSection />
        <Portal />
      </main>
      <SiteFooter />
    </>
  );
}
