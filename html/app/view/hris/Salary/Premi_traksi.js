
Ext.define('App.view.hris.Salary.Premi_traksi', {
    extend: 'App.ux.RenderPanel',
    pageTitle: 'Premi Traksi',
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.Salary.Premi',{remoteSort: false, pageSize : 9999, autoLoad: false});

        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('attendance_status') == 'H' ? 'child-row' : '';
                }
            },
            plugins: [
                me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false,
                    listeners: {
                        edit: function (editor, e, eOpts) {
                            var total = e.record.data.qty * e.record.data.price;
                            e.record.set("total", total);
                        },
                        beforeedit: function(editor,e,opt){
                            if(e.record.data.attendance_status!='H'){
                                return false;
                            }
                        }
                    }
                })
            ],
            columns: [
                {text: _('job_status'),width: 80,sortable: true,dataIndex: 'js_id'},
                {text: _('type'),width: 100,sortable: true,dataIndex: 'sc_name'},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),width: 150,sortable: true,dataIndex: 'emp_name'},
                {text: 'Hasil Kerja',width: 60,sortable: true,dataIndex: 'hk', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00'), editor:{
                    xtype:'mitos.currency'
                }},
                {text: _('company'),width: 60,sortable: true,dataIndex: 'company_id'},
                {text: _('quantity'),width: 100,sortable: true,dataIndex: 'qty', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00'), editor:{
                    xtype:'mitos.currency', allowBlank:false,
                }},
                //{text: _('price'),width: 60,sortable: true,dataIndex: 'price', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('price'),width: 100,sortable: true, align:'right',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                        return Ext.util.Format.number(record.data.price, '0,000.00')+'/'+record.data.unit_id;
                    }},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'total', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('insentif'),width: 100,sortable: true,dataIndex: 'insentif', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00'), editor:{
                    xtype:'mitos.currency'
                }},
                {text: 'Kendaraan',width: 100,sortable: true,dataIndex: 'kendaraan_id',editor:{
                    xtype:'xtkendaraan', allowBlank:false, editable: false
                }},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks',editor:{
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
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    fieldDefaults: {
                                        labelAlign: 'right'
                                    },
                                    fieldLabel: _('mandor'),
                                    items: [
                                        {
                                            width: 100,
                                            xtype: 'xtmandor',
                                            editable: false,
                                            name: 'mandor_id',
                                            emptyText: i18n('id')
                                        },
                                        {
                                            width: 280,
                                            xtype: 'textfield',
                                            name: 'mandor_name',
                                            readOnly: true,
                                            emptyText: i18n('name'),
                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
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
                                    fieldLabel: _('type'),
                                    items: [
                                        {
                                            xtype:'xtaward_attendance',
                                            editable: false,
                                            //readOnly: true,
                                            width:150,
                                            listeners: {
                                                render: function(c){
                                                    c.getEl().on({
                                                        click: function() {
                                                            c.store.load({params:{no_sc_id:['UPM23']}});
                                                        }
                                                    });
                                                }
                                            }
                                        },
                                        {
                                            width: 100,
                                            xtype : 'datefield',
                                            editable: false,
                                            name: 'doc_date',
                                            format : 'Y-m-d',
                                            value: new Date(),
                                            maxValue : new Date(),
                                            emptyText: i18n('docdate')
                                        },
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
                                            store: [['emp_id',_('id')],['emp_name',_('name')],['company_id',_('company')],['pos_name',_('position')],['ol_name',_('office_location')],['js_name',_('job_status')],['afdeling_name',_('afdeling')],['pks_type','PKS']],
                                            listeners:{change:function(){me.field_name=this.getValue();}}
                                        },
                                        {
                                            xtype:'textfield',
                                            emptyText: 'enter search key',
                                            width:150,
                                            listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                                                var me = this, tb = me.grid.down('toolbar'), container_1 = tb.items.items[0].items.items[0],
                                                    mandor_id = container_1.items.items[0].items.items[0].getValue()
                                                    doc_type = container_1.items.items[1].items.items[0].getValue(), doc_date = container_1.items.items[1].items.items[1].getValue();
                                                    me.store.proxy.extraParams = {doc_date:doc_date, doc_type:doc_type, mandor_id:mandor_id, field_name:me.field_name, field_search:field.value};
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
            mandor_id = container_1.items.items[0].items.items[0].getValue(), doc_type = container_1.items.items[1].items.items[0].getValue(), doc_date = container_1.items.items[1].items.items[1].getValue();
            me.store.proxy.extraParams = {doc_date:doc_date, doc_type:doc_type, mandor_id:mandor_id}; //pos_id:pos_id,  dept_id:dept_id,
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
