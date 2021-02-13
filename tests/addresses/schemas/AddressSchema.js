'use strict'

const REQUIRED = { required: true }

const STRING_REQUIRED = {
  ...REQUIRED,
  type: String
}

const SCHEMA = {
  street_name       : STRING_REQUIRED,
  street_number     : String,
  postal_code       : String,
  neighborhood      : String,
  city              : STRING_REQUIRED,
  state             : STRING_REQUIRED,
  state_short       : String,
  country           : STRING_REQUIRED,
  country_short     : String,
  formatted_address : STRING_REQUIRED,
  google_place_id   : String,
  geometry          : {},
  location          : [],
  is_bus_station    : {
    type    : Boolean,
    default : false
  },
  types             : []
}

module.exports = SCHEMA