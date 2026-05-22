
Ext.define('App.view.hris.Attendance.Attendance_sharing_id', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('attendance_sharing_id'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.Attendance.Attendance_sharing_id',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                }
            },
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
                                            fieldLabel: _('id')+' 1',
                                            items: [
                                                {
                                                    width: 100,
                                                    xtype : 'xtemployee',
                                                    editable: false,
                                                    name: 'emp_id_01',
                                                    emptyText: i18n('id')
                                                },
                                                {
                                                    width: 280,
                                                    xtype : 'textfield',
                                                    name: 'emp_name',
                                                    readOnly: true,
                                                    emptyText: i18n('name'),
                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                },
                                                {
                                                    width: 100,
                                                    xtype : 'textfield',
                                                    name: 'company_id_01',
                                                    emptyText: i18n('id'),
                                                    //readOnly: true,
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
                                            fieldLabel: _('id')+' 2',
                                            items: [
                                                {
                                                    width: 100,
                                                    xtype : 'xtemployee',
                                                    editable: false,
                                                    name: 'emp_id_02',
                                                    emptyText: i18n('id')
                                                },
                                                {
                                                    width: 280,
                                                    xtype : 'textfield',
                                                    name: 'emp_name',
                                                    readOnly: true,
                                                    emptyText: i18n('name'),
                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                },
                                                {
                                                    width: 100,
                                                    xtype : 'textfield',
                                                    name: 'company_id_02',
                                                    emptyText: i18n('id'),
                                                    //readOnly: true,
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
                                            fieldLabel: _('id')+' 3',
                                            items: [
                                                {
                                                    width: 100,
                                                    xtype : 'xtemployee',
                                                    editable: false,
                                                    name: 'emp_id_03',
                                                    emptyText: i18n('id')
                                                },
                                                {
                                                    width: 280,
                                                    xtype : 'textfield',
                                                    name: 'emp_name',
                                                    readOnly: true,
                                                    emptyText: i18n('name'),
                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                },
                                                {
                                                    width: 100,
                                                    xtype : 'textfield',
                                                    name: 'company_id_03',
                                                    emptyText: i18n('id'),
                                                    //readOnly: true,
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
                                            fieldLabel: _('id')+' 4',
                                            items: [
                                                {
                                                    width: 100,
                                                    xtype : 'xtemployee',
                                                    editable: false,
                                                    name: 'emp_id_04',
                                                    emptyText: i18n('id')
                                                },
                                                {
                                                    width: 280,
                                                    xtype : 'textfield',
                                                    name: 'emp_name',
                                                    readOnly: true,
                                                    emptyText: i18n('name'),
                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                },
                                                {
                                                    width: 100,
                                                    xtype : 'textfield',
                                                    name: 'company_id_04',
                                                    emptyText: i18n('id'),
                                                    //readOnly: true,
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
                                            fieldLabel: _('id')+' 5',
                                            items: [
                                                {
                                                    width: 100,
                                                    xtype : 'xtemployee',
                                                    editable: false,
                                                    name: 'emp_id_05',
                                                    emptyText: i18n('id')
                                                },
                                                {
                                                    width: 280,
                                                    xtype : 'textfield',
                                                    name: 'emp_name',
                                                    readOnly: true,
                                                    emptyText: i18n('name'),
                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                },
                                                {
                                                    width: 100,
                                                    xtype : 'textfield',
                                                    name: 'company_id_05',
                                                    emptyText: i18n('id'),
                                                    //readOnly: true,
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
                                                    name: 'active'
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
                {text: _('name'),flex:1,sortable: true,dataIndex: 'emp_name'},
                {text: _('id')+' 1',width:80,sortable: true,dataIndex: 'emp_id_01'},
                {text: _('id')+' 2',width:80,sortable: true,dataIndex: 'emp_id_02'},
                {text: _('id')+' 3',width:80,sortable: true,dataIndex: 'emp_id_03'},
                {text: _('id')+' 4',width:80,sortable: true,dataIndex: 'emp_id_04'},
                {text: _('id')+' 5',width:80,sortable: true,dataIndex: 'emp_id_05'},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
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
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['emp_name',_('name')]],
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
    onNewUser: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store , model = store.model, plugin = grid.editingPlugin, newModel;
        newModel = Ext.ModelManager.create({
        }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);
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
