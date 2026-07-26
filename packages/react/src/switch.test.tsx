import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Switch } from "./switch.tsx";

describe("Switch", () => {
  test("renders Base UI state with Buttercream classes", () => {
    const markup = renderToStaticMarkup(
      <Switch defaultChecked name="notifications" size="lg">
        Notifications
      </Switch>,
    );

    expect(markup).toContain('data-slot="switch"');
    expect(markup).toContain("switch--lg");
    expect(markup).toContain('data-checked=""');
    expect(markup).toContain('name="notifications"');
  });
});
