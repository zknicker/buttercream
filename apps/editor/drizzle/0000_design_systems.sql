CREATE TABLE `design_systems` (
  `id` text PRIMARY KEY NOT NULL,
  `owner_id` text NOT NULL,
  `name` text NOT NULL,
  `document_json` text NOT NULL,
  `version` integer DEFAULT 1 NOT NULL,
  `sharing_enabled` integer DEFAULT false NOT NULL,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL
);

CREATE INDEX `design_systems_owner_updated_idx`
ON `design_systems` (`owner_id`, `updated_at`);

