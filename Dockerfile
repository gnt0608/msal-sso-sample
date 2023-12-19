# Build
FROM node:16-alpine as build-stage
WORKDIR /nuxtapp
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Deploy
FROM node:16-alpine as prod-stage
WORKDIR /nuxtapp
COPY --from=build-stage /nuxtapp/.output/  ./.output/
CMD [ "node", ".output/server/index.mjs" ]
