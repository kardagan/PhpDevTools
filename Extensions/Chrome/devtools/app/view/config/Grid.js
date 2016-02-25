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

        this.columns = {
            defaults : {
                menuDisabled : true,
                sortable : false
            },
            items : [
                { text: 'id'          , dataIndex: 'id'},
                { text: 'Ordre'       , dataIndex: 'order', hidden : true},
                { text: 'Ordre'       , dataIndex: 'neworder' },
                { text: 'status'      , dataIndex: 'status', hidden : true},
                { text: 'Domain'      , dataIndex: 'domain'      , editor: 'textfield'},
                { text: 'ProfilerUrl' , dataIndex: 'profilerurl' , editor: 'textfield', flex: 1 },
                { text: 'VarName'     , dataIndex: 'varname'     , editor: 'textfield'},
                {
                    xtype:'actioncolumn',
                    width:50,
                    items: [{
                        getClass : function() { return 'fa fa-arrow-up fontsize13'},
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            rec.set('neworder' , rec.get('neworder') - 1 );
                        }
                    },{
                        getClass : function() { return 'fa fa-arrow-down fontsize13'},
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            rec.set('neworder' , rec.get('neworder') + 1 );
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
            ]
        };

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
                            me.getStore().add({order:me.getStore().getCount()+1,neworder:me.getStore().getCount()+1,status:'new'});
                        }
                    },
                    {
                        xtype:"button",
                        glyph:0xf0c7,
                        text: 'Enregistrer',
                        handler : function ( ) {

                            me.getStore().each( function ( model ) {
                                model.set( 'order' , model.get('neworder') );
                                model.set( 'status' , "" );
                            } );

                            me.getStore().sync();
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
