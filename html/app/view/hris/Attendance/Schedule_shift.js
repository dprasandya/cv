
Ext.define('App.view.hris.Attendance.Schedule_shift', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('schedule_shift'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.Attendance.Schedule_shift',{remoteSort: false, pageSize : 99999, autoLoad: false});
        me.store_view_schedule = Ext.create('App.store.hris.Attendance.View_Schedule_shift',{remoteSort: false, pageSize : 31, autoLoad: false});
        me.store_shift = Ext.create('App.store.hris.Attendance.Shift',{remoteSort: false, pageSize : 31, autoLoad: false});
        me.store_shift_detail = Ext.create('App.store.hris.Attendance.Shift_detail',{remoteSort: false, pageSize : 31, autoLoad: false});
        me.store_non_shift = Ext.create('App.store.hris.Attendance.Schedule_non_shift',{remoteSort: false, pageSize : 31, autoLoad: false});
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title: _('schedule_shift'),
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('company'),width: 80,sortable: true,dataIndex: 'company_id'},
                {text: _('office_location'),width: 150,sortable: true,dataIndex: 'ol_name'},
                {text: _('job_status'),width: 150,sortable: true,dataIndex: 'js_name'},
                {text: _('department'),width: 100,sortable: true,dataIndex: 'dept_name'},
                {text: _('position'),width: 100,sortable: true,dataIndex: 'pos_name'},
                {text: _('group'),width: 100,sortable: true,dataIndex: 'group_id'},
                {text: _('id'),width: 100,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex:1,sortable: true,dataIndex: 'emp_name'}

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
                                            store: [['emp_id',_('id')],['emp_name',_('name')],['pos_name',_('position')],['ol_name',_('office_location')],['js_name',_('job_status')],['dept_name',_('department')],['group_id',_('group')]],
                                            listeners:{change:function(){me.field_name=this.getValue();}}
                                        },
                                        {
                                            xtype:'textfield',
                                            emptyText: 'enter search key',
                                            width:150,
                                            listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                                                    var tb = me.grid.down('toolbar'), container_1 = tb.items.items[0].items.items[0], container_2 = tb.items.items[0].items.items[1],
                                                        company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(), dept_id =  container_1.items.items[2].items.items[0].getValue(),  pos_id = container_1.items.items[2].items.items[1].getValue();
                                                    me.store.proxy.extraParams = {company_id:company_id, pos_id:pos_id,  dept_id:dept_id, ol_id:ol_id,  field_name:me.field_name, field_search:field.value};
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
                                    fieldLabel: _('date'),
                                    items: [
                                        {
                                            width: 100,
                                            xtype : 'datefield',
                                            editable: false,
                                            format : 'Y-m-d',
                                            value: new Date(),
                                            emptyText: i18n('start_date')
                                        },
                                        {
                                            width: 100,
                                            xtype : 'datefield',
                                            editable: false,
                                            format : 'Y-m-d',
                                            value: new Date(),
                                            emptyText: i18n('end_date')
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
                                    fieldLabel: _('time'),
                                    items: [
                                        {
                                            xtype:'xtshift',
                                            editable: false,
                                            width:200,
                                            name: 'day_type',
                                            listeners:{
                                                change:function(f,e){
                                                    var seq_id = f.displayTplData[0].seq_id, cont =  f.up('container'),
                                                    seq_id_field = cont.items.items[1];
                                                    seq_id_field.setValue(seq_id);
                                                    /*var time_in = f.displayTplData[0].time_in, time_out = f.displayTplData[0].time_out,
                                                        cont = f.up('container'), time_in_field = cont.items.items[1], time_out_field = cont.items.items[2];
                                                    if(f.value=='Off Day' || f.value=='Diliburkan' || f.value=='Sakit' || f.value=='Ijin' || f.value=='Absen 1/2 Hari' || f.value=='Libur 1/2 Hari' || f.value=='Lembur Hari(Libur/Besar)'){
                                                        time_in_field.setDisabled(true); time_out_field.setDisabled(true);
                                                    }else{
                                                        time_in_field.setDisabled(false); time_out_field.setDisabled(false);
                                                        time_in_field.setValue(time_in); time_out_field.setValue(time_out);
                                                    }*/
                                                }
                                            }
                                        },
                                        {
                                            width: 100,
                                            xtype : 'numberfield',
                                            hidden:true,
                                            name: 'seq_id',
                                            emptyText: i18n('id')
                                        },
                                        {
                                            xtype: 'button',
                                            text: _('save'),
                                            iconCls: 'icoAdd',
                                            scope: me,
                                            handler: me.onPost
                                        }
                                        /*{
                                            width: 80,
                                            xtype : 'timefield',
                                            editable: false,
                                            format : 'H:i:s',
                                            emptyText: i18n('in')
                                        },
                                        {
                                            width: 80,
                                            xtype : 'timefield',
                                            editable: false,
                                            format : 'H:i:s',
                                            emptyText: i18n('out')
                                        }*/
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
        me.grid_non_shift = Ext.create('Ext.grid.Panel', {
            store: me.store_non_shift,
            title: 'Non '+_('schedule_shift'),
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('company'),width: 80,sortable: true,dataIndex: 'company_id'},
                {text: _('office_location'),width: 150,sortable: true,dataIndex: 'ol_name'},
                {text: _('job_status'),width: 150,sortable: true,dataIndex: 'js_name'},
                {text: _('department'),width: 100,sortable: true,dataIndex: 'dept_name'},
                {text: _('position'),width: 100,sortable: true,dataIndex: 'pos_name'},
                {text: _('group'),width: 100,sortable: true,dataIndex: 'group_id'},
                {text: _('id'),width: 100,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex:1,sortable: true,dataIndex: 'emp_name'}

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
                                            handler: me.load_data_non_shift
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
                                            store: [['emp_id',_('id')],['emp_name',_('name')],['pos_name',_('position')],['ol_name',_('office_location')],['js_name',_('job_status')],['dept_name',_('department')],['group_id',_('group')]],
                                            listeners:{change:function(){me.field_name=this.getValue();}}
                                        },
                                        {
                                            xtype:'textfield',
                                            emptyText: 'enter search key',
                                            width:150,
                                            listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                                                    var tb = me.grid.down('toolbar'), container_1 = tb.items.items[0].items.items[0], container_2 = tb.items.items[0].items.items[1],
                                                        company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(), dept_id =  container_1.items.items[2].items.items[0].getValue(),  pos_id = container_1.items.items[2].items.items[01].getValue();
                                                    me.store_non_shift.proxy.extraParams = {company_id:company_id, pos_id:pos_id,  dept_id:dept_id, ol_id:ol_id,  field_name:me.field_name, field_search:field.value};
                                                    me.store_non_shift.loadPage(1);}}
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
                                    fieldLabel: _('date'),
                                    items: [
                                        {
                                            width: 100,
                                            xtype : 'datefield',
                                            editable: false,
                                            format : 'Y-m-d',
                                            value: new Date(),
                                            emptyText: i18n('start_date')
                                        },
                                        {
                                            width: 100,
                                            xtype : 'datefield',
                                            editable: false,
                                            format : 'Y-m-d',
                                            value: new Date(),
                                            emptyText: i18n('end_date')
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
                                    disabled: true,
                                    fieldLabel: _('type'),
                                    items: [
                                        {
                                            xtype:'combo',
                                            editable: false,
                                            width:200,
                                            name: 'day_type',
                                            store: ['Off Day','Off Day (Update)','Diliburkan','Libur 1/2 Hari', 'Sakit','Sakit Tanpa Keterangan','Sakit Kecelakaan Kerja','Ijin','Absen 1/2 Hari','Lembur Hari(Libur/Besar)','Lembur 1/2 Hari (Libur/Besar)','Cuti','Cuti Melahirkan','Cuti Kematian','Cuti Menikah','Work From Home(WFH)','Isoman']
                                        },
                                        {
                                            width: 100,
                                            xtype : 'numberfield',
                                            hidden:true,
                                            name: 'seq_id',
                                            emptyText: i18n('id')
                                        },
                                        {
                                            xtype: 'button',
                                            text: _('save'),
                                            iconCls: 'icoAdd',
                                            scope: me,
                                            handler: me.onPost_non_shift
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
                                    fieldLabel: _('office_hours'),
                                    items: [
                                        {
                                            width: 200,
                                            xtype: 'xtoffice_hours',
                                            name: 'oh_id',
                                            emptyText: i18n('office_hours')
                                        },
                                        {
                                            xtype: 'button',
                                            text: _('save'),
                                            iconCls: 'icoAdd',
                                            scope: me,
                                            handler: me.onPost_non_shift
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
                store: me.store_non_shift,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_view_schedule = Ext.create('Ext.grid.Panel', {
            store: me.store_view_schedule,
            title: _('view')+' '+_('schedule_shift'),
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('day_type') == 'Off Day' ? 'adult-row' : null;
                }
            },
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_view_schedule.down('toolbar');
                    useredit.items.items[3].setText("UserInput : " +record.data.userinput+" | UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('company'),width: 80,sortable: true,dataIndex: 'company_id'},
                {text: _('office_location'),width: 150,sortable: true,dataIndex: 'ol_name'},
                {text: _('position'),width: 100,sortable: true,dataIndex: 'pos_name'},
                {text: _('id'),width: 100,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex:1,sortable: true,dataIndex: 'emp_name'},
                {text: _('date'),width: 80,sortable: true,dataIndex: 'schedule_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('day'),width: 100,sortable: true,dataIndex: 'day_name'},
                {text: _('in'),width: 80,sortable: true,dataIndex: 'time_in'},
                {text: _('out'),width: 80,sortable: true,dataIndex: 'time_out'},
                {text: _('day_type'),width: 100,sortable: true,dataIndex: 'day_type', align:'center'}
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
                                    fieldLabel: _('date'),
                                    items: [
                                        {
                                            width: 100,
                                            xtype : 'datefield',
                                            editable: false,
                                            format : 'Y-m-d',
                                            value: new Date(),
                                            emptyText: i18n('start_date')
                                        },
                                        {
                                            width: 100,
                                            xtype : 'datefield',
                                            editable: false,
                                            format : 'Y-m-d',
                                            value: new Date(),
                                            emptyText: i18n('end_date')
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
                                            emptyText: i18n('name'),
                                            readOnly: true,
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
                                            xtype: 'button',
                                            text: _('view_data'),
                                            iconCls: 'generate_report',
                                            scope: me,
                                            handler: me.load_data_view_schedule
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
                store: me.store_view_schedule,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_shift_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_shift_detail,
            height: 390,
            title: _('detail'),
            plugins: [
                me.Form_Editing_Shift_Detail = Ext.create('App.ux.grid.RowFormEditing', {
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
                                            fieldLabel: _('time'),
                                            items: [
                                                {
                                                    xtype:'combo',
                                                    editable: false,
                                                    width:100,
                                                    name: 'shift',
                                                    mode:'local',
                                                    store: ['SHIFT 1','SHIFT 2','SHIFT 3','OFF','OFF(1/2)'],
                                                    listeners:{
                                                        change:function(f){
                                                            var cont = f.up('container'), time_in = cont.items.items[1], time_out = cont.items.items[2];
                                                            if(f.value=='OFF'){
                                                                time_in.setDisabled(true); time_out.setDisabled(true);
                                                            }else{
                                                                time_in.setDisabled(false); time_out.setDisabled(false);
                                                            }
                                                        }
                                                    }
                                                },
                                                {
                                                    width: 80,
                                                    xtype : 'timefield',
                                                    //editable: false,
                                                    name: 'time_in',
                                                    format : 'H:i:s',
                                                    emptyText: i18n('in')
                                                },
                                                {
                                                    width: 80,
                                                    xtype : 'timefield',
                                                    //editable: false,
                                                    name: 'time_out',
                                                    format : 'H:i:s',
                                                    emptyText: i18n('out')
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
                {text: _('id'),width:80,sortable: true,dataIndex: 'seq_id_detail'},
                {text: _('name'),flex:1,sortable: true,dataIndex: 'shift'},
                {text: _('in'),width: 150,sortable: true,dataIndex: 'time_in'},
                {text: _('out'),width: 150,sortable: true,dataIndex: 'time_out'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('add'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewDetail
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_shift_detail,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_shift = Ext.create('Ext.grid.Panel', {
            store: me.store_shift,
            title: _('master_shift'),
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    autoCancel:true,
                    items: [
                        {
                            xtype: 'tabpanel',
                            items: [
                                {
                                    xtype: 'panel',
                                    title: _('master_shift'),
                                    items:[
                                        {
                                            layout: 'hbox',
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
                                                                    fieldLabel: _('name'),
                                                                    items: [
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            name: 'shift',
                                                                            allowBlank: false,
                                                                            emptyText: i18n('name')
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
                                                                    fieldLabel: _('time'),
                                                                    items: [
                                                                        {
                                                                            width: 80,
                                                                            xtype : 'timefield',
                                                                            //editable: false,
                                                                            name: 'time_in',
                                                                            format : 'H:i:s',
                                                                            emptyText: i18n('in')
                                                                        },
                                                                        {
                                                                            width: 80,
                                                                            xtype : 'timefield',
                                                                            //editable: false,
                                                                            name: 'time_out',
                                                                            format : 'H:i:s',
                                                                            emptyText: i18n('out')
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
                                },
                                me.grid_shift_detail
                            ],
                            listeners: {
                                render: function() {
                                    this.items.each(function(i, index, items){
                                        i.tab.on('click', function(){
                                            if(index==1){
                                                i.store.proxy.extraParams={seq_id:me.shift.seq_id};
                                                i.store.load();
                                            }
                                        })
                                    });
                                }
                            }
                        }


                    ]
                })
            ],
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    me.shift = record.data;
                    var useredit = me.grid_view_schedule.down('toolbar');
                    useredit.items.items[3].setText("UserInput : " +record.data.userinput+" | UserEdit : " +record.data.useredit);
                    me.store_shift_detail.proxy.extraParams ={seq_id:record.data.seq_id};
                }
            },
            columns: [
                {text: _('name'),flex:1,sortable: true,dataIndex: 'shift'},
                {text: _('in'),width: 80,sortable: true,dataIndex: 'time_in'},
                {text: _('out'),width: 80,sortable: true,dataIndex: 'time_out'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('add'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_shift,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.grid, me.grid_non_shift, me.grid_view_schedule,me.grid_shift], //  ,
            listeners: {
                render: function() {
                    this.items.each(function(i, index, items){
                        i.tab.on('click', function(){
                            if(index==3){
                                i.store.load();
                            }
                        });
                    });
                }
            }
        });
        me.pageBody = [ me.FormulirPanel ];
        me.callParent(arguments);
    },
    onPost: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length,
            tb = btn.up('toolbar'), container_2 = tb.items.items[0].items.items[1],
            fromdate = container_2.items.items[1].items.items[0].getValue(), todate = container_2.items.items[1].items.items[1].getValue(),
            day_type = container_2.items.items[2].items.items[0].getValue(), seq_id = container_2.items.items[2].items.items[1].getValue();
           // time_in = container_2.items.items[2].items.items[1].getValue(), time_out = container_2.items.items[2].items.items[2].getValue();
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            data.fromdate = fromdate; data.todate=todate; data.day_type= day_type; data.seq_id = seq_id; //data.time_in = time_in; data.time_out = time_out;
            HRIS_Schedule_shift.add(data, function(provider, response){
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
    onPost_non_shift: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length,
            tb = btn.up('toolbar'), container_2 = tb.items.items[0].items.items[1],
            fromdate = container_2.items.items[1].items.items[0].getValue(), todate = container_2.items.items[1].items.items[1].getValue(),
            day_type = container_2.items.items[2].items.items[0].getValue(), seq_id = container_2.items.items[2].items.items[1].getValue(),
            oh_id = container_2.items.items[3].items.items[0].getValue();
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            data.fromdate = fromdate; data.todate=todate; data.day_type= day_type; data.seq_id = seq_id; data.oh_id = oh_id;
            HRIS_Schedule_shift.add(data, function(provider, response){
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
    load_data:function(){
        var me = this, tb = me.grid.down('toolbar'), container_1 = tb.items.items[0].items.items[0], container_2 = tb.items.items[0].items.items[1],
            company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(), dept_id =  container_1.items.items[2].items.items[0].getValue(),  pos_id = container_1.items.items[2].items.items[1].getValue();
        me.store.proxy.extraParams = {company_id:company_id, pos_id:pos_id,  dept_id:dept_id, ol_id:ol_id};
        me.store.loadPage(1);

    },
    load_data_non_shift:function(){
        var me = this, tb = me.grid_non_shift.down('toolbar'), container_1 = tb.items.items[0].items.items[0], container_2 = tb.items.items[0].items.items[1],
            company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(), dept_id =  container_1.items.items[2].items.items[0].getValue(),  pos_id = container_1.items.items[2].items.items[01].getValue();
        me.store_non_shift.proxy.extraParams = {company_id:company_id, pos_id:pos_id,  dept_id:dept_id, ol_id:ol_id};
        me.store_non_shift.loadPage(1);
    },
    load_data_view_schedule:function(){
        var me = this, tb = me.grid_view_schedule.down('toolbar'), container_1 = tb.items.items[0].items.items[0],
            fromdate = container_1.items.items[0].items.items[0].getValue(), todate = container_1.items.items[0].items.items[1].getValue(), emp_id =  container_1.items.items[1].items.items[0].getValue();
        me.store_view_schedule.proxy.extraParams = {fromdate:fromdate, todate:todate,  emp_id:emp_id};
        me.store_view_schedule.loadPage(1);
    },
    onNewData: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
    },
    onNewDetail:function(btn){
        var me = this;
        me.Form_Editing_Shift_Detail.cancelEdit();
        me.store_shift_detail.insert(0, {aktif: 1,authorized: 1});
        me.Form_Editing_Shift_Detail.startEdit(0, 0);
        me.Form_Editing_Shift_Detail.context.record.data.seq_id = me.shift.seq_id;
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
