const { createQueues, UI } = require('bull-board');
const express = require('express');

const redisConfig = {
  redis: {
    host: process.env.REDIS_HOST,
  },
};

const queues = createQueues(redisConfig);

queues.add('fill-processing');

const app = express();

app.use('/', UI);
app.listen(3002);

console.log(`Application started: http://localhost:3002`);
