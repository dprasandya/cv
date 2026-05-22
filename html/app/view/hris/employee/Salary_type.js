
Ext.define('App.view.hris.employee.Salary_type', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('salary_type'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.employee.Salary_type',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_detail = Ext.create('App.store.hris.employee.Salary_type_detail',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            title :_('detail'),
            height:1000,
            viewConfig :
                {
                    stripeRows: false,
                    getRowClass: function(record, index) {
                        return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                    }
                },
            plugins: [
                me.formEditingDetail = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    autoCancel:true,
                    items: [
                        {
                            xtype: 'fieldset',
                            defaultType: 'textfield',
                            layout: 'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    flex:1,
                                    layout:'anchor',
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: {
                                                type: 'hbox'
                                            },
                                            fieldDefaults: {
                                                labelAlign: 'right'
                                            },
                                            fieldLabel: _('date'),
                                            items: [
                                                {
                                                    width: 100,
                                                    xtype: 'numberfield',
                                                    name: 'from_rate',
                                                    emptyText: i18n('from')
                                                },
                                                {
                                                    width: 100,
                                                    xtype: 'numberfield',
                                                    name: 'to_rate',
                                                    emptyText: i18n('to')
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
                })
            ],
            columns: [
                {text: _('id'),width: 100,sortable: true,dataIndex: 'seq_id'},
                {text: _('from'),width: 80,sortable: true,dataIndex: 'from_rate'/*, renderer:Ext.util.Format.dateRenderer('d/m/Y H:i')*/},
                {text: _('to'),width: 80,sortable: true,dataIndex: 'to_rate'/*, renderer:Ext.util.Format.dateRenderer('d/m/Y H:i')*/},
                {text: _('remarks'),flex:1,sortable: true,dataIndex: 'remarks'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('detail'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewDetail
                }
            ]
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    autoCancel:true,
                    items: [
                        {
                            xtype:'tabpanel',
                            items:[
                                {
                                    title: _('salary_type'),
                                    layout:'hbox',
                                    flex:1,
                                    items:[
                                        {
                                            xtype: 'fieldset',
                                            defaultType: 'textfield',
                                            layout: 'hbox',
                                            flex:1,
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex:1,
                                                    layout:'anchor',
                                                    items: [
                                                        {
                                                            xtype: 'fieldcontainer',
                                                            layout: {
                                                                type: 'hbox'
                                                            },
                                                            fieldDefaults: {
                                                                labelAlign: 'right'
                                                            },
                                                            fieldLabel: _('id'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'textfield',
                                                                    name: 'st_id',
                                                                    allowBlank: false,
                                                                    emptyText: i18n('id')
                                                                },
                                                                {
                                                                    width: 280,
                                                                    xtype: 'textfield',
                                                                    name: 'st_name',
                                                                    allowBlank: false,
                                                                    emptyText: i18n('name')
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
                                                            fieldLabel: _('rate'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'combo',
                                                                    name: 'st_rate',
                                                                    mode:'local',
                                                                    allowBlank: false,
                                                                    editable:false,
                                                                    store: [[1,'1X /'+_('month')],[2,'2X /'+_('month')],[31,'31X /'+_('month')]],
                                                                    emptyText: i18n('id')
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
                                                                    emptyText: i18n('remarks'),
                                                                    labelAlign: 'top'
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
                                                            items: [
                                                                {
                                                                    width: 125,
                                                                    xtype: 'checkbox',
                                                                    fieldLabel: _('active'),
                                                                    name: 'active'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },me.grid_detail
                            ]
                        }


                    ]
                })
            ],
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar'); me.data = record.data;
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+" | UserEdit : " +record.data.useredit);
                    me.store_detail.proxy.extraParams = {st_id:record.data.st_id};
                    me.store_detail.load();
                }
            },
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'st_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'st_name'},
                {text: _('rate'),width: 100,sortable: true, align:'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                        var returnString =  record.data.st_rate+"X /"+_('month');
                        return returnString;
                    }},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('salary_type'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['st_id',_('id')],['st_name',_('name')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {field_name:me.field_name, field_search:field.value};
                        me.store.loadPage(1);}}
                    }
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.pageBody = [ me.grid ];
        me.callParent(arguments);
    },
    onNewUser: function(){
        var me = this;
        me.formEditing.cancelEdit();
        me.store.insert(0, {aktif: 1,authorized: 1});
        me.formEditing.startEdit(0, 0);
    },

    onNewDetail: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        plugin.context.record.data.st_id = me.data.st_id;
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.store.proxy.extraParams={};
        this.store.load();
        callback(true);
    }
});
