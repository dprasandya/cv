
Ext.define('App.view.transactions.closing.Closing', {
    extend: 'App.ux.RenderPanel',
    id: 'panelClosing',
    pageTitle: _('closed'),
    initComponent: function(){
        var me = this;
        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.model_month =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'co_id', type:'string'},
                {name:'period', type:'string'},
                {name:'closing_date', type:'date'},
                {name:'remarks', type:'string'},
                {name:'status', type:'bool'},
                {name:'useredit', type:'string'},
                {name:'timeedit', type:'date'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read: Closing.select_month,
                    create: Closing.add_month,
                    update: Closing.update_month,
                    destroy: Closing.delete_month
                },
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                }
            }
        });
        me.model_year =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'co_id', type:'string'},
                {name:'period', type:'string'},
                {name:'closing_date', type:'date'},
                {name:'remarks', type:'string'},
                {name:'status', type:'bool'},
                {name:'useredit', type:'string'},
                {name:'timeedit', type:'date'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read: Closing.select_year,
                    create: Closing.add_year,
                    update: Closing.update_year,
                    destroy: Closing.delete_year
                },
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                }
            }
        });
        me.store_month = Ext.create('Ext.data.Store',{model: me.model_month ,remoteSort: true, autoLoad: true});
        me.store_year = Ext.create('Ext.data.Store',{model: me.model_year ,remoteSort: true, autoLoad: true});

        me.grid_month = Ext.create('Ext.grid.Panel', {
            store: me.store_month,
            title: _('month'),
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'container',
                                            items: [
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    fieldLabel: _('period'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'textfield',
                                                            name: 'period',
                                                            allowBlank: false,
                                                            maxLength : 6,
                                                            emptyText: i18n('period')
                                                        },
                                                        {
                                                            width: 100,
                                                            xtype : 'datefield',
                                                            editable: false,
                                                            allowBlank: false,
                                                            name: 'closing_date',
                                                            format : 'Y-m-d',
                                                            value: new Date(),
                                                            maxValue : new Date(),
                                                            emptyText: i18n('date')
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
                                                    fieldLabel: 'Remarks',
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
                                                            name: 'status'
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
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_month.down('toolbar');
                    useredit.items.items[1].setText("UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('period'),width: 80,sortable: true,dataIndex: 'period'},
                {text: _('date'),width: 80,sortable: true,dataIndex: 'closing_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'status'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('add'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    displayfield:'useredit'
                }
            ],
             bbar: {
                 xtype: 'pagingtoolbar',
                 pageSize: 10,
                 store: me.store_month,
                 displayMsg: 'Diplay {0} - {1} Of {2}',
                 emptyMsg: 'No Record Found',
                 displayInfo: true
             }
        });
        me.grid_year = Ext.create('Ext.grid.Panel', {
            store: me.store_year,
            title: _('year'),
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'container',
                                            items: [
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    fieldLabel: _('period'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'textfield',
                                                            name: 'period',
                                                            allowBlank: false,
                                                            maxLength : 4,
                                                            emptyText: i18n('year')
                                                        },
                                                        {
                                                            width: 100,
                                                            xtype : 'datefield',
                                                            editable: false,
                                                            allowBlank: false,
                                                            name: 'closing_date',
                                                            format : 'Y-m-d',
                                                            value: new Date(),
                                                            maxValue : new Date(),
                                                            emptyText: i18n('date')
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
                                                    fieldLabel: 'Remarks',
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
                                                            name: 'status'
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
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_year.down('toolbar');
                    useredit.items.items[1].setText("UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('period'),width: 80,sortable: true,dataIndex: 'period'},
                {text: _('date'),width: 80,sortable: true,dataIndex: 'closing_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'status'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('add'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_year,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.grid_month, me.grid_year ],
            listeners: {
                render: function() {
                    this.items.each(function(i, index, items){
                        i.tab.on('click', function(){
                            i.store.load()
                        });
                    });
                }
            }
        });
        me.pageBody = [ me.grid];
        me.callParent(arguments);
    },
    onNewUser: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.store_month.load();
        callback(true);
    }
});
