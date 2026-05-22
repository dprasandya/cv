
Ext.define('App.view.hris.Attendance.Outstation', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('outstation'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.Attendance.Outstation',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_alocation = Ext.create('App.store.hris.Attendance.Outstation_alocation',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.grid_alocation = Ext.create('Ext.grid.Panel', {
            store: me.store_alocation,
            height: 1000,
            autoScroll: false,
            title: _('budget_alocation'),
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
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
                                            fieldLabel: _('alocation'),
                                            items: [
                                                {
                                                    width: 280,
                                                    xtype : 'textfield',
                                                    name: 'alocation_name',
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
                                            fieldLabel: _('amount'),
                                            items: [
                                                {
                                                    width: 150,
                                                    xtype: 'mitos.currency',
                                                    name: 'amount',
                                                    emptyText: i18n('amount'),
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
                                            fieldLabel: _('attachment'),
                                            items: [
                                                {
                                                    xtype:'combo',
                                                    editable: false,
                                                    width:150,
                                                    mode:'local',
                                                    name: 'attachment',
                                                    store: [['Y',_('yes')], ['N',_('no')]],
                                                    emptyText: i18n('attachment')
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
                {text: _('alocation'),flex:1,sortable: true,dataIndex: 'alocation_name',summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('amount'),width:100,sortable: true,dataIndex: 'amount', summaryType:'sum',align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('attachment'),width: 80,sortable: true,dataIndex: 'attachment'}
            ],
            features: [{
                ftype: 'summary'
            }],
            tbar: [
                {
                    xtype: 'button',
                    text: _('budget_alocation'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['alocation_name',_('alocation')],['amount',_('amount')],['attachment',_('attachment')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_alocation.proxy.extraParams = {field_name:me.field_name, field_search:field.value}; me.store_alocation.load({params:{start:0}})}}}
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_alocation,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    me.emp_id=record.data.emp_id; me.seq_id=record.data.seq_id;
                    me.store_alocation.proxy.extraParams = {emp_id:me.emp_id, seq_id:me.seq_id};
                    me.store_alocation.load();
                }
            },
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    autoCancel:true,
                    items: [
                        {
                            xtype: 'tabpanel',
                            items:[
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    title: _('outstation'),
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
                                                    fieldLabel: _('employee'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype : 'xtemployee',
                                                            editable: false,
                                                            name: 'emp_id',
                                                            emptyText: i18n('id')
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype : 'textfield',
                                                            name: 'emp_name',
                                                            readOnly: true,
                                                            emptyText: i18n('name'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
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
                                                            width: 200,
                                                            xtype: 'datefield',
                                                            editable: false,
                                                            fieldLabel: _('date_from'),
                                                            name: 'fromdate',
                                                            format: 'Y-m-d',
                                                            value: new Date(),
                                                            emptyText: i18n('date_from')
                                                        },
                                                        {
                                                            width: 200,
                                                            xtype: 'datefield',
                                                            editable: false,
                                                            fieldLabel: _('date_to'),
                                                            name: 'todate',
                                                            format: 'Y-m-d',
                                                            value: new Date(),
                                                            emptyText: i18n('date_to')
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
                                                            fieldLabel: _('status'),
                                                            name: 'status'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }, me.grid_alocation
                            ]
                        }


                    ]
                })
            ],
            columns: [
                {text: _('id'),width: 100,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex:1,sortable: true,dataIndex: 'emp_name'},
                {text: _('date_from'),width: 80,sortable: true,dataIndex: 'fromdate', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('date_to'),width: 80,sortable: true,dataIndex: 'todate', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('remarks'),flex:1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'status'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('outstation'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['emp_id',_('id')],['emp_name',_('name')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store.proxy.extraParams = {field_name:me.field_name, field_search:field.value}; me.store.load({params:{start:0}})}}}
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
    onNewUser: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store , model = store.model, plugin = grid.editingPlugin, newModel;
        newModel = Ext.ModelManager.create({
        }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);
        plugin.context.record.data.emp_id = me.emp_id;
        plugin.context.record.data.seq_id = me.seq_id;
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
