# server-ready [![Build Status](https://travis-ci.org/typicode/server-ready.svg)](https://travis-ci.org/typicode/server-ready) [![npm version](https://badge.fury.io/js/server-ready.svg)](https://www.npmjs.com/package/server-ready)

> Know when a server is ready to receive requests. Used in [hotel](https://github.com/typicode/hotel).

## Install

```
npm install server-ready --save
```

## Usage

```javascript
var serverReady = require('server-ready')

var port = 3000
var timeout = 5000

serverReady(port, timeout, function (err) {
  if (err) return console.error('timeout, can\'t connect to port')
  console.log('port is open or has just opened')
})
```

## How it works?

`server-ready` will try to connect every 250ms to the specified port until a connection has been made or timeout has been reached.

## License

MIT - [Typicode](https://github.com/typicode)
