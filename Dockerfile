# ---- build ----
FROM node:24-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- runtime ----
FROM node:24-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/build ./build

# ORIGIN is required: SvelteKit rejects form POSTs whose Origin header does not
# match it, which would break the contact form. ADDRESS_HEADER is required
# behind a reverse proxy, otherwise every visitor shares one rate-limit bucket.
# Both are set at run time, along with the secrets listed in .env.example.
EXPOSE 3000
CMD ["node", "./build"]
