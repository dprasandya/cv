
Ext.define('App.view.hris.Mutation.Mutation', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('mutation_employee'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.Mutation.Mutation',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_employee = Ext.create('App.store.hris.employee.Employee',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
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
                            xtype:'panel',
                            layout: 'hbox',
                            items:[
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    layout: 'hbox',
                                    title: _('old'),
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
                                                    fieldLabel: _('employee'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtemployee',
                                                            name: 'emp_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('id'),
                                                            listeners:{
                                                                change:function(f, e){
                                                                    if(me.status!='1' || me.status!='2'){
                                                                        me.load_employee(f);
                                                                    }
                                                                }
                                                            }
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
                                                    fieldLabel: _('company'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'xtcompany',
                                                            name: 'old_company_id',
                                                            emptyText: i18n('company'),
                                                            readOnly: true,
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            width: 150,
                                                            xtype: 'xtol_type',
                                                            name: 'old_ol_id',
                                                            emptyText: i18n('office_location'),
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
                                                    fieldLabel: _('department'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'xtdepartment',
                                                            name: 'old_dept_id',
                                                            emptyText: i18n('department'),
                                                            readOnly: true,
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            width: 150,
                                                            xtype: 'xtposition',
                                                            name: 'old_pos_id',
                                                            emptyText: i18n('position'),
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
                                                    fieldLabel: _('job_title'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'xtjob_title',
                                                            name: 'old_job_id',
                                                            emptyText: i18n('job_title'),
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
                                                    fieldLabel: _('job_status'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'xtjob_status',
                                                            name: 'old_js_id',
                                                            emptyText: i18n('job_status'),
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
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    layout: 'hbox',
                                    title: _('new'),
                                    flex:1,
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex:1,
                                            layout:'anchor',
                                            title: _('new'),
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
                                                            xtype:'combo',
                                                            editable: false,
                                                            width:100,
                                                            name: 'mutation_type',
                                                            mode:'local',
                                                            store: [['M','Mutasi'],['P','Promosi'],['R','Rotasi']]
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
                                                            width: 150,
                                                            xtype: 'xtcompany',
                                                            name: 'new_company_id',
                                                            allowBlank:false,
                                                            emptyText: i18n('company')
                                                        },
                                                        {
                                                            width: 150,
                                                            xtype: 'xtol_type',
                                                            allowBlank:false,
                                                            name: 'new_ol_id',
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
                                                    fieldLabel: _('department'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'xtdepartment',
                                                            name: 'new_dept_id',
                                                            allowBlank:false,
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
                                                            name: 'new_pos_id',
                                                            allowBlank:false,
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
                                                    fieldLabel: _('job_title'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'xtjob_title',
                                                            name: 'new_job_id',
                                                            allowBlank:false,
                                                            emptyText: i18n('job_title')
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
                                                            width: 150,
                                                            xtype: 'xtjob_status',
                                                            name: 'new_js_id',
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
                                                    fieldLabel: _('joining_date'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype : 'datefield',
                                                            editable: false,
                                                            name: 'new_join_date',
                                                            format : 'Y-m-d',
                                                            value: new Date(),
                                                            emptyText: i18n('joining_date')
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
                                                            name: 'status'
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
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+" | UserEdit : " +record.data.useredit);
                    me.status = record.data.status;
                }
            },
            columns: [
                {text: _('id'),width: 100,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex:1,sortable: true,dataIndex: 'emp_name'},
                {text: _('company'),width: 100,sortable: true,dataIndex: 'new_company_id'},
                {text: _('office_location'),width: 100,sortable: true,dataIndex: 'new_ol_id'},
                {text: _('department'),width: 100,sortable: true,dataIndex: 'new_dept_id'},
                {text: _('remarks'),flex:1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'status'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('mutation_employee'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['emp_id',_('id')],['emp_name',_('name')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store.proxy.extraParams = {field_name:me.field_name, field_search:field.value}; me.store.load({params:{start:0}})}}}
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
    onNewUser: function(){
        var me = this;
        me.formEditing.cancelEdit();
        me.store.insert(0, {aktif: 1,authorized: 1});
        me.formEditing.startEdit(0, 0);
    },
    load_employee: function(f){
        var me= this, fieldcontainer = f.up('container'), panel = fieldcontainer.up('panel'),
            old_company_id = panel.ownerCt.form.findField('old_company_id'),
            old_ol_id = panel.ownerCt.form.findField('old_ol_id'),
            old_job_id = panel.ownerCt.form.findField('old_job_id'),
            old_dept_id = panel.ownerCt.form.findField('old_dept_id'),
            old_js_id = panel.ownerCt.form.findField('old_js_id'),
            old_pos_id = panel.ownerCt.form.findField('old_pos_id');
        me.store_employee.proxy.extraParams = {field_name:'emp_id',field_search:f.getValue()};
        me.store_employee.load({
            callback: function(records, operation, success) {
                old_company_id.setValue( records[0].data.emp_company_id);
                old_ol_id.setValue( records[0].data.emp_ol_id);
                old_job_id.setValue( records[0].data.emp_job_id);
                old_dept_id.setValue( records[0].data.emp_dept_id);
                old_js_id.setValue( records[0].data.emp_js_id);
                old_pos_id.setValue( records[0].data.emp_pos_id);
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
