FROM node:14.9.0-slim

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY public ./public
COPY src ./src
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock

RUN yarn add react-scripts
RUN yarn install
RUN yarn build

COPY . .

CMD ["yarn", "start"]
