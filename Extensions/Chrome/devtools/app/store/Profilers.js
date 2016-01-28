Ext.define('PhpDevTools.store.Profilers', {
    extend: 'Ext.data.Store',

    requires: ['Ext.data.reader.Xml'],

    model: 'PhpDevTools.model.Profiler',

    proxy: {
        type: 'ajax',
        url: 'request-proxy.php',
        reader: {
            type: 'xml',
            record: 'item'
        }
    },

    sortInfo: {
        property: 'pubDate',
        direction: 'DESC'
    }
});
