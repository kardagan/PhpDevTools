Ext.define('PhpDevTools.view.request.Show', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.requestshow',

    requires: [
        'PhpDevTools.view.profiler.Grid',
        'PhpDevTools.view.profiler.Preview'
    ],

    closable: false,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        Ext.apply(this, {
            items: [{
                xtype: 'profilergrid',
                flex: 1
            },{
                xtype: 'profilerpreview',
                cls: 'profilerpreview',
                height: 300
            }]
        });

        this.callParent(arguments);
    }
});
