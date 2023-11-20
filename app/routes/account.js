module.exports = router => {

  router.post('/account/sign-in', (req, res) => {
    req.session.data.user = {}
    res.redirect('/datasets')
  })

  router.get('/account/sign-out', (req, res) => {
    req.session.data.user = null
    res.redirect('/account/sign-in')
  })


}