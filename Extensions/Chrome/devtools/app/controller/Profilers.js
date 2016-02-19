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
