const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


router.all('*', (req, res, next) => {
  res.locals.query = req.query
  next()
})

require('./routes/mvp')(router)
require('./routes/account')(router)
require('./routes/datasets')(router)

