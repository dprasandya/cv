
Ext.define('App.view.hris.Attendance.Office_hours', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('office_hours'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.Attendance.Office_hours',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_detail = Ext.create('App.store.hris.Attendance.Office_hours_detail',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            height: 1000,
            autoScroll: false,
            title :_('detail'),
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
                                            fieldLabel: _('day'),
                                            items: [
                                                {
                                                    width: 150,
                                                    xtype: 'textfield',
                                                    name: 'day_id',
                                                    allowBlank: false,
                                                    fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;',
                                                    emptyText: i18n('id')
                                                },
                                                {
                                                    width: 350,
                                                    xtype: 'textfield',
                                                    name: 'day_name',
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
                                                    xtype:'combo',
                                                    editable: false,
                                                    width:100,
                                                    mode:'local',
                                                    name: 'day_type',
                                                    store: ['Full Day', 'Half Day', 'Off Day']
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
                                                    fieldLabel: _('time_from'),
                                                    name: 'time_in',
                                                    format : 'H:i:s',
                                                    emptyText: i18n('time_from')
                                                },
                                                {
                                                    width: 200,
                                                    xtype : 'timefield',
                                                    fieldLabel: _('time_to'),
                                                    name: 'time_out',
                                                    format : 'H:i:s',
                                                    value: new Date(),
                                                    emptyText: i18n('time_to')
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
                {text: _('id'),width: 80,sortable: true,dataIndex: 'day_id'},
                {text: _('name'),flex:1,sortable: true,dataIndex: 'day_name'},
                {text: _('type'),width: 100,sortable: true,dataIndex: 'day_type'},
                {text: _('time_from'),width: 80,sortable: true,dataIndex: 'time_in'},
                {text: _('time_to'),width: 80,sortable: true,dataIndex: 'time_out'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('detail'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['day_id',_('id')],['day_name',_('name')],['time_in',_('time_from')],['time_out',_('time_to')],['day_type',_('type')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_detail.proxy.extraParams = {oh_id:me.oh_id, field_name:me.field_name, field_search:field.value}; me.store_detail.load({params:{start:0}})}}}
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_detail,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+" | UserEdit : " +record.data.useredit);
                    me.oh_id = record.data.oh_id;
                    me.store_detail.proxy.extraParams ={oh_id:me.oh_id};
                    me.store_detail.load();
                }
            },
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
                                    title: _('office_hours'),
                                    layout:'hbox',
                                    flex:1,
                                    items:[ {
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
                                                                name: 'oh_id',
                                                                allowBlank: false,
                                                                fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;',
                                                                emptyText: i18n('id')
                                                            },
                                                            {
                                                                width: 250,
                                                                xtype: 'textfield',
                                                                name: 'oh_name',
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
                                    }]
                                },me.grid_detail
                            ]
                        }


                    ]
                })
            ],
            columns: [
                {text: _('id'),width: 100,sortable: true,dataIndex: 'oh_id'},
                {text: _('name'),flex:1,sortable: true,dataIndex: 'oh_name'},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('office_hours'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['oh_id',_('id')],['oh_name',_('name')]],
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
        plugin.context.record.data.oh_id = me.oh_id;
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
