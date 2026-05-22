
Ext.define('App.view.hris.employee.Salary_Adjustment', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('salary_adjustment'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.employee.Salary_Adjustment',{remoteSort: true, pageSize : 100, autoLoad: false, groupField: 'group_id'});
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            plugins: [
                me.edditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false
                })
            ],
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('company'),width: 80,sortable: true,dataIndex: 'company_id', align:'center'},
                {text: _('employee'),width: 120,sortable: true,dataIndex: 'emp_name', align:'left'},
                {text: _('job_status'),width: 120,sortable: true,dataIndex: 'js_name', align:'left'},
                {text: _('position'),width: 120,sortable: true,dataIndex: 'pos_name', align:'left'},
                {text: _('salary_component'),flex: 1,sortable: true,dataIndex: 'sc_name'},
                //{text: _('type'),width: 80,sortable: true,dataIndex: 'sc_type', align:'center'},
                {text: _('amount')+' '+_('old'),width: 100,sortable: true,dataIndex: 'amount_old', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('amount')+' '+_('new'),width: 100,sortable: true,dataIndex: 'amount_new', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    editor:{
                        xtype:'mitos.currency'
                    }
                },
                {text: _('date'),width: 100,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y'), editor:{
                        xtype:'datefield',
                        format : 'Y-m-d',
                        editable : false,
                        allowBlank: false,
                        value: new Date(),
                        maxValue : new Date(),
                        emptyText: i18n('date')
                    }},
                {text: _('active'),width: 60,sortable: true,dataIndex: 'status',renderer: me.boolRenderer,
                    editor:{
                        xtype:'checkbox'
                    }}

            ],
            features: [{
                groupHeaderTpl: 'Group : {name}',
                ftype: 'groupingsummary'
            }],
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
                                {width: 270, xtype : 'xtcompany', fieldLabel: _('company'), labelAlign: 'right', name : 'company_id', emptyText: i18n('company'),
                                    listeners:{
                                        change:function(f){me.load_data();}
                                    }},
                                {
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
                                },
                                {width: 250, xtype : 'xtjob_status',  fieldLabel: _('job_status'), labelAlign: 'right', name : 'js_id', emptyText: i18n('job_status'),
                                    listeners:{
                                        change:function(f){me.load_data();}
                                    }},
                                {
                                    xtype:'combo',
                                    labelAlign: 'right',
                                    editable: false,
                                    width:200,
                                    mode:'local',
                                    fieldLabel: _('group_name'),
                                    name: 'emp_group_id',
                                    store: [['A','A'],['B','B'],['C','C'],['D','D'],['CS','CS'],['MTC','MTC'],['SZ','SZ'],['TE','TE'],['','NON GROUP']],
                                    emptyText: i18n('group_name'),
                                    listeners:{
                                        change:function(f){me.load_data();}
                                    }
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    fieldDefaults: {
                                        labelAlign: 'right'
                                    },
                                    fieldLabel: _('salary_component'),
                                    items: [
                                        {
                                            width: 100,
                                            xtype: 'xtsalary_component',
                                            name: 'sc_id',
                                            editable: false,
                                            emptyText: i18n('id'),
                                            extraParams:['I'],
                                            listeners:{
                                                change:function(f){me.load_data();}
                                            }
                                        },
                                        {
                                            width: 150,
                                            xtype: 'textfield',
                                            name: 'sc_name',
                                            readOnly: true,
                                            emptyText: i18n('name'),
                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;'
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
                                            store: [['emp_id',_('id')],['emp_name',_('name')],['pos_name',_('position')],['type',_('sc_type')],['sc_name',_('salary_component')],['js_name',_('job_status')],['job_name',_('job_title')]],
                                            listeners:{change:function(){me.field_name=this.getValue();}}
                                        },
                                        {
                                            xtype:'textfield',
                                            emptyText: 'enter search key',
                                            width:150,
                                            listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                                                    var tb = me.grid.down('toolbar'), container_1 = tb.items.items[0].items.items[0], container_2 = tb.items.items[0].items.items[1],
                                                        company_id = container_1.items.items[0].getValue(), pos_id = container_1.items.items[1].items.items[1].getValue(),  js_id = container_1.items.items[2].getValue(), group_id = container_1.items.items[3].getValue(), sc_id = container_1.items.items[4].items.items[0].getValue();
                                                        me.store.proxy.extraParams = {company_id:company_id, pos_id:pos_id, js_id:js_id, group_id:group_id, sc_id:sc_id, field_name:me.field_name, field_search:field.value};
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
                                    fieldLabel: _('salary'),
                                    items: [
                                        {
                                            width: 100,
                                            xtype: 'mitos.currency',
                                            name: 'salary'
                                        },
                                        {
                                            xtype: 'button',
                                            text: _('update'),
                                            iconCls: 'icoAdd',
                                            scope: me,
                                            handler: me.onNewUser
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
        me.pageBody = [ me.grid ];
        me.callParent(arguments);
    },
    load_data:function(){
        var me = this, tb = me.grid.down('toolbar'), container_1 = tb.items.items[0].items.items[0], container_2 = tb.items.items[0].items.items[1],
            company_id = container_1.items.items[0].getValue(), pos_id = container_1.items.items[1].items.items[1].getValue(),  js_id = container_1.items.items[2].getValue(), group_id = container_1.items.items[3].getValue(), sc_id = container_1.items.items[4].items.items[0].getValue(),
            salary = container_2.items.items[1].items.items[0].getValue();
        me.store.proxy.extraParams = {company_id:company_id, pos_id:pos_id,  js_id:js_id, group_id:group_id, sc_id:sc_id };
        me.store.loadPage(1);

    },
    onNewUser: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length,
            tb = me.grid.down('toolbar'), container_1 = tb.items.items[0].items.items[0], container_2 = tb.items.items[0].items.items[1],
            salary = container_2.items.items[1].items.items[0].getValue();
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            data.amount_new = salary;
            HRIS_Salary_Adjustment.update(data, function(provider, response){
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
                }
            });
        }
        store.load();
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
