# Nextstep · Job Tracker

Nextstep is an interactive job-search tracking prototype. It brings applications, job details, the CV used for each application, interviews and follow-ups into one interface.

## Included

- **Dashboard**: overview, application cards and details, status filters, job-link entry, CV attachment, schedule and reminders.
- **Walkthrough**: narrated Arabic product demo with a local video player.

## Run locally

Install Node.js 22.12 or newer and pnpm 10.

```sh
pnpm install
pnpm dev
```

Open http://localhost:5173 for the dashboard.

```sh
pnpm dev:walkthrough
```

Open http://localhost:5174 for the narrated demo. Enable sound in the player; browsers may block autoplay audio.

## Checks and production builds

```sh
pnpm typecheck
pnpm build
```

Build output is in each application's `dist/` directory. Preview with `pnpm --filter @nextstep/dashboard preview` or `pnpm --filter @nextstep/walkthrough preview`.

## Project structure

- `apps/dashboard` — React dashboard prototype
- `apps/walkthrough` — React animated walkthrough and audio assets

## Current limitations

This is a design prototype, not a production recruitment service. Initial jobs are sample data. AI job-link extraction is simulated, not a live AI service. Application changes and attached CV files are held in the browser session and are not persisted to a server; refreshing can lose them. There is no authentication or backend persistence. Do not use it as the only copy of important application information.

Google Fonts needs an internet connection; system fonts are used when unavailable.
