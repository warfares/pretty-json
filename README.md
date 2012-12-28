Simple library to render/format a JS obj to an HTML view.


Dependecies
== 
* Backbone (just code structure) / Underscore 
* JQuery (DOM manipulation)

Usage
==
<pre>

//obj to render.
var obj = {
  name:'John Doe',
  age: 20,
  children:[{name:'Jack', age:5}, {name:'Ann', age:8}],
  wife:{name:'Jane Doe', age:28 }
}

var node = new PrettyJSON.view.Node({
  el:$('#elem'),
  data:obj,
  level:1
});
</pre>

* Note : only tested in Chrome & FireFox.
