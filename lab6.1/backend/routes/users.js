const router = require('express').Router()

const users = []

router.get('/', (req, res, next) => {
    res.send(users)
})

router.post('/', (req, res, next) => {
    res.sendStatus(300)
})

module.exports = router