
Ext.define('App.view.hris.management_asset.Asset', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('list_of_assets'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.management_asset.Asset',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_history = Ext.create('App.store.hris.management_asset.Asset_history',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.grid_history = Ext.create('Ext.grid.Panel', {
            store: me.store_history,
            title :_('hictorical_asset'),
            height: 1000,
            autoScroll: false,
            plugins: [
                me.formEditingHistory = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
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
                                            fieldLabel: _('id'),
                                            items: [
                                                {
                                                    width: 150,
                                                    xtype: 'textfield',
                                                    name: 'asset_id',
                                                    allowBlank: false,
                                                    emptyText: i18n('serial_number'),
                                                    readOnly: true,
                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                },
                                                {
                                                    width: 280,
                                                    xtype: 'textfield',
                                                    name: 'asset_name',
                                                    allowBlank: false,
                                                    emptyText: i18n('name'),
                                                    readOnly: true,
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
                                            fieldLabel: _('type'),
                                            items: [
                                                {
                                                    width: 200,
                                                    xtype: 'xtasset_type',
                                                    name: 'asset_type',
                                                    readOnly: true,
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
                                                    width: 305,
                                                    xtype: 'xtcompany',
                                                    fieldLabel: _('company'),
                                                    name: 'company_id',
                                                    readOnly: true,
                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                },
                                                {
                                                    width: 225,
                                                    xtype: 'xtol_type',
                                                    fieldLabel: _('office_location'),
                                                    name: 'ol_id',
                                                    readOnly: true,
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
                                                    xtype : 'datefield',
                                                    fieldLabel: _('start_date'),
                                                    editable: false,
                                                    name: 'start_date',
                                                    format : 'Y-m-d',
                                                    value: new Date(),
                                                    emptyText: i18n('start_date'),
                                                    readOnly: true,
                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                },
                                                {
                                                    width: 200,
                                                    xtype : 'datefield',
                                                    fieldLabel: _('end_date'),
                                                    editable: false,
                                                    name: 'end_date',
                                                    format : 'Y-m-d',
                                                    value: new Date(),
                                                    emptyText: i18n('end_date'),
                                                    readOnly: true,
                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                }
                                            ]
                                        }
                                    ]
                                },
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
                                            fieldLabel: _('requester'),
                                            items: [
                                                {
                                                    xtype:'combo',
                                                    editable: false,
                                                    width:100,
                                                    name: 'request_type',
                                                    mode:'local',
                                                    store: [['P',_('personal')],['G',_('general')],['C',_('company')]],
                                                    readOnly: true,
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
                                            fieldLabel: _('employee'),
                                            items: [
                                                {
                                                    width: 100,
                                                    xtype: 'xtemployee',
                                                    name: 'emp_id',
                                                    emptyText: i18n('id'),
                                                    readOnly: true,
                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                },
                                                {
                                                    width: 280,
                                                    xtype: 'textfield',
                                                    name: 'emp_name',
                                                    emptyText: i18n('name'),
                                                    readOnly: true,
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
                                            fieldLabel: _('remarks'),
                                            items: [
                                                {
                                                    width: 380,
                                                    height: 50,
                                                    xtype: 'textarea',
                                                    style:{overflow:'auto'},
                                                    name: 'remarks',
                                                    emptyText: i18n('remarks'),
                                                    labelAlign: 'top',
                                                    readOnly: true,
                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
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
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_history.down('toolbar');
                    useredit.items.items[3].setText("UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('id'),width: 150,sortable: true,dataIndex: 'asset_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'asset_name'},
                {text: _('type'),width: 100,sortable: true,dataIndex: 'asset_type'},
                {text: _('company'),width: 100,sortable: true,dataIndex: 'company_id'},
                {text: _('office_location'),width: 100,sortable: true,dataIndex: 'ol_id'},
                {text: _('employee'),width: 150,sortable: true,dataIndex: 'emp_name'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['asset_id',_('id')],['asset_name',_('name')],['asset_type',_('type')],['company_id',_('company')],['ol_id',_('office_location')],['emp_name',_('employee')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_history.proxy.extraParams = {asset_id:me.asset_id, field_name:me.field_name, field_search:field.value};
                        me.store_history.loadPage(1);}}
                    }
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_history,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
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
                                    title: _('list_of_assets'),
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
                                                                    width: 150,
                                                                    xtype: 'textfield',
                                                                    name: 'asset_id',
                                                                    allowBlank: false,
                                                                    emptyText: i18n('serial_number')
                                                                },
                                                                {
                                                                    width: 280,
                                                                    xtype: 'textfield',
                                                                    name: 'asset_name',
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
                                                            fieldLabel: _('type'),
                                                            items: [
                                                                {
                                                                    width: 200,
                                                                    xtype: 'xtasset_type',
                                                                    name: 'asset_type'
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
                                                                    width: 305,
                                                                    xtype: 'xtcompany',
                                                                    fieldLabel: _('company'),
                                                                    name: 'company_id'
                                                                },
                                                                {
                                                                    width: 225,
                                                                    xtype: 'xtol_type',
                                                                    fieldLabel: _('office_location'),
                                                                    name: 'ol_id'
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
                                                                    xtype : 'datefield',
                                                                    fieldLabel: _('date'),
                                                                    editable: false,
                                                                    allowBlank: false,
                                                                    name: 'join_date',
                                                                    format : 'Y-m-d',
                                                                    value: new Date(),
                                                                    emptyText: i18n('date')
                                                                },
                                                                {
                                                                    width: 200,
                                                                    xtype: 'checkbox',
                                                                    fieldLabel: _('active'),
                                                                    name: 'active'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
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
                                                            fieldLabel: _('requester'),
                                                            items: [
                                                                {
                                                                    xtype:'combo',
                                                                    editable: false,
                                                                    width:100,
                                                                    name: 'request_type',
                                                                    mode:'local',
                                                                    store: [['P',_('personal')],['G',_('general')],['C',_('company')]],
                                                                    listeners:{
                                                                        change:function(f,e){
                                                                            var fieldcontainer = f.up('container'),
                                                                                container = fieldcontainer.up('container');
                                                                            if(f.value=='P'){
                                                                                container.items.items[1].items.items[0].setDisabled(false);
                                                                            }else{
                                                                                container.items.items[1].items.items[0].setValue(null);
                                                                                container.items.items[1].items.items[1].setValue(null);
                                                                                container.items.items[1].items.items[0].setDisabled(true);
                                                                            }
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
                                                            fieldLabel: _('employee'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xtemployee',
                                                                    name: 'emp_id',
                                                                    emptyText: i18n('id'),
                                                                    allowBlank:false
                                                                },
                                                                {
                                                                    width: 280,
                                                                    xtype: 'textfield',
                                                                    name: 'emp_name',
                                                                    emptyText: i18n('name'),
                                                                    readOnly: true,
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
                                }, me.grid_history
                            ]
                        }
                    ]
                })
            ],
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                    me.asset_id= record.data.asset_id;
                    me.store_history.load({params:{asset_id:me.asset_id}});
                }
            },
            columns: [
                {text: _('id'),width: 150,sortable: true,dataIndex: 'asset_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'asset_name'},
                {text: _('type'),width: 100,sortable: true,dataIndex: 'asset_type'},
                {text: _('company'),width: 100,sortable: true,dataIndex: 'company_id'},
                {text: _('office_location'),width: 100,sortable: true,dataIndex: 'ol_id'},
                {text: _('employee'),width: 150,sortable: true,dataIndex: 'emp_name'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('list_of_assets'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['asset_id',_('id')],['asset_name',_('name')],['asset_type',_('type')],['company_id',_('company')],['ol_id',_('office_location')],['emp_name',_('employee')]],
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
