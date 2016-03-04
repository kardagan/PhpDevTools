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

    displayProfiler : function ( request ) {
        var me = this;

        if ( ! me.getProfilers().showProfiler( "profiler_" + request.get('id') ) ) {

            var store = Ext.create('PhpDevTools.store.Profilers',{
                autoLoad:true,
                proxy: {
                    type: 'ajax',
                    url: request.get('profilerurl'),
                    reader: {
                        type: 'json'
                    }
                }
            });

            me.getProfilers().add({
                xtype:'profiler',
                itemId : "profiler_" + request.get('id'),
                title : request.get('id'),
                store : store
            });

            me.getProfilers().showProfiler( "profiler_" + request.get('id') );
        }
    },

    removeAllProfilers : function () {
        this.getProfilers().removeAll();
    }


});
