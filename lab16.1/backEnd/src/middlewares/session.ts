import '../.d.ts/express-session.d.ts'

import session from 'express-session'


const midlleware = session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
})

export default midlleware