#FROM node:latest
#
#WORKDIR /app
#
#COPY package*.json ./
#
#RUN npm install -g pnpm
#
#RUN pnpm install
#
#COPY . .
#
#EXPOSE 888
#
#CMD ["pnpm", "start"]

FROM node:alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

FROM node:alpine as production-stage

WORKDIR /app

COPY --from=build-stage /app/node_modules ./node_modules

COPY --from=build-stage /app ./

RUN npm install pnpm -g

EXPOSE 888

CMD ["pnpm", "start"]
