const productionOrigin = "https://buttercream.studio";

export type ExportFormat = "css" | "design-md" | "json";

export interface DesignSystemReference {
  id: string;
  origin: string;
}

export function parseDesignSystemReference(value: string): DesignSystemReference {
  if (!value.includes("://")) {
    return {
      id: validateId(value),
      origin: productionOrigin,
    };
  }

  const url = new URL(value);
  const match = /^\/ds\/([^/]+)\/?$/u.exec(url.pathname);
  if (!match?.[1]) {
    throw new Error("Expected a Buttercream design-system URL shaped like /ds/:id");
  }

  return {
    id: validateId(match[1]),
    origin: url.origin,
  };
}

export function buildExportUrl(reference: DesignSystemReference, format: ExportFormat): URL {
  return new URL(
    `/api/design-systems/${encodeURIComponent(reference.id)}/exports/${format}`,
    reference.origin,
  );
}

function validateId(value: string): string {
  const id = value.trim();
  if (!id || id.includes("/")) {
    throw new Error("Design-system id must be one non-empty path segment");
  }
  return id;
}
