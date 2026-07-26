import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Tabs } from "./tabs.tsx";

describe("Tabs", () => {
  test("renders an active Base UI tab and matching panel", () => {
    const markup = renderToStaticMarkup(
      <Tabs defaultValue="account">
        <Tabs.List separated>
          <Tabs.Tab value="account">Account</Tabs.Tab>
          <Tabs.Tab value="billing">Billing</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="account">Account settings</Tabs.Panel>
        <Tabs.Panel value="billing">Billing settings</Tabs.Panel>
      </Tabs>,
    );

    expect(markup).toContain('data-slot="tabs"');
    expect(markup).toContain("tabs__list--separated");
    expect(markup).toContain('data-active=""');
    expect(markup).toContain("Account settings");
    expect(markup).not.toContain("Billing settings");
  });
});
