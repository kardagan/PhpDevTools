Ext.define('PhpDevTools.controller.Profilers', {
    extend: 'Ext.app.Controller',

    requires : ['PhpDevTools.view.profiler.Profiler'],

    stores: ['Profilers'],

    models: ['Profiler'],

    refs: [
        {
            ref: 'profilers',
            selector: 'profilers'
        }
    ],

    init: function() {
        var me = this;
        this.application.on("DisplayProfiler", function(obj,id) {
            me.displayProfiler(id)
        });
    },

    displayProfiler : function ( id ) {
        var me = this;

        if ( ! me.getProfilers().showProfiler( "profiler_" + id ) ) {
            me.getProfilers().add({
                xtype:'profiler',
                itemId : "profiler_" + id,
                title : id
            });
            me.getProfilers().showProfiler( "profiler_" + id );
        }
    }


});
