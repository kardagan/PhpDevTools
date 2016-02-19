Ext.define('PhpDevTools.view.config.Config', {
    extend: 'Ext.window.Window',
    alias: 'widget.config',

    height: 200,
    width: 400,
    layout: 'fit',

    closable: true,

    title : 'Configuration',

    initComponent: function() {
        var me = this;
        this.callParent(arguments);
    }
});
