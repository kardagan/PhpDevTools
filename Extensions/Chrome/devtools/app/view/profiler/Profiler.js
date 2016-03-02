Ext.define('PhpDevTools.view.profiler.Profiler', {
    extend: 'Ext.tab.Panel',

    alias: 'widget.profiler',

    requires : [
        'PhpDevTools.view.profiler.collector.Database',
        'PhpDevTools.view.profiler.collector.Dump',
        'PhpDevTools.view.profiler.collector.Message'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    store : null,

    initComponent: function() {
        var me = this;
        Ext.apply(this, {
            items: [
                {
                    xtype: 'collectorDump',
                    title : 'Request',
                    itemId : 'tabCollectorRequest',
                },
                {
                    xtype: 'collectorMessage',
                    title : 'Logs',
                    itemId : 'tabCollectorMessage',
                },
                {
                    xtype: 'collectorDatabase',
                    title : 'Database',
                    itemId : 'tabCollectorDatabase',
                },
                {
                    xtype: 'collectorDump',
                    title : 'Dump',
                    itemId : 'tabCollectorDump',
                }
            ]
        });

        me.store.on('load',function ( s , records, successful, eOpts ) {
            Ext.Array.each( records , function(record) {
                switch( record.get('type') ) {
                    case 'dump' :
                        me.queryById('tabCollectorDump').display( record );
                        break;
                    case 'request' :
                        me.queryById('tabCollectorRequest').display( record );
                        break;
                    case 'database' :
                        me.queryById('tabCollectorDatabase').display( record );
                        break;
                    case 'log' :
                        me.queryById('tabCollectorMessage').display( record );
                        break;
                }
            })
        });

        this.callParent(arguments);
    }
});
