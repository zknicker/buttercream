import {
  Button,
  Card,
  type CardRootProps,
  type CardVariant,
  Field,
  Input,
  Skeleton,
} from "@buttercream/react";
import type { ReactElement } from "react";
import type { PreviewIconElements } from "./preview-icons.ts";

const VARIANTS: readonly CardVariant[] = ["default", "secondary", "tertiary", "transparent"];

export function CardPreview({ icons }: { icons: PreviewIconElements }): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen">
        <Card className="preview-card">
          <Card.Header>
            {icons.users}&nbsp;<strong>Become an Acme Creator!</strong>
          </Card.Header>
          <Card.Content>
            Visit the Acme Creator Hub to sign up today and start earning credits from your fans and
            followers.
          </Card.Content>
          <Card.Footer>Submissions end Oct 10.</Card.Footer>
        </Card>
        <div className="specimen__label">Header, content, and footer</div>
      </section>
      <section className="specimen">
        <div className="preview-card-grid">
          {VARIANTS.map((variant) => (
            <SpecimenCard
              description={variantDescription(variant)}
              key={variant}
              title={`Variant ${variant}`}
              variant={variant}
            />
          ))}
        </div>
        <div className="specimen__label">Variants</div>
      </section>
      <section className="specimen">
        <Card className="preview-card">
          <Card.Header>
            <div>
              <Card.Title>Weekly digest</Card.Title>
              <Card.Description>A summary of activity across your workspace.</Card.Description>
            </div>
            <Card.Action>
              <Button size="sm" variant="outline">
                Manage
              </Button>
            </Card.Action>
          </Card.Header>
          <Card.Content>
            Title, description, and action slots compose inside the header.
          </Card.Content>
        </Card>
        <div className="specimen__label">Title, description, and action</div>
      </section>
      <section className="specimen">
        <Card
          className="preview-card"
          style={{ flexDirection: "row", overflow: "hidden", padding: 0 }}
        >
          <Skeleton animation="none" style={{ flexShrink: 0, width: "8rem" }} />
          <Card.Content style={{ flexDirection: "column", gap: "0.375rem", padding: "1rem" }}>
            <Card.Title>Field notes</Card.Title>
            <Card.Description>
              A dispatch from the design team, illustrated and ready to read.
            </Card.Description>
          </Card.Content>
        </Card>
        <div className="specimen__label">Horizontal layout</div>
      </section>
      <section className="specimen">
        <Card className="preview-card">
          <Card.Header>
            <div>
              <Card.Title>Sign in</Card.Title>
              <Card.Description>Access your workspace.</Card.Description>
            </div>
          </Card.Header>
          <Card.Content style={{ flexDirection: "column", gap: "0.75rem", width: "100%" }}>
            <Field fullWidth name="card-email">
              <Field.Label>Email</Field.Label>
              <Input placeholder="you@example.com" type="email" />
            </Field>
            <Field fullWidth name="card-password">
              <Field.Label>Password</Field.Label>
              <Input placeholder="••••••••" type="password" />
            </Field>
          </Card.Content>
          <Card.Footer>
            <Button fullWidth>Sign in</Button>
          </Card.Footer>
        </Card>
        <div className="specimen__label">With a form</div>
      </section>
    </div>
  );
}

interface SpecimenCardProps extends CardRootProps {
  description: string;
  title: string;
}

function SpecimenCard({ description, title, ...props }: SpecimenCardProps): ReactElement {
  return (
    <Card {...props}>
      <Card.Header>
        <strong>{title}</strong>
      </Card.Header>
      <Card.Content>{description}</Card.Content>
    </Card>
  );
}

function variantDescription(variant: CardVariant): string {
  if (variant === "transparent") {
    return "No background or shadow, border only.";
  }
  if (variant === "default") {
    return "Surface background with the surface shadow.";
  }
  return `Sits on the ${variant} surface layer.`;
}
