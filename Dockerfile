FROM node:8

ENV APP_ROOT /app
ENV NODE_ENV production

WORKDIR ${APP_ROOT}

COPY . /app

RUN npm install -q

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
