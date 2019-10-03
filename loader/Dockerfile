FROM node:12-alpine

LABEL maintainer="Andrew.Roberts@solace.com"

# create directories
RUN mkdir -p /usr/app/src
RUN mkdir -p /usr/app/dist

# copy source code and .env file
COPY package*.json /usr/app/
COPY .env /usr/app/
COPY src /usr/app/src/

# set container's base dir
WORKDIR /usr/app

# install dependencies, build app, and then remove dev packages
RUN npm install
RUN npm run build
RUN npm prune --production

# start the app
CMD [ "npm", "run", "exec"]