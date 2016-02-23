Ext.define('PhpDevTools.view.config.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.configGrid',

    layout: 'fit',

    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },

    viewConfig: {
        getRowClass: function(record, index) {
            var status = record.get('status');
            if ( status == 'new' ) {
                return 'x-grid-dirty-cell';
            }
        }
    },

    initComponent : function () {

        var me = this;

        this.columns = [
            { text: 'Ordre'       , dataIndex: 'order' },
            { text: 'status'      , dataIndex: 'status' , display : false},
            { text: 'Domain'      , dataIndex: 'domain'      , editor: 'textfield'},
            { text: 'ProfilerUrl' , dataIndex: 'profilerurl' , editor: 'textfield', flex: 1 },
            { text: 'VanName'     , dataIndex: 'varname'     , editor: 'textfield'},
            {
                xtype:'actioncolumn',
                width:50,
                items: [{
                    getClass : function() { return 'fa fa-arrow-up fontsize13'},
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        rec.set('order' , rec.get('order') - 1 );
                    }
                },{
                    getClass : function() { return 'fa fa-arrow-down fontsize13'},
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        rec.set('order' , rec.get('order') + 1 );
                    }
                },{
                    getClass : function() { return 'fa fa-trash-o fontsize13'},
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        rec.drop();
                    }
                }
                ]
            }
        ];

        this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        xtype:"button",
                        glyph:0xf055,
                        text: 'Ajouter',
                        handler : function ( ) {
                            me.getStore().add({order:me.getStore().getCount()+1,status:'new'});
                        }
                    },
                    {
                        xtype:"button",
                        glyph:0xf0c7,
                        text: 'Enregistrer',
                        handler : function ( ) {
                            Ext.Array.each( me.getStore().getRemovedRecords() , function ( model ) { model.save() } );
                            Ext.Array.each( me.getStore().getModifiedRecords() , function ( model ) { model.set('status','');model.save() } );
                            me.getStore().sort('order','ASC');
                            var ord = 0;
                            me.getStore().each( function ( model ) { model.set('order',++ord); } );
                            me.getStore().sort('order','ASC');
                            me.getStore().each( function ( model ) { model.save() } );
                            me.getStore().getSorters().clear();

                            me.getView().refresh();
                        }
                    }
                ]
            },
            {
                dock: 'bottom',
                html : 'Cliquez sur un champs pour l\'éditer'
            }
        ];

        this.callParent(arguments);
    }
});
