const { log } = require('console')

const server = require('http').createServer()

const userArr = ['user 1', 'user 2']

server.on('request', (req, res) => {
    const url = req.url
    if (url === '/') {
        res.setHeader('content-type', 'text/html')
        res.write(`<!DOCTYPE html><html lang="en">
            <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <form action='/create-user' method='post'>
                    <input type="text" name="user">
                    <button type="submit">Send</button>
                </form>
            </body>
            </html>`)
        res.end()
        return
    }
    else if (url === '/users') {
        res.setHeader('content-type', 'text/html')
        res.write(`<!DOCTYPE html><html lang="en">
            <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <ul>`)
        userArr.forEach(i => res.write(`<li>${i}</li>`))
        res.write(`</ul>
            </body>  
        </html>`)
        res.end()
        return
    }
    else if (url === '/create-user') {
        const body = []
        req.on('data', chunk => body.push(chunk))
        req.on('end', _ => {
            const user = Buffer.concat(body).toString().split('=')[1]
            userArr.push(user)
        })
        res.writeHead(301, { location: '/users' })
        res.end()
    }
})

server.listen(3000, '127.0.0.1', _ => log('Server is listening ...'))