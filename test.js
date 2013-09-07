// deps
var PrettyJSON = require('./index')()
, jsdom = require("jsdom").jsdom
, window = jsdom().createWindow()
, $ = require('jquery').create(window)
;
var Backbone = require('backbone');
var data = {
  "male":"Bob",
  "female":"Jane",
  "uuid":"xxx",
  "children":[
    {
      "male":"Rick",
      "female":"Ann",
      "uuid":"xs"
    }
  ]
};

var result = $("<span id=\"result\"/>");
result.appendTo("body");
console.log("body", $("body").html());

var Node = Backbone.View.extend({
  id:"result",
  tagName:'span',
  data:null,
  level:1,
  path:'',
  type:'',
  size:0,
  isLast:true,
  rendered:false,
//  events: {
//    'click #result':  'getFriend',
//  },
//  getFriend: function() {
//    var friend_name = "thor";
//    this.friendslist.add( {name: friend_name} );
//  },
  initialize: function(){
//    this.friendslist = new FriendList;
    //_.bindAll(this, 'render');
  },
  render: function(model) {
    console.log("render:", model);
    return this;
  }
});

console.log("data",data)
var node = new Node({ 
  el:result, 
  data:data
});
console.log("render()", node.render());
console.log("end: ",$("body").html());