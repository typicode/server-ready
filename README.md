# server-ready [![Build Status](https://travis-ci.org/typicode/server-ready.svg)](https://travis-ci.org/typicode/server-ready) [![npm version](https://badge.fury.io/js/server-ready.svg)](https://www.npmjs.com/package/server-ready)

> Know when a server is ready to receive requests. Used in [hotel](https://github.com/typicode/hotel).

## Install

```
npm install server-ready --save
```

## Example

```javascript
var serverReady = require('server-ready')

// A server process is spawned here or somewhere else...

serverReady(3000, function (err) {
  if (err) return console.error('timeout, can\'t connect to port')
  console.log('port is open or has just opened')
})
```

## How it works?

`server-ready` will try to connect every `250ms` to the specified `port` until a connection has been made or timeout has been reached (`20s` by default).

## API

__serverReady.timeout__

Default timeout.

__serverReady(port, [timeout], cb)__

Tries to connect to `port`.

## License

MIT - [Typicode](https://github.com/typicode)
