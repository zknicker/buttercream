"use client";

import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

export type AvatarSize = "sm" | "md" | "lg";
export type AvatarColor = "default" | "accent" | "success" | "warning" | "danger";
export type AvatarShape = "square" | "rounded" | "circle";
export type AvatarVariant = "solid" | "soft";

export interface AvatarRootProps extends Omit<BaseAvatar.Root.Props, "className" | "color"> {
  className?: string;
  color?: AvatarColor;
  shape?: AvatarShape;
  size?: AvatarSize;
  variant?: AvatarVariant;
}

function AvatarRoot({
  className,
  color = "default",
  shape = "rounded",
  size = "md",
  variant = "solid",
  ...props
}: AvatarRootProps): ReactElement {
  return (
    <BaseAvatar.Root
      className={classes(
        "avatar",
        color !== "default" && `avatar--${color}`,
        size !== "md" && `avatar--${size}`,
        shape !== "rounded" && `avatar--${shape}`,
        variant !== "solid" && `avatar--${variant}`,
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: Omit<BaseAvatar.Image.Props, "className"> & { className?: string }): ReactElement {
  return <BaseAvatar.Image className={classes("avatar__image", className)} {...props} />;
}

function AvatarFallback({
  className,
  ...props
}: Omit<BaseAvatar.Fallback.Props, "className"> & { className?: string }): ReactElement {
  return <BaseAvatar.Fallback className={classes("avatar__fallback", className)} {...props} />;
}

export const Avatar = Object.assign(AvatarRoot, {
  Fallback: AvatarFallback,
  Image: AvatarImage,
});

export interface AgentAvatarProps extends AvatarRootProps {
  imageUrl?: string;
  name: string;
  status?: "offline" | "online" | "busy";
}

export function AgentAvatar({
  imageUrl,
  name,
  status = "offline",
  ...props
}: AgentAvatarProps): ReactElement {
  const initials = name
    .split(/\s+/u)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <span className="agent-avatar">
      <Avatar aria-label={name} {...props}>
        {imageUrl ? <Avatar.Image alt="" src={imageUrl} /> : null}
        <Avatar.Fallback>{initials || "AI"}</Avatar.Fallback>
      </Avatar>
      <span
        aria-label={status}
        className={classes("agent-avatar__status", `agent-avatar__status--${status}`)}
        role="status"
      />
    </span>
  );
}
