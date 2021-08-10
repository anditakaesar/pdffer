import express from 'express'
import { json } from 'body-parser'
import helmet from 'helmet'
import compression from 'compression'
import path from 'path'
import { createPdf } from './helper'

const app = express()

app.use(json())
app.use(compression())
app.use(helmet({
  contentSecurityPolicy: false,
}))

app.use(express.static(path.join(__dirname, '../static')))

app.post('/genpdf', (req, res) => {
  process.nextTick(() => {
    let html = req.body.html
    let buff = Buffer.from(html, 'base64')
    createPdf(buff)
      .then((pdf) => {
        res.set({
          'Content-Type': 'application/pdf',
          'Content-Length': pdf.length,
          'Content-disposition': `inline; filename=test.pdf`
        })
        res.send(pdf)
      })
      .catch((err) => {
        res.json({
          message: 'error',
          error: err.message
        })
      })
  })
})


app.post('/genpdf2', (req, res, next) => {
  if (req.query.apikey == 'ABCDEF') {
    next()
  } else {
    res.status(401).json({
      message: 'unauthorized'
    })
  }
}, (req, res) => {
  process.nextTick(() => {
    let html = req.body.html
    let buff = Buffer.from(html, 'base64')
    createPdf(buff)
      .then((pdf) => {
        res.send(pdf.toString('base64'))
      })
      .catch((err) => {
        res.json({
          message: 'error',
          error: err.message
        })
      })
  })
})

export default app