const { executeQuery } = require('./pg')
const format = require('pg-format')

const { HATEOAS } = require('./provideHATEOAS')

const getJewels = async ({ limit = 6, page = 1, order = 'id_ASC' }) => {
  const totalRecords = await getTotalRecords()
  const queryString = { limit, page, order }
  const [field, direction] = order.split('_')
  const offSet = (limit * (page - 1))
  const query = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s;', field, direction, limit, offSet)
  const queryResult = await executeQuery(query)
  return HATEOAS(queryResult, queryString, totalRecords)
}

const getTotalRecords = async () => await executeQuery('SELECT count(id) FROM inventario;')

const getJewelById = async (id) => {
  return await executeQuery('SELECT * FROM inventario WHERE id = $1;', [id])
}

const getJewelFiltered = async ({ preciomax, preciomin, categoria, metal }) => {
  const filters = []
  let query = 'SELECT * from inventario'

  if (preciomax) filters.push(`precio <= ${preciomax}`)
  if (preciomin) filters.push(`precio >= ${preciomin}`)
  if (categoria) filters.push(`categoria = '${categoria}'`)
  if (metal) filters.push(`metal = '${metal}'`)

  if (filters.length > 0) query += ` WHERE ${filters.join(' AND ')}`

  return await executeQuery(query)
}

module.exports = {
  getJewels,
  getJewelById,
  getJewelFiltered
}
