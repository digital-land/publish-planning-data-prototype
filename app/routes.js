//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const _ = require('lodash')

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
  res.redirect('/results')
})