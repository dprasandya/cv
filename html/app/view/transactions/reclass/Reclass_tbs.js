
Ext.define('App.view.transactions.reclass.Reclass_tbs', {
    extend: 'App.ux.RenderPanel',
    
    pageTitle: _('reclass_tbs'),
    initComponent: function(){
        var me = this;
        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.reclass.Reclass',{remoteSort: false});
        me.store_sharing_hpp = Ext.create('App.store.transactions.reclass.Reclass_sharing_hpp',{remoteSort: true});
        
        me.store_reclass = Ext.create('App.store.transactions.reclass.JurnalReclass',{remoteSort: false});
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');
        me.grid_sharing_hpp = Ext.create('Ext.grid.Panel', {
            store: me.store_sharing_hpp,
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'item_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'item_name'},
                {text: 'Percentase',width: 80,sortable: true,dataIndex: 'percentase', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00%')},
                {text: _('total'),width: 80,sortable: true,dataIndex: 'nominal', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType:'sum', summaryRenderer : function(value, summaryData, dataIndex) {
                    var nominal = Ext.util.Format.number(value, '0,000.00');
                    return '<span style="font-weight:bold;">' + nominal + "</span>";
                }}
            ],
            features: [{
                ftype: 'summary'
            }]
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title: _('reclass'),
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('document'),width: 150,sortable: true,dataIndex: 'for_doc_id'},
                {text: _('production'),width: 150,sortable: true,dataIndex: 'doc_id_rm'},
                {text: _('account'),flex: 1,sortable: true,dataIndex: 'coa_name'},
                {text: _('warehouse'),flex: 1,sortable: true,dataIndex: 'warehouse_name'},
                {text: _('subtotal'),width: 80,sortable: true,dataIndex: 'total', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: 'Quantum TBS',flex: 1,sortable: true,dataIndex: 'qty_tbs'},
                /*{
                    text: _('sharing_hpp'),
                    width: 60,
                    align: 'center',
                    renderer: function(value, meta, record) {
                        var id = Ext.id();
                        Ext.defer(function(){
                            new Ext.Button({
                                text: 'View',
                                handler : function(btn, e) {
                                    me.store_sharing_hpp.load({params:{total:record.data.total}});
                                    me.GridShow= Ext.create('App.ux.window.Window',{
                                        layout: 'fit',
                                        height: 200,
                                        width: 610,
                                        items:[me.grid_sharing_hpp],
                                        modal:true
                                    });
                                    me.GridShow.show();
                                }
                            }).render(document.body, id);
                        },40);
                        return Ext.String.format('<div id="{0}"></div>', id);
                    }
                },*/
                {text: _('type'),width: 150,sortable: true,align:'center',dataIndex: 'name_type'}
                /*{text: _('type'),width: 150,sortable: true, align:'center',
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    var returnString = record.data.doc_type=='P'?'Purchase': (record.data.doc_type=='S'?'PKS - S.Leading R':(record.data.doc_type=='O'?'Others':(record.data.doc_type=='A'?'Asset':(record.data.doc_type=='K'?'Biaya TBM':(record.data.doc_type=='F'?' Beli TBS Luar':(record.data.doc_type=='V'?'PKS - V.Sterilizer':(record.data.doc_type=='T'?'PKS - Threser':(record.data.doc_type=='B'?'PKS - Boiler':(record.data.doc_type=='I'?'PKS - Klarifikasi':(record.data.doc_type=='L'?'PKS - Kernel':(record.data.doc_type=='H'?'PKS - Power House':(record.data.doc_type=='D'?'Deduction':(record.data.doc_type=='M'?'Biaya TM':(record.data.doc_type=='PKS'?'Stock Out PKS':(record.data.doc_type=='R'?'PKS - Others':(record.data.doc_type=='TBM'?'Stock Out TBM':(record.data.doc_type=='TM'?'Stock Out TM':(record.data.doc_type=='C'?'PKS - Limbah':(record.data.doc_type=='J'?'PKS - Sample Produk':(record.data.doc_type=='N'?'PKS - Laboratorium':(record.data.doc_type=='SO'?'Stock Opname':'PKS - Workshop'))))))))))))))))))))) ;
                    return returnString;
                }}*/
            ],
            tbar: [
                {
                    width: 100,
                    xtype : 'textfield',
                    emptyText: i18n('enter period'),
                    listeners:{
                        specialkey:function(field, e){
                            if(e.getKey()== e.ENTER){
                                me.store.proxy.extraParams = {period:field.value, reclass_type:'HK'};
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
                    store: [['for_doc_id',_('document')],['doc_id_rm',_('production')],['coa_name',_('name')],['afdeling_name',_('afdeling')],['warehouse_name',_('warehouse')],['remarks',_('remarks')],['total',_('subtotal')],['name_type',_('type')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{
                        specialkey:function(field, e)
                        {
                            if(e.getKey()== e.ENTER)
                            {
                                var tb=me.grid.down('toolbar'), period=tb.items.items[0];
                                me.store.load({params:{period:period.getValue(), reclass_type:'HK', field_name:me.field_name, field_search:field.value, start:0, limit:15}})
                            }
                        }
                    }
                },
                {
                    width: 125,
                    xtype: 'checkbox',
                    disabled:true,
                    fieldLabel: 'Sharing'
                    
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
        me.grid_reclass = Ext.create('Ext.grid.Panel', {
            store: me.store_reclass,
            title: _('jurnal'),
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
                {text: _('type'),width: 150,sortable: true, align:'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                        var returnString = record.data.doc_type=='P'?'Purchase': (record.data.doc_type=='S'?'PKS - S.Leading R':(record.data.doc_type=='O'?'Others':(record.data.doc_type=='A'?'Asset':(record.data.doc_type=='K'?'Biaya TBM':(record.data.doc_type=='F'?' Beli TBS Luar':(record.data.doc_type=='V'?'PKS - V.Sterilizer':(record.data.doc_type=='T'?'PKS - Threser':(record.data.doc_type=='B'?'PKS - Boiler':(record.data.doc_type=='I'?'PKS - Klarifikasi':(record.data.doc_type=='L'?'PKS - Kernel':(record.data.doc_type=='H'?'PKS - Power House':(record.data.doc_type=='D'?'Deduction':(record.data.doc_type=='M'?'Biaya TM':(record.data.doc_type=='PKS'?'Stock Out PKS':(record.data.doc_type=='R'?'PKS - Others':(record.data.doc_type=='TBM'?'Stock Out TBM':(record.data.doc_type=='TM'?'Stock Out TM':(record.data.doc_type=='C'?'PKS - Limbah':(record.data.doc_type=='J'?'PKS - Sample Produk':(record.data.doc_type=='N'?'PKS - Laboratorium':(record.data.doc_type=='SO'?'Stock Opname':'PKS - Workshop'))))))))))))))))))))) ;
                        return returnString;
                    }},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'coa_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'coa_name'},
                {text: _('subtotal'),width: 80,sortable: true,dataIndex: 'total', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['for_doc_id',_('document')],['coa_id',_('id')],['coa_name',_('name')],['remarks',_('remarks')],['total',_('subtotal')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{
                        specialkey:function(field, e)
                        {
                            if(e.getKey()== e.ENTER)
                            {
                                var tb=me.grid_reclass.down('toolbar'), period=tb.items.items[0];
                                me.store_reclass.load({params:{period:period.getValue(), reclass_type:'HK', field_name:me.field_name, field_search:field.value, start:0, limit:15}})
                            }
                        }
                    }
                },'->',
                {
                    xtype: 'label'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_reclass,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.grid, me.grid_reclass ],
            listeners: {
                render: function() {
                    this.items.each(function(i, index, items){
                        i.tab.on('click', function(){
                            if(index==1){
                                i.store.load({params:{reclass_type:'HK'}});
                            }
                            
                        });
                    });
                }
            }
        });
        me.pageBody = [ me.FormulirPanel ];
        me.callParent(arguments);
    },
    onNewData: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length
        ,tb=grid.down('toolbar'),sharing=tb.items.items[3];
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            data.sharing=sharing.getValue();
            Reclass.add(data, function(provider, response){
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
        //this.store.load();
        callback(true);
    }
});
