require('dotenv').config()

const cors = require('cors')
const express = require('express')

const {
  getJewels,
  getJewelById,
  getJewelFiltered
} = require('../utils/getters')
/*
const {
  HATEOAS
} = require('../utils/provideHATEOAS')
*/
const PORT = process.env.PORT ?? 3000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/joyas', async (req, res) => {
  getJewels(req.query)
    .then((dbResponse) => res.status(dbResponse?.code ? 500 : 200).json(dbResponse))
    .catch(({ code, message }) => res.status(500).json({ code, message }))
})

app.get('/joyas/joya/:id', async (req, res) => {
  getJewelById(req.params.id)
    .then((dbResponse) => res.status(dbResponse?.code ? 500 : 200).json(dbResponse))
    .catch(({ code, message }) => res.status(500).json({ code, message }))
})

app.get('/joyas/filtros', async (req, res) => {
  getJewelFiltered(req.query)
    .then((dbResponse) => res.status(dbResponse?.code ? 500 : 200).json(dbResponse))
    .catch(({ code, message }) => res.status(500).json({ code, message }))
})

app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'Page Not Found' }))

app.listen(PORT, () => console.log(`Server started at: http://localhost:${PORT}`))
