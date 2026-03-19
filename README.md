# Caption Wizard AI

Caption Wizard AI is a Next.js app for generating short social captions from a plain-language description. The main product goal is simple: a non-technical user should be able to describe a post, choose a style, and copy a usable caption in a few seconds.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file and fill in the values you need:

```bash
cp .env.example .env.local
```

3. Start the dev server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Required environment variables

- `OPENROUTER_API_KEY`: required for caption generation.
- `OPENROUTER_MODEL`: optional model override. Defaults to `deepseek/deepseek-chat`.
- `LOGSNAG_API_KEY`: optional. If omitted, tracking routes become a no-op instead of breaking the app.

Most of the other variables in `.env.example` are for optional features already present in the repo such as Stripe, Supabase, ads, and admin routes.

## Scripts

- `npm run dev`: start the local development server.
- `npm run lint`: run ESLint.
- `npm run build`: create a production build.

## Product notes

- The homepage is optimized for a simple three-step workflow: describe, choose a style, copy a result.
- Draft prompt text and the last selected style are saved in local storage so users do not lose progress on refresh.
- Telemetry is optional and should never block the main generation flow.
