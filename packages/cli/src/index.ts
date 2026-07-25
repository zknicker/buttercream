import { Command } from "commander";
import { buildExportUrl, type ExportFormat, parseDesignSystemReference } from "./reference.ts";

const program = new Command()
  .name("buttercream")
  .description("Export Buttercream design systems without modifying local files")
  .version("0.1.0");

program
  .command("export")
  .argument("<design-system>", "Buttercream /ds/:id URL or design-system id")
  .requiredOption("--format <format>", "css, design-md, or json")
  .description("Write one generated design-system artifact to stdout")
  .action(async (designSystem: string, options: { format: string }) => {
    const format = parseFormat(options.format);
    const reference = parseDesignSystemReference(designSystem);
    const response = await fetch(buildExportUrl(reference, format), {
      headers: createHeaders(),
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Export failed (${response.status}): ${detail || response.statusText}`);
    }

    process.stdout.write(await response.text());
  });

await program.parseAsync();

function parseFormat(value: string): ExportFormat {
  if (value === "css" || value === "design-md" || value === "json") {
    return value;
  }
  throw new Error(`Unknown export format: ${value}`);
}

function createHeaders(): Headers {
  const headers = new Headers({
    Accept: "text/plain, application/json",
  });
  const apiKey = process.env.BUTTERCREAM_API_KEY;
  if (apiKey) {
    headers.set("Authorization", `Bearer ${apiKey}`);
  }
  return headers;
}
