const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./database.sqlite');

db.run(
  `CREATE TABLE IF NOT EXISTS Houses(
    id INTEGER PRIMARY KEY,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    price TEXT NOT NULL,
    image TEXT,
    beds INTEGER NOT NULL,
    baths INTEGER NOT NULL,
    acres INTEGER
  )`, (err) => {
    if(err){
      console.log(err);
    }
  });
