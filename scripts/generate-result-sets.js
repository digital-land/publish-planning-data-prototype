const fs = require('fs')
const path = require('path')
const faker =  require('@faker-js/faker').faker
const _ = require('lodash');
const { DateTime } = require('luxon');

const generateRecord = (params = {}) => {
  let record = {}

  record.reference = "12345"

  record.siteName = "Site name"

  record.geoX = "GeoX"
  record.geoY = "GeoY"

  return record
}

const generateRecords = (params = {}) => {
  const records = []

  for(let i = 0; i < 5; i++) {
    recoerds.push(generateRecord())
  }


  return records
}

const generateResultSet = (params = {}) => {
  let resultSet = {}
  resultSet.id = _.get(params, 'id')  || ('' + faker.number.int({min: 123456, max: 999999}))
  resultSet.errors = [{

  }]
  resultSet.transformations = []

  resultSet.records = generateRecords()

  return resultSet
}

const generateResultSets = () => {
  const resultSets = []

  resultSets.push(generateResultSet())

  for(let i = 0; i < 5; i++) {
    resultSets.push(generateResultSet())
  }

  return resultSets
}

const generateResultSetsFile = (filePath) => {
  const resultSets = generateResultSets()
  const filedata = JSON.stringify(resultSets, null, 2)
  fs.writeFile(
    filePath,
    filedata,
    (error) => {
      if (error) {
        console.error(error)
      }
      console.log(`Result sets generated: ${filePath}`)
    }
  )
}

generateResultSetsFile(path.join(__dirname, '../app/data/result-sets.json'))
