Ext.define('PhpDevTools.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'PhpDevTools.view.profiler.Viewer',
        'PhpDevTools.view.request.List',
        'Ext.layout.container.Border'
    ],

    layout: 'border',

    items: [{
        region: 'center',
        xtype: 'viewer'
    }, {
        region: 'west',
        width: 225,
        split:true,
        collapsable:false,
        xtype: 'requestlist'
    }]
});