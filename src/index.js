const net = require('net')
const once = require('once')
const interval = 250

// default timeout (20s)
serverReady.timeout = 20 * 1000

// The following params are accepted:
// port, cb
// port, host, cb
// port, timeout, cb
// port, host, timeout, cb
export default function serverReady (port, ...args) {
  const start = new Date()
  let timeout = serverReady.timeout
  let host, hostOrTimeout, cb

  switch (args.length) {
    case 1:
      [cb] = args
      break
    case 2:
      [hostOrTimeout, cb] = args
      if (typeof hostOrTimeout === 'string') {
        host = hostOrTimeout
      } else {
        timeout = hostOrTimeout
      }
      break
    default:
      [host, timeout, cb] = args
  }

  cb = once(cb)

  let ready = false
  const connect = (port, cb) => {

    const client = net
      .connect({ port, host })
      .on('connect', () => {

        ready = true
        client.destroy()
        cb()

      })
      .on('error', () => {

        client.destroy()

      })
      .once('close', () => {

        if (new Date() - start > timeout) {
          return cb(new Error('Timeout'))
        }

        setTimeout(() => !ready && connect(port, cb), interval)

      })

  }

  connect(port, cb)
}
