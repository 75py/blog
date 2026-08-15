# Repository Guidelines

## Project Structure & Module Organization

This repository is an Astro static blog. Route files live in `src/pages/`; reusable UI belongs in `src/components/`, page wrappers in `src/layouts/`, and shared CSS in `src/styles/`. Blog posts are Markdown files under dated paths in `src/content/blog/`, while `src/content/config.ts` defines their frontmatter schema. Keep source-controlled images in `src/images/` (post-local images may sit beside an article) and files copied unchanged to the site in `public/`. Astro generates `dist/`; do not commit it.

## Build, Test, and Development Commands

- `npm ci` installs the exact dependency versions from `package-lock.json`.
- `npm run dev` starts the local Astro development server.
- `npm run dev-network` exposes that server on the local network for device testing.
- `npm run build` creates the production site in `dist/` and catches integration or content-schema failures.
- `npm run preview` serves the production build for final route and layout checks.
- `npx textlint "src/content/**/*.md"` checks Japanese prose using `.textlintrc.json`.

Run commands from the repository root. Use `npm run astro -- --help` to inspect additional Astro CLI options.

## Coding Style & Naming Conventions

Follow the existing tab indentation in Astro, TypeScript, and CSS files. TypeScript uses strict Astro settings, single-quoted imports, and semicolons. Name components and layouts in PascalCase (`FormattedDate.astro`); use lowercase or kebab-case for routes, stylesheets, and article filenames. New posts should remain in dated directories and include `title`, `description`, and `pubDate`; `heroImage`, `updatedDate`, and `tags` are optional. Keep user-facing prose compatible with the configured Japanese textlint rules.

## Testing Guidelines

There is currently no unit-test framework or coverage threshold. Before submitting changes, run the production build and textlint. Then use `npm run preview` to inspect every affected route; check responsive layouts and images when UI or CSS changes. If adding non-trivial standalone logic, introduce focused tests and a documented npm script with that change.

## Commit & Pull Request Guidelines

Recent commits use short, imperative English subjects such as `Add reading notes...` and `Update article headings...`; follow that pattern and keep each commit focused. Pull requests should summarize the change, list affected routes or posts, and report build/textlint results. Link a relevant issue when one exists, and include before/after screenshots for visible layout changes. Changes merged to `main` are deployed to GitHub Pages, so never commit credentials or private material; assume everything under `public/` is publicly accessible.
