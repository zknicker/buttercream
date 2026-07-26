import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AgentAvatar, Avatar } from "./avatar.tsx";

describe("Avatar", () => {
  test("renders color, shape, size, and visual variant classes", () => {
    const markup = renderToStaticMarkup(
      <Avatar color="success" shape="circle" size="lg" variant="soft">
        <Avatar.Fallback>AK</Avatar.Fallback>
      </Avatar>,
    );

    expect(markup).toContain("avatar--success");
    expect(markup).toContain("avatar--circle");
    expect(markup).toContain("avatar--lg");
    expect(markup).toContain("avatar--soft");
    expect(markup).toContain("avatar__fallback");
  });

  test("keeps agent initials and status semantics", () => {
    const markup = renderToStaticMarkup(<AgentAvatar name="Ada Lovelace" status="online" />);

    expect(markup).toContain(">AL<");
    expect(markup).toContain("agent-avatar__status--online");
    expect(markup).toContain('aria-label="online"');
    expect(markup).toContain('role="status"');
  });
});
