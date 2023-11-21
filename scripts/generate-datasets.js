const fs = require('fs')
const path = require('path')
const faker =  require('@faker-js/faker').faker

const generateDataset = (params) => {
  return params
}

const generateDatasets = () => {
  const datasets = []

  datasets.push(generateDataset({
    id: '' + faker.number.int({ min: 123456, max: 999999 }),
    name: 'Brownfield land dataset',
    subject: 'Brownfield land data',
    status: 'Awaiting publication'
  }))
  datasets.push(generateDataset({
    id: '' + faker.number.int({ min: 123456, max: 999999 }),
    name: 'Article 4 direction dataset',
    subject: 'Article 4',
    status: 'Awaiting publication'
  }))
  datasets.push(generateDataset({
    id: '' + faker.number.int({ min: 123456, max: 999999 }),
    name: 'Article 4 direction area dataset',
    subject: 'Article 4',
    status: 'Not started'
  }))
  datasets.push(generateDataset({
    id: '' + faker.number.int({ min: 123456, max: 999999 }),
    name: 'Conservation area dataset',
    subject: 'Conservation area',
    status: 'Published'
  }))
  datasets.push(generateDataset({
    id: '' + faker.number.int({ min: 123456, max: 999999 }),
    name: 'Conservation area document dataset',
    subject: 'Conservation area',
    status: 'Not working'
  }))
  datasets.push(generateDataset({
    id: '' + faker.number.int({ min: 123456, max: 999999 }),
    name: 'Listed building',
    subject: 'Listed building',
    status: 'Not started'
  }))
  datasets.push(generateDataset({
    id: '' + faker.number.int({ min: 123456, max: 999999 }),
    name: 'Tree preservation order dataset',
    subject: 'Tree preservation order',
    status: 'Not working'
  }))
  datasets.push(generateDataset({
    id: '' + faker.number.int({ min: 123456, max: 999999 }),
    name: 'Tree preservation zone dataset',
    subject: 'Tree preservation order',
    status: 'Not started'
  }))
  datasets.push(generateDataset({
    id: '' + faker.number.int({ min: 123456, max: 999999 }),
    name: 'Tree preservation order dataset',
    subject: 'Tree dataset',
    status: 'Not started'
  }))

  return datasets
}

const generateDatasetsFile = (filePath) => {
  const datasets = generateDatasets()
  const filedata = JSON.stringify(datasets, null, 2)
  fs.writeFile(
    filePath,
    filedata,
    (error) => {
      if (error) {
        console.error(error)
      }
      console.log(`Datasets generated: ${filePath}`)
    }
  )
}

generateDatasetsFile(path.join(__dirname, '../app/data/datasets.json'))