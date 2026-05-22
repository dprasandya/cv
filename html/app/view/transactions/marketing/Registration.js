
Ext.define('App.view.transactions.marketing.Registration', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('registration'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.marketing.Registration',{remoteSort: true,  pageSize : 20,  autoLoad: false});
        me.store_detail_ci = Ext.create('App.store.transactions.marketing.Registration_unit_ci');
        me.store_detail_ci_advance = Ext.create('App.store.transactions.marketing.Registration_unit_ci_advance');
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');
        me.detail_ci_billing = Ext.create('App.view.transactions.marketing.Registration_unit_co');

        me.tax = Ext.create('App.view.master.Tax');

        me.grid_detail_ci_advance = Ext.create('Ext.grid.Panel', {
            store: me.store_detail_ci_advance,
            height: 1000,
            autoScroll: true,
            title: _('advance'),
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_detail_ci_advance.down('toolbar');
                    useredit.items.items[2].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.jurnal.store.load({params:{doc_id:record.data.doc_id}});
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
                me.formEditingCiAdvance = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
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
                                                    fieldLabel: _('customer'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtcustomer',
                                                            editable: false,
                                                            name: 'cust_id',
                                                            readOnly:true,
                                                            emptyText: i18n('id'),
                                                            extraParams:['C'],
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'cust_name',
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
                                                    fieldLabel: 'Bank',
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
                                                    fieldLabel: _('payment_amount'),
                                                    items: [

                                                        {
                                                            width: 150,
                                                            xtype: 'mitos.currency',
                                                            name: 'nominal',
                                                            emptyText: i18n('subtotal')
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
                                                            extraParams:'O',
                                                            readOnly: true,
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
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
                                }
                            ]
                        },
                        me.jurnal.grid
                    ]
                })
            ],
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('customer'),width: 150,sortable: true,dataIndex: 'cust_name'},
                {text: _('cashbank'),width: 150,sortable: true,dataIndex: 'cash_name'},
                {text: _('payment_amount'),width: 100,sortable: true,dataIndex: 'nominal', align:'right',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                        var returnString = record.data.nominal + record.data.total_ppn - record.data.total_pph ;
                        return Ext.util.Format.number(returnString, '0,000.00');
                    }},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('advance'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewDataCi_Advance
                },'->',
                {
                    xtype: 'label'
                }
            ]
        });
        me.grid_detail_ci = Ext.create('Ext.grid.Panel', {
            store: me.store_detail_ci,
            title: _('unit_building_ci'),
            height: 1000,
            autoScroll:false,
            viewConfig :
                {
                    stripeRows: false,
                    getRowClass: function(record, index) {
                        return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                    }
                },
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_detail_ci.down('toolbar'); me.data = record.data;
                    useredit.items.items[2].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.detail_ci_billing.store_detail.proxy.extraParams = {registration_id:record.data.registration_id, doc_id:record.data.doc_id, cust_id:record.data.cust_id, unit_building_id:record.data.unit_building_id};
                    me.detail_ci_billing.store_detail.load();
                    me.jurnal.store.load({params:{doc_id:me.data.doc_id}});
                    me.grid_detail_tab.setActiveTab(0);
                }
            },
            plugins:[
                me.formEditingCi = Ext.create('App.ux.grid.RowFormEditing', {
                    enableRemove : true,
                    clicksToEdit:1,
                    enablePrint : true,
                    enablePrintFn : voucher_report.ci_form_report,
                    items: [
                        me.grid_detail_tab = Ext.create('Ext.tab.Panel', {
                            activeTab:0,
                            items: [
                                {
                                    xtype:'panel',
                                    title: _('unit_building_ci'),
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
                                                                    minValue : new Date(),
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
                                                            fieldLabel: _('unit_building'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xtunitbuildingci',
                                                                    editable: false,
                                                                    name: 'unit_building_id',
                                                                    allowBlank:false,
                                                                    emptyText: i18n('id'),
                                                                    listeners:{
                                                                        change:function(field, e){
                                                                            me.get_total_ci(field);
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    width: 250,
                                                                    xtype: 'textfield',
                                                                    readOnly: true,
                                                                    name: 'unit_building_name',
                                                                    emptyText: i18n('name'),
                                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                                },
                                                                {
                                                                    width: 50,
                                                                    xtype: 'numberfield',
                                                                    editable: false,
                                                                    name: 'pax',
                                                                    allowBlank:false,
                                                                    minValue:1,
                                                                    emptyText: 'Pax'
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
                                                                    xtype: "radiogroup",
                                                                    width:400,
                                                                    defaults: {xtype: "radio",name: "doc_type"},
                                                                    items: [
                                                                        {
                                                                            boxLabel: "W/I",
                                                                            inputValue: "W/I",
                                                                            checked: true
                                                                        },
                                                                        {
                                                                            boxLabel: "TRAVEL AGENT",
                                                                            inputValue: "TRAVEL AGENT"
                                                                        },
                                                                        {
                                                                            boxLabel: "COMPANY RATE",
                                                                            inputValue: "COMPANY RATE"
                                                                        }
                                                                    ]
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
                                                            fieldLabel: _('room_type'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xtroom_type',
                                                                    readOnly: true,
                                                                    name: 'rt_id',
                                                                    emptyText: i18n('id'),
                                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                                },
                                                                {
                                                                    width: 280,
                                                                    xtype: 'textfield',
                                                                    readOnly: true,
                                                                    name: 'rt_name',
                                                                    emptyText: i18n('name'),
                                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                                }

                                                            ]
                                                        },

                                                        /* {
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
                                                                     readOnly: true,
                                                                     name: 'rs_id',
                                                                     emptyText: i18n('room_status'),
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
                                                                    width: 230,
                                                                    fieldLabel: _('category'),
                                                                    xtype: 'combo',
                                                                    name: 'category',
                                                                    editable:false,
                                                                    allowBlank: false,
                                                                    mode:'local',
                                                                    store: ['Walkin','Company Account','Compliment'],
                                                                    emptyText: i18n('category'),
                                                                    listeners:{
                                                                        change:function(f){
                                                                            var plugin = me.grid_detail_ci.editingPlugin,
                                                                            price_brutto = plugin.editor.form.findField('price_brutto');
                                                                            if(f.value!='Compliment'){
                                                                                price_brutto.setMinValue(1);
                                                                            }else{
                                                                                price_brutto.setMinValue(0);
                                                                            }
                                                                        }
                                                                    }

                                                                },
                                                                {
                                                                    width: 230,
                                                                    fieldLabel: _('room_service'),
                                                                    xtype: 'combo',
                                                                    editable:false,
                                                                    name: 'room_service',
                                                                    allowBlank: false,
                                                                    mode:'local',
                                                                    store: ['Room Only','Include BB'],
                                                                    emptyText: i18n('room_service')
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
                                                                    fieldLabel: _('price'),
                                                                    xtype: 'mitos.currency',
                                                                    name: 'price_brutto',
                                                                    allowBlank:false,
                                                                    emptyText: i18n('price'),
                                                                    enableKeyEvents: true,
                                                                    listeners:{
                                                                        keyup:function(field, e){
                                                                            me.get_total_ci(field);
                                                                        },
                                                                        change:function(field, e){
                                                                            me.get_total_ci(field);
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
                                                            fieldLabel: _('voucher_value'),
                                                            items: [
                                                                {
                                                                    width: 200,
                                                                    xtype: 'textfield',
                                                                    name: 'voucher_id',
                                                                    emptyText: i18n('voucher')
                                                                },
                                                                {
                                                                    width: 100,
                                                                    xtype: 'mitos.currency',
                                                                    name: 'voucher_value'
                                                                    /*emptyText: i18n('voucher_value'),
                                                                    enableKeyEvents: true,
                                                                    listeners:{
                                                                        keyup:function(field, e){
                                                                            me.get_total_ci(field);
                                                                        }
                                                                    }*/
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
                                                                            me.get_total_ci(field);
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
                                                            items: [
                                                                {
                                                                    width: 200,
                                                                    fieldLabel: _('quantity'),
                                                                    xtype: 'mitos.currency',
                                                                    name: 'qty',
                                                                    allowBlank:false,
                                                                    hidden: true,
                                                                    emptyText: i18n('quantity'),
                                                                    enableKeyEvents: true,
                                                                    listeners:{
                                                                        keyup:function(field, e){
                                                                            me.get_total_ci(field);
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    width: 250,
                                                                    fieldLabel: 'Net '+_('price'),
                                                                    xtype: 'mitos.currency',
                                                                    name: 'price',
                                                                    allowBlank:false,
                                                                    readOnly:true,
                                                                    emptyText: i18n('price'),
                                                                    fieldStyle:'background-color: #F2F3F4; background-image: none; text-align:right;'
                                                                },
                                                                {
                                                                    width: 200,
                                                                    fieldLabel: _('service_charge'),
                                                                    xtype: 'mitos.currency',
                                                                    name: 'price_sc',
                                                                    readOnly:true,
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
                                                                    name: 'total',
                                                                    readOnly: true,
                                                                    emptyText: i18n('total'),
                                                                    fieldStyle:'font-weight: bold; text-align:right; background-color: #F2F3F4; background-image: none;'
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
                                                                    fieldLabel: _('start_date'),
                                                                    xtype : 'datefield',
                                                                    editable: false,
                                                                    name: 'start_rent',
                                                                    format : 'Y-m-d',
                                                                    allowBlank:false,
                                                                    minValue : new Date(),
                                                                    emptyText: i18n('date')
                                                                },
                                                                {
                                                                    width: 200,
                                                                    fieldLabel: _('end_date'),
                                                                    xtype : 'datefield',
                                                                    editable: false,
                                                                    name: 'end_rent',
                                                                    format : 'Y-m-d',
                                                                    allowBlank:false,
                                                                    minValue : new Date(),
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
                                }, me.detail_ci_billing.grid_detail
                            ]
                        })

                    ]
                })
            ],
            columns: [
                {text: _('project'),width: 100,sortable: true,dataIndex: 'project_name'},
                {text: _('unit_building'),flex: 1,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('cluster'),width: 100,sortable: true,dataIndex: 'cluster_name'},
                {text: _('building_type'),width: 100,sortable: true,dataIndex: 'building_name'},
                {text: _('area')+' m2',width: 100,sortable: true,dataIndex: 'area_m2',align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'),summaryRenderer: function(){return '<b>Total</b>';}},
                //{text: _('quantity'),width: 100,sortable: true,dataIndex: 'qty', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('price'),width: 100,sortable: true,dataIndex: 'price', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'total', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('outstanding'),width: 100,sortable: true,dataIndex: 'outstanding_receivable', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')}
                //{text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'}
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
                    handler: me.onNewDetailCI
                },'->',
                {
                    xtype: 'label'
                }
            ]
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar'); me.data_regist = record.data;
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.grid.editingPlugin.editor.form.findField('identity_no_old').setValue(record.data.identity_no);
                    me.registration_id = record.get('registration_id');
                    //me.store_detail_sale.proxy.extraParams = {registration_id: me.registration_id};
                    //me.store_detail_sale.load();
                    me.grid_tab.setActiveTab(0);
                    me.grid_detail_ci.setDisabled(false);
                    me.grid_detail_ci_advance.setDisabled(false);
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
                        me.grid_tab = Ext.create('Ext.tab.Panel', {
                            activeTab:0,
                            items: [
                                {
                                    xtype: 'panel',
                                    title: _('registration'),
                                    items: [
                                        {
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
                                                                    fieldLabel: _('salesman'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'xtsalesman',
                                                                            editable: false,
                                                                            name: 'sales_id',
                                                                            allowBlank: false,
                                                                            emptyText: i18n('id')
                                                                        },
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            name: 'sales_name',
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
                                                                    fieldLabel: _('identity'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'combo',
                                                                            editable: false,
                                                                            name: 'identity_type',
                                                                            allowBlank: false,
                                                                            emptyText: i18n('type'),
                                                                            mode:'local',
                                                                            store: [['KTP','KTP'],['SIM','SIM'],['PASPORT','PASPORT']]

                                                                        },
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            name: 'identity_no',
                                                                            allowBlank: false,
                                                                            emptyText: i18n('no')
                                                                        },
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            hidden: true,
                                                                            name: 'identity_no_old',
                                                                            emptyText: i18n('no')
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
                                                                    fieldLabel: _('name'),
                                                                    items: [
                                                                        {
                                                                            width: 150,
                                                                            xtype: 'textfield',
                                                                            name: 'first_name',
                                                                            emptyText: i18n('first_name')
                                                                        },
                                                                        {
                                                                            width: 150,
                                                                            xtype: 'textfield',
                                                                            name: 'last_name',
                                                                            emptyText: i18n('last_name')
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
                                                                            fieldLabel: _('gender'),
                                                                            xtype: 'combo',
                                                                            editable: false,
                                                                            name: 'gender',
                                                                            emptyText: i18n('gender'),
                                                                            mode:'local',
                                                                            store: [['M',_('male')],['F',_('female')]]
                                                                        },
                                                                        {
                                                                            width: 200,
                                                                            fieldLabel: _('blood'),
                                                                            xtype: 'combo',
                                                                            editable: false,
                                                                            name: 'blood_type',
                                                                            emptyText: i18n('blood'),
                                                                            mode:'local',
                                                                            store: ['O','A','B','AB']
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
                                                                            fieldLabel: _('marital_status'),
                                                                            xtype: 'combo',
                                                                            editable: false,
                                                                            name: 'merriage_status',
                                                                            emptyText: i18n('marital_status'),
                                                                            mode:'local',
                                                                            store: [['S',_('single')],['M',_('merriage')]]
                                                                        },
                                                                        {
                                                                            width: 200,
                                                                            fieldLabel: _('religion'),
                                                                            xtype: 'combo',
                                                                            editable: false,
                                                                            name: 'religion',
                                                                            emptyText: i18n('religion'),
                                                                            mode:'local',
                                                                            store: [['M','Muslem'],['P','Protestan'],['B','Buddha'],['N','Nasrani'],['H','Hindu']]
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
                                                                            fieldLabel: _('nationality'),
                                                                            xtype: 'textfield',
                                                                            name: 'nationality',
                                                                            emptyText: i18n('nationality')
                                                                        },
                                                                        {
                                                                            width: 200,
                                                                            fieldLabel: _('city'),
                                                                            xtype: 'textfield',
                                                                            name: 'city',
                                                                            emptyText: i18n('city')
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
                                                                    fieldLabel: _('address'),
                                                                    items: [
                                                                        {
                                                                            width: 380,
                                                                            xtype: 'textfield',
                                                                            name: 'address',
                                                                            emptyText: i18n('address')
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
                                                                            fieldLabel: _('home_phone'),
                                                                            xtype: 'textfield',
                                                                            name: 'home_phone',
                                                                            emptyText: i18n('home_phone')
                                                                        },
                                                                        {
                                                                            width: 200,
                                                                            fieldLabel: _('mobile_phone'),
                                                                            xtype: 'textfield',
                                                                            name: 'mobile_phone',
                                                                            emptyText: i18n('mobile_phone')
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
                                                                    fieldLabel: _('company'),
                                                                    items: [
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            name: 'cust_name',
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
                                                                            fieldLabel: _('contact'),
                                                                            xtype: 'textfield',
                                                                            name: 'cust_contact',
                                                                            emptyText: i18n('contact')
                                                                        },
                                                                        {
                                                                            width: 250,
                                                                            fieldLabel: 'NPWP',
                                                                            xtype: 'textfield',
                                                                            name: 'cust_npwp',
                                                                            emptyText: i18n('npwp')
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
                                }, me.grid_detail_ci, me.grid_detail_ci_advance
                            ],
                            listeners: {
                                render: function() {
                                    this.items.each(function(i, index, items){
                                        i.tab.on('click', function(){
                                            if(index>0){
                                                i.store.proxy.extraParams = {registration_id: me.data_regist.registration_id, cust_id:me.data_regist.identity_no};
                                                i.store.load();
                                            }
                                        });
                                    });
                                }
                            }
                        })

                    ]
                })
            ],
            columns: [
                {text: _('no'),width: 50,sortable: true,dataIndex: 'registration_id'},
                {text: _('identity'),width: 100,sortable: true,dataIndex: 'identity_no'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'full_name'},
                {text: _('gender'),width: 80,sortable: true,dataIndex: 'gender'},
                {text: _('mobile_phone'),width: 100, align:'right', sortable: true,dataIndex: 'mobile_phone'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('registration'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['registration_id',_('no')],['identity_no',_('identity')],['full_name',_('name')],['cust_name',_('customer')],['mobile_phone',_('mobile_phone')],['remarks',_('remarks')]],
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
        plugin.editor.form.findField('sales_id').setValue('NA');
        plugin.editor.form.findField('sales_name').setValue('Not Applicable');
        me.grid_detail_ci_advance.setDisabled(true);
        me.grid_detail_ci.setDisabled(true);
    },
    onNewDataCi_Advance: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        //me.formEditingCiAdvance.context.record.data.for_doc_id = me.data.doc_id;
        me.formEditingCiAdvance.context.record.data.doc_type = 'U';
        plugin.editor.form.findField('tax_id').setValue('NT02');
        plugin.editor.form.findField('tax_date').setValue(new Date());
        plugin.editor.form.findField('doc_date').setValue(new Date());
        //plugin.editor.form.findField('unit_building_id').setValue(me.data.unit_building_id);
        //plugin.editor.form.findField('unit_building_name').setValue(me.data.unit_building_name);
        plugin.editor.form.findField('cust_id').setValue(me.data_regist.identity_no);
        plugin.editor.form.findField('cust_name').setValue(me.data_regist.full_name);
        me.jurnal.store.load();
    },
    onNewDetail:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        if(plugin.editor.form.findField('start_billing')){plugin.editor.form.findField('start_billing').setValue(new Date());}
        if(plugin.editor.form.findField('start_rent')){plugin.editor.form.findField('start_rent').setValue(new Date());}
        if(plugin.editor.form.findField('end_rent')){plugin.editor.form.findField('end_rent').setValue(new Date());}

        plugin.editor.form.findField('qty').setValue(1);
        plugin.editor.form.findField('tax_id').setValue('PK100');
        if(plugin.editor.form.findField('start_billing')){me.formEditingSale.context.record.data.registration_id = me.data_regist.registration_id;}
        if(plugin.editor.form.findField('start_rent')){me.formEditingRent.context.record.data.registration_id = me.data_regist.registration_id;}
        
    },
    onNewDetailCI:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        if(plugin.editor.form.findField('start_billing')){plugin.editor.form.findField('start_billing').setValue(new Date());}
        if(plugin.editor.form.findField('start_rent')){plugin.editor.form.findField('start_rent').setValue(new Date());}
        if(plugin.editor.form.findField('end_rent')){plugin.editor.form.findField('end_rent').setValue(new Date());}
        if(plugin.editor.form.findField('doc_date')){plugin.editor.form.findField('doc_date').setValue(new Date());}
        if(plugin.editor.form.findField('category')){plugin.editor.form.findField('category').setValue('Walkin');}

        plugin.editor.form.findField('qty').setValue(1);
        plugin.editor.form.findField('pax').setValue(2);  //plugin.editor.form.findField('room_service').setValue('Include BB');
        plugin.editor.form.findField('tax_id').setValue('PK101');
        me.formEditingCi.context.record.data.registration_id = me.data_regist.registration_id;
        me.grid_detail_tab.setActiveTab(0);
        me.detail_ci_billing.store_detail.load({params:{doc_id:''}});
    },
    get_total_ci:function(field){
        var me=this, plugin = me.grid_detail_ci.editingPlugin,
            qty = plugin.editor.form.findField('qty'),
            tax_id = plugin.editor.form.findField('tax_id'),// tax
            price_brutto = plugin.editor.form.findField('price_brutto'),// harga brutto
           // voucher_value = plugin.editor.form.findField('voucher_value'),// nominal voucher
            price = plugin.editor.form.findField('price'),// harga
            price_ppn = plugin.editor.form.findField('price_ppn'),// harga ppn
            price_pph = plugin.editor.form.findField('price_pph'),// harga pph
            price_sc = plugin.editor.form.findField('price_sc'),// harga pph
            total_price = plugin.editor.form.findField('total_price'),// harga ppn
            total = plugin.editor.form.findField('total');
        //price.setValue(price_brutto.getValue()-voucher_value.getValue());
        price.setValue(price_brutto.getValue());
        me.tax.store.proxy.extraParams = {field_name:'tax_id',field_search:tax_id.getValue()};
        me.tax.store.load({
            callback: function(records, operation, success) {
                ppn = records[0].data.rate_ppn;
                pph = records[0].data.rate_pph;
                sc = records[0].data.rate_sc;
                price_ppn.setValue(price.getValue() * (ppn/100));
                price_pph.setValue(price.getValue() * (pph/100));
                price_sc.setValue(price.getValue() * (sc/100));
                total_price.setValue(price.getValue() + price_ppn.getValue()  + price_sc.getValue() - price_pph.getValue());
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
        var me = this;
        me.store.load();
        callback(true);
    }
});
