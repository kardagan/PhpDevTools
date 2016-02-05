Ext.define('PhpDevTools.view.profiler.Show', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.requestshow',

    closable: false,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        Ext.apply(this, {
            items: [{
                xtype: 'panel',
                html : 'coucou',
                flex: 1
            }]
        });

        this.callParent(arguments);
    }
});
