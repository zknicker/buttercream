import {
  AgentAvatar,
  Avatar,
  type AvatarColor,
  type AvatarRootProps,
  type AvatarShape,
  type AvatarSize,
} from "@buttercream/react";
import type { ReactElement } from "react";
import type { PreviewIconElements } from "./preview-icons.ts";

const COLORS: readonly AvatarColor[] = ["default", "accent", "success", "warning", "danger"];
const SIZES: readonly AvatarSize[] = ["sm", "md", "lg"];
const SHAPES: readonly AvatarShape[] = ["square", "rounded", "circle"];

function initials(name: string): string {
  return name
    .split(/\s+/u)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function SpecimenAvatar({
  name,
  ...props
}: Omit<AvatarRootProps, "children"> & { name: string }): ReactElement {
  return (
    <Avatar aria-label={name} {...props}>
      <Avatar.Fallback>{initials(name)}</Avatar.Fallback>
    </Avatar>
  );
}

export function AvatarPreview({ icons }: { icons: PreviewIconElements }): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen">
        {COLORS.map((color) => (
          <SpecimenAvatar color={color} key={color} name="Ada King" />
        ))}
        <div className="specimen__label">Colors</div>
      </section>
      <section className="specimen">
        {COLORS.map((color) => (
          <SpecimenAvatar color={color} key={color} name="Ada King" variant="soft" />
        ))}
        <div className="specimen__label">Soft variant</div>
      </section>
      <section className="specimen">
        {SIZES.map((size) => (
          <SpecimenAvatar key={size} name="Sam Moss" size={size} />
        ))}
        <div className="specimen__label">Sizes</div>
      </section>
      <section className="specimen">
        {SHAPES.map((shape) => (
          <SpecimenAvatar key={shape} name="Bea Cole" shape={shape} />
        ))}
        <div className="specimen__label">Shapes</div>
      </section>
      <section className="specimen">
        <Avatar aria-label="Bea Cole">
          <Avatar.Fallback>{icons.users}</Avatar.Fallback>
        </Avatar>
        <Avatar aria-label="Guest" color="accent" variant="soft">
          <Avatar.Fallback>{icons.users}</Avatar.Fallback>
        </Avatar>
        <Avatar aria-label="Sam Moss">
          <Avatar.Image alt="" src="https://broken.example/avatar.jpg" />
          <Avatar.Fallback>SM</Avatar.Fallback>
        </Avatar>
        <div className="specimen__label">Fallback content</div>
      </section>
      <section className="specimen">
        <AgentAvatar name="Ada King" status="online" />
        <AgentAvatar color="accent" name="Max North" status="busy" />
        <AgentAvatar name="Jo Lane" status="offline" variant="soft" />
        <div className="specimen__label">Agent status</div>
      </section>
    </div>
  );
}
