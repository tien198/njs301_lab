const path = require('path')

exports.mainDirPath = () => path.dirname(require.main.filename)

exports.dataDirPath = () => path.join(this.mainDirPath(), 'data')

exports.movieDataPath = () => path.join(this.mainDirPath(), 'data', 'movieList.json')

exports.genreDataPath = () => path.join(this.mainDirPath(), 'data', 'genreList.json')