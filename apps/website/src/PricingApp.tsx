import { ThemeProvider } from "@akouo/ui";

import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { PricingPage } from "./pricing/PricingPage";

export default function PricingApp() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader linkBase="index.html" />
        <main>
          <PricingPage />
        </main>
        <SiteFooter linkBase="index.html" />
      </div>
    </ThemeProvider>
  );
}
