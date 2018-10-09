FROM node

WORKDIR /usr/src/app 
COPY package*.json ./

RUN npm install

COPY src ./

EXPOSE 11112
CMD [ "npm", "start" ]
