const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const _ = require('lodash')
const camden = require('../app/data/camden.json')
const { DateTime } = require('luxon');

router.all('*', (req, res, next) => {
  res.locals.query = req.query
  next()
})

router.post('/data-subject', (req, res) => {
  if(_.get(req, 'body.check.dataSubject') == 'Listed building') {
    res.redirect('/upload')
  } else {
    res.redirect('/dataset')
  }
})

router.get('/dataset', (req, res) => {
  let options = [
    { text: 'Article 4 direction dataset' },
    { text: 'Article 4 direction area dataset' }
  ]

  switch(_.get(req, 'session.data.check.dataSubject')) {
    case 'Conservation area':
      options = [
        { text: 'Conservation area dataset'},
        { text: 'Conservation area document dataset'}
      ]
      break
    case 'Tree preservation order':
      options = [
        { text: 'Tree preservation order dataset'},
        { text: 'Tree preservation zone dataset'},
        { text: 'Tree dataset'}
      ]
      break
  }

  options = options.map(option => {
    option.value = option.text
    return option
  })

  res.render('dataset', {
    options
  })
})

router.post('/dataset', (req, res) => {
  res.redirect('/upload')
})

router.post('/upload', (req, res) => {
  res.redirect('/errors')
})

router.get('/errors', (req, res) => {
  let rows = camden.slice(0, 10);

  rows = rows.map(row => {
    const newRow = {};
    for (const key in row) {
      newRow[key] = { value: row[key] };
    }
    return newRow;
  })

  rows.map(row => {
    let newRow = row
    let errorType = _.sample(['Reference missing', 'Start date must be today or in the past', 'Location not in England'])

    switch(errorType) {
      case 'Reference missing':
        newRow.Reference.value = ''
        newRow.Reference.error = errorType
        break
      case 'Start date must be today or in the past':
        newRow['Start date'].value = '01/12/2025'
        newRow['Start date'].error = errorType
        break
      case 'Location not in England':
        newRow['Geometry'].error = errorType
        break
    }
    return newRow
  })

  res.render('errors', {
    rows
  })
})

router.post('/errors', (req, res) => {
  if(req.session.data.check.fixErrors == 'Yes') {
    res.redirect('/upload')
  } else {
    res.redirect('/transformations')
  }
})

router.get('/transformations', (req, res) => {
  let rows = camden.slice(-20);

  rows = rows.map(row => {
    const newRow = {};
    for (const key in row) {
      newRow[key] = { value: row[key] };
    }
    return newRow;
  })
  .map(row => {
    let date = DateTime.fromFormat(row['Start date'].value, 'dd/MM/yyyy')
    row['Start date'].value = date.toFormat('yyyy-MM-dd')
    return row
  })

  res.render('transformations', {
    rows
  })
})

router.post('/transformations', (req, res) => {
  res.redirect('/has-webpage')
})

router.post('/download', (req, res) => {
  res.redirect('/has-webpage')
})

router.post('/has-webpage', (req, res) => {
  if(req.session.data.check.hasURL == 'Yes') {
    res.redirect('/url')
  } else {
    res.redirect('/no-webpage')
  }
})

router.post('/url', (req, res) => {
  res.redirect('/email-address')
})


router.post('/email-address', (req, res) => {
  res.redirect('/name')
})

router.post('/name', (req, res) => {
  res.redirect('/lpa')
})

router.post('/name', (req, res) => {
  // res.redirect('/start-date')
  res.redirect('/lpa')
})

router.post('/start-date', (req, res) => {
  res.redirect('/check')
})

router.post('/lpa', (req, res) => {
  res.redirect('/check')
})

router.post('/check', (req, res) => {
  delete req.session.data.check
  res.redirect('/confirmation')
})