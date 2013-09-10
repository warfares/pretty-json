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
      "parseAndDie" : true,
      "startServer" : true,
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
//FIXME: right now it is not possible to parse 2 times the same url 
// seems to be a prob of broxser since it fails to visit the 2 time
// could be that the server is down and did not start up
PrettyJSON.prototype.parse = function(prettyJson){
  //console.log("doIt before")
  var self = prettyJson;
  browser = new Browser();
  browser.visit(self.cfg.url, function () {
//      console.log("doIt inernal")
    browser.fill("textarea" , "{\"PrettyJSON\" : \"now as well in node.js\"}"||self.cfg.data);
    browser.pressButton("go", function() {
      if(self.cfg.parseAndDie){
        console.log("shutting down server")
        self.server.close();
      }
      self.cfg.cb(browser.html());
  });
//  console.log("doIt after")
  });
};