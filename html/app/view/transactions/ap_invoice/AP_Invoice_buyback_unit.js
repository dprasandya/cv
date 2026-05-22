
Ext.define('App.view.transactions.ap_invoice.AP_Invoice_buyback_unit', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('invoice_buyback_unit'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.ap_invoice.AP_Invoice_buyback_unit',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_detail = Ext.create('App.store.transactions.ap_invoice.AP_Invoice_detail');
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');

        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            height: 1000,
            autoScroll: true,
            title: _('detail'),
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    me.validation_disabled();
                }
            },
            plugins: [
                me.formEditingDetail = Ext.create('App.ux.grid.RowFormEditing', {
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
                                                    fieldLabel: _('account'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtaccount',
                                                            name: 'coa_id',
                                                            readOnly: true,
                                                            emptyText: i18n('id'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                            //extraParams:['E']
                                                        },
                                                        {
                                                            width: 198,
                                                            xtype: 'textfield',
                                                            readOnly: true,
                                                            name: 'coa_name',
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
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    title: _('price'),
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
                                                    fieldLabel: _('quantity'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'mitos.currency',
                                                            name: 'qty',
                                                            allowBlank:false,
                                                            emptyText: i18n('quantity'),
                                                            enableKeyEvents: true,
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
                                                    fieldLabel: _('price'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'mitos.currency',
                                                            name: 'price',
                                                            allowBlank:false,
                                                            enableKeyEvents: true,
                                                            emptyText: i18n('price'),
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
                                                    fieldLabel: _('total'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'mitos.currency',
                                                            name: 'total',
                                                            readOnly: true,
                                                            emptyText: i18n('total'),
                                                            fieldStyle:'font-weight: bold; text-align:right; background-color: #F2F3F4; background-image: none;'
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
                {text: _('no'),width: 40,sortable: true,dataIndex: 'seq_id'},
                {text: _('id'),width: 90,sortable: true, align:'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                        var returnString = record.data.item_id !=''? (record.data.item_id) : (record.data.coa_id) ;
                        return returnString;
                    }},
                {text: _('name'),flex: 1,sortable: true, renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    var returnString = record.data.item_name !=''? (record.data.item_name) : (record.data.coa_name) ;
                    return returnString;
                },summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('quantity'),width: 100,sortable: true,dataIndex: 'qty', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('price'),width: 100,sortable: true,dataIndex: 'price', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('subtotal'),width: 100,sortable: true,dataIndex: 'total', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'}
            ],
            features: [{
                ftype: 'summary'
            }]
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar'); me.data= record.data;
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.doc_id = record.get('doc_id');
                    me.jurnal.store.load({params:{doc_id:me.doc_id}});
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
                    enableRemove : true,
                    items:[
                        {
                            xtype: 'tabpanel',
                            items: [
                                {
                                    xtype: 'panel',
                                    title: _('invoice'),
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
                                                            fieldLabel: _('unit_building'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xtunitbuildingcustomer',
                                                                    editable: false,
                                                                    name: 'unit_building_id',
                                                                    emptyText: i18n('id'),
                                                                    extraParams:['BUYBACK']
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
                                                            fieldLabel: _('owner_unit'),
                                                            items: [
                                                                {
                                                                    width: 300,
                                                                    xtype: 'textfield',
                                                                    readOnly: true,
                                                                    name: 'registration_name',
                                                                    emptyText: i18n('owner_unit'),
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
                                                                    width: 100,
                                                                    xtype: 'projecttypecombo',
                                                                    name: 'project_type',
                                                                    hidden : true,
                                                                    value : 'P',
                                                                    emptyText: i18n('project')
                                                                },
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
                                                                    fieldLabel: _('registration'),
                                                                    xtype:'numberfield',
                                                                    name: 'registration_id',
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
                                                            fieldLabel: _('document'),
                                                            items: [
                                                                {
                                                                    width: 200,
                                                                    xtype: 'textfield',
                                                                    name: 'doc_id',
                                                                    readOnly: true,
                                                                    fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;',
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
                                                            items: [
                                                                {
                                                                    width: 200,
                                                                    xtype : 'datefield',
                                                                    editable: false,
                                                                    fieldLabel: _('docdate'),
                                                                    name: 'doc_date',
                                                                    format : 'Y-m-d',
                                                                    value: new Date(),
                                                                    maxValue : new Date(),
                                                                    emptyText: i18n('docdate'),
                                                                    allowBlank:false
                                                                },
                                                                {
                                                                    width: 200,
                                                                    xtype : 'datefield',
                                                                    editable: false,
                                                                    allowBlank: false,
                                                                    fieldLabel: _('due_date'),
                                                                    name: 'due_date',
                                                                    format : 'Y-m-d',
                                                                    value: new Date(),
                                                                    emptyText: i18n('due_date')
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
                                                                    name: 'vend_id',
                                                                    allowBlank: false,
                                                                    emptyText: i18n('supplier'),
                                                                    extraParams :['S']
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
                                                },
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
                                                                    allowBlank: false,
                                                                    emptyText: i18n('id'),
                                                                    extraParams:'I'
                                                                },
                                                                {
                                                                    width: 280,
                                                                    xtype: 'textfield',
                                                                    name: 'tax_name',
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
                                                            fieldLabel: _('tax')+' '+_('date'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype : 'datefield',
                                                                    editable: false,
                                                                    name: 'tax_date',
                                                                    format : 'Y-m-d',
                                                                    value: new Date(),
                                                                    maxValue : new Date(),
                                                                    emptyText: i18n('date')
                                                                },
                                                                {
                                                                    width: 280,
                                                                    xtype: 'textfield',
                                                                    name: 'tax_no',
                                                                    emptyText: i18n('tax')+' '+i18n('no')
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
                                        },
                                        me.jurnal.grid
                                    ]
                                },
                                me.grid_detail
                            ],
                            listeners: {
                                render: function() {
                                    this.items.each(function(i, index, items){
                                        i.tab.on('click', function(){
                                            if(index==0){
                                                me.jurnal.store.load({params:{doc_id:me.data.doc_id}});
                                            }else if(index>0){
                                                i.store.proxy.extraParams = {doc_id: me.data.doc_id};
                                                i.store.load();
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
                {text: _('project'),width: 100,sortable: true,dataIndex: 'project_name'},
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('supplier'),width: 150,sortable: true,dataIndex: 'vend_name'},
                {text: _('unit_building'),width: 150,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('tax'),width: 80,sortable: true,dataIndex: 'tax_id'},
                {text: _('liability'),width: 100,sortable: true,dataIndex: 'liability', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('invoice'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['project_name',_('project')],['doc_id',_('document')],['vend_name',_('name')],['unit_building_name',_('unit_building')],['liability',_('liability')],['remarks',_('remarks')],['tax_id',_('tax')],['tax_no',_('tax')+' No'],['userinput',_('input_user')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = { doc_type:'U', field_name:me.field_name, field_search:field.value};
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
        plugin.context.record.data.doc_type = 'U';
        plugin.editor.form.findField('tax_date').setValue(new Date());
        plugin.editor.form.findField('doc_date').setValue(new Date());
        plugin.editor.form.findField('due_date').setValue(new Date());
    },
    get_total:function(field){
        var container  = field.up('fieldset'), //fieldset
            textfield = container.items.items[0].items,
            qty = textfield.items[0].items.items[0],
            price = textfield.items[1].items.items[0],// harga
            total = textfield.items[2].items.items[0]; // total
        total.setValue(price.getValue() * qty.getValue());
    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        me.store.proxy.extraParams = {doc_type:'U'};
        me.store.load();
        callback(true);
    }
});
