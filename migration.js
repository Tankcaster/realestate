const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./database.sqlite');

db.run(
  `CREATE TABLE IF NOT EXISTS Houses(
    id INTEGER PRIMARY KEY,
    address TEXT NOT NULL,
    city TEXT,
    lat REAL,
    lng REAL,
    price TEXT NOT NULL,
    image TEXT,
    beds INTEGER,
    baths INTEGER,
    built INTEGER,
    sqft INTEGER,
    acreage INTEGER,
    treeCover TEXT,
    fencing TEXT,
    animals TEXT,
    description TEXT
  )`, (err) => {
    if(err){
      console.log(err);
    }
});
