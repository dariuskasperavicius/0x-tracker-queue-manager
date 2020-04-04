const Queue = require('bull');

const { QUEUE } = require('./constants');

const get = (req, res) => {
  res.send(`
    <html>
      <head>
        <style type="text/css">
          label {
            display: block;
            font-weight: bold;
          }
          textarea {
            display: block;
          }
        </style>
      </head>
      <body>
        <p>This will remove all jobs which have not yet completed.</p>
        <form action="/empty-queue" method="post">
          <label>Queue:</label>
          <select name="queue">
            <option value="">Please select</option>
            ${Object.values(QUEUE).map(
              queueName => `<option value="${queueName}">${queueName}</option>`,
            )}
          </select>
          <button type="submit">Empty</button>
        </form>
      </body>
    </html>
  `);
};

const post = (req, res, next) => {
  const { queue } = req.body;

  const theQueue = new Queue(queue, {
    redis: {
      host: process.env.REDIS_HOST,
    },
  });

  theQueue
    .empty()
    .then(() => {
      res.send('queue emptied');
    })
    .catch(next);
};

module.exports = { get, post };
