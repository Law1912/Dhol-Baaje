FROM node:lts-alpine

WORKDIR /app

COPY --chown=node:node /dist/apps/shankhnaad  /app
COPY --chown=node:node /libs/shankhnaad-gen/src/gql /app
COPY --chown=node:node /libs/shankhnaad-gen/src/fluree /app
COPY --chown=node:node .npmrc .npmrc
COPY --chown=node:node package.json package.json

RUN corepack enable && \
    corepack prepare pnpm@latest --activate
RUN cp .npmrc .npmrc.tmp && \
    cat .npmrc.tmp | grep _authToken > .npmrc && \
    pnpm install --production && \
    rm -f .npmrc .npmrc.tmp
RUN apk update && \
    apk add -q -f dumb-init && \
    rm -rf /var/cache/apk/*

USER node
CMD dumb-init node main.js