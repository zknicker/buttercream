import { Avatar, ScrollShadow } from "@buttercream/react";
import type { ReactElement } from "react";
import type { PreviewIconElements } from "./preview-icons.ts";
import { Specimen } from "./preview-specimen.tsx";

/*
 * ScrollShadow specimens. Each frame is deliberately smaller than its content, so the fade
 * appears on whichever edges still have rows past them and the hidden scrollbar earns its keep.
 */

const PEOPLE = [
  "Ada Lovelace",
  "Alan Turing",
  "Grace Hopper",
  "Katherine Johnson",
  "Margaret Hamilton",
  "Edsger Dijkstra",
  "Barbara Liskov",
  "Donald Knuth",
  "Radia Perlman",
  "Ken Thompson",
  "Frances Allen",
  "Dennis Ritchie",
];

export function ScrollShadowPreview({ icons }: { icons: PreviewIconElements }): ReactElement {
  return (
    <div className="specimens">
      <Specimen className="specimen--stack" label="Vertical — scrollbar hidden, edges fade">
        <ScrollShadow className="scroll-demo" hideScrollBar>
          {PEOPLE.map((name) => (
            <div className="scroll-demo__row" key={name}>
              <Avatar shape="circle" size="sm" variant="soft">
                <Avatar.Fallback>
                  {name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </Avatar.Fallback>
              </Avatar>
              <span>{name}</span>
            </div>
          ))}
        </ScrollShadow>
      </Specimen>

      <Specimen className="specimen--stack" label="Horizontal — the same fade, sideways">
        <ScrollShadow
          className="scroll-demo scroll-demo--row"
          hideScrollBar
          orientation="horizontal"
        >
          {PEOPLE.map((name) => (
            <div className="scroll-demo__card" key={name}>
              {icons.users}
              <span>{name}</span>
            </div>
          ))}
        </ScrollShadow>
      </Specimen>

      <Specimen className="specimen--stack" label="Visible scrollbar — the fade works alone">
        <ScrollShadow className="scroll-demo">
          {PEOPLE.map((name) => (
            <div className="scroll-demo__row" key={name}>
              <Avatar shape="circle" size="sm" variant="soft">
                <Avatar.Fallback>
                  {name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </Avatar.Fallback>
              </Avatar>
              <span>{name}</span>
            </div>
          ))}
        </ScrollShadow>
      </Specimen>
    </div>
  );
}
