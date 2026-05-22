
Ext.define('App.view.hris.Attendance.Award_attendance', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('award_attendance'),
    initComponent: function(){
        var me = this;

        // ***************a**********************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.Attendance.Award_attendance',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_detail = Ext.create('App.store.hris.Attendance.Award_attendance_detail',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            title :_('rate'),
            height:1000,
            viewConfig :
                {
                    stripeRows: false,
                    getRowClass: function(record, index) {
                        return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                    }
                },
            plugins: [
                me.formEditingDetail = Ext.create('App.ux.grid.RowFormEditing', {
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
                                            fieldLabel: _('not_present'),
                                            items: [
                                                {
                                                    width: 100,
                                                    xtype: 'numberfield',
                                                    name: 'from_rate',
                                                    emptyText: i18n('from')
                                                },
                                                {
                                                    width: 100,
                                                    xtype: 'numberfield',
                                                    name: 'to_rate',
                                                    emptyText: i18n('to')
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
                                                    width: 100,
                                                    xtype: 'mitos.currency',
                                                    name: 'amount',
                                                    emptyText: i18n('amount')
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
                {text: _('id'),width: 100,sortable: true,dataIndex: 'seq_id'},
                {text: _('from'),width: 80,sortable: true,dataIndex: 'from_rate'/*, renderer:Ext.util.Format.dateRenderer('d/m/Y H:i')*/},
                {text: _('to'),width: 80,sortable: true,dataIndex: 'to_rate'/*, renderer:Ext.util.Format.dateRenderer('d/m/Y H:i')*/},
                {text: _('amount'),flex:1,sortable: true,dataIndex: 'amount', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex:1,sortable: true,dataIndex: 'remarks'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('rate'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewDetail
                }
            ]
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('active') == '1' ? 'child-row' : (record.get('active') == '2' ? 'adult-row':'');
                }
            },
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar'); me.data = record.data;
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                    me.store_detail.proxy.extraParams = {ol_id:record.data.ol_id, sc_id:record.data.sc_id};
                    me.store_detail.load();
                }
            },
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    autoCancel:true,
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
                                            fieldLabel: _('office_location'),
                                            items: [
                                                {
                                                    width: 150,
                                                    xtype: 'xtol_type',
                                                    name: 'ol_id',
                                                    allowBlank:false,
                                                    emptyText: i18n('office_location')
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
                                            fieldLabel: _('salary_component'),
                                            items: [
                                                {
                                                    width: 100,
                                                    xtype : 'xtsalary_component',
                                                    editable: false,
                                                    name: 'sc_id',
                                                    emptyText: i18n('id'),
                                                    extraParams:['I']
                                                },
                                                {
                                                    width: 280,
                                                    xtype : 'textfield',
                                                    name: 'sc_name',
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
                                                    fieldLabel: _('amount'),
                                                    width: 200,
                                                    xtype: 'mitos.currency',
                                                    name: 'price',
                                                    emptyText: i18n('amount')
                                                },
                                                {
                                                    fieldLabel: _('unit'),
                                                    width: 200,
                                                    xtype: 'unitcombo',
                                                    name: 'unit_id',
                                                    allowBlank: false,
                                                    emptyText: i18n('unit')
                                                },
                                                {
                                                    width: 200,
                                                    xtype: 'checkbox',
                                                    fieldLabel: _('inc_attendance'),
                                                    name: 'inc_attendance'
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
                {text: _('office_location'),width: 100,sortable: true,dataIndex: 'ol_name'},
                {text: _('id'),width: 100,sortable: true,dataIndex: 'sc_id'},
                {text: _('name'),flex:1,sortable: true,dataIndex: 'sc_name'},
                {text: _('amount'),flex:1,sortable: true,dataIndex: 'price', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('unit'),width:60,sortable: true,dataIndex: 'unit_name'},
                {text: _('remarks'),flex:1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('award_attendance'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['ol_name',_('office_location')],['sc_id',_('id')],['sc_name',_('name')],['remarks',_('remarks')]],
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
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
    },
    onNewDetail: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        plugin.context.record.data.ol_id = me.data.ol_id;
        plugin.context.record.data.sc_id = me.data.sc_id;
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
