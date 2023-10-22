const { executeQuery } = require('./pg')

const { HATEOAS } = require('./provideHATEOAS')

const getJewels = async () => {
  const queryResult = await executeQuery('SELECT * FROM inventario;')
  return HATEOAS(queryResult)
}

const getJewelById = async (id) => {
  return await executeQuery('SELECT * FROM inventario WHERE id = $1;', [id])
}

module.exports = {
  getJewels,
  getJewelById
}
