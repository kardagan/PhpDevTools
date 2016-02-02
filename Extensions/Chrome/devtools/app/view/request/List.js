Ext.define('PhpDevTools.view.request.List', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.requestlist',

    requires: ['Ext.toolbar.Toolbar'],

    title: 'Requests',
    collapsible: false,
    margin: '5 0 5 5',
    layout: 'fit',

    initComponent: function() {

        Ext.apply(this, {
            items: [{
                xtype: 'dataview',
                trackOver: true,
                store: this.store,
                cls: 'request-list',
                itemSelector: '.request-list-item',
                overItemCls: 'request-list-item-hover',
                tpl: '<tpl for="."><div class="request-list-item request-list-item-{type}">{name}</div></tpl>',
            }],
        });

        this.callParent(arguments);
    }
});
