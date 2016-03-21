/**
* @class PrettyJSON.view.Leaf
* @extends Backbone.View
* 
* @author #rbarriga
* @version 0.1
*
*/
PrettyJSON.view.Leaf = Backbone.View.extend({
    tagName:'span',
    data:null,
    level:0,
    path:'',
    type:'string',
    isLast: true,
    events: {
        "mouseover .leaf-container": "mouseover",
        "mouseout .leaf-container": "mouseout"
    },
    initialize: function(opt) {
	this.options = opt;
        this.data = this.options.data;
        this.level = this.options.level;
        this.path = this.options.path;
        this.type = this.getType();
        this.dateFormat = this.options.dateFormat;
        this.isLast = _.isUndefined(this.options.isLast) ? 
            this.isLast : this.options.isLast;

        this.render();
    },
    getType: function(){
        var m = 'string';
        var d = this.data; 

        if(_.isNumber(d)) m = 'number';
        else if(_.isBoolean(d)) m = 'boolean';
        else if(_.isDate(d)) m = 'date';
        else if(_.isNull(d)) m = 'null'
        return m;
    },
    getState:function(){
        var coma = this.isLast ? '': ',';
        var state = {
            data: this.data,
            level: this.level,
            path: this.path,
            type: this.type,
            coma: coma
        };
        return state;
    },
    render: function() {
        var state = this.getState();

        if (state.type == 'date' && this.dateFormat) {
            state.data = PrettyJSON.util.dateFormat(this.data, this.dateFormat);
        }

        if (state.type == 'null') {
            state.data = 'null';
        }
        
        if (state.type == 'string') {
            state.data = (state.data == '') ? 
		'""' : '"'+state.data+'"';
        }
 
        this.tpl = _.template(PrettyJSON.tpl.Leaf);
        $(this.el).html(this.tpl(state));
        return this;
    },
    mouseover:function(e){
        e.stopPropagation();
        var path = this.path + '&nbsp;:&nbsp;<span class="' + this.type +'"><b>' + this.data + '</b></span>';
        this.trigger("mouseover",e, path);
    },
    mouseout:function(e){
       e.stopPropagation();
       this.trigger("mouseout",e);
    }
});
