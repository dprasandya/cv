
Ext.define('App.view.hris.Pph21_simulation.Pph21_simulation', {
    extend: 'App.ux.RenderPanel',
    pageTitle: 'PPh21 Simulation',
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store_period = Ext.create('App.store.hris.Pph21_simulation.Pph21_simulation_period',{remoteSort: true, pageSize : 20, autoLoad: false, groupField: 'sc_type'});
        me.store_emp_salary_in = Ext.create('App.store.hris.Pph21_simulation.Pph21_simulation_employee_salary',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_employee = Ext.create('App.store.hris.employee.Employee',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_unpost = Ext.create('App.store.hris.Pph21_simulation.Pph21_simulation_unpost',{remoteSort: true, pageSize : 20, autoLoad: false});

        me.grid_period = Ext.create('Ext.grid.Panel', {
            store: me.store_period,
            title: _('period'),
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'emp_name'},
                {text: _('company'),width: 250,sortable: true,dataIndex: 'company_name'},
                {text: _('ptkp_rates'),width: 150,sortable: true,dataIndex: 'ptkp_name'}
            ],
            tbar: [
                {
                    xtype: 'container',
                    flex:1,
                    layout:'hbox',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'vbox'
                            },
                            fieldDefaults: {
                                labelAlign: 'right'
                            },
                            fieldLabel: _('period'),
                            items: [
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    emptyText: i18n('period'),
                                    listeners:{
                                        specialkey:function(field, e){
                                            if(e.getKey()== e.ENTER){
                                                me.store_period.proxy.extraParams ={periode:field.value};
                                                me.store_period.load({params:{period:field.value}});
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            text: _('active'),
                            iconCls: 'icoAdd',
                            scope: me,
                            handler: me.onNewDataPeriod
                        }
                    ]
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_period,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_unpost = Ext.create('Ext.grid.Panel', {
            store: me.store_unpost,
            title: _('unpost'),
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'emp_name'},
                {text: _('company'),width: 250,sortable: true,dataIndex: 'company_name'},
                {text: _('ptkp_rates'),width: 150,sortable: true,dataIndex: 'ptkp_name'}
            ],
            tbar: [
                {
                    xtype: 'container',
                    flex:1,
                    layout:'hbox',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'vbox'
                            },
                            fieldDefaults: {
                                labelAlign: 'right'
                            },
                            fieldLabel: _('period'),
                            items: [
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    emptyText: i18n('period'),
                                    listeners:{
                                        specialkey:function(field, e){
                                            if(e.getKey()== e.ENTER){
                                                me.store_unpost.proxy.extraParams ={periode:field.value};
                                                me.store_unpost.load({params:{period:field.value}});
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            text: _('inactive'),
                            iconCls: 'icoAdd',
                            scope: me,
                            handler: me.onUnpostDataPeriod
                        }
                    ]
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_unpost,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_employee = Ext.create('Ext.grid.Panel', {
            store: me.store_employee,
            title: _('employee'),
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    me.emp_id = record.data.emp_id;
                    me.store_emp_salary_in.proxy.extraParams ={sc_type:'I', emp_id:me.emp_id};
                    me.store_emp_salary_in.load();
                    me.GridShow= Ext.create('App.ux.window.Window',{
                        layout: 'fit',
                        title: _('salary'),
                        width: 700,
                        height: 500,
                        items:[me.grid_emp_salary_in],
                        modal:true
                    });
                    me.GridShow.show();
                }
            },
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),width: 150,sortable: true, renderer: function (value, meta, record, rowIndex, colIndex, store) {
                    return record.data.emp_first_name+' '+record.data.emp_midle_name+' '+record.data.emp_last_name
                }},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['emp_id',_('id')],['emp_name',_('name')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_employee.proxy.extraParams = {field_name:me.field_name, field_search:field.value}; me.store_employee.load({params:{start:0}})}}}
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_employee,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_emp_salary_in = Ext.create('Ext.grid.Panel', {
            store: me.store_emp_salary_in,
            autoScroll: false,
            title: _('in'),
            plugins: [
                me.form_emp_salary_in = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    autoCancel:true,
                    items: [
                        {
                            layout: 'hbox',
                            flex:1,
                            items:[
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    layout: 'hbox',
                                    flex:1,
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex:1,
                                            layout:'anchor',
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
                                                            xtype: 'xtsalary_component',
                                                            name: 'sc_id',
                                                            editable: false,
                                                            emptyText: i18n('id'),
                                                            extraParams:['I']
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'sc_name',
                                                            readOnly: true,
                                                            emptyText: i18n('name'),
                                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            width: 100,
                                                            xtype: 'textfield',
                                                            name: 'sc_type',
                                                            hidden: true
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
                                                    fieldLabel: _('frequency'),
                                                    items: [
                                                        {
                                                            xtype:'combo',
                                                            editable: false,
                                                            width:150,
                                                            mode:'local',
                                                            name: 'pay_frequency',
                                                            store: [['M',_('month')], ['D',_('day')]],
                                                            emptyText: i18n('payment')
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
                                                            width: 250,
                                                            fieldLabel: 'Rate(Rp.)',
                                                            xtype: 'mitos.currency',
                                                            name: 'amount',
                                                            emptyText: i18n('amount'),
                                                            enableKeyEvents: true,
                                                            listeners:{
                                                                keyup:function(field, e){
                                                                    var container = field.up('container'),
                                                                        rate_prs = container.items.items[1],
                                                                        rate_sc_id = container.items.items[2];
                                                                    rate_prs.setValue(0); rate_sc_id.setDisabled(true);
                                                                }
                                                            }
                                                        },
                                                        {
                                                            width: 200,
                                                            fieldLabel: 'Rate(%)',
                                                            xtype: 'mitos.currency',
                                                            enableKeyEvents: true,
                                                            name: 'rate',
                                                            emptyText: i18n('rate'),
                                                            listeners:{
                                                                keyup:function(field, e){
                                                                    var container = field.up('container'),
                                                                        rate_amount = container.items.items[0],
                                                                        rate_sc_id = container.items.items[2];
                                                                    rate_amount.setValue(0); rate_sc_id.setDisabled(false);
                                                                }
                                                            }
                                                        },
                                                        {
                                                            width: 200,
                                                            fieldLabel: 'Rate(From)',
                                                            xtype: 'xtsalary_component',
                                                            name: 'rate_sc_id',
                                                            editable: false,
                                                            extraParams:['I'],
                                                            listeners:{
                                                                change:function(field, e){
                                                                    var container = field.up('container'),
                                                                        rate_amount = container.items.items[0];
                                                                    rate_amount.setValue(0);
                                                                }
                                                            }
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
                    var useredit = me.grid_emp_salary_in.down('toolbar');
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('name'),flex:1,sortable: true,dataIndex: 'sc_name'},
                {text: _('frequency'), width: 150,sortable: true, dataIndex: 'pay_frequency',summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('amount'),width: 80,sortable: true, dataIndex: 'amount', summaryType:'sum', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            features: [{
                ftype: 'summary'
            }],
            tbar: [
                {
                    xtype: 'button',
                    text: _('salary'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['sc_name',_('name')],['pay_frequency',_('frequency')],['amount',_('amount')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_emp_salary_in.proxy.extraParams = { emp_id:me.emp_id, field_name:me.field_name, field_search:field.value}; me.store_emp_salary_in.load({params:{start:0}})}}}
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_emp_salary_in,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_up_down_rate = Ext.create('Ext.grid.Panel', {
            autoScroll: false,
            title: 'Up / Down Rate',
            columns: [
                {text: _('name'),flex:1,sortable: true,dataIndex: 'sc_name'}
            ],
            tbar: [
                {
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'hbox'
                    },
                    fieldDefaults: {
                        labelAlign: 'right'
                    },
                    fieldLabel: _('salary'),
                    items: [
                        {
                            width: 100,
                            xtype: 'xtsalary_component',
                            editable: false,
                            emptyText: i18n('id'),
                            extraParams:['I'],
                            listeners:{
                                change:function(field, e){
                                    me.up_down_salary= field.value;
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'vbox'
                    },
                    fieldDefaults: {
                        labelAlign: 'right'
                    },
                    fieldLabel: _('type'),
                    items: [
                        {
                            xtype:'combo',
                            editable: false,
                            width:100,
                            mode:'local',
                            store: [['U',_('up')],['D',_('down')]],
                            listeners:{
                                change:function(){
                                    me.up_down=this.getValue();
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'vbox'
                    },
                    fieldDefaults: {
                        labelAlign: 'right'
                    },
                    fieldLabel: 'Rate %',
                    items: [
                        {
                            width: 100,
                            xtype: 'mitos.currency',
                            enableKeyEvents: true,
                            listeners:{
                                keyup:function(field, e){
                                    me.updown_rate = field.value;
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'button',
                    text: _('update'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onUpdateRate
                }
            ]
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[me.grid_period, me.grid_unpost, me.grid_employee, me.grid_up_down_rate]
        });
        me.pageBody = [ me.FormulirPanel];
        me.callParent(arguments);
    },
    onNewUser: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store , model = store.model, plugin = grid.editingPlugin, newModel;
        newModel = Ext.ModelManager.create({
        }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);
        plugin.context.record.data.emp_id = me.emp_id;
    },
    onNewDataPeriod: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length;
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            HRIS_Pph21_simulation_period.add(data, function(provider, response){
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
    onUnpostDataPeriod: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length;
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            HRIS_Pph21_simulation_unpost.add(data, function(provider, response){
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
    onUpdateRate: function(btn){
        var me = this;
        HRIS_Pph21_simulation_updown_rate.update({updown:me.up_down, updown_salary: me.up_down_salary, updown_rate:me.updown_rate}, function(provider, response){
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

    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.store_employee.load();
        callback(true);
    }
});
