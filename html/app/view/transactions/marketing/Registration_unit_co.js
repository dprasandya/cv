
Ext.define('App.view.transactions.marketing.Registration_unit_co', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('registration_unit_co'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.marketing.Registration_unit_co',{remoteSort: true,  pageSize : 20,  autoLoad: false});
        me.store_detail = Ext.create('App.store.transactions.marketing.Registration_unit_co_detail',{remoteSort: true,  pageSize : 20,  autoLoad: false});
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            title: _('generate_room_rate'),
            height: 1000,
            autoScroll:false,
            viewConfig :
                {
                    stripeRows: false,
                    getRowClass: function(record, index) {
                        return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                    }
                },
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y'),summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('quantity'),width: 80,sortable: true,dataIndex: 'qty', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'DPP',width: 100,sortable: true,dataIndex: 'dpp', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'PPN',width: 100,sortable: true,dataIndex: 'ppn', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'PPH',width: 100,sortable: true,dataIndex: 'pph', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('service_charge'),width: 100,sortable: true,dataIndex: 'service_charge', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'total', align:'right', summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('outstanding'),width: 100,sortable: true,dataIndex: 'outstanding_receivable', align:'right', summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'}
            ],
            features: [{
                ftype: 'summary'
            }],

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
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar'), plugin = me.grid.editingPlugin;
                    useredit.items.items[3].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.store_detail.proxy.extraParams = {registration_id:record.data.registration_id, doc_id:record.data.doc_id, cust_id:record.data.cust_id, unit_building_id:record.data.unit_building_id};
                    me.store_detail.load();
                    var outstanding =0;
                    me.store_detail.each(function (rec) { outstanding += rec.get('outstanding_receivable'); });
                    //var outstanding = me.store_detail.sum('outstanding_receivable');
                   // console.log(outstanding);
                    if(record.data.payment_value==''||record.data.payment_value==null||record.data.payment_value==0){
                        plugin.editor.form.findField('payment_value').setValue(outstanding);
                    }
                    if(record.data.category=='Company Account'){
                        plugin.editor.form.findField('cash_id').setDisabled(true);
                        plugin.editor.form.findField('cflow_id').setDisabled(true);
                        plugin.editor.form.findField('refund_cflow_id').setDisabled(true);
                        plugin.editor.form.findField('payment_value').setDisabled(true);
                    } else if(record.data.category=='Compliment' && record.data.outstanding_receivable > 0){
                        plugin.editor.form.findField('cash_id').setDisabled(false);
                        plugin.editor.form.findField('cflow_id').setDisabled(false);
                        plugin.editor.form.findField('refund_cflow_id').setDisabled(true);
                        plugin.editor.form.findField('payment_value').setDisabled(false);
                    } else if(record.data.category=='Compliment' && record.data.outstanding_receivable <= 0){
                        plugin.editor.form.findField('cash_id').setDisabled(true);
                        plugin.editor.form.findField('cflow_id').setDisabled(true);
                        plugin.editor.form.findField('refund_cflow_id').setDisabled(true);
                        plugin.editor.form.findField('payment_value').setDisabled(true);
                    }
                    else if(record.data.outstanding_receivable < 0){
                        plugin.editor.form.findField('cash_id').setDisabled(false);
                        plugin.editor.form.findField('cflow_id').setDisabled(true);
                        plugin.editor.form.findField('refund_cflow_id').setDisabled(false);
                        plugin.editor.form.findField('payment_value').setDisabled(true);
                    }else{
                        plugin.editor.form.findField('cash_id').setDisabled(false);
                        plugin.editor.form.findField('cflow_id').setDisabled(false);
                        plugin.editor.form.findField('refund_cflow_id').setDisabled(true);
                        plugin.editor.form.findField('payment_value').setDisabled(false);
                    }
                }
            },
            plugins:[
                me.formEditingCo = Ext.create('App.ux.grid.RowFormEditing', {
                    enableRemove : false,
                    clicksToEdit:1,
                    items: [
                        {
                            xtype: 'tabpanel',
                            items: [
                                {
                                    xtype: 'panel',
                                    title: _('registration_unit_co'),
                                    items:[
                                        {
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'fieldset',
                                                    defaultType: 'textfield',
                                                    layout: 'hbox',
                                                    flex:1,
                                                    items:[
                                                        {
                                                            xtype: 'container',
                                                            layout:'anchor',
                                                            flex:1,
                                                            items: [
                                                                {
                                                                    xtype: 'fieldcontainer',
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    fieldDefaults: {
                                                                        labelAlign: 'right'
                                                                    },
                                                                    fieldLabel: _('unit_building'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'xtunitbuildingci',
                                                                            editable: false,
                                                                            readOnly:true,
                                                                            name: 'unit_building_id',
                                                                            emptyText: i18n('id'),
                                                                            extraParams:['VR']
                                                                        },
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            readOnly: true,
                                                                            name: 'unit_building_name',
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
                                                                            width:200,
                                                                            fieldLabel: _('project'),
                                                                            xtype:'projectcombo',
                                                                            name: 'project_id',
                                                                            readOnly: true,
                                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                                        },
                                                                        {
                                                                            width:200,
                                                                            fieldLabel: _('floor'),
                                                                            xtype:'xtfloor',
                                                                            name: 'floor_id',
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
                                                                            fieldLabel: _('facing'),
                                                                            xtype: 'xtfacingcombo',
                                                                            readOnly: true,
                                                                            name: 'facing_id',
                                                                            emptyText: i18n('facing'),
                                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                                        },
                                                                        {
                                                                            width: 200,
                                                                            fieldLabel: _('area'),
                                                                            xtype: 'mitos.currency',
                                                                            readOnly: true,
                                                                            name: 'area_m2',
                                                                            emptyText: i18n('area'),
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
                                                                    fieldLabel: _('building_type'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'xtbuildingtype',
                                                                            readOnly: true,
                                                                            name: 'building_id',
                                                                            emptyText: i18n('id'),
                                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                                        },
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            readOnly: true,
                                                                            name: 'building_name',
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
                                                                    fieldLabel: _('cluster'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'xtcluster',
                                                                            readOnly: true,
                                                                            name: 'cluster_id',
                                                                            emptyText: i18n('id'),
                                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                                        },
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            readOnly: true,
                                                                            name: 'cluster_name',
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
                                                                            width: 200,
                                                                            fieldLabel: _('room_status'),
                                                                            xtype: 'xtroomstatuscombo',
                                                                            name: 'rs_id',
                                                                            readOnly:true,
                                                                            emptyText: i18n('room_status'),
                                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                                        },
                                                                        {
                                                                            width: 125,
                                                                            xtype: 'checkbox',
                                                                            fieldLabel: _('active'),
                                                                            name: 'status',
                                                                            listeners:{
                                                                                change:function(f){
                                                                                    var cont = f.up('container'),
                                                                                        posted_date = cont.items.items[2];
                                                                                    if(f.value==1){
                                                                                        posted_date.setDisabled(false);
                                                                                        posted_date.setValue(new Date());
                                                                                    }else{
                                                                                        posted_date.setDisabled(true);
                                                                                    }
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 100,
                                                                            xtype : 'datefield',
                                                                            editable: false,
                                                                            name: 'doc_date',
                                                                            format : 'Y-m-d',
                                                                            disabled: true,
                                                                            value: new Date(),
                                                                            emptyText: i18n('docdate'),
                                                                            allowBlank:false
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
                                                    flex:1,
                                                    items:[
                                                        {
                                                            xtype: 'container',
                                                            layout:'anchor',
                                                            flex:1,
                                                            items: [
                                                                {
                                                                    xtype: 'fieldcontainer',
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    fieldDefaults: {
                                                                        labelAlign: 'right'
                                                                    },
                                                                    fieldLabel: _('tax'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'xttax',
                                                                            editable: false,
                                                                            readOnly: true,
                                                                            name: 'tax_id',
                                                                            emptyText: i18n('id'),
                                                                            extraParams:'O'
                                                                        },
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            readOnly: true,
                                                                            name: 'tax_name',
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
                                                                    fieldLabel: 'Cash Bank',
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'xtcashbank',
                                                                            editable: false,
                                                                            name: 'cash_id',
                                                                            allowBlank: false,
                                                                            emptyText: i18n('id'),
                                                                            extraParams:['C','B']
                                                                        },
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            name: 'cash_name',
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
                                                                    fieldLabel: _('cashflow'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'xtcashflow',
                                                                            editable: false,
                                                                            name: 'cflow_id',
                                                                            allowBlank: false,
                                                                            emptyText: i18n('id'),
                                                                            extraParams:'I'
                                                                        },
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            name: 'cflow_name',
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
                                                                    fieldLabel: _('cashflow')+' '+_('refund'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'xtcashflow',
                                                                            editable: false,
                                                                            name: 'refund_cflow_id',
                                                                            allowBlank: false,
                                                                            emptyText: i18n('id'),
                                                                            extraParams:'O'
                                                                        },
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            name: 'cflow_name',
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
                                                                            width: 250,
                                                                            fieldLabel: _('payment'),
                                                                            xtype: 'mitos.currency',
                                                                            name: 'payment_value',
                                                                            allowBlank:false,
                                                                            emptyText: i18n('payment'),
                                                                            enableKeyEvents: true,
                                                                            listeners :{
                                                                                keyup:function(f){
                                                                                    var plugin = me.grid.editingPlugin;
                                                                                    console.log(f);
                                                                                    if(f.value<=0){
                                                                                        plugin.editor.form.findField('cash_id').setDisabled(true);
                                                                                        plugin.editor.form.findField('cflow_id').setDisabled(true);
                                                                                        plugin.editor.form.findField('refund_cflow_id').setDisabled(true);
                                                                                    }else{
                                                                                        plugin.editor.form.findField('cash_id').setDisabled(false);
                                                                                        plugin.editor.form.findField('cflow_id').setDisabled(false);
                                                                                        plugin.editor.form.findField('refund_cflow_id').setDisabled(true);
                                                                                    }

                                                                                }
                                                                            }

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
                                },
                                me.grid_detail
                            ]
                        }
                    ]
                })
            ],
            columns: [
                {text: _('project'),width: 100,sortable: true,dataIndex: 'project_name'},
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'full_name'},
                {text: _('unit_building'),flex: 1,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('start_date'),width: 80,sortable: true,dataIndex: 'start_rent', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('end_date'),width: 80,sortable: true,dataIndex: 'end_rent', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('category'),width: 100,sortable: true,dataIndex: 'category'},
                /*{text: _('co_account'),width: 80,sortable: true,dataIndex: 'co_account', renderer: function (value, meta, record, rowIndex, colIndex, store) {
                        return record.data.co_account == 1 ? _('yes') :_('no');
                    }},
                {text: _('compliment'),width: 80,sortable: true,dataIndex: 'compliment', renderer: function (value, meta, record, rowIndex, colIndex, store) {
                        return record.data.co_account == 1 ? _('yes') :_('no');
                    }},*/
                {text: _('room_service'),width: 100,sortable: true,dataIndex: 'room_service'},
                //{text: _('cluster'),width: 100,sortable: true,dataIndex: 'cluster_name'},
                //{text: _('building_type'),width: 100,sortable: true,dataIndex: 'building_name'},
                {text: _('area')+' m2',width: 100,sortable: true,dataIndex: 'area_m2',align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'),summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'total', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('advance'),width: 100,sortable: true,dataIndex: 'advance_value', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('outstanding'),width: 100,sortable: true,dataIndex: 'outstanding_receivable',  align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['project_name',_('project')],['doc_id',_('document')],['registration_id',_('no')],['full_name',_('name')],['unit_building_name',_('unit_building')],['cluster_name',_('cluster')],['remarks',_('remarks')]],
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
                    xtype: 'label'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.store,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.pageBody = [ me.grid];
        me.callParent(arguments);
    },
    onNewData: function(btn){
        var me = this;
        me.formEditing.cancelEdit();
        me.store.insert(0, {aktif: 1,authorized: 1});
        me.formEditingCo.startEdit(0, 0);
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        me.store.load();
        callback(true);
    }
});
