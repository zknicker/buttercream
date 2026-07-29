import {
  Accordion,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Chip,
  Combobox,
  Dropdown,
  ErrorMessage,
  Field,
  Pagination,
  ToggleButton,
  Toolbar,
} from "@buttercream/react";
import type { DesignSystem } from "@buttercream/theme-core";
import { Fragment, type ReactElement, useState } from "react";
import { createPreviewIconElements } from "./preview-icons.ts";
import { Specimen } from "./preview-specimen.tsx";
import { usePreviewSurface } from "./preview-surface.tsx";

/* The reference's own copy, so the two pages can be read side by side. */
const FAQ = [
  {
    answer:
      "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
    icon: "cart" as const,
    question: "How do I place an order?",
  },
  {
    answer:
      "Yes, you can modify or cancel your order before it's shipped. Once your order is processed, you can't make changes.",
    icon: "receipt" as const,
    question: "Can I modify or cancel my order?",
  },
  {
    answer: "We accept all major credit cards, including Visa, Mastercard, and American Express.",
    icon: "card" as const,
    question: "What payment methods do you accept?",
  },
  {
    answer:
      "Shipping costs vary based on your location and the size of your order. We offer free shipping for orders over $50.",
    icon: "box" as const,
    question: "How much does shipping cost?",
  },
  {
    answer:
      "Yes, we ship to most countries. Please check our shipping rates and policies for more information.",
    icon: "globe" as const,
    question: "Do you ship internationally?",
  },
  {
    answer:
      "If you're not satisfied with your purchase, you can request a refund within 30 days of purchase. Please contact our customer support team for assistance.",
    icon: "refund" as const,
    question: "How do I request a refund?",
  },
];

/* Its own set for the multiple-expanded example, with the product name swapped for ours. */
const DOCS = [
  {
    answer:
      "Learn the basics of Buttercream and how to integrate it into your React project. This section covers installation, setup, and your first component.",
    question: "Getting Started",
  },
  {
    answer:
      "Understand the fundamental concepts behind Buttercream, including the compound component pattern, styling with Tailwind CSS, and accessibility features.",
    question: "Core Concepts",
  },
  {
    answer:
      "Explore advanced features like custom variants, theme customization, and integration with other libraries in your React ecosystem.",
    question: "Advanced Usage",
  },
];

const ANIMALS = ["Aardvark", "Cat", "Dog", "Kangaroo", "Panda", "Snake"];

const COUNTRIES = [
  { items: ["United States", "Canada", "Mexico"], value: "North America" },
  { items: ["United Kingdom", "France", "Germany"], value: "Europe" },
];

/* Its own shorter list, two of them unselectable. */
const PETS = [
  { disabled: false, name: "Dog" },
  { disabled: true, name: "Cat" },
  { disabled: false, name: "Bird" },
  { disabled: true, name: "Kangaroo" },
];
const PET_NAMES = PETS.map((pet) => pet.name);

