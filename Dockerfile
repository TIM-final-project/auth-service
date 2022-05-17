FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
ENV NEW_RELIC_NO_CONFIG_FILE=true
RUN npm i -g @nestjs/cli
RUN npm ci
COPY . .
EXPOSE 3001
CMD [ "npm", "run", "start" ]