# Nuxt Minimal Starter

## Live Demo

The project is deployed and available here:

**https://redberry-bootcamp-iota.vercel.app/**

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Requirements

- [Node.js](https://nodejs.org/) `24.19.0`

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Environment Variables

Before running the project, create your `.env` file from the provided `.env.example` file:

```bash
cp .env.example .env
```

Then update the `.env` file with the required environment variables.

> **Note:** Never commit your `.env` file to the repository. Keep your environment-specific values private.

## Development Server

Start the development server at `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview the production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
