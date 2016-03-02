Ext.define('PhpDevTools.view.profiler.Collector', {
    extend:'Ext.view.View',
    flex:1,
    closable: false,

    display : function ( profiler ) {
        this.getStore().add(profiler)
    },

    initComponent : function () {
        this.store = Ext.create('PhpDevTools.store.Profilers');
        this.callParent(arguments);
    },

    itemSelector: 'div.thumb-wrap',

    tpl : new Ext.XTemplate(
        '<tpl for=".">',
        '<div style="margin-bottom: 10px;" class="thumb-wrap">',
        '<span>{data}</span>',
        '</div>',
        '</tpl>'
    )

});