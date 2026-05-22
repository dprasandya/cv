
Ext.define('App.view.transactions.general_ledger.Asset_recognition_sales', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('asset_recognition_sales'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.general_ledger.Asset_recognition_sales',{remoteSort: true,  pageSize : 20, autoLoad: false});
        me.store_jurnal = Ext.create('App.store.transactions.general_ledger.JurnalAsset_recognition_sales',{remoteSort: true,  pageSize : 20, autoLoad: false});
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');

        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title: _('asset_recognition'),
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            plugins: [
                me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2
                })
            ],
            columns: [
                {text: _('project'),width: 80,sortable: true,dataIndex: 'project_name'},
                {text: _('unit_building'),width: 80,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('document'),width: 120,sortable: true,dataIndex: 'for_doc_id'},
                {text: 'Last Depreciation '+_('date'),width: 100,sortable: true,dataIndex: 'last_depreciation_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('month'),width: 80,sortable: true,dataIndex: 'live_month', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('benefit'),width: 80,sortable: true,dataIndex: 'benefit_month', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('outstanding'),width: 80,sortable: true,dataIndex: 'outstanding_month',align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('amount')+'/'+_('month'),width: 100,sortable: true,dataIndex: 'depreciation_month', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'total', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks', editor:{
                    xtype:'textfield'
                }}
            ],
            tbar: [
                {
                    xtype:'projectcombo',
                    emptyText: 'project',
                    width:100,
                    listeners:{change:function(field, e){
                        me.project_id= field.value;
                        me.store.proxy.extraParams = {project_id:me.project_id};
                        me.store.loadPage(1);}
                    }
                },
                {
                    width: 100,
                    xtype : 'datefield',
                    editable: false,
                    format : 'Y-m-d',
                    value : new Date(),
                    //maxValue : new Date(),
                    emptyText: i18n('date')
                },
                {
                    xtype: 'button',
                    text: _('active'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['project_name',_('project')],['unit_building_name',_('unit_building')],['for_doc_id',_('for_doc_id')],['total',_('total')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {project_id:me.project_id, field_name:me.field_name, field_search:field.value};
                        me.store.loadPage(1);}}
                    }
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
        me.grid_jurnal = Ext.create('Ext.grid.Panel', {
            store: me.store_jurnal,
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
                {text: _('document'),width: 120,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('project'),width: 100,sortable: true,dataIndex: 'project_name'},
                {text: _('unit_building'),width: 100,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('for_doc_id'),width: 120,sortable: true,dataIndex: 'for_doc_id'},
                {text: _('area'),width: 80,sortable: true,dataIndex: 'area_m2', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'total', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['project_name',_('project')],['unit_building_name',_('unit_building')],['for_doc_id',_('for_doc_id')],['area_m2',_('area')],['total',_('total')],['remarks',_('remarks')],['userinput',_('input_user')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_jurnal.proxy.extraParams = {field_name:me.field_name, field_search:field.value};
                        me.store_jurnal.loadPage(1);}}
                    }
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.store_jurnal,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[  me.grid, me.grid_jurnal],
            listeners: {
                render: function() {
                    this.items.each(function(i, index, items){
                        i.tab.on('click', function(){
                            if(index > 0){
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
         var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length,
            doc_date = btn.up('toolbar').items.items[1].getValue();
         for (var i = 0, len = length; i < len; i++) {
             var data = data_selected.selected.items[i].data;
             data.doc_date = doc_date;
             Asset_recognition_sales.add(data, function(provider, response){
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
       // me.store.load();
        callback(true);
    }
});
