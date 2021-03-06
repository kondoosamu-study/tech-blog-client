const express = require('express')
const consola = require('consola')
const helmet = require('helmet')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const routes = require('./api');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // req.bodyを使用する為の定義
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(helmet())

  app.get('/healthcheck', (req, res) => {
    res.send('OK!');
  })
  
  // API用ディレクトリの設定
  // 将来的にここでMySQLクエリを行うソースを作成する
  app.use('/api', routes);

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
