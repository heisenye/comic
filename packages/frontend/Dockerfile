FROM node:latest as build-stage
WORKDIR /app

COPY dist ./dist


FROM nginx:latest as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]