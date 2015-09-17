let test = require('tape')
let http = require('http')
let serverReady = require('../src')

test('user timeout', (t) => {
  t.plan(2)

  let port = 3100
  let server = http.createServer()

  serverReady(port, 100, (err) => t.assert(err))
  serverReady(port, 1000, (err) => t.error(err))

  setTimeout(() => server.listen(port), 500)
  setTimeout(() => server.close(), 1500)
})

test('default timeout', (t) => {
  t.plan(2)

  let someClosedPort = 45678
  let defaultTimeout = 20 * 1000
  let start = Date.now()

  serverReady(someClosedPort, (err) => {
    let end = Date.now()

    t.assert(err)
    t.ok(end - start > defaultTimeout)
  })
})

test('change default timeout', (t) => {
  t.plan(2)

  let someClosedPort = 45678
  let timeout = 5 * 1000
  let start = Date.now()

  serverReady.timeout = timeout
  serverReady(someClosedPort, (err) => {
    let end = Date.now()

    t.assert(err)
    t.ok(end - start > timeout)
  })
})
