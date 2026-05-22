
Ext.define('App.view.hris.Pph21.Salary_component', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('salary_component'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.Pph21.Salary_component',{remoteSort: false, pageSize : 20});
        me.grid_in = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title: _('in'),
            plugins: [
                me.formEditing_in = Ext.create('App.ux.grid.RowFormEditing', {
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
                                            fieldLabel: _('id'),
                                            items: [
                                                {
                                                    width: 100,
                                                    xtype: 'textfield',
                                                    name: 'sc_id',
                                                    allowBlank: false,
                                                    emptyText: i18n('id')
                                                },
                                                {
                                                    width: 280,
                                                    xtype: 'textfield',
                                                    name: 'sc_name',
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
                                            fieldLabel: _('sorting'),
                                            items: [
                                                {
                                                    width: 80,
                                                    xtype: 'numberfield',
                                                    name: 'id_sort',
                                                    allowBlank: false
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'radiogroup',
                                            fieldLabel: _('type'),
                                            width:200, hidden: true,
                                            defaults: {xtype: 'radio',name: 'sc_type'},
                                            items: [
                                                {
                                                    boxLabel: _('in'),
                                                    inputValue: 'I',
                                                    checked: true
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
                                                },
                                                {
                                                    width: 150,
                                                    xtype: 'checkbox',
                                                    fieldLabel: 'take home pay',
                                                    name: 'take_home_pay'
                                                },
                                                {
                                                    width: 150,
                                                    xtype: 'checkbox',
                                                    fieldLabel: _('bpjs_calculation'),
                                                    name: 'inc_bpjs_calculation'
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
                                            fieldLabel: _('show_pph21'),
                                            items: [
                                                {
                                                    width: 50,
                                                    xtype: 'checkbox',
                                                    name: 'pph21_form'
                                                },
                                                {
                                                    width: 100,
                                                    //fieldLabel: _('join_to'),
                                                    xtype: 'xtsalary_component',
                                                    name: 'pph21_form_join_to',
                                                    extraParams:['I'],
                                                    emptyText: i18n('join_to')
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
                                            fieldLabel: _('summary_group_report'),
                                            items: [
                                                {
                                                    width: 280,
                                                    xtype: 'textfield',
                                                    name: 'summary_group'
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
                    var useredit = me.grid_in.down('toolbar');
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('id'),width: 60,sortable: true,dataIndex: 'id_sort'},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'sc_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'sc_name'},
                {text: 'take home pay',width: 80,sortable: true,dataIndex: 'take_home_pay',renderer: me.boolRenderer},
                {text: _('show_pph21'),width: 70,sortable: true,dataIndex: 'pph21_form',renderer: me.boolRenderer},
                {text: _('bpjs_calculation'),width: 80,sortable: true,dataIndex: 'inc_bpjs_calculation',renderer: me.boolRenderer},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('salary'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['sc_id',_('id')],['sc_name',_('name')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store.proxy.extraParams = {sc_type:'I', field_name:me.field_name, field_search:field.value}; me.store.load({params:{start:0}})}}}
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
        me.grid_out = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title: _('out'),
            plugins: [
                me.formEditing_out = Ext.create('App.ux.grid.RowFormEditing', {
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
                                            fieldLabel: _('id'),
                                            items: [
                                                {
                                                    width: 100,
                                                    xtype: 'textfield',
                                                    name: 'sc_id',
                                                    allowBlank: false,
                                                    emptyText: i18n('id')
                                                },
                                                {
                                                    width: 280,
                                                    xtype: 'textfield',
                                                    name: 'sc_name',
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
                                            fieldLabel: _('sorting'),
                                            items: [
                                                {
                                                    width: 80,
                                                    xtype: 'numberfield',
                                                    name: 'id_sort',
                                                    allowBlank: false
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'radiogroup',
                                            fieldLabel: _('type'),
                                            width:200, hidden: true,
                                            defaults: {xtype: 'radio',name: 'sc_type'},
                                            items: [
                                                {
                                                    boxLabel: _('out'),
                                                    inputValue: 'O',
                                                    checked: true
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
                                                    fieldLabel: 'Rate(%)',
                                                    xtype: 'mitos.currency',
                                                    enableKeyEvents: true,
                                                    name: 'rate',
                                                    emptyText: i18n('rate'),
                                                    listeners:{
                                                        keyup:function(field, e){
                                                           var container = field.up('container'),
                                                               rate_nominal = container.items.items[1],
                                                               rate_sc_id = container.items.items[2];
                                                            rate_nominal.setValue(0); rate_sc_id.setDisabled(false);
                                                        }
                                                    }
                                                },
                                                {
                                                    width: 200,
                                                    fieldLabel: 'Rate(Rp.)',
                                                    xtype: 'mitos.currency',
                                                    enableKeyEvents: true,
                                                    name: 'rate_nominal',
                                                    emptyText: i18n('value'),
                                                    listeners:{
                                                        keyup:function(field, e){
                                                            var container = field.up('container'),
                                                                rate_prs = container.items.items[0],
                                                                rate_sc_id = container.items.items[2];
                                                            rate_prs.setValue(0); rate_sc_id.setValue(null);
                                                            rate_sc_id.setDisabled(true);
                                                        }
                                                    }
                                                },
                                                {
                                                    width: 200,
                                                    fieldLabel: 'Rate(From)',
                                                    xtype: 'xtsalary_component',
                                                    name: 'rate_sc_id',
                                                    editable: false,
                                                    extraParams:['I'],
                                                    listeners:{
                                                        keyup:function(field, e){
                                                            var container = field.up('container'),
                                                                rate_nominal = container.items.items[1];
                                                            rate_nominal.setValue(0);
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
                                            items: [
                                                {
                                                    width: 125,
                                                    xtype: 'checkbox',
                                                    fieldLabel: _('active'),
                                                    name: 'active'
                                                },
                                                {
                                                    width: 150,
                                                    xtype: 'checkbox',
                                                    fieldLabel: 'take home pay',
                                                    name: 'take_home_pay'
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
                                            fieldLabel: _('show_pph21'),
                                            items: [
                                                {
                                                    width: 50,
                                                    xtype: 'checkbox',
                                                    name: 'pph21_form'
                                                },
                                                {
                                                    width: 100,
                                                    //fieldLabel: _('join_to'),
                                                    xtype: 'xtsalary_component',
                                                    name: 'pph21_form_join_to',
                                                    editable: false,
                                                    extraParams:['I'],
                                                    emptyText: i18n('join_to')
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
                                            fieldLabel: _('summary_group_report'),
                                            items: [
                                                {
                                                    width: 280,
                                                    xtype: 'textfield',
                                                    name: 'summary_group'
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
                    var useredit = me.grid_out.down('toolbar');
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('id'),width: 60,sortable: true,dataIndex: 'id_sort'},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'sc_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'sc_name'},
                {text: 'take home pay',width: 80,sortable: true,dataIndex: 'take_home_pay',renderer: me.boolRenderer},
                {text: _('show_pph21'),width: 70,sortable: true,dataIndex: 'pph21_form',renderer: me.boolRenderer},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('salary'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['sc_id',_('id')],['sc_name',_('name')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store.proxy.extraParams = { sc_type:'O', field_name:me.field_name, field_search:field.value}; me.store.load({params:{start:0}})}}}
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
            items:[ me.grid_in,me.grid_out],
            listeners: {
                render: function() {
                    this.items.each(function(i, index, items){
                        i.tab.on('click', function(){
                            if(index==0){
                                i.store.proxy.extraParams = {sc_type:'I'};
                            }else if(index==1){
                                i.store.proxy.extraParams = {sc_type:'O'};
                            }
                            i.store.load()
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
        this.store.proxy.extraParams={sc_type:'I'};
        this.store.load();
        this.FormulirPanel.setActiveTab(0);
        callback(true);
    }
});
