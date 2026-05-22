
Ext.define('App.view.hris.Pph21.Ptkp', {
    extend: 'App.ux.RenderPanel',
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store_ptkp = Ext.create('App.store.hris.Pph21.Ptkp',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_rates = Ext.create('App.store.hris.Pph21.Ptkp_rates',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.grid_rates_npwp = Ext.create('Ext.grid.Panel', {
            store: me.store_rates,
            title: 'Rate NPWP',
            plugins: [
                me.formEditingNPWP = Ext.create('App.ux.grid.RowFormEditing', {
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
                                            fieldLabel: _('range'),
                                            items: [
                                                {
                                                    width: 150,
                                                    xtype: 'mitos.currency',
                                                    name: 'amount_from',
                                                    allowBlank: false,
                                                    emptyText: i18n('range_start')
                                                },
                                                {
                                                    width: 150,
                                                    xtype: 'mitos.currency',
                                                    name: 'amount_to',
                                                    allowBlank: false,
                                                    emptyText: i18n('range_end')
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
                                            fieldLabel: 'Rate %',
                                            items: [
                                                {
                                                    width: 100,
                                                    xtype: 'mitos.currency',
                                                    name: 'rates'
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
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_rates.down('toolbar');
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'seq_id'},
                {text: _('range_start'),width: 150,sortable: true,dataIndex: 'amount_from', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('range_end'),width: 150,sortable: true,dataIndex: 'amount_to', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Rate %',width: 80,sortable: true,dataIndex: 'rates', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('rates'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewRateNPWP
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['amount_from',_('range_start')],['amount_to',_('range_end')],['rates','Rate %']],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_rates.proxy.extraParams = {rates_type:'NPWP' ,field_name:me.field_name, field_search:field.value}; me.store_rates.load({params:{start:0}})}}}
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_rates,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_rates_no_npwp = Ext.create('Ext.grid.Panel', {
            store: me.store_rates,
            title: 'Rate Non NPWP',
            plugins: [
                me.formEditingNonNPWP = Ext.create('App.ux.grid.RowFormEditing', {
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
                                            fieldLabel: _('range'),
                                            items: [
                                                {
                                                    width: 150,
                                                    xtype: 'mitos.currency',
                                                    name: 'amount_from',
                                                    allowBlank: false,
                                                    emptyText: i18n('range_start')
                                                },
                                                {
                                                    width: 150,
                                                    xtype: 'mitos.currency',
                                                    name: 'amount_to',
                                                    allowBlank: false,
                                                    emptyText: i18n('range_end')
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
                                            fieldLabel: 'Rate %',
                                            items: [
                                                {
                                                    width: 100,
                                                    xtype: 'mitos.currency',
                                                    name: 'rates'
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
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_rates.down('toolbar');
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'seq_id'},
                {text: _('range_start'),width: 150,sortable: true,dataIndex: 'amount_from', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('range_end'),width: 150,sortable: true,dataIndex: 'amount_to', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Rate %',width: 80,sortable: true,dataIndex: 'rates', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('rates'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewRateNonNPWP
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['amount_from',_('range_start')],['amount_to',_('range_end')],['rates','Rate %']],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_rates.proxy.extraParams = {rates_type:'NON NPWP' ,field_name:me.field_name, field_search:field.value}; me.store_rates.load({params:{start:0}})}}}
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_rates,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_ptkp = Ext.create('Ext.grid.Panel', {
            store: me.store_ptkp,
            title: _('ptkp_rates'),
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
                                            fieldLabel: _('id'),
                                            items: [
                                                {
                                                    width: 100,
                                                    xtype: 'textfield',
                                                    name: 'ptkp_id',
                                                    allowBlank: false,
                                                    emptyText: i18n('id')
                                                },
                                                {
                                                    width: 280,
                                                    xtype: 'textfield',
                                                    name: 'ptkp_name',
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
                                            fieldLabel: _('ptkp_rates'),
                                            items: [
                                                {
                                                    width: 100,
                                                    xtype: 'mitos.currency',
                                                    name: 'wp_personal',
                                                    allowblank:false,
                                                    enableKeyEvents: true,
                                                    emptyText: i18n('personal'),
                                                    listeners:{
                                                        keyup:function(field, e){
                                                            me.get_ptkp_rates(field);
                                                        }
                                                    }
                                                },
                                                {
                                                    width: 100,
                                                    xtype: 'mitos.currency',
                                                    name: 'wp_additional',
                                                    enableKeyEvents: true,
                                                    emptyText: i18n('additional'),
                                                    listeners:{
                                                        keyup:function(field, e){
                                                            me.get_ptkp_rates(field);
                                                        }
                                                    }
                                                },
                                                {
                                                    width: 130,
                                                    xtype: 'mitos.currency',
                                                    name: 'wp_total',
                                                    readOnly:true,
                                                    fieldStyle:'background-color: #F2F3F4; background-image: none; text-align:right;'
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
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_ptkp.down('toolbar');
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'ptkp_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'ptkp_name'},
                {text: _('personal'),width: 100,sortable: true,dataIndex: 'wp_personal', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('additional'),width: 100,sortable: true,dataIndex: 'wp_additional', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'wp_total', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('ptkp_rates'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewRateNPWP
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['ptkp_id',_('id')],['ptkp_name',_('name')],['wp_total',_('total')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_ptkp.proxy.extraParams = {field_name:me.field_name, field_search:field.value}; me.store_ptkp.load({params:{start:0}})}}}
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_ptkp,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.grid_ptkp, me.grid_rates_npwp, me.grid_rates_no_npwp ],
            listeners: {
                render: function() {
                    this.items.each(function(i, index, items){
                        i.tab.on('click', function(){
                            if(index==1){
                                i.store.proxy.extraParams ={rates_type:'NPWP'};
                            }else if(index==2){
                                i.store.proxy.extraParams ={rates_type:'NON NPWP'};
                            }
                            i.store.load()
                        });
                    });
                }
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
    onNewRateNPWP: function(btn){
        var me = this;
        me.formEditingNPWP.cancelEdit();
        me.store_rates.insert(0, {aktif: 1,authorized: 1});
        me.formEditingNPWP.startEdit(0, 0);
        me.formEditingNPWP.context.record.data.rates_type = 'NPWP';
    },
    onNewRateNonNPWP: function(btn){
        var me = this;
        me.formEditingNonNPWP.cancelEdit();
        me.store_rates.insert(0, {aktif: 1,authorized: 1});
        me.formEditingNonNPWP.startEdit(0, 0);
        me.formEditingNonNPWP.context.record.data.rates_type = 'NON NPWP';
    },
    get_ptkp_rates:function(field){
        var me=this, form  = field.up('container'), fieldset = form.up('fieldset'),
            wp_personal = fieldset.ownerCt.form.findField('wp_personal'),
            wp_additional = fieldset.ownerCt.form.findField('wp_additional'),
            wp_total = fieldset.ownerCt.form.findField('wp_total');
        wp_total.setValue(wp_personal.getValue() + wp_additional.getValue() );
    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.store_ptkp.proxy.extraParams={};
        this.store_ptkp.load();
        callback(true);
    }
});
