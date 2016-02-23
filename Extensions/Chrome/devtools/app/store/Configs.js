Ext.define('PhpDevTools.store.Configs', {
    extend: 'Ext.data.Store',
    model: 'PhpDevTools.model.Config',
    autoLoad:true,
    proxy: {
        type: 'localstorage',
        id  : 'phpdevtools-config'
    }
});
