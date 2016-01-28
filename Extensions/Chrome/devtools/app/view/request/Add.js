Ext.define('PhpDevTools.view.request.Add', {
    extend: 'Ext.window.Window',

    alias: 'widget.requestwindow',

    requires: ['Ext.form.Panel', 'Ext.form.field.ComboBox'],

    defaultRequests: [
        ['http://rss.cnn.com/rss/edition.rss', 'CNN Top Stories'],
        ['http://sports.espn.go.com/espn/rss/news', 'ESPN Top News'],
        ['http://news.google.com/news?ned=us&topic=t&output=rss', 'Sci/Tech - Google News'],
        ['http://rss.news.yahoo.com/rss/software', 'Yahoo Software News']
    ],
    
    defaultFocus: '#request',

    width: 500,
    title: 'Add Request',
    iconCls: 'request-add',
    layout: 'fit',
    modal: true,
    plain: true,

    initComponent: function() {
        Ext.apply(this, {
            buttons: [{
                text: 'Add request',
                action: 'create'
            }, {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }],

            items: [{
                xtype: 'form',
                bodyPadding: '12 10 10',
                border: false,
                unstyled: true,
                items: [{
                    itemId: 'request',
                    anchor: '0',
                    fieldLabel: 'Enter the URL of the request to add',
                    labelAlign: 'top',
                    msgTarget: 'under',
                    xtype: 'combo',
                    store: this.defaultRequests,
                    getInnerTpl: function() {
                        return '<div class="request-picker-url">{field1}</div><div class="request-picker-title">{field2}</div>';
                    }
                }]
            }]
        });

        this.callParent(arguments);
    }
});
