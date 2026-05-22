Ext.define('App.view.transactions.ar_invoice.AR_Add_Billing', {
    extend: 'App.ux.RenderPanel',
    id: 'panelAR_Add_Billing',
    pageTitle: _('ar_add_billing'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.ar_invoice.AR_Invoice_detail',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.tax = Ext.create('App.view.master.Tax');
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');
        me.myupload= new Ext.FormPanel({
            fileUpload: true,
            title :'Import Piutang',
            width: 500,
            autoHeight: true,
            bodyStyle: 'padding: 10px 10px 10px 10px;',
            labelWidth: 50,
            defaults: {
                anchor: '95%',
                allowBlank: false,
                msgTarget: 'side'
            },
            items:[
                {
                    xtype: 'fileuploadfield',
                    id: 'filedata_ar_invoice',
                    emptyText: 'Select a document to upload...',
                    fieldLabel: 'File',
                    buttonText: 'Browse',
                    listeners:{
                        change:function(f,v){
                            var note = Ext.DomQuery.selectNode('input[id='+f.getInputId()+']');
                            note.value = v.replace("C:\\fakepath\\","");
                        }
                    }
                }
            ],
            buttons: [{
                text: 'Upload Csv',
                handler: function(){
                    if(me.myupload.getForm().isValid()){
                        form_action=1;
                        me.myupload.getForm().submit({
                            url: 'dataProvider/AR_Invoice_Fileupload.php',
                            waitMsg: 'Uploading file...',
                            method: 'POST',
                            success: function (fp, o) {
                                Ext.Msg.alert('Success', 'Your file has been uploaded.');
                                me.store.load();
                            },
                            failure: function (fp, o) {
                                Ext.Msg.alert('Failure', !o.result.msg ? 'Your file did not upload correctly':o.result.msg );
                                 me.store.load();
                            }
                        });
                    }
                }
            }]
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners :{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[5].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.doc_id = record.data.doc_id
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
                    enablePrint : true,
                    enablePrintFn : voucher_report.ar_form_report,
                    items: [
                        {
                            xtype:'panel',
                            layout: 'hbox',
                            itemId:'ar_add_billing_panel',
                            items:[
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    title: _('ar_add_billing'),
                                    layout: 'hbox',
                                    flex:1,
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex:1,
                                            layout:'anchor',
                                            items: [
                                                /*{
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
                                                            emptyText: i18n('type'),
                                                            listeners:{
                                                                change:function(field){
                                                                    var container = field.up('container'), form = container.up('container'),
                                                                        costcode_id = Ext.ComponentQuery.query('[name=costcode_id]', form)[0],
                                                                        coa_add_billing = Ext.ComponentQuery.query('[name=coa_add_billing]', form)[0];
                                                                    if(field.value=='P'){
                                                                        costcode_id.setDisabled(false);
                                                                        coa_add_billing.setDisabled(true);
                                                                    }else{
                                                                        costcode_id.setDisabled(true);
                                                                        coa_add_billing.setDisabled(false);
                                                                    }
                                                                }
                                                            }
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
                                                                        unit_building_id = Ext.ComponentQuery.query('[name=unit_building_id]', form)[0],
                                                                        unit_building_name = Ext.ComponentQuery.query('[name=unit_building_name]', form)[0];
                                                                    costcode_id.setValue(null);  unit_building_id.setValue(null);  unit_building_name.setValue(null);
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
                                                            extraParams:{doc_type:'', project_id:''}
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
                                                            xtype: 'xtunitbuildingcustomer',
                                                            editable: false,
                                                            name: 'unit_building_id',
                                                            emptyText: i18n('unit_building'),
                                                            extraParams:['SALES','RENT','CHECK IN']

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
                                                            name: 'coa_add_billing',
                                                            editable: false,
                                                            allowBlank: false,
                                                            emptyText: i18n('id')
                                                            //extraParams:['R']
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            readOnly: true,
                                                            name: 'coa_add_billing_name',
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
                                                            width: 200,
                                                            xtype: 'textfield',
                                                            name: 'for_doc_id',
                                                            readOnly: true,
                                                            hidden:true,
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
                                                            emptyText: i18n('id'),
                                                            extraParams:['C','P']
                                                            /*listeners :{
                                                                change:function(field){
                                                                    var container = field.up('container'), form = container.up('container'),
                                                                        unit_building_id = Ext.ComponentQuery.query('[name=unit_building_id]', form)[0] ,
                                                                        unit_building_name = Ext.ComponentQuery.query('[name=unit_building_name]', form)[0] ;
                                                                    unit_building_id.setValue(''); unit_building_name.setValue('');
                                                                }
                                                            }*/
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
                                                            width: 100,
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
                                                        },
                                                        {
                                                            width: 80,
                                                            xtype: 'unitcombo',
                                                            name: 'unit_id',
                                                            emptyText: i18n('unit')
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
                                                            allowBlank: false,
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
                                                    items: [
                                                        {
                                                            fieldLabel: _('price'),
                                                            width: 250,
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
                                                        },
                                                        {
                                                            fieldLabel: _('service_charge'),
                                                            width: 200,
                                                            xtype: 'mitos.currency',
                                                            name: 'price_sc',
                                                            readOnly: true,
                                                            emptyText: i18n('service_charge'),
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
                                                    fieldLabel: 'Ppn, Pph',
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'mitos.currency',
                                                            name: 'price_ppn',
                                                            readOnly:true,
                                                            emptyText: i18n('ppn'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none; text-align:right;'
                                                        },
                                                        {
                                                            width: 100,
                                                            xtype: 'mitos.currency',
                                                            name: 'price_pph',
                                                            readOnly:true,
                                                            emptyText: i18n('pph'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none; text-align:right;'
                                                        },
                                                        {
                                                            width: 150,
                                                            xtype: 'mitos.currency',
                                                            name: 'total_price',
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
                                                    fieldLabel: _('total'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'mitos.currency',
                                                            name: 'receivable',
                                                            readOnly: true,
                                                            fieldStyle: 'font-weight: bold; text-align:right; background-color: #F2F3F4; background-image: none;',
                                                            emptyText: i18n('total')
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
                        },me.jurnal.grid
                    ]
                })
            ],
            columns: [
                //{text: _('project'),width: 80,sortable: true,dataIndex: 'project_name'},
                //{text: _('unit_building'),width: 100,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('customer'),flex: 1,sortable: true,dataIndex: 'cust_name'},
                {text: _('tax'),width: 80,sortable: true,dataIndex: 'tax_id'},
                {text: _('amount'),width: 100,sortable: true,dataIndex: 'receivable', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('upload'),
                    iconCls: 'icoCsv',
                    handler: function () {
                        me.GridShow= Ext.create('App.ux.window.Window',{
                            layout: 'fit',
                            width: 500,
                            height: 120,
                            items:[me.myupload],
                            modal:true
                        });
                        me.GridShow.show();
                    }
                },
                {
                    xtype: 'button',
                    text: _('ar_add_billing'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['project_name',_('project')],['unit_building_name',_('unit_building')],['doc_id',_('document')],['cust_name',_('customer')],['coa_add_billing',_('account')],['remarks',_('remarks')],['receivable',_('total')], ['tax_id',_('tax')], ['tax_no',_('tax')+' No'],['qty',_('quantity')],['userinput',_('input_user')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {doc_type:'A', field_name:me.field_name, field_search:field.value};
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
    onNewData: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        me.formEditing.context.record.data.project_type = 'N';
        me.formEditing.context.record.data.doc_type = 'A';
       // plugin.editor.form.findField('project_type').setValue('N');
        plugin.editor.form.findField('tax_date').setValue(new Date());
        plugin.editor.form.findField('doc_date').setValue(new Date());
        plugin.editor.form.findField('due_date').setValue(new Date());
        me.jurnal.store.load();
    },
    get_total:function(field){
        var me=this, container  = field.up('fieldset'), ppn=0, pph=0, sc=0,//fieldset
            textfield = container.items.items[0].items,
            qty = textfield.items[0].items.items[0],
            tax = textfield.items[1].items.items[0],
            price = textfield.items[3].items.items[0],// harga
            price_sc = textfield.items[3].items.items[1],// harga
            price_ppn = textfield.items[4].items.items[0],// harga ppn
            price_pph = textfield.items[4].items.items[1],// harga ppn
            total_price = textfield.items[4].items.items[2],// harga ppn
            total = textfield.items[5].items.items[0]; // total
        me.tax.store.proxy.extraParams = {field_name:'tax_id',field_search:tax.getValue()};
        me.tax.store.load({
            callback: function(records, operation, success) {
                ppn = records[0].data.rate_ppn;
                pph = records[0].data.rate_pph;
                sc = records[0].data.rate_sc;
                price_sc.setValue(price.getValue()* (sc/100));
                price_ppn.setValue(price.getValue()* (ppn/100));
                price_pph.setValue(price.getValue()* (pph/100));
                total_price.setValue(price.getValue() + price_sc.getValue() + price_ppn.getValue() - price_pph.getValue());
                total.setValue(total_price.getValue() * qty.getValue());
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
        this.store.proxy.extraParams = {doc_type:'A'};
        this.store.load();
        callback(true);
    }
});
