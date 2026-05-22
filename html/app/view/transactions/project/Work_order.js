
Ext.define('App.view.transactions.project.Work_order', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('work_order'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.project.Work_order',{remoteSort: true, pageSize : 20,  autoLoad: false});
        me.store_detail = Ext.create('App.store.transactions.project.Work_order_detail');
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            title: _('detail'),
            height: 1000,
            autoScroll:false,
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            plugins:[
                me.formEditingDetail = Ext.create('App.ux.grid.RowFormEditing', {
                    enableRemove : true,
                    clicksToEdit:1,
                    items: [
                        {
                            xtype:'panel',
                            layout: 'hbox',
                            items:[
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    title: _('detail'),
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
                                                    items: [
                                                        {
                                                            width: 200,
                                                            fieldLabel: 'Payment '+_('date'),
                                                            xtype : 'datefield',
                                                            editable: false,
                                                            name: 'payment_date',
                                                            format : 'Y-m-d',
                                                            value: new Date(),
                                                            maxValue : new Date(),
                                                            emptyText: i18n('date')
                                                        },
                                                        {
                                                            width: 200,
                                                            fieldLabel: 'Claim '+_('date'),
                                                            xtype : 'datefield',
                                                            editable: false,
                                                            name: 'claim_date',
                                                            format : 'Y-m-d',
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
                                                    fieldLabel: _('progress'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'mitos.percent',
                                                            name: 'progress_prs',
                                                            emptyText: i18n('%'),
                                                            enableKeyEvents: true,
                                                            maxValue: 100,
                                                            listeners:{
                                                                keyup:function(field, e){
                                                                    var form = field.up('container'),
                                                                        claim_value = Ext.ComponentQuery.query('[name=claim_value]', form)[0];
                                                                    claim_value.setValue(me.data.contract_value*(field.value/100));

                                                                }
                                                            }
                                                        },
                                                        {
                                                            width: 250,
                                                            xtype: 'mitos.currency',
                                                            readOnly: true,
                                                            name: 'claim_value',
                                                            emptyText: i18n('amount'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }

                    ],
                    listeners: {
                        beforeedit: function(editor,e,opt){
                            if(me.status==1 || me.status==2 || me.status==3){
                                return false;
                            }
                        }
                    }
                })
            ],
            columns: [
                {text: _('no'),width: 40,sortable: true,dataIndex: 'seq_id'},
                {text: 'Payment '+_('date'),width: 80,sortable: true,dataIndex: 'payment_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('progress'),width: 90,sortable: true, align :'center', dataIndex: 'progress_prs', renderer: Ext.util.Format.numberRenderer('0,000.00%')},
                {text: 'Claim '+_('date'),width: 80,sortable: true,dataIndex: 'claim_date', renderer:Ext.util.Format.dateRenderer('d-m-Y') ,summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('amount'),flex:1,sortable: true,dataIndex: 'claim_value', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')}
            ],
            features: [{
                ftype: 'summary'
            }],
            tbar: [
                {
                    xtype: 'button',
                    text: _('detail'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewDetail
                }
            ]
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar'); me.data = record.data;
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.doc_id = record.get('doc_id'); me.status = record.get('status');
                    me.store_detail.proxy.extraParams = {doc_id: me.doc_id};
                    me.store_detail.load();

                    // disable btn add detail //
                    var btn_add_detail = me.grid_detail.down('toolbar').items.items[0];
                    if(me.status ==1 || me.status==2){btn_add_detail.setDisabled(true);}
                    else{btn_add_detail.setDisabled(false);}
                }
            },
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enablePrint : true,
                    enablePrintFn : voucher_report.work_order_form_report,
                    items:[
                        {
                            xtype: 'tabpanel',
                            items: [
                                {
                                    xtype:'panel',
                                    title: _('work_order'),
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
                                                                    fieldLabel: _('project'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'projecttypecombo',
                                                                            name: 'project_type',
                                                                            readOnly: true,
                                                                            emptyText: i18n('type'),
                                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                                        },
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'projectcombo',
                                                                            name: 'project_id',
                                                                            allowBlank: false,
                                                                            emptyText: i18n('id'),
                                                                            listeners:{
                                                                                change:function(field){
                                                                                    var container = field.up('container'), form = container.up('container'),
                                                                                        costcode_id = Ext.ComponentQuery.query('[name=costcode_id]', form)[0],
                                                                                        unit_building_id = Ext.ComponentQuery.query('[name=unit_building_id]', form)[0];
                                                                                    costcode_id.setValue(null); unit_building_id.setValue(null);
                                                                                    costcode_id.extraParams={doc_type:'B', project_id:field.value};
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
                                                                    fieldLabel: _('costcode'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'xtcostcode',
                                                                            editable: false,
                                                                            name: 'costcode_id',
                                                                            allowBlank: false,
                                                                            emptyText: i18n('id'),
                                                                            extraParams:{doc_type:'B', project_id:'-'}
                                                                        },
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            name: 'costcode_name',
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
                                                                    fieldLabel: _('unit_building'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'xtunitbuilding',
                                                                            editable: false,
                                                                            name: 'unit_building_id',
                                                                            emptyText: i18n('unit_building'),
                                                                            extraParams:['SOLD','UNSOLD']

                                                                        },
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            name: 'unit_building_name',
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
                                                                    fieldLabel: _('document'),
                                                                    items: [
                                                                        {
                                                                            width: 205,
                                                                            xtype: 'textfield',
                                                                            name: 'doc_id',
                                                                            readOnly: true,
                                                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;',
                                                                            emptyText: i18n('id')
                                                                        },
                                                                        {
                                                                            width: 100,
                                                                            xtype : 'datefield',
                                                                            editable: false,
                                                                            name: 'doc_date',
                                                                            format : 'Y-m-d',
                                                                            value: new Date(),
                                                                            maxValue : new Date(),
                                                                            allowBlank: false,
                                                                            emptyText: i18n('docdate')
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
                                                                            width: 205,
                                                                            fieldLabel: _('contract_date'),
                                                                            xtype: 'datefield',
                                                                            name: 'contract_date',
                                                                            format : 'Y-m-d',
                                                                            value: new Date(),
                                                                            maxValue : new Date(),
                                                                            allowBlank: false,
                                                                            emptyText: i18n('contract_date')
                                                                        },
                                                                        {
                                                                            width: 280,
                                                                            fieldLabel: _('contract_no'),
                                                                            xtype: 'textfield',
                                                                            name: 'contract_no',
                                                                            allowBlank: false,
                                                                            emptyText: i18n('contract_no')
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
                                                                            width: 205,
                                                                            fieldLabel: _('start_date'),
                                                                            xtype: 'datefield',
                                                                            name: 'start_date',
                                                                            format : 'Y-m-d',
                                                                            value: new Date(),
                                                                            maxValue : new Date(),
                                                                            allowBlank: false,
                                                                            emptyText: i18n('start_date')
                                                                        },
                                                                        {
                                                                            width: 200,
                                                                            fieldLabel: _('end_date'),
                                                                            xtype: 'datefield',
                                                                            name: 'end_date',
                                                                            format : 'Y-m-d',
                                                                            value: new Date(),
                                                                            allowBlank: false,
                                                                            emptyText: i18n('end_date')
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
                                                                    fieldLabel: _('supplier'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'xtsupplier',
                                                                            editable: false,
                                                                            name: 'vend_id',
                                                                            allowBlank: false,
                                                                            emptyText: i18n('id'),
                                                                            extraParams:'S'
                                                                        },
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            name: 'vend_name',
                                                                            readOnly: true,
                                                                            emptyText: i18n('name'),
                                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
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
                                                                            name: 'tax_id',
                                                                            emptyText: i18n('id'),
                                                                            extraParams:'I',
                                                                            listeners:{
                                                                                change:function(field, e){
                                                                                    me.get_total(field);
                                                                                }
                                                                            }
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
                                                                    fieldLabel: 'Contract '+_('amount'),
                                                                    items: [
                                                                        {
                                                                            width: 200,
                                                                            xtype: 'mitos.currency',
                                                                            name: 'contract_value',
                                                                            allowBlank:false,
                                                                            enableKeyEvents: true,
                                                                            emptyText: i18n('amount'),
                                                                            listeners:{
                                                                                keyup:function(field, e){
                                                                                    me.get_total(field);
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
                                                                    fieldLabel: _('retention')+' %',
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'mitos.percent',
                                                                            name: 'retention_prs',
                                                                            allowBlank:false,
                                                                            enableKeyEvents: true,
                                                                            emptyText: i18n('%'),
                                                                            listeners:{
                                                                                keyup:function(field, e){
                                                                                    me.get_total(field);
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'mitos.currency',
                                                                            name: 'retention_value',
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
                                                                            name: 'status'
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
                {text: _('project'),width: 80,sortable: true,dataIndex: 'project_name'},
                {text: _('unit_building'),width: 100,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('costcode'),width: 100,sortable: true,dataIndex: 'costcode_name'},
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('supplier'),width: 150,sortable: true,dataIndex: 'vend_name'},
                {text: _('contract_no'),width: 150,sortable: true,dataIndex: 'contract_no'},
                {text: _('amount'),width: 100,sortable: true,dataIndex: 'contract_value', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('work_order'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['project_name',_('project')],['unit_building_name',_('unit_building')],['costcode_name',_('costcode')],['doc_id',_('document')],['vend_name',_('supplier')],['contract_no',_('contract_no')],['contract_value',_('amount')],['remarks',_('remarks')],['userinput',_('input_user')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {doc_type:'I', field_name:me.field_name, field_search:field.value};
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
         var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
         plugin.cancelEdit();
         store.insert(0, {aktif: 1,authorized: 1});
         plugin.startEdit(0, 0);
         plugin.editor.form.findField('project_type').setValue('P');
         plugin.editor.form.findField('doc_date').setValue(new Date());
         plugin.editor.form.findField('contract_date').setValue(new Date());
         plugin.editor.form.findField('start_date').setValue(new Date());
         plugin.editor.form.findField('end_date').setValue(new Date());

    },
    onNewDetail:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        me.formEditingDetail.context.record.data.doc_id = me.doc_id;
    },
    get_total:function(field){
        var me=this, plugin = me.grid.editingPlugin,
            contract_value = plugin.editor.form.findField('contract_value'),
            retention_prs = plugin.editor.form.findField('retention_prs'),// retention_prs
            retention_value = plugin.editor.form.findField('retention_value'),// retention_value
            tax_id = plugin.editor.form.findField('tax_id');// tax_id
        retention_value.setValue(contract_value.getValue() * (retention_prs.getValue()/100));
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
