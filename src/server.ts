const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.static('build'));

const server = app.listen(PORT);

console.log(`HTTP server listening on port ${PORT}`);