Ext.define('PhpDevTools.store.Configs', {
    extend: 'Ext.data.Store',
    model: 'PhpDevTools.model.Config',
    autoLoad:true,
    proxy: {
        type: 'localstorage',
        id  : 'phpdevtools-config'
    },
    sorters: "order",
    listeners : {
        load : function ( s , records, successful, eOpts ) {
            Ext.Array.each( records , function ( record ) {
                record.set('neworder',record.get('order'))
            });
        }
    }
});
