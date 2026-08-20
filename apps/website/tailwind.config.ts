import type { Config } from "tailwindcss";
import preset from "@akouo/theme/preset";

/**
 * Website Tailwind config — extends the shared Akouo preset so the marketing
 * site draws from the same tokens as the app and desktop shells.
 */
export default {
  presets: [preset],
} satisfies Config;
