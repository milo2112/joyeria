const activityReport = (req, _, next) => {
  console.log('Method:', req.method)
  console.log('Path:', req.path)
  console.log('Params:', req.params)
  console.log('Body:', req.body)
  next()
}

module.exports = {
  activityReport
}
