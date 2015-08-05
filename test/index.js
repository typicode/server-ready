let test = require('tape')
let http = require('http')
let index = require('../src')

test('index', (t) => {
  t.plan(2)

  let port = 3100
  let server = http.createServer()

  index(port, 100, (err) => t.assert(err))
  index(port, 1000, (err) => t.error(err))

  setTimeout(() => server.listen(port), 500)
  setTimeout(() => server.close(), 1500)
})
