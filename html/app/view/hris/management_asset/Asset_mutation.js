
Ext.define('App.view.hris.management_asset.Asset_mutation', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('mutation_asset'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.management_asset.Asset_mutation',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_asset = Ext.create('App.store.hris.management_asset.Asset',{remoteSort: true, pageSize : 20, autoLoad: false});
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
                                                    fieldLabel: _('id'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xthris_asset',
                                                            name: 'asset_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('serial_number'),
                                                            listeners:{
                                                                change: function(f,e){
                                                                    if(me.status!='1' || me.status!='2'){
                                                                        me.load_asset(f);
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'old_asset_name',
                                                            allowBlank: false,
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
                                                    fieldLabel: _('type'),
                                                    items: [
                                                        {
                                                            width: 380,
                                                            xtype: 'xtasset_type',
                                                            name: 'old_asset_type',
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
                                                            width: 380,
                                                            xtype: 'xtcompany',
                                                            name: 'old_company_id',
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
                                                    fieldLabel: _('office_location'),
                                                    items: [
                                                        {
                                                            width: 200,
                                                            xtype: 'xtol_type',
                                                            name: 'old_ol_id',
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
                                                    fieldLabel: _('requester'),
                                                    items: [
                                                        {
                                                            xtype: 'combo',
                                                            editable: false,
                                                            width: 100,
                                                            name: 'old_request_type',
                                                            mode: 'local',
                                                            store: [['P', _('personal')], ['G', _('general')], ['C', _('company')]],
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
                                                    fieldLabel: _('employee'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtemployee',
                                                            name: 'old_emp_id',
                                                            emptyText: i18n('id'),
                                                            readOnly: true,
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'old_emp_name',
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
                                                            name: 'new_asset_name',
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
                                                    fieldLabel: _('type'),
                                                    items: [
                                                        {
                                                            width: 380,
                                                            xtype: 'xtasset_type',
                                                            name: 'new_asset_type'
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
                                                            width: 380,
                                                            xtype: 'xtcompany',
                                                            name: 'new_company_id'
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
                                                    fieldLabel: _('office_location'),
                                                    items: [
                                                        {
                                                            width: 200,
                                                            xtype: 'xtol_type',
                                                            name: 'new_ol_id'
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
                                                    fieldLabel: _('requester'),
                                                    items: [
                                                        {
                                                            xtype:'combo',
                                                            editable: false,
                                                            width:100,
                                                            name: 'new_request_type',
                                                            mode:'local',
                                                            store: [['P',_('personal')],['G',_('general')],['C',_('company')]],
                                                            listeners:{
                                                                change:function(f,e){
                                                                    var fieldcontainer = f.up('container'),
                                                                        container = fieldcontainer.up('container');
                                                                    if(f.value=='P'){
                                                                        container.items.items[5].items.items[0].setDisabled(false);
                                                                    }else{
                                                                        container.items.items[5].items.items[0].setValue(null);
                                                                        container.items.items[5].items.items[1].setValue(null);
                                                                        container.items.items[5].items.items[0].setDisabled(true);
                                                                    }
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
                                                            width: 100,
                                                            xtype: 'xtemployee',
                                                            name: 'new_emp_id',
                                                            emptyText: i18n('id')
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'new_emp_name',
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
                                                    fieldLabel: _('date'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype : 'datefield',
                                                            editable: false,
                                                            name: 'new_join_date',
                                                            format : 'Y-m-d',
                                                            value: new Date(),
                                                            emptyText: i18n('date')
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
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                    me.status = record.data.status;
                }
            },
            columns: [
                {text: _('id'),width: 150,sortable: true,dataIndex: 'asset_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'new_asset_name'},
                {text: _('type'),width: 100,sortable: true,dataIndex: 'new_asset_type'},
                {text: _('company'),width: 100,sortable: true,dataIndex: 'new_company_id'},
                {text: _('office_location'),width: 100,sortable: true,dataIndex: 'new_ol_id'},
                {text: _('employee'),width: 150,sortable: true,dataIndex: 'new_emp_name'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'status'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('mutation_asset'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['asset_id',_('id')],['new_asset_name',_('name')],['new_asset_type',_('type')],['new_company_id',_('company')],['new_ol_id',_('office_location')],['new_emp_name',_('employee')]],
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
    onNewUser: function(){
        var me = this;
        me.formEditing.cancelEdit();
        me.store.insert(0, {aktif: 1,authorized: 1});
        me.formEditing.startEdit(0, 0);
    },

    load_asset: function(f){
        var me= this, fieldcontainer = f.up('container'), panel = fieldcontainer.up('panel'),
            old_company_id = panel.ownerCt.form.findField('old_company_id'),
            old_ol_id = panel.ownerCt.form.findField('old_ol_id'),
            old_asset_name = panel.ownerCt.form.findField('old_asset_name'),
            old_asset_type = panel.ownerCt.form.findField('old_asset_type'),
            old_request_type = panel.ownerCt.form.findField('old_request_type'),
            old_emp_id = panel.ownerCt.form.findField('old_emp_id'),
            old_emp_name = panel.ownerCt.form.findField('old_emp_name');
        me.store_asset.proxy.extraParams = {field_name:'asset_id',field_search:f.getValue()};
        me.store_asset.load({
            callback: function(records, operation, success) {
                old_company_id.setValue( records[0].data.company_id);
                old_ol_id.setValue( records[0].data.ol_id);
                old_asset_name.setValue( records[0].data.asset_name);
                old_asset_type.setValue( records[0].data.asset_type);
                old_request_type.setValue( records[0].data.request_type);
                old_emp_id.setValue( records[0].data.emp_id);
                old_emp_name.setValue( records[0].data.emp_name);
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
