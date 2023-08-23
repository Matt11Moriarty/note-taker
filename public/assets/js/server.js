const express = require('express');
const path = require('path');
const PORT = 3001;

const app = express();

app.use(express.static('public'));

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//path definitions
app.get('/notes', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../..`, 'notes.html'))
})


app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../..`, 'index.html'));
  });







app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);