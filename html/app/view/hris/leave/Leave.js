
Ext.define('App.view.hris.leave.Leave', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('leave'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.leave.Leave',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_detail = Ext.create('App.store.hris.leave.Leave_detail',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_list = Ext.create('App.store.hris.leave.Leave_list',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_list_approval = Ext.create('App.store.hris.leave.Leave_list_approval',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.grid_list_approval = Ext.create('Ext.grid.Panel', {
            store: me.store_list_approval,
            title :_('approval'),
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('approval_status') == '1' ? 'child-row' : (record.get('approval_status') == '2' ? 'adult-row':'');
                }
            },
            columns: [
                {text: _('date')+' '+_('approval'),width: 80,sortable: true,dataIndex: 'approval_date',renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('supervisor'),width: 150,sortable: true,dataIndex: 'emp_spv_name'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('approval'),width: 60,sortable: true, dataIndex: 'approval_status', renderer: function (value, meta, record, rowIndex, colIndex, store) {
                    return record.data.approval_status == '1' ? _('yes') : (record.data.approval_status == '2' ? _('no'):_('pending'));
                }}
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_list_approval,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_list = Ext.create('Ext.grid.Panel', {
            store: me.store_list,
            title :_('list'),
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            /*listeners: {
                itemclick: function(dv, record, item, index, e) {
                    me.store_list_approval.proxy.extraParams ={ seq_id:record.data.seq_id, user_id:me.user_id, emp_id:me.emp_id, lt_id:me.lt_id, ol_id:me.ol_id, leave_date:record.data.leave_date};
                    me.store_list_approval.load();
                    me.GridShowListApproval= Ext.create('App.ux.window.Window',{
                        layout: 'fit',
                        width: 700,
                        height: 250,
                        items:[me.grid_list_approval],
                        modal:true
                    });
                    me.GridShowListApproval.show();
                }
            },*/
            columns: [
                {text: _('date'),width: 100,sortable: true,dataIndex: 'leave_date',renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('type'),width: 100,sortable: true,dataIndex: 'lt_id'},
                {text: _('office_location'),width: 100,sortable: true,dataIndex: 'ol_id'},
                {text: _('approval'),width: 80,sortable: true,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                        return record.data.status=='2' ? _('no') : (record.data.status=='1'? _('yes'):_('pending'));
                    }},
                {text: _('remarks'),flex:1,sortable: true,dataIndex: 'remarks'}
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_list,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_detail.down('toolbar');
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                    me.seq_id = record.data.seq_id;
                    me.store_list.load({params:{emp_id:me.emp_id, user_id:me.user_id, lt_id:me.lt_id, ol_id:me.ol_id, seq_id:me.seq_id}});
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
                                    title: _('leave'),
                                    layout:'hbox',
                                    flex:1,
                                    items:[
                                        {
                                            xtype: 'fieldset',
                                            defaultType: 'textfield',
                                            layout: 'hbox',
                                            flex: 1,
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: 'anchor',
                                                    items: [
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
                                                                    emptyText: i18n('date_from'),
                                                                    listeners: {
                                                                        change: function (field, e) {
                                                                            me.get_entitlement(field);
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    width: 200,
                                                                    xtype: 'datefield',
                                                                    editable: false,
                                                                    fieldLabel: _('date_to'),
                                                                    name: 'todate',
                                                                    format: 'Y-m-d',
                                                                    value: new Date(),
                                                                    emptyText: i18n('date_to'),
                                                                    listeners: {
                                                                        change: function (field, e) {
                                                                            me.get_entitlement(field);
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    width: 200,
                                                                    xtype: 'numberfield',
                                                                    fieldLabel: _('entitlement'),
                                                                    name: 'entitlement',
                                                                    readOnly: true,
                                                                    allowBlank: false,
                                                                    maxValue: me.max_value,
                                                                    emptyText: i18n('entitlement')
                                                                },
                                                                {
                                                                    width: 125,
                                                                    fieldLabel: _('status'),
                                                                    xtype: 'checkbox',
                                                                    name: 'status'
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
                                },me.grid_list
                            ],
                            listeners: {
                                render: function() {
                                    this.items.each(function(i){
                                        i.tab.on('click', function(){
                                            i.store.proxy.extraParams ={emp_id:me.emp_id, user_id:me.user_id, lt_id:me.lt_id, ol_id:me.ol_id, seq_id:me.seq_id};
                                            i.store.load()
                                        });
                                    });
                                }
                            }
                        }
                    ]
                })
            ],
            columns: [
                {text: _('type'),width: 100,sortable: true,dataIndex: 'lt_id'},
                {text: _('office_location'),width: 100,sortable: true,dataIndex: 'ol_id'},
                {text: _('date_from'),width: 80,sortable: true,dataIndex: 'fromdate', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('date_to'),width: 80,sortable: true,dataIndex: 'todate', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('entitlement'),flex:1,sortable: true,dataIndex: 'entitlement' ,align:'right', renderer: Ext.util.Format.numberRenderer('0,000')},
                {text: _('pending'),flex:1,sortable: true,dataIndex: 'entitlement_pending' ,align:'right', renderer: Ext.util.Format.numberRenderer('0,000')},
                {text: _('cancel'),flex:1,sortable: true,dataIndex: 'entitlement_cancel' ,align:'right', renderer: Ext.util.Format.numberRenderer('0,000')},
                {text: _('take'),flex:1,sortable: true,dataIndex: 'entitlement_take' ,align:'right', renderer: Ext.util.Format.numberRenderer('0,000')},
                {text: _('status'),width: 80,sortable: true,dataIndex: 'status',renderer: me.boolRenderer}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('leave'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['lt_id',_('type')],['ol_id',_('office_location')],['entitlement',_('entitlement')],['status',_('status')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_detail.proxy.extraParams = {field_name:me.field_name, field_search:field.value};
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
                    me.user_id = record.data.user_id; me.emp_id = record.data.emp_id; me.lt_id = record.data.lt_id; me.ol_id= record.data.ol_id; me.max_value = record.data.outstanding_entitlement;
                    me.store_detail.proxy.extraParams ={emp_id:me.emp_id, lt_id:me.lt_id, ol_id:me.ol_id};
                    me.store_detail.load();
                    me.GridShow= Ext.create('App.ux.window.Window',{
                        layout: 'fit',
                        width: 1100,
                        height: 400,
                        items:[me.grid_detail],
                        modal:true
                    });
                    me.GridShow.show();
                }
            },
            columns: [
                {text: _('type'),width: 100,sortable: true,dataIndex: 'lt_name'},
                {text: _('office_location'),width: 100,sortable: true,dataIndex: 'ol_name'},
                {text: _('date_from'),width: 80,sortable: true,dataIndex: 'fromdate', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('date_to'),width: 80,sortable: true,dataIndex: 'todate', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('entitlement'),flex:1,sortable: true,dataIndex: 'entitlement' ,align:'right', renderer: Ext.util.Format.numberRenderer('0,000')},
                {text: _('pending'),flex:1,sortable: true,dataIndex: 'entitlement_pending' ,align:'right', renderer: Ext.util.Format.numberRenderer('0,000')},
                {text: _('cancel'),flex:1,sortable: true,dataIndex: 'entitlement_cancel' ,align:'right', renderer: Ext.util.Format.numberRenderer('0,000')},
                {text: _('take'),flex:1,sortable: true,dataIndex: 'entitlement_take' ,align:'right', renderer: Ext.util.Format.numberRenderer('0,000')},
                {text: _('outstanding'),flex:1,sortable: true,dataIndex: 'outstanding_entitlement',align:'right', renderer: Ext.util.Format.numberRenderer('0,000')}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['lt_name',_('type')],['ol_name',_('office_location')],['entitlement',_('entitlement')],['entitlement_take',_('take')],['outstanding_entitlement',_('outstanding')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store.proxy.extraParams = {field_name:me.field_name, field_search:field.value}; me.store.load({params:{start:0}})}}}
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
        plugin.context.record.data.lt_id = me.lt_id;
        plugin.context.record.data.ol_id = me.ol_id;
        plugin.context.record.data.emp_id = me.emp_id;
        plugin.context.record.data.user_id = me.user_id;
    },
    get_entitlement:function(field){
        var me=this, container  = field.up('fieldset'), //fieldset
            textfield = container.items.items[0].items;
            fromdate = textfield.items[0].items.items[0], // fromdate
            todate = textfield.items[0].items.items[1],// todate
            entitlement = textfield.items[0].items.items[2]; // entitlement
        var _MS_PER_DAY = 1000 * 60 * 60 * 24;
        entitlement.setMaxValue(me.max_value); entitlement.setMinValue(1);
        entitlement.setValue((todate.getValue() - fromdate.getValue()) / _MS_PER_DAY + 1 );

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
