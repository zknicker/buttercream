CREATE TABLE `users` (
  `id` text PRIMARY KEY NOT NULL,
  `clerk_user_id` text NOT NULL,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL
);

CREATE UNIQUE INDEX `users_clerk_user_id_unique`
ON `users` (`clerk_user_id`);
