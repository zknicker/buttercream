import {
  createContext,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  useContext,
  useId,
  useState,
} from "react";

type SpecimenView = "Preview" | "Code";

const SpecimenSourcesContext = createContext<Readonly<Record<string, string>>>({});

export function SpecimenSources({
  children,
  sources,
}: {
  children: ReactNode;
  sources: Readonly<Record<string, string>>;
}): ReactElement {
  return (
    <SpecimenSourcesContext.Provider value={sources}>{children}</SpecimenSourcesContext.Provider>
  );
}

export interface SpecimenProps extends HTMLAttributes<HTMLElement> {
  label: string;
}

/**
 * One component specimen and its authored source. The preview remains mounted while its code is
 * visible, preserving controlled values and other demo state when the reader switches back.
 */
export function Specimen({ children, className, label, ...props }: SpecimenProps): ReactElement {
  const [view, setView] = useState<SpecimenView>("Preview");
  const source = useContext(SpecimenSourcesContext)[label];
  const id = useId();
  const previewPanelId = `${id}-preview`;
  const codePanelId = `${id}-code`;
  const classes = ["specimen", className].filter(Boolean).join(" ");

  return (
    <section {...props} className={classes}>
      <div className="specimen__label">{label}</div>
      {source ? (
        <div aria-label={`${label} view`} className="specimen__view-toggle" role="tablist">
          {(["Preview", "Code"] as const).map((option) => (
            <button
              aria-controls={option === "Preview" ? previewPanelId : codePanelId}
              aria-selected={view === option}
              key={option}
              onClick={() => setView(option)}
              role="tab"
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
      <div
        className="specimen__preview"
        hidden={view !== "Preview"}
        id={previewPanelId}
        role="tabpanel"
      >
        {children}
      </div>
      {source && view === "Code" ? (
        <pre className="specimen__code" id={codePanelId} role="tabpanel">
          <code>{source}</code>
        </pre>
      ) : null}
    </section>
  );
}
