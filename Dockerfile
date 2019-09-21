FROM node:10

ENV APP_ROOT /app
ENV NODE_ENV production

WORKDIR ${APP_ROOT}

COPY . /app

RUN yarn install

EXPOSE 3000

CMD ["yarn", "run", "start:prod"]
