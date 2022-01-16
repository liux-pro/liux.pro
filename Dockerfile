FROM node:14-alpine

WORKDIR /app
# 充分利用缓存
COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

ENV HOST 0.0.0.0
EXPOSE 3000

RUN yarn build

CMD [ "yarn", "start" ]
