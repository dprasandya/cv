
Ext.define('App.view.transactions.management_properti.ServiceCharge', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('service_charge'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.management_properti.ServiceCharge',{remoteSort: true, pageSize : 20,  autoLoad: false});
        me.store_detail = Ext.create('App.store.transactions.management_properti.ServiceCharge_detail',{remoteSort: true, pageSize : 20,  autoLoad: false});
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');

        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title: _('service_charge'),
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            plugins: [
                me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false
                })
            ],
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('type'),width: 100,sortable: true,dataIndex: 'sc_name'},
                {text: _('project'),width: 80,sortable: true,dataIndex: 'project_name'},
                {text: _('unit_building'),width: 80,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('customer'),flex: 1,sortable: true,dataIndex: 'cust_name'},
                {text: _('area'),width: 70,sortable: true,dataIndex: 'area_m2', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('price'),width: 80,sortable: true,dataIndex: 'price', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'total', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('tax'),width: 80,sortable: true,dataIndex: 'tax_id'},
                {text: _('tax')+' No',width: 130,sortable: true,dataIndex: 'tax_no', editor:{
                    xtype:'textfield'
                }},
                {text: _('tax')+' Date',width: 80,sortable: true,dataIndex: 'tax_date', renderer:Ext.util.Format.dateRenderer('d-m-Y'), editor:{
                    xtype : 'datefield',
                    editable: false,
                    format : 'Y-m-d',
                    value: new Date(),
                    maxValue : new Date(),
                    emptyText: i18n('date')
                }}
            ],
            tbar: [
                {
                    width: 100,
                    xtype : 'textfield',
                    emptyText: i18n('enter period'),
                    listeners:{
                        specialkey:function(field, e){
                            if(e.getKey()== e.ENTER){
                                var sc_id = me.grid.down('toolbar').items.items[1],
                                    tax_id = me.grid.down('toolbar').items.items[2];
                                if(sc_id.getValue()!=null && tax_id.getValue()!=null && field.value!=null){
                                    me.store.proxy.extraParams = {period:field.value, sc_id:sc_id.getValue(), tax_id:tax_id.getValue()};
                                    me.store.loadPage(1);
                                }
                            }
                        }
                    }
                },
                {
                    width: 100,
                    xtype: 'sc_mcombo',
                    allowBlank: false,
                    emptyText: i18n('type'),
                    listeners:{
                        change:function(field, e){
                            var period = me.grid.down('toolbar').items.items[0],
                                tax_id = me.grid.down('toolbar').items.items[2];
                            if(period.getValue()==null){
                                Ext.MessageBox.alert('Warning', 'Period not be blank');
                            }else{
                                me.store.proxy.extraParams = {period:period.getValue(), sc_id:field.value, tax_id:tax_id.getValue() };
                                me.store.loadPage(1);
                            }

                        }
                    }
                },
                {
                    width: 100,
                    xtype: 'xttax',
                    editable: false,
                    extraParams:'O',
                    value :'PK100',
                    emptyText: i18n('tax'),
                    listeners:{
                        change:function(field, e){
                            var period = me.grid.down('toolbar').items.items[0],
                                sc_id = me.grid.down('toolbar').items.items[1];
                            if(period.getValue()!= null && sc_id.getValue()!=null && field.value!=null ){
                                me.store.proxy.extraParams = {period:period.getValue(), sc_id:sc_id.getValue(), tax_id:field.value};
                                me.store.loadPage(1);
                            }
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: _('posting'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['project_name',_('project')],['unit_building_name',_('unit_building')],['cluster_name',_('cluster')],['building_name',_('building')],['cust_name',_('customer')],['area_m2',_('area')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        var period = me.grid.down('toolbar').items.items[0],
                            tax_id = me.grid.down('toolbar').items.items[2],
                            sc_id = me.grid.down('toolbar').items.items[1];
                        me.store.proxy.extraParams = {period:period.getValue(), sc_id:sc_id.getValue(), tax_id:tax_id.getValue(), field_name:me.field_name, field_search:field.value};
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
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            title: _('jurnal'),
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_detail.down('toolbar'); me.doc_id=record.data.doc_id;
                    useredit.items.items[3].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.jurnal.store.load({params:{doc_id:me.doc_id}});
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
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('type'),width: 100,sortable: true,dataIndex: 'sc_name'},
                {text: _('project'),width: 80,sortable: true,dataIndex: 'project_name'},
                {text: _('unit_building'),width: 80,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('customer'),flex: 1,sortable: true,dataIndex: 'cust_name'},
                {text: _('area'),width: 100,sortable: true,dataIndex: 'area_m2', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('price'),width: 100,sortable: true,dataIndex: 'price', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('tax'),width: 80,sortable: true,dataIndex: 'tax_id'},
                {text: _('amount'),width: 100,sortable: true,dataIndex: 'receivable', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['sc_name',_('type')],['project_name',_('project')],['unit_building_name',_('unit_building')],['tax_id',_('tax')],['tax_no',_('tax')+' No'],['cust_name',_('customer')],['area_m2',_('area')],['price',_('price')],['receivable',_('amount')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_detail.proxy.extraParams = {field_name:me.field_name, field_search:field.value};
                        me.store_detail.loadPage(1);}}
                    }
                },'->',
                {
                    xtype: 'label'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.store_detail,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });

        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.grid, me.grid_detail ],
            listeners: {
                render: function() {
                    this.items.each(function(i, index, items){
                        i.tab.on('click', function(){
                            if(index>0){ i.store.load()}
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
            //console.log(data.tax_date);
            data.tax_date = data.tax_date == null ? new Date() : data.tax_date;
            ServiceCharge.add(data, function(provider, response){
                if (response.type == 'exception'){
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
