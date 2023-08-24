const express = require('express');
const path = require('path');
const PORT = 3001;
const fs = require('fs');

const app = express();
const db = require('../../../db/db.json')

app.use(express.static('public'));

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//path definitions
app.get('/notes', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../..`, 'notes.html'))
})

app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received to get reviews`);
  return res.json(db);
})

app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../..`, 'index.html'));
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
  }
  console.log(`Request: ${req}`)
  console.log(`Response: ${response}`)
  
})


app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);