FROM node

WORKDIR /usr/src/app 
COPY package*.json ./

ARG ENV 

RUN if [ $ENV = 'PROD' ]; then \
    npm install --only=production; \
  else \
    npm install; \
  fi;

COPY ./src ./src

EXPOSE 11112
CMD [ "npm", "start" ]
