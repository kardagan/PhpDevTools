Ext.define('PhpDevTools.controller.Profilers', {
    extend: 'Ext.app.Controller',

    stores: ['Profilers'],

    models: ['Profiler'],

    refs: [
        {
            ref: 'requestShow',
            selector: 'requestshow'
        }, {
            ref: 'viewer',
            selector: 'viewer'
        }
    ],

    init: function() {
        var me = this;
        this.application.on("DisplayProfiler", function(obj,id) {
            me.displayProfiler(id)
        });
    },

    displayProfiler : function ( id ) {

    }


});
