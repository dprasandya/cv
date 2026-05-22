
Ext.define('App.view.transactions.asset.Accumulation_Asset', {
    extend: 'App.ux.RenderPanel',
    id: 'panelAccumulation_Asset',
    pageTitle: _('accumulation_depreciation_asset'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.asset.Accumulation_Asset',{remoteSort: true});
        me.store_asset = Ext.create('App.store.transactions.asset.JurnalAccumulation_Asset',{remoteSort: true});
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');

        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title: _('accumulation_depreciation_asset'),
            plugins: [
                me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false
                })
            ],
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('account'),width: 80,sortable: true,dataIndex: 'coa_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'coa_name'},
                {text: _('supplier')+' Or '+_('afdeling'),flex: 1,sortable: true, renderer: function (value, meta, record, rowIndex, colIndex, store) {
                    if(record.data.vend_id == '')
                        return record.data.afdeling_name;
                    else
                        return record.data.vend_name;
                }},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'total',align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('age')+' '+_('id'),width: 80,sortable: true,dataIndex: 'age_id',editor:{
                    xtype:'xtagingasset',
                    editable: false
                }},
                {text: _('outstanding'),width: 80,sortable: true,dataIndex: 'outstanding_month',align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('amount'),width: 100,sortable: true,dataIndex: 'depreciation_month', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')}
            ],
            tbar: [
                {
                    width: 100,
                    xtype: 'textfield',
                    name: 'period',
                    emptyText: i18n('period'),
                    enableKeyEvents: true,
                    listeners:{
                        specialkey:function(field, e){
                            me.period = field.value;
                            if(e.getKey() == e.ENTER){
                                me.store.proxy.extraParams = {period:field.value};
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
                    store: [['doc_id',_('document')],['coa_id',_('account')],['coa_name',_('name')],['vend_name',_('supplier')],['unit_building_name',_('unit_building')],['afdeling_name',_('afdeling')],['age_id',_('age')],['depreciation_month',_('amount')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {period:me.period, field_name:me.field_name, field_search:field.value};
                        me.store.loadPage(1);}}
                    }
                },
                {
                    xtype: 'button',
                    text: _('posting'),
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
        me.grid_asset = Ext.create('Ext.grid.Panel', {
            store: me.store_asset,
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
                {text: _('id'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('douments'),width: 150,sortable: true,dataIndex: 'for_doc_id'},
                {text: _('account'),width: 80,sortable: true,dataIndex: 'coa_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'coa_name'},
                {text: _('supplier')+' Or '+_('afdeling'),flex: 1,sortable: true, renderer: function (value, meta, record, rowIndex, colIndex, store) {
                    if(record.data.vend_id == '')
                        return record.data.afdeling_name;
                    else
                        return record.data.vend_name;
                }},
                {text: _('amount'),width: 100,sortable: true,dataIndex: 'nominal', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('id')],['for_doc_id',_('douments')],['coa_id',_('account')],['coa_name',_('name')],['vend_name',_('supplier')],['unit_building_name',_('unit_building')],['afdeling_name',_('afdeling')],['nominal',_('amount')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_asset.load({params:{field_name:me.field_name, field_search:field.value, start:0, limit:15}})}}}
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_asset,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.formEditing.on({
            scope: this,
            afteredit: function (roweditor, changes, record, rowIndex) {
                me.store.load({params:{period:me.period}});
            }
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.grid, me.grid_asset ],
            listeners: {
                render: function() {
                    this.items.each(function(i, index, items){
                        i.tab.on('click', function(){
                            if(index > 0) {
                                i.store.load()
                            }
                        });
                    });
                }
            }
        });
        me.pageBody = [ me.FormulirPanel];
        me.callParent(arguments);
    },

    onNewData: function(btn){
            var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length;
            for (var i = 0, len = length; i < len; i++) {
                var data = data_selected.selected.items[i].data;
                Accumulation_Asset.add(data, function(provider, response){
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
        var me = this;
        callback(true);
    }
});
