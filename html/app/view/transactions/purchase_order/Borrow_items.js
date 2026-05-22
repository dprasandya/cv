
Ext.define('App.view.transactions.purchase_order.Borrow_items', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('borrow_items'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.purchase_order.Borrow_items',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
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
                                                    fieldLabel: _('project'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'projecttypecombo',
                                                            name: 'project_type',
                                                            readOnly: true,
                                                            emptyText: i18n('type')
                                                        },
                                                        {
                                                            width: 100,
                                                            xtype: 'projectcombo',
                                                            name: 'project_id',
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
                                                            store: [['I',_('in')],['O',_('out')]],
                                                            emptyText   : _('type'),
                                                            allowBlank:false,
                                                            listeners:{
                                                                change:function(field){
                                                                    var container = field.up('container'), panel = container.up('panel'),
                                                                        vend_id = panel.ownerCt.form.findField('vend_id'),
                                                                        vend_name = panel.ownerCt.form.findField('vend_name'),
                                                                        cust_id = panel.ownerCt.form.findField('cust_id'),
                                                                        cust_name = panel.ownerCt.form.findField('cust_name'),
                                                                        total_price = panel.ownerCt.form.findField('total_price');
                                                                    if(field.value=='I'){
                                                                        vend_id.setDisabled(false); vend_name.setDisabled(false);
                                                                        cust_id.setDisabled(true); cust_name.setDisabled(true);
                                                                        total_price.setDisabled(false);
                                                                    }else if(field.value=='O'){
                                                                        vend_id.setDisabled(true); vend_name.setDisabled(true);
                                                                        cust_id.setDisabled(false); cust_name.setDisabled(false);
                                                                        total_price.setDisabled(true);
                                                                    }
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
                                                    fieldLabel: _('supplier'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtsupplier',
                                                            editable: false,
                                                            name: 'vend_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('id'),
                                                            extraParams:'S'
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
                                                    fieldLabel: _('customer'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtcustomer',
                                                            editable: false,
                                                            name: 'cust_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('customer'),
                                                            extraParams:['C']
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
                                                    items: [
                                                        {
                                                            width: 200,
                                                            fieldLabel: _('warehouse'),
                                                            xtype: 'warehousecombo',
                                                            name: 'warehouse_id',
                                                            allowBlank:false,
                                                            editable: false,
                                                            emptyText: i18n('id')

                                                        },
                                                        {
                                                            width: 250,
                                                            xtype : 'typescombo',
                                                            extraParams: ['FG','RM','RA'],
                                                            fieldLabel: _('type'),
                                                            name: 'item_type',
                                                            emptyText: i18n('type'),
                                                            allowBlank:false,
                                                            listeners:{
                                                                change:function(field){
                                                                    var container = field.up('container'), panel = container.up('panel'),
                                                                        item_id = panel.ownerCt.form.findField('item_id');
                                                                    item_id.extraParams = [field.value];
                                                                }
                                                            }

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
                                                    fieldLabel: _('item'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtitems',
                                                            name: 'item_id',
                                                            editable: false,
                                                            emptyText: i18n('id'),
                                                            extraParams :['FG','RM','RA']
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
                                                    fieldLabel: _('costcode'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'textfield',
                                                            editable: false,
                                                            name: 'costcode_id',
                                                            readOnly: true,
                                                            emptyText: i18n('id'),
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
                                                            width: 100,
                                                            xtype: 'mitos.currency',
                                                            name: 'total_price',
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
                                                            width: 130,
                                                            xtype: 'mitos.currency',
                                                            name: 'total',
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
                        },me.jurnal.grid
                    ]
                })
            ],
            columns: [
                {text: _('project'),width: 100,sortable: true,dataIndex: 'project_name'},
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('type'),width: 80,sortable: true,dataIndex: 'doc_type', renderer: function (value, meta, record, rowIndex, colIndex, store) {
                        return record.data.doc_type == 'I' ? _('in') :_('out');
                    }},
                {text: _('supplier') +' / '+_('customer'),width: 150,sortable: true,dataIndex: 'vend_cust_name'},
                {text: _('item'),width: 150,sortable: true,dataIndex: 'item_name'},
                {text: _('quantity'),width: 100,sortable: true,dataIndex: 'qty', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('price'),width: 100,sortable: true,dataIndex: 'total_price', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('subtotal'),width: 100,sortable: true,dataIndex: 'total', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('borrow_items'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['project_name',_('project')],['costcode_name',_('costcode')],['doc_id',_('document')],['vend_name',_('supplier')],['cust_name',_('customer')],['item_name',_('item')],['qty',_('quantity')],['total',_('subtotal')],['remarks',_('remarks')],['userinput',_('input_user')]],
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
    onNewUser: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        plugin.editor.form.findField('doc_date').setValue(new Date());
        plugin.editor.form.findField('due_date').setValue(new Date());
        plugin.editor.form.findField('project_type').setValue('P');
        me.jurnal.store.load();
    },
    get_total:function(field){
      var me=this, container = field.up('container'), panel = container.up('panel'),
          qty  = panel.ownerCt.form.findField('qty'),
          total_price = panel.ownerCt.form.findField('total_price'),
          total = panel.ownerCt.form.findField('total');
        total.setValue(qty.getValue()*total_price.getValue());

    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.store.proxy.extraParams = {};
        this.store.load();
        callback(true);
    }
});
