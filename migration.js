const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./database.sqlite');

db.run(
  `CREATE TABLE IF NOT EXISTS Houses(
    id INTEGER PRIMARY KEY,
    land INTEGER,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    lat REAL,
    lng REAL,
    price TEXT NOT NULL,
    image TEXT,
    beds INTEGER NOT NULL,
    baths INTEGER NOT NULL,
    built INTEGER,
    sqft INTEGER NOT NULL
  )`, (err) => {
    if(err){
      console.log(err);
    }
});

db.run(
  `CREATE TABLE IF NOT EXISTS Land(
    id INTEGER PRIMARY KEY,
    house INTEGER,
    address TEXT NOT NULL,
    acreage INTEGER NOT NULL,
    utilities TEXT,
    fenced BOOLEAN,
    ponds TEXT,
    outbuildings TEXT,
    easement TEXT
  )`, (err) => {
    if(err) console.log(err);
  }
)
