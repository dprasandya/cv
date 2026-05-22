
Ext.define('App.view.administration.Roles', {
    extend: 'App.ux.RenderPanel',
    id: 'panelRoles',
    pageTitle: _('roles_and_permissions'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.model_roles =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'id', type:'int'},
                {name:'role_key', type:'string'},
                {name:'role_name', type:'string'},
                {name:'seq', type:'int'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read:Roles.getRole,
                    create:Roles.addRole,
                    update:Roles.updateRole,
                    destroy:Roles.deleteRole
                },
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                }
            }
        });
        me.model_permissions =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'id', type:'int'},
                {name:'perm_key', type:'string'},
                {name:'perm_remarks', type:'string'},
                {name:'perm_name', type:'string'},
                {name:'perm_cat', type:'string'},
                {name:'seq', type:'int'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read:Roles.getPermissions,
                    create:Roles.addPermissions,
                    update:Roles.updatePermissions,
                    destroy:Roles.deletePermissions
                },
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                }
            }
        });
        me.model_types =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'id', type:'int'},
                {name:'serial_number', type:'string'},
                {name:'perm_cat', type:'string'},
                {name:'perm_name', type:'string'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read:Roles.getTypes,
                    create:Roles.addTypes,
                    update:Roles.updateTypes,
                    destroy:Roles.deleteTypes
                },
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                }
            }
        });
        me.model_roles_permissions =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'id', type:'int'},
                {name:'role_key', type:'string'},
                {name:'perm_key', type:'string'},
                {name:'perm_name', type:'string'},
                {name:'perm_remarks', type:'string'},
                {name:'perm_cat', type:'string'},
                {name:'status', type:'bool'},
                {name:'i', type:'bool'},
                {name:'u', type:'bool'},
                {name:'d', type:'bool'},
                {name:'v', type:'bool'},
                {name:'p', type:'bool'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read:Roles.getRolePermissions,
                    create:Roles.addRolePermissions,
                    update:Roles.updateRolePermissions,
                    destroy:Roles.deleteRolePermissions
                },
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                }
            }
        });
        me.model_user_permissions =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'id', type:'int'},
                {name:'user_id', type:'int'},
                {name:'perm_key', type:'string'},
                {name:'perm_name', type:'string'},
                {name:'perm_remarks', type:'string'},
                {name:'perm_cat', type:'string'},
                {name:'status', type:'bool'},
                {name:'i', type:'bool'},
                {name:'u', type:'bool'},
                {name:'d', type:'bool'},
                {name:'v', type:'bool'},
                {name:'p', type:'bool'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read:Roles.getUserPermissions,
                    create:Roles.addUserPermissions,
                    update:Roles.updateUserPermissions,
                    destroy:Roles.deleteUserPermissions
                },
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                }
            }
        });


        me.store_roles = Ext.create('Ext.data.Store',{model: me.model_roles ,remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_permissions = Ext.create('Ext.data.Store',{model: me.model_permissions ,remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_types = Ext.create('Ext.data.Store',{model: me.model_types ,remoteSort: true, pageSize : 20, autoLoad: false});

        me.store_roles_permissions = Ext.create('Ext.data.Store',{model: me.model_roles_permissions ,remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_user_permissions = Ext.create('Ext.data.Store',{model: me.model_user_permissions ,remoteSort: true, pageSize : 20, autoLoad: false});

        me.grid_roles = Ext.create('Ext.grid.Panel', {
            store: me.store_roles,
            title: _('roles'),
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    items: [
                        {
                            xtype: 'panel',
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
                                                    fieldLabel: _('id'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            name: 'id',
                                                            xtype: 'numberfield',
                                                            hideTrigger: true,
                                                            readOnly: true,
                                                            emptyText: i18n('id'),
                                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;'
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
                                                    fieldLabel: _('roles'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'textfield',
                                                            name: 'role_key',
                                                            allowBlank: false,
                                                            emptyText: i18n('roles')
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'role_name',
                                                            allowBlank: false,
                                                            emptyText: i18n('role_name')
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
                {text: _('id'),width: 80,sortable: true,dataIndex: 'id'},
                {text: _('roles'),width: 100,sortable: true,dataIndex: 'role_key'},
                {text: _('role_name'),flex: 1,sortable: true,dataIndex: 'role_name'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('add_role'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['id',_('id')],['role_key',_('roles')],['role_name',_('name')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_roles.proxy.extraParams ={field_name:me.field_name, field_search:field.value};
                        me.store_roles.loadPage(1);}}
                    }
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.store_roles,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_types = Ext.create('Ext.grid.Panel', {
            store: me.store_types,
            title: _('type'),
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    items: [
                        {
                            xtype: 'panel',
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
                                                    fieldLabel: _('id'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            name: 'id',
                                                            xtype: 'numberfield',
                                                            hideTrigger: true,
                                                            readOnly: true,
                                                            emptyText: i18n('id'),
                                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            width: 100,
                                                            name: 'serial_number',
                                                            xtype: 'numberfield',
                                                            hideTrigger: true,
                                                            emptyText: i18n('serial_number')
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
                                                            width: 100,
                                                            xtype: 'textfield',
                                                            name: 'perm_cat',
                                                            allowBlank: false,
                                                            emptyText: i18n('type')
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'perm_name',
                                                            allowBlank: false,
                                                            emptyText: i18n('name')
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
                {text: _('id'),width: 80,sortable: true,dataIndex: 'id'},
                {text: _('type'),width: 120,sortable: true,dataIndex: 'perm_cat'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'perm_name'},
                {text: _('no'),width: 80,sortable: true,dataIndex: 'serial_number'}
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
                    store: [['id',_('id')],['perm_cat',_('type')],['perm_name',_('name')],['serial_number',_('no')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_types.proxy.extraParams ={field_name:me.field_name, field_search:field.value};
                        me.store_types.loadPage(1);}}
                    }
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.store_types,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_permissions = Ext.create('Ext.grid.Panel', {
            store: me.store_permissions,
            title: _('permission'),
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    items: [
                        {
                            xtype: 'panel',
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
                                                    fieldLabel: _('id'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            name: 'id',
                                                            xtype: 'numberfield',
                                                            hideTrigger: true,
                                                            readOnly: true,
                                                            emptyText: i18n('id'),
                                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;'
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
                                                    fieldLabel: _('permission'),
                                                    items: [
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'perm_key',
                                                            allowBlank: false,
                                                            emptyText: i18n('permission')
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'perm_remarks',
                                                            allowBlank: false,
                                                            emptyText: i18n('remarks')
                                                        },
                                                        {
                                                            width: 200,
                                                            xtype: 'textfield',
                                                            name: 'perm_name',
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
                                                            xtype:'rolestypescombo',
                                                            name: 'perm_cat',
                                                            width: 150,
                                                            allowBlank: false,
                                                            emptyText: i18n('type')
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
                {text: _('id'),width: 80,sortable: true,dataIndex: 'id'},
                {text: _('permission'),flex:1,sortable: true,dataIndex: 'perm_key'},
                {text: _('name'),width: 200,sortable: true,dataIndex: 'perm_name'},
                {text: _('type'),width: 150,sortable: true,dataIndex: 'perm_cat'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('permission'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['id',_('id')],['perm_key',_('permission')],['perm_remarks',_('remarks')],['perm_name',_('name')],['perm_cat',_('type')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_permissions.proxy.extraParams ={field_name:me.field_name, field_search:field.value};
                        me.store_permissions.loadPage(1);}}
                    }
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.store_permissions,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_roles_permissions = Ext.create('Ext.grid.Panel', {
            store: me.store_roles_permissions,
            title: _('roles_and_permissions'),
            plugins: [
                me.edditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false
                })
            ],
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'id'},
                {text: _('roles'),width: 100,sortable: true,dataIndex: 'role_key'},
                {text: _('permission'),flex: 1,sortable: true,dataIndex: 'perm_key'},
                {text: _('remarks'),width: 200,sortable: true,dataIndex: 'perm_remarks'},
                {text: _('type'),width: 150,sortable: true,dataIndex: 'perm_cat'},
                {text: _('enabled?'),width: 60,sortable: true,dataIndex: 'status',renderer: me.boolRenderer,
                    editor:{
                        xtype:'checkbox'
                    }},
                {text: _('add'),width: 60,sortable: true,dataIndex: 'i',renderer: me.boolRenderer,
                    editor:{
                        xtype:'checkbox'
                    }},
                {text: _('update'),width: 60,sortable: true,dataIndex: 'u',renderer: me.boolRenderer,
                    editor:{
                        xtype:'checkbox'
                    }},
                {text: _('delete'),width: 60,sortable: true,dataIndex: 'd',renderer: me.boolRenderer,
                    editor:{
                        xtype:'checkbox'
                    }},
                {text: _('posting'),width: 60,sortable: true,dataIndex: 'p',renderer: me.boolRenderer,
                    editor:{
                        xtype:'checkbox'
                    }},
                {text: _('view_all'),width: 60,sortable: true,dataIndex: 'v',renderer: me.boolRenderer,
                    editor:{
                        xtype:'checkbox'
                    }}
            ],
            tbar: [
                {
                    xtype:'xtroles',
                    editable: false,
                    width:150,
                    extraParams:'role',
                    listeners:{
                        change:function(){
                            me.role_key =  this.getValue();
                            me.store_roles_permissions.proxy.extraParams = { role_key:me.role_key};
                            me.store_roles_permissions.loadPage(1);
                        }
                    }
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['id',_('id')],['role_key',_('roles')],['perm_key',_('permission')],['perm_remarks',_('remarks')],['perm_cat',_('type')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_roles_permissions.proxy.extraParams ={role_key: me.role_key, field_name:me.field_name, field_search:field.value};
                        me.store_roles_permissions.loadPage(1);}}
                    }
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.store_roles_permissions,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_user_permissions = Ext.create('Ext.grid.Panel', {
            store: me.store_user_permissions,
            title: _('user'),
            plugins: [
                me.edditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false
                })
            ],
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'id'},
                {text: _('user'),width: 100,sortable: true,dataIndex: 'user_id'},
                {text: _('permission'),flex: 1,sortable: true,dataIndex: 'perm_key'},
                {text: _('remarks'),width: 200,sortable: true,dataIndex: 'perm_remarks'},
                {text: _('type'),width: 150,sortable: true,dataIndex: 'perm_cat'},
                {text: _('enabled?'),width: 60,sortable: true,dataIndex: 'status',renderer: me.boolRenderer,
                    editor:{
                        xtype:'checkbox'
                    }},
                {text: _('add'),width: 60,sortable: true,dataIndex: 'i',renderer: me.boolRenderer,
                    editor:{
                        xtype:'checkbox'
                    }},
                {text: _('update'),width: 60,sortable: true,dataIndex: 'u',renderer: me.boolRenderer,
                    editor:{
                        xtype:'checkbox'
                    }},
                {text: _('delete'),width: 60,sortable: true,dataIndex: 'd',renderer: me.boolRenderer,
                    editor:{
                        xtype:'checkbox'
                    }},
                {text: _('posting'),width: 60,sortable: true,dataIndex: 'p',renderer: me.boolRenderer,
                    editor:{
                        xtype:'checkbox'
                    }},
                {text: _('view_all'),width: 60,sortable: true,dataIndex: 'v',renderer: me.boolRenderer,
                    editor:{
                        xtype:'checkbox'
                    }}
            ],
            tbar: [
                {
                    xtype:'xtroles',
                    editable: false,
                    width:150,
                    extraParams:'user',
                    listeners:{
                        change:function(){
                            me.user_id = this.getValue();
                            me.store_user_permissions.proxy.extraParams = { user_id:me.user_id};
                            me.store_user_permissions.loadPage(1);
                        }
                    }
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['id',_('id')],['user_id',_('user')],['perm_key',_('permission')],['perm_remarks',_('remarks')],['perm_cat',_('type')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_user_permissions.proxy.extraParams = {user_id: me.user_id, field_name:me.field_name, field_search:field.value };
                        me.store_user_permissions.loadPage(1);}}
                    }
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.store_user_permissions,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });

        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.grid_roles, me.grid_types, me.grid_permissions,me.grid_roles_permissions,me.grid_user_permissions],
            listeners: {
                render: function() {
                    this.items.each(function(i, index, items){
                        i.tab.on('click', function(){
                            i.store.load();
                        });
                    });
                }
            }
        });
        me.pageBody = [ me.FormulirPanel ];
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
        var me = this;
        me.store_roles.load();
        callback(true);
    }
});
