import {
  Accordion,
  AlertDialog,
  Breadcrumbs,
  Button,
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
  { answer: "Add items to your basket and check out.", question: "How do I place an order?" },
  {
    answer: "Orders can be changed until they enter fulfilment.",
    question: "Can I modify or cancel my order?",
  },
  {
    answer: "All major cards, and bank transfer for teams.",
    question: "What payment methods do you accept?",
  },
] as const;

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
              <Accordion.Trigger>{entry.question}</Accordion.Trigger>
              <Accordion.Panel>{entry.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
        <div className="specimen__label">Surface</div>
      </section>
      <section className="specimen specimen--stack">
        {/* `multiple` lets more than one panel stay open at a time. */}
        <Accordion className="preview-block" defaultValue={[FAQ[0].question]} multiple>
          {FAQ.map((entry) => (
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
          <Accordion.Item value="open">
            <Accordion.Trigger>Available section</Accordion.Trigger>
            <Accordion.Panel>This one opens.</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item disabled value="locked">
            <Accordion.Trigger>Unavailable section</Accordion.Trigger>
            <Accordion.Panel>This one does not.</Accordion.Panel>
          </Accordion.Item>
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
          <Breadcrumbs.Item current href="#laptop">
            Laptop
          </Breadcrumbs.Item>
        </Breadcrumbs>
        <div className="specimen__label">Custom separator</div>
      </section>
    </div>
  );
}

export function PaginationPreview(): ReactElement {
  const pages = (
    <>
      <Pagination.Link nav>Previous</Pagination.Link>
      <Pagination.Link>1</Pagination.Link>
      <Pagination.Link current>2</Pagination.Link>
      <Pagination.Link>3</Pagination.Link>
      <Pagination.Link nav>Next</Pagination.Link>
    </>
  );

  return (
    <div className="specimens">
      <section className="specimen specimen--stack">
        <Pagination summary="1 to 5 of 50 invoices">{pages}</Pagination>
        <div className="specimen__label">Default</div>
      </section>
      <section className="specimen specimen--stack">
        <Pagination size="sm">{pages}</Pagination>
        <Pagination>{pages}</Pagination>
        <Pagination size="lg">{pages}</Pagination>
        <div className="specimen__label">Sizes</div>
      </section>
      <section className="specimen specimen--stack">
        <Pagination>
          <Pagination.Link nav>Previous</Pagination.Link>
          <Pagination.Link>1</Pagination.Link>
          <Pagination.Link current>2</Pagination.Link>
          <Pagination.Ellipsis />
          <Pagination.Link>10</Pagination.Link>
          <Pagination.Link nav>Next</Pagination.Link>
        </Pagination>
        <div className="specimen__label">With ellipsis</div>
      </section>
      <section className="specimen specimen--stack">
        <Pagination>
          <Pagination.Link nav>Previous</Pagination.Link>
          <Pagination.Link nav>Next</Pagination.Link>
        </Pagination>
        <div className="specimen__label">Previous and next only</div>
      </section>
      <section className="specimen specimen--stack">
        <Pagination>
          <Pagination.Link disabled nav>
            Previous
          </Pagination.Link>
          <Pagination.Link current>1</Pagination.Link>
          <Pagination.Link disabled nav>
            Next
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
        <AlertDialog>
          <AlertDialog.Trigger render={<Button variant="secondary">Leave page</Button>} />
          <AlertDialog.Content
            container={surface}
            actions={
              <>
                <AlertDialog.Close render={<Button variant="outline">Stay</Button>} />
                <AlertDialog.Close render={<Button>Discard</Button>} />
              </>
            }
            description="Your edits have not been saved."
            title="Discard unsaved changes?"
          />
        </AlertDialog>
        <div className="specimen__label">Status tones</div>
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

export function ErrorMessagePreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen specimen--stack">
        <ErrorMessage>Please select at least one category.</ErrorMessage>
        <div className="specimen__label">Anatomy</div>
      </section>
      <section className="specimen specimen--stack">
        {/*
         * The standalone message, for an error that belongs to the form rather than to one
         * control — Field.Error is what ties a message to a single input.
         */}
        <Field name="email-with-error">
          <Field.Label>Email</Field.Label>
          <ErrorMessage>That address is already in use.</ErrorMessage>
        </Field>
        <div className="specimen__label">Beside a field</div>
      </section>
    </div>
  );
}
