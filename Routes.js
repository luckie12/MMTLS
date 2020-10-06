'use strict';
const fs = require('fs')
class Routes {
  constructor(){
    this.servers = new Map()
    // this.loadListBackup();
    // this.count = 0
  }
  fetchServerList = ((req, res, next) => {
    let guid = req.params.guid
    if(!this.servers.has(guid)) {
      return res.sendStatus(404)
    }
    return res.json(this.servers.get(guid))
  })
  
  addServerToList = (async (req, res, next) => {
    if(req.body.guid === undefined){
      return res.sendStatus(404)
    }
    if(this.doChecks(req.body)){
      // this.servers[req.body.guid] = {
      //   urls: req.body.urls,
      //   players: req.body.players,
      //   maxPlayers: req.body.maxPlayers,
      //   extraData: req.body.extraData
      // }
      this.servers.set(req.body.guid, {
        urls: req.body.urls,
        players: req.body.players,
        maxPlayers: req.body.maxPlayers,
        extraData: req.body.extraData,
        regDate: Date.now()
      })
      console.log(this.servers)
      consola.info({message:"Added!", badge: true})
      // this.count++
      // console.log("Current count: " + this.count)
    }
    // this.saveListBackup();
    return res.sendStatus(200)
  })
  
  removeServerFromList = ((req, res, next) => {
    let idx = req.params.guid
    this.servers.delete(idx)
    consola.error("Removed server!")
    console.log(this.servers)
    return res.sendStatus(200)
  })
  
  updateServer = ((req, res, next) => {
    this.servers.set(req.body.guid, {
      urls: req.body.urls,
      players: req.body.players,
      maxPlayers: req.body.maxPlayers,
      extraData: req.body.extraData
    })
    consola.info({message:"Updated server!", badge: true})
    return res.sendStatus(200)
  })

  denyConnection = ((req, res, next) => {
    return res.sendStatus(400)
  })

  //#region Helper_Functions
  doChecks = ((request) => {
    if(request.urls === undefined){
      consola.error("No urls specified")
      return false;
    }
    if(request.players === undefined){
      consola.error("No players specified")
      return false;
    }
    if(request.maxPlayers === undefined){
      consola.error("No maxplayers specified")
      return false
    }
    if(request.extraData === undefined){
      consola.error("No extra data specified")
      return false;
    }
    return true;
  })
  //#endregion


  // loadListBackup(){
  //   fs.readFileSync("./serverlist.json", (data) =>{
  //     this.servers = data
  //   })
  // }

  // saveListBackup() {
  //   try {
  //     fs.writeFileSync('./serverlist.json', JSON.stringify(this.servers))
  //   } catch (err) {
  //     consola.error(err)
  //   }
  // }
}
module.exports = Routes