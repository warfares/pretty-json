/**
* @class PrettyJSON.tpl.
* general templates.
*
* @author #rbarriga
* @version 0.1
*
**/
var Node = '' +
'<span class="node-container">' +
    //top.
    '<span class="node-top node-bracket" />' +
    //content.
    '<span class="node-content-wrapper">' +
        '<ul class="node-body" />' +
    '</span>' +
    //bottom.
    '<span class="node-down node-bracket" />' +
'</span>';

var Leaf = '' +
'<span class="leaf-container">' +
    '<span class="<%= type %>"> <%=data%></span><span><%= coma %></span>' +
'</span>';

exports = module.exports = tpl ={
  "Node" : Node,
  "Leaf" : Leaf
}
