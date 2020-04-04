const wrapperRoute = (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Queue Manager</title>
        <style type="text/css">
          iframe {
            flex: 1;
          }

          body {
            display: flex;
            flex-direction: column;
            height: 100%;
            margin: 0;
          }

          nav {
            background: #333;
            padding: 15px;
          }

          nav a {
            color: white;
            margin-right: 15px;
          }
        </style>
        
      </head>
      <body>
        <nav>
          <a onclick="return navigate(this)" href="/queues">Queues</a>
          <a onclick="return navigate(this)" href="/publish-job">Publish Job</a>
          <a onclick="return navigate(this)" href="/empty-queue">Empty Queue</a>
        </nav>
        <iframe src="/queues"></iframe>
        <script type="text/javascript">
          function navigate(element){
            console.log(element);
            document.querySelector('iframe').setAttribute('src', element.getAttribute('href'));
            return false;
          }
        </script>
      </body>
    </html>
  `);
};

module.exports = wrapperRoute;
