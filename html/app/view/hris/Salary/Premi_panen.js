
Ext.define('App.view.hris.Salary.Premi_panen', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('premi'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.Salary.Premi',{remoteSort: false, pageSize : 9999, autoLoad: false});
        me.store_coa = Ext.create('App.store.hris.Salary.Premi_coa');

        me.grid_coa = Ext.create('Ext.grid.Panel', {
            store: me.store_coa,
            height: 1000,
            autoScroll: false,
            title: _('detail'),
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            plugins: [
                me.edditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    items: [
                        {
                            xtype:'panel',
                            layout: 'hbox',
                            items:[
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    title: _('detail'),
                                    layout: 'hbox',
                                    flex:1,
                                    items:[
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
                                                    fieldLabel: _('account'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtaccount',
                                                            name: 'coa_id',
                                                            editable: false,
                                                            emptyText: i18n('id')
                                                        },
                                                        {
                                                            width: 198,
                                                            xtype: 'textfield',
                                                            readOnly: true,
                                                            name: 'coa_name',
                                                            emptyText: i18n('name'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    title: _('price'),
                                    layout: 'hbox',
                                    flex:1,
                                    items:[
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
                                                    fieldLabel: _('price'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'mitos.currency',
                                                            name: 'total',
                                                            allowBlank:false,
                                                            enableKeyEvents: true,
                                                            emptyText: i18n('price'),
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
            columns: [
                
                {text: _('id'),width: 90,sortable: true,dataIndex: 'coa_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'coa_name',summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('subtotal'),width: 100,sortable: true,dataIndex: 'total', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                
            ],
            features: [{
                ftype: 'summary'
            }],
            tbar: [
                {
                    xtype: 'button',
                    text: _('add'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewDetail
                }
            ]
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('attendance_status') == 'H' ? 'child-row' : '';
                }
            },
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    me.data= record.data;
                    }
            },
            plugins: [
                me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false,
                    listeners: {
                        edit: function (editor, e, eOpts) {
                            me.load_data();
                            //var total = e.record.data.qty * e.record.data.price;
                            //e.record.set("total", total);
                        },
                        //DISABLE pengaman harus ada KEHADIRAN
                        beforeedit: function(editor,e,opt){
                            if(e.record.data.attendance_status!='H'){
                                return false;
                            }
                        }
                    }
                })
            ],
            columns: [
                //{text: _('afdeling'),flex: 1,sortable: true,dataIndex: 'afdeling_name'},
                //{text: 'PKS',flex: 1,sortable: true,dataIndex: 'pks_type'},
                //{text: _('job_status'),width: 150,sortable: true,dataIndex: 'js_name'},
                //{text: _('type'),width: 100,sortable: true,dataIndex: 'sc_name'},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),width: 150,sortable: true,dataIndex: 'emp_name'},
                {text: _('company'),width: 60,sortable: true,dataIndex: 'ol_id'},
                //{text: _('office_location'),width: 150,sortable: true,dataIndex: 'ol_name'},
                {text: _('quantity'),width: 100,sortable: true,dataIndex: 'qty', align:'right', renderer: Ext.util.Format.numberRenderer('0,000'), editor:{
                    xtype:'mitos.currency'
                }},
                //{text: 'Basis I',width: 60,sortable: true,dataIndex: 'basis1', align:'right', renderer: Ext.util.Format.numberRenderer('0,000')},
                //{text: 'Basis II',width: 60,sortable: true,dataIndex: 'basis2', align:'right', renderer: Ext.util.Format.numberRenderer('0,000')},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'total', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('insentif'),width: 100,sortable: true,dataIndex: 'insentif', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00'), editor:{
                    xtype:'mitos.currency'
                }},
                {text: _('afdeling'),width: 100,sortable: true,dataIndex: 'afdeling_id',editor:{
                    xtype:'xtafdeling', allowBlank:false, editable: false
                }},
                {text: _('remarks'),width: 150,sortable: true,dataIndex: 'remarks'},
                {
                    text: 'Jenis Pekerjaan',
                    width: 100,
                    align: 'center',
                    renderer: function(value, meta, record) {
                        var id = Ext.id();
                        Ext.defer(function(){
                            new Ext.Button({
                                text: 'View',
                                handler : function(btn, e) {
                                    console.log(record);
                                    //me.grid_coa.show();
                                    me.GridShow= Ext.create('App.ux.window.Window',{
                                        layout: 'fit',
                                        //title: me.data.cust_name+' - '+me.for_doc_id+' - '+me.data.item_name,
                                        width: 1100,
                                        height: 400,
                                        items:[me.grid_coa],
                                        modal:true
                                    });
                                    me.GridShow.show();
                                    me.store_coa.proxy.extraParams={emp_id:record.data.emp_id,doc_type:record.data.doc_type,doc_date:record.data.doc_date};
                                    me.store_coa.load();
                                }
                            }).render(document.body, id);
                        },40);
                        return Ext.String.format('<div id="{0}"></div>', id);
                    }
                },
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
                                            readOnly: true,
                                            width:150,
                                            value: 'UPM23'
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
    onNewDetail: function(){
        var me = this, plugin = me.grid_coa.editingPlugin;
        plugin.cancelEdit();
        me.store_coa.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        me.edditing.context.record.data.emp_id = me.data.emp_id;
        me.edditing.context.record.data.doc_type = me.data.doc_type;
        me.edditing.context.record.data.doc_date = me.data.doc_date;   
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
