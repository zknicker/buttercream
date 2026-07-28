#!/usr/bin/env bash
# Make a checkout runnable.
#
# A git worktree materialises tracked files only, so everything in .gitignore — the env file and
# the generated dev-server config — is absent the moment one is created. The symptom is not
# obvious: the app builds, the page loads, and the server throws "Missing Clerk Secret Key" on the
# first request, because the key it wants is a worker binding rather than anything the build needs.
#
# Safe to run repeatedly. It fills in what is missing, never overwrites a value that is already
# set, and never prints one.

set -euo pipefail

# The checkout being bootstrapped is the working directory, not wherever this script happens to
# live — a SessionStart hook runs with the project as cwd, and one copy can then repair any
# checkout you cd into.
checkout_root="$(git rev-parse --show-toplevel)"
cd "$checkout_root"

# The main checkout holds the real .env; worktrees borrow from it. Ask git rather than guessing
# from the path, so this keeps working if a worktree ever moves out from under .claude/worktrees.
main_root="$(git rev-parse --path-format=absolute --git-common-dir 2>/dev/null | sed 's#/\.git$##')"

# Merge any keys the destination is missing, leaving the ones it already has alone. Values are
# never echoed; only the names of what was added.
merge_env() {
  python3 - "$1" "$2" <<'PY'
import os, sys
source, destination = sys.argv[1], sys.argv[2]

def read(path):
    pairs = {}
    if not os.path.exists(path):
        return pairs
    for line in open(path):
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, value = line.split("=", 1)
            pairs[key] = value
    return pairs

have, incoming = read(destination), read(source)
added = [key for key in incoming if key not in have or not have[key]]
if not added:
    raise SystemExit
have.update({key: incoming[key] for key in added})
with open(destination, "w") as handle:
    handle.write("# Every variable this checkout needs, in one file.\n")
    handle.write("# apps/editor/.env.local links here; new worktrees are seeded by copying it.\n")
    for key in sorted(have):
        handle.write(f"{key}={have[key]}\n")
print("bootstrap: added " + " ".join(sorted(added)))
PY
}

# An older layout kept the editor's secrets in a file of their own. Fold them back into the root so
# there is one file to edit and one to rotate a key in, then let the link below re-create the path
# the loaders actually read.
if [ -f apps/editor/.env.local ] && [ ! -L apps/editor/.env.local ]; then
  merge_env apps/editor/.env.local .env
  rm apps/editor/.env.local
  echo "bootstrap: folded apps/editor/.env.local into .env"
fi

if [ "$checkout_root" != "$main_root" ] && [ -f "$main_root/.env" ]; then
  merge_env "$main_root/.env" .env
fi

if [ ! -e .env ]; then
  echo "bootstrap: WARNING no .env, and none at $main_root — copy .env.example and fill it in" >&2
fi

# Two loaders read the environment and both resolve relative to apps/editor: Vite for the VITE_*
# client vars, and the Cloudflare plugin for the worker's own env. Pointing Vite's envDir at the
# root moves the first and not the second, so the app directory needs its own path to the file. A
# link rather than a copy, so a rotated key does not leave stale duplicates behind.
if [ -f .env ] && [ ! -e apps/editor/.env.local ]; then
  ln -sfn ../../.env apps/editor/.env.local
  echo "bootstrap: linked apps/editor/.env.local -> ../../.env"
fi

# Report only what the editor cannot start without. .env.example documents more than that —
# BUTTERCREAM_API_KEY is the CLI's, and warning about it on every session start would teach you to
# ignore the one warning that means the app will not run.
if [ -f .env ]; then
  for key in HUGEICONS_LICENSE_KEY VITE_CLERK_PUBLISHABLE_KEY CLERK_SECRET_KEY; do
    grep -qE "^${key}=." .env || echo "bootstrap: WARNING ${key} is not set — dev will fail" >&2
  done
fi

# Per-checkout preview port, so several worktrees can run dev at once without fighting over one.
if [ ! -f .claude/launch.json ] && command -v dev-port >/dev/null 2>&1; then
  mkdir -p .claude
  dev-port --claude-launch buttercream bun run dev >/dev/null 2>&1 \
    && echo "bootstrap: wrote .claude/launch.json on port $(dev-port)"
fi
