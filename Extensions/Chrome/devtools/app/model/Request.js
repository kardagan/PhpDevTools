Ext.define('PhpDevTools.model.Request', {
    extend: 'Ext.data.Model',
    
    proxy: {
        type: 'memory'
    },
    
    fields: [
        {name: 'name', type: 'string'},
        {name: 'id', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'profilerurl', type : 'string'}
    ]

});