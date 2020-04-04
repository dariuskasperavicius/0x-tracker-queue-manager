const Queue = require('bull');

const { JOB, QUEUE } = require('./constants');

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
        <form action="/publish-job" method="post">
          <label>Queue:</label>
          <select name="queue">
            ${Object.values(QUEUE).map(
              queueName => `<option value="${queueName}">${queueName}</option>`,
            )}
          </select>
          <label>Job:</label>
          <select name="job">
            ${Object.values(JOB).map(
              jobName => `<option value="${jobName}">${jobName}</option>`,
            )}
          </select>
          <label>Timeout (ms):</label>
          <input type="number" name="timeout" />
          <label>Data:</label>
          <textarea name="data" rows="20" cols="100"></textarea>
          <button type="submit">Publish</button>
        </form>
      </body>
    </html>
  `);
};

const post = (req, res, next) => {
  const { queue, job, data, timeout } = req.body;

  const parsedData = JSON.parse(data);
  const parsedTimeout = parseInt(timeout, 10);

  new Queue(queue, {
    redis: {
      host: process.env.REDIS_HOST,
    },
  })
    .add(job, parsedData, {
      timeout: Number.isFinite(parsedTimeout) ? parsedTimeout : undefined,
    })
    .then(() => {
      res.send('job published');
    })
    .catch(next);
};

module.exports = { get, post };
