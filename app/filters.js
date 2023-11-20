//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here
addFilter('statusColour', status => {
  switch(status) {
    case 'Not started':
      return 'govuk-tag--grey'
    case 'Awaiting publication':
      return 'govuk-tag--purple'
    case 'Not working':
      return 'govuk-tag--red'
    case 'Published':
      return 'govuk-tag--green'
  }
})
