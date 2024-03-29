
// const express = require('express');
const html = require('express').Router();
const path = require('path');

//GET Route for homepage
html.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/public/index.html'));
  });

//GET Route for notes page
html.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/public/notes.html'))
  })


module.exports = html;