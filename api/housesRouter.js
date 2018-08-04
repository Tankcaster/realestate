const express = require('express');
const sqlite = require('sqlite3');

const db = new sqlite.Database('./database.sqlite');

const housesRouter = express.Router();

housesRouter.get('/', (req, res, next) => {
  db.all(`SELECT * FROM Houses`, (err, rows) => {
    if(err) {
      console.log(err);
      return res.status(500).send();
    }
    res.json({houses: rows});
  });
});

housesRouter.get('/:houseId', (req, res, next) => {
  db.get(`SELECT * FROM Houses WHERE id=${req.params.houseId}`, (err, row) => {
    if(err) {
      console.log(err);
      return req.status(500).send();
    }
    res.json({house: row});
  })
})

module.exports = housesRouter;
