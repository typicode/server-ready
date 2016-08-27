const test = require('tape')
const http = require('http')
const serverReady = require('../src')

test('port', (t) => {
  t.plan(2)

  const port = 3100
  const server = http.createServer()

  serverReady(port, 100, (err) => t.assert(err))
  serverReady(port, 1000, (err) => t.error(err))

  setTimeout(() => server.listen(port), 500)
  setTimeout(() => server.close(), 1500)
})

test('port and host', (t) => {
  t.plan(2)

  const port = 3200
  const host = '127.0.0.2'
  const server = http.createServer()

  serverReady(port, host, 100, (err) => t.assert(err))
  serverReady(port, host, 1000, (err) => t.error(err))

  setTimeout(() => server.listen(port, host), 500)
  setTimeout(() => server.close(), 1500)
})


test('default timeout', (t) => {
  t.plan(2)

  const someClosedPort = 45678
  const defaultTimeout = 20 * 1000
  const start = Date.now()

  serverReady(someClosedPort, (err) => {
    const end = Date.now()

    t.assert(err)
    t.ok(end - start > defaultTimeout)
  })
})

test('change default timeout', (t) => {
  t.plan(2)

  const someClosedPort = 45678
  const timeout = 5 * 1000
  const start = Date.now()

  serverReady.timeout = timeout
  serverReady(someClosedPort, (err) => {
    const end = Date.now()

    t.assert(err)
    t.ok(end - start > timeout)
  })
})
