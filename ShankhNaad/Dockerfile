FROM node:lts-alpine

WORKDIR /app

COPY --chown=node:node /ShankhNaad /app

RUN corepack enable && \
    corepack prepare pnpm@latest --activate
RUN pnpm install 
    # npm run build
RUN apk update && \
    apk add -q -f dumb-init && \
    rm -rf /var/cache/apk/*

CMD pnpm run dev