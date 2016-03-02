Ext.define('PhpDevTools.view.profiler.Profilers', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.profilers',
    
    activeItem: 0,
    margin: '5 5 5 0',

    tabBar : {
        hidden : true
    },

    store : null,

    initComponent: function() {
        this.items = [];
        this.callParent(arguments);
    },

    showProfiler : function ( id ) {
        var me = this;
        var profiler = me.down("#" + id);
        if ( profiler ) {
            me.setActiveTab( profiler );
            return true;
        } else {
            return false;
        }
    }

});