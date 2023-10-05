//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const _ = require('lodash')

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
  _.set(req.session.data, 'hasErrors', !_.get(req.session.data, 'hasErrors'))
  res.redirect('/results')
})

router.post('/results', (req, res) => {
  res.redirect('/download')
})

router.post('/download', (req, res) => {
  res.redirect('/email-address')
})

router.post('/email-address', (req, res) => {
  res.redirect('/name')
})

router.post('/name', (req, res) => {
  res.redirect('/lpa')
})

router.post('/lpa', (req, res) => {
  res.redirect('/url')
})

router.post('/url', (req, res) => {
  res.redirect('/check')
})

router.post('/check', (req, res) => {
  delete req.session.data.check
  res.redirect('/confirmation')
})