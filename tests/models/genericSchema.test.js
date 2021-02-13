'use strict'

const rewire = require('rewire')

const genericSchema = rewire('../../lib/models/genericSchema')

const GenericModel = require('../../lib/models/GenericModel')

const SCHEMA = require('../addresses/schemas/AddressSchema')

const MongooseEventsEnum = require('../../lib/enums/MongooseEventsEnum')

const SpyMock = require('@contartec-team/spy-mock/lib/SpyMock')

describe('genericSchema', () => {
  context('when `schema` is valid', () => {
    context('when `dbConnectFunction` is a `Function`', () => {
      const DB_CONNECTION_FUNCTION = () => {}

      let models, spies

      before(() => {
        const noop = () => {}

        const genericSchemaMock = {
          pre       : noop,
          loadClass : () => {
            return { plugin: noop }
          }
        }

        spies = {
          pre: SpyMock
            .addReturnSpy(genericSchemaMock, 'pre', null, false),

          genericSchema: SpyMock
            .addDependencySpy(genericSchema, 'mongoose.Schema', genericSchemaMock, false)
        }

        models = genericSchema(SCHEMA, {}, DB_CONNECTION_FUNCTION)
      })

      after(() => SpyMock.restoreAll())

      it('should return the `GenericModel`', () => {
        expect(models).to.have.property('GenericModel', GenericModel)
      })

      it('should return the `mongoose.Schema`', () => {
        expect(models).to.have.property('GenericSchema')
      })

      it('should pass the `dbConnectionFunction` to `pre` events', () => {
        const args = MongooseEventsEnum
          .toArray()
          .map(() => DB_CONNECTION_FUNCTION)

        const preArgs = spies.pre.args
          .map(a => a[1])

        expect(spies.pre.callCount).to.eql(MongooseEventsEnum.toArray().length)
        expect(preArgs).to.have.same.members(args)
      })
    })

    context('when `dbConnectFunction` is a `Boolean`', () => {
      let models, spies

      before(() => {
        const noop = () => {}

        const genericSchemaMock = {
          pre       : noop,
          loadClass : () => {
            return { plugin: noop }
          }
        }

        spies = {
          pre: SpyMock
            .addReturnSpy(genericSchemaMock, 'pre', null, false),

          mongooseConnection: SpyMock
            .addDependencySpy(genericSchema, 'mongooseConnection', () => {}, false),

          genericSchema: SpyMock
            .addDependencySpy(genericSchema, 'mongoose.Schema', genericSchemaMock, false)
        }

        models = genericSchema(SCHEMA, {}, true)
      })

      after(() => SpyMock.restoreAll())

      it('should return the `GenericModel`', () => {
        expect(models).to.have.property('GenericModel', GenericModel)
      })

      it('should return the `mongoose.Schema`', () => {
        expect(models).to.have.property('GenericSchema')
      })

      it('should pass the `dbConnectionFunction` to `pre` events', () => {
        const args = MongooseEventsEnum
          .toArray()
          .map(() => spies.mongooseConnection)

        const preArgs = spies.pre.args
          .map(a => a[1])

        expect(spies.pre.callCount).to.eql(MongooseEventsEnum.toArray().length)
        expect(preArgs).to.have.same.members(args)
      })
    })

    context('when `dbConnectFunction` is `null`', () => {
      let models, spies

      before(() => {
        const noop = () => {}

        const genericSchemaMock = {
          pre       : noop,
          loadClass : () => {
            return { plugin: noop }
          }
        }

        spies = {
          pre: SpyMock
            .addReturnSpy(genericSchemaMock, 'pre', null, false),

          mongooseConnection: SpyMock
            .addDependencySpy(genericSchema, 'mongooseConnection', () => {}, false),

          genericSchema: SpyMock
            .addDependencySpy(genericSchema, 'mongoose.Schema', genericSchemaMock, false)
        }

        models = genericSchema(SCHEMA, {}, true)
      })

      after(() => SpyMock.restoreAll())

      it('should return the `GenericModel`', () => {
        expect(models).to.have.property('GenericModel', GenericModel)
      })

      it('should return the `mongoose.Schema`', () => {
        expect(models).to.have.property('GenericSchema')
      })

      it('should not pass the `dbConnectionFunction` to `pre` events', () => {
        expect(spies.pre).to.not.have.been.calledOnce
      })
    })
  })
})