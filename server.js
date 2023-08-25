const express = require('express');
const path = require('path');
const PORT = 3001;
const fs = require('fs');

const app = express();
const db = require('./db/db.json')

app.use(express.static('public'));

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//path definitions
app.get('/notes', (req, res) => {
    res.sendFile(path.join(`${__dirname}`, '/public/notes.html'))
})

app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received to get reviews`);
  return res.json(db);
})

app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}`, '/public/index.html'));
  });


app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a review`);

  let response;
  const { title, text } = req.body;

  if(req.body && req.body.title) {
    response = {
      status: 'success',
      data: req.body,
    }
    res.status(201).json(response);
    } 
  else {
      res.status(500).json('Error in posting new note.')
    }

  const responseString = JSON.stringify(response.data);
  console.log(responseString);

  if(!fs.existsSync('./db/db.json')) {
    fs.writeFile('./db/db.json', '[]', (err) => err ? console.log(err) : console.log('db.json file created'))
  }

  let dbFile = fs.readFileSync('./db/db.json');

  let dbFileObject = JSON.parse(dbFile);

  dbFileObject.push(req.body);
  dbFile = JSON.stringify(dbFileObject);

  fs.writeFileSync('./db/db.json', dbFile);

  //fs.appendFile('../../../db/db.json', responseString, (err) => err ? console.log(err) : console.log('Notes added to JSON file'))
})


app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);