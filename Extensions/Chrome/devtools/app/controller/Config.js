Ext.define('PhpDevTools.controller.Config', {
    extend: 'Ext.app.Controller',

    stores: ['Configs'],
    models: ['Config'],

    requires : [
        'PhpDevTools.view.config.Window',
        'PhpDevTools.view.config.Grid',
    ],

    refs: [
        {
            ref: 'configWin',
            selector: 'configWin'
        },
        {
            ref: 'configGrid',
            selector: 'configGrid'
        }
    ],


    openConfig : function () {
        var me = this;
        var win = Ext.widget('configWin');

        win.on('beforeclose',function () {
            if ( ( me.getConfigsStore().getRemovedRecords() != 0 ) || ( me.getConfigsStore().getModifiedRecords() != 0 ) ) {
                if( confirm ('Vous avez des modifications en cours.\n' +
                    'Si vous fermer cette fenêtre elles seront perdues.\n' +
                    'Voulez-vous tout de même fermer la fenêtre ?') ) {
                    me.getConfigsStore().reload();
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        });

        win.show();

        if ( win.items.length == 0 ) {
            win.add({
                xtype : "configGrid",
                store : this.getConfigsStore()
            });
        }
    }


});
