exports = module.exports = createPrettyJSON;

var PrettyJSON = function(){
  this.view = {}
  , this.tpl = {};
  this.util = require('./src/util');
  this.tpl = require('./src/tpl');
  this.view.Node = require('./src/node');
  this.view.Leaf = require('./src/leaf');
};

function createPrettyJSON(){
  return new PrettyJSON();
};