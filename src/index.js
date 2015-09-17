let net = require('net')
let once = require('once')
let interval = 250

serverReady.timeout = 20 * 1000 // 20 seconds

export default function serverReady (port, ...args) {
  let timeout = serverReady.timeout
  let cb

  if (args.length > 1) {
    [timeout, cb] = args
  } else {
    [cb] = args
  }

  cb = once(cb)

  let ready = false
  let start = new Date()

  let connect = (port, cb) => {

    let client = net
      .connect({ port })
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
