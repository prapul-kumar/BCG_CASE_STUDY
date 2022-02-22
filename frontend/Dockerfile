FROM node:14-alpine

WORKDIR /frontend

ENV PATH /frontend/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . ./

ARG API_URL

ENV API_URL=${API_URL}

CMD npm install && npm start