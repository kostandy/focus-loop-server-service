# Base stage for shared settings
FROM node:lts-alpine AS base

WORKDIR /usr/src/app
COPY package*.json ./
COPY --chown=node:node ./src ./src

# Development stage
FROM base AS development
ENV NODE_ENV=development
RUN npm install
USER node
CMD ["node", "index.js"]

# Build stage
FROM base AS build
RUN npm ci
RUN npm run build

# Production stage
FROM base AS production
ENV NODE_ENV=production
RUN npm prune --production \
    && npm cache clean --force \
    && chown -R node:node /usr/src/app

USER node
RUN rm -rf src/

CMD ["node", "./dist/index.cjs"]