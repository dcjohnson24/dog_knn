FROM python:3.8-slim

RUN apt-get update && apt-get install -y gnupg2 && apt-get install -y curl \
    && apt-get install -y nodejs && apt-get install -y npm \
    && npm -g install yarn

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY public ./public
COPY src ./src
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock

RUN yarn add react-scripts
RUN yarn install
RUN yarn build

COPY api/requirements.txt ./api/requirements.txt

RUN pip install -r api/requirements.txt

COPY . .
