import chatSource from "./preview-app-chat.tsx?raw";
import dashboardSource from "./preview-app-dashboard.tsx?raw";
import financesSource from "./preview-app-finances.tsx?raw";
import mailSource from "./preview-app-mail.tsx?raw";
import overviewSource from "./preview-app-overview.tsx?raw";

/*
 * The preview pages, as text. `?raw` serves the same file the bundler renders, so the Code view
 * can never drift from the artifact beside it — there is no copy to keep in sync.
 */
const sources: Record<string, string> = {
  Chat: chatSource,
  Dashboard: dashboardSource,
  Finances: financesSource,
  Mail: mailSource,
  Overview: overviewSource,
};

export function previewSectionSource(section: string): string | undefined {
  return sources[section];
}
