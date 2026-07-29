import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Kbd } from "./kbd.tsx";

describe("Kbd", () => {
  test("renders plain children unchanged", () => {
    const markup = renderToStaticMarkup(<Kbd>⌘ K</Kbd>);

    expect(markup).toContain('class="kbd"');
    expect(markup).toContain(">⌘ K<");
    expect(markup).not.toContain("kbd__abbr");
  });

  test("renders a single named key as a symbol before children", () => {
    const markup = renderToStaticMarkup(<Kbd keys="command">K</Kbd>);

    expect(markup).toContain('class="kbd__abbr"');
    expect(markup).toContain('title="Command"');
    expect(markup).toContain(">⌘<");
    expect(markup).toContain(">K<");
  });

  test("renders a chord of named keys in order", () => {
    const markup = renderToStaticMarkup(<Kbd keys={["command", "shift"]}>K</Kbd>);

    const command = markup.indexOf(">⌘<");
    const shift = markup.indexOf(">⇧<");

    expect(command).toBeGreaterThan(-1);
    expect(shift).toBeGreaterThan(command);
  });

  test("renders keys with no children", () => {
    const markup = renderToStaticMarkup(<Kbd keys="up" />);

    expect(markup).toContain('title="Up"');
    expect(markup).toContain(">↑<");
  });

  test("renders the light variant class", () => {
    const markup = renderToStaticMarkup(
      <Kbd keys="escape" variant="light">
        Esc
      </Kbd>,
    );

    expect(markup).toContain('class="kbd kbd--light"');
  });

  test("forwards className and native kbd attributes", () => {
    const markup = renderToStaticMarkup(<Kbd className="custom">Esc</Kbd>);

    expect(markup).toContain('class="kbd custom"');
    expect(markup).toContain('data-slot="kbd"');
  });
});
