import {
  Accordion,
  AlertDialog,
  Breadcrumbs,
  Button,
  type ButtonVariant,
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
import type { ReactElement } from "react";
import { createPreviewIconElements } from "./preview-icons.ts";
import { usePreviewSurface } from "./preview-surface.tsx";

/* The reference's own copy, so the two pages can be read side by side. */
const FAQ = [
  {
    answer:
      "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
    question: "How do I place an order?",
  },
  {
    answer:
      "Yes, you can modify or cancel your order before it's shipped. Once your order is processed, you can't make changes.",
    question: "Can I modify or cancel my order?",
  },
  {
    answer: "We accept all major credit cards, including Visa, Mastercard, and American Express.",
    question: "What payment methods do you accept?",
  },
  {
    answer:
      "Shipping costs vary based on your location and the size of your order. We offer free shipping for orders over $50.",
    question: "How much does shipping cost?",
  },
  {
    answer:
      "Yes, we ship to most countries. Please check our shipping rates and policies for more information.",
    question: "Do you ship internationally?",
  },
  {
    answer:
      "If you're not satisfied with your purchase, you can request a refund within 30 days of purchase. Please contact our customer support team for assistance.",
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

/*
 * One trigger per tone, the way the reference shows them side by side. The reference gives its
 * triggers matching button variants; ours has no success or warning variant, so the tone reads
 * from the dialog's own copy and the trigger falls back to the nearest variant we do have.
 */
const ALERT_TONES: {
  confirm: string;
  description: string;
  label: string;
  title: string;
  variant: ButtonVariant;
}[] = [
  {
    confirm: "Publish",
    description: "The project becomes visible to everyone with the link.",
    label: "Accent",
    title: "Publish this project?",
    variant: "primary",
  },
  {
    confirm: "Approve",
    description: "The change is applied as soon as you approve it.",
    label: "Success",
    title: "Approve this change?",
    variant: "secondary",
  },
  {
    confirm: "Continue",
    description: "Your edits have not been saved.",
    label: "Warning",
    title: "Leave without saving?",
    variant: "secondary",
  },
];

export function AccordionPreview({ icons }: { icons: DesignSystem["icons"] }): ReactElement {
  const icon = createPreviewIconElements(icons);

  return (
    <div className="specimens">
      <section className="specimen specimen--stack">
        <Accordion className="preview-block">
          {FAQ.map((entry) => (
            <Accordion.Item key={entry.question} value={entry.question}>
              <Accordion.Trigger>
                {icon.more}
                {entry.question}
              </Accordion.Trigger>
              <Accordion.Panel>{entry.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
        <div className="specimen__label">Default</div>
      </section>
      <section className="specimen specimen--stack">
        <Accordion className="preview-block" variant="surface">
          {FAQ.map((entry) => (
            <Accordion.Item key={entry.question} value={entry.question}>
              <Accordion.Trigger>
                {icon.more}
                {entry.question}
              </Accordion.Trigger>
              <Accordion.Panel>{entry.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
        <div className="specimen__label">Surface</div>
      </section>
      <section className="specimen specimen--stack">
        {/* `multiple` lets more than one panel stay open at a time. */}
        <Accordion className="preview-block" defaultValue={["Getting Started"]} multiple>
          {DOCS.map((entry) => (
            <Accordion.Item key={entry.question} value={entry.question}>
              <Accordion.Trigger>{entry.question}</Accordion.Trigger>
              <Accordion.Panel>{entry.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
        <div className="specimen__label">Multiple expanded</div>
      </section>
      <section className="specimen specimen--stack">
        <Accordion className="preview-block">
          {["Disabled Item 1", "Disabled Item 2"].map((label) => (
            <Accordion.Item disabled key={label} value={label}>
              <Accordion.Trigger>{label}</Accordion.Trigger>
              <Accordion.Panel>Content</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
        <div className="specimen__label">Disabled</div>
      </section>
    </div>
  );
}

export function BreadcrumbsPreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen">
        <Breadcrumbs>
          <Breadcrumbs.Item href="#home">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="#products">Products</Breadcrumbs.Item>
          <Breadcrumbs.Item href="#electronics">Electronics</Breadcrumbs.Item>
          <Breadcrumbs.Item current href="#laptop">
            Laptop
          </Breadcrumbs.Item>
        </Breadcrumbs>
        <div className="specimen__label">Default</div>
      </section>
      <section className="specimen">
        <Breadcrumbs>
          <Breadcrumbs.Item href="#home">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item current href="#current">
            Current Page
          </Breadcrumbs.Item>
        </Breadcrumbs>
        <div className="specimen__label">Two levels</div>
      </section>
      <section className="specimen">
        <Breadcrumbs>
          <Breadcrumbs.Item href="#home">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="#category">Category</Breadcrumbs.Item>
          <Breadcrumbs.Item current href="#current">
            Current Page
          </Breadcrumbs.Item>
        </Breadcrumbs>
        <div className="specimen__label">Three levels</div>
      </section>
      <section className="specimen">
        <Breadcrumbs separator={<span className="breadcrumbs__separator">/</span>}>
          <Breadcrumbs.Item href="#home">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="#products">Products</Breadcrumbs.Item>
          <Breadcrumbs.Item href="#electronics">Electronics</Breadcrumbs.Item>
          <Breadcrumbs.Item current href="#laptop">
            Laptop
          </Breadcrumbs.Item>
        </Breadcrumbs>
        <div className="specimen__label">Custom separator</div>
      </section>
      <section className="specimen">
        <Breadcrumbs>
          <Breadcrumbs.Item disabled>Home</Breadcrumbs.Item>
          <Breadcrumbs.Item disabled>Products</Breadcrumbs.Item>
          <Breadcrumbs.Item disabled>Electronics</Breadcrumbs.Item>
          <Breadcrumbs.Item disabled>Laptop</Breadcrumbs.Item>
        </Breadcrumbs>
        <div className="specimen__label">Disabled</div>
      </section>
      <section className="specimen">
        {/* The trail takes a class like any other element; here it just opens the gaps up. */}
        <Breadcrumbs className="breadcrumbs-roomy">
          <Breadcrumbs.Item href="#home">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item current>Current</Breadcrumbs.Item>
        </Breadcrumbs>
        <div className="specimen__label">Styled</div>
      </section>
    </div>
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
      <section className="specimen specimen--stack">
        <Pagination>{pages}</Pagination>
        <div className="specimen__label">Default</div>
      </section>
      <section className="specimen specimen--stack">
        {/* Labelled per row, since the three sizes are otherwise hard to tell apart. */}
        <div className="pagination-sizes">
          <span className="pagination-sizes__label">Sm</span>
          <Pagination size="sm">{pages}</Pagination>
          <span className="pagination-sizes__label">Md</span>
          <Pagination>{pages}</Pagination>
          <span className="pagination-sizes__label">Lg</span>
          <Pagination size="lg">{pages}</Pagination>
        </div>
        <div className="specimen__label">Sizes</div>
      </section>
      <section className="specimen specimen--stack">
        <Pagination>
          {previous}
          <Pagination.Link>1</Pagination.Link>
          <Pagination.Link current>2</Pagination.Link>
          <Pagination.Ellipsis />
          <Pagination.Link>12</Pagination.Link>
          {next}
        </Pagination>
        <div className="specimen__label">With ellipsis</div>
      </section>
      <section className="specimen specimen--stack">
        <Pagination summary="1 to 5 of 50 invoices">
          <Pagination.Link disabled nav>
            Prev
          </Pagination.Link>
          <Pagination.Link nav>Next</Pagination.Link>
        </Pagination>
        <div className="specimen__label">Previous and next only</div>
      </section>
      <section className="specimen specimen--stack">
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
        <div className="specimen__label">Custom icons</div>
      </section>
      <section className="specimen specimen--stack">
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
        <div className="specimen__label">Disabled</div>
      </section>
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
      <section className="specimen">
        <Toolbar aria-label="Text formatting">{formatting}</Toolbar>
        <div className="specimen__label">Formatting</div>
      </section>
      <section className="specimen">
        <Toolbar aria-label="Vertical tools" orientation="vertical">
          <Button aria-label="Add" iconOnly variant="ghost">
            {icon.add}
          </Button>
          <Toolbar.Separator orientation="horizontal" />
          <Button aria-label="Delete" iconOnly variant="ghost">
            {icon.delete}
          </Button>
        </Toolbar>
        <div className="specimen__label">Vertical</div>
      </section>
      <section className="specimen">
        <Toolbar aria-label="Attached tools" variant="attached">
          {formatting}
        </Toolbar>
        <div className="specimen__label">Attached</div>
      </section>
    </div>
  );
}

export function DropdownPreview({ icons }: { icons: DesignSystem["icons"] }): ReactElement {
  const icon = createPreviewIconElements(icons);
  const surface = usePreviewSurface();

  return (
    <div className="specimens">
      <section className="specimen">
        <Dropdown>
          <Dropdown.Trigger render={<Button variant="secondary">Actions</Button>} />
          <Dropdown.Content container={surface}>
            <Dropdown.Item>{icon.add}Add member</Dropdown.Item>
            <Dropdown.Item>{icon.mail}Send invite</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item danger>{icon.delete}Delete project</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
        <div className="specimen__label">Actions</div>
      </section>
      <section className="specimen">
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
        <div className="specimen__label">Single selection</div>
      </section>
      <section className="specimen">
        <Dropdown>
          <Dropdown.Trigger render={<Button variant="secondary">With disabled</Button>} />
          <Dropdown.Content container={surface}>
            <Dropdown.Item>Available</Dropdown.Item>
            <Dropdown.Item disabled>Unavailable</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
        <div className="specimen__label">Disabled item</div>
      </section>
    </div>
  );
}

export function AlertDialogPreview(): ReactElement {
  const surface = usePreviewSurface();

  return (
    <div className="specimens">
      <section className="specimen">
        <AlertDialog>
          <AlertDialog.Trigger render={<Button variant="danger">Delete project</Button>} />
          <AlertDialog.Content
            container={surface}
            actions={
              <>
                <AlertDialog.Close render={<Button variant="outline">Cancel</Button>} />
                <AlertDialog.Close render={<Button variant="danger">Delete</Button>} />
              </>
            }
            description="This removes the project and everything in it. This cannot be undone."
            title="Delete this project?"
          />
        </AlertDialog>
        <div className="specimen__label">Danger confirm</div>
      </section>
      <section className="specimen">
        {ALERT_TONES.map((tone) => (
          <AlertDialog key={tone.label}>
            <AlertDialog.Trigger render={<Button variant={tone.variant}>{tone.label}</Button>} />
            <AlertDialog.Content
              container={surface}
              actions={
                <>
                  <AlertDialog.Close render={<Button variant="outline">Cancel</Button>} />
                  <AlertDialog.Close
                    render={<Button variant={tone.variant}>{tone.confirm}</Button>}
                  />
                </>
              }
              description={tone.description}
              title={tone.title}
            />
          </AlertDialog>
        ))}
        <div className="specimen__label">Status tones</div>
      </section>
      <section className="specimen">
        <AlertDialog>
          <AlertDialog.Trigger render={<Button variant="secondary">Center placement</Button>} />
          <AlertDialog.Content
            container={surface}
            actions={
              <>
                <AlertDialog.Close render={<Button variant="outline">Cancel</Button>} />
                <AlertDialog.Close render={<Button>Confirm</Button>} />
              </>
            }
            description="The dialog sits in the middle of the viewport whatever opened it."
            title="Centered dialog"
          />
        </AlertDialog>
        <div className="specimen__label">Placement</div>
      </section>
    </div>
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
      <section className="specimen specimen--stack">
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
        <div className="specimen__label">Default</div>
      </section>
      <section className="specimen specimen--stack">
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
        <div className="specimen__label">With description</div>
      </section>
      <section className="specimen specimen--stack">
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
        <div className="specimen__label">Sections</div>
      </section>
      <section className="specimen specimen--stack">
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
        <div className="specimen__label">Disabled options</div>
      </section>
      <section className="specimen specimen--stack">
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
        <div className="specimen__label">Custom trigger icon</div>
      </section>
      <section className="specimen specimen--stack">
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
        <div className="specimen__label">Disabled</div>
      </section>
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
      <section className="specimen specimen--stack">
        <Field name="tags-with-error">
          <Field.Label>Label</Field.Label>
          <div className="error-message-tags">
            <Chip>Tag A</Chip>
            <Chip>Tag B</Chip>
          </div>
          <Field.Description>Helper description</Field.Description>
          <ErrorMessage>Example error</ErrorMessage>
        </Field>
        <div className="specimen__label">Anatomy</div>
      </section>
      <section className="specimen specimen--stack">
        {/* The message takes a class like anything else, so callers can restyle it. */}
        <ErrorMessage className="error-message-loud">Custom styled error message</ErrorMessage>
        <div className="specimen__label">Custom classes</div>
      </section>
    </div>
  );
}
