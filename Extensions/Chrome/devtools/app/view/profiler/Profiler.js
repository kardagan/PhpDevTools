Ext.define('PhpDevTools.view.profiler.Profiler', {
    extend: 'Ext.tab.Panel',

    alias: 'widget.profiler',

    closable: false,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;
        Ext.apply(this, {
            items: [
                {
                    xtype: 'panel',
                    title : 'Logs',
                    html : 'logs ' + me.getItemId(),
                    flex: 1
                },
                {
                    xtype: 'panel',
                    title : 'Database',
                    html : 'database ' + me.getItemId(),
                    flex: 1
                },
                {
                    xtype: 'panel',
                    title : 'VarDump',
                    html : 'vardump ' + me.getItemId(),
                    flex: 1
                }
            ]
        });

        this.callParent(arguments);
    }
});
