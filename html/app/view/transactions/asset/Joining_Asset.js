
Ext.define('App.view.transactions.asset.Joining_Asset', {
    extend: 'App.ux.RenderPanel',
    id: 'panelJoining_Asset',
    pageTitle: _('joining_asset'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.asset.Joining_Asset',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_detail = Ext.create('App.store.transactions.asset.Joining_Asset_Detail');
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');

        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            title: _('detail'),
            height: 1000,
            autoScroll:false,
            plugins: [
                me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false,
                    listeners: {
                        beforeedit: function(editor,e,opt){
                            if(me.data.status==1 || me.data.status==2){
                                return false;
                            }
                        }
                    }
                })
            ],
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'for_doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('id'),width: 90,sortable: true,dataIndex: 'coa_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'coa_name',summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('amount'),width: 100,sortable: true,dataIndex: 'nominal', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('active'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'status',renderer: me.boolRenderer,
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
                    store: [['for_doc_id',_('document')],['coa_id',_('id')],['coa_name',_('name')],['nominal',_('amount')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_detail.load({params:{doc_id:me.data.doc_id, project_id:me.data.project_id, field_name:me.field_name, field_search:field.value, start:0, limit:15}})}}}
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_detail,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar'); me.data = record.data;
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.store_detail.proxy.extraParams = {doc_id: me.data.doc_id, project_id:me.data.project_id};
                    me.store_detail.load({params:{doc_id:me.data.doc_id, project_id:me.data.project_id}});
                    me.jurnal.store.load({params:{doc_id:me.data.doc_id}});
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
                                    xtype:'panel',
                                    title: _('joining_asset'),
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
                                                                            allowBlank: false
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
                                                                    fieldLabel: _('account'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'xtaccount',
                                                                            name: 'coa_id',
                                                                            editable: false,
                                                                            allowBlank: false,
                                                                            emptyText: i18n('account'),
                                                                            extraParams:['A']
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
                                        }
                                    ]
                                },
                                me.grid_detail
                            ]
                        }

                    ]
                })
            ],
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'coa_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'coa_name'},
                {text: _('subtotal'),width: 100,sortable: true,dataIndex: 'total', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'status'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('joining_asset'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['coa_id',_('id')],['coa_name',_('name')],['total',_('amount')],['remarks',_('remarks')]],
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
         plugin.editor.form.findField('doc_date').setValue(new Date());
         me.jurnal.store.load();
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
