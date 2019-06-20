const express = require('express');
const Status = require('./services/status');
const app = express();
const PORT = 8080;

app.use(express.static('build'));

app.get('/status', (req, res) => Status.readStatus(res));

app.listen(PORT);

console.log(`HTTP server listening on port ${PORT}`);