Ext.define('App.view.transactions.project.Work_order_progress', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('work_order_progress'),
    initComponent: function(){
        var me = this;
        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.project.Work_order_progress',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_detail = Ext.create('App.store.transactions.project.Work_order_progress_detail',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            listeners :{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_detail.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.jurnal.store.load({params:{doc_id:record.data.doc_id}});
                }
            },
            plugins: [
                me.edditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    items: [
                        {
                            xtype:'panel',
                            layout: 'hbox',
                            items:[
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
                                                            allowBlank: false,
                                                            readOnly: true,
                                                            emptyText: i18n('type'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;',
                                                            listeners:{
                                                                change:function(field){
                                                                    var container = field.up('container'), form = container.up('container'),
                                                                        costcode_id = Ext.ComponentQuery.query('[name=costcode_id]', form)[0];
                                                                    if(field.value=='P'){
                                                                        costcode_id.extraParams = {doc_type:'P', project_id:me.data.project_id}
                                                                        costcode_id.setDisabled(false);
                                                                    }else{
                                                                        costcode_id.setDisabled(true);
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {
                                                            width: 100,
                                                            xtype: 'projectcombo',
                                                            name: 'project_id',
                                                            allowBlank: false,
                                                            readOnly: true,
                                                            emptyText: i18n('id'),
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
                                                    fieldLabel: _('costcode'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtcostcode',
                                                            editable: false,
                                                            name: 'costcode_id',
                                                            readOnly: true,
                                                            emptyText: i18n('id'),
                                                            extraParams:{doc_type:'P', project_id:'-'},
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
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
                                                    fieldLabel: _('document'),
                                                    items: [
                                                        {
                                                            width: 200,
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
                                                            emptyText: i18n('docdate'),
                                                            allowBlank:false
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
                                                            readOnly: true,
                                                            name: 'vend_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('id'),
                                                            extraParams:'S',
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
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
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    fieldLabel: _('contract'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'mitos.currency',
                                                            name: 'contract_value',
                                                            readOnly:true,
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none; text-align:right;'
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
                                            items:[
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
                                                            maxValue: 100,
                                                            emptyText: i18n('progress'),
                                                            enableKeyEvents: true,
                                                            listeners:{
                                                                keyup:function(field, e){
                                                                    var container = field.up('container'),
                                                                        progress_value = container.items.items[1];
                                                                    progress_value.setValue((field.value/100)*me.data.contract_value);
                                                                }
                                                            }
                                                        },
                                                        {
                                                            width: 150,
                                                            xtype: 'mitos.currency',
                                                            name: 'progress_value',
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
                                                    fieldLabel: _('retention'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype:'combo',
                                                            editable: false,
                                                            name:'retention_status',
                                                            mode:'local',
                                                            emptyText: i18n('retention'),
                                                            allowBlank: false,
                                                            value : 'N',
                                                            store: [['N',_('no')],['Y',_('yes')]],
                                                            listeners:{
                                                                change:function(field, e){
                                                                    var container = field.up('container'),
                                                                        retenion_value = container.items.items[1];
                                                                    if(field.value=='N'){retenion_value.setValue(0);}
                                                                    else{retenion_value.setValue(me.data.retention_value);}
                                                                }
                                                            }
                                                        },
                                                        {
                                                            width: 250,
                                                            xtype: 'mitos.currency',
                                                            readOnly: true,
                                                            name: 'retention_value',
                                                            emptyText: i18n('amount'),
                                                            fieldStyle:'background-color: #F2F3F4; text-align:right; background-image: none;'
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
                        }, me.jurnal.grid
                    ]
                })
            ],
            columns: [
                {text: _('no'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('progress')+'%',width: 80,sortable: true, align:'center', dataIndex: 'progress_prs', renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('amount'),width: 100,sortable: true,dataIndex: 'progress_value', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('retention'),width: 80,sortable: true,dataIndex: 'retention_status', renderer: function (value, meta, record, rowIndex, colIndex, store) {
                    return record.data.retention_status == 'N' ? _('no') :_('yes');
                }},
                {text: _('retention'),width: 100,sortable: true,dataIndex: 'retention_value', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
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
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['progress_prs',_('progress')+'%'],['progress_value',_('amount')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_detail.proxy.extraParams = {for_doc_id: me.data.for_doc_id, field_name:me.field_name, field_search:field.value, start:0};
                        me.store_detail.loadPage(1);}}
                    }
                },'->',
                {
                    xtype: 'label'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 15,
                store: me.store_detail,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners :{
                itemclick: function(dv, record, item, index, e) {
                    me.data = record.data;
                    me.store_detail.proxy.extraParams = {for_doc_id: me.data.for_doc_id};
                    me.store_detail.load();
                    var add_button = me.grid_detail.down('toolbar').items.items[0];
                    if(record.data.status==3 || record.data.status==2){add_button.setDisabled(true)}else {add_button.setDisabled(false)}
                    me.GridShow= Ext.create('App.ux.window.Window',{
                        layout: 'fit',
                        title: me.data.vend_name+' - Contract :'+me.data.contract_value+' Retention :'+me.data.retention_value,
                        width: 1100,
                        height: 400,
                        items:[me.grid_detail],
                        modal:true
                    });
                    me.GridShow.show();
                }
            },
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status')=='3' ? 'yellow-row' : (record.get('status')=='2' ? 'adult-row' : (record.get('qty')-record.get('qty_grn') <= 0 ? 'child-row' : '') );
                }
            },
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'for_doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'for_doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('contract_no'),width: 80,sortable: true,dataIndex: 'contract_no'},
                {text: _('project'),width: 80,sortable: true,dataIndex: 'project_name'},
                {text: _('supplier'),width: 150,sortable: true,dataIndex: 'vend_name'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('contract'),width: 100,sortable: true,dataIndex: 'contract_value', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('progress'), width: 100,sortable: true,dataIndex: 'progress_value', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('outstanding'),width: 100,sortable: true, align:'right',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                        var returnString = record.data.contract_value - record.data.progress_value;
                        return Ext.util.Format.number(returnString, '0,000.00');
                    }},
                {text: _('retention'), width: 100,sortable: true,dataIndex: 'retention_value', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['for_doc_id',_('document')],['doc_id',_('document')+' Progress'], ['contract_no',_('contract_no')], ['vend_name',_('supplier')],['remarks',_('remarks')],['project_name',_('project')],['costcode_name',_('costcode')],['contract_value',_('contract')],['progress_value',_('progress')],['userinput',_('input_user')]],
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
        me.pageBody = [ me.grid ];
        me.callParent(arguments);
    },
    onNewDetail: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        me.edditing.context.record.data.for_doc_id = me.data.for_doc_id;
        plugin.editor.form.findField('doc_date').setValue(new Date());
        plugin.editor.form.findField('retention_status').setValue('N');
        plugin.editor.form.findField('project_id').setValue(me.data.project_id);
        plugin.editor.form.findField('project_type').setValue(me.data.project_type);
        plugin.editor.form.findField('contract_value').setValue(me.data.contract_value);
        plugin.editor.form.findField('vend_id').setValue(me.data.vend_id);
        plugin.editor.form.findField('vend_name').setValue(me.data.vend_name);
        plugin.editor.form.findField('costcode_id').setValue(me.data.costcode_id);
        plugin.editor.form.findField('costcode_name').setValue(me.data.costcode_name);
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
