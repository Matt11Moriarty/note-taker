const express = require('express');
const fs = require('fs');

const app = express();
//const db = require('./db/db.json');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

app.use(express.static('public'));

const PORT = 3001;

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//get paths
app.get('/notes', (req, res) => {
  res.sendFile(path.join(`${__dirname}`, '/public/notes.html'))
})

app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received to get reviews`);

  let dbData = fs.readFileSync('./db/db.json', "utf-8")
  res.json(JSON.parse(dbData));
})

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}`, '/public/index.html'));
});

app.delete('/api/notes/:id', (req, res) => {
  let dbFile = fs.readFileSync('./db/db.json');
  let dbFileObject = JSON.parse(dbFile);

  let trimmedDbFileObject = dbFileObject.filter((obj) => obj.id != req.params.id);

  dbFile = JSON.stringify(trimmedDbFileObject);
  fs.writeFileSync('./db/db.json', dbFile);

  res.status(200).json(`Note ${req.params.id} deleted.`)
})

//post path
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a review`);

  let response;
  req.body.id = uuidv4()

  const { title, text, id } = req.body

  if (req.body && req.body.title) {
    response = {
      status: 'success',
      title,
      text,
      id
    }
    const responseString = JSON.stringify(response.data);
    console.log(responseString);

    if (!fs.existsSync('./db/db.json')) {
      fs.writeFile('./db/db.json', '[]', (err) => err ? console.log(err) : console.log('db.json file created'))
    }

    let dbFile = fs.readFileSync('./db/db.json');

    let dbFileObject = JSON.parse(dbFile);

    dbFileObject.push(req.body);
    dbFile = JSON.stringify(dbFileObject);

    fs.writeFileSync('./db/db.json', dbFile);

    res.status(201).json(response);
  }
  else {
    res.status(500).json('Error in posting new note.')
  }
})


app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);