const router = require('express').Router();

const UserToken = require('../models/UserToken');

router.use((req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).send({ message: 'Unauthorized' })
        return
    }

    const token = authorization.split(' ')[1];
    if (!token) {
        res.status(401).send({ message: 'Unauthorized' })
        return
    }
    UserToken.find(uTokens => {
        const isAuthen = uTokens.find(i => i.token === token)
        if (isAuthen) {
            next();
        } else {
            res.status(401).send({ message: 'Unauthorized' })
            return
        }
    })
})

module.exports = router;