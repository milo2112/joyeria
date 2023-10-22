const HATEOAS = async (jewels, { limit, page, order }, totalRecords) => {
  const inventory = jewels.map((item) => ({
    name: item.nombre,
    href: `/joyas/joya/${item.id}`
  }))
  const qryStrText = `/joyas?limit=${limit}&order=${order}&page=`
  return {
    total: inventory.length,
    next: ((page * limit) < totalRecords[0].count) ? `${qryStrText}${+page + 1}` : null,
    previous: page > 1 ? `${qryStrText}${page - 1}` : null,
    inventory
  }
}

module.exports = {
  HATEOAS
}
