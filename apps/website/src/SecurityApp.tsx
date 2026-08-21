import { ThemeProvider } from "@akouo/ui";

import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { SecurityPage } from "./security/SecurityPage";

export default function SecurityApp() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader linkBase="index.html" />
        <main>
          <SecurityPage />
        </main>
        <SiteFooter linkBase="index.html" />
      </div>
    </ThemeProvider>
  );
}
