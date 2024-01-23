FROM node:21 as build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i @nestjs/core @nestjs/common rxjs reflect-metadata
RUN npm ci
COPY . .
RUN npm run build


FROM node:21-alpine as main

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 3001
CMD [ "node", "dist/main.js" ]