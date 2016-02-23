Ext.define('PhpDevTools.view.config.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.configWin',

    height: '95%',
    width: '98%',
    layout: 'fit',

    closable : true,
    resizable : true,
    modal : true,
    constrain : true,

    title : 'Configuration',
});
