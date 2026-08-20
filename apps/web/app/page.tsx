import { UI_PACKAGE } from "@akouo/ui";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center">
      <h1 className="text-2xl font-semibold text-primary">
        Akouo web — {UI_PACKAGE} wired.
      </h1>
    </main>
  );
}
