// TODO: make this work.
// if you go to localhost:3000 the app
// there is expected crud to be working here
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can access data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var lions = [];
var id = 0;

// TODO: make the REST routes to perform CRUD on lions

app.get('/lions', (req, res) => {
  res.status(200).json(lions);
});

app.post('/lions', (req, res) => {
  const lion = req.body;
  lion.id = id;
  id++;
  lions.push(lion);
  res.status(201).json(lion);
});

const lionFinder = (req, res, next) => {
  const lion = lions.find(data => data.id == req.params.id);
  if (lion === undefined) {
    res.status(200).json({
      err: 'Lion not found',
      msg: `The lion with the id ${req.params.id} is not found`,
    });
  }
  res.locals.lion = lion;
  next();
};

app.get('/lions/:id', lionFinder, (req, res) => {
  res.status(200).json(res.locals.lion);
});

app.put('/lions/:id', lionFinder, (req, res) => {
  // lions[lions.indexOf(res.locals.lion)] = req.body;
  const index = lions.indexOf(res.locals.lion);
  lions[index] = {...lions[index], ...req.body};
  res.status(201).json(res.locals.lion);
});

app.delete('/lions/:id', lionFinder, (req, res) => {
  const index = lions.indexOf(res.locals.lion);
  lions = lions.slice(0, index).concat(lions.slice(index + 1, lions.length));
  res.status(201).json(res.locals.lion);
});

app.listen(3000);
console.log('Server is running on port 3000');
