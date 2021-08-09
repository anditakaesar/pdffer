import express from 'express'
import { json } from 'body-parser'
import helmet from 'helmet'
import compression from 'compression'
import path from 'path'

const app = express()

app.use(json())
app.use(compression())
app.use(helmet({
  contentSecurityPolicy: false,
}))

app.use(express.static(path.join(__dirname, '../static')))

app.post('/genpdf', (req, res) => {
  res.json({
    message: 'it works'
  })
})

export default app