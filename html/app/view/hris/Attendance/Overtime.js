
Ext.define('App.view.hris.Attendance.Overtime', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('overtime'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.Attendance.Overtime',{remoteSort: false, pageSize : 20, autoLoad: false});
        me.store_checkbox = Ext.create('App.store.hris.Attendance.Overtime',{remoteSort: false, pageSize : 20, autoLoad: false, groupField: 'emp_id'});
        me.store_replace = Ext.create('App.store.hris.Attendance.Overtime_replace',{remoteSort: false, pageSize : 20, autoLoad: false});

        me.myuploadform_overtime= new Ext.FormPanel({
            fileUpload: true,
            title :'Import Overtime',
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
                    id: 'filedata_overtime',
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
                    if(me.myuploadform_overtime.getForm().isValid()){
                        form_action=1;
                        me.myuploadform_overtime.getForm().submit({
                            url: 'dataProvider/HRIS_Overtime_Fileupload.php',
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
        me.grid = Ext.create('Ext.grid.Panel', {
            title: 'Manual',
            store: me.store,
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[5].setText("UserInput : " +record.data.userinput+" | UserEdit : " +record.data.useredit);
                    //me.store_detail.load({params:{emp_id:record.data.emp_id, overtime_date:record.data.overtime_date}});
                }
            },
            plugins: [
                me.edditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false
                })
            ],
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex:1,sortable: true,dataIndex: 'emp_name'},
                {text: _('company'),width: 80,sortable: true,dataIndex: 'company_id'},
                {text: _('office_location'),width: 80,sortable: true,dataIndex: 'ol_name'},
                {text: _('position'),width: 100,sortable: true,dataIndex: 'pos_name'},
                {text: _('group_by'),width: 80,sortable: true,dataIndex: 'group_id'},
                {text: _('date'),width: 80,sortable: true,dataIndex: 'overtime_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('time_from'),width: 80,sortable: true,dataIndex: 'time_in', editor:{
                        xtype:'timefield',format : 'H:i:s'
                    }},
                {text: _('time_to'),width: 80,sortable: true,dataIndex: 'time_out', editor:{
                        xtype:'timefield',format : 'H:i:s'
                    }},
                {text: _('duration')+' /'+_('hour'),width: 80,sortable: true,dataIndex: 'time_hours', align:'right', enderer: Ext.util.Format.numberRenderer('0,000.00'), editor:{
                        xtype:'mitos.currency'
                    }},
                {text: _('remarks'),flex:1,sortable: true,dataIndex: 'remarks', editor:{
                        xtype:'textfield'
                    }},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('active'),width: 60,sortable: true,dataIndex: 'status',renderer: me.boolRenderer,
                    editor:{
                        xtype:'checkbox'
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
                                    items: [
                                        {
                                            width: 200,
                                            fieldLabel: _('date'),
                                            xtype: 'datefield',
                                            value: new Date(),
                                            maxValue:new Date(),
                                            emptyText: i18n('date')
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
                                            store: [['emp_id',_('id')],['emp_name',_('name')],['company_id',_('company')],['ol_name',_('office_location')],['pos_name',_('position')],['group_id',_('group_by')],['remarks',_('remarks')]],
                                            listeners:{change:function(){me.field_name=this.getValue();}}
                                        },
                                        {
                                            xtype:'textfield',
                                            emptyText: 'enter search key',
                                            width:150,
                                            listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                                                    var tb = me.grid.down('toolbar'), container_1 = tb.items.items[0].items.items[0],
                                                        company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(), js_id = container_1.items.items[2].getValue(),// dept_id =  container_1.items.items[2].items.items[0].getValue(),  pos_id = container_1.items.items[2].items.items[1].getValue(),
                                                        mandor_id = container_1.items.items[3].items.items[0].getValue(), overtime_date = container_1.items.items[4].items.items[0].getValue();
                                                    me.store.proxy.extraParams = {overtime_type:'manual', mandor_id:mandor_id, overtime_date:overtime_date, company_id:company_id, ol_id:ol_id, js_id:js_id, field_name:me.field_name, field_search:field.value};
                                                    me.store.loadPage(1);
                                                }}}
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
        me.grid_Checkbox = Ext.create('Ext.grid.Panel', {
            title: 'Checkbox',
            store: me.store_checkbox,
            viewConfig :
                {
                    stripeRows: false,
                    getRowClass: function(record, index) {
                        return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                    }
                },
                listeners: {
                    itemclick: function(dv, record, item, index, e) {
                    }
                },
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex:1,sortable: true,dataIndex: 'emp_name'},
                {text: _('group_by'),width: 60,sortable: true,dataIndex: 'group_id'},
                {text: _('date'),width: 80,sortable: true,dataIndex: 'overtime_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('time_in'),width: 80,sortable: true,dataIndex: 'time_in'},
                {text: _('time_schedule_in'),width: 100,sortable: true,dataIndex: 'time_in_work'},
                {text: _('time_out'),width: 80,sortable: true,dataIndex: 'time_out'},
                {text: _('time_schedule_out'),width: 100,sortable: true,dataIndex: 'time_out_work'},
                {text: _('minute'),width: 50,sortable: true,dataIndex: 'time_minute', align:'right', enderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('hour'),width: 50,sortable: true,dataIndex: 'time_hours', align:'right', enderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('adjustment')+' /'+_('hour'),width: 80,sortable: true,dataIndex: 'time_hours_adjustment', align:'right', enderer: Ext.util.Format.numberRenderer('0,000.00')},
                //{text: _('remarks'),flex:1,sortable: true,dataIndex: 'remarks'},
                {text: _('active'),width: 60,sortable: true,dataIndex: 'status',renderer: me.boolRenderer}
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
                                    items: [
                                        {
                                            width: 200,
                                            fieldLabel: _('date'),
                                            xtype: 'datefield',
                                            value: new Date(),
                                            maxValue:new Date(),
                                            emptyText: i18n('date')
                                        },
                                        {
                                            xtype: 'button',
                                            text: _('view_data'),
                                            iconCls: 'generate_report',
                                            scope: me,
                                            handler: me.load_data_automatic
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
                                            store: [['emp_id',_('id')],['emp_name',_('name')],['company_id',_('company')],['ol_name',_('office_location')],['pos_name',_('position')],['group_id',_('group_by')],['remarks',_('remarks')]],
                                            listeners:{change:function(){me.field_name=this.getValue();}}
                                        },
                                        {
                                            xtype:'textfield',
                                            emptyText: 'enter search key',
                                            width:150,
                                            listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                                                var tb = me.grid_Checkbox.down('toolbar'), container_1 = tb.items.items[0].items.items[0],
                                                company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(), js_id = container_1.items.items[2].getValue(),// dept_id =  container_1.items.items[2].items.items[0].getValue(),  pos_id = container_1.items.items[2].items.items[1].getValue(),
                                                mandor_id = container_1.items.items[3].items.items[0].getValue(), overtime_date = container_1.items.items[4].items.items[0].getValue();
                                                me.store.proxy.extraParams = {overtime_type:'manual', mandor_id:mandor_id, overtime_date:overtime_date, company_id:company_id, ol_id:ol_id, js_id:js_id, field_name:me.field_name, field_search:field.value};
                                                me.store.loadPage(1);
                                                }}}
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
                                            width: 200,
                                            xtype : 'timefield',
                                            fieldLabel: _('time_from'),
                                            name: 'time_in',
                                            format : 'H:i:s',
                                            emptyText: i18n('time_from')
                                        },
                                        {
                                            width: 200,
                                            xtype : 'timefield',
                                            fieldLabel: _('time_to'),
                                            name: 'time_out',
                                            format : 'H:i:s',
                                            emptyText: i18n('time_to')
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
                                            width: 200,
                                            xtype : 'numberfield',
                                            fieldLabel: _('hour'),
                                            name: 'hour',
                                            emptyText: i18n('hour')
                                        },
                                        {
                                            xtype: 'button',
                                            text: _('save'),
                                            iconCls: 'icoAdd',
                                            scope: me,
                                            handler: me.onSave
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
                store: me.store_checkbox,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_replace = Ext.create('Ext.grid.Panel', {
            title: 'Lembur Pengganti',
            store: me.store_replace,
            viewConfig :
                {
                    stripeRows: false,
                    getRowClass: function(record, index) {
                        return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                    }
                },
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    autoCancel:true,
                    items: [
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
                                            fieldLabel: _('document'),
                                            items: [
                                                {
                                                    width: 200,
                                                    xtype: 'textfield',
                                                    name: 'doc_id',
                                                    readOnly: true,
                                                    fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;',
                                                    emptyText: i18n('id')
                                                },
                                                {
                                                    width: 100,
                                                    xtype : 'datefield',
                                                    editable: false,
                                                    name: 'doc_date',
                                                    format : 'Y-m-d',
                                                    value: new Date(),
                                                    maxValue : new Date(),
                                                    emptyText: i18n('docdate'),
                                                    allowBlank:false
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
                                                    width: 100,
                                                    xtype: 'xtemployee',
                                                    name: 'emp_id',
                                                    allowBlank: false,
                                                    emptyText: i18n('id')
                                                },
                                                {
                                                    width: 280,
                                                    xtype: 'textfield',
                                                    name: 'emp_name',
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
                                            fieldLabel: _('remarks'),
                                            items: [
                                                {
                                                    width: 380,
                                                    height: 50,
                                                    xtype: 'textarea',
                                                    style:{overflow:'auto'},
                                                    name: 'remarks',
                                                    emptyText: i18n('remarks'),
                                                    labelAlign: 'top'
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
                                            fieldLabel: _('total')+' '+_('hour'),
                                            items: [
                                                {
                                                    width: 100,
                                                    xtype: 'mitos.currency',
                                                    name: 'time_hours',
                                                    emptyText: i18n('subtotal')
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
                                            fieldLabel: _('active'),
                                            items: [
                                                {
                                                    width: 125,
                                                    xtype: 'checkbox',
                                                    name: 'status'
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
                    var useredit = me.grid_replace.down('toolbar');
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('company'),width: 80,sortable: true,dataIndex: 'company_id'},
                {text: _('office_location'),width: 100,sortable: true,dataIndex: 'ol_id'},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_id'},
                {text: _('employee'),width: 80,sortable: true,dataIndex: 'emp_name'},
                {text: _('total')+' '+_('hour'),width: 100,sortable: true,dataIndex: 'time_hours', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex:1,sortable: true,dataIndex: 'remarks'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('add'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['company_id',_('company')],['ol_name',_('office_location')],['emp_id',_('id')],['emp_name',_('employee')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                            me.store_replace.proxy.extraParams = {field_name:me.field_name, field_search:field.value};
                            me.store_replace.loadPage(1);}}
                    }
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_replace,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_all = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items: [me.grid, me.grid_Checkbox, me.grid_replace],
            listeners: {
                render: function() {
                    this.items.each(function(i, index, items){
                        i.tab.on('click', function(){
                            if(index==2){
                                i.store.load();
                            }
                               
                        });
                    });
                }
            }
        });
        me.pageBody = [ me.grid_all];
        me.callParent(arguments);
    },
    onNewUser: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
    },
    load_data:function(){
        var me = this, tb = me.grid.down('toolbar'), container_1 = tb.items.items[0].items.items[0], container_2 = tb.items.items[0].items.items[1],
            company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(), js_id = container_1.items.items[2].getValue(),// dept_id =  container_1.items.items[2].items.items[0].getValue(),  pos_id = container_1.items.items[2].items.items[1].getValue(),
            mandor_id = container_1.items.items[3].items.items[0].getValue(), overtime_date = container_1.items.items[4].items.items[0].getValue();
        me.store.proxy.extraParams = {overtime_type:'manual', mandor_id:mandor_id, overtime_date:overtime_date, company_id:company_id, ol_id:ol_id, js_id:js_id}; //pos_id:pos_id,  dept_id:dept_id,
        me.store.loadPage(1);

    },
    load_data_automatic:function(){
        var me = this, tb = me.grid_Checkbox.down('toolbar'), container_1 = tb.items.items[0].items.items[0], container_2 = tb.items.items[0].items.items[1],
            company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(), js_id = container_1.items.items[2].getValue(),// dept_id =  container_1.items.items[2].items.items[0].getValue(),  pos_id = container_1.items.items[2].items.items[1].getValue(),
            mandor_id = container_1.items.items[3].items.items[0].getValue(), overtime_date = container_1.items.items[4].items.items[0].getValue();
        me.store_checkbox.proxy.extraParams = {overtime_type:'manual', mandor_id:mandor_id, overtime_date:overtime_date, company_id:company_id, ol_id:ol_id, js_id:js_id}; //pos_id:pos_id,  dept_id:dept_id,
        me.store_checkbox.loadPage(1);
    },
    onSave: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length,
            tb = btn.up('toolbar'), container_2 = tb.items.items[0].items.items[1],
            time_in = container_2.items.items[1].items.items[0].getValue(), time_out = container_2.items.items[1].items.items[1].getValue(),
            time_hours = container_2.items.items[2].items.items[0].getValue();
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            data.time_in=time_in; data.time_out=time_out; data.status=1; data.time_hours=time_hours;
                HRIS_Overtime.update(data, function(provider, response){
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
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        //this.store.proxy.extraParams = {overtime_date:new Date()};
        //this.store.load();
        callback(true);
    }
});
