
Ext.define('App.view.transactions.cashbank.Budget', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('budget'),

    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.cashbank.Budget',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.storedetail = Ext.create('App.store.transactions.cashbank.Budgetdetail',{remoteSort: true});
        me.storejurnal = Ext.create('App.store.transactions.cashbank.Budgetjurnal',{remoteSort: true});

        me.griddetail = Ext.create('Ext.grid.Panel', {
            store: me.storedetail,
            height: 1000,
            title: 'Budget detail',
            plugins: [
                me.edditing_detail = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false,
                    listeners: {
                        beforeedit: function(editor,e,opt){
                            if(me.data.status==1 || me.data.status==2){
                                return false;
                            }
                        }
                    }
                })
            ],
            columns: [
                //{text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                //{text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'coa_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'coa_name'},
                {text: _('total'),width: 200,sortable: true,dataIndex: 'total', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00'), editor:{
                    xtype:'mitos.currency'
                }},
                {text: _('actual'),width: 100,sortable: true,dataIndex: 'actual', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00'),renderer : function(value, meta, record) {
                    if(record.data.actual>record.data.total){
                        meta.style = "background-color:red;";
                    }
                    return Ext.util.Format.number(value, '0,000');
                }},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
            ],
            features: [{
                ftype: 'summary'
            }],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['coa_id',_('id')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.storedetail.proxy.extraParams = {doc_id:me.data.doc_id,field_name:me.field_name, field_search:field.value};
                        me.storedetail.loadPage(1);}}
                    }
                },'->',
                {
                    xtype: 'label'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.storedetail,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.gridjurnal = Ext.create('Ext.grid.Panel', {
            store: me.storejurnal,
            height: 1000,
            title: 'Actual Cost',
            plugins: [
                me.edditing_jurnal = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false,
                    listeners: {
                        beforeedit: function(editor,e,opt){
                            if(me.data.status==1 || me.data.status==2){
                                return false;
                            }
                        }
                    }
                })
            ],
            columns: [
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'coa_header'},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'coa_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'coa_name'},
                {text: _('total'),width: 200,sortable: true,dataIndex: 'total', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00'),},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
            ],
            features: [{
                ftype: 'summary'
            }],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['coa_id',_('id')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.storejurnal.proxy.extraParams = {doc_id:me.data.doc_id,field_name:me.field_name, field_search:field.value};
                        me.storejurnal.loadPage(1);}}
                    }
                },'->',
                {
                    xtype: 'label'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.storejurnal,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar'); me.data=record.data;
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    
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
                me.edditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    items: [
                        {
                            xtype:'tabpanel',
                            items:[
                                {
                                    xtype: 'panel',
                                    title: _('budget'),
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            layout: 'hbox',
                                            flex:1,
                                            items: [
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
                                                            fieldLabel: _('document'),
                                                            items: [
                                                                {
                                                                    width: 200,
                                                                    xtype: 'textfield',
                                                                    name: 'doc_id',
                                                                    readOnly: true,
                                                                    emptyText: i18n('id'),
                                                                    fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;'
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
                                                            fieldLabel: _('type'),
                                                            items: [
                                                                {
                                                                    xtype:'ActualcostCombo',
                                                                    editable: false,
                                                                    name: 'doc_name',
                                                                    width:130
                                                                    
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
                                                            hidden:true,
                                                            fieldLabel: _('cost_category'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xtol_type',
                                                                    name: 'ol_id',
                                                                    allowBlank: false,
                                                                    emptyText: i18n('id')
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
                                                            fieldLabel: _('period'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'textfield',
                                                                    name: 'from_period',
                                                                    emptyText: i18n('from period')},
                                                                {
                                                                    width: 100,
                                                                    xtype: 'textfield',
                                                                    name: 'to_period',
                                                                    emptyText: i18n('to period')
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
                                                            fieldLabel: _('afdeling'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xtafdeling',
                                                                    editable: false,
                                                                    name: 'afdeling_id',
                                                                    //allowBlank: false,
                                                                    //disabled:true,
                                                                    emptyText: i18n('id')
                                                                },
                                                                {
                                                                    width: 280,
                                                                    xtype: 'textfield',
                                                                    name: 'afdeling_name',
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
                                                            fieldLabel: _('standard'),
                                                            items: [
                                                                {
                                                                    width: 150,
                                                                    xtype: 'mitos.currency',
                                                                    name: 'standard',
                                                                    allowBlank:false,
                                                                    emptyText: i18n('amount')
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
                                                            fieldLabel: _('budget'),
                                                            items: [
                                                                {
                                                                    width: 150,
                                                                    xtype: 'mitos.currency',
                                                                    name: 'nominal',
                                                                    readOnly: true,
                                                                    allowBlank:false,
                                                                    emptyText: i18n('amount')
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
                                                            fieldLabel: _('actual'),
                                                            items: [
                                                                {
                                                                    width: 150,
                                                                    xtype: 'mitos.currency',
                                                                    name: 'actual',
                                                                    readOnly: true,
                                                                    allowBlank:false,
                                                                    emptyText: i18n('amount')
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
                                                            fieldLabel: _('requester'),
                                                            items: [
                                                                {
                                                                    width: 200,
                                                                    xtype: 'textfield',
                                                                    name: 'request_by',
                                                                    emptyText: i18n('requester')
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
                                },
                                me.griddetail, me.gridjurnal 
                            ],
                            listeners: {
                                render: function() {
                                    this.items.each(function(i, index, items){
                                        i.tab.on('click', function(){
                                            if(index>0){
                                                i.store.proxy.extraParams = {doc_id: me.data.doc_id};
                                                i.store.load();
                                            } else if(index==0){
                                                var sum_nominal=me.storedetail.sum('total'),
                                                sum_jurnal=me.storejurnal.sum('total'),
                                                plugin = me.grid.editingPlugin,
                                                nominal = plugin.editor.form.findField('nominal'),
                                                actual = plugin.editor.form.findField('actual');
                                                nominal.setValue(sum_nominal);
                                                actual.setValue(sum_jurnal);
                                                
                                            }
                                        });
                                    });
                                }
                            }
                        }
                        ]
                })
            ],
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                //{text: _('type'),width: 100,sortable: true, align:'center',
                    //renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                       // var returnString = record.data.doc_type=='S'?'PKS - S.Leading R':(record.data.doc_type=='K'?'Asset Kebun':(record.data.doc_type=='V'?'PKS - V.Sterilizer':(record.data.doc_type=='T'?'PKS - Threser':(record.data.doc_type=='B'?'PKS - Boiler':(record.data.doc_type=='I'?'PKS - Klarifikasi':(record.data.doc_type=='L'?'PKS - Kernel':(record.data.doc_type=='H'?'PKS - Power House':(record.data.doc_type=='W'?'PKS - Workshop':'PKS - Others')))))))) ;
                      //  return returnString;
                    //}},
                {text: _('type'),width: 100,sortable: true,dataIndex: 'doc_name'},
                {text: _('standard'),width: 100,sortable: true,dataIndex: 'standard', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('budget'),width: 100,sortable: true,dataIndex: 'nominal', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('actual'),width: 100,sortable: true,dataIndex: 'actual', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'),renderer : function(value, meta, record) {
                    if(record.data.actual>record.data.nominal){
                        meta.style = "background-color:red;";
                    }
                    return Ext.util.Format.number(value, '0,000');
                }},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('budget'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['afdeling_name',_('afdeling')],['nominal',_('total')],['remarks',_('remarks')],['userinput',_('input_user')]],
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
        me.pageBody = [me.grid];
        me.callParent(arguments);
    },
    onNewUser: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        plugin.editor.form.findField('doc_date').setValue(new Date());
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        this.store.load();
        callback(true);
    }
});
