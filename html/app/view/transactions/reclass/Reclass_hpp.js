
Ext.define('App.view.transactions.reclass.Reclass_hpp', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('reclass_hpp'),
    initComponent: function(){
        var me = this;
        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.reclass.Reclass_hpp',{remoteSort: true});
        me.store_reclass_hpp = Ext.create('App.store.transactions.reclass.JurnalReclass_hpp',{remoteSort: true});
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');

        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title: _('reclass_hpp'),
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('document'),width: 150,sortable: true,dataIndex: 'for_doc_id'},
                {text: 'Inv '+_('docdate'),width: 80,sortable: true,dataIndex: 'for_doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'cust_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'cust_name'},
                {text: _('quantity'),width: 80,sortable: true,dataIndex: 'qty', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('subtotal'),width: 100,sortable: true,dataIndex: 'total', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'}
            ],
            tbar: [
                {
                    width: 100,
                    xtype : 'textfield',
                    emptyText: i18n('enter period'),
                    listeners:{
                        specialkey:function(field, e){
                            if(e.getKey()== e.ENTER){
                                me.store.proxy.extraParams = {period:field.value };
                                me.store.load();
                            }
                        }
                    }
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['for_doc_id',_('document')],['cust_id',_('id')],['cust_name',_('name')],['qty',_('quantity')],['total',_('subtotal')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store.load({params:{field_name:me.field_name, field_search:field.value, start:0, limit:15}})}}}
                },
                {
                    xtype: 'button',
                    text: _('active'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
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
        me.grid_reclass_hpp = Ext.create('Ext.grid.Panel', {
            store: me.store_reclass_hpp,
            title: _('jurnal')+' Hpp',
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    //useredit.items.items[3].setText("UserEdit : " +record.data.useredit);
                    me.jurnal.store.load({params:{doc_id:record.data.doc_id}});
                }
            },
            plugins: [
                me.formEditingDetail = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    items: [
                        {
                            xtype:'panel',
                            items:[
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield'
                                },me.jurnal.grid
                            ]
                        }

                    ]
                })
            ],
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('document'),width: 150,sortable: true,dataIndex: 'for_doc_id'},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'cust_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'cust_name'},
                {text: _('quantity'),width: 80,sortable: true,dataIndex: 'qty', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('subtotal'),width: 100,sortable: true,dataIndex: 'total', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['for_doc_id',_('document')],['cust_id',_('id')],['cust_name',_('name')],['remarks',_('remarks')],['qty',_('quantity')],['total',_('subtotal')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_reclass_hpp.load({params:{field_name:me.field_name, field_search:field.value, start:0, limit:15}})}}}
                },'->',
                {
                    xtype: 'label'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_reclass_hpp,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.grid, me.grid_reclass_hpp ],
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
    onNewData: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length;
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            Reclass_hpp.add(data, function(provider, response){
                if (response.type == 'exception'){
                    //Ext.MessageBox.alert('Error', response.message);
                    var error = response.message;
                    Ext.Msg.show({
                        title: 'Failed!',
                        msg: error,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }else{
                    Ext.MessageBox.alert('Sukses', '!!!!');
                    store.remove(data_selected.getSelection());
                }
            });
        }
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        callback(true);
    }
});
