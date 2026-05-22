
Ext.define('App.view.hris.Pph21.Bpjs', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('bpjs'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.Pph21.Bpjs',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_rate = Ext.create('App.store.hris.Pph21.BpjsRate',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.grid_rate = Ext.create('Ext.grid.Panel', {
            store: me.store_rate,
            plugins: [
                me.edditing_detail = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false,
                    listeners: {
                        afteredit: function(editor,e,opt){
                            var total = me.store_rate.sum('nominal'), plugin = me.grid.editingPlugin, salary = plugin.editor.form.findField('salary');
                            if(e.record.data.active){total = total + e.record.data.amount;}
                            else{total = total - e.record.data.amount;}
                            salary.setValue(total);
                            if(total > 0){salary.setReadOnly(true)}else{salary.setReadOnly(false)}
                        }
                    }
                })
            ],
            columns: [
                {text: _('active'),width: 60,sortable: true,dataIndex: 'active',renderer: me.boolRenderer,
                    editor:{
                        xtype:'checkbox'
                    }},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'sc_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'sc_name'},
                {text: _('amount'),width: 100,sortable: true, dataIndex: 'amount', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')}
            ]
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar'); me.data = record.data;
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+" | UserEdit : " +record.data.useredit);
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
                                            fieldLabel: _('bpjs'),
                                            items: [
                                                {
                                                    xtype : 'combo',
                                                    emptyText: ('Pilih'),
                                                    width:150,
                                                    editable:false,
                                                    name: 'bpjs_type',
                                                    mode:'local',
                                                    store: ['KESEHATAN','KETENAGAKERJAAN']
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
                                                    xtype: 'textfield',
                                                    name: 'bpjs_id',
                                                    allowBlank: false,
                                                    emptyText: i18n('id')
                                                },
                                                {
                                                    width: 280,
                                                    xtype: 'textfield',
                                                    name: 'bpjs_name',
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
                                            items: [
                                                {
                                                    width: 200,
                                                    fieldLabel: _('salary'),
                                                    xtype: 'mitos.currency',
                                                    name: 'salary',
                                                    allowBlank:false,
                                                    enableKeyEvents:true,
                                                    typeAhead: true,
                                                    listeners : {
                                                        keyup:function(f){
                                                            var plugin = me.grid.editingPlugin, rate_company = plugin.editor.form.findField('rate_company').getValue(), nominal_company = plugin.editor.form.findField('nominal_company'),
                                                                rate_employee = plugin.editor.form.findField('rate_employee').getValue(), nominal_employee = plugin.editor.form.findField('nominal_employee')
                                                            if(rate_company > 0){nominal_company.setValue((rate_company/100) * f.value);}
                                                            if(rate_employee > 0){nominal_employee.setValue((rate_employee/100) * f.value);}

                                                        }
                                                    }
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
                                                            xtype: 'checkbox',
                                                            fieldLabel: _('inc_salary_employee'),
                                                            name: 'inc_salary_employee',
                                                            listeners : {
                                                                change:function(f){
                                                                    var plugin = me.grid.editingPlugin, salary =  plugin.editor.form.findField('salary'), limit_inc_salary_employee =  plugin.editor.form.findField('limit_inc_salary_employee'),
                                                                        rate_company = plugin.editor.form.findField('rate_company').getValue(), nominal_company = plugin.editor.form.findField('nominal_company'),
                                                                        rate_employee = plugin.editor.form.findField('rate_employee').getValue(), nominal_employee = plugin.editor.form.findField('nominal_employee')
                                                                    if(f.value==1){
                                                                        salary.setDisabled(true); salary.setValue(null); nominal_company.setValue(null); nominal_employee.setValue(null);
                                                                        limit_inc_salary_employee.setDisabled(false);
                                                                    }else{
                                                                        salary.setDisabled(false);
                                                                        if(rate_company > 0){nominal_company.setValue((rate_company/100) * f.value);}
                                                                        if(rate_employee > 0){nominal_employee.setValue((rate_employee/100) * f.value);}
                                                                        limit_inc_salary_employee.setDisabled(true);
                                                                    }


                                                                }
                                                            }
                                                        },
                                                        {
                                                            width: 200,
                                                            fieldLabel: _('limit'),
                                                            xtype: 'mitos.currency',
                                                            allowBlank:false,
                                                            disabled : true,
                                                            name: 'limit_inc_salary_employee'
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
                                            fieldLabel: _('company'),
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
                                                            width: 100,
                                                            xtype: 'xtsalary_component',
                                                            name: 'sc_id_company',
                                                            editable: false,
                                                            emptyText: i18n('id'),
                                                            extraParams:['I']
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'sc_name_company',
                                                            readOnly: true,
                                                            emptyText: i18n('name'),
                                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;'
                                                        }
                                                    ]
                                                },
                                                {
                                                    width: 100,
                                                    xtype: 'mitos.percent',
                                                    name: 'rate_company',
                                                    enableKeyEvents:true,
                                                    typeAhead: true,
                                                    listeners : {
                                                        keyup:function(f){
                                                            if(f.value > 0){
                                                                var plugin = me.grid.editingPlugin, salary = plugin.editor.form.findField('salary'), nominal = plugin.editor.form.findField('nominal_company');
                                                                nominal.setValue(salary.getValue()*(f.value/100));
                                                            }
                                                        }
                                                    }
                                                },
                                                {
                                                    width: 120,
                                                    xtype: 'mitos.currency',
                                                    name: 'nominal_company',
                                                    fieldStyle:'background-color: #F2F3F4; background-image: none; text-align:right;',
                                                    enableKeyEvents:true,
                                                    typeAhead: true,
                                                    listeners : {
                                                        keyup:function(f){
                                                            var plugin = me.grid.editingPlugin, rate_company = plugin.editor.form.findField('rate_company');
                                                            rate_company.setValue(0);
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
                                            fieldLabel: _('employee'),
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
                                                            width: 100,
                                                            xtype: 'xtsalary_component',
                                                            name: 'sc_id_employee',
                                                            editable: false,
                                                            emptyText: i18n('id'),
                                                            extraParams:['O']
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'sc_name_employee',
                                                            readOnly: true,
                                                            emptyText: i18n('name'),
                                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;'
                                                        }
                                                    ]
                                                },
                                                {
                                                    width: 100,
                                                    xtype: 'mitos.percent',
                                                    name: 'rate_employee',
                                                    enableKeyEvents:true,
                                                    typeAhead: true,
                                                    listeners : {
                                                        keyup:function(f){
                                                            if(f.value > 0) {
                                                                var plugin = me.grid.editingPlugin,
                                                                    salary = plugin.editor.form.findField('salary'),
                                                                    nominal = plugin.editor.form.findField('nominal_employee');
                                                                nominal.setValue(salary.getValue() * (f.value / 100));
                                                            }
                                                        }
                                                    }
                                                },
                                                {
                                                    width: 120,
                                                    xtype: 'mitos.currency',
                                                    name: 'nominal_employee',
                                                    fieldStyle:'background-color: #F2F3F4; background-image: none; text-align:right;',
                                                    enableKeyEvents:true,
                                                    typeAhead: true,
                                                    listeners : {
                                                        keyup:function(f){
                                                            var plugin = me.grid.editingPlugin, rate_employee = plugin.editor.form.findField('rate_employee');
                                                            rate_employee.setValue(0);
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
                                                    width: 125,
                                                    xtype: 'checkbox',
                                                    fieldLabel: _('active'),
                                                    name: 'active'
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
                {text: _('type'),width: 150,sortable: true,dataIndex: 'bpjs_type'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'bpjs_name'},
                {text: _('salary'),width: 100,sortable: true,dataIndex: 'salary', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('company'),width: 80,sortable: true,dataIndex: 'nominal_company', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('employee'),width: 80,sortable: true,dataIndex: 'nominal_employee', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('bpjs'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['bpjs_type',_('type')],['bpjs_name',_('name')]],
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
    onNewUser: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        plugin.editor.form.findField('salary').setReadOnly(false);
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
