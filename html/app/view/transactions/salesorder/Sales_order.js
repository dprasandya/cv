
Ext.define('App.view.transactions.salesorder.Sales_order', {
    extend: 'App.ux.RenderPanel',
    id: 'panelSales_order',
    pageTitle: _('salesorder'),
    initComponent: function(){
        var me = this;
        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.model =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'co_id', type:'string'},
                {name:'doc_id', type:'string'},
                {name:'doc_type', type:'string'},
                {name:'doc_date', type:'date'},
                {name:'due_date', type:'date'},
                {name:'cust_id', type:'string'},
                {name:'cust_name', type:'string'},
                {name:'cust_po', type:'string'},
                {name:'item_id', type:'string'},
                {name:'item_name', type:'string'},
                {name:'unit_id', type:'string'},
                {name:'sales_id', type:'string'},
                {name:'sales_name', type:'string'},
                {name:'tax_id', type:'string'},
                {name:'tax_name', type:'string'},
                {name:'qty', type:'float'},
                {name:'price_loco', type:'float'},
                {name:'price_transport', type:'float'},
                {name:'price_promotion', type:'float'},
                {name:'price_socialization', type:'float'},
                {name:'price_extra', type:'float'},
                {name:'price_ppn', type:'float'},
                {name:'price_pph', type:'float'},
                {name:'total_price', type:'float'},
                {name:'total', type:'float'},
                {name:'remarks', type:'string'},
                {name:'status', type:'string'},
                {name:'userinput', type:'string'},
                {name:'useredit', type:'string'},
                {name:'timeedit', type:'date'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read: Sales_order.select,
                    create: Sales_order.add,
                    update: Sales_order.update,
                    destroy: Sales_order.delete
                },
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                }
            }
        });
        me.model_detail =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'co_id', type:'string'},
                {name:'doc_id', type:'string'},
                {name:'cust_id', type:'string'},
                {name:'seq_id', type:'integer'},
                {name:'city', type:'string'},
                {name:'address', type:'string'},
                {name:'contact', type:'string'},
                {name:'qty', type:'float'},
                {name:'remarks', type:'string'},
                {name:'status', type:'bool'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read: Sales_order.selectdetail,
                    update: Sales_order.updatedetail
                },
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                }
            }
        });
        me.model_detail_ext =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'co_id', type:'string'},
                {name:'doc_id', type:'string'},
                {name:'sales_id', type:'string'},
                {name:'sales_name', type:'string'},
                {name:'qty', type:'float'},
                {name:'status', type:'bool'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read: Sales_order.selectdetail_ext,
                    create: Sales_order.adddetail_ext,
                    update: Sales_order.updatedetail_ext,
                    destroy: Sales_order.deletedetail_ext
                },
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                }
            }
        });
        me.store = Ext.create('Ext.data.Store',{model: me.model ,remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_detail = Ext.create('Ext.data.Store',{model: me.model_detail ,remoteSort: true, autoLoad: true});
        me.store_detail_ext = Ext.create('Ext.data.Store',{model: me.model_detail_ext ,remoteSort: true, autoLoad: true});
        me.tax = Ext.create('App.view.master.Tax');
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            title: _('detail'),
            height:1000,
            plugins: [
                me.edditing_detail = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false,
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
                {text: _('id'),width: 80,sortable: true,dataIndex: 'seq_id'},
                {text: _('city'),width: 100,sortable: true,dataIndex: 'city'},
                {text: _('address'),flex: 1,sortable: true,dataIndex: 'address'},
                {text: _('contact_info'),width: 100,sortable: true,dataIndex: 'contact'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks', editor:{
                    xtype:'textfield'
                },summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('quantity'),width: 100,sortable: true,dataIndex: 'qty',summaryType:'sum', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    editor:{
                        xtype:'mitos.currency'
                    }},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'status',renderer: me.boolRenderer,
                    dataIndex: 'status',
                    editor:{
                        xtype:'checkbox'
                    }}
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
                    store: [['seq_id',_('id')],['contact',_('contact_info')],['city',_('city')],['address',_('address')],['qty',_('quantity')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_detail.proxy.extraParams = {doc_id:me.doc_id, field_name:me.field_name, field_search:field.value};
                        me.store_detail.loadPage(1);}}
                    }
                }
            ]
        });
        me.grid_detail_ext = Ext.create('Ext.grid.Panel', {
            store: me.store_detail_ext,
            title: _('salesman')+' Extend',
            height:1000,
            plugins: [
                me.edditing_ext = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
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
                                    items: [,
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: {
                                                type: 'hbox'
                                            },
                                            fieldDefaults: {
                                                labelAlign: 'right'
                                            },
                                            fieldLabel: _('salesman'),
                                            items: [
                                                {
                                                    width: 100,
                                                    xtype: 'xtsalesman',
                                                    name: 'sales_id',
                                                    editable: false,
                                                    emptyText: i18n('id')
                                                },
                                                {
                                                    width: 280,
                                                    xtype: 'textfield',
                                                    readOnly: true,
                                                    name: 'sales_name',
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
                                        }
                                    ]
                                }
                            ]
                        }

                    ]
                })
            ],
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            columns: [
                {text: _('id'),width: 100,sortable: true,dataIndex: 'sales_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'sales_name'},
                {text: _('quantity'),width: 80,sortable: true,dataIndex: 'qty', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('salesman'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewDetailExt
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['sales_id',_('id')],['sales_name',_('name')],['qty',_('quantity')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_detail_ext.proxy.extraParams = {doc_id:me.doc_id, field_name:me.field_name, field_search:field.value};
                        me.store_detail_ext.loadPage(1);}}
                    }
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.store_detail_ext,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });

        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.doc_id = record.data.doc_id; me.status = record.data.status;
                    me.store_detail.load({params:{doc_id:me.doc_id}});
                    me.store_detail_ext.load({params:{doc_id:me.doc_id}});
                    var add_button = me.grid_detail_ext.down('toolbar').items.items[0];
                    if(record.data.status==3 || record.data.status==2){add_button.setDisabled(true)}else {add_button.setDisabled(false)}
                }
            },
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    items: [
                        {
                            xtype:'tabpanel',
                            items:[
                                {
                                    xtype: 'panel',
                                    title: _('salesorder'),
                                    layout: 'hbox',
                                    items:[
                                        {
                                            xtype: 'fieldset',
                                            defaultType: 'textfield',
                                            title: _('salesorder'),
                                            layout: 'hbox',
                                            flex:1,
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex:1,
                                                    layout:'anchor',
                                                    items: [,
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
                                                                    xtype:'combo',
                                                                    editable: false,
                                                                    name: 'doc_type',
                                                                    width:100,
                                                                    mode:'local',
                                                                    store: [['S','Sales'],['W','Sweeping'],['T','Trading'],['O','Others']],
                                                                    emptyText   : _('type'),
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
                                                            fieldLabel: _('customer'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xtcustomer',
                                                                    editable: false,
                                                                    name: 'cust_id',
                                                                    allowBlank: false,
                                                                    emptyText: i18n('customer')
                                                                },
                                                                {
                                                                    width: 280,
                                                                    xtype: 'textfield',
                                                                    name: 'cust_name',
                                                                    reference:'cust_name',
                                                                    readOnly: true,
                                                                    emptyText: i18n('customer'),
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
                                                            fieldLabel: _('no')+' PO',
                                                            items: [
                                                                {
                                                                    width: 380,
                                                                    xtype: 'textfield',
                                                                    name: 'cust_po',
                                                                    allowBlank: false,
                                                                    emptyText: i18n('customer')+' PO'
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
                                                            fieldLabel: _('salesman'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xtsalesman',
                                                                    name: 'sales_id',
                                                                    editable: false,
                                                                    emptyText: i18n('id')
                                                                },
                                                                {
                                                                    width: 280,
                                                                    xtype: 'textfield',
                                                                    readOnly: true,
                                                                    name: 'sales_name',
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
                                                            fieldLabel: _('item'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xtitems',
                                                                    name: 'item_id',
                                                                    editable: false,
                                                                    emptyText: i18n('id'),
                                                                    extraParams:['FG']
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
                                                            fieldLabel: _('tax'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xttax',
                                                                    editable: false,
                                                                    name: 'tax_id',
                                                                    emptyText: i18n('id'),
                                                                    extraParams:'O',
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
                                                            fieldLabel: _('price')+' Loco',
                                                            items: [
                                                                {
                                                                    width: 150,
                                                                    xtype: 'mitos.currency',
                                                                    name: 'price_loco',
                                                                    allowBlank:false,
                                                                    enableKeyEvents: true,
                                                                    emptyText: i18n('price') +' Loco',
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
                                                            items: [
                                                                {
                                                                    width: 255,
                                                                    fieldLabel: _('price')+' Transport',
                                                                    xtype: 'mitos.currency',
                                                                    name: 'price_transport',
                                                                    emptyText: i18n('price') +' Transport',
                                                                    enableKeyEvents: true,
                                                                    listeners:{
                                                                        keyup:function(field, e){
                                                                            me.get_total(field);
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    width: 255,
                                                                    fieldLabel: _('price')+' Social',
                                                                    xtype: 'mitos.currency',
                                                                    name: 'price_socialization',
                                                                    emptyText: i18n('price') +' Socialization',
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
                                                            items: [
                                                                {
                                                                    width: 255,
                                                                    fieldLabel: _('price')+' Promotion',
                                                                    xtype: 'mitos.currency',
                                                                    name: 'price_promotion',
                                                                    emptyText: i18n('price') + ' Promotion',
                                                                    enableKeyEvents: true,
                                                                    listeners:{
                                                                        keyup:function(field, e){
                                                                            me.get_total(field);
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    width: 255,
                                                                    fieldLabel: _('price')+' Extra',
                                                                    xtype: 'mitos.currency',
                                                                    name: 'price_extra',
                                                                    emptyText: i18n('price') + ' Extra',
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
                                                            items: [
                                                                {
                                                                    width: 255,
                                                                    fieldLabel:'Price PPN',
                                                                    xtype: 'mitos.currency',
                                                                    name: 'price_ppn',
                                                                    readOnly: true,
                                                                    emptyText: i18n('price')+' Ppn',
                                                                    fieldStyle:'background-color: #F2F3F4; background-image: none; text-align:right;'
                                                                },
                                                                {
                                                                    width: 255,
                                                                    fieldLabel:'Price Pph',
                                                                    xtype: 'mitos.currency',
                                                                    name: 'price_pph',
                                                                    readOnly: true,
                                                                    emptyText: i18n('price')+' Pph',
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
                                                            fieldLabel: _('total')+' '+_('price'),
                                                            items: [
                                                                {
                                                                    width: 150,
                                                                    xtype: 'mitos.currency',
                                                                    name: 'total_price',
                                                                    readOnly: true,
                                                                    emptyText: i18n('total')+' '+i18n('price'),
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
                                                            fieldLabel: _('total'),
                                                            items: [
                                                                {
                                                                    width: 150,
                                                                    xtype: 'mitos.currency',
                                                                    name: 'total',
                                                                    readOnly: true,
                                                                    fieldStyle: 'font-weight: bold; text-align:right; background-color: #F2F3F4; background-image: none;',
                                                                    emptyText: i18n('total')
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                me.grid_detail, me.grid_detail_ext
                            ],
                            listeners: {
                                render: function() {
                                    this.items.each(function(i){
                                        i.tab.on('click', function(){
                                            i.store.proxy.extraParams ={doc_id:me.doc_id};
                                            i.store.load()
                                        });
                                    });
                                }
                            }
                        }

                    ]
                })
            ],
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row' : (record.get('status')== '3' ? 'yellow-row':''));
                }
            },
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('customer'),flex: 1,sortable: true,dataIndex: 'cust_name'},
                {text: _('quantity'),width: 80,sortable: true,dataIndex: 'qty', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('item'),width: 150,sortable: true,dataIndex: 'item_name'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('salesorder'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['cust_name',_('customer')],['cust_po',_('no')+' PO'],['sales_name',_('salesman')],['remarks',_('remarks')],['qty',_('quantity')],['item_name',_('item')]],
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

        me.pageBody = [ me.grid ];
        me.callParent(arguments);
    },
    onNewDetailExt: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        me.edditing_ext.context.record.data.doc_id = me.doc_id;
    },
    onNewUser: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
    },
    get_total:function(field){
        var me=this, form  = field.up('container'), panel = form.up('panel').ownerCt,
            //textfield = container.items.items[0].items,
            qty = panel.ownerCt.form.findField('qty'),//textfield.items[0].items.items[0],
            tax_id = panel.ownerCt.form.findField('tax_id'),//textfield.items[1].items.items[0],// tax
            price_loco = panel.ownerCt.form.findField('price_loco'),//textfield.items[2].items.items[0],// harga loco
            price_transport = panel.ownerCt.form.findField('price_transport'),//textfield.items[3].items.items[0], // harga transport
            price_promotion = panel.ownerCt.form.findField('price_promotion'),//textfield.items[4].items.items[0], // harga promotion
            price_socialization = panel.ownerCt.form.findField('price_socialization'),//textfield.items[3].items.items[0], // harga sosialisasi
            price_extra = panel.ownerCt.form.findField('price_extra'),//textfield.items[4].items.items[0], // harga extra
            price_ppn = panel.ownerCt.form.findField('price_ppn'),//textfield.items[5].items.items[0], // harga ppn
            price_pph = panel.ownerCt.form.findField('price_pph'),//textfield.items[5].items.items[1], // harga pph
            total_price = panel.ownerCt.form.findField('total_price'),//textfield.items[6].items.items[0], // total harga
            total = panel.ownerCt.form.findField('total'),//textfield.items[7].items.items[0], // total
            subtotal_price = 0;
        subtotal_price = price_loco.getValue() + price_transport.getValue() + price_promotion.getValue() + price_socialization.getValue() + price_extra.getValue();
        me.tax.store.proxy.extraParams = {field_name:'tax_id',field_search:tax_id.getValue()};
        me.tax.store.load({
            callback: function(records, operation, success) {
                subtotal_price = price_loco.getValue() + price_transport.getValue() + price_promotion.getValue() + price_socialization.getValue() + price_extra.getValue();
                me.ppn = records[0].data.rate_ppn;
                me.pph = records[0].data.rate_pph;
                price_ppn.setValue(subtotal_price * (me.ppn/100));
                price_pph.setValue(subtotal_price * (me.pph/100));
                total_price.setValue(subtotal_price + price_ppn.getValue() - price_pph.getValue());
                total.setValue(total_price.getValue() * qty.getValue());
            },
            scope: this
        });
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
