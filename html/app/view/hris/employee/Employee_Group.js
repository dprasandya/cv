
Ext.define('App.view.hris.employee.Employee_Group', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('employee'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.employee.Employee_Group',{remoteSort: true, pageSize : 20, autoLoad: false});

        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enablePrint : true,
                    enablePrintFn : hris_report.employee_form_report,
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
                                            fieldLabel: _('group_name'),
                                            items: [
                                                {
                                                    xtype:'combo',
                                                    editable: false,
                                                    width:200,
                                                    mode:'local',
                                                    name: 'emp_group_id',
                                                    store: [['A','A'],['B','B'],['C','C'],['D','D'],['E','E'],['F','F'],['G','G'],['H','H'],['I','I'],['J','J'],['K','K'],['L','L'],['M','M'],['N','N'],['CS','CS'],['OC','OC'],['MTC','MTC'],['MTN','MTN'],['SZ','SZ'],['TE','TE'],['SATPAM','SATPAM'],['OPERATOR','OPERATOR'],['DRIVER','DRIVER'],['LAB','LAB'],['NON SHIFT','NON SHIFT']],
                                                    emptyText: i18n('group_name')
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
                                                    fieldLabel: _('department'),
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
                                                    width: 500,
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
                                                    maxValue : new Date(),
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
                                            fieldLabel: _('npwp'),
                                            items: [
                                                {
                                                    width: 200,
                                                    xtype: 'textfield',
                                                    name: 'emp_npwp',
                                                    emptyText: i18n('npwp')
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
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[3].setText("UserInput : " +record.data.userinput+" | UserEdit : " +record.data.useredit);
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
