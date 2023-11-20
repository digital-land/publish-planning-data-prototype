const _ = require('lodash')
const Pagination = require('../helpers/pagination')

module.exports = router => {

  router.get('/datasets', (req, res) => {
    let datasets = req.session.data.datasets

    let emailAddress = _.get(req.session.data.search, 'emailAddress')

    if(emailAddress) {
      datasets = datasets.filter(dataset => {
        return dataset.personalDetails.emailAddress.indexOf(emailAddress) > -1
      })
    }

    // ['Received', ...]
    let selectedStatusFilters = _.get(req.session.data.filters, 'statuses')
    let selectedNumberOfBallsFilters = _.get(req.session.data.filters, 'numberOfBalls')

    let hasFilters = _.get(selectedStatusFilters, 'length') || _.get(selectedNumberOfBallsFilters, 'length')

    let selectedFilters = {
      categories: []
    }

    // the user has selected a status filter
    if(hasFilters) {
      datasets = datasets.filter(dataset => {
        let matchesStatus = true
        let matchesNumberOfBalls = true

        if(_.get(selectedStatusFilters, 'length')) {
          matchesStatus = selectedStatusFilters.includes(dataset.status);
        }

        if(_.get(selectedNumberOfBallsFilters, 'length')) {
          matchesNumberOfBalls = selectedNumberOfBallsFilters.includes(dataset.experience.numberOfBalls);
        }

        return matchesStatus && matchesNumberOfBalls
      })
    }

    if(_.get(selectedStatusFilters, 'length')) {
      selectedFilters.categories.push({
        heading: { text: 'Status' },
        items: selectedStatusFilters.map(label => {
          return {
            text: label,
            href: `/datasets/remove-status/${label}`
          }
        })
      })
    }

    if(_.get(selectedNumberOfBallsFilters, 'length')) {
      selectedFilters.categories.push({
        heading: { text: 'Number of balls' },
        items: selectedNumberOfBallsFilters.map(label => {
          return {
            text: label,
            href: `/datasets/remove-numberOfBalls/${label}`
          }
        })
      })
    }

    let pageSize = 25
    let pagination = new Pagination(datasets, req.query.page, pageSize)
    datasets = pagination.getData()

    res.render('datasets/index', {
      datasets,
      selectedFilters,
      pagination
    })
  })

  router.get('/datasets/clear-search', (req, res) => {
    _.set(req, 'session.data.search.emailAddress', '')
    res.redirect('/datasets')
  })

  router.get('/datasets/remove-status/:status', (req, res) => {
    _.set(req, 'session.data.filters.statuses', _.pull(req.session.data.filters.statuses, req.params.status))
    res.redirect('/datasets')
  })

  router.get('/datasets/remove-numberOfBalls/:numberOfBalls', (req, res) => {
    _.set(req, 'session.data.filters.numberOfBalls', _.pull(req.session.data.filters.numberOfBalls, req.params.numberOfBalls))
    res.redirect('/datasets')
  })

  router.get('/datasets/clear-filters', (req, res) => {
    _.set(req, 'session.data.filters.statuses', null)
    _.set(req, 'session.data.filters.numberOfBalls', null)
    res.redirect('/datasets')
  })

  router.get('/datasets/:datasetId', (req, res) => {
    let dataset = req.session.data.datasets.find(dataset => dataset.id === req.params.datasetId)

    res.render('datasets/show', {
      dataset
    })
  })




}