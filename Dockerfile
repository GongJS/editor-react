FROM node:12
COPY ./ /app
WORKDIR /app
RUN npm i pnpm -g && pnpm i && npm run build
