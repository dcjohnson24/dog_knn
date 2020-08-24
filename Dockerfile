FROM node:14.8.0-slim

WORKDIR /

ENV PATH ./node_modules/.bin:$PATH

COPY package.json ./
RUN yarn add react-scripts
RUN yarn install
RUN yarn build

COPY . ./

CMD ["yarn", "start"]