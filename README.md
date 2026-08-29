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

## Contact form

The contact form posts to a SvelteKit form action that verifies a Friendly
Captcha solution and sends the message through Resend. Copy `.env.example` to
`.env` and fill it in; the file lists which variables are required and why.

`ORIGIN` and `ADDRESS_HEADER` matter in production: without the first, SvelteKit
rejects every submission as cross-site, and without the second every visitor
shares one rate-limit bucket. Neither is needed for `npm run dev`.

## Licence

Code: MIT.
