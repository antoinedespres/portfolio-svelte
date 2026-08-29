# Antoine Després — portfolio

A personal portfolio site built with SvelteKit.

## Credits

The design of this site is by [@AnicetNgrt](https://github.com/AnicetNgrt), from
[AnicetNgrt/portfolio-svelte](https://github.com/AnicetNgrt/portfolio-svelte), which this
repository is forked from. The content is my own.

## Install and run in dev

```sh
npm install
npm run dev
```

Then open `localhost:5173`.

## Checks

```sh
npm run check   # svelte-check
npm run lint    # prettier + eslint
npm run build   # production build
```

## Translations

Messages live in `messages/{en,fr,ko}.json`. The three files must stay at key
parity; `npm run check` compiles the Paraglide project and fails on a key that
is used in code but missing from a catalogue.

The [Sherlock](https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension)
VS Code extension (`inlang.vs-code-extension`, already in the workspace
recommendations) edits all three locales side by side from the `m.something()`
call in the component, and flags missing translations inline. The
`m-function-matcher` plugin it needs is already configured in
`project.inlang/settings.json`.

## Contact form

The contact form posts to a SvelteKit form action that verifies a Friendly
Captcha solution and sends the message through Resend. Copy `.env.example` to
`.env` and fill it in; the file lists which variables are required and why.

`ORIGIN` and `ADDRESS_HEADER` matter in production: without the first, SvelteKit
rejects every submission as cross-site, and without the second every visitor
shares one rate-limit bucket. Neither is needed for `npm run dev`.

### Testing it on localhost

Copy `.env.development.example` to `.env`, then in two terminals:

```sh
npm run dev:captcha   # stands in for Friendly Captcha's siteverify API
npm run dev
```

The stub accepts any non-empty solution and rejects the literal `FAIL`, so both
the success and failure paths are reachable without a real sitekey. For mail,
send from `onboarding@resend.dev` (no verified domain required) to
`delivered@resend.dev` (Resend's test inbox), or to your own address to receive
it for real.

## Licence

Code: MIT.
