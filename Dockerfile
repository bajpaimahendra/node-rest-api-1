FROM node:12-alpine

#RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node-rest-api

#  copy from host current dir to container workdir
COPY package*.json ./ 

#Copy all the files from the project's root to /home/node-rest-api
#COPY . /home/node-rest-api

#USER node
#COPY --chown=node:node . .

#network ports, which will listen by container at runtime
#EXPOSE 7000

# install nodemon if not in package.json
#RUN npm install -g nodemon

# install modules which are in package.json
RUN npm install

# CMD [ "node", "app.js" ]