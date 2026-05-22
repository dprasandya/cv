
Ext.define('App.view.master.Customer', {
    extend: 'App.ux.RenderPanel',
    id: 'panelCustomer',
    pageTitle: _('customer'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'co_id', type:'string'},
                    {name:'cust_id', type:'string'},
                    {name:'cust_name', type:'string'},
                    {name:'cust_type', type:'string'},
                    {name:'identity_type', type:'string'},
                    {name:'gender', type:'string'},
                    {name:'blood_type', type:'string'},
                    {name:'religion', type:'string'},
                    {name:'merriage_status', type:'string'},
                    {name:'city', type:'string'},
                    {name:'nationality', type:'string'},
                    {name:'address', type:'string'},
                    {name:'contact', type:'string'},
                    {name:'npwp', type:'string'},
                    {name:'home_phone', type:'string'},
                    {name:'mobile_phone', type:'string'},
                    {name:'remarks', type:'string'},
                    {name:'coa_id', type:'string'},
                    {name:'coa_name', type:'string'},
                    {name:'coa_sale', type:'string'},
                    {name:'coa_sale_name', type:'string'},
                    {name:'coa_advance', type:'string'},
                    {name:'coa_advance_name', type:'string'},
                    {name:'active', type:'bool'},
                    {name:'userinput', type:'string'},
                    {name:'useredit', type:'string'},
                    {name:'timeedit', type:'date'}

                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: Customer.select,
                        create: Customer.add,
                        update: Customer.update,
                        destroy: Customer.delete
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
                {name:'cust_id', type:'string'},
                {name:'seq_id', type:'integer'},
                {name:'contact', type:'string'},
                {name:'phone', type:'string'},
                {name:'city', type:'string'},
                {name:'address', type:'string'},
                {name:'remarks', type:'string'},
                {name:'active', type:'bool'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read: Customer.selectdetail,
                    create: Customer.adddetail,
                    update: Customer.updatedetail,
                    destroy: Customer.deletedetail
                },
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                }
            }
        });
        me.store = Ext.create('Ext.data.Store',{model: me.model ,remoteSort: true});
        me.store_detail = Ext.create('Ext.data.Store',{model: me.model_detail ,remoteSort: true});
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            height: 1000,
            title: _('address_book'),
            plugins: [
                me.formEditingDetail = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    title: _('address_book'),
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
                                                    fieldLabel: _('address'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'textfield',
                                                            name: 'city',
                                                            emptyText: i18n('city')
                                                        },
                                                        {
                                                            width: 280,
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
                                                    fieldLabel: _('contact_info'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'textfield',
                                                            name: 'contact',
                                                            emptyText: i18n('contact_info')
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'phone',
                                                            emptyText: i18n('phone')
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
                                                            name: 'active'
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
                {text: _('id'),width: 80,sortable: true,dataIndex: 'seq_id'},
                {text: _('city'),width: 100,sortable: true,dataIndex: 'city'},
                {text: _('address'),flex: 1,sortable: true,dataIndex: 'address'},
                {text: _('contact_info'),width: 100,sortable: true,dataIndex: 'contact'},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('address_book'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewDetail
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['seq_id',_('id')],['contact',_('contact_info')],['city',_('city')],['address',_('address')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_detail.proxy.extraParams = {field_name:me.field_name, field_search:field.value}; me.store_detail.load({params:{start:0}})}}}
                }
            ]
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
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
                                    title: _('customer'),
                                    items: [
                                        {
                                            layout: 'hbox',
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
                                                            fieldLabel: _('id'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'textfield',
                                                                    name: 'cust_id',
                                                                    allowBlank: false,
                                                                    emptyText: i18n('id')
                                                                },
                                                                {
                                                                    width: 280,
                                                                    xtype: 'textfield',
                                                                    name: 'cust_name',
                                                                    allowBlank: false,
                                                                    emptyText: i18n('name')
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
                                                                    width: 100,
                                                                    xtype: 'combo',
                                                                    name: 'cust_type',
                                                                    allowBlank: false,
                                                                    emptyText: i18n('type'),
                                                                    mode:'local',
                                                                    store: [['C',_('company')],['P',_('personal')]],
                                                                    listeners:{
                                                                        change:function(field, e){
                                                                            var form = field.up('container'), container = form.up('container'),
                                                                                identity_type = Ext.ComponentQuery.query('[name=identity_type]', form)[0],
                                                                                personal_data_customer = Ext.ComponentQuery.query('#personal_data_customer')[0];
                                                                            if(field.value=='P'){
                                                                                personal_data_customer.show(); identity_type.setDisabled(false);
                                                                            }else {personal_data_customer.hide(); identity_type.setDisabled(true);}
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    width: 100,
                                                                    xtype: 'combo',
                                                                    name: 'identity_type',
                                                                    allowBlank: false,
                                                                    emptyText: i18n('type'),
                                                                    mode:'local',
                                                                    store: [['KTP','KTP'],['SIM','SIM'],['PASPORT','PASPORT']]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'fieldcontainer',
                                                            fieldDefaults: {
                                                                labelAlign: 'right'
                                                            },
                                                            layout: {
                                                                type: 'vbox'
                                                            },
                                                            itemId:'personal_data_customer',
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
                                                                    width: 250,
                                                                    fieldLabel: _('contact'),
                                                                    xtype: 'textfield',
                                                                    name: 'contact',
                                                                    emptyText: i18n('contact')
                                                                },
                                                                {
                                                                    width: 250,
                                                                    fieldLabel: 'NPWP',
                                                                    xtype: 'textfield',
                                                                    name: 'npwp',
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
                                                                    name: 'active'
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
                                                            fieldLabel:_('ar'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xtaccount',
                                                                    name: 'coa_id',
                                                                    allowBlank: false,
                                                                    emptyText: i18n('account')
                                                                },
                                                                {
                                                                    width: 280,
                                                                    xtype: 'textfield',
                                                                    name: 'coa_name',
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
                                                            fieldLabel: _('income'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xtaccount',
                                                                    name: 'coa_sale',
                                                                    allowBlank: false,
                                                                    emptyText: i18n('account')
                                                                },
                                                                {
                                                                    width: 280,
                                                                    xtype: 'textfield',
                                                                    name: 'coa_sale_name',
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
                                                            fieldLabel:_('advance'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xtaccount',
                                                                    name: 'coa_advance',
                                                                    allowBlank: false,
                                                                    emptyText: i18n('account')
                                                                },
                                                                {
                                                                    width: 280,
                                                                    xtype: 'textfield',
                                                                    name: 'coa_advance_name',
                                                                    readOnly: true,
                                                                    emptyText: i18n('name'),
                                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
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
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.cust_id = record.data.cust_id;
                    me.store_detail.proxy.extraParams = {cust_id: record.data.cust_id};
                    me.store_detail.load({params:{cust_id:record.data.cust_id}});
                }
            },
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'cust_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'cust_name'},
                {text: _('city'),width: 100,sortable: true,dataIndex: 'city'},
                {text: _('address'),flex: 1,sortable: true,dataIndex: 'address'},
                {text: _('ar'),width: 80,sortable: true,dataIndex: 'coa_id'},
                {text: _('income'),width: 80,sortable: true,dataIndex: 'coa_sale'},
                {text: _('advance'),width: 80,sortable: true,dataIndex: 'coa_advance'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('customer'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['cust_id',_('id')],['cust_name',_('name')],['city',_('city')],['address',_('address')]],
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
                pageSize: 10,
                store: me.store,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.pageBody = [ me.grid ];
        me.callParent(arguments);
    },
    onNewUser: function(){
        var me = this;
        me.formEditing.cancelEdit();
        me.store.insert(0, {aktif: 1,authorized: 1});
        me.formEditing.startEdit(0, 0);
    },
    onNewDetail: function(){
        var me = this;
        me.formEditingDetail.cancelEdit();
        me.store_detail.insert(0, {aktif: 1,authorized: 1});
        me.formEditingDetail.startEdit(0, 0);
        me.formEditingDetail.context.record.data.cust_id = me.cust_id;
    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.store.proxy.extraParams={};
        this.store.load();
        callback(true);
    }
});
