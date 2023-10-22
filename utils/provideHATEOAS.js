const HATEOAS = async (jewels) => {
  const inventory = jewels.map((item) => ({
    name: item.nombre,
    href: `/joyas/joya/${item.id}`
  }))
  return {
    total: inventory.length,
    inventory
  }
}

module.exports = {
  HATEOAS
}
