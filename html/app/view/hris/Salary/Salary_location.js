
Ext.define('App.view.hris.Salary.Salary_location', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('salary_location'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.Salary.Salary_location',{remoteSort: false, pageSize : 9999, autoLoad: false});
        function authCk(val){
            if(val == '1'){
                return '<img src="resources/images/icons/yes.gif" />';
            }else if(val == '0'){
                return '<img src="resources/images/icons/no.gif" />';
            }
            return val;
        }
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            /*selModel :  Ext.create( 'Ext.selection.CheckboxModel', {
                checkOnly: true,
                listeners: {
                    deselect: function(model, record, index) {
                        record.set('status', false);
                        HRIS_Salary_location.add(record.data, function(provider, response){
                        });
                    },
                    select: function(model, record, index) {
                        record.set('status', true);
                        HRIS_Salary_location.add(record.data, function(provider, response){
                        });
                    }
                    selectionchange: function(selectionModel, selected, options){
                        var result  = 0, total = Ext.ComponentQuery.query('#salary_location_employee_total')[0];
                        Ext.each(selected, function(selected){
                            result += 1;
                        });
                        //total.setText("Sum Total : " +Ext.util.Format.number(result, '0,000.00'));
                        total.setValue(result);
                    }
                }
            }),*/
            plugins: [
                me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false,
                    listeners: {
                        edit: function (editor, e, eOpts) {
                            var total = e.record.data.qty * e.record.data.price;
                            e.record.set("total", total);
                        }
                    }
                })
            ],
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'emp_name'},
                {text: _('company'),width: 60,sortable: true,dataIndex: 'company_id'},
                {text: _('job_status'),width: 150,sortable: true,dataIndex: 'js_name'},
                {text: _('office_location'),width: 150,sortable: true,dataIndex: 'ol_name'},
                {text: _('group'),width: 70,sortable: true,dataIndex: 'group_id'},
                {text: _('in'),width: 80,sortable: true,dataIndex: 'time_in'},
                {text: _('out'),width: 80,sortable: true,dataIndex: 'time_out'},
                {text: _('active'),width: 60,sortable: true,dataIndex: 'status',renderer: me.boolRenderer,
                    editor:{
                        xtype:'checkbox'
                    }},
                {text: _('quantity'),width: 60,sortable: true,dataIndex: 'qty', align:'right', enderer: Ext.util.Format.numberRenderer('0,000.00'), editor:{
                    xtype:'mitos.currency'
                }},
                {text: _('amount'),width: 100,sortable: true,dataIndex: 'price', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'total', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')}
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
                                {width: 270, xtype : 'xtol_type', fieldLabel: _('office_location'), labelAlign: 'right', name : 'ol_id', emptyText: i18n('office_location')},
                                {width: 270, xtype : 'xtjob_status', fieldLabel: _('job_status'), labelAlign: 'right', name : 'js_id', emptyText: i18n('job_status')},
                                {
                                    xtype: 'datefield',
                                    width: 200,
                                    labelAlign: 'right',
                                    fieldLabel: _('date'),
                                    emptyText: i18n('date'),
                                    format : 'Y-m-d',
                                    value: new Date(),
                                    listeners:{
                                        change:function(f){
                                            me.load_data();
                                        }
                                    }
                                    
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
                                            store: [['emp_id',_('id')],['emp_name',_('name')],['company_id',_('company')],['pos_name',_('position')],['ol_name',_('office_location')],['js_name',_('job_status')],['group_id',_('group')]],
                                            listeners:{change:function(){me.field_name=this.getValue();}}
                                        },
                                        {
                                            xtype:'textfield',
                                            emptyText: 'enter search key',
                                            width:150,
                                            listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                                                    var tb = me.grid.down('toolbar'), container_1 = tb.items.items[0].items.items[0],
                                                        company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(), js_id = container_1.items.items[2].getValue(),// dept_id =  container_1.items.items[2].items.items[0].getValue(),  pos_id = container_1.items.items[2].items.items[1].getValue(),
                                                        doc_date = container_1.items.items[3].getValue();
                                                    me.store.proxy.extraParams = {doc_date:doc_date, company_id:company_id, ol_id:ol_id, js_id:js_id,  field_name:me.field_name, field_search:field.value};
                                                    me.store.loadPage(1);}}
                                            }
                                        }
                                    ]
                                },
                                /*{width: 270, xtype : 'mitos.currenty', fieldLabel: _('quantity')+' '+_('total'), labelAlign: 'right', name : 'total_qty', emptyText: i18n('total')},
                                {width: 270, xtype : 'textfield', fieldLabel: _('employee')+' '+_('total'), labelAlign: 'right', name : 'total_employee', emptyText: i18n('employee')},
                                {width: 270, xtype : 'mitos.currency', fieldLabel: _('quantity')+'/'+_('employee'), labelAlign: 'right', name : 'qty', emptyText: i18n('quantity')},
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
                                }*/
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
        me.pageBody = [ me.grid];
        me.callParent(arguments);
    },
    load_data:function(){
        var me = this, tb = me.grid.down('toolbar'), container_1 = tb.items.items[0].items.items[0],
            company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(), js_id = container_1.items.items[2].getValue(),// dept_id =  container_1.items.items[2].items.items[0].getValue(),  pos_id = container_1.items.items[2].items.items[1].getValue(),
            doc_date = container_1.items.items[3].getValue();
        me.store.proxy.extraParams = {doc_date:doc_date, company_id:company_id, ol_id:ol_id, js_id:js_id}; //pos_id:pos_id,  dept_id:dept_id,
        me.store.loadPage(1);

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
