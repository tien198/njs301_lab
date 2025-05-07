const fs = require('fs')
const { error } = require('console')

const tempData = require('../data/temp/tempData')
const { dataDirPath } = require('../utils/appPath')
const path = require('path')


module.exports = class DataFile {
    static find(cb) {
        let modelName = this.name
        modelName = modelName.charAt(0).toLowerCase() + modelName.slice(1)

        const dataPath = path.join(dataDirPath(), `${modelName}s.json`)

        if (tempData[`${modelName}ListTemp`])
            cb(tempData[`${modelName}ListTemp`])

        else
            fs.readFile(dataPath, { encoding: 'utf8' }, (err, dataJson) => {
                if (err)
                    error(err)
                else
                    try {
                        const data = JSON.parse(dataJson)
                        if (Array.isArray(data)) {
                            tempData[`${modelName}ListTemp`] = data
                            cb(data)
                        }
                        else
                            throw Error(`Getted ${modelName}List data must be an array!`)
                    } catch (err) {
                        error(err)
                    }
            })
    }

    static findById(id, cb) {
        this.find(data => {
            const finded = data.find(m => m.id === id)
            cb(finded)
        })
    }

    static findSync() {
        let modelName = this.name
        modelName = modelName.charAt(0).toLowerCase() + modelName.slice(1)

        if (tempData[`${modelName}ListTemp`])
            return tempData[`${modelName}ListTemp`]

        else {
            const dataPath = path.join(dataDirPath(), `${modelName}s.json`)
            const dataJson = fs.readFileSync(dataPath, { encoding: 'utf8' })

            try {
                const data = JSON.parse(dataJson)
                if (Array.isArray(data)) {
                    tempData[`${modelName}ListTemp`] = data
                    return data
                }
                else
                    throw Error(`Getted ${modelName}List data must be an array!`)
            } catch (err) {
                error(err)
            }
        }
    }
}