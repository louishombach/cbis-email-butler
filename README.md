# James der Email Butler

## Docs

[Github node-imap -> imap search parameters](https://github.com/mscdex/node-imap)
[NPM imap-simple -> our imap client](https://www.npmjs.com/package/imap-simple)

## Project Features

This repository is 🔋 battery packed with:

- ⚡️ Next.js 13 with App Router
- ⚛️ React 18
- ✨ TypeScript
- 💨 Tailwind CSS 3 — Configured with CSS Variables to extend the **primary** color
- 💎 Pre-built Components — Components that will **automatically adapt** with your brand color, [check here for the demo](https://tsnext-tw.thcl.dev/components)
- 🃏 Jest — Configured for unit testing
- 📈 Absolute Import and Path Alias — Import components using `@/` prefix
- 📏 ESLint — Find and fix problems in your code, also will **auto sort** your imports
- 💖 Prettier — Format your code consistently
- 🐶 Husky & Lint Staged — Run scripts on your staged files before they are committed
- 🤖 Conventional Commit Lint — Make sure you & your teammates follow conventional commit
- ⏰ Release Please — Generate your changelog by activating the `release-please` workflow
- 👷 Github Actions — Lint your code on PR
- 🚘 Automatic Branch and Issue Autolink — Branch will be automatically created on issue **assign**, and auto linked on PR
- 🔥 Snippets — A collection of useful snippets
- 👀 Open Graph Helper Function — Awesome open graph generated using [og](https://github.com/theodorusclarence/og), fork it and deploy!
- 🗺 Site Map — Automatically generate sitemap.xml

## Running this Project

### 1. Install dependencies

You will should use yarn -> `npm install -g yarn` to install yarn globally.

Afterwards install the dependencies:

```bash
yarn install
```

### 2. Set up environment variables

duplicate `.env.example` to `.env.local` and fill the variables. You will have to create a new Google App password for this. [Check this link for the tutorial](https://support.google.com/accounts/answer/185833?hl=en#app-passwords).

### 3. Run the development server

You can start the server using this command:

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `src/pages/index.tsx`.

### 4. Commit Message Convention

This starter is using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), it is mandatory to use it to commit changes.

#### Examples

##### Commit message with description and breaking change footer

```bash
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

##### Commit message with ! to draw attention to breaking change

```bash
feat!: send an email to the customer when a product is shipped
```
