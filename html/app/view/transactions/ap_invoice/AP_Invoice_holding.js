
Ext.define('App.view.transactions.ap_invoice.AP_Invoice_holding', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('invoice'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.ap_invoice.AP_Invoice_holding',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_detail = Ext.create('App.store.transactions.ap_invoice.AP_Invoice_detail');
        me.store_po_detail = Ext.create('App.store.transactions.purchase_order.Detail');
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
                            itemId:'detail_ap_invoice',
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
                                                    fieldLabel: _('item'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtitems',
                                                            name: 'item_id',
                                                            readOnly: true,
                                                            emptyText: i18n('id'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;',
                                                            extraParams:['HK']
                                                        },
                                                        {
                                                            width: 198,
                                                            xtype: 'textfield',
                                                            readOnly: true,
                                                            name: 'item_name',
                                                            emptyText: i18n('name'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            width: 80,
                                                            xtype: 'textfield',
                                                            name: 'unit_id',
                                                            readOnly: true,
                                                            emptyText: i18n('unit'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                        }
                                                    ]
                                                },
                                               /*{
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
                                                },*/
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
                                                            editable: false,
                                                            emptyText: i18n('id')
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
                                                            allowBlank:false,
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
                    var useredit = me.grid.down('toolbar'); me.data= record.data;
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.doc_id = record.get('doc_id');
                    me.jurnal.store.load({params:{doc_id:me.doc_id}});

                    // disable btn add detail //
                    var btn_add_detail = me.grid_detail.down('toolbar').items.items[0];
                    if(record.data.status ==1 || record.data.status==2){btn_add_detail.setDisabled(true);}
                    else{if(me.data.doc_type=='P'){btn_add_detail.setDisabled(true)}else{btn_add_detail.setDisabled(false);}}
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
                    enablePrintFn : voucher_report.ap_form_report,
                    items:[
                        {
                            xtype: 'tabpanel',
                            items: [
                                {
                                    xtype: 'panel',
                                    title: _('invoice'),
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
                                                                    fieldLabel: _('type'),
                                                                    items: [
                                                                        {
                                                                            xtype:'combo',
                                                                            editable: false,
                                                                            name: 'doc_type',
                                                                            width:130,
                                                                            mode:'local',
                                                                            store: [['D','Holding'],['O','Others']],
                                                                            emptyText   : _('select'),
                                                                            allowBlank:false,
                                                                            listeners:{
                                                                                change:function(field){
                                                                                    me.type=field.value;
                                                                                    var container = field.up('container'), form = container.up('panel'),
                                                                                        for_doc_id = Ext.ComponentQuery.query('[name=for_doc_id]', form)[0],
                                                                                        warehouse_id = Ext.ComponentQuery.query('[name=warehouse_id]', form)[0],
                                                                                        vend_id = Ext.ComponentQuery.query('[name=vend_id]', form)[0],
                                                                                        afdeling_id = Ext.ComponentQuery.query('[name=afdeling_id]', form)[0];
                                                                                        
                                                                                    if(me.type=='P'){
                                                                                        for_doc_id.setDisabled(false); afdeling_id.setDisabled(true); warehouse_id.setDisabled(true); vend_id.extraParams =['S']; container.remove(for_doc_id);
                                                                                        container.add({xtype:'xtpurchase_order', name: 'for_doc_id', extraParams:[1],  width: 180, editable: false, emptyText: i18n('document')/*, listeners:{
                                                                                            change:function(field){
                                                                                                me.get_change_po(field);
                                                                                            }
                                                                                        }*/});
                                                                                    }else if(me.type=='A'){
                                                                                        for_doc_id.setDisabled(true); afdeling_id.setDisabled(true); warehouse_id.setDisabled(false); vend_id.extraParams =['S']; //project_type.setValue('N');
                                                                                        warehouse_id.extraParams = ['PKS','KEBUN'];
                                                                                    }else if(me.type=='K'){
                                                                                        for_doc_id.setDisabled(true); afdeling_id.setDisabled(false); warehouse_id.setDisabled(true); vend_id.extraParams =['S']; //project_type.setValue('N');
                                                                                    }else if(me.type=='M'){
                                                                                        for_doc_id.setDisabled(true); afdeling_id.setDisabled(false); warehouse_id.setDisabled(false); vend_id.extraParams =['S']; //project_type.setValue('N');
                                                                                        warehouse_id.extraParams = ['PKS'];
                                                                                    }else if(me.type=='F' || me.type=='G'){
                                                                                        for_doc_id.setDisabled(true); afdeling_id.setDisabled(true); warehouse_id.setDisabled(false);
                                                                                        warehouse_id.extraParams = ['PKS'];
                                                                                    }else if(me.type=='S'||me.type=='V'||me.type=='T'||me.type=='B'||me.type=='I'||me.type=='L'||me.type=='H'||me.type=='W'||me.type=='C'||me.type=='N'||me.type=='J'){
                                                                                        for_doc_id.setDisabled(false); container.remove(for_doc_id);
                                                                                        afdeling_id.setDisabled(true); warehouse_id.setDisabled(true); vend_id.extraParams =['S']; //project_type.setValue('N');
                                                                                        container.add({xtype:'xtproduction', name: 'for_doc_id', extraParams:[1],  width: 180, editable: false, emptyText: i18n('document')/*, listeners:{
                                                                                            change:function(field){
                                                                                                me.get_change_po(field);
                                                                                            }
                                                                                        }*/});
                                                                                    }else if(me.type=='E' || me.type=='R'){
                                                                                        for_doc_id.setDisabled(true); afdeling_id.setDisabled(true); warehouse_id.setDisabled(false);
                                                                                        warehouse_id.extraParams = ['PKS'];
                                                                                    }
                                                                                    else{
                                                                                        for_doc_id.setDisabled(true); vend_id.extraParams =['S']; afdeling_id.setDisabled(true); warehouse_id.setDisabled(true);
                                                                                        //costcode_id.extraParams={doc_type: me.type=='O' ? 'B' :'P' , project_id:project_id.getValue()};
                                                                                    }

                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'warehousecombo',
                                                                            name: 'warehouse_id',
                                                                            editable: false,
                                                                            allowBlank:false,
                                                                            disabled:true,
                                                                            emptyText: i18n('id')
                                                                        },
                                                                        {
                                                                            xtype: 'xtpurchase_order',
                                                                            width: 180,
                                                                            name: 'for_doc_id',
                                                                            editable: false,
                                                                            extraParams:[1],
                                                                            emptyText: i18n('document'),
                                                                            disabled: false
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
                                                                            allowBlank: false,
                                                                            disabled:true,
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
                                                                    fieldLabel: _('supplier'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'xtsupplier',
                                                                            editable: false,
                                                                            name: 'vend_id',
                                                                            allowBlank: false,
                                                                            emptyText: i18n('id')
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
                                                                            allowBlank:false,
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
                //{text: _('project'),width: 100,sortable: true,dataIndex: 'project_name'},
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('supplier'),width: 150,sortable: true,dataIndex: 'vend_name'},
                {text: _('tax'),width: 80,sortable: true,dataIndex: 'tax_id'},
                {text: _('liability'),width: 100,sortable: true,dataIndex: 'liability', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('type'),width: 100,sortable: true,dataIndex: 'station_name'},
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
                    store: [['doc_id',_('document')],['vend_name',_('name')],['liability',_('liability')],['remarks',_('remarks')],['tax_id',_('tax')],['tax_no',_('tax')+' No'],['for_doc_id','No PO / SO'],['station_name',_('type')],['userinput',_('input_user')]],
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
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        me.jurnal.store.load();
        //plugin.editor.form.findField('project_type').setValue('N');
        me.formEditing.context.record.data.doc_type = 'I';
        me.formEditing.context.record.data.project_type = 'N';
        plugin.editor.form.findField('tax_date').setValue(new Date());
        plugin.editor.form.findField('doc_date').setValue(new Date());
        plugin.editor.form.findField('due_date').setValue(new Date());
    },
    onNewDetail:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        me.formEditingDetail.context.record.data.doc_id = me.doc_id;
        me.validation_disabled();
    },
    validation_disabled:function(){
        var me = this, plugin = me.grid_detail.editingPlugin;
        if(me.data.doc_type=='S'||me.data.doc_type=='V'||me.data.doc_type=='T'||me.data.doc_type=='B'||me.data.doc_type=='I'||me.data.doc_type=='L'||me.data.doc_type=='H'||me.data.doc_type=='W'||me.data.doc_type=='C'||me.data.doc_type=='J'||me.data.doc_type=='N'){
            plugin.editor.form.findField('item_id').setReadOnly(true);
            plugin.editor.form.findField('coa_id').setReadOnly(false);
             // protect station parameter //
             plugin.editor.form.findField('coa_id').extraParams = {station_type:['PKS'], station_group:[me.data.doc_type]}; 
        }else if(me.data.doc_type=='F' || me.data.doc_type=='G'||me.data.doc_type=='E'){
            plugin.editor.form.findField('item_id').setReadOnly(false);
            plugin.editor.form.findField('coa_id').setReadOnly(true);
            //plugin.editor.form.findField('item_id').setValue('KSWT02');
            //plugin.editor.form.findField('item_name').setValue('Kelapa Sawit (TBS Luar)');
            //plugin.editor.form.findField('unit_id').setValue('KG');
        }else if(me.data.doc_type=='M'||me.data.doc_type=='K'){
            plugin.editor.form.findField('item_id').setReadOnly(true);
            plugin.editor.form.findField('coa_id').setReadOnly(false);
             plugin.editor.form.findField('coa_id').extraParams = {station_type:['KEBUN']}; 
        }else{
            plugin.editor.form.findField('item_id').setReadOnly(true);
            plugin.editor.form.findField('coa_id').setReadOnly(false);
            plugin.editor.form.findField('coa_id').extraParams = null; 
        }
       
        

    },
    get_total:function(field){
        var container  = field.up('fieldset'), //fieldset
            textfield = container.items.items[0].items,
            qty = textfield.items[0].items.items[0],
            price = textfield.items[1].items.items[0],// harga
            total = textfield.items[2].items.items[0]; // total
        total.setValue(price.getValue() * qty.getValue());
    },

    get_change_po : function(field){
        var me= this, plugin = me.grid.editingPlugin,
            for_doc_id = plugin.editor.form.findField('for_doc_id'),
            tax_id = plugin.editor.form.findField('tax_id'),// tax
            tax_name = plugin.editor.form.findField('tax_name');// tax
        me.store_po_detail.proxy.extraParams = { doc_id : for_doc_id.getValue()};
        me.store_po_detail.load({
            callback: function(records, operation, success) {
                tax_idx = records[0].data.tax_id;
                tax_namex = records[0].data.tax_name;
                tax_id.setValue(tax_idx);
                tax_name.setValue(tax_namex);
            }
        });

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
