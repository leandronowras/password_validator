FROM node:16-alpine as build
WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "server"]