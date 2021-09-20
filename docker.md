FROM node:10

WORKDIR /var/www/node-rest-api-1

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 3000

CMD ["npm", "start"]
