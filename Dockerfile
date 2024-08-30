FROM node:18-alpine As build

WORKDIR /app
COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN npm install -g pnpm@latest
# Bundle app source
COPY --chown=node:node . .


ARG NODE_ENV
ARG NUXT_PUBLIC_URL
ARG NUXT_CMS_URL
ARG RECAPTCHA_SITE
ARG RECAPTCHA_SECRET
ARG RECAPTCHA_VERSION
ARG RECAPTCHA_HOST

RUN npm install
RUN npm run build

USER node
FROM node:18-alpine As production

WORKDIR /nuxt

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/.output/. ./
COPY --chown=node:node --from=build /app/.nuxt/. ./nuxt

EXPOSE 3000/tcp
CMD [ "node", "server/index.mjs"]




# dev > staging
# dev > uat 
# dev > prod
