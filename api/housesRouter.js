const express = require('express');
const sqlite = require('sqlite3');
const multer = require('multer');
const fetch = require('node-fetch');
const fs = require('fs');
require('dotenv').config();

const db = new sqlite.Database('./database.sqlite');

const getExtension = (filename) => {
  return filename.substring(filename.lastIndexOf('.'), filename.length) || filename;
}

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

const upload = multer({storage: storage});

const housesRouter = express.Router();

housesRouter.param('houseId', (req, res, next, id) => {
  db.get(`SELECT * FROM Houses WHERE id=${id}`, (err, row) => {
    if(err) next(err);
    if(row) {
      req.house = row;
      next();
    }
    else {
      res.status(404).send();
    }
  })
})

housesRouter.get('/', (req, res, next) => {
  db.all(`SELECT * FROM Houses`, (err, rows) => {
    if(err) {
      console.log(err);
      return res.status(500).send();
    }
    res.json({houses: rows})
  });
});

housesRouter.get('/:houseId', (req, res, next) => {
  fs.readdir(__dirname + '/../public/images/' + req.house.address, (err, files) => {
    if(err) next(err);
    res.json({
      house: req.house,
      images: files
    });
  })
})

housesRouter.delete('/:houseId', (req, res, next) => {
  db.run(`DELETE FROM Houses WHERE id = ${req.params.houseId}`, (err) => {
    if(err) {
      console.log(err);
      return res.status(500).send();
    }
    return res.status(204).send();
  })
})

housesRouter.post('/', upload.array('img'), (req, res, next) => {
  let house = req.body;

  //call the google geocoding api
  fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + house.address.replace(' ', '+') + '&key=' + process.env.REACT_APP_MAP_KEY)
  .then(res => res.json())
  .then(res => {
    house.lat = res.results[0].geometry.location.lat;
    house.lng = res.results[0].geometry.location.lng;
  })
  .then(() => {
    sql = `INSERT INTO Houses
      (address, city, lat, lng, price, image, beds, baths, sqft)
      VALUES ($address, $city, $lat, $lng, $price, $image, $beds, $baths, $sqft)`;

    values = {
      $address: house.address,
      $city: house.city,
      $lat: house.lat,
      $lng: house.lng,
      $price: house.price,
      $image: req.files[0].filename,
      $beds: house.beds,
      $baths: house.baths,
      $sqft: house.sqft
    }

    db.run(sql, values, (err) => {
      if(err){
        console.log(err);
        return res.status(500).send();
      }
      res.status(201).send();
    })
  })
});

module.exports = housesRouter;
