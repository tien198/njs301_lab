const path = require('path')

const router = require('express').Router()

const mainPath = require('../util/mainPath')

router.get('/users', (req, res, next) => {
    res.sendFile(path.join(mainPath, 'views', 'users.html'))
})

module.exports = router
