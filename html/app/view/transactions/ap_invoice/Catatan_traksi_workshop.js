
Ext.define('App.view.transactions.ap_invoice.Catatan_traksi_workshop', {
    extend: 'App.ux.RenderPanel',
    pageTitle: 'Catatan Traksi WorkShop',
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.ap_invoice.Catatan_traksi',{remoteSort: true, pageSize : 20, autoLoad: false});

        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                }
            },
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    items:[
                        {
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    layout: 'hbox',
                                    flex:1,
                                    items:[
                                        {
                                            xtype: 'container',
                                            layout:'anchor',
                                            flex:1,
                                            items: [
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    fieldLabel: _('document'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype : 'datefield',
                                                            editable: false,
                                                            name: 'doc_date',
                                                            format : 'Y-m-d',
                                                            value: new Date(),
                                                            maxValue : new Date(),
                                                            emptyText: i18n('docdate'),
                                                            allowBlank:false
                                                        },
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    fieldLabel: _('policy_number'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'xtkendaraan',
                                                            name: 'no_polisi',
                                                            allowBlank:false,
                                                            emptyText: i18n('policy_number')
                                                        },
                                                        {
                                                            width: 250,
                                                            xtype: 'textfield',
                                                            name: 'nama_sopir',
                                                            readOnly:true,
                                                            emptyText: i18n('driver')
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    fieldLabel: 'Catatan Km',
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'numberfield',
                                                            name: 'km',
                                                            allowBlank:false,
                                                            emptyText: 'Km'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    fieldLabel: 'Waktu Penyelesaian',
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'mitos.currency',
                                                            name: 'waktu_penyelesaian',
                                                            allowBlank:false
                                                        },
                                                        {
                                                            xtype: 'displayfield',
                                                            labelAlign: 'left',
                                                            fieldLabel: '/jam',
                                                            
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    fieldLabel: _('remarks'),
                                                    items: [
                                                        {
                                                            width: 380,
                                                            height: 50,
                                                            xtype: 'textarea',
                                                            style:{overflow:'auto'},
                                                            name: 'remarks',
                                                            allowBlank:false,
                                                            emptyText: i18n('remarks'),
                                                            labelAlign: 'top'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
            ],
            columns: [
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('policy_number'),width: 80,sortable: true,dataIndex: 'no_polisi'},
                {text: 'Jam',width: 60,sortable: true,dataIndex: 'waktu_penyelesaian', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('add'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['no_polisi',_('policy_number')],['remarks',_('remarks')],['km','Km'],['userinput',_('input_user')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {doc_type:'W', field_name:me.field_name, field_search:field.value};
                        me.store.loadPage(1);}}
                    }
                },'->',
                {
                    xtype: 'label'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.store,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.pageBody = [ me.grid];
        me.callParent(arguments);
    },
    onNewData: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        plugin.editor.form.findField('doc_date').setValue(new Date());
        me.formEditing.context.record.data.doc_type = 'W';
    },


    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        me.store.proxy.extraParams = {doc_type:'W'};
        me.store.load();
        callback(true);
    }
});
