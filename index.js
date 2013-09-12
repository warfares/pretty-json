var express = require('express');
var Browser = require("zombie");

exports = module.exports = createPrettyJSON;

/**
 * @typedef Config
 * @type {object}
 * @property {Number|String}[appPort = 8082] port of the server
 * @property {String} [url = http://localhost:8082/index.html]
 *   url where we can find the index.html
 * @property {String} [static = __dirname]
 *  path to the static files of the server
 * @property {Boolean} [parseAndDie = false] whether you want to 
 *   kill the server after parsing
 * @property {Boolean} [startServer = true] whether you want
 *   to start the server (you can create your own index.pretty.html on your own
 *   server)
 * @property {String} [data = {"PrettyJSON" : "now as well in node.js"}]
 *  to be injected for parsing -> what you would put in the textarea
 * @property {Function} [cb = function(data, err){self.cfg.result = data;console.log("result from cfg", JSON.stringify(self.cfg.result));}] 
 *   callback function will be invoked when the tree is
 *   generated. Full html of the doc will returned.
 **/

/**
 * Create a new PrettyJSON
 * @param {Config} cfg 
 * @returns {Function}
 * @api public
 */
var PrettyJSON = function(cfg){
  var self = this;
  if(!cfg){
    self.cfg = {
      "appPort" : 8082,
      "url" : "http://localhost:8082/index.html",
      "static" : __dirname,
      "parseAndDie" : false,
      "startServer" : true,
      "data" : JSON.stringify({
        "PrettyJSON" : "now as well in node.js"
      }),
      "cb" : function(data, err){
        self.cfg.result = data;
        console.log("result from cfg", JSON.stringify(self.cfg.result));
      }
    };
  }else{
    //FIXME ENHANCEMENT validation of cfg
    self.cfg = cfg;
  }
  if(self.cfg.startServer){
    self.app = self.createExpressServer(self.cfg);
    self.server = this.app.listen(self.cfg.appPort);
  }
};

/**
 * Standard node export of new PrettyJSON(cfg)
 * @param {Config} cfg
 * @returns {Function}
 * @api public
 */

function createPrettyJSON(cfg){
  return new PrettyJSON(cfg);
};
/**
 * Create a new express server and configure static route and logging
 * @param {Object} cfg.static path to the static files of the server
 * @return {Function}
 * @api public
 **/
PrettyJSON.prototype.createExpressServer = function(cfg){
  var app = express();
  app.use(express.logger());
  app.use(express.static(cfg.static));
  return app;
};
/**
 * It is possible to parse x times the same url or others,
 * just make sure you set "parseAndDie" : false and the server is running
 * @param {PrettyJSON} prettyJson
 */
PrettyJSON.prototype.parse = function(prettyJson){
  var self = prettyJson;
  browser = new Browser();
  browser.visit(self.cfg.url, function () {
    browser.fill("#input" , self.cfg.data);
    browser.pressButton("go", function() {
      if(self.cfg.parseAndDie && self.cfg.startServer){
        console.log("shutting down server");
        self.server.close();
      }
      self.cfg.cb(browser.html());
    });
  });
};