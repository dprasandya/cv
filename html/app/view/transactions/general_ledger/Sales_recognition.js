
Ext.define('App.view.transactions.general_ledger.Sales_recognition', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('sales_recognition'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.general_ledger.Sales_recognition',{remoteSort: true,  pageSize : 20, autoLoad: false});
        me.store_jurnal = Ext.create('App.store.transactions.general_ledger.JurnalSales_recognition',{remoteSort: true,  pageSize : 20, autoLoad: false});
        me.store_jurnal_cogs = Ext.create('App.store.transactions.general_ledger.JurnalCogs_recognition',{remoteSort: true,  pageSize : 20, autoLoad: false});
        me.legal = Ext.create('App.view.transactions.marketing.Legal_unit_building');
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');
        me.jurnal_cogs = Ext.create('App.view.transactions.jurnal.Jurnal');


        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title: _('sales_recognition')+' & Cogs',
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
                {text: _('customer'),width: 100,sortable: true,dataIndex: 'cust_name'},
                {text: _('area'),width: 80,sortable: true,dataIndex: 'area_m2', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('price'),width: 100,sortable: true,dataIndex: 'price', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'NEA',width: 80,sortable: true,dataIndex: 'net_effective', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'NEA Outstanding',width: 80,sortable: true,dataIndex: 'net_effective_outstanding', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('project')+' Cost',width: 100,sortable: true,dataIndex: 'project_cost', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('cost')+' M2',width: 80,sortable: true,dataIndex: 'cost_m2', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('cost')+' /unit',width: 100,sortable: true,dataIndex: 'cogs_value', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('accumulation_depreciation_asset'),width: 100,sortable: true,dataIndex: 'acc_depreciation_value', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks', editor:{
                    xtype:'textfield'
                }},
                {
                    text: _('legal'),
                    width: 60,
                    align: 'center',
                    renderer: function(value, meta, record) {
                        var id = Ext.id();
                        Ext.defer(function(){
                            new Ext.Button({
                                text: 'View',
                                handler : function(btn, e) {
                                    me.legal.store_detail.proxy.extraParams = {unit_building_id: record.data.unit_building_id, project_id: record.data.project_id};
                                    me.legal.store_detail.load();
                                    me.GridShow= Ext.create('App.ux.window.Window',{
                                        layout: 'fit',
                                        title: _('legal'),
                                        height: 200,
                                        width: 610,
                                        items:[me.legal.grid_detail],
                                        modal:true
                                    });
                                    me.GridShow.show();
                                }
                            }).render(document.body, id);
                        },40);
                        return Ext.String.format('<div id="{0}"></div>', id);
                    }
                }
            ],
            tbar: [
                {
                    xtype:'textfield',
                    emptyText: 'enter Period',
                    width:100,
                    enableKeyEvents: true,
                    listeners:{
                        keyup:function(field, e){
                            me.period= field.value;
                            if(e.getKey()== e.ENTER){
                                if(me.period){
                                    me.store.proxy.extraParams = {project_id:me.project_id, period:me.period};
                                    me.store.loadPage(1);}
                                }
                        }
                    }
                },
                {
                    xtype:'projectcombo',
                    emptyText: 'project',
                    width:100,
                    listeners:{change:function(field, e){
                        me.project_id= field.value;
                        if(me.period){
                            me.store.proxy.extraParams = {project_id:me.project_id, period:me.period};
                            me.store.loadPage(1);}
                        }
                    }
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
                    store: [['project_name',_('project')],['unit_building_name',_('unit_building')],['cust_name',_('customer')],['price',_('price')],['total',_('total')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {project_id:me.project_id, period:me.period, field_name:me.field_name, field_search:field.value};
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
            title: _('jurnal')+' '+_('sales_recognition'),
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
                {text: _('document'),width: 100,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('project'),width: 100,sortable: true,dataIndex: 'project_name'},
                {text: _('unit_building'),width: 100,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('customer'),flex: 1,sortable: true,dataIndex: 'cust_name'},
                {text: _('area'),width: 80,sortable: true,dataIndex: 'area_m2', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('price'),width: 100,sortable: true,dataIndex: 'price', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('net_effective'),width: 80,sortable: true,dataIndex: 'net_effective', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('cost')+' /unit',width: 100,sortable: true,dataIndex: 'cogs_value', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('project')+' Cost',width: 100,sortable: true,dataIndex: 'project_cost', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['project_name',_('project')],['unit_building_name',_('unit_building')],['cust_name',_('customer')],['price',_('price')],['total',_('total')],['remarks',_('remarks')],['userinput',_('input_user')]],
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
        me.grid_jurnal_cogs = Ext.create('Ext.grid.Panel', {
            store: me.store_jurnal_cogs,
            title: _('jurnal')+' Cogs',
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    me.jurnal_cogs.store.load({params:{doc_id:record.data.doc_id}});
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
                                },me.jurnal_cogs.grid
                            ]
                        }

                    ]
                })
            ],
            columns: [
                {text: _('document'),width: 100,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('project'),width: 100,sortable: true,dataIndex: 'project_name'},
                {text: _('unit_building'),width: 100,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('customer'),flex: 1,sortable: true,dataIndex: 'cust_name'},
                {text: _('area'),width: 80,sortable: true,dataIndex: 'area_m2', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('price'),width: 100,sortable: true,dataIndex: 'price', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('net_effective'),width: 80,sortable: true,dataIndex: 'net_effective', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('cost')+' /unit',width: 100,sortable: true,dataIndex: 'cogs_value', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('project')+' Cost',width: 100,sortable: true,dataIndex: 'project_cost', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['project_name',_('project')],['unit_building_name',_('unit_building')],['cust_name',_('customer')],['price',_('price')],['total',_('total')],['remarks',_('remarks')],['userinput',_('input_user')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_jurnal_cogs.proxy.extraParams = {field_name:me.field_name, field_search:field.value};
                        me.store_jurnal_cogs.loadPage(1);}}
                    }
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.store_jurnal_cogs,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[  me.grid, me.grid_jurnal, me.grid_jurnal_cogs],
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
         var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length;
         for (var i = 0, len = length; i < len; i++) {
             var data = data_selected.selected.items[i].data;
             Sales_recognition.add(data, function(provider, response){
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
