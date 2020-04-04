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
        <p>Clean up the queue. This removes failed and completed jobs.</p>
        <form action="/clean-queue" method="post">
          <label>Queue:</label>
          <select name="queue">
            <option value="">Please select</option>
            ${Object.values(QUEUE).map(
              queueName => `<option value="${queueName}">${queueName}</option>`,
            )}
          </select>
          <button type="submit">Clean</button>
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

  Promise.all([theQueue.clean(0, 'completed'), theQueue.clean(0, 'failed')])
    .then(() => {
      res.send('queue emptied');
    })
    .catch(next);
};

module.exports = { get, post };
