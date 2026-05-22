Ext.define('App.view.transactions.marketing.Registration_change', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('registration_change'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.marketing.Registration_change_view',{remoteSort: true, pageSize : 20, autoLoad: false, groupField: 'identity_no_old'});
        me.store_detail = Ext.create('App.store.transactions.marketing.Registration_change',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            autoScroll: true,
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            listeners :{
                itemclick: function(dv, record, item, index, e) {
                    var btn_add = me.grid_detail.down('toolbar').items.items[0];
                    me.data = record.data;
                    if(me.data.status==2){btn_add.setDisabled(true);}else{btn_add.setDisabled(false);}
                    me.store_detail.proxy.extraParams ={project_id:me.data.project_id, unit_building_id:me.data.unit_building_id, registration_id:me.data.registration_id};
                    me.store_detail.load();
                    me.GridShow= Ext.create('App.ux.window.Window',{
                        layout: 'fit',
                        title: _('registration_change'),
                        width: 1100,
                        height: 400,
                        items:[me.grid_detail],
                        modal:true
                    });
                    me.GridShow.show();
                }
            },
            features: [{
                groupHeaderTpl: _('identity')+' : {name}',
                ftype: 'groupingsummary'
            }],
            columns: [
                {text: _('id'),width: 120,sortable: true,dataIndex: 'registration_id'},
                {text: _('name'),width: 100,sortable: true,dataIndex: 'full_name_old'},
                {text: _('project'),width: 100,sortable: true,dataIndex: 'project_name'},
                {text: _('unit_building'),width: 80,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('cluster'),width: 100,sortable: true,dataIndex: 'cluster_name'},
                {text: _('facing'),width: 100,sortable: true,dataIndex: 'facing_name'},
                {text: _('building_type'),width: 80,sortable: true,dataIndex: 'building_id'},
                {text: 'Area M2',width: 100,sortable: true,dataIndex: 'area_m2', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['registration_id',_('id')],['identity_no_old',_('identity')],['full_name_old',_('name')],['project_name',_('project')],['unit_building_name',_('unit_building')],['cluster_name',_('cluster')],['facing_name',_('facing')],['building_id',_('building_type')],['area_m2','Area M2']],
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
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.store,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }

        });
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            listeners :{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_detail.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                }
            },
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
                    items: [
                        {
                            xtype:'panel',
                            layout: 'hbox',
                            items:[
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    title: _('old'),
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
                                                    fieldLabel: _('identity'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'combo',
                                                            editable: false,
                                                            name: 'identity_type_old',
                                                            allowBlank: false,
                                                            emptyText: i18n('type'),
                                                            mode:'local',
                                                            store: [['KTP','KTP'],['SIM','SIM'],['PASPORT','PASPORT']],
                                                            readOnly: true,
                                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;'

                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'identity_no_old',
                                                            allowBlank: false,
                                                            emptyText: i18n('no'),
                                                            readOnly: true,
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
                                                    fieldLabel: _('name'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'textfield',
                                                            name: 'first_name_old',
                                                            emptyText: i18n('first_name'),
                                                            readOnly: true,
                                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            width: 150,
                                                            xtype: 'textfield',
                                                            name: 'last_name_old',
                                                            emptyText: i18n('last_name'),
                                                            readOnly: true,
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
                                                    items: [
                                                        {
                                                            width: 200,
                                                            fieldLabel: _('gender'),
                                                            xtype: 'combo',
                                                            editable: false,
                                                            name: 'gender_old',
                                                            emptyText: i18n('gender'),
                                                            mode:'local',
                                                            store: [['M',_('male')],['F',_('female')]],
                                                            readOnly: true,
                                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            width: 200,
                                                            fieldLabel: _('blood'),
                                                            xtype: 'combo',
                                                            editable: false,
                                                            name: 'blood_type_old',
                                                            emptyText: i18n('blood'),
                                                            mode:'local',
                                                            store: ['O','A','B','AB'],
                                                            readOnly: true,
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
                                                    items: [
                                                        {
                                                            width: 200,
                                                            fieldLabel: _('marital_status'),
                                                            xtype: 'combo',
                                                            editable: false,
                                                            name: 'merriage_status_old',
                                                            emptyText: i18n('marital_status'),
                                                            mode:'local',
                                                            store: [['S',_('single')],['M',_('merriage')]],
                                                            readOnly: true,
                                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            width: 200,
                                                            fieldLabel: _('religion'),
                                                            xtype: 'combo',
                                                            editable: false,
                                                            name: 'religion_old',
                                                            emptyText: i18n('religion'),
                                                            mode:'local',
                                                            store: [['M','Muslem'],['P','Protestan'],['B','Buddha'],['N','Nasrani'],['H','Hindu']],
                                                            readOnly: true,
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
                                                    items: [
                                                        {
                                                            width: 200,
                                                            fieldLabel: _('nationality'),
                                                            xtype: 'textfield',
                                                            name: 'nationality_old',
                                                            emptyText: i18n('nationality'),
                                                            readOnly: true,
                                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            width: 200,
                                                            fieldLabel: _('city'),
                                                            xtype: 'textfield',
                                                            name: 'city_old',
                                                            emptyText: i18n('city'),
                                                            readOnly: true,
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
                                                    fieldLabel: _('address'),
                                                    items: [
                                                        {
                                                            width: 380,
                                                            xtype: 'textfield',
                                                            name: 'address_old',
                                                            emptyText: i18n('address'),
                                                            readOnly: true,
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
                                                    items: [
                                                        {
                                                            width: 200,
                                                            fieldLabel: _('home_phone'),
                                                            xtype: 'textfield',
                                                            name: 'home_phone_old',
                                                            emptyText: i18n('home_phone'),
                                                            readOnly: true,
                                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            width: 200,
                                                            fieldLabel: _('mobile_phone'),
                                                            xtype: 'textfield',
                                                            name: 'mobile_phone_old',
                                                            emptyText: i18n('mobile_phone'),
                                                            readOnly: true,
                                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;'
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
                                    title: _('new'),
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
                                                    fieldLabel: _('identity'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'combo',
                                                            editable: false,
                                                            name: 'identity_type',
                                                            allowBlank: false,
                                                            emptyText: i18n('type'),
                                                            mode:'local',
                                                            store: [['KTP','KTP'],['SIM','SIM'],['PASPORT','PASPORT']]

                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'customersearch',
                                                            name: 'identity_no',
                                                            allowBlank: false,
                                                            emptyText: i18n('no')
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
                                                    fieldLabel: _('name'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'textfield',
                                                            name: 'first_name',
                                                            emptyText: i18n('first_name')
                                                        },
                                                        {
                                                            width: 150,
                                                            xtype: 'textfield',
                                                            name: 'last_name',
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
                                                            fieldLabel: _('gender'),
                                                            xtype: 'combo',
                                                            editable: false,
                                                            name: 'gender',
                                                            emptyText: i18n('gender'),
                                                            mode:'local',
                                                            store: [['M',_('male')],['F',_('female')]]
                                                        },
                                                        {
                                                            width: 200,
                                                            fieldLabel: _('blood'),
                                                            xtype: 'combo',
                                                            editable: false,
                                                            name: 'blood_type',
                                                            emptyText: i18n('blood'),
                                                            mode:'local',
                                                            store: ['O','A','B','AB']
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
                                                            fieldLabel: _('marital_status'),
                                                            xtype: 'combo',
                                                            editable: false,
                                                            name: 'merriage_status',
                                                            emptyText: i18n('marital_status'),
                                                            mode:'local',
                                                            store: [['S',_('single')],['M',_('merriage')]]
                                                        },
                                                        {
                                                            width: 200,
                                                            fieldLabel: _('religion'),
                                                            xtype: 'combo',
                                                            editable: false,
                                                            name: 'religion',
                                                            emptyText: i18n('religion'),
                                                            mode:'local',
                                                            store: [['M','Muslem'],['P','Protestan'],['B','Buddha'],['N','Nasrani'],['H','Hindu']]
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
                                                            fieldLabel: _('nationality'),
                                                            xtype: 'textfield',
                                                            name: 'nationality',
                                                            emptyText: i18n('nationality')
                                                        },
                                                        {
                                                            width: 200,
                                                            fieldLabel: _('city'),
                                                            xtype: 'textfield',
                                                            name: 'city',
                                                            emptyText: i18n('city')
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
                                                            width: 380,
                                                            xtype: 'textfield',
                                                            name: 'address',
                                                            emptyText: i18n('address')
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
                                                            name: 'home_phone',
                                                            emptyText: i18n('home_phone')
                                                        },
                                                        {
                                                            width: 200,
                                                            fieldLabel: _('mobile_phone'),
                                                            xtype: 'textfield',
                                                            name: 'mobile_phone',
                                                            emptyText: i18n('mobile_phone')
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
            columns: [
                {text: _('id'),width: 120,sortable: true,dataIndex: 'identity_no'},
                {text: _('name'),width: 100,sortable: true,dataIndex: 'full_name'},
                {text: _('project'),width: 80,sortable: true,dataIndex: 'project_name'},
                {text: _('unit_building'),width: 100,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('detail'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['identity_no',_('id')],['full_name',_('name')],['unit_building_name',_('unit_building')],['project_name',_('project')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_detail.proxy.extraParams = {project_id:me.data.project_id, registration_id:me.data.registration_id, unit_building_id:me.data.unit_building_id, field_name:me.field_name, field_search:field.value};
                        me.store_detail.loadPage(1);}}
                    }
                },'->',
                {
                    xtype: 'label'
                }
            ]
        });
        me.pageBody = [ me.grid ];
        me.callParent(arguments);
    },
    onNewData: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        plugin.editor.form.findField('identity_no_old').setValue(me.data.identity_no_old);
        plugin.editor.form.findField('identity_type_old').setValue(me.data.identity_type_old);
        plugin.editor.form.findField('first_name_old').setValue(me.data.first_name_old);
        plugin.editor.form.findField('last_name_old').setValue(me.data.last_name_old);
        plugin.editor.form.findField('gender_old').setValue(me.data.gender_old);
        plugin.editor.form.findField('blood_type_old').setValue(me.data.blood_type_old);
        plugin.editor.form.findField('religion_old').setValue(me.data.religion_old);
        plugin.editor.form.findField('merriage_status_old').setValue(me.data.merriage_status_old);
        plugin.editor.form.findField('address_old').setValue(me.data.address_old);
        plugin.editor.form.findField('city_old').setValue(me.data.city_old);
        plugin.editor.form.findField('nationality_old').setValue(me.data.nationality_old);
        plugin.editor.form.findField('home_phone_old').setValue(me.data.home_phone_old);
        plugin.editor.form.findField('mobile_phone_old').setValue(me.data.mobile_phone_old);
        //plugin.editor.form.findField('cust_id_old').setValue(me.data.cust_id_old);
        //plugin.editor.form.findField('cust_name_old').setValue(me.data.cust_name_old);
        //plugin.editor.form.findField('cust_contact_old').setValue(me.data.cust_contact_old);
        //plugin.editor.form.findField('cust_npwp_old').setValue(me.data.cust_npwp_old);

        plugin.context.record.data.registration_id = me.data.registration_id;
        plugin.context.record.data.sales_id = me.data.sales_id;
        plugin.context.record.data.unit_building_id = me.data.unit_building_id;
        plugin.context.record.data.project_id = me.data.project_id;
        plugin.context.record.data.cluster_id = me.data.cluster_id;
        plugin.context.record.data.floor_id = me.data.floor_id;
        plugin.context.record.data.facing_id = me.data.facing_id;
        plugin.context.record.data.building_id = me.data.building_id;
    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */

    onActive: function(callback){
        this.store.load();
        callback(true);
    }
});
