FROM node:8

ENV APP_ROOT /app
ENV NODE_ENV production

WORKDIR ${APP_ROOT}

COPY . /app

RUN yarn

EXPOSE 3000

CMD ["yarn", "run", "start:prod"]
