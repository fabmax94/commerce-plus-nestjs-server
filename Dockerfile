FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g @nestjs/cli

RUN npm ci

COPY . /usr/src/app

RUN npm run build

