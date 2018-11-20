# Chat template administration

[![travis-ci build result](https://travis-ci.org/nawawishkid/chat-admin-server.svg?branch=master)](https://travis-ci.org/nawawishkid/chat-admin-server)
[![Coverage Status](https://coveralls.io/repos/github/nawawishkid/chat-admin-server/badge.svg?branch=master)](https://coveralls.io/github/nawawishkid/chat-admin-server?branch=master)  

## Stack/Dependencies
- [x] [MongoDB](https://www.mongodb.com/) as a NoSQL database.
- [x] [Redis](https://redis.io/) as an in-memory database for storing revoked access token (JWT).
- [x] [Express.js](https://expressjs.com/) as a web framework.
- [x] [Mongoose](https://mongoosejs.com/) for MongoDB modeling.
- [x] [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), [SuperTest](https://github.com/visionmedia/supertest) and [node-mocks-http](https://github.com/howardabrams/node-mocks-http) for both unit and API testing. 
- [x] [Istanbul](https://istanbul.js.org/) for test coverage.

## Enhancement

- [ ] App logging, logs to console in development environment, to file in production environment.
- [ ] Login with some social media platforms.
- [ ] Email notification on registration.
