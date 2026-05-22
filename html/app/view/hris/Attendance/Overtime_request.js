
Ext.define('App.view.hris.Attendance.Overtime_request', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('overtime_request'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.Attendance.Overtime_request',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_detail = Ext.create('App.store.hris.Attendance.Overtime_request_detail',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            height: 1000,
            autoScroll: false,
            title :_('detail'),
            plugins: [
                me.formEditing_detail = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    autoCancel:true,
                    items: [
                        {
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
                                                    fieldLabel: _('job_description'),
                                                    items: [
                                                        {
                                                            width: 380,
                                                            xtype : 'textfield',
                                                            editable: false,
                                                            name: 'job_desc',
                                                            emptyText: i18n('job_description')
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
                                                    fieldLabel: _('report_info'),
                                                    items: [
                                                        {
                                                            width: 380,
                                                            xtype : 'textfield',
                                                            editable: false,
                                                            name: 'output_desc',
                                                            emptyText: i18n('report_info')
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
                        }
                    ]
                })
            ],
            columns: [
                {text: _('id'),width: 60,sortable: true,dataIndex: 'seq_id_detail'},
                {text: _('job_description'),flex:1,sortable: true,dataIndex: 'job_desc'},
                {text: _('time_from'),width: 80,sortable: true,dataIndex: 'time_in'},
                {text: _('time_to'),width: 80,sortable: true,dataIndex: 'time_out'},
                {text: _('report_info'),width: 150,sortable: true,dataIndex: 'output_desc'},
                {text: _('remarks'),flex:1,sortable: true,dataIndex: 'remarks'}
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
                    store: [['job_desc',_('job_description')],['time_in',_('time_from')],['time_out',_('time_to')],['output',_('report_info')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_detail.proxy.extraParams = {emp_id: me.emp_id, seq_id:me.seq_id, field_name:me.field_name, field_search:field.value}; me.store_detail.load({params:{start:0}})}}}
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
                    me.emp_id = record.data.emp_id; me.seq_id= record.data.seq_id;
                    me.store_detail.proxy.extraParams ={emp_id:me.emp_id, seq_id:me.seq_id};
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
                                    title: _('overtime'),
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
                                                            fieldLabel: _('employee'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype : 'xtemployee',
                                                                    editable: false,
                                                                    name: 'emp_id',
                                                                    emptyText: i18n('id')
                                                                },
                                                                {
                                                                    width: 280,
                                                                    xtype : 'textfield',
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
                                                            fieldLabel: _('date'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'datefield',
                                                                    editable: false,
                                                                    name: 'overtime_date',
                                                                    format: 'Y-m-d',
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
                                },me.grid_detail
                            ]
                        }
                    ]
                })
            ],
            columns: [
                {text: _('no'),width: 60,sortable: true,dataIndex: 'seq_id'},
                {text: _('id'),width: 100,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex:1,sortable: true,dataIndex: 'emp_name'},
                {text: _('date'),width: 80,sortable: true,dataIndex: 'overtime_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('remarks'),flex:1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('overtime_request'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['emp_id',_('id')],['emp_name',_('name')],['overtime_date',_('date')],['remarks',_('remarks')]],
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
        plugin.context.record.data.emp_id = me.emp_id;
        plugin.context.record.data.seq_id = me.seq_id;
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
