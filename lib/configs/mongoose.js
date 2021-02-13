'use strict'

const mongoose = require('mongoose')

const URL = process.env.NODE_ENV != 'test' ?
  process.env.MONGODB_URL :
  process.env.MONGODB_URL_TEST

let db

/**
 * Gets/Creates the `mongoose` connection object
 *
 * @return {mongoose.Connection} The `mongoose` connection object
*/
function getMongooseConnection() {
  if (!db || (db && db.readyState == 0))
    db = mongoose.createConnection(URL)

  return db
}

module.exports = getMongooseConnection