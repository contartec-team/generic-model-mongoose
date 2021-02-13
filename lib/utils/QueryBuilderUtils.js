'use strict'

const OPERATORS = [
  {
    name      : 'start',
    operator  : '$gte'
  },
  {
    name      : 'end',
    operator  : '$lte'
  },
  {
    name      : 'start_ex',
    operator  : '$gt'
  },
  {
    name      : 'end_ex',
    operator  : '$lt'
  },
  {
    name      : 'in',
    operator  : '$in',
    type      : 'array'
  },
  {
    name      : 'not',
    operator  : '$ne'
  }
]

// TODO: Refactor/Add doc
/**
 * Contains a set of `mongo` query builder utils
 * @class QueryBuilderUtils
*/
class QueryBuilderUtils {
  static getFilterObject(filters) {
    const whereObject = {}

    for (const filter in filters) {
      const operatorObject = QueryBuilderUtils.getOperatorObject(filter)

      const attr = QueryBuilderUtils.getAttrName(filter, operatorObject)

      if (operatorObject && !operatorObject.type) {
        const innerObject = {
          [operatorObject.operator]: filters[filter]
        }

        whereObject[attr] = Object
          .assign({}, whereObject[attr], innerObject)
      }
      else if (operatorObject && operatorObject.type) {
        if (operatorObject.type == 'array') {
          const innerObject = {}

          if ( Array.isArray(filters[filter]) )
            innerObject[operatorObject.operator] = filters[filter]
          else
            innerObject[operatorObject.operator] = [filters[filter]]

          whereObject[attr] = innerObject
        }
      }
      else {
        whereObject[attr] = filters[filter]
      }
    }

    return whereObject
  }

  static getOperatorObject(attr, index = 0) {
    if (index < OPERATORS.length) {
      const OPERATOR = OPERATORS[index]
      const regex = QueryBuilderUtils
        ._getOperatorRegex(OPERATOR.name)

      if (attr.match(regex))
        return OPERATOR
      else
        return QueryBuilderUtils.getOperatorObject(attr, ++index)
    }
    else
      return null
  }

  static getAttrName(attr, operator) {
    let attrName = attr

    if (!operator)
      operator = QueryBuilderUtils.getOperatorObject(attr)

    if (operator) {
      const regex = QueryBuilderUtils
        ._getOperatorRegex(operator.name)

      attrName = attr.replace(new RegExp(regex), '')
    }

    return attrName
  }

  static _getOperatorRegex(filter) {
    return `(_(${filter}))$`
  }

  static get OPERATORS()  { return OPERATORS }
}

module.exports = QueryBuilderUtils