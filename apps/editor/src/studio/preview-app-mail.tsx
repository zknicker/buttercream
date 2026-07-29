import {
  Avatar,
  Button,
  ButtonGroup,
  Chip,
  type ChipColor,
  SearchField,
  Separator,
  Toolbar,
  Typography,
} from "@buttercream/react";
import type { DesignSystem } from "@buttercream/theme-core";
import type { ReactElement } from "react";
import { AppFrame, AppIdentity, AppNav, type AppNavItem } from "./preview-app-shell.tsx";
import { createPreviewIconElements } from "./preview-icons.ts";

/*
 * A three-pane mail client: folders, a message list, and the message being read. Mail is the
 * page where density matters most — nine rows of two-line summaries next to a long-form body —
 * so it is the best test of whether the type scale and the neutral ramp still separate primary
 * from secondary text once a config changes.
 */

const NAV: AppNavItem[] = [
  { badge: "4", current: true, icon: "mail", label: "Inbox" },
  { badge: "2", icon: "settings", label: "Starred" },
  { icon: "upload", label: "Sent" },
  { icon: "add", label: "Drafts" },
  { icon: "more", label: "Snoozed" },
  { icon: "search", label: "Archive" },
  { icon: "users", label: "Spam" },
  { icon: "delete", label: "Trash" },
];

/* Dots are named rather than coloured inline, so the palette stays in the stylesheet. */
const LABELS = ["work", "personal", "billing", "travel", "urgent"] as const;

const LABEL_NAMES: Record<(typeof LABELS)[number], string> = {
  billing: "Billing",
  personal: "Personal",
  travel: "Travel",
  urgent: "Urgent",
  work: "Work",
};

interface MailMessage {
  chip?: { color: ChipColor; label: string };
  preview: string;
  selected?: boolean;
  sender: string;
  starred?: boolean;
  subject: string;
  time: string;
  unread?: boolean;
}

const MESSAGES: MailMessage[] = [
  {
    chip: { color: "accent", label: "Work" },
    preview:
      "I pushed the review out a day so the platform team can land the token rename first — no other changes.",
    selected: true,
    sender: "Maya Okafor",
    starred: true,
    subject: "Design review moved to Thursday",
    time: "10:21 AM",
    unread: true,
  },
  {
    preview:
      "Thanks for the quick turnaround. Accounting has it queued for the Friday run, nothing else needed from you.",
    sender: "Priya Raman",
    subject: "Re: Invoice #4821",
    time: "9:47 AM",
    unread: true,
  },
  {
    chip: { color: "danger", label: "Urgent" },
    preview:
      "Rough shape only. The second half is still a list of bullets, but the sequencing is what I want feedback on.",
    sender: "Devon Clarke",
    starred: true,
    subject: "Q3 roadmap draft",
    time: "8:02 AM",
    unread: true,
  },
  {
    chip: { color: "warning", label: "Billing" },
    preview:
      "Your monthly receipt is attached. Card ending 4417 was charged on the 24th; the plan renews on the 24th next month.",
    sender: "Northwind Billing",
    subject: "Your receipt from Northwind",
    time: "Yesterday",
    unread: true,
  },
  {
    preview:
      "Flights land at 11:40 and the apartment is a short walk from Cais do Sodré. I put the confirmation numbers below.",
    sender: "Lena Fischer",
    subject: "Trip itinerary — Lisbon",
    time: "Yesterday",
  },
  {
    preview:
      "Short version: the migration is on track, the docs are not. I took the docs; someone should take the changelog.",
    sender: "Sam Whitfield",
    starred: true,
    subject: "Notes from the Monday sync",
    time: "Mon",
  },
  {
    preview:
      "We rolled the fix out this morning and confirmed the retries clear on their own. Closing this out — reopen if it returns.",
    sender: "Aria Support",
    subject: "Ticket #2290 resolved",
    time: "Fri",
  },
  {
    preview:
      "Album link inside. Some of the group shots are worth keeping; the rest are proof that the lens was dirty.",
    sender: "Tomas Beck",
    subject: "Photos from the offsite",
    time: "Apr 22",
  },
  {
    preview:
      "Both copies are signed and filed. I have attached the executed version for your records — no action needed.",
    sender: "Hana Sato",
    subject: "Contract countersigned",
    time: "Apr 12",
  },
];

const BODY = [
  "I pushed the design review out a day so the platform team can land the token rename first. Reviewing the screens against names that are about to change would waste the hour, and the rename is small enough that it should be done by Wednesday evening.",
  "Nothing else about the agenda moves. We still open with the list, spend the bulk of the time on the reading pane, and leave the empty states for the end if there is room. If you only have half an hour, the first half is the part that needs you.",
  "Say if Thursday breaks something on your side and I will find another slot — otherwise treat this as confirmed and I will send the updated invite this afternoon.",
];

/* No photos to ship, so the fallback carries initials — which is what it is for. */
function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export function MailAppPreview({ icons }: { icons: DesignSystem["icons"] }): ReactElement {
  const icon = createPreviewIconElements(icons);

  return (
    <AppFrame
      sidebar={
        <>
          <AppIdentity email="you@example.com" name="You" />
          <AppNav icons={icons} items={NAV} />
          <div className="mail__labels-group">
            <h3 className="app__sidebar-heading">Labels</h3>
            <div className="mail__labels">
              {LABELS.map((label) => (
                <span className="mail__label" key={label}>
                  <span aria-hidden className={`mail__label-dot mail__label-dot--${label}`} />
                  <span className="mail__label-name">{LABEL_NAMES[label]}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="app__sidebar-spacer" />
          <Button fullWidth size="sm">
            {icon.add}New email
          </Button>
        </>
      }
    >
      <div className="mail">
        <section className="mail__pane">
          <div className="mail__search">
            <SearchField fullWidth>
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input aria-label="Search mail" placeholder="Search mail" />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
          </div>
          <div className="mail__messages">
            {MESSAGES.map((message) => (
              <article
                className="mail__message"
                data-selected={message.selected || undefined}
                data-unread={message.unread || undefined}
                key={message.subject}
              >
                <Avatar className="mail__avatar" size="sm">
                  <Avatar.Fallback>{initials(message.sender)}</Avatar.Fallback>
                </Avatar>
                <span className="mail__sender">{message.sender}</span>
                <span className="mail__time">{message.time}</span>
                <span className="mail__subject-line">
                  <span className="mail__subject">{message.subject}</span>
                  {message.chip === undefined ? null : (
                    <Chip color={message.chip.color} size="sm">
                      {message.chip.label}
                    </Chip>
                  )}
                </span>
                <span
                  aria-hidden
                  className="mail__star"
                  data-starred={message.starred || undefined}
                />
                <span className="mail__preview">{message.preview}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="mail__pane">
          <div className="mail__toolbar">
            <Toolbar aria-label="Message actions">
              <Button aria-label="Close" iconOnly size="sm" variant="ghost">
                {icon.close}
              </Button>
              <Button aria-label="Delete" iconOnly size="sm" variant="ghost">
                {icon.delete}
              </Button>
              <Button aria-label="Archive" iconOnly size="sm" variant="ghost">
                {icon.upload}
              </Button>
              <Toolbar.Separator />
              <Button aria-label="Print" iconOnly size="sm" variant="ghost">
                {icon.settings}
              </Button>
              <Button aria-label="More" iconOnly size="sm" variant="ghost">
                {icon.more}
              </Button>
            </Toolbar>
            <div className="mail__toolbar-end">
              <span className="mail__count">1 of 1</span>
              <ButtonGroup aria-label="Message navigation" role="group">
                <Button size="sm" variant="secondary">
                  Prev
                </Button>
                <Button size="sm" variant="secondary">
                  Next
                </Button>
              </ButtonGroup>
            </div>
          </div>

          <div className="mail__reading">
            <Typography as="h2" variant="h4">
              Design review moved to Thursday
            </Typography>

            <div className="mail__from">
              <Avatar size="md">
                <Avatar.Fallback>MO</Avatar.Fallback>
              </Avatar>
              <span className="mail__from-text">
                <span className="mail__from-name">
                  Maya Okafor
                  <span className="mail__to">to me</span>
                </span>
                <span className="mail__from-meta">maya@example.com · Apr 24, 10:21 AM</span>
              </span>
              <span className="mail__from-actions">
                <Button size="sm" variant="secondary">
                  Reply
                </Button>
                <span aria-hidden className="mail__star" data-starred />
              </span>
            </div>

            <Separator />

            <div className="mail__copy">
              {BODY.map((paragraph) => (
                <Typography key={paragraph.slice(0, 24)} variant="body-sm">
                  {paragraph}
                </Typography>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppFrame>
  );
}
