import chatSource from "./preview-app-chat.tsx?raw";
import dashboardSource from "./preview-app-dashboard.tsx?raw";
import financesSource from "./preview-app-finances.tsx?raw";
import mailSource from "./preview-app-mail.tsx?raw";
import overviewSource from "./preview-app-overview.tsx?raw";
import avatarSource from "./preview-avatar.tsx?raw";
import buttonSource from "./preview-button.tsx?raw";
import cardSource from "./preview-card.tsx?raw";
import chartsSource from "./preview-charts.tsx?raw";
import choiceControlsSource from "./preview-choice-controls.tsx?raw";
import dataSource from "./preview-data.tsx?raw";
import displaySource from "./preview-display.tsx?raw";
import drawerSource from "./preview-drawer.tsx?raw";
import entrySource from "./preview-entry.tsx?raw";
import feedbackSource from "./preview-feedback.tsx?raw";
import fieldsSource from "./preview-fields.tsx?raw";
import formControlsSource from "./preview-form-controls.tsx?raw";
import modalSource from "./preview-modal.tsx?raw";
import navigationSource from "./preview-navigation.tsx?raw";
import popoverSource from "./preview-popover.tsx?raw";
import radioGroupSource from "./preview-radio-group.tsx?raw";
import selectSource from "./preview-select.tsx?raw";
import sidebarSource from "./preview-sidebar.tsx?raw";
import sliderSource from "./preview-slider.tsx?raw";
import { extractSpecimenSnippets } from "./preview-snippets.ts";
import staticSource from "./preview-static.tsx?raw";
import tabsSource from "./preview-tabs.tsx?raw";
import tooltipSource from "./preview-tooltip.tsx?raw";

const previewModules: Record<string, string> = {
  "./preview-app-chat.tsx": chatSource,
  "./preview-app-dashboard.tsx": dashboardSource,
  "./preview-app-finances.tsx": financesSource,
  "./preview-app-mail.tsx": mailSource,
  "./preview-app-overview.tsx": overviewSource,
  "./preview-avatar.tsx": avatarSource,
  "./preview-button.tsx": buttonSource,
  "./preview-card.tsx": cardSource,
  "./preview-charts.tsx": chartsSource,
  "./preview-choice-controls.tsx": choiceControlsSource,
  "./preview-data.tsx": dataSource,
  "./preview-display.tsx": displaySource,
  "./preview-drawer.tsx": drawerSource,
  "./preview-entry.tsx": entrySource,
  "./preview-feedback.tsx": feedbackSource,
  "./preview-fields.tsx": fieldsSource,
  "./preview-form-controls.tsx": formControlsSource,
  "./preview-modal.tsx": modalSource,
  "./preview-navigation.tsx": navigationSource,
  "./preview-popover.tsx": popoverSource,
  "./preview-radio-group.tsx": radioGroupSource,
  "./preview-select.tsx": selectSource,
  "./preview-sidebar.tsx": sidebarSource,
  "./preview-slider.tsx": sliderSource,
  "./preview-static.tsx": staticSource,
  "./preview-tabs.tsx": tabsSource,
  "./preview-tooltip.tsx": tooltipSource,
};

/*
 * The preview pages, as text. `?raw` serves the same file the bundler renders, so the Code view
 * can never drift from the artifact beside it — there is no copy to keep in sync.
 */
const applicationSourcePaths: Record<string, string> = {
  Chat: "./preview-app-chat.tsx",
  Dashboard: "./preview-app-dashboard.tsx",
  Finances: "./preview-app-finances.tsx",
  Mail: "./preview-app-mail.tsx",
  Overview: "./preview-app-overview.tsx",
};
const specimenSources = new Map<string, Readonly<Record<string, string>>>();

export function previewSectionSource(section: string): string | undefined {
  const path = applicationSourcePaths[section];
  return path ? previewModules[path] : undefined;
}

export function previewSpecimenSources(section: string): Readonly<Record<string, string>> {
  const cached = specimenSources.get(section);
  if (cached) {
    return cached;
  }

  const componentName = `${section.replaceAll(/\W/gu, "")}Preview`;
  const source = Object.values(previewModules).find((module) =>
    module.includes(`export function ${componentName}(`),
  );
  const snippets = source ? extractSpecimenSnippets(source, componentName) : {};
  specimenSources.set(section, snippets);
  return snippets;
}
