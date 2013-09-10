var express = require('express');
var Browser = require("zombie");

exports = module.exports = createPrettyJSON;

var PrettyJSON = function(cfg){
  var self = this;
  if(!cfg){
    self.cfg = {
      "appPort" : 8082,
      "url" : "http://localhost:8082/index.html",
      "static" : __dirname,
      "parseAndDie" : false,
      "startServer" : true,
      "data" : {
        "PrettyJSON" : "now as well in node.js"
      },
      "cb" : function(data, err){
        self.cfg.result = data;
        console.log("result from cfg", JSON.stringify(self.cfg.result));
      }
    }
  }else{
    //FIXME ENHANCEMENT validation of cfg
    self.cfg = cfg;
  }
  self.app = self.createExpressServer(self.cfg);
  if(self.cfg.startServer){
    self.server = this.app.listen(self.cfg.appPort);
  }
};

function createPrettyJSON(cfg){
  return new PrettyJSON(cfg);
};

PrettyJSON.prototype.createExpressServer = function(cfg){
  var app = express();
  app.use(express.logger());
  app.use(express.static(cfg.static));
  return app;
};
//FIXME: right now it is possible to parse x times the same url or others 
// make sure you set "parseAndDie" : false,
PrettyJSON.prototype.parse = function(prettyJson){
  //console.log("doIt before")
  var self = prettyJson;
  browser = new Browser();
  browser.visit(self.cfg.url, function () {
//      console.log("doIt inernal")
    browser.fill("textarea" , self.cfg.data);
    browser.pressButton("go", function() {
      if(self.cfg.parseAndDie && self.cfg.startServer){
        console.log("shutting down server")
        self.server.close();
      }
      self.cfg.cb(browser.html());
  });
//  console.log("doIt after")
  });
};