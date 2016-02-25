Ext.define('PhpDevTools.model.Config', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'status',      type: 'string', persist:false},
        { name: 'neworder',    type: 'int',    persist:false},
        { name: 'order',       type: 'int'},
        { name: 'domain',      type: 'string', defaultValue:'*' },
        { name: 'profilerurl', type: 'string', defaultValue:'/phpdevtools.json' },
        { name: 'varname',     type: 'string', defaultValue:'phpdevtools' }
    ],

    proxy: {
        type: 'localstorage',
        id  : 'phpdevtools-config'
    }
});