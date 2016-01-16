Ext.onReady(function(){
    Ext.create('Ext.Viewport',{
        xtype: 'container',
        layout : 'fit',
        items : [
            {
                xtype : "tabpanel",
                items : [
                    {
                        xtype : "panel",
                        title : "toto 1",
                        html : "coucou ?"
                    },
                    {
                        xtype : "panel",
                        title : "toto 2",
                        html : "coucou le monde"
                    },
                    {
                        xtype : "panel",
                        title : "toto 3",
                        html : "coucou le world"
                    }
                ]

            }
        ]
    });

});