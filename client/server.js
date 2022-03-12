const { https } = require('firebase-functions')
const { default: next } = require('next')

const server = next({
    dev: false,
    conf: { distDir: '.next' }
})

const nextjsHandle = server.getRequestHandler();
//we will create our firebase function

exports.nextServer = https.onRequest((req, res) => {
    return server.prepare().
        then(() => {
            return nextjsHandle(req, res)
        })
})