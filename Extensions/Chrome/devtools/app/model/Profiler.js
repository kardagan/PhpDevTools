Ext.define('PhpDevTools.model.Profiler', {
    extend: 'Ext.data.Model',
    
    fields: [
        {name: 'type', type:'string'},
        {name: 'data', type:'auto'},
        {name: 'origin', type:'auto'},
    ]
});