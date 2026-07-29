import type { ReactElement } from "react";

/*
 * Per-component reference docs rendered beneath the specimens on a component page. Like the
 * guides page, this is the design system explaining itself, so it renders inside the themed
 * surface with plain markup — the reader sees the docs typeset in their own system.
 */

export interface DocProp {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
}

export interface DocClass {
  name: string;
  description: string;
}

/** One prop table. Compound components carry one group per part. */
export interface DocApiGroup {
  component: string;
  props: DocProp[];
}

export interface ComponentDoc {
  /** When and how to use the component, phrased against our API. */
  usage: string;
  /** A minimal JSX example, shown verbatim in a mono block. */
  example?: string;
  api: DocApiGroup[];
  /** Public BEM classes custom CSS may target, mirroring HeroUI's per-component styling docs. */
  classes: DocClass[];
}

function PropsTable({ props }: { props: DocProp[] }): ReactElement {
  return (
    <div className="docs__scroll">
      <table className="docs__table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name}>
              <td>
                <code>{prop.name}</code>
              </td>
              <td>
                <code>{prop.type}</code>
              </td>
              <td>{prop.defaultValue ? <code>{prop.defaultValue}</code> : "—"}</td>
              <td>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ComponentDocsPanel({ doc }: { doc: ComponentDoc }): ReactElement {
  return (
    <div className="docs">
      <section>
        <h3 className="docs__title">Usage</h3>
        <p className="docs__lede">{doc.usage}</p>
        {doc.example ? <pre className="docs__code">{doc.example}</pre> : null}
      </section>
      {doc.api.length > 0 ? (
        <section>
          <h3 className="docs__title">API</h3>
          {doc.api.map((group) => (
            <div className="docs__group" key={group.component}>
              {doc.api.length > 1 ? <h4 className="docs__part">{group.component}</h4> : null}
              <PropsTable props={group.props} />
            </div>
          ))}
        </section>
      ) : null}
      {doc.classes.length > 0 ? (
        <section>
          <h3 className="docs__title">Styling</h3>
          <p className="docs__lede">
            Custom CSS can target these classes. They are the component's public contract; anything
            prefixed <code>--bc-</code> is private.
          </p>
          <div className="docs__scroll">
            <table className="docs__table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Applies to</th>
                </tr>
              </thead>
              <tbody>
                {doc.classes.map((entry) => (
                  <tr key={entry.name}>
                    <td>
                      <code>{entry.name}</code>
                    </td>
                    <td>{entry.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </div>
  );
}
