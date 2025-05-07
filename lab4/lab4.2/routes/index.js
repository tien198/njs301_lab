const path = require('path')

const router = require('express').Router()

const mainPath = require('../util/mainPath')

router.get('/', (req, res, next) => {
    res.sendFile(path.join(mainPath, 'views', 'index.html'))
})

module.exports = router