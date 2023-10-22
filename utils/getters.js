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

module.exports = {
  getJewels,
  getJewelById
}
