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
import { Specimen } from "./preview-specimen.tsx";

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
      <Specimen label="Colors">
        {COLORS.map((color) => (
          <SpecimenAvatar color={color} key={color} name="Ada King" />
        ))}
      </Specimen>
      <Specimen label="Soft variant">
        {COLORS.map((color) => (
          <SpecimenAvatar color={color} key={color} name="Ada King" variant="soft" />
        ))}
      </Specimen>
      <Specimen label="Sizes">
        {SIZES.map((size) => (
          <SpecimenAvatar key={size} name="Sam Moss" size={size} />
        ))}
      </Specimen>
      <Specimen label="Shapes">
        {SHAPES.map((shape) => (
          <SpecimenAvatar key={shape} name="Bea Cole" shape={shape} />
        ))}
      </Specimen>
      <Specimen label="Fallback content">
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
      </Specimen>
      <Specimen label="Agent status">
        <AgentAvatar name="Ada King" status="online" />
        <AgentAvatar color="accent" name="Max North" status="busy" />
        <AgentAvatar name="Jo Lane" status="offline" variant="soft" />
      </Specimen>
    </div>
  );
}
