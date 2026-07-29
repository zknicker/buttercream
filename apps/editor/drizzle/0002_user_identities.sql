-- One Buttercream user, many authentication identities. The Clerk user id moves off the
-- users row into its own table so a second Clerk instance (the dev stack's) can resolve
-- to the same product user. Backfills from the column it replaces.

CREATE TABLE `user_identities` (
  `clerk_user_id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `created_at` integer NOT NULL
);

CREATE INDEX `user_identities_user_id_idx`
ON `user_identities` (`user_id`);

INSERT INTO `user_identities` (`clerk_user_id`, `user_id`, `created_at`)
SELECT `clerk_user_id`, `id`, `created_at` FROM `users`;

DROP INDEX `users_clerk_user_id_unique`;

ALTER TABLE `users` DROP COLUMN `clerk_user_id`;
