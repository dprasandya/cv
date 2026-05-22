
Ext.define('App.view.hris.Pph21.Bpjs_employee', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('bpjs'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.Pph21.Bpjs_employee',{remoteSort: false, pageSize : 20, autoLoad: false, groupField: 'sc_type'});
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'emp_name'},
                {text: _('company'),width: 80,sortable: true,dataIndex: 'company_id'},
                {text: _('department'),width: 150,sortable: true,dataIndex: 'dept_name'},
                {text: _('job_status'),width: 150,sortable: true,dataIndex: 'js_name'},
                {text: _('salary_calculation'),width: 80,sortable: true,dataIndex: 'salary_calculation', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('company')+' component',width: 150,sortable: true,dataIndex: 'sc_name_company'},
                {text: _('amount'),width: 80,sortable: true,dataIndex: 'nominal_company', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('employee')+' component',width: 150,sortable: true,dataIndex: 'sc_name_employee'},
                {text: _('amount'),width: 80,sortable: true,dataIndex: 'nominal_employee', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')}
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
                                                        company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(),
                                                        bpjs_id = container_2.items.items[0].items.items[1].getValue();
                                                    me.store.proxy.extraParams = {company_id:company_id,  ol_id:ol_id, bpjs_id:bpjs_id, field_name:me.field_name, field_search:field.value};
                                                    me.store.loadPage(1);}}
                                            }
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
                                    items: [
                                        {
                                            xtype : 'combo',
                                            emptyText: ('Pilih ')+_('type'),
                                            width:120,
                                            editable:false,
                                            name: 'bpjs_type',
                                            mode:'local',
                                            store: ['KESEHATAN','KETENAGAKERJAAN'],
                                            listeners:{
                                                change:function(f){
                                                    var form = f.up('container'), bpjs_id = form.items.items[1];
                                                    bpjs_id.extraParams = f.value;
                                                }
                                            }
                                        },
                                        {
                                            width: 100,
                                            xtype : 'xtbpjs',
                                            name: 'bpjs_id',
                                            editable: false,
                                            emptyText: i18n('bpjs'),
                                            listeners:{
                                                change:function(f){
                                                    me.store.proxy.extraParams = {bpjs_id:f.value}
                                                    me.load_data();
                                                }
                                            }
                                        },
                                        {
                                            width: 200,
                                            xtype: 'textfield',
                                            name: 'bpjs_name',
                                            readOnly: true,
                                            emptyText: i18n('name'),
                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;'
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
                                    fieldLabel: _('company'),
                                    items: [
                                        {
                                            width: 200,
                                            xtype: 'textfield',
                                            name: 'sc_name_company',
                                            readOnly: true,
                                            emptyText: i18n('name'),
                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;'
                                        },
                                        {
                                            width: 100,
                                            xtype: 'mitos.currency',
                                            name: 'nominal_company',
                                            readOnly: true,
                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none; text-align:right;'
                                        },
                                        {
                                            width: 80,
                                            xtype: 'mitos.percent',
                                            name: 'rate_company',
                                            readOnly: true,
                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none; text-align:right;'
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
                                    fieldLabel: _('employee'),
                                    items: [
                                        {
                                            width: 200,
                                            xtype: 'textfield',
                                            name: 'sc_name_employee',
                                            readOnly: true,
                                            emptyText: i18n('name'),
                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;'
                                        },
                                        {
                                            width: 100,
                                            xtype: 'mitos.currency',
                                            name: 'nominal_employee',
                                            readOnly: true,
                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none; text-align:right;'
                                        },
                                        {
                                            width: 80,
                                            xtype: 'mitos.percent',
                                            name: 'rate_employee',
                                            readOnly: true,
                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none; text-align:right;'
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
                                            text: _('view_data'),
                                            iconCls: 'generate_report',
                                            scope: me,
                                            handler: me.load_data
                                        },
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
                        }]
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
    onNewData: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length,
            tb = me.grid.down('toolbar'), bpjs_id = tb.items.items[0].items.items[1].items.items[0].items.items[1];//.items.items[0].items.items[1];

        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            data.bpjs_id = bpjs_id.getValue();
            HRIS_Bpjs_employee.add(data, function(provider, response){
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
                    //store.remove(data_selected.getSelection());
                }
            }); store.load();
        }
    },
    load_data:function(){
        var me = this, tb = me.grid.down('toolbar'), container_1 = tb.items.items[0].items.items[0], container_2 = tb.items.items[0].items.items[1],
            company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(),
            bpjs_id = container_2.items.items[0].items.items[1].getValue();
        me.store.proxy.extraParams = {company_id:company_id, ol_id:ol_id, bpjs_id:bpjs_id};
        me.store.loadPage(1);

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
