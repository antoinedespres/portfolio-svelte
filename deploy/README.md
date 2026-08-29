# Deployment

The site runs as a Docker container on the OVH VPS, behind Caddy. Every push to
`main` builds an image, pushes it to GHCR and restarts the container, matching
the pattern used by the other services on that host.

## Pipeline

`.github/workflows/release-and-deploy.yml` runs four jobs in order:

1. **verify** — `npm audit`, `npm run check`, `npm run lint`, `npm run build`.
   A failure here stops the deploy.
2. **version-and-tag** — bumps `VERSION`, commits it with `[skip ci]`, tags.
3. **build-and-push** — builds the Dockerfile, pushes
   `ghcr.io/antoinedespres/portfolio-svelte:{version,latest}`.
4. **deploy** — SSHes to the VPS, `docker compose pull && up -d`.

## Required GitHub secrets

| Secret         | Value                                                       |
| -------------- | ----------------------------------------------------------- |
| `VPS_HOST`     | the VPS IP                                                  |
| `VPS_SSH_PORT` | the SSH port                                                |
| `VPS_SSH_USER` | `ubuntu`                                                    |
| `VPS_SSH_KEY`  | private half of a deploy key in the VPS's `authorized_keys` |

## Host layout

    ~/apps/portfolio-svelte/
      docker-compose.yml   <- copy of deploy/docker-compose.yml
      .env                 <- secrets, never committed

`.env` needs everything from `.env.example` in the repo root. `ORIGIN` and
`ADDRESS_HEADER` are not optional: without the first, SvelteKit rejects every
contact-form submission as a cross-site POST; without the second, Caddy's
address is what `getClientAddress()` returns, so all visitors share one
rate-limit bucket.

## Caddy

Append `Caddyfile.snippet` to `/etc/caddy/Caddyfile` and reload. Caddy obtains
the TLS certificate automatically, but only once `antoinedespres.com` resolves
to the VPS.

## Rollback

Images are tagged per version, so to go back:

    cd ~/apps/portfolio-svelte
    docker compose down
    docker run -d --name portfolio-svelte --restart unless-stopped \
      --env-file .env -p 127.0.0.1:3000:3000 \
      ghcr.io/antoinedespres/portfolio-svelte:<previous-version>

or pin the `image:` line in `docker-compose.yml` to that tag and `up -d`.
