FROM node:8-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn install && yarn run build

FROM node:8-alpine
ENV NODE_ENV production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package.json yarn.lock ./
COPY config ./config/
RUN yarn install --production
CMD yarn run start:prod
