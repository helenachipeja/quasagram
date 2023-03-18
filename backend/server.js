
const http = require('http');
const app = require('./index');

const port = process.env.PORT || 4000;
const server = http.createServer(app);


server.listen(port, () => {
  console.log(`Started on port ${port}`);
});

