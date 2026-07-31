/*
 * The demos run inside editor plumbing a consumer must not copy: a bounded frame that stands in
 * for the viewport, and portal wiring that redirects popups into it. The code tab projects the
 * consumer's version — no frame, no refs, popups portalling to the body as they would in an app.
 */
function withoutScaffolding(snippet: string): string {
  let code = snippet;

  /* Unwrap the demo frame: the wrapper div is the editor's viewport, not the composition. */
  const frame = /^<div className="sidebar-demo[^"]*"[^>]*>\n(?<inner>[\s\S]*)\n<\/div>$/u.exec(
    code,
  );
  if (frame?.groups?.inner) {
    code = dedent(frame.groups.inner);
  }

  return (
    code
      /* Portal wiring exists so popups clip to the frame; a real app portals to the body. */
      .replaceAll(/\s+portalContainer=\{\w*[Ff]rame\}/gu, "")
      .replaceAll(/\s+container=\{\w*[Ff]rame\}/gu, "")
      .replaceAll(/, container: \w*[Ff]rame/gu, "")
      .replaceAll(/\s+ref=\{set[A-Z]\w*\}/gu, "")
      .replaceAll(/\s+className="sidebar-demo__provider"/gu, "")
      /* The provider may carry authored classes beside the scaffolding one; keep those. */
      .replaceAll(/className="sidebar-demo__provider (?<rest>[^"]+)"/gu, 'className="$<rest>"')
      /* Collapse attributes left alone on their line by the removals above. */
      .replaceAll(/\n\s*\n/gu, "\n")
  );
}

function dedent(source: string): string {
  const lines = source.replace(/^\n/u, "").replace(/\s+$/u, "").split("\n");
  const indentation = lines
    .filter((line) => line.trim().length > 0)
    .reduce((smallest, line) => Math.min(smallest, line.match(/^\s*/u)?.[0].length ?? 0), Infinity);

  if (!Number.isFinite(indentation)) {
    return "";
  }
  return lines.map((line) => line.slice(indentation)).join("\n");
}

/**
 * Pulls the authored JSX from each Specimen in one preview function. The app loads the preview
 * module with Vite's raw query, so the code tab and the component it documents share one source.
 */
export function extractSpecimenSnippets(
  source: string,
  componentName: string,
): Readonly<Record<string, string>> {
  const marker = `export function ${componentName}(`;
  const functionStart = source.indexOf(marker);
  if (functionStart === -1) {
    return {};
  }

  const nextFunction = source.indexOf("\nexport function ", functionStart + marker.length);
  const functionSource = source.slice(
    functionStart,
    nextFunction === -1 ? undefined : nextFunction,
  );
  const snippets: Record<string, string> = {};
  const addSnippet = (props: string, children: string) => {
    const label = /\blabel="(?<label>[^"]+)"/u.exec(props)?.groups?.label;
    if (!label) {
      return;
    }
    if (snippets[label]) {
      throw new Error(`${componentName} has more than one specimen labelled "${label}"`);
    }
    snippets[label] = withoutScaffolding(dedent(children));
  };

  for (const specimen of functionSource.matchAll(
    /<\w*Specimen\b(?<props>[^>]*?)(?<!\/)>(?<children>[\s\S]*?)<\/\w*Specimen>/gu,
  )) {
    addSnippet(specimen.groups?.props ?? "", specimen.groups?.children ?? "");
  }

  for (const specimen of functionSource.matchAll(/<MachineSpecimen\b(?<props>[^>]*)\/>/gu)) {
    addSnippet(specimen.groups?.props ?? "", specimen[0]);
  }

  return snippets;
}
