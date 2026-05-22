
Ext.define('App.view.transactions.production.Work_order_letter', {
    extend: 'App.ux.RenderPanel',
    id: 'panelWork_order_letter',
    pageTitle: _('work_order_letter'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.production.Work_order_letter',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_detail = Ext.create('App.store.transactions.production.Work_order_letter_detail',{remoteSort: true, pageSize : 20});
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            height: 1000,
            autoScroll: true,
            title: _('detail'),
            plugins: [
                me.edditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false,
                    listeners: {
                        beforeedit: function(editor,e,opt){
                            if(me.status==1 || me.status==2){
                                return false;
                            }else{
                                var form   = editor.getEditor().form;
                                var cust_id  = form.findField('cust_id'),
                                    qty = form.findField('qty');
                                if(me.doc_type=='S'){
                                    cust_id.setReadOnly(true);  qty.setReadOnly(true);
                                }else{
                                    cust_id.setReadOnly(false); qty.setReadOnly(false);
                                }
                            }
                        }
                    }
                })
            ],
            columns: [
                {text: _('enabled?'),width: 60,sortable: true,dataIndex: 'aktif',renderer: me.boolRenderer,
                    editor:{
                        xtype:'checkbox'
                    }},
                {text: _('quantity'),width: 100,sortable: true,dataIndex: 'qty',summaryType:'sum', align:'right' ,renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    editor:{
                        xtype:'mitos.currency'
                    }},
                {text: _('no'),width: 40,sortable: true,dataIndex: 'seq_id'},
                {text: _('id'),width: 150,sortable: true,dataIndex: 'for_doc_id'},
                {text: _('customer'),width: 100,sortable: true,dataIndex: 'cust_id', editor:{
                    xtype:'xtcustomer'
                }},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'cust_name'},
                {text: _('items'),flex: 1,sortable: true,dataIndex: 'item_name'},
                {text: _('unit'),width: 80,sortable: true,dataIndex: 'unit_id'},
                {text: _('type'),width: 80,sortable: true,dataIndex: 'item_type'}
            ],
            features: [{
                ftype: 'summary'
            }],
            tbar :[
                {
                    xtype:'combo',
                    editable: false,
                    emptyText: 'Option',
                    width:100,
                    mode:'local',
                    store: [['for_doc_id',_('id')],['cust_name',_('name')],['cust_id',_('customer')],['item_name',_('items')],['unit_id',_('unit')],['item_type',_('type')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_detail.proxy.extraParams = {doc_id :me.doc_id, field_name:me.field_name, field_search:field.value};
                        me.store_detail.loadPage(1);}}
                    }
                },
                {
                    xtype: 'pagingtoolbar',
                    pageSize: 20,
                    store: me.store_detail,
                    displayMsg: 'Diplay {0} - {1} Of {2}',
                    emptyMsg: 'No Record Found',
                    displayInfo: true
                }
            ]
        });
        me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
            clicksToEdit: 1,
            items: [
                {
                    xtype: 'tabpanel',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: _('work_order_letter'),
                            layout: 'hbox',
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
                                            fieldLabel: _('docdate'),
                                            items: [
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
                                                    xtype:'combo',
                                                    editable: false,
                                                    name: 'doc_type',
                                                    width:100,
                                                    mode:'local',
                                                    store: [['S',_('salesorder')],['I',_('items')]]
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
                                            fieldLabel: _('description'),
                                            items: [
                                                {
                                                    width: 380,
                                                    height: 50,
                                                    xtype: 'textarea',
                                                    style:{overflow:'auto'},
                                                    name: 'job_desc',
                                                    emptyText: i18n('description'),
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
                        }, me.grid_detail
                    ],
                    listeners: {
                        render: function() {
                            this.items.each(function(i, index, items){
                                i.tab.on('click', function(){
                                    i.store.proxy.extraParams = {doc_id: me.doc_id};
                                    i.store.load();
                                });
                            });
                        }
                    }
                }

            ]
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.doc_id = record.data.doc_id; me.doc_type = record.data.doc_type; me.status = record.data.status;
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
                me.formEditing
            ],
            columns: [
                {text: _('id'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('description'),width: 150,sortable: true,dataIndex: 'job_desc'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'status'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('work_order_letter'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    emptyText: 'Option',
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('id')],['job_desc',_('description')],['remarks',_('remarks')]],
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
        me.edditing.on({
            scope: this,
            afteredit: function (roweditor, changes, record, rowIndex) {
                me.store_detail.load({params:{doc_id:me.doc_id}});
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
        this.store.load();
        callback(true);
    }
});
