Ext.define('App.view.transactions.marketing.Registration_unit_change', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('registration_unit_change'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store_detail_ci = Ext.create('App.store.transactions.marketing.Registration_unit_ci_change');

        me.tax = Ext.create('App.view.master.Tax');
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
            plugins:[
                me.formEditingCi = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit:1,
                    enablePrint : true,
                    enablePrintFn : voucher_report.ci_form_report,
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
                                                            readOnly: true,
                                                            emptyText: i18n('docdate'),
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
                                                            xtype: 'xtunitbuildingci',
                                                            editable: false,
                                                            readOnly: true,
                                                            name: 'unit_building_id',
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
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
                                                            defaults: {xtype: "radio",name: "doc_type",  readOnly: true},
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
                                                            readOnly: true,
                                                            mode:'local',
                                                            store: ['Walkin','Company Account','Compliment'],
                                                            emptyText: i18n('category'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none; text-align:right;'
                                                        },
                                                        {
                                                            width: 230,
                                                            fieldLabel: _('room_service'),
                                                            xtype: 'combo',
                                                            name: 'room_service',
                                                            readOnly: true,
                                                            mode:'local',
                                                            store: ['Room Only','Include BB'],
                                                            emptyText: i18n('room_service'),
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
                                                    items: [
                                                        {
                                                            width: 250,
                                                            fieldLabel: _('price'),
                                                            xtype: 'mitos.currency',
                                                            name: 'price_brutto',
                                                            allowBlank:false,
                                                            readOnly: true,
                                                            emptyText: i18n('price'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none; text-align:right;'
                                                        },
                                                        {
                                                            width: 200,
                                                            xtype: 'combo',
                                                            editable: false,
                                                            name: 'room_service',
                                                            mode:'local',
                                                            readOnly: true,
                                                            value:'Include BB',
                                                            store: ['Room Only','Include BB'],
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
                                                    fieldLabel: _('voucher_value'),
                                                    items: [
                                                        {
                                                            width: 200,
                                                            xtype: 'textfield',
                                                            name: 'voucher_id',
                                                            readOnly: true,
                                                            emptyText: i18n('voucher'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            width: 100,
                                                            xtype: 'mitos.currency',
                                                            name: 'voucher_value',
                                                            readOnly: true,
                                                            emptyText: i18n('voucher_value'),
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
                                                    fieldLabel: _('tax'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xttax',
                                                            editable: false,
                                                            name: 'tax_id',
                                                            readOnly: true,
                                                            emptyText: i18n('id'),
                                                            extraParams:'O',
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
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
                                                            enableKeyEvents: true
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
                                                            readOnly: true,
                                                            emptyText: i18n('date'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            width: 200,
                                                            fieldLabel: _('end_date'),
                                                            xtype : 'datefield',
                                                            editable: false,
                                                            name: 'end_rent',
                                                            format : 'Y-m-d',
                                                            minValue : new Date(),
                                                            emptyText: i18n('end_date')
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
                {text: _('project'),width: 100,sortable: true,dataIndex: 'project_name'},
                {text: _('document'),width: 120,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('customer'),flex: 1,sortable: true,dataIndex: 'cust_name'},
                {text: _('unit_building'),width: 80,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('cluster'),width: 100,sortable: true,dataIndex: 'cluster_name'},
                {text: _('building_type'),width: 100,sortable: true,dataIndex: 'building_name'},
                {text: _('area')+' m2',width: 100,sortable: true,dataIndex: 'area_m2',align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('price'),width: 100,sortable: true,dataIndex: 'price', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'total', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['unit_building_name',_('unit_building')],['cust_name',_('customer')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                            me.store_detail_ci.proxy.extraParams = {field_name:me.field_name, field_search:field.value};
                            me.store_detail_ci.loadPage(1);}}
                    }
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.store_detail_ci,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[me.grid_detail_ci],
            listeners: {
                render: function() {
                    this.items.each(function(i, index, items){
                        i.tab.on('click', function(){
                            i.store.load()
                        });
                    });
                }
            }
        });
        me.pageBody = [ me.FormulirPanel ];
        me.callParent(arguments);
    },
    get_total:function(field){
        var me=this, form  = field.up('container'), panel = form.up('panel'),
            qty = Ext.ComponentQuery.query('[name=qty]', panel)[0],//panel.ownerCt.form.findField('qty'),
            tax_id = Ext.ComponentQuery.query('[name=tax_id]', panel)[0],//panel.ownerCt.form.findField('tax_id'),// tax
            price = Ext.ComponentQuery.query('[name=price]', panel)[0],//panel.ownerCt.form.findField('price'),// harga
            price_ppn = Ext.ComponentQuery.query('[name=price_ppn]', panel)[0],//panel.ownerCt.form.findField('price_ppn'),// harga ppn
            price_pph = Ext.ComponentQuery.query('[name=price_pph]', panel)[0],//panel.ownerCt.form.findField('price_pph'),// harga pph
            total_price = Ext.ComponentQuery.query('[name=total_price]', panel)[0],//panel.ownerCt.form.findField('total_price'),// harga ppn
            total = Ext.ComponentQuery.query('[name=total]', panel)[0],//panel.ownerCt.form.findField('total'),
            advance_value = Ext.ComponentQuery.query('[name=advance_value]', panel)[0],//panel.ownerCt.form.findField('advance_value'),
            installment_advance = Ext.ComponentQuery.query('[name=installment_advance]', panel)[0],//panel.ownerCt.form.findField('installment_advance'),
            outstanding_value = Ext.ComponentQuery.query('[name=outstanding_value]', panel)[0];//panel.ownerCt.form.findField('outstanding_value'); // total
        if(advance_value.getValue() > 0){
            installment_advance.setReadOnly(false);
        }else{
            if(installment_advance){
                installment_advance.setReadOnly(true); installment_advance.setValue(1)
            }
        }
        me.tax.store.proxy.extraParams = {field_name:'tax_id',field_search:tax_id.getValue()};
        me.tax.store.load({
            callback: function(records, operation, success) {
                ppn = records[0].data.rate_ppn;
                pph = records[0].data.rate_pph;
                price_ppn.setValue(price.getValue() * (ppn/100));
                price_pph.setValue(price.getValue() * (pph/100));
                total_price.setValue(price.getValue() + price_ppn.getValue() - price_pph.getValue());
                total.setValue(total_price.getValue() * qty.getValue());
            }
        });
        if(outstanding_value){outstanding_value.setValue(total.getValue()-advance_value.getValue());}

    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */

    onActive: function(callback){
        //this.store_unit_sales.load();  this.store_unit_rent.load();
        this.store_detail_ci.load();
        callback(true);
    }
});
