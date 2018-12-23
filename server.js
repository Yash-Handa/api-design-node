// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data

const express = require('express');
const fs = require('fs');
const { join } = require('path');
const app = express();

var jsonData = {
  count: 12,
  message: 'hey'
};

app.get('/', (req, res) => {
  fs.readFile(join(__dirname, 'index.html'), (err, buffer) => {
    if (err) res.status(500).send(err);
    const html = buffer.toString();
    res.status(200).send(html);
  });

    // node built in modules support callbacks only (probably)
    // .then((buffer) => {
    //   const html = buffer.toString();
    //   res.status(200).send(html);
    // }).catch((err) => {
    //   res.status(500).send(err);
    // });
});
app.get('/data', (req, res) => res.status(200).json(jsonData));

app.listen(3000, () => console.log('server running on port 3000'));
