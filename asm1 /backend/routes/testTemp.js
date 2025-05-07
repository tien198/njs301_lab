const router = require('express').Router()
const { log } = require('console')

const tempData = require('../data/temp/tempData')

router.get('/test/movies-temp', (req, res) => {
    log(tempData)
    res.status(200).send('success!')
})

module.exports = router