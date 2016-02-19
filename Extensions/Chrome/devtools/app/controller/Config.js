Ext.define('PhpDevTools.controller.Config', {
    extend: 'Ext.app.Controller',

    requires : ['PhpDevTools.view.config.Config'],

    refs: [
        {
            ref: 'config',
            selector: 'config'
        }
    ],

    openConfig : function () {
        var me = this;
        var view = Ext.widget('config');
        view.show();
    }


});
