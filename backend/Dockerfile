FROM node:23-slim

WORKDIR /backend

COPY package*.json ./

RUN npm install
RUN apt-get update -y && apt-get install -y openssl

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]