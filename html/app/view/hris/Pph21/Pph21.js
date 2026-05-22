
Ext.define('App.view.hris.Pph21.Pph21', {
    extend: 'App.ux.RenderPanel',
    pageTitle: 'PPh21',
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.Pph21.Pph21',{remoteSort: true, pageSize : 20, autoLoad: false, groupField: 'sc_type'});
        me.store_period = Ext.create('App.store.hris.Pph21.Pph21_period',{remoteSort: true, autoLoad: false, groupField: 'company_name'});
        me.store_unpost = Ext.create('App.store.hris.Pph21.Pph21_unpost',{remoteSort: true, autoLoad: false, groupField: 'company_name'});
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title: _('detail'),
            columns: [
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'emp_name'},
                {text: _('salary_component'),width: 150,sortable: true,dataIndex: 'sc_name'},
                {text: _('frequency'),width: 100,sortable: true,dataIndex: 'pay_frequency'},
                {text: _('day_s'),width: 80,sortable: true,dataIndex: 'day_index'},
                {text: _('amount'),width: 100,sortable: true,dataIndex: 'amount', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'total_amount', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'),summaryType:'sum'}
            ],
            features: [{
                groupHeaderTpl: 'Subject: {name}',
                ftype: 'groupingsummary'
            }],
            tbar: [
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
                            xtype: 'xtemployee',
                            editable: false,
                            emptyText: i18n('id'),
                            listeners:{
                                change:function(field){
                                    me.load_data(field);
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
                    fieldLabel: _('period'),
                    items: [
                        {
                            width: 60,
                            xtype : 'combo',
                            name: 'st_rate',
                            editable: false,
                            mode:'local',
                            value:1,
                            store: ['1','2'],
                            emptyText: i18n('rate')
                        },
                        {
                            width: 100,
                            xtype: 'textfield',
                            emptyText: i18n('period'),
                            listeners:{
                                specialkey:function(field, e){
                                    if(e.getKey()== e.ENTER){
                                        me.load_data(field);
                                    }
                                }
                            }
                        }
                    ]
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
        me.grid_period = Ext.create('Ext.grid.Panel', {
            store: me.store_period,
            title: _('period'),
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'emp_name'},
                {text: _('department'),width: 150,sortable: true,dataIndex: 'dept_name'},
                {text: _('job_status'),width: 150,sortable: true,dataIndex: 'js_name'},
                {text: _('job_title'),width: 150,sortable: true,dataIndex: 'job_name'},
                {text: _('ptkp_rates'),width: 150,sortable: true,dataIndex: 'ptkp_name'}
            ],
            features: [{
                groupHeaderTpl: 'Company : {name}',
                ftype: 'groupingsummary'
            }],
            tbar: [
                {
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'hbox'
                    },
                    fieldDefaults: {
                        labelAlign: 'right'
                    },
                    fieldLabel: _('salary_type'),
                    items: [
                        {
                            width: 100,
                            xtype : 'xtsalary_type',
                            editable: false,
                            name: 'emp_st_id',
                            allowBlank:false,
                            emptyText: i18n('id')
                        },
                        {
                            width: 200,
                            xtype : 'textfield',
                            name: 'emp_st_name',
                            readOnly: true,
                            emptyText: i18n('name'),
                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                        },
                        {
                            width: 80,
                            xtype : 'combo',
                            name: 'st_rate',
                            editable: false,
                            mode:'local',
                            store: ['1','2'],
                            emptyText: i18n('rate')
                        }
                    ]
                },
                {
                    width: 200,
                    xtype: 'textfield',
                    fieldLabel: _('period'),
                    emptyText: i18n('period'),
                    listeners:{
                        specialkey:function(field, e){
                            if(e.getKey()== e.ENTER){
                                var sub_period = me.grid_period.down('toolbar').items.items[0].items.items[2],
                                    st_id = me.grid_period.down('toolbar').items.items[0].items.items[0];
                                me.store_period.proxy.extraParams ={period:field.value, sub_period:sub_period.getValue(), st_id:st_id.getValue()};
                                me.store_period.load();
                            }
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: _('active'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewDataPeriod
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['emp_id',_('id')],['emp_name',_('name')],['company_name',_('company')],['dept_name',_('department')],['js_name',_('job_status')],['job_name',_('job_title')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                            var sub_period = me.grid_period.down('toolbar').items.items[0].items.items[2],
                                period = me.grid_period.down('toolbar').items.items[1],
                                st_id = me.grid_period.down('toolbar').items.items[0].items.items[0];
                            me.store_period.proxy.extraParams = {period:period.getValue(), sub_period:sub_period.getValue(), st_id:st_id.getValue(), field_name:me.field_name, field_search:field.value};
                            me.store_period.loadPage(1);}}
                    }
                }
            ]
        });
        me.grid_unpost = Ext.create('Ext.grid.Panel', {
            store: me.store_unpost,
            title: _('unpost'),
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'emp_name'},
                {text: _('department'),width: 150,sortable: true,dataIndex: 'dept_name'},
                {text: _('job_status'),width: 150,sortable: true,dataIndex: 'js_name'},
                {text: _('job_title'),width: 150,sortable: true,dataIndex: 'job_name'},
                {text: _('ptkp_rates'),width: 150,sortable: true,dataIndex: 'ptkp_name'}
            ],
            features: [{
                groupHeaderTpl: 'Company : {name}',
                ftype: 'groupingsummary'
            }],
            tbar: [
                {
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'hbox'
                    },
                    fieldDefaults: {
                        labelAlign: 'right'
                    },
                    fieldLabel: _('period'),
                    items: [
                        {
                            width: 60,
                            xtype : 'combo',
                            name: 'st_rate',
                            editable: false,
                            mode:'local',
                            value:1,
                            store: ['1','2'],
                            emptyText: i18n('rate')
                        },
                        {
                            width: 100,
                            xtype: 'textfield',
                            emptyText: i18n('period'),
                            listeners:{
                                specialkey:function(field, e){
                                    if(e.getKey()== e.ENTER){
                                        var form = field.up('container'), sub_period = form.items.items[0];
                                        me.store_unpost.proxy.extraParams ={period:field.value, sub_period:sub_period.getValue()};
                                        me.store_unpost.load();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: _('inactive'),
                            iconCls: 'icoAdd',
                            scope: me,
                            handler: me.onUnpostDataPeriod
                        }
                    ]
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['emp_id',_('id')],['emp_name',_('name')],['company_name',_('company')],['dept_name',_('department')],['js_name',_('job_status')],['job_name',_('job_title')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                            var sub_period = me.grid_unpost.down('toolbar').items.items[0].items.items[0],
                                period = me.grid_unpost.down('toolbar').items.items[0].items.items[1];
                            me.store_unpost.proxy.extraParams = {period:period.getValue(), sub_period:sub_period.getValue(), field_name:me.field_name, field_search:field.value};
                            me.store_unpost.loadPage(1);}}
                    }
                }
            ]
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
            items:[me.grid_period, me.grid,  me.grid_unpost, me.grid_up_down_rate]
        });
        me.pageBody = [ me.FormulirPanel];
        me.callParent(arguments);
    },
    onNewData: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length;
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            HRIS_Pph21.add(data, function(provider, response){
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
    onNewDataPeriod: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length;
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            HRIS_Pph21_period.add(data, function(provider, response){
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
            HRIS_Pph21_unpost.add(data, function(provider, response){
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
    load_data: function(field){
        var me=this, emp_id = me.grid.down('toolbar').items.items[0].items.items[0],
            sub_period = me.grid.down('toolbar').items.items[1].items.items[0],
            period = me.grid.down('toolbar').items.items[1].items.items[1];
        me.store.load({params:{emp_id:emp_id.getValue(), period:period.getValue(), sub_period:sub_period.getValue()}});
    },
    onUpdateRate: function(btn){
        var me = this;
        HRIS_Pph21_updown_rate.update({updown:me.up_down, updown_salary: me.up_down_salary, updown_rate:me.updown_rate}, function(provider, response){
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
        callback(true);
    }
});