/* value/onValueChange already pass through the root; two buttons drive it externally. */
function ControlledAccordionDemo(): ReactElement {
  const [value, setValue] = useState<string[]>(["Getting Started"]);

  return (
    <>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button
          onClick={() => setValue(DOCS.map((entry) => entry.question))}
          size="sm"
          variant="secondary"
        >
          Expand all
        </Button>
        <Button onClick={() => setValue([])} size="sm" variant="ghost">
          Collapse all
        </Button>
      </div>
      <Accordion className="preview-block" multiple onValueChange={setValue} value={value}>
        {DOCS.map((entry) => (
          <Accordion.Item key={entry.question} value={entry.question}>
            <Accordion.Trigger>{entry.question}</Accordion.Trigger>
            <Accordion.Panel>{entry.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
}

export function AccordionPreview({ icons }: { icons: DesignSystem["icons"] }): ReactElement {
  const icon = createPreviewIconElements(icons);

  return (
    <div className="specimens">
      <Specimen className="specimen--stack" label="Default">
        <Accordion className="preview-block">
          {FAQ.map((entry) => (
            <Accordion.Item key={entry.question} value={entry.question}>
              <Accordion.Trigger>
                {icon[entry.icon]}
                {entry.question}
              </Accordion.Trigger>
              <Accordion.Panel>{entry.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Specimen>
      <Specimen className="specimen--stack" label="Surface">
        <Accordion className="preview-block" variant="surface">
          {FAQ.map((entry) => (
            <Accordion.Item key={entry.question} value={entry.question}>
              <Accordion.Trigger>
                {icon[entry.icon]}
                {entry.question}
              </Accordion.Trigger>
              <Accordion.Panel>{entry.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Specimen>
      <Specimen className="specimen--stack" label="Multiple expanded">
        {/* `multiple` lets more than one panel stay open at a time. */}
        <Accordion className="preview-block" defaultValue={["Getting Started"]} multiple>
          {DOCS.map((entry) => (
            <Accordion.Item key={entry.question} value={entry.question}>
              <Accordion.Trigger>{entry.question}</Accordion.Trigger>
              <Accordion.Panel>{entry.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Specimen>
      <Specimen className="specimen--stack" label="Disabled">
        <Accordion className="preview-block">
          {["Disabled Item 1", "Disabled Item 2"].map((label) => (
            <Accordion.Item disabled key={label} value={label}>
              <Accordion.Trigger>{label}</Accordion.Trigger>
              <Accordion.Panel>Content</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Specimen>
      <Specimen className="specimen--stack" label="Controlled">
        <ControlledAccordionDemo />
      </Specimen>
      <Specimen className="specimen--stack" label="Custom indicator">
        {/* The chevron is only the default; `indicator` on Trigger swaps it for anything. */}
        <Accordion className="preview-block">
          {FAQ.slice(0, 3).map((entry) => (
            <Accordion.Item key={entry.question} value={entry.question}>
              <Accordion.Trigger indicator={icon.add}>{entry.question}</Accordion.Trigger>
              <Accordion.Panel>{entry.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Specimen>
      <Specimen className="specimen--stack" label="Grouped FAQ">
        {/* Two independent accordions under their own headings, a common FAQ page shape. */}
        <div style={{ display: "grid", gap: "1rem", width: "100%" }}>
          <div>
            <p style={{ fontSize: "0.8125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Ordering
            </p>
            <Accordion className="preview-block">
              {FAQ.slice(0, 2).map((entry) => (
                <Accordion.Item key={entry.question} value={entry.question}>
                  <Accordion.Trigger>{entry.question}</Accordion.Trigger>
                  <Accordion.Panel>{entry.answer}</Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
          <div>
            <p style={{ fontSize: "0.8125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Shipping
            </p>
            <Accordion className="preview-block">
              {FAQ.slice(3, 5).map((entry) => (
                <Accordion.Item key={entry.question} value={entry.question}>
                  <Accordion.Trigger>{entry.question}</Accordion.Trigger>
                  <Accordion.Panel>{entry.answer}</Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>
      </Specimen>
    </div>
  );
}

export function BreadcrumbsPreview(): ReactElement {
  return (
    <div className="specimens">
      <Specimen label="Default">
        <Breadcrumbs>
          <Breadcrumbs.Item href="#home">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="#products">Products</Breadcrumbs.Item>
          <Breadcrumbs.Item href="#electronics">Electronics</Breadcrumbs.Item>
          <Breadcrumbs.Item current href="#laptop">
            Laptop
          </Breadcrumbs.Item>
        </Breadcrumbs>
      </Specimen>
      <Specimen label="Two levels">
        <Breadcrumbs>
          <Breadcrumbs.Item href="#home">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item current href="#current">
            Current Page
          </Breadcrumbs.Item>
        </Breadcrumbs>
      </Specimen>
      <Specimen label="Three levels">
        <Breadcrumbs>
          <Breadcrumbs.Item href="#home">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="#category">Category</Breadcrumbs.Item>
          <Breadcrumbs.Item current href="#current">
            Current Page
          </Breadcrumbs.Item>
        </Breadcrumbs>
      </Specimen>
      <Specimen label="Custom separator">
        <Breadcrumbs separator={<span className="breadcrumbs__separator">/</span>}>
          <Breadcrumbs.Item href="#home">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="#products">Products</Breadcrumbs.Item>
          <Breadcrumbs.Item href="#electronics">Electronics</Breadcrumbs.Item>
          <Breadcrumbs.Item current href="#laptop">
            Laptop
          </Breadcrumbs.Item>
        </Breadcrumbs>
      </Specimen>
      <Specimen label="Disabled">
        <Breadcrumbs>
          <Breadcrumbs.Item disabled>Home</Breadcrumbs.Item>
          <Breadcrumbs.Item disabled>Products</Breadcrumbs.Item>
          <Breadcrumbs.Item disabled>Electronics</Breadcrumbs.Item>
          <Breadcrumbs.Item disabled>Laptop</Breadcrumbs.Item>
        </Breadcrumbs>
      </Specimen>
      <Specimen label="Styled">
        {/* The trail takes a class like any other element; here it just opens the gaps up. */}
        <Breadcrumbs className="breadcrumbs-roomy">
          <Breadcrumbs.Item href="#home">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item current>Current</Breadcrumbs.Item>
        </Breadcrumbs>
      </Specimen>
    </div>
  );
}

const PAGINATION_TOTAL_PAGES = 20;

/*
 * A page window (first, last, current, and its neighbours) computed from plain `page` state,
 * with Pagination.Ellipsis dropped in wherever the window skips a run of pages.
 */
function ControlledPaginationDemo(): ReactElement {
  const [page, setPage] = useState(1);
  const pageWindow = [...new Set([1, page - 1, page, page + 1, PAGINATION_TOTAL_PAGES])]
    .filter((value) => value >= 1 && value <= PAGINATION_TOTAL_PAGES)
    .sort((a, b) => a - b);

  return (
    <Pagination summary={`Page ${page} of ${PAGINATION_TOTAL_PAGES}`}>
      <Pagination.Link
        disabled={page === 1}
        nav
        onClick={() => setPage((current) => Math.max(1, current - 1))}
      >
        Previous
      </Pagination.Link>
      {pageWindow.map((value, index) => {
        const previous = pageWindow[index - 1];
        return (
          <Fragment key={value}>
            {previous !== undefined && value - previous > 1 ? <Pagination.Ellipsis /> : null}
            <Pagination.Link current={value === page} onClick={() => setPage(value)}>
              {value}
            </Pagination.Link>
          </Fragment>
        );
      })}
      <Pagination.Link
        disabled={page === PAGINATION_TOTAL_PAGES}
        nav
        onClick={() => setPage((current) => Math.min(PAGINATION_TOTAL_PAGES, current + 1))}
      >
        Next
      </Pagination.Link>
    </Pagination>
  );
}

export function PaginationPreview({ icons }: { icons: DesignSystem["icons"] }): ReactElement {
  const icon = createPreviewIconElements(icons);
  /* The reference leads each worded arrow with a chevron; the numbers stay bare. */
  const previous = (
    <Pagination.Link disabled nav>
      <span aria-hidden className="pagination__chevron pagination__chevron--previous" />
      Previous
    </Pagination.Link>
  );
  const next = (
    <Pagination.Link nav>
      Next
      <span aria-hidden className="pagination__chevron pagination__chevron--next" />
    </Pagination.Link>
  );
  const pages = (
    <>
      {previous}
      <Pagination.Link>1</Pagination.Link>
      <Pagination.Link current>2</Pagination.Link>
      <Pagination.Link>3</Pagination.Link>
      {next}
    </>
  );

  return (
    <div className="specimens">
      <Specimen className="specimen--stack" label="Default">
        <Pagination>{pages}</Pagination>
      </Specimen>
      <Specimen className="specimen--stack" label="Sizes">
        {/* Labelled per row, since the three sizes are otherwise hard to tell apart. */}
        <div className="pagination-sizes">
          <span className="pagination-sizes__label">Sm</span>
          <Pagination size="sm">{pages}</Pagination>
          <span className="pagination-sizes__label">Md</span>
          <Pagination>{pages}</Pagination>
          <span className="pagination-sizes__label">Lg</span>
          <Pagination size="lg">{pages}</Pagination>
        </div>
      </Specimen>
      <Specimen className="specimen--stack" label="With ellipsis">
        <Pagination>
          {previous}
          <Pagination.Link>1</Pagination.Link>
          <Pagination.Link current>2</Pagination.Link>
          <Pagination.Ellipsis />
          <Pagination.Link>12</Pagination.Link>
          {next}
        </Pagination>
      </Specimen>
      <Specimen className="specimen--stack" label="Previous and next only">
        <Pagination summary="1 to 5 of 50 invoices">
          <Pagination.Link disabled nav>
            Prev
          </Pagination.Link>
          <Pagination.Link nav>Next</Pagination.Link>
        </Pagination>
      </Specimen>
      <Specimen className="specimen--stack" label="Custom icons">
        <Pagination>
          <Pagination.Link disabled nav>
            {icon.close}
            Back
          </Pagination.Link>
          <Pagination.Link>1</Pagination.Link>
          <Pagination.Link current>2</Pagination.Link>
          <Pagination.Link>3</Pagination.Link>
          <Pagination.Link nav>
            Forward
            {icon.add}
          </Pagination.Link>
        </Pagination>
      </Specimen>
      <Specimen className="specimen--stack" label="Disabled">
        <Pagination>
          <Pagination.Link disabled nav>
            <span aria-hidden className="pagination__chevron pagination__chevron--previous" />
            Previous
          </Pagination.Link>
          <Pagination.Link disabled>1</Pagination.Link>
          <Pagination.Link disabled>2</Pagination.Link>
          <Pagination.Link disabled>3</Pagination.Link>
          <Pagination.Link disabled nav>
            Next
            <span aria-hidden className="pagination__chevron pagination__chevron--next" />
          </Pagination.Link>
        </Pagination>
      </Specimen>
      <Specimen className="specimen--stack" label="Controlled">
        <ControlledPaginationDemo />
      </Specimen>
    </div>
  );
}

export function ToolbarPreview({ icons }: { icons: DesignSystem["icons"] }): ReactElement {
  const icon = createPreviewIconElements(icons);
  const formatting = (
    <>
      <ToggleButton.Group aria-label="Text style">
        <ToggleButton aria-label="Add" iconOnly value="add">
          {icon.add}
        </ToggleButton>
        <ToggleButton aria-label="Search" iconOnly value="search">
          {icon.search}
        </ToggleButton>
      </ToggleButton.Group>
      <Toolbar.Separator />
      <Button aria-label="Settings" iconOnly variant="ghost">
        {icon.settings}
      </Button>
    </>
  );

  return (
    <div className="specimens">
      <Specimen label="Formatting">
        <Toolbar aria-label="Text formatting">{formatting}</Toolbar>
      </Specimen>
      <Specimen label="Vertical">
        <Toolbar aria-label="Vertical tools" orientation="vertical">
          <Button aria-label="Add" iconOnly variant="ghost">
            {icon.add}
          </Button>
          <Toolbar.Separator orientation="horizontal" />
          <Button aria-label="Delete" iconOnly variant="ghost">
            {icon.delete}
          </Button>
        </Toolbar>
      </Specimen>
      <Specimen label="Attached">
        <Toolbar aria-label="Attached tools" variant="attached">
          {formatting}
        </Toolbar>
      </Specimen>
      <Specimen label="With button group">
        {/* A ButtonGroup and a ToggleButton.Group side by side, sharing one toolbar's focus ring. */}
        <Toolbar aria-label="Document tools">
          <ButtonGroup>
            <Button variant="tertiary">{icon.cut}Cut</Button>
            <Button variant="tertiary">{icon.copy}Copy</Button>
            <Button variant="tertiary">{icon.paste}Paste</Button>
          </ButtonGroup>
          <Toolbar.Separator />
          {formatting}
        </Toolbar>
      </Specimen>
    </div>
  );
}

/* open/onOpenChange pass through Base UI's Menu.Root, so the menu can be driven from outside too. */
function ControlledDropdownDemo({
  icon,
  surface,
}: {
  icon: ReturnType<typeof createPreviewIconElements>;
  surface: HTMLElement | null;
}): ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="secondary">
        Open from outside
      </Button>
      <Dropdown onOpenChange={setOpen} open={open}>
        <Dropdown.Trigger render={<Button variant="secondary">Actions</Button>} />
        <Dropdown.Content container={surface}>
          <Dropdown.Item>{icon.add}Add member</Dropdown.Item>
          <Dropdown.Item>{icon.mail}Send invite</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </>
  );
}

export function DropdownPreview({ icons }: { icons: DesignSystem["icons"] }): ReactElement {
  const icon = createPreviewIconElements(icons);
  const surface = usePreviewSurface();

  return (
    <div className="specimens">
      <Specimen label="Actions">
        <Dropdown>
          <Dropdown.Trigger render={<Button variant="secondary">Actions</Button>} />
          <Dropdown.Content container={surface}>
            <Dropdown.Item>{icon.add}Add member</Dropdown.Item>
            <Dropdown.Item>{icon.mail}Send invite</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item danger>{icon.delete}Delete project</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Specimen>
      <Specimen label="Single selection">
        <Dropdown>
          <Dropdown.Trigger render={<Button variant="secondary">Grouped</Button>} />
          <Dropdown.Content container={surface}>
            <Dropdown.Group>
              <Dropdown.GroupLabel>Workspace</Dropdown.GroupLabel>
              <Dropdown.Item>{icon.settings}Settings</Dropdown.Item>
              <Dropdown.Item>{icon.users}Members</Dropdown.Item>
            </Dropdown.Group>
          </Dropdown.Content>
        </Dropdown>
      </Specimen>
      <Specimen label="Disabled item">
        <Dropdown>
          <Dropdown.Trigger render={<Button variant="secondary">With disabled</Button>} />
          <Dropdown.Content container={surface}>
            <Dropdown.Item>Available</Dropdown.Item>
            <Dropdown.Item disabled>Unavailable</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Specimen>
      <Specimen label="Descriptions">
        <Dropdown>
          <Dropdown.Trigger render={<Button variant="secondary">Notifications</Button>} />
          <Dropdown.Content container={surface}>
            <Dropdown.Item description="Mentions, replies, and direct messages">
              {icon.mail}All activity
            </Dropdown.Item>
            <Dropdown.Item description="Nothing, until you turn this back on">
              {icon.notificationOff}Mute
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Specimen>
      <Specimen label="Shortcuts">
        <Dropdown>
          <Dropdown.Trigger render={<Button variant="secondary">Edit</Button>} />
          <Dropdown.Content container={surface}>
            <Dropdown.Item shortcut="⌘Z">Undo</Dropdown.Item>
            <Dropdown.Item shortcut="⌘⇧Z">Redo</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item shortcut="⌘X">Cut</Dropdown.Item>
            <Dropdown.Item shortcut="⌘C">Copy</Dropdown.Item>
            <Dropdown.Item shortcut="⌘V">Paste</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Specimen>
      <Specimen label="Submenu">
        <Dropdown>
          <Dropdown.Trigger render={<Button variant="secondary">Share</Button>} />
          <Dropdown.Content container={surface}>
            <Dropdown.Item>{icon.mail}Send via email</Dropdown.Item>
            <Dropdown.Submenu>
              <Dropdown.SubmenuTrigger>{icon.upload}Export</Dropdown.SubmenuTrigger>
              <Dropdown.Content container={surface}>
                <Dropdown.Item>PDF</Dropdown.Item>
                <Dropdown.Item>CSV</Dropdown.Item>
                <Dropdown.Item>PNG</Dropdown.Item>
              </Dropdown.Content>
            </Dropdown.Submenu>
          </Dropdown.Content>
        </Dropdown>
      </Specimen>
      <Specimen label="Controlled">
        <ControlledDropdownDemo icon={icon} surface={surface} />
      </Specimen>
      <Specimen label="Custom trigger">
        <Dropdown>
          <Dropdown.Trigger
            render={
              <button
                aria-label="Account menu"
                style={{
                  alignItems: "center",
                  background: "var(--default)",
                  borderRadius: "999px",
                  display: "inline-flex",
                  height: "2.25rem",
                  justifyContent: "center",
                  width: "2.25rem",
                }}
                type="button"
              >
                {icon.users}
              </button>
            }
          />
          <Dropdown.Content container={surface}>
            <Dropdown.Item>{icon.settings}Account settings</Dropdown.Item>
            <Dropdown.Item danger>{icon.logout}Sign out</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Specimen>
    </div>
  );
}

/* value/onValueChange pass straight through Root.Props, same as any controlled Base UI field. */
function ControlledComboboxDemo(): ReactElement {
  const surface = usePreviewSurface();
  const [value, setValue] = useState<string | null>("Cat");

  return (
    <>
      <Field name="animal-controlled">
        <Field.Label>Favorite animal</Field.Label>
        <Combobox
          container={surface}
          items={ANIMALS}
          onValueChange={setValue}
          placeholder="Search animals…"
          value={value}
        >
          {(animal: string) => (
            <Combobox.Item key={animal} value={animal}>
              {animal}
            </Combobox.Item>
          )}
        </Combobox>
      </Field>
      <p style={{ color: "var(--muted)", fontSize: "0.8125rem" }}>Selected: {value ?? "none"}</p>
    </>
  );
}

/* items is deliberately empty until the popup first opens, so the list is sourced asynchronously. */
function AsyncComboboxDemo(): ReactElement {
  const surface = usePreviewSurface();
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <Field name="animal-async">
      <Field.Label>Favorite animal</Field.Label>
      <Combobox
        container={surface}
        emptyMessage={loading ? "Loading…" : "No results"}
        items={items}
        onOpenChange={(open) => {
          if (open && items.length === 0 && !loading) {
            setLoading(true);
            window.setTimeout(() => {
              setItems(ANIMALS);
              setLoading(false);
            }, 600);
          }
        }}
        placeholder="Search animals…"
      >
        {(animal: string) => (
          <Combobox.Item key={animal} value={animal}>
            {animal}
          </Combobox.Item>
        )}
      </Combobox>
    </Field>
  );
}

/*
 * Every list here is rendered from a function child rather than a static array. That is what
 * makes the field filter: Base UI matches the query against `items` and hands the survivors to
 * the child, so a static list would keep rendering all of them and quietly do nothing.
 */
export function ComboboxPreview({ icons }: { icons: DesignSystem["icons"] }): ReactElement {
  const icon = createPreviewIconElements(icons);
  const surface = usePreviewSurface();

  return (
    <div className="specimens">
      <Specimen className="specimen--stack" label="Default">
        <Field name="animal">
          <Field.Label>Favorite animal</Field.Label>
          <Combobox container={surface} items={ANIMALS} placeholder="Search animals…">
            {(animal: string) => (
              <Combobox.Item key={animal} value={animal}>
                {animal}
              </Combobox.Item>
            )}
          </Combobox>
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="With description">
        <Field name="animal-described">
          <Field.Label>Favorite animal</Field.Label>
          <Combobox container={surface} items={ANIMALS} placeholder="Search animals…">
            {(animal: string) => (
              <Combobox.Item key={animal} value={animal}>
                {animal}
              </Combobox.Item>
            )}
          </Combobox>
          <Field.Description>Search and select your favorite animal</Field.Description>
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Sections">
        <Field name="country">
          <Field.Label>Country</Field.Label>
          <Combobox container={surface} items={COUNTRIES} placeholder="Search countries…">
            {(group: { items: string[]; value: string }) => (
              <Combobox.Group items={group.items} key={group.value} label={group.value}>
                <Combobox.Collection>
                  {(country: string) => (
                    <Combobox.Item key={country} value={country}>
                      {country}
                    </Combobox.Item>
                  )}
                </Combobox.Collection>
              </Combobox.Group>
            )}
          </Combobox>
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Disabled options">
        <Field name="pet">
          <Field.Label>Animal</Field.Label>
          <Combobox container={surface} items={PET_NAMES} placeholder="Search animals…">
            {(name: string) => (
              <Combobox.Item
                disabled={PETS.some((pet) => pet.name === name && pet.disabled)}
                key={name}
                value={name}
              >
                {name}
              </Combobox.Item>
            )}
          </Combobox>
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Custom trigger icon">
        <Field name="animal-custom-icon">
          <Field.Label>Favorite animal</Field.Label>
          <Combobox
            container={surface}
            icon={icon.search}
            items={ANIMALS}
            placeholder="Search animals…"
          >
            {(animal: string) => (
              <Combobox.Item key={animal} value={animal}>
                {animal}
              </Combobox.Item>
            )}
          </Combobox>
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Disabled">
        <Field name="animal-disabled">
          <Field.Label>Favorite animal</Field.Label>
          <Combobox container={surface} disabled items={ANIMALS} placeholder="Search animals…">
            {(animal: string) => (
              <Combobox.Item key={animal} value={animal}>
                {animal}
              </Combobox.Item>
            )}
          </Combobox>
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Required">
        <Field name="animal-required">
          <Field.Label required>Favorite animal</Field.Label>
          <Combobox container={surface} items={ANIMALS} placeholder="Search animals…" required>
            {(animal: string) => (
              <Combobox.Item key={animal} value={animal}>
                {animal}
              </Combobox.Item>
            )}
          </Combobox>
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Controlled">
        <ControlledComboboxDemo />
      </Specimen>
      <Specimen className="specimen--stack" label="Async loading">
        <AsyncComboboxDemo />
      </Specimen>
    </div>
  );
}

/*
 * The reference's third specimen puts the message under a TagGroup, which has no Base UI
 * primitive and is out of scope; the anatomy example covers the same pairing with a field.
 */
export function ErrorMessagePreview(): ReactElement {
  return (
    <div className="specimens">
      <Specimen className="specimen--stack" label="Anatomy">
        <Field name="tags-with-error">
          <Field.Label>Label</Field.Label>
          <div className="error-message-tags">
            <Chip>Tag A</Chip>
            <Chip>Tag B</Chip>
          </div>
          <Field.Description>Helper description</Field.Description>
          <ErrorMessage>Example error</ErrorMessage>
        </Field>
      </Specimen>
      <Specimen className="specimen--stack" label="Custom classes">
        {/* The message takes a class like anything else, so callers can restyle it. */}
        <ErrorMessage className="error-message-loud">Custom styled error message</ErrorMessage>
      </Specimen>
    </div>
  );
}
