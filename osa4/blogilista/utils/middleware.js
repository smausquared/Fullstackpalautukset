const tokenExtractor = (request, response, next) => {
        console.log('Entered tokenExtractor')
        const authorization  = request.headers.authorization // huhhuh. debuggasin 1.5 tuntia sitä,
        if (authorization && authorization.startsWith('Bearer ')) { // että tässä luki vahingossa request.header eikä
          request.token = authorization.replace('Bearer ', '') // request.headers :D
        } else {
          request.token = null
        }
        next()
      }

module.exports = {tokenExtractor}
