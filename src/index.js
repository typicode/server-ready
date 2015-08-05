let net = require('net')
let once = require('once')
let interval = 250

export default function (port, timeout, cb) {
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
