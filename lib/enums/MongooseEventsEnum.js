'use strict'

/**
 * Mongoose hook events
 * @enum MongooseEventsEnum
*/
const MongooseEventsEnum = {
  SAVE                : 'save',
  REMOVE              : 'remove',
  COUNT               : 'count',
  DELETE_MANY         : 'deleteMany',
  DELETE_ONE          : 'deleteOne',
  FIND                : 'find',
  FIND_ONE            : 'findOne',
  FIND_ONE_AND_DELETE : 'findOneAndDelete',
  FIND_ONE_AND_REMOVE : 'findOneAndRemove',
  FIND_ONE_AND_UPDATE : 'findOneAndUpdate',
  UPDATE              : 'update',
  UPDATE_ONE          : 'updateOne',
  UPDATE_MANY         : 'updateMany',

  toArray   : function() {
    const values = []

    for (const key in MongooseEventsEnum) {
      if (typeof(MongooseEventsEnum[key]) == 'string')
        values.push(MongooseEventsEnum[key])
    }

    return values
  },

  toObjectArray : function() {
    const values = []

    for (const key in MongooseEventsEnum) {
      if (typeof(MongooseEventsEnum[key]) == 'number') {
        values
          .push({
            id        : MongooseEventsEnum[key],
            comment   : key
          })
      }
    }

    return values
  }
}

module.exports = MongooseEventsEnum