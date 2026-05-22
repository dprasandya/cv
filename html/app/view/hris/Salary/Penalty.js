
Ext.define('App.view.hris.Salary.Penalty', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('penalty'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.Salary.Penalty',{remoteSort: false, pageSize : 9999, autoLoad: false});

        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            plugins: [
                me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false
                })
            ],
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),width: 150,sortable: true,dataIndex: 'emp_name'},
                {text: _('company'),width: 60,sortable: true,dataIndex: 'company_id'},
                {text: _('job_status'),width: 150,sortable: true,dataIndex: 'js_name'},
                {text: _('office_location'),width: 150,sortable: true,dataIndex: 'ol_name'},
                {text: _('afdeling'),flex: 1,sortable: true,dataIndex: 'afdeling_name'},
                {text: _('amount'),width: 100,sortable: true,dataIndex: 'nominal', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00'), editor:{
                    xtype:'mitos.currency'
                }},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks', editor:{
                    xtype:'textfield'
                }}
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
