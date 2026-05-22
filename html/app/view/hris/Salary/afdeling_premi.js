
Ext.define('App.view.hris.Salary.afdeling_premi', {
    extend: 'App.ux.RenderPanel',
    pageTitle: 'Premi Afdeling',
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.model =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'co_id', type:'string'},
                {name:'afdeling_id', type:'string'},
                {name:'afdeling_name', type:'string'},
                {name:'afdeling_group', type:'string'},
                {name:'growing_year', type:'integer'},
                {name:'area', type:'string'},
                {name:'remarks', type:'string'},
                {name:'ol_id', type:'string'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read: Afdeling_premi.afdeling_group
                },
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                }
            }
        });
        me.model_detail =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'co_id', type:'string'},
                {name:'seq_id', type:'integer'},
                {name:'afdeling_id', type:'string'},
                {name:'afdeling_group', type:'string'},
                {name:'sc_id', type:'string'},
                {name:'sc_name', type:'string'},
                {name:'basis1', type:'integer'},
                {name:'rate', type:'float'},
                {name:'lebih_basis1', type:'float'},
                {name:'from_day', type:'integer'},
                {name:'to_day', type:'integer'},
                {name:'basis2', type:'integer'},
                {name:'lebih_basis2', type:'float'},
                {name:'active', type:'bool'},
                {name:'remarks', type:'string'},
                {name:'userinput', type:'string'},
                {name:'useredit', type:'string'},
                {name:'timeedit', type:'date'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read: Afdeling_premi.select,
                    create: Afdeling_premi.add,
                    update: Afdeling_premi.update,
                    destroy: Afdeling_premi.delete
                },
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                }
            }
        });
        me.store = Ext.create('Ext.data.Store',{model: me.model ,remoteSort: true, autoLoad: true});
        me.store_detail = Ext.create('Ext.data.Store',{model: me.model_detail ,remoteSort: true, autoLoad: true});
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
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
                                            flex:1,
                                            layout:'anchor',
                                            items: [
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'left'
                                                    },
                                                    fieldLabel: 'Rate Premi',
                                                    items: [
                                                        {
                                                            width: 250,
                                                            xtype: 'mitos.currency',
                                                            name: 'rate',
                                                            allowBlank: false,
                                                            emptyText: i18n('Rate')
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'left'
                                                    },
                                                    fieldLabel: 'Basis 1',
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'textfield',
                                                            name: 'basis1',
                                                            allowBlank: false,
                                                            emptyText: i18n('Basis')
                                                        },
                                                        {
                                                            fieldLabel: 'Lebih Basis 1',
                                                            width: 200,
                                                            xtype: 'mitos.currency',
                                                            name: 'lebih_basis1',
                                                            //allowBlank: false,
                                                            emptyText: i18n('Rate')
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'left'
                                                    },
                                                    fieldLabel: 'Basis 2',
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'textfield',
                                                            name: 'basis2',
                                                            allowBlank: false,
                                                            emptyText: i18n('Basis')
                                                        },
                                                        {
                                                            fieldLabel: 'Lebih Basis 2',
                                                            width: 200,
                                                            xtype: 'mitos.currency',
                                                            name: 'lebih_basis2',
                                                            //allowBlank: false,
                                                            emptyText: i18n('Rate')
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'left'
                                                    },
                                                    fieldLabel: _('day'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'textfield',
                                                            name: 'from_day',
                                                            //allowBlank: false,
                                                            emptyText: i18n('From')
                                                        },
                                                        {
                                                            width: 100,
                                                            xtype: 'textfield',
                                                            name: 'to_day',
                                                            //allowBlank: false,
                                                            emptyText: i18n('To')
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'left'
                                                    },
                                                    fieldLabel: 'Premi',
                                                    items: [
                                                        {
                                                            width: 200,
                                                            xtype: 'xtaward_attendance',
                                                            name: 'sc_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('premi')
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
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex:1,
                                            layout:'anchor',
                                            items: [
                                                ,
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
                        }

                    ]
                })
            ],
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_detail.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'sc_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: 'Basis1',width: 100,sortable: true,dataIndex: 'basis1', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Basis2',width: 100,sortable: true,dataIndex: 'basis2', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Rate',width: 100,sortable: true,dataIndex: 'rate', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
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
                    store: [['basis1',_('basis')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_detail.proxy.extraParams = {afdeling_group:me.data.afdeling_group, field_name:me.field_name, field_search:field.value};
                        me.store_detail.loadPage(1);}}
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
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    me.data = record.data;
                    me.GridShow= Ext.create('App.ux.window.Window',{
                        layout: 'fit',
                        title: me.data.afdeling_name,
                        width: 1100,
                        height: 400,
                        items:[me.grid_detail],
                        modal:true
                    });
                    me.GridShow.show();
                    me.store_detail.proxy.extraParams = {afdeling_id:me.data.afdeling_id};
                    me.store_detail.load();
                }
            },
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'afdeling_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'afdeling_name'},
                {text: 'group',flex: 1,sortable: true,dataIndex: 'afdeling_group'},
                {text: 'Kebun',width: 80,sortable: true,dataIndex: 'ol_id'},
                {text: _('growing_year'),width: 80,sortable: true,dataIndex: 'growing_year', align:'right'},
                {text: _('area'),width: 100,sortable: true,dataIndex: 'area', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['afdeling_id',_('id')],['afdeling_name',_('name')]],
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
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        plugin.context.record.data.afdeling_id = me.data.afdeling_id;
    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.store.load();
        callback(true);
    }
});
