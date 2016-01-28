Ext.define('PhpDevTools.store.Requests', {
    extend: 'Ext.data.Store',

    model: 'PhpDevTools.model.Request',

    data: [
        {name: 'Sencha Blog',   url: 'http://feeds.feedburner.com/sencha'},
        {name: 'Sencha Forums', url: 'http://sencha.com/forum/external.php?type=RSS2'},
        {name: 'Ajaxian',       url: 'http://feeds.feedburner.com/ajaxian'}
    ]
});
