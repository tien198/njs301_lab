const path = require('path')

exports.mainPath = () => path.dirname(require.main.filename)

exports.prodsDataPath = () => this.mainPath() + '/data/products.json'

exports.cartsDataPath = () => this.mainPath() + '/data/carts.json'