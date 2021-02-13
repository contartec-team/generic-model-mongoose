/* eslint-disable require-jsdoc */
'use strict'

require('module-alias/register')
require('dotenv').load()

const chai = require('chai')

const mongoose = require('mongoose')

chai
  .use(require('sinon-chai'))
  .use(require('chai-things'))
  .use(require('chai-as-promised'))
  .use(require('chai-shallow-deep-equal'))

global.expect = chai.expect

before(clearMongooseCollections)

after(() => mongoose.disconnect())

async function clearMongooseCollections() {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(process.env.MONGODB_URL_TEST, async e => {
      if (!e)
        return await clearCollections()
      else
        throw e
    })
  }
  else
    return await clearCollections()
}

function clearCollections() {
  const promises = []

  for (var collection in mongoose.connection.collections) {
    const promise = mongoose.connection.collections[collection].remove()

    promises.push(promise)
  }

  return Promise.all(promises)
}