const { error } = require('console')

const DataFile = require('./DataFile')

module.exports = class genre extends DataFile {
    id
    name
}