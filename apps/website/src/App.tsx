import { ThemeProvider } from "@akouo/ui";

import { Hero } from "./Hero";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { CtaSection } from "./sections/CtaSection";
import { DesktopRecording } from "./sections/DesktopRecording";
import { Features } from "./sections/Features";
import { HowItWorks } from "./sections/HowItWorks";
import { Preview } from "./sections/Preview";

export default function App() {
  return (
    <ThemeProvider>
      <div id="top" className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main>
          <Hero />
          <Features />
          <DesktopRecording />
          <HowItWorks />
          <Preview />
          <CtaSection />
        </main>
        <SiteFooter />
      </div>
    </ThemeProvider>
  );
}
