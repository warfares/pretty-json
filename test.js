// deps
var prettyJson = require('./index')();
prettyJson.parse(prettyJson)
prettyJson.app.get("/xxx", function(req, res){
    console.log(req,res);
  });