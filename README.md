## PRETTY JSON ##

Simple library to render/format a JS obj to an HTML view.

## Live Demo ##

This is an [live demo](http://warfares.github.com/pretty-json/)
* ..you could get more valid json input from here (http://json.org/example.html)

## Dependecies ##

* Backbone (just code structure) / Underscore 
* JQuery (DOM manipulation)

## Usage ##

    //obj to render.
    var obj = {
      name:'John Doe',
      age: 20,
      children:[{name:'Jack', age:5}, {name:'Ann', age:8}],
      wife:{name:'Jane Doe', age:28 }
    }

    var node = new PrettyJSON.view.Node({
      el:$('#elem'),
      data:obj
    });


## Methods ##

Node

**expandAll**: Recursive open & render all nodes. (lazy render: a node will render only when is expanded)

**collapseAll**: Close (Hide) all nodes.

## Events##

Node

**collapse**: trigger when a node is show or hide. (parm. event) 

**mouseover**: trigger when mouse over a node. (parm. node path)

**mouseout**: trigger when mouse out the node

* Note: "node" is an Obj or an Array.
* Note : only tested in Chrome & FireFox.

## Node.js Integration ##

The package is not yet publish on the public npm registry, so you need to
either use the github rep as dependency or install it global

`npm install -g`

Then in your node module:

    var prettyJson = require('pretty-json-html')();
    prettyJson.parse(prettyJson)

You can see as well the form in action doing 

`npm start`

Then see the default conf being applied and parsed to the console. Further
you can see the index.hml browsing to [http://localhost:8082/]
(http://localhost:8082/)

See the api docs about
 [configuration possibilities](http://localhost:8082/api/global.html#Config).

    var cfg = {
    "data" : JSON.stringify({
      "myData" : "something"
    }),
    "..." : "more see docu";
    var prettyJson = require('pretty-json-html')(cfg);
    prettyJson.parse(prettyJson)

### Generate API ###

We use [JSDoc 3](https://github.com/jsdoc3/jsdoc) to generate the API, 
however the node integration is not working so you need to 
do the following "by hand".

#### command ####

If you have changed the index.js file do:

    cd node_modules/jsdoc
    ./jsdoc ../../  ../../README.md -d ../../api

#### command explained ####

1. We will scan the `/` folder for annotations in js files. 
+ We use the `README.md` as index file for the api.
+ we use `/api` as the destination (`-d`)