
Ext.define('App.view.hris.Salary.Salary', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('salary'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.Salary.Salary',{remoteSort: false, pageSize : 9999, autoLoad: false});
        me.store_detail = Ext.create('App.store.hris.Salary.Salary_detail',{remoteSort: false, pageSize : 20, autoLoad: false, groupField: 'sc_type'});
        me.store_unpost = Ext.create('App.store.hris.Salary.Salary_unpost',{remoteSort: false, pageSize : 20, autoLoad: false});

        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            columns: [
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'sc_name'},
                {text: _('frequency'),width: 80,sortable: true,dataIndex: 'pay_frequency'},
                {text: _('quantity'),width: 60,sortable: true,dataIndex: 'total_index'},
                {text: _('amount'),width: 100,sortable: true,dataIndex: 'amount', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'total_amount', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')}
            ],
            features: [{
                groupHeaderTpl: 'Subject: {name}',
                ftype: 'groupingsummary'
            }]
        });
        me.grid_unpost = Ext.create('Ext.grid.Panel', {
            store: me.store_unpost,
            title: _('unpost'),
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'emp_name'},
                {text: _('company'),width: 80,sortable: true,dataIndex: 'company_id'},
                {text: _('job_status'),width: 150,sortable: true,dataIndex: 'js_name'},
                {text: _('office_location'),width: 150,sortable: true,dataIndex: 'ol_name'},
                {text: _('department'),width: 100,sortable: true,dataIndex: 'dept_name'},
                {text: _('position'),width: 100,sortable: true,dataIndex: 'pos_name'},
                {text: _('group_by'),width: 100,sortable: true,dataIndex: 'group_id'},
                {
                    text: _('detail'),
                    width: 60,
                    align: 'center',
                    renderer: function(value, meta, record) {
                        var id = Ext.id();
                        Ext.defer(function(){
                            new Ext.Button({
                                text: 'View',
                                handler : function(btn, e) {
                                    me.store_detail.proxy.extraParams = {emp_id: record.data.emp_id, period: record.data.period, sub_period: record.data.sub_period, company_id: record.data.company_id};
                                    me.store_detail.load();
                                    me.GridShow= Ext.create('App.ux.window.Window',{
                                        layout: 'fit',
                                        title: _('detail'),
                                        height: 200,
                                        width: 610,
                                        items:[me.grid_detail],
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
                    xtype: 'container',
                    layout:'hbox',
                    flex:1,
                    items: [
                        {
                            xtype: 'container',
                            layout:'anchor',
                            flex: 1,
                            items: [
                                {width: 270, xtype : 'xtcompany', fieldLabel: _('company'), labelAlign: 'right', name : 'company_id', emptyText: i18n('company')},
                                {width: 270, xtype : 'xtol_type', fieldLabel: _('office_location'), labelAlign: 'right', name : 'ol_id', emptyText: i18n('company')},
                                {width: 270, xtype : 'xtjob_status', fieldLabel: _('job_status'), labelAlign: 'right', name : 'js_id', emptyText: i18n('company')},
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
                                            xtype: 'fieldcontainer',
                                            layout: {
                                                type: 'hbox'
                                            },
                                            fieldDefaults: {
                                                labelAlign: 'right'
                                            },
                                            fieldLabel: _('period'),
                                            items: [
                                                {width: 100, maxLength:6, xtype : 'numberfield', name : 'report_period'},
                                                {width: 60,xtype : 'combo',name: 'report_sub_period',editable: false,mode:'local',value:'1',store: [['1','1'],['2','2'],['',_('combined')]]},
                                                {
                                                    xtype: 'button',
                                                    text: _('view_data'),
                                                    iconCls: 'generate_report',
                                                    scope: me,
                                                    handler: me.load_data_unpost
                                                }
                                            ]
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
                                    fieldLabel: _('search'),
                                    items: [
                                        {
                                            xtype:'combo',
                                            editable: false,
                                            width:100,
                                            mode:'local',
                                            store: [['emp_id',_('id')],['emp_name',_('name')],['company_id',_('company')],['pos_name',_('position')],['ol_name',_('office_location')],['js_name',_('job_status')],['dept_name',_('department')],['group_id',_('group')]],
                                            listeners:{change:function(){me.field_name=this.getValue();}}
                                        },
                                        {
                                            xtype:'textfield',
                                            emptyText: 'enter search key',
                                            width:150,
                                            listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                                                    var tb = me.grid_unpost.down('toolbar'), container_1 = tb.items.items[0].items.items[0], container_2 = tb.items.items[0].items.items[1],
                                                        company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(), js_id = container_1.items.items[2].getValue(),// dept_id =  container_1.items.items[2].items.items[0].getValue(),  pos_id = container_1.items.items[2].items.items[1].getValue(),
                                                        period = container_1.items.items[3].items.items[0].items.items[0].getValue(), sub_period = container_1.items.items[3].items.items[0].items.items[1].getValue();
                                                    me.store_unpost.proxy.extraParams = {period:period, sub_period:sub_period, company_id:company_id, ol_id:ol_id, js_id:js_id,  field_name:me.field_name, field_search:field.value};
                                                    me.store_unpost.loadPage(1);}}
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
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: _('unpost'),
                                            iconCls: 'icoAdd',
                                            scope: me,
                                            handler: me.onUnpost
                                        }
                                    ]
                                }

                            ]
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
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title: _('salary'),
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'emp_name'},
                {text: _('company'),width: 80,sortable: true,dataIndex: 'company_id'},
                {text: _('job_status'),width: 150,sortable: true,dataIndex: 'js_name'},
                {text: _('office_location'),width: 150,sortable: true,dataIndex: 'ol_name'},
                {text: _('department'),width: 100,sortable: true,dataIndex: 'dept_name'},
                {text: _('position'),width: 100,sortable: true,dataIndex: 'pos_name'},
                {text: _('group_by'),width: 100,sortable: true,dataIndex: 'group_id'},
                {
                    text: _('detail'),
                    width: 60,
                    align: 'center',
                    renderer: function(value, meta, record) {
                        var id = Ext.id();
                        Ext.defer(function(){
                            new Ext.Button({
                                text: 'View',
                                handler : function(btn, e) {
                                    me.store_detail.proxy.extraParams = {emp_id: record.data.emp_id, period: record.data.period, sub_period: record.data.sub_period, company_id: record.data.company_id};
                                    me.store_detail.load();
                                    me.GridShow= Ext.create('App.ux.window.Window',{
                                        layout: 'fit',
                                        title: _('detail'),
                                        height: 200,
                                        width: 610,
                                        items:[me.grid_detail],
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
                    xtype: 'container',
                    layout:'hbox',
                    flex:1,
                    items: [
                        {
                            xtype: 'container',
                            layout:'anchor',
                            flex: 1,
                            items: [
                                {width: 270, xtype : 'xtcompany', fieldLabel: _('company'), labelAlign: 'right', name : 'company_id', emptyText: i18n('company')},
                                {width: 270, xtype : 'xtol_type', fieldLabel: _('office_location'), labelAlign: 'right', name : 'ol_id', emptyText: i18n('company')},
                                {width: 270, xtype : 'xtjob_status', fieldLabel: _('job_status'), labelAlign: 'right', name : 'js_id', emptyText: i18n('company')},

                                /*{
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    fieldDefaults: {
                                        labelAlign: 'right'
                                    },
                                    fieldLabel: _('departments'),
                                    items: [
                                        {
                                            width: 120,
                                            xtype: 'xtdepartment',
                                            name: 'emp_dept_id',
                                            emptyText: i18n('department'),
                                            listeners:{
                                                change:function(f,e){
                                                    var cont = f.up('container'),
                                                        pos_id = cont.items.items[1];
                                                    pos_id.setValue(null);
                                                    me.dept_id= f.value;
                                                }
                                            }
                                        },
                                        {
                                            width: 150,
                                            xtype: 'xtposition',
                                            name: 'emp_pos_id',
                                            emptyText: i18n('position'),
                                            listeners: {
                                                render: function(c){
                                                    c.getEl().on({
                                                        click: function() {
                                                            c.store.load({params:{dept_id:me.dept_id}});
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    ]
                                },*/
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
                                            xtype: 'fieldcontainer',
                                            layout: {
                                                type: 'hbox'
                                            },
                                            fieldDefaults: {
                                                labelAlign: 'right'
                                            },
                                            fieldLabel: _('period'),
                                            items: [
                                                {width: 100, maxLength:6, xtype : 'numberfield', name : 'report_period'},
                                                {width: 60,xtype : 'combo',name: 'report_sub_period',editable: false,mode:'local',value:'1',store: [['1','1'],['2','2'],['',_('combined')]]},
                                                {
                                                    xtype: 'button',
                                                    text: _('view_data'),
                                                    iconCls: 'generate_report',
                                                    scope: me,
                                                    handler: me.load_data
                                                }
                                            ]
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
                                    fieldLabel: _('search'),
                                    items: [
                                        {
                                            xtype:'combo',
                                            editable: false,
                                            width:100,
                                            mode:'local',
                                            store: [['emp_id',_('id')],['emp_name',_('name')],['company_id',_('company')],['pos_name',_('position')],['ol_name',_('office_location')],['js_name',_('job_status')],['dept_name',_('department')],['group_id',_('group')]],
                                            listeners:{change:function(){me.field_name=this.getValue();}}
                                        },
                                        {
                                            xtype:'textfield',
                                            emptyText: 'enter search key',
                                            width:150,
                                            listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                                                    var tb = me.grid.down('toolbar'), container_1 = tb.items.items[0].items.items[0], container_2 = tb.items.items[0].items.items[1],
                                                        company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(), js_id = container_1.items.items[2].getValue(),// dept_id =  container_1.items.items[2].items.items[0].getValue(),  pos_id = container_1.items.items[2].items.items[1].getValue(),
                                                        period = container_1.items.items[3].items.items[0].items.items[0].getValue(), sub_period = container_1.items.items[3].items.items[0].items.items[1].getValue();
                                                    me.store.proxy.extraParams = {period:period, sub_period:sub_period, company_id:company_id, ol_id:ol_id, js_id:js_id,  field_name:me.field_name, field_search:field.value};
                                                    me.store.loadPage(1);}}
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
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: _('save'),
                                            iconCls: 'icoAdd',
                                            scope: me,
                                            handler: me.onNewData
                                        }
                                    ]
                                }

                            ]
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
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.grid,me.grid_unpost]
        });
        me.pageBody = [ me.FormulirPanel];
        me.callParent(arguments);
    },
    onNewData: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length;
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            HRIS_Salary.add(data, function(provider, response){
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
    load_data:function(){
        var me = this, tb = me.grid.down('toolbar'), container_1 = tb.items.items[0].items.items[0], container_2 = tb.items.items[0].items.items[1],
            company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(), js_id = container_1.items.items[2].getValue(),// dept_id =  container_1.items.items[2].items.items[0].getValue(),  pos_id = container_1.items.items[2].items.items[1].getValue(),
            period = container_1.items.items[3].items.items[0].items.items[0].getValue(), sub_period = container_1.items.items[3].items.items[0].items.items[1].getValue();
        me.store.proxy.extraParams = {period:period, sub_period:sub_period, company_id:company_id, ol_id:ol_id, js_id:js_id}; //pos_id:pos_id,  dept_id:dept_id,
        me.store.loadPage(1);

    },
    load_data_unpost:function(){
        var me = this, tb = me.grid_unpost.down('toolbar'), container_1 = tb.items.items[0].items.items[0], container_2 = tb.items.items[0].items.items[1],
            company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(), js_id = container_1.items.items[2].getValue(),// dept_id =  container_1.items.items[2].items.items[0].getValue(),  pos_id = container_1.items.items[2].items.items[1].getValue(),
            period = container_1.items.items[3].items.items[0].items.items[0].getValue(), sub_period = container_1.items.items[3].items.items[0].items.items[1].getValue();
        me.store_unpost.proxy.extraParams = {period:period, sub_period:sub_period, company_id:company_id, ol_id:ol_id, js_id:js_id}; //pos_id:pos_id,  dept_id:dept_id,
        me.store_unpost.loadPage(1);

    },

    onUnpost: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length;
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            HRIS_Salary_unpost.add(data, function(provider, response){
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
        callback(true);
    }
});
