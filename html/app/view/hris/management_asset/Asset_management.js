
Ext.define('App.view.hris.management_asset.Asset_management', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('asset_management'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.management_asset.Asset_management',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_asset = Ext.create('App.store.hris.management_asset.Asset_using_history',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_driver = Ext.create('App.store.hris.management_asset.Driver_using_history',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.grid_asset = Ext.create('Ext.grid.Panel', {
            store: me.store_asset,
            title :'Asset History',
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            columns: [
                {text: _('asset'),width: 150,sortable: true,dataIndex: 'asset_name'},
                {text: _('date'),width: 120,sortable: true,dataIndex: 'request_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('from'),width: 120,sortable: true,dataIndex: 'time_in'},
                {text: _('to'),width: 120,sortable: true,dataIndex: 'time_out'},
                {text: _('name'),width: 150,sortable: true,dataIndex: 'emp_name'},
                {text: _('driver'),width: 150,sortable: true,dataIndex: 'driver_name'},{text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('status'),width: 80,sortable: true, dataIndex: 'status'}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['emp_name',_('name')],['request_date',_('date')],['driver_name',_('driver')],['remarks',_('remarks')],['asset_name',_('asset')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_asset.proxy.extraParams = {field_name:me.field_name, field_search:field.value};
                        me.store_asset.loadPage(1);}}
                    }
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_asset,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_driver = Ext.create('Ext.grid.Panel', {
            store: me.store_driver,
            title :'Driver History',
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            columns: [
                {text: _('driver'),width: 150,sortable: true,dataIndex: 'driver_name'},
                {text: _('date'),width: 120,sortable: true,dataIndex: 'request_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('from'),width: 120,sortable: true,dataIndex: 'time_in'},
                {text: _('to'),width: 120,sortable: true,dataIndex: 'time_out'},
                {text: _('name'),width: 150,sortable: true,dataIndex: 'emp_name'},
                {text: _('asset'),width: 150,sortable: true,dataIndex: 'asset_name'},{text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('status'),width: 80,sortable: true, dataIndex: 'status'}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['emp_name',_('name')],['request_date',_('date')],['driver_name',_('driver')],['remarks',_('remarks')],['asset_name',_('asset')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_driver.proxy.extraParams = {field_name:me.field_name, field_search:field.value};
                        me.store_driver.loadPage(1);}}
                    }
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_driver,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title :'Request Asset',
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                }
            },
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    autoCancel:true,
                    items: [
                        {
                            xtype:'panel',
                            layout: 'hbox',
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
                                                    fieldLabel: _('type'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'xtasset_type',
                                                            name: 'asset_type',
                                                            allowBlank: false,
                                                            emptyText: i18n('type'),
                                                            listeners:{
                                                                change:function(f){
                                                                    var plugin  = me.grid.editingPlugin,
                                                                        asset_id =  plugin.editor.form.findField('asset_id');
                                                                    asset_id.setValue(null);
                                                                    asset_id.extraParams=f.value;
                                                                }
                                                            }
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
                                                    fieldLabel: _('date'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'datefield',
                                                            name: 'request_date',
                                                            format : 'Y-m-d',
                                                            value: new Date(),
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
                                                    items: [
                                                        {
                                                            width: 200,
                                                            xtype : 'timefield',
                                                            editable: false,
                                                            fieldLabel: _('time_from'),
                                                            name: 'time_in',
                                                            format : 'H:i:s',
                                                            emptyText: i18n('time_from')
                                                        },
                                                        {
                                                            width: 200,
                                                            xtype : 'timefield',
                                                            editable: false,
                                                            fieldLabel: _('time_to'),
                                                            name: 'time_out',
                                                            format : 'H:i:s',
                                                            value: new Date(),
                                                            emptyText: i18n('time_to')
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
                                },
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    layout: 'hbox',
                                    title: _('requester'),
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
                                                            xtype: 'xtemployee',
                                                            name: 'emp_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('id')
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
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
                                                    fieldLabel: _('asset'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xthris_asset',
                                                            name: 'asset_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('id')
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'asset_name',
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
                                                    fieldLabel: _('driver'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtdriver',
                                                            name: 'driver_id',
                                                            emptyText: i18n('id')
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'driver_name',
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
            columns: [
                {text: _('name'),width: 150,sortable: true,dataIndex: 'emp_name'},
                {text: _('date'),width: 120,sortable: true,dataIndex: 'request_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('time_from'),width: 120,sortable: true,dataIndex: 'time_in'},
                {text: _('time_to'),width: 120,sortable: true,dataIndex: 'time_out'},
                {text: _('driver'),width: 150,sortable: true,dataIndex: 'driver_name'},
                {text: _('asset'),width: 150,sortable: true,dataIndex: 'asset_name'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('approval'),width: 60,sortable: true, dataIndex: 'status', renderer: function (value, meta, record, rowIndex, colIndex, store) {
                    return record.data.status == '1' ? _('yes') : (record.data.status == '2' ? _('no'): _('pending'));
                }}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('asset_management'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['emp_name',_('name')],['request_date',_('date')],['driver_name',_('driver')],['remarks',_('remarks')],['asset_name',_('asset')]],
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
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.grid,me.grid_driver,me.grid_asset],
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
        me.pageBody = [ me.FormulirPanel ];
        me.callParent(arguments);
    },
    onNewUser: function(){
        var me = this;
        me.formEditing.cancelEdit();
        me.store.insert(0, {aktif: 1,authorized: 1});
        me.formEditing.startEdit(0, 0);
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
