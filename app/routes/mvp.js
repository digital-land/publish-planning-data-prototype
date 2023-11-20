const _ = require('lodash')
const camden = require('../data/camden.json')

module.exports = router => {

  router.post('/mvp/data-subject', (req, res) => {
    if(_.get(req, 'body.check.dataSubject') == 'Listed building') {
      res.redirect('/mvp/upload')
    } else {
      res.redirect('/mvp/dataset')
    }
  })

  router.get('/mvp/dataset', (req, res) => {
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

    res.render('mvp/dataset', {
      options
    })
  })

  router.post('/mvp/dataset', (req, res) => {
    res.redirect('/mvp/upload')
  })

  router.post('/mvp/upload', (req, res) => {
    if(req.body.check.file == 'no-errors.csv') {
      res.redirect('/mvp/no-errors')
    } else {
      res.redirect('/mvp/errors')
    }
  })

  router.get('/mvp/no-errors', (req, res) => {
    let rows = camden.map(row => {
      const newRow = {};
      for (const key in row) {
        newRow[key] = { value: row[key] };
      }
      return newRow;
    })

    res.render('mvp/no-errors', {
      rows
    })
  })

  router.get('/mvp/errors', (req, res) => {
    // let rows = camden.slice(0, 10);
    let rows = camden

    rows = rows.map(row => {
      const newRow = {};
      for (const key in row) {
        newRow[key] = { value: row[key] };
      }
      return newRow;
    })

    rows.map(row => {
      let newRow = row
      newRow.Reference.value = ''
      return newRow
    })

    rows.map(row => {
      let newRow = row
      let errorType = _.sample(['','','','','','','','','','', 'Start date must be today or in the past', 'Location not in England'])

      newRow.Reference.value = ''
      newRow.Reference.error = errorType

      switch(errorType) {
        case 'Reference missing':
          // newRow.Reference.value = ''
          // newRow.Reference.error = errorType
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

    const locationErrorCount = rows.reduce((acc, row) => {
      if (row.Geometry.error) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const referenceErrorCount = rows.reduce((acc, row) => {
      if (row.Reference.error) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const startDateErrorCount = rows.reduce((acc, row) => {
      if (row['Start date'].error) {
        return acc + 1;
      }
      return acc;
    }, 0);
    res.render('mvp/errors', {
      rows,
      referenceErrorCount,
      locationErrorCount,
      startDateErrorCount
    })


  })

  router.post('/mvp/email-address', (req, res) => {
    res.redirect('/mvp/name')
  })

  router.post('/mvp/name', (req, res) => {
    res.redirect('/mvp/lpa')
  })

  router.post('/mvp/name', (req, res) => {
    res.redirect('/mvp/lpa')
  })

  router.post('/mvp/start-date', (req, res) => {
    res.redirect('/mvp/check')
  })

  router.post('/mvp/lpa', (req, res) => {
    res.redirect('/mvp/check')
  })

  router.post('/mvp/check', (req, res) => {
    res.redirect('/mvp/confirmation')
  })

}