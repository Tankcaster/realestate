const express = require('express');
const sqlite3 = require('sqlite3');
const multer = require('multer');
const fetch = require('node-fetch');

const landRouter = express.Router();

const db = new sqlite3.Database('./database.sqlite');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = __dirname + '/../public/images/' + req.body.address;
    if(!fs.exists(dir)) {
      fs.mkdir(dir, (err) => {
        if(err) console.log(err);
        cb(null, dir);
      });
    }
    else {
      cb(null, dir);
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload  = multer({storage: storage});

landRouter.get('/', (req, res, next) => {
  db.all(`SELECT * FROM Land`, (err, rows) => {
    if(err){
      console.log(err);
      return res.status(500).send();
    }
    res.json({land: rows});
  })
})

landRouter.get('/:landId', (req, res, next) => {
  db.get(`SELECT * FROM Land WHERE id=${req.params.landId}`, (err,  row) => {
    if(err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({land: row});
  })
})

landRouter.post('/', upload.array('img'), (req, res, next) => {
  sql = `
    INSERT INTO Land
    (address, acreage, utilities, fenced, ponds, outbuildings, easement),
    VALUES ($address, $acreage, $utilities, $fenced, $ponds, $outbuildings, $easement)`

  values = {
    $address: req.body.address,
    $acreage: req.body.acreage,
    $utilities: req.body.utilities,
    $fenced: req.body.fenced,
    $ponds: req.body.ponds,
    $outbuildings: req.body.outbuildings,
    $easement:  req.body.easement
  }

  db.run(sql, values, (err) => {
    if(err) {
      console.log(err);
      return res.status(500).send();
    }
  })
})

landRouter.delete('/:landId', (req, res) => {
  db.run(`DELETE FROM Land WHERE id=${req.params.landId}`, (err) => {
    if(err) {
      console.log(err);
      res.status(500).send(err);
    }
  })
})

module.exports = landRouter;
