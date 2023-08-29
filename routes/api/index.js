const express = require('express');
const api = require('express').Router();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

api.use(express.json());
api.use(express.urlencoded({ extended: true }));


api.get('/notes', (req, res) => {
    console.info(`${req.method} request received to get reviews`);
  
    let dbData = fs.readFileSync('./db/db.json', "utf-8")
    res.json(JSON.parse(dbData));
  })

api.delete('/notes/:id', (req, res) => {
    let dbFile = fs.readFileSync('./db/db.json');
    let dbFileObject = JSON.parse(dbFile);

    let trimmedDbFileObject = dbFileObject.filter((obj) => obj.id != req.params.id);

    dbFile = JSON.stringify(trimmedDbFileObject);
    fs.writeFileSync('./db/db.json', dbFile);

    res.status(200).json(`Note ${req.params.id} deleted.`)
})
  
//post path
api.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);

    let response;
    req.body.id = uuidv4()

    const { title, text, id } = req.body

    if (req.body && req.body.title) {
        response = {
        status: 'success',
        title,
        text,
        id}
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

module.exports = api;

