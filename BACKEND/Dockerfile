FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 8080

CMD ["sh", "-c", "npm run db:deploy && npm run dev"]