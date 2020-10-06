const express = require('express')
const app = express()
const consola = require('consola')
// const expressRateLimiter = require("express-rate-limit");
const cors = require('cors')
const bodyParser = require('body-parser')
const Router = require('./Routes');
const fs = require('fs')
const ini = require('ini')
const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'))
const port = config.Core.listenPort
const host = config.Core.listenIp

// const limiter = expressRateLimiter({
//   windowMs: config.Security.rateLimiterWindowMs, 	
//   max: config.Security.rateLimiterMaxApiRequestsPerWindow
// });

// app.use(limiter)
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

let routes = new Router
//#region Deny Connection
app.get('/', routes.denyConnection)
app.post('/', routes.denyConnection)
app.post('/Register/', routes.denyConnection)
app.get('/Register/', routes.denyConnection)
app.get('/GetServers/', routes.denyConnection)
app.post('/GetServers/', routes.denyConnection)
//#endregion

app.get("/GetServers/:guid", routes.fetchServerList)
app.post("/Register/:guid", routes.addServerToList)
app.post("/Remove/:guid", routes.removeServerFromList)
app.post("/Update", routes.updateServer)

app.listen(port, () => consola.success({
  message: `MMTLS listening at http://${host}:${port}`,
  badge: true
}))
