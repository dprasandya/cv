
Ext.define('App.view.hris.employee.Employee', {
    extend: 'App.ux.RenderPanel',
    id: 'panelEmployee',
    pageTitle: _('employee'),
    initComponent: function(){
        var me = this; me.view_data_gaji =null;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.employee.Employee',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_emp_education = Ext.create('App.store.hris.employee.Emp_Education',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_emp_dependents = Ext.create('App.store.hris.employee.Emp_Dependents',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_emp_emergency_contact = Ext.create('App.store.hris.employee.Emp_Emergency_Contact',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_emp_work_experience = Ext.create('App.store.hris.employee.Emp_Work_Experience',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_emp_training = Ext.create('App.store.hris.employee.Emp_Training',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_emp_report_spv = Ext.create('App.store.hris.employee.Emp_Report_Spv',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_emp_position = Ext.create('App.store.hris.employee.Emp_Position',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_emp_salary_in = Ext.create('App.store.hris.employee.Emp_Salary',{remoteSort: true, pageSize : 20, autoLoad: true});
        me.store_emp_salary_out = Ext.create('App.store.hris.employee.Emp_Salary',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_emp_historical_salary = Ext.create('App.store.hris.employee.Emp_Historical_Salary',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_emp_bpjs = Ext.create('App.store.hris.employee.Emp_Bpjs',{remoteSort: true, pageSize : 20, autoLoad: false, groupField: 'sc_type'});

        me.myupload_employee= new Ext.FormPanel({
            fileUpload: true,
            title :'Import '+_('employee'),
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
                    id: 'filedata_employee',
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
                    if(me.myupload_employee.getForm().isValid()){
                        form_action=1;
                        me.myupload_employee.getForm().submit({
                            url: 'dataProvider/HRIS_Employee_Fileupload.php',
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
        me.myupload_salary= new Ext.FormPanel({
            fileUpload: true,
            title :'Import '+_('salary'),
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
                    id: 'filedata_salary',
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
                    if(me.myupload_salary.getForm().isValid()){
                        form_action=1;
                        me.myupload_salary.getForm().submit({
                            url: 'dataProvider/HRIS_Salary_Fileupload.php',
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
        me.grid_uploaded = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.myupload_employee, me.myupload_salary]
        });

        me.grid_emp_education = Ext.create('Ext.grid.Panel', {
            store: me.store_emp_education,
            height: 1000,
            autoScroll: false,
            title: _('education'),
            plugins: [
                me.form_emp_education = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    autoCancel:true,
                    items: [
                        {
                            layout:'hbox',
                            flex:1,
                            items:[
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
                                                    fieldLabel: _('level'),
                                                    items: [
                                                        {
                                                            xtype:'combo',
                                                            editable: false,
                                                            width:150,
                                                            mode:'local',
                                                            name: 'level',
                                                            store: [['SD',_('SD')],['SMP',_('SMP')], ['SMA',_('SMA')],['D3',_('D3')],['D4',_('D4')], ['S1',_('S1')], ['S2',_('S2')], ['S3',_('S3')]],
                                                            emptyText: i18n('level')
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
                                                    fieldLabel: _('institution'),
                                                    items: [
                                                        {
                                                            width: 250,
                                                            xtype: 'textfield',
                                                            name: 'institution',
                                                            emptyText: i18n('institution')
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
                                                    fieldLabel: _('majors'),
                                                    items: [
                                                        {
                                                            width: 250,
                                                            xtype: 'textfield',
                                                            name: 'majors',
                                                            emptyText: i18n('majors')
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
                                                            fieldLabel: _('year'),
                                                            xtype: 'numberfield',
                                                            name: 'join_year',
                                                            emptyText: i18n('year')
                                                        },
                                                        {
                                                            width: 200,
                                                            fieldLabel: _('score'),
                                                            xtype: 'mitos.currency',
                                                            name: 'score',
                                                            emptyText: i18n('score')
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
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_emp_education.down('toolbar');
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('level'),width: 80,sortable: true,dataIndex: 'level'},
                {text: _('institution'),flex:1,sortable: true, dataIndex: 'institution'},
                {text: _('majors'),width: 150,sortable: true, dataIndex: 'majors'},
                {text: _('year'),width: 80,sortable: true, dataIndex: 'join_year'},
                {text: _('score'),width: 80,sortable: true, dataIndex: 'score', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('education'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['level',_('level')],['institution',_('institution')],['major',_('majors')],['join_year',_('year')],['score',_('score')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_emp_education.proxy.extraParams = { emp_id:me.emp_id, field_name:me.field_name, field_search:field.value}; me.store_emp_education.load({params:{start:0}})}}}
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_emp_education,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_emp_dependents = Ext.create('Ext.grid.Panel', {
            store: me.store_emp_dependents,
            height: 1000,
            autoScroll: false,
            title: _('dependents'),
            plugins: [
                me.form_emp_emergency_contact = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    autoCancel:true,
                    items: [
                        {
                            layout:'hbox',
                            flex:1,
                            items:[
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
                                                            width: 250,
                                                            xtype: 'textfield',
                                                            name: 'contact_name',
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
                                                    fieldLabel: _('relationship'),
                                                    items: [
                                                        {
                                                            width: 200,
                                                            xtype: 'textfield',
                                                            name: 'contact_status',
                                                            emptyText: i18n('relationship')
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
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_emp_dependents.down('toolbar');
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('name'),width: 150,sortable: true,dataIndex: 'contact_name'},
                {text: _('relationship'),flex:1,sortable: true, dataIndex: 'contact_status'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('dependents'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['contact_name',_('name')],['contact_status',_('relationship')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_emp_dependents.proxy.extraParams = { emp_id:me.emp_id, field_name:me.field_name, field_search:field.value}; me.store_emp_dependents.load({params:{start:0}})}}}
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_emp_dependents,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_emp_emergency_contact = Ext.create('Ext.grid.Panel', {
            store: me.store_emp_emergency_contact,
            height: 1000,
            autoScroll: false,
            title: _('emer_contact'),
            plugins: [
                me.form_emp_emergency_contact = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    autoCancel:true,
                    items: [
                        {
                            layout:'hbox',
                            flex:1,
                            items:[
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
                                                            width: 250,
                                                            xtype: 'textfield',
                                                            name: 'contact_name',
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
                                                    fieldLabel: _('relationship'),
                                                    items: [
                                                        {
                                                            width: 200,
                                                            xtype: 'textfield',
                                                            name: 'contact_status',
                                                            emptyText: i18n('relationship')
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
                                                            fieldLabel: _('home_phone'),
                                                            xtype: 'textfield',
                                                            name: 'contact_home_tlp',
                                                            emptyText: i18n('home_phone')
                                                        },
                                                        {
                                                            width: 200,
                                                            fieldLabel: _('work_phone'),
                                                            xtype: 'textfield',
                                                            name: 'contact_work_tlp',
                                                            emptyText: i18n('work_phone')
                                                        },
                                                        {
                                                            width: 200,
                                                            fieldLabel: _('mobile_phone'),
                                                            xtype: 'textfield',
                                                            name: 'contact_mobile_tlp',
                                                            emptyText: i18n('mobile_phone')
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
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_emp_emergency_contact.down('toolbar');
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('name'),width: 150,sortable: true,dataIndex: 'contact_name'},
                {text: _('relationship'),flex:1,sortable: true, dataIndex: 'contact_status'},
                {text: _('home_phone'),width: 100,sortable: true, dataIndex: 'contact_home_tlp'},
                {text: _('work_phone'),width: 100,sortable: true, dataIndex: 'contact_work_tlp'},
                {text: _('mobile_phone'),width: 100,sortable: true, dataIndex: 'contact_mobile_tlp'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('emer_contact'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['contact_name',_('name')],['contact_status',_('relationship')],['contact_home_tlp',_('home_phone')],['contact_work_tlp',_('work_phone')],['contact_mobile_tlp',_('mobile_phone')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_emp_emergency_contact.proxy.extraParams = { emp_id:me.emp_id, field_name:me.field_name, field_search:field.value}; me.store_emp_emergency_contact.load({params:{start:0}})}}}
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_emp_emergency_contact,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_emp_work_experience = Ext.create('Ext.grid.Panel', {
            store: me.store_emp_work_experience,
            height: 1000,
            autoScroll: false,
            title: _('work_experience'),
            plugins: [
                me.form_emp_emergency_contact = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    autoCancel:true,
                    items: [
                        {
                            layout:'hbox',
                            flex:1,
                            items:[
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
                                                    fieldLabel: _('company'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'textfield',
                                                            name: 'company_name',
                                                            emptyText: i18n('name')
                                                        },
                                                        {
                                                            width: 230,
                                                            xtype: 'textfield',
                                                            name: 'company_desc',
                                                            emptyText: i18n('description')
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
                                                    fieldLabel: _('job_title'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'xtjob_title',
                                                            editable: false,
                                                            name: 'job_id',
                                                            allowBlank:false,
                                                            emptyText: i18n('id')
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
                                                    fieldLabel: _('departments'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'xtdepartment',
                                                            editable: false,
                                                            name: 'dept_id',
                                                            emptyText: i18n('id')
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
                                                            name: 'first_date',
                                                            format : 'Y-m-d',
                                                            value: new Date(),
                                                            maxValue : new Date(),
                                                            emptyText: i18n('begin_date')
                                                        },
                                                        {
                                                            width: 100,
                                                            xtype : 'datefield',
                                                            editable: false,
                                                            name: 'end_date',
                                                            format : 'Y-m-d',
                                                            value: new Date(),
                                                            maxValue : new Date(),
                                                            emptyText: i18n('end_date')
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
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_emp_work_experience.down('toolbar');
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('company'),width: 150,sortable: true,dataIndex: 'company_name'},
                {text: _('description'),flex:1,sortable: true, dataIndex: 'company_desc'},
                {text: _('job_title'),width: 100,sortable: true, dataIndex: 'job_id'},
                {text: _('departments'),width: 100,sortable: true, dataIndex: 'dept_id'},
                {text: _('begin_date'),width: 80,sortable: true,dataIndex: 'first_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('end_date'),width: 80,sortable: true,dataIndex: 'end_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('work_experience'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['company_name',_('company')],['company_desc',_('description')],['job_id',_('job_title')],['dept_id',_('departments')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_emp_work_experience.proxy.extraParams = { emp_id:me.emp_id, field_name:me.field_name, field_search:field.value}; me.store_emp_work_experience.load({params:{start:0}})}}}
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_emp_work_experience,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_emp_training = Ext.create('Ext.grid.Panel', {
            store: me.store_emp_training,
            height: 1000,
            autoScroll: false,
            title: _('training'),
            plugins: [
                me.form_emp_emergency_contact = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    autoCancel:true,
                    items: [
                        {
                            layout:'hbox',
                            flex:1,
                            items:[
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
                                                            name: 'training_name',
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
                                                    fieldLabel: _('institution'),
                                                    items: [
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'institution',
                                                            emptyText: i18n('institution')
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
                                                            fieldLabel: _('start_date'),
                                                            xtype : 'datefield',
                                                            editable: false,
                                                            name: 'start_date',
                                                            format : 'Y-m-d',
                                                            value: new Date(),
                                                            maxValue : new Date(),
                                                            emptyText: i18n('start_date')
                                                        },
                                                        {
                                                            width: 200,
                                                            fieldLabel: _('end_date'),
                                                            xtype : 'datefield',
                                                            editable: false,
                                                            name: 'end_date',
                                                            format : 'Y-m-d',
                                                            value: new Date(),
                                                            maxValue : new Date(),
                                                            emptyText: i18n('end_date')
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
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_emp_training.down('toolbar');
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('name'),flex:1,sortable: true,dataIndex: 'training_name'},
                {text: _('institution'),width: 150,sortable: true, dataIndex: 'institution'},
                {text: _('start_date'),width: 80,sortable: true,dataIndex: 'start_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('end_date'),width: 80,sortable: true,dataIndex: 'end_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('training'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['training_name',_('name')],['institution',_('institution')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_emp_training.proxy.extraParams = { emp_id:me.emp_id, field_name:me.field_name, field_search:field.value}; me.store_emp_training.load({params:{start:0}})}}}
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_emp_training,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_emp_report_spv = Ext.create('Ext.grid.Panel', {
            store: me.store_emp_report_spv,
            height: 1000,
            autoScroll: false,
            title: _('supervisor'),
            plugins: [
                me.form_emp_report_spv = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    autoCancel:true,
                    items: [
                        {
                            layout:'hbox',
                            flex:1,
                            items:[
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
                                                    fieldLabel: _('id'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtemployee',
                                                            name: 'emp_spv_id',
                                                            emptyText: i18n('id'),
                                                            extraParams:['DIR','MGR']
                                                        },
                                                        {
                                                            width: 200,
                                                            xtype: 'textfield',
                                                            name: 'emp_spv_name',
                                                            readOnly: true,
                                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;',
                                                            emptyText: i18n('id')
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
                                                    fieldLabel: _('reports'),
                                                    items: [
                                                        {
                                                            xtype:'combo',
                                                            editable: false,
                                                            width:200,
                                                            mode:'local',
                                                            name: 'reporting_method',
                                                            store: [['D',_('direct')],['I',_('indirect')]],
                                                            emptyText: i18n('method')
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
                                                    fieldLabel: _('approval'),
                                                    items: [
                                                        {
                                                            xtype:'combo',
                                                            editable: false,
                                                            width:200,
                                                            mode:'local',
                                                            name: 'approval_method',
                                                            store: [['T','Mengetahui'],['S','Menyetujui']],
                                                            emptyText: i18n('method')
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
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_emp_report_spv.down('toolbar');
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_spv_id'},
                {text: _('supervisor'),width: 150,sortable: true,dataIndex: 'emp_spv_name'},
                {text: _('reports'),flex:1,sortable: true, dataIndex: 'reporting_method'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('supervisor'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['emp_spv_id',_('id')],['emp_spv_name',_('supervisor')],['reporting_method',_('reports')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_emp_report_spv.proxy.extraParams = { emp_id:me.emp_id, field_name:me.field_name, field_search:field.value}; me.store_emp_report_spv.load({params:{start:0}})}}}
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_emp_report_spv,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_emp_position = Ext.create('Ext.grid.Panel', {
            store: me.store_emp_position,
            height: 1000,
            autoScroll: false,
            title: _('hictorical_position'),
            plugins: [
                me.form_emp_emergency_contact = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    autoCancel:true,
                    items: [
                        {
                            layout:'hbox',
                            flex:1,
                            items:[
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
                                                    items: [
                                                        {
                                                            width: 250,
                                                            fieldLabel: _('company'),
                                                            xtype: 'xtcompany',
                                                            name: 'company_id',
                                                            emptyText: i18n('company')
                                                        },
                                                        {
                                                            width: 250,
                                                            fieldLabel: _('office_location'),
                                                            xtype: 'xtol_type',
                                                            name: 'ol_id',
                                                            emptyText: i18n('office_location')
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
                                                            fieldLabel: _('departments'),
                                                            width: 250,
                                                            xtype: 'xtdepartment',
                                                            editable: false,
                                                            name: 'dept_id',
                                                            emptyText: i18n('id')
                                                        },
                                                        {
                                                            width: 250,
                                                            fieldLabel: _('job_title'),
                                                            xtype: 'xtjob_title',
                                                            editable: false,
                                                            name: 'job_id',
                                                            emptyText: i18n('id')
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
                                                    fieldLabel: _('job_status'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtjob_status',
                                                            name: 'js_id',
                                                            allowBlank:false,
                                                            emptyText: i18n('job_status')
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
                                                            fieldLabel: _('start_date'),
                                                            xtype : 'datefield',
                                                            editable: false,
                                                            name: 'start_date',
                                                            format : 'Y-m-d',
                                                            value: new Date(),
                                                            maxValue : new Date(),
                                                            emptyText: i18n('start_date')
                                                        },
                                                        {
                                                            width: 200,
                                                            fieldLabel: _('end_date'),
                                                            xtype : 'datefield',
                                                            editable: false,
                                                            name: 'end_date',
                                                            format : 'Y-m-d',
                                                            value: new Date(),
                                                            maxValue : new Date(),
                                                            emptyText: i18n('end_date')
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
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_emp_position.down('toolbar');
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('company'),width: 100,sortable: true,dataIndex: 'company_id'},
                {text: _('office_location'),width: 100,sortable: true, dataIndex: 'ol_id'},
                {text: _('departments'),width: 100,sortable: true, dataIndex: 'dept_id'},
                {text: _('job_title'),width: 100,sortable: true, dataIndex: 'job_id'},
                {text: _('job_status'),width: 100,sortable: true, dataIndex: 'js_id'},
                {text: _('start_date'),width: 80,sortable: true,dataIndex: 'start_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('end_date'),width: 80,sortable: true,dataIndex: 'end_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('hictorical_position'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['company_name',_('company')],['company_desc',_('description')],['job_id',_('job_title')],['dept_id',_('departments')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_emp_position.proxy.extraParams = { emp_id:me.emp_id, field_name:me.field_name, field_search:field.value}; me.store_emp_position.load({params:{start:0}})}}}
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_emp_position,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_emp_salary_out = Ext.create('Ext.grid.Panel', {
            store: me.store_emp_salary_out,
            height: 1000,
            autoScroll: false,
            title: _('out'),
            plugins: [
                me.form_emp_salary_out = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    autoCancel:true,
                    items: [
                        {
                            layout:'hbox',
                            flex:1,
                            items:[
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
                                                    fieldLabel: _('id'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtsalary_component',
                                                            name: 'sc_id',
                                                            editable: false,
                                                            emptyText: i18n('id'),
                                                            extraParams:['O']
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'sc_name',
                                                            readOnly: true,
                                                            emptyText: i18n('name'),
                                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            width: 100,
                                                            xtype: 'textfield',
                                                            name: 'sc_type',
                                                            hidden: true
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
                                                    fieldLabel: _('frequency'),
                                                    items: [
                                                        {
                                                            xtype:'combo',
                                                            editable: false,
                                                            width:150,
                                                            mode:'local',
                                                            name: 'pay_frequency',
                                                            store: [['M',_('month')], ['D',_('day')]],
                                                            emptyText: i18n('payment')
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
                                                    fieldLabel: _('amount'),
                                                    items: [

                                                        {
                                                            width: 150,
                                                            xtype: 'mitos.currency',
                                                            name: 'amount',
                                                            emptyText: i18n('amount')
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
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_emp_salary_out.down('toolbar');
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('name'),flex:1,sortable: true,dataIndex: 'sc_name'},
                {text: _('frequency'), width: 150,sortable: true, dataIndex: 'pay_frequency',summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('amount'),width: 100,sortable: true, dataIndex: 'amount', summaryType:'sum', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            features: [{
                ftype: 'summary'
            }],
            tbar: [
                {
                    xtype: 'button',
                    text: _('salary'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['sc_name',_('name')],['pay_frequency',_('frequency')],['amount',_('amount')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_emp_salary_out.proxy.extraParams = { emp_id:me.emp_id, sc_type:'O', field_name:me.field_name, field_search:field.value}; me.store_emp_salary_out.load({params:{start:0}})}}}
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_emp_salary_out,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_emp_salary_in = Ext.create('Ext.grid.Panel', {
            store: me.store_emp_salary_in,
            height: 1000,
            autoScroll: false,
            title: _('in'),
            plugins: [
                me.form_emp_salary_in = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    autoCancel:true,
                    items: [
                        {
                            layout: 'hbox',
                            flex:1,
                            items:[
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
                                                    fieldLabel: _('id'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtsalary_component',
                                                            name: 'sc_id',
                                                            editable: false,
                                                            emptyText: i18n('id'),
                                                            extraParams:['I']
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'sc_name',
                                                            readOnly: true,
                                                            emptyText: i18n('name'),
                                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            width: 100,
                                                            xtype: 'textfield',
                                                            name: 'sc_type',
                                                            hidden: true
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
                                                    fieldLabel: _('frequency'),
                                                    items: [
                                                        {
                                                            xtype:'combo',
                                                            editable: false,
                                                            width:150,
                                                            mode:'local',
                                                            name: 'pay_frequency',
                                                            store: [['M',_('month')], ['D',_('day')]],
                                                            emptyText: i18n('payment')
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
                                                            width: 250,
                                                            fieldLabel: 'Rate(Rp.)',
                                                            xtype: 'mitos.currency',
                                                            name: 'amount',
                                                            emptyText: i18n('amount'),
                                                            enableKeyEvents: true,
                                                            listeners:{
                                                                keyup:function(field, e){
                                                                    var container = field.up('container'),
                                                                        rate_prs = container.items.items[1],
                                                                        rate_sc_id = container.items.items[2];
                                                                    rate_prs.setValue(0); rate_sc_id.setDisabled(true);
                                                                }
                                                            }
                                                        },
                                                        {
                                                            width: 200,
                                                            fieldLabel: 'Rate(%)',
                                                            xtype: 'mitos.currency',
                                                            enableKeyEvents: true,
                                                            name: 'rate',
                                                            emptyText: i18n('rate'),
                                                            listeners:{
                                                                keyup:function(field, e){
                                                                    var container = field.up('container'),
                                                                        rate_amount = container.items.items[0],
                                                                        rate_sc_id = container.items.items[2];
                                                                    rate_amount.setValue(0); rate_sc_id.setDisabled(false);
                                                                }
                                                            }
                                                        },
                                                        {
                                                            width: 200,
                                                            fieldLabel: 'Rate(From)',
                                                            xtype: 'xtsalary_component',
                                                            name: 'rate_sc_id',
                                                            editable: false,
                                                            extraParams:['I'],
                                                            listeners:{
                                                                change:function(field, e){
                                                                    var container = field.up('container'),
                                                                        rate_amount = container.items.items[0];
                                                                    rate_amount.setValue(0);
                                                                }
                                                            }
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
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_emp_salary_in.down('toolbar');
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('name'),flex:1,sortable: true,dataIndex: 'sc_name'},
                {text: _('frequency'), width: 150,sortable: true, dataIndex: 'pay_frequency',summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('amount'),width: 100,sortable: true, dataIndex: 'amount', summaryType:'sum', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            features: [{
                ftype: 'summary'
            }],
            tbar: [
                {
                    xtype: 'button',
                    text: _('salary'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['sc_name',_('name')],['pay_frequency',_('frequency')],['amount',_('amount')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_emp_salary_in.proxy.extraParams = { emp_id:me.emp_id, sc_type:'I', field_name:me.field_name, field_search:field.value}; me.store_emp_salary_in.load({params:{start:0}})}}}
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_emp_salary_in,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_emp_historical_salary = Ext.create('Ext.grid.Panel', {
            store: me.store_emp_historical_salary,
            height: 1000,
            autoScroll: false,
            title: _('historical_salary'),
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('name'),flex:1,sortable: true,dataIndex: 'sc_name'},
                {text: _('type'),width: 80,sortable: true,dataIndex: 'sc_type', align:'center'},
                {text: _('amount')+' '+_('old'),width: 100,sortable: true, dataIndex: 'amount_old', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('amount')+' '+_('new'),width: 100,sortable: true, dataIndex: 'amount_new', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_emp_historical_salary,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid_emp_bpjs = Ext.create('Ext.grid.Panel', {
            store: me.store_emp_bpjs,
            height: 1000,
            autoScroll: false,
            title: _('bpjs'),
            plugins: [
                me.form_emp_bpjs = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    autoCancel:true,
                    items: [
                        {
                            layout: 'hbox',
                            flex:1,
                            items:[
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
                                                    fieldLabel: _('type'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'combo',
                                                            mode:'local',
                                                            name: 'sc_type',
                                                            editable: false,
                                                            store: [['I',_('in')],['O',_('out')]],
                                                            value:'I',
                                                            emptyText: i18n('type'),
                                                            listeners:{
                                                                change:function(f){
                                                                    var plugin = me.grid_emp_bpjs.editingPlugin, sc_id = plugin.editor.form.findField('sc_id');
                                                                    sc_id.extraParams = f.value=='I' ? ['I'] :['O']; sc_id.setValue(null);
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
                                                    fieldLabel: _('id'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtsalary_component',
                                                            name: 'sc_id',
                                                            editable: false,
                                                            emptyText: i18n('id'),
                                                            extraParams:['I']
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'sc_name',
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
                                                    fieldLabel: _('salary'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'mitos.currency',
                                                            name: 'salary',
                                                            allowBlank:false,
                                                            enableKeyEvents:true,
                                                            typeAhead: true,
                                                            listeners : {
                                                                keyup:function(f){
                                                                    var plugin = me.grid_emp_bpjs.editingPlugin, rate = plugin.editor.form.findField('rate').getValue(), nominal = plugin.editor.form.findField('nominal');
                                                                    if(rate > 0){nominal.setValue((rate/100) * f.value);}

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
                                                    fieldLabel: _('amount'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'mitos.percent',
                                                            name: 'rate',
                                                            enableKeyEvents:true,
                                                            typeAhead: true,
                                                            listeners : {
                                                                keyup:function(f){
                                                                    if(f.value > 0) {
                                                                        var plugin = me.grid_emp_bpjs.editingPlugin,
                                                                            salary = plugin.editor.form.findField('salary'),
                                                                            nominal = plugin.editor.form.findField('nominal');
                                                                        nominal.setValue(salary.getValue() * (f.value / 100));
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {
                                                            width: 120,
                                                            xtype: 'mitos.currency',
                                                            name: 'nominal',
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none; text-align:right;',
                                                            enableKeyEvents:true,
                                                            typeAhead: true,
                                                            listeners : {
                                                                keyup:function(f){
                                                                    var plugin = me.grid_emp_bpjs.editingPlugin, rate = plugin.editor.form.findField('rate');
                                                                    rate.setValue(0);
                                                                }
                                                            }
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
                {text: _('id'),width: 80,sortable: true,dataIndex: 'sc_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'sc_name'},
                {text: _('amount'),width: 80,sortable: true,dataIndex: 'nominal', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')}
            ],
            features: [{
                groupHeaderTpl: _('type')+' : {name}',
                ftype: 'groupingsummary'
            }],
            tbar: [
                {
                    xtype: 'button',
                    text: _('bpjs'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_emp_bpjs,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });

        me.grid_emp_salary = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            title: _('salary'),
            items: [me.grid_emp_salary_in, me.grid_emp_salary_out, me.grid_emp_bpjs, me.grid_emp_historical_salary],
            listeners: {
                render: function() {
                    this.items.each(function(i, index, items){
                        i.tab.on('click', function(){
                            if(index==0){i.store.proxy.extraParams = {sc_type:'I', emp_id:me.emp_id};
                            }else if(index==1){i.store.proxy.extraParams = {sc_type:'O', emp_id:me.emp_id};
                            }else if(index==2){i.store.proxy.extraParams = {emp_id:me.emp_id};
                            }else if(index==3) {i.store.proxy.extraParams = {emp_id:me.emp_id};
                            }
                            i.store.load()
                        });
                    });
                }
            }
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enablePrint : true,
                    enablePrintFn : hris_report.employee_form_report,
                    autoCancel:true,
                    items: [
                        me.employee_tab = Ext.create('Ext.tab.Panel', {
                            activeTab:0,
                            items:[{
                                title: _('employee'),
                                layout:'hbox',
                                flex:1,
                                items:[
                                    {
                                        xtype: 'fieldset',
                                        defaultType: 'textfield',
                                        layout: 'hbox',
                                        width: 300,
                                        items: [
                                            {
                                                xtype: 'container',
                                                flex:1,
                                                layout:'anchor',
                                                autoHeight: true,
                                                bodyStyle: 'padding: 10px 10px 10px 10px;',
                                                labelWidth: 50,
                                                defaults: {
                                                    anchor: '100%',
                                                    msgTarget: 'side'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'fileuploadfield',
                                                        id: 'form-file',
                                                        emptyText: 'Select image',
                                                        name: 'image-upload',
                                                        buttonText: 'Browse',
                                                        buttonConfig: {
                                                            iconCls: 'upload-icon'
                                                        },
                                                        listeners:{
                                                            change:function(f,v){
                                                                var note = Ext.DomQuery.selectNode('input[id='+f.getInputId()+']');
                                                                note.value = v.replace("C:\\fakepath\\","");
                                                                me.path_image = f.value.replace("C:\\fakepath\\","");
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        text: 'Upload',
                                                        handler: function(){
                                                            var form = this.up('form').getForm();
                                                            form.submit({
                                                                url: 'dataProvider/HRIS_Employee_Image.php',
                                                                waitMsg: 'Loading data...',
                                                                success: function(fp, o) {
                                                                    me.onLoadImage(me.emp_id+'-'+me.path_image);
                                                                    msg('Success', 'Processed file "' + o.result.file + '" on the server');
                                                                },
                                                                failure:function(batch){
                                                                    me.onLoadImage(me.emp_id+'-'+me.path_image);
                                                                    Ext.Msg.show({
                                                                        title: 'Failed!',
                                                                        msg: error,
                                                                        buttons: Ext.Msg.OK,
                                                                        icon: Ext.Msg.ERROR
                                                                    });
                                                                }
                                                            });

                                                        }
                                                    },
                                                    {
                                                        xtype: 'image',
                                                        id:'user_img',
                                                        width: 200,
                                                        height: 320
                                                        // src: me.path_image
                                                    }
                                                ]
                                            }

                                        ]
                                    },
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
                                                        items: [
                                                            {
                                                                width: 250,
                                                                fieldLabel: _('id'),
                                                                xtype: 'textfield',
                                                                name: 'emp_id',
                                                                allowBlank: false,
                                                                fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;',
                                                                emptyText: i18n('id')
                                                            },
                                                            {
                                                                width: 250,
                                                                fieldLabel: 'NIK',
                                                                xtype: 'textfield',
                                                                name: 'emp_nik',
                                                                fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;',
                                                                emptyText: 'NIK'
                                                            },
                                                            {
                                                                width: 150,
                                                                xtype: 'textfield',
                                                                name: 'doc_id',
                                                                hidden:true,
                                                                fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;',
                                                                emptyText: i18n('id')
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
                                                                width: 250,
                                                                fieldLabel: 'NO. KTP',
                                                                xtype: 'textfield',
                                                                name: 'emp_ktp',
                                                                allowBlank: false,
                                                                fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;',
                                                                emptyText: 'No. Ktp'
                                                            },
                                                            {
                                                                width: 250,
                                                                fieldLabel: 'ID ABSENSI',
                                                                xtype:'numberfield',
                                                                hideTrigger: true,
                                                                name: 'attendance_id',
                                                                fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;',
                                                                emptyText: i18n('attendance')
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
                                                        fieldLabel: _('first_middle_last'),
                                                        items: [
                                                            {
                                                                width: 150,
                                                                xtype: 'textfield',
                                                                name: 'emp_first_name',
                                                                allowBlank: false,
                                                                emptyText: i18n('first_name')
                                                            },
                                                            {
                                                                width: 150,
                                                                xtype: 'textfield',
                                                                name: 'emp_midle_name',
                                                                emptyText: i18n('middle_name')
                                                            },
                                                            {
                                                                width: 150,
                                                                xtype: 'textfield',
                                                                name: 'emp_last_name',
                                                                emptyText: i18n('last_name')
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
                                                                xtype : 'datefield',
                                                                editable: false,
                                                                fieldLabel: _('date_of_birth'),
                                                                name: 'emp_birth_date',
                                                                format : 'Y-m-d',
                                                                value: new Date(),
                                                                maxValue : new Date(),
                                                                allowBlank:false,
                                                                emptyText: i18n('date_of_birth')
                                                            },
                                                            {
                                                                xtype:'combo',
                                                                editable: false,
                                                                width:200,
                                                                mode:'local',
                                                                fieldLabel: _('gender'),
                                                                name: 'emp_gender',
                                                                store: [['M',_('male')],['F',_('female')]],
                                                                emptyText: i18n('gender')
                                                            },
                                                            {
                                                                xtype:'combo',
                                                                editable: false,
                                                                width:200,
                                                                mode:'local',
                                                                fieldLabel: _('religion'),
                                                                name: 'emp_religion',
                                                                store: ['ISLAM','KATOLIK','KRISTEN','HINDU','BUDHA'],
                                                                emptyText: i18n('religion')
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
                                                                xtype:'combo',
                                                                editable: false,
                                                                width:200,
                                                                mode:'local',
                                                                fieldLabel: _('marital_status'),
                                                                name: 'emp_marital_status',
                                                                store: [['S',_('single')],['M',_('merriage')]],
                                                                emptyText: i18n('marital_status')
                                                            },
                                                            {
                                                                width: 200,
                                                                xtype: 'combo',
                                                                editable: false,
                                                                fieldLabel: _('country'),
                                                                name: 'emp_nation',
                                                                mode:'local',
                                                                store: [['Indonesia','Indonesia']],
                                                                emptyText: i18n('country')
                                                            },
                                                            {
                                                                xtype:'combo',
                                                                editable: false,
                                                                width:200,
                                                                mode:'local',
                                                                fieldLabel: _('blood'),
                                                                name: 'emp_blood',
                                                                store: ['O','A','B','AB'],
                                                                emptyText: i18n('blood')
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
                                                        fieldLabel: _('place_of_birth'),
                                                        items: [
                                                            {
                                                                width: 370,
                                                                xtype: 'textfield',
                                                                name: 'emp_birth_place',
                                                                emptyText: i18n('place_of_birth')
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
                                                        fieldLabel: _('address'),
                                                        items: [
                                                            {
                                                                width: 150,
                                                                xtype: 'textfield',
                                                                name: 'emp_city',
                                                                emptyText: i18n('city')
                                                            },
                                                            {
                                                                width: 220,
                                                                xtype: 'textfield',
                                                                name: 'emp_address',
                                                                emptyText: i18n('address')
                                                            },
                                                            {
                                                                width: 80,
                                                                xtype: 'textfield',
                                                                name: 'emp_zipcode',
                                                                emptyText: i18n('zipcode')
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
                                                        fieldLabel: _('mobile_phone')+' & '+_('email'),
                                                        items: [
                                                            {
                                                                width: 150,
                                                                xtype: 'textfield',
                                                                name: 'emp_tlp',
                                                                emptyText: i18n('mobile_phone')
                                                            },
                                                            {
                                                                width: 300,
                                                                xtype: 'textfield',
                                                                name: 'emp_email',
                                                                emptyText: i18n('email')
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
                                                                width: 300,
                                                                fieldLabel: _('company'),
                                                                xtype: 'xtcompany',
                                                                name: 'emp_company_id',
                                                                allowBlank:false,
                                                                emptyText: i18n('company')
                                                            }/*,
                                                            {
                                                                xtype:'combo',
                                                                editable: false,
                                                                width:200,
                                                                mode:'local',
                                                                fieldLabel: _('group_name'),
                                                                name: 'emp_group_id',
                                                                store: [['A','A'],['B','B'],['C','C'],['D','D'],['E','E'],['F','F'],['G','G'],['H','H'],['I','I'],['J','J'],['K','K'],['L','L'],['M','M'],['N','N'],['CS','CS'],['OC','OC'],['MTC','MTC'],['MTN','MTN'],['SZ','SZ'],['TE','TE'],['SATPAM','SATPAM'],['OPERATOR','OPERATOR'],['DRIVER','DRIVER'],['LAB','LAB'],['NON SHIFT','NON SHIFT']],
                                                                emptyText: i18n('group_name')
                                                            },
                                                            {
                                                                xtype:'combo',
                                                                width:200,
                                                                mode:'local',
                                                                fieldLabel: _('line'),
                                                                name: 'emp_line',
                                                                store: ['LINE 1','LINE 2'],
                                                                emptyText: i18n('line')
                                                            }*/
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
                                                                width: 270,
                                                                fieldLabel: _('department'),
                                                                xtype: 'xtdepartment',
                                                                name: 'emp_dept_id',
                                                                emptyText: i18n('department'),
                                                                allowBlank:false,
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
                                                                width: 240,
                                                                fieldLabel: _('position'),
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
                                                            }/*,
                                                            {
                                                                xtype:'xtdirectorate',
                                                                width:240,
                                                                fieldLabel: _('directorate'),
                                                                name: 'emp_directorate_id',
                                                                emptyText: i18n('directorate')
                                                            }*/
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
                                                                width: 270,
                                                                fieldLabel: _('job_status'),
                                                                xtype: 'xtjob_status',
                                                                name: 'emp_js_id',
                                                                emptyText: i18n('job_status'),
                                                                allowBlank:false,
                                                                listeners:{
                                                                    change:function(f, e){
                                                                        var fieldcontainer = f.up('container'),
                                                                            container = fieldcontainer.up('container'),
                                                                            emp_first_date = Ext.ComponentQuery.query('[name=emp_first_date]', container)[0],
                                                                            emp_end_date = Ext.ComponentQuery.query('[name=emp_end_date]', container)[0];
                                                                        if(f.value=='TTP'){
                                                                            emp_first_date.setDisabled(true); emp_end_date.setDisabled(true);
                                                                        }else{
                                                                            emp_first_date.setDisabled(false); emp_end_date.setDisabled(false);
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                width: 240,
                                                                fieldLabel: _('office_location'),
                                                                xtype: 'xtol_type',
                                                                name: 'emp_ol_id',
                                                                allowBlank:false,
                                                                emptyText: i18n('office_location')
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
                                                                width: 270,
                                                                fieldLabel: _('job_title'),
                                                                xtype: 'xtjob_title',
                                                                name: 'emp_job_id',
                                                                allowBlank:false,
                                                                emptyText: i18n('job_title')
                                                            },
                                                            {
                                                                width: 400,
                                                                fieldLabel: _('office_hours'),
                                                                xtype: 'xtoffice_hours',
                                                                name: 'emp_oh_id',
                                                                emptyText: i18n('office_hours')
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
                                                                width: 270,
                                                                xtype : 'datefield',
                                                                editable: false,
                                                                fieldLabel: _('joining_date'),
                                                                name: 'emp_join_date',
                                                                format : 'Y-m-d',
                                                                value: new Date(),
                                                                emptyText: i18n('joining_date')
                                                            },
                                                            {
                                                                width: 240,
                                                                fieldLabel: _('ptkp_rates'),
                                                                editable: false,
                                                                xtype: 'xtptkp',
                                                                name: 'emp_ptkp_id',
                                                                emptyText: i18n('ptkp_rates')
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
                                                        fieldLabel: 'PKS - Afdeling',
                                                        items: [
                                                            {
                                                                xtype:'combo',
                                                                editable: false,
                                                                width:100,
                                                                mode:'local',
                                                                name: 'pks_afdeling',
                                                                allowBlank:false,
                                                                store: ['PKS','AFDELING','TRAKSI'],
                                                                emptyText: i18n('type'),
                                                                listeners:{
                                                                    change:function(f){
                                                                        var cont = f.up('container'),
                                                                        pks_type = Ext.ComponentQuery.query('[name=pks_type]', cont)[0],
                                                                        afdeling_id = cont.items.items[2];
                                                                        if(f.value=='PKS'){
                                                                            pks_type.setDisabled(false); pks_type.show();
                                                                            afdeling_id.setDisabled(true); afdeling_id.hide();
                                                                            //afdeling_name.setDisabled(true); afdeling_name.hide();
                                                                        }
                                                                        else if(f.value=='ESTATE'||f.value=='TRAKSI'){
                                                                            pks_type.setDisabled(true); pks_type.hide();
                                                                            afdeling_id.setDisabled(true); afdeling_id.hide();
                                                                            //afdeling_name.setDisabled(false); afdeling_name.show();
                                                                        }
                                                                        else{
                                                                            pks_type.setDisabled(true); pks_type.hide();
                                                                            afdeling_id.setDisabled(false); afdeling_id.show();
                                                                            //afdeling_name.setDisabled(false); afdeling_name.show();
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                xtype:'stationcombo',
                                                                editable: false,
                                                                width:150,
                                                                name: 'pks_type',
                                                                hidden:true,
                                                                disabled:true
                                                            },
                                                            {
                                                                xtype: 'fieldcontainer',
                                                                layout: {
                                                                    type: 'hbox'
                                                                },
                                                                fieldDefaults: {
                                                                    labelAlign: 'right'
                                                                },
                                                                hidden:true,
                                                                disabled:true,
                                                                items: [
                                                                    {
                                                                        width: 100,
                                                                        xtype : 'xtafdeling',
                                                                        editable: false,
                                                                        name: 'afdeling_id',
                                                                        emptyText: i18n('id')
                                                                    },
                                                                    {
                                                                        width: 270,
                                                                        xtype : 'textfield',
                                                                        name: 'afdeling_name',
                                                                        readOnly: true,
                                                                        emptyText: i18n('name'),
                                                                        fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                                    }
                                                                ]
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
                                                        fieldLabel: _('salary_type'),
                                                        items: [
                                                            {
                                                                width: 100,
                                                                xtype : 'xtsalary_type',
                                                                editable: false,
                                                                name: 'emp_st_id',
                                                                allowBlank:false,
                                                                emptyText: i18n('id')
                                                            },
                                                            {
                                                                width: 170,
                                                                xtype : 'textfield',
                                                                name: 'emp_st_name',
                                                                readOnly: true,
                                                                emptyText: i18n('name'),
                                                                fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                            },
                                                            {
                                                                xtype:'combo',
                                                                editable: false,
                                                                width:137,
                                                                mode:'local',
                                                                allowBlank:false,
                                                                name: 'emp_payment_type',
                                                                store: ['TUNAI','TRANSFER'],
                                                                emptyText: i18n('payment_type')
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
                                                                fieldLabel: _('npwp'),
                                                                width: 270,
                                                                xtype: 'textfield',
                                                                name: 'emp_npwp',
                                                                emptyText: i18n('npwp')
                                                            },
                                                            {
                                                                xtype:'combo',
                                                                width:250,
                                                                mode:'local',
                                                                fieldLabel: _('overtime'),
                                                                name: 'emp_overtime',
                                                                store: [['Y',_('yes')],['N',_('no')]],
                                                                emptyText: i18n('overtime')
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
                                                                width: 270,
                                                                xtype : 'textfield',
                                                                editable: false,
                                                                fieldLabel: _('bpjs_kesehatan'),
                                                                name: 'emp_bpjs_kesehatan',
                                                                emptyText: i18n('bpjs_kesehatan')
                                                            },
                                                            {
                                                                width: 270,
                                                                xtype: 'textfield',
                                                                fieldLabel: _('bpjs_ketenagakerjaan'),
                                                                name: 'emp_bpjs_ketenagakerjaan',
                                                                emptyText: i18n('bpjs_ketenagakerjaan')
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
                                                                width: 270,
                                                                height: 25,
                                                                xtype: 'textarea',
                                                                style:{overflow:'auto'},
                                                                fieldLabel: 'Rek. '+_('bank')+' 01',
                                                                name: 'emp_bank_01',
                                                                emptyText: 'Rek. '+_('bank')+' 01'
                                                            },
                                                            {
                                                                width: 270,
                                                                height: 25,
                                                                xtype: 'textarea',
                                                                style:{overflow:'auto'},
                                                                fieldLabel: 'Rek. '+_('bank')+' 02',
                                                                name: 'emp_bank_02',
                                                                emptyText: 'Rek. '+_('bank')+' 02'
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
                                                        fieldLabel: _('contract_date'),
                                                        items: [
                                                            {
                                                                width: 100,
                                                                xtype : 'datefield',
                                                                editable: false,
                                                                name: 'emp_first_date',
                                                                format : 'Y-m-d',
                                                                value: new Date(),
                                                                maxValue : new Date(),
                                                                emptyText: i18n('start_date')
                                                            },
                                                            {
                                                                width: 100,
                                                                xtype : 'datefield',
                                                                editable: false,
                                                                name: 'emp_end_date',
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
                                                        fieldLabel: _('remarks'),
                                                        items: [
                                                            {
                                                                width: 450,
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
                                                        items: [
                                                            {
                                                                width: 125,
                                                                xtype: 'checkbox',
                                                                fieldLabel: _('active'),
                                                                name: 'active'
                                                            },
                                                            {
                                                                width: 125,
                                                                xtype: 'checkbox',
                                                                fieldLabel: 'Pph21',
                                                                name: 'pph21_show'
                                                            },
                                                            {
                                                                xtype: 'button',
                                                                text: _('upload_to_machine'),
                                                                iconCls: 'icoArrowRightSmall',
                                                                scope: me,
                                                                handler: me.upload_to_machine
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }, me.grid_emp_education, me.grid_emp_dependents, me.grid_emp_emergency_contact, me.grid_emp_work_experience, me.grid_emp_training, me.grid_emp_position,  me.grid_emp_salary ], //me.grid_emp_report_spv,
                            listeners: {
                                render: function() {
                                    this.items.each(function(i, index, items){
                                        i.tab.on('click', function(){
                                            if(index>0 && index!=8){
                                                i.store.proxy.extraParams ={emp_id:me.emp_id};
                                                i.store.load();
                                            }else if(index==8){ // SALARY //
                                                me.grid_emp_salary.setActiveTab(0);
                                            }
                                        });
                                    });
                                }
                            }
                        })
                    ]
                })
            ],
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar'), view_data_gaji=null;  me.employee_tab.setActiveTab(0); me.emp_id = record.data.emp_id;
                    me.data_employee = record.data;
                    useredit.items.items[5].setText("UserInput : " +record.data.userinput+" | UserEdit : " +record.data.useredit);
                    if(record.data.path_image){
                        me.onLoadImage(record.data.path_image);
                    }
                     Ext.getCmp('form-file').setDisabled(false);
                    me.store_emp_salary_in.proxy.extraParams={sc_type:'I', emp_id:me.emp_id};
                    me.store_emp_salary_in.load();
                    me.onViewSalary(record.data.emp_js_id);
                }
            },
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex: 1,sortable: true, dataIndex: 'emp_name'},
                {text: _('company'),width: 80,sortable: true,dataIndex: 'emp_company_id'},
                {text: _('department'),width: 100,sortable: true,dataIndex: 'emp_dept_name'},
                {text: _('job_status'),width: 120,sortable: true,dataIndex: 'emp_js_name'},
                {text: _('job_title'),width: 120,sortable: true,dataIndex: 'emp_job_desc'},
                {text: _('office_location'),width: 120,sortable: true,dataIndex: 'emp_ol_name'},
                {text: _('joining_date'),width: 80,sortable: true,dataIndex: 'emp_join_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('employee'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype: 'button',
                    text: _('upload'),
                    iconCls: 'icoOutbox',
                    handler: function(){
                        me.GridShow= Ext.create('App.ux.window.Window',{
                            layout: 'fit',
                            width: 500,
                            height: 120,
                            items:[me.grid_uploaded],
                            modal:true
                        });
                        me.GridShow.show();
                    }
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['emp_id',_('id')],['emp_name',_('name')],['emp_company_id',_('company')],['emp_dept_name',_('department')],['emp_js_name',_('job_status')],['emp_job_desc',_('job_title')],['emp_ol_name',_('office_location')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {field_name:me.field_name, field_search:field.value};
                        me.store.loadPage(1);}}
                    }
                },'->',
                {
                    displayfield:'useredit'
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
    onNewUser: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store , model = store.model, plugin = grid.editingPlugin, newModel;
        newModel = Ext.ModelManager.create({
        }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);
        plugin.context.record.data.emp_id = me.emp_id;
        if(model.modelName=='App.model.hris.employee.Employee'){
            var btn_upload = Ext.getCmp('form-file');
            btn_upload.setDisabled(true);
            me.onLoadImage('');
        }
    },
    onLoadImage: function(path_image){
        var me= this;
        Ext.getCmp('user_img').getEl().dom.src = '../upload/'+path_image;
    },
    onViewSalary : function(js_id){
        var me=this;
        HRIS_Salary.onViewSalary(js_id, function(provider, response){
            if(response.result==1){
                me.grid_emp_salary.setDisabled(false);
            }else{
                me.grid_emp_salary.setDisabled(true);
            }
        });
    },

    upload_to_machine : function(btn){
        var me=this;
        HRIS_Employee.upload_to_machine(me.data_employee, function(provider, response){
            if (response.type == 'exception'){
                var error = response.message;
                Ext.Msg.show({
                    title: 'Failed!',
                    msg: error,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }else{
                Ext.MessageBox.alert('Success upload to machine', '!!!!');
            }
        });
    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.store.proxy.extraParams={};
        this.store.load();
        callback(true);
    }
});
