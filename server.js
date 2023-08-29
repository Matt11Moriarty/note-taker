const express = require('express');
const fs = require('fs');




const app = express();
//const db = require('./db/db.json');
// const path = require('path');

app.use(express.static('public'));
const routes = require('./routes')

app.use(routes);

const PORT = 3001;

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);