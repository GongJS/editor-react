FROM node:12
COPY ./ /app
WORKDIR /app
RUN npm i pnpm -g && pnpm i && npm run build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf