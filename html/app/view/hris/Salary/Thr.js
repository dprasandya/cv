
Ext.define('App.view.hris.Salary.Thr', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('bonus_thr'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store_thr = Ext.create('App.store.hris.Salary.Thr',{remoteSort: false, pageSize : 9999, autoLoad: false});
        me.store_bonus = Ext.create('App.store.hris.Salary.Bonus',{remoteSort: false, pageSize : 100, autoLoad: false});
        me.myupload_bonus= new Ext.FormPanel({
            fileUpload: true,
            title :'Import '+'Bonus Produksi',
            width: 500,
            autoHeight: true,
            bodyStyle: 'padding: 10px 10px 10px 10px;',
            labelWidth: 50,
            defaults: {
                anchor: '95%',
                allowBlank: false,
                msgTarget: 'side'
            },
            items:[
                {
                    xtype: 'fileuploadfield',
                    id: 'filedata_bonus_produksi',
                    emptyText: 'Select a document to upload...',
                    fieldLabel: 'File',
                    buttonText: 'Browse',
                    listeners:{
                        change:function(f,v){
                            var note = Ext.DomQuery.selectNode('input[id='+f.getInputId()+']');
                            note.value = v.replace("C:\\fakepath\\","");
                        }
                    }
                }
            ],
            buttons: [{
                text: 'Upload',
                handler: function(){
                    if(me.myupload_bonus.getForm().isValid()){
                        form_action=1;
                        me.myupload_bonus.getForm().submit({
                            url: 'dataProvider/HRIS_Bonus_Fileupload.php',
                            waitMsg: 'Uploading file...',
                            success: function (fp, o) {
                                Ext.Msg.alert('Success', 'Your file has been uploaded.');
                            },
                            failure: function (fp, o) {
                                Ext.Msg.alert('Failure', !o.result.msg ? 'Your file did not upload correctly':o.result.msg );
                            }
                        });
                    }
                }
            }]
        });

        me.grid_thr = Ext.create('Ext.grid.Panel', {
            store: me.store_thr,
            title: _('thr'),
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'emp_name'},
                {text: _('company'),width: 80,sortable: true,dataIndex: 'company_id'},
                {text: _('job_status'),width: 150,sortable: true,dataIndex: 'js_name'},
                {text: _('office_location'),width: 150,sortable: true,dataIndex: 'ol_name'},
                {text: _('join_date'),width: 80,sortable: true,dataIndex: 'join_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('closed_date'),width: 80,sortable: true,dataIndex: 'closed_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('day'),width: 60,sortable: true,dataIndex: 'count_days', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('month'),width: 60,sortable: true,dataIndex: 'count_months', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('salary'),width: 100,sortable: true,dataIndex: 'salary', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('thr'),width: 100,sortable: true,dataIndex: 'thr_amount', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')}
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
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    fieldDefaults: {
                                        labelAlign: 'right'
                                    },
                                    fieldLabel: _('closed_date'),
                                    items: [
                                        {
                                            width: 100,
                                            xtype : 'datefield',
                                            editable: false,
                                            name: 'closed_date',
                                            format : 'Y-m-d',
                                            emptyText: i18n('closed_date')

                                        },
                                        {
                                            xtype: 'button',
                                            text: _('view_data'),
                                            iconCls: 'generate_report',
                                            scope: me,
                                            handler: me.load_data_thr
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
                                            store: [['emp_id',_('id')],['emp_name',_('name')],['company_id',_('company')],['ol_name',_('office_location')],['js_name',_('job_status')]],
                                            listeners:{change:function(){me.field_name=this.getValue();}}
                                        },
                                        {
                                            xtype:'textfield',
                                            emptyText: 'enter search key',
                                            width:150,
                                            listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                                                    var tb = me.grid_thr.down('toolbar'), container_1 = tb.items.items[0].items.items[0], container_2 = tb.items.items[0].items.items[1],
                                                        company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(), js_id = container_1.items.items[2].getValue(),// dept_id =  container_1.items.items[2].items.items[0].getValue(),  pos_id = container_1.items.items[2].items.items[1].getValue(),
                                                        closed_date = container_1.items.items[3].items.items[0].getValue();
                                                    me.store_thr.proxy.extraParams = {closed_date:closed_date, company_id:company_id, ol_id:ol_id, js_id:js_id,  field_name:me.field_name, field_search:field.value};
                                                    me.store_thr.loadPage(1);}}
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
                store: me.store_thr,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_bonus = Ext.create('Ext.grid.Panel', {
            store: me.store_bonus,
            title: _('bonus'),
            columns: [
                {text: _('period'),width: 80,sortable: true,dataIndex: 'period'},
                {text: _('sub_period'),width: 80,sortable: true,dataIndex: 'sub_period'},
                {text: _('salary_component'),width: 80,sortable: true,dataIndex: 'sc_name'},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'emp_name'},
                {text: _('company'),width: 80,sortable: true,dataIndex: 'company_id'},
                {text: _('job_status'),width: 150,sortable: true,dataIndex: 'js_name'},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'nominal', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')}
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
                                                    handler: me.load_data_produksi
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
                                            store: [['emp_id',_('id')],['emp_name',_('name')],['company_id',_('company')],['js_name',_('job_status')]],
                                            listeners:{change:function(){me.field_name=this.getValue();}}
                                        },
                                        {
                                            xtype:'textfield',
                                            emptyText: 'enter search key',
                                            width:150,
                                            listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                                                    var tb = me.grid_bonus.down('toolbar'), container_1 = tb.items.items[0].items.items[0], container_2 = tb.items.items[0].items.items[1],
                                                        company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(), js_id = container_1.items.items[2].getValue(),// dept_id =  container_1.items.items[2].items.items[0].getValue(),  pos_id = container_1.items.items[2].items.items[1].getValue(),
                                                        period = container_1.items.items[3].items.items[0].items.items[0].getValue(), sub_period = container_1.items.items[3].items.items[0].items.items[1].getValue();
                                                    me.store_bonus.proxy.extraParams = {sc_id:'BPS',period:period, sub_period:sub_period, company_id:company_id, ol_id:ol_id, js_id:js_id,  field_name:me.field_name, field_search:field.value};
                                                    me.store_bonus.loadPage(1);}}
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
                                            text: _('upload'),
                                            iconCls: 'icoOutbox',
                                            handler: function(){
                                                me.GridShow= Ext.create('App.ux.window.Window',{
                                                    layout: 'fit',
                                                    width: 500,
                                                    height: 120,
                                                    items:[me.myupload_bonus],
                                                    modal:true
                                                });
                                                me.GridShow.show();
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
                store: me.store_bonus,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.grid_thr, me.grid_bonus]
        });
        me.pageBody = [ me.FormulirPanel];
        me.callParent(arguments);
    },
    load_data_thr:function(){
        var me = this,  tb = me.grid_thr.down('toolbar'), container_1 = tb.items.items[0].items.items[0], container_2 = tb.items.items[0].items.items[1],
            company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(), js_id = container_1.items.items[2].getValue(),
            closed_date = container_1.items.items[3].items.items[0].getValue();
        me.store_thr.proxy.extraParams = {closed_date:closed_date, company_id:company_id, ol_id:ol_id, js_id:js_id};
        me.store_thr.loadPage(1);

    },
    load_data_produksi:function(){
        var me = this, tb = me.grid_bonus_produksi.down('toolbar'), container_1 = tb.items.items[0].items.items[0], container_2 = tb.items.items[0].items.items[1],
            company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(), js_id = container_1.items.items[2].getValue(),// dept_id =  container_1.items.items[2].items.items[0].getValue(),  pos_id = container_1.items.items[2].items.items[1].getValue(),
            period = container_1.items.items[3].items.items[0].items.items[0].getValue(), sub_period = container_1.items.items[3].items.items[0].items.items[1].getValue();
        me.store_bonus.proxy.extraParams = {sc_id:'BPS', period:period, sub_period:sub_period, company_id:company_id, ol_id:ol_id, js_id:js_id}; //pos_id:pos_id,  dept_id:dept_id,
        me.store_bonus.loadPage(1);

    },
    onNewData: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length;
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            HRIS_Thr.add(data, function(provider, response){
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
