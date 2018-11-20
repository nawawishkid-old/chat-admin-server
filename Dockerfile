FROM node

WORKDIR /usr/src/app 
COPY package*.json ./
COPY .env ./

ARG ENV 

RUN if [ $ENV = 'PROD' ]; then \
    npm install --only=production; \
  else \
    npm install; \
  fi;

COPY ./src ./src

EXPOSE 80 
CMD [ "npm", "start" ]
