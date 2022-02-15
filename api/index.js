require('dotenv').config()
const { Service } = require('verificac19-sdk')
const schedule = require('node-schedule')
const bodyparser = require('body-parser')
const express = require('express')

schedule.scheduleJob('0 */12 * * *', () => {
  Service.updateAll()
})
// Create express instance
const app = express()
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())// Require API routes
const test = require('./routes/test')
const greenpass = require('./routes/greenpass')

// Import API Routes
app.use(test)
app.use(greenpass)
// Export express app
module.exports = app

const sync = async () => {
  await Service.updateAll()
}
console.log('main')
sync()
// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}
