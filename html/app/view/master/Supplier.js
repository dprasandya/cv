
Ext.define('App.view.master.Supplier', {
    extend: 'App.ux.RenderPanel',
    id: 'panelSupplier',
    pageTitle: _('supplier'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'co_id', type:'string'},
                    {name:'vend_id', type:'string'},
                    {name:'vend_type', type:'string'},
                    {name:'vend_name', type:'string'},
                    {name:'contact', type:'string'},
                    {name:'phone', type:'string'},
                    {name:'city', type:'string'},
                    {name:'address', type:'string'},
                    {name:'remarks', type:'string'},
                    {name:'coa_id', type:'string'},
                    {name:'coa_advance', type:'string'},
                    {name:'coa_grn', type:'string'},
                    {name:'coa_cashbon', type:'string'},
                    {name:'active', type:'bool'},
                    {name:'userinput', type:'string'},
                    {name:'useredit', type:'string'},
                    {name:'timeedit', type:'date'}

                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: Supplier.select,
                        create: Supplier.add,
                        update: Supplier.update,
                        destroy: Supplier.delete
                    },
                    reader :{
                        root: 'rows',
                        totalProperty: 'totals'
                    }
                }
            });
        me.store = Ext.create('Ext.data.Store',{model: me.model ,remoteSort: true});
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            plugins: [
            me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                clicksToEdit: 1,
                enableRemove : true,
                items: [
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'fieldset',
                                title: _('supplier'),
                                defaultType: 'textfield',
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
                                                fieldLabel: _('id'),
                                                items: [
                                                    {
                                                        width: 100,
                                                        xtype: 'textfield',
                                                        name: 'vend_id',
                                                        allowBlank: false,
                                                        emptyText: i18n('id')
                                                    },
                                                    {
                                                        width: 280,
                                                        xtype: 'textfield',
                                                        name: 'vend_name',
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
                                                fieldLabel: _('type'),
                                                items: [
                                                    {
                                                        xtype:'combo',
                                                        editable: false,
                                                        name: 'vend_type',
                                                        width:100,
                                                        mode:'local',
                                                        store: [['S','Supplier'],['T','Trucking'],['C','Cash Bon']]
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
                            },
                            {
                                xtype: 'fieldset',
                                title: _('account'),
                                defaultType: 'textfield',
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
                                                fieldLabel:  _('ap'),
                                                items: [
                                                    {
                                                        width: 100,
                                                        xtype: 'xtaccount',
                                                        name: 'coa_id',
                                                        emptyText: 'account liability'
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
                                                fieldLabel: _('goodsreceived'),
                                                items: [
                                                    {
                                                        width: 100,
                                                        xtype: 'xtaccount',
                                                        name: 'coa_grn',
                                                        emptyText: 'account goods received'
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
                                                fieldLabel: _('advance'),
                                                items: [
                                                    {
                                                        width: 100,
                                                        xtype: 'xtaccount',
                                                        name: 'coa_advance',
                                                        emptyText: 'account advance'
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
                                                fieldLabel: _('account')+' '+_('cashbon'),
                                                items: [
                                                    {
                                                        width: 100,
                                                        xtype: 'xtaccount',
                                                        name: 'coa_cashbon',
                                                        emptyText: 'cashbon'
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
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'vend_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'vend_name'},
                {text: _('type'),width: 80,sortable: true,dataIndex: 'vend_type', renderer: function (value, meta, record, rowIndex, colIndex, store) {
                    return record.data.vend_type == 'T' ? 'Trucking' : (record.data.vend_type == 'S' ? 'Supplier': 'Cash Bon');
                }},
                {text: _('city'),width: 100,sortable: true,dataIndex: 'city'},
                {text: _('ap'),width: 80,sortable: true,dataIndex: 'coa_id'},
                {text: _('goodsreceived'),width: 80,sortable: true,dataIndex: 'coa_grn'},
                {text: _('advance'),width: 80,sortable: true,dataIndex: 'coa_advance'},
                {text: _('cashbon'),width: 80,sortable: true,dataIndex: 'coa_cashbon'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('supplier'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['vend_id',_('id')],['vend_name',_('name')],['city',_('city')],['address',_('address')],['vend_type',_('type')]],
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
