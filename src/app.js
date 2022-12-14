const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const path = require('path')
const ejs = require('ejs')
const router = require('./router/v1.js')
const generateDocs = require('./helper/GenerateDocs')
const logger = require('morgan')
require('dotenv').config()
const { APP_PORT } = process.env

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../public')))
app.use('/v1', router)
app.use(logger('dev'))
app.engine('ejs', ejs.renderFile)
app.set('views', path.join(`${__dirname}/../public/views`))
app.set('view engine', 'ejs')
generateDocs(app)

// error if url not found
app.get('*', function (req, res) {
  res.status(404).json({ Message: 'url not found' })
})

app.listen(APP_PORT, () => {
  console.log(`Listening at port ${APP_PORT}`)
})
