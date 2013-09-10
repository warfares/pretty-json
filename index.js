var express = require('express');

exports = module.exports = createPrettyJSON;

var PrettyJSON = function(cfg){
  if(!cfg){
    cfg = {};
  }
  var self = this;
  self.cfg = cfg;
  self.app = self.createExpressServer(self.cfg);
  
  self.parse(self, function(data, err){
    console.log("result", JSON.stringify(data));
  });
};

function createPrettyJSON(cfg){
  return new PrettyJSON(cfg);
};
PrettyJSON.prototype.createExpressServer = function(cfg){
  var app = express();
  app.use(express.logger());
  app.use(express.static(cfg.static || __dirname ));
  return app;
};

PrettyJSON.prototype.parse= function(prettyJson, cb){
  prettyJson.server = this.app.listen(8082||prettyJson.cfg.appPort, function() {
    var self = prettyJson;
    self.cb = cb;//FIXME test whether function
    var Browser = require("zombie");
    browser = new Browser();
    browser.visit("http://localhost:8082/index.html"||self.cfg.url, function () {
      browser.fill("textarea" , "{\"PrettyJSON\" : \"now as well in node.js\"}"||self.cfg.data);
      browser.pressButton("go", function() {
        self.cfg.result = browser.html();
        self.server.close();
        self.cb(self.cfg.result);
      });
    });
  });
};