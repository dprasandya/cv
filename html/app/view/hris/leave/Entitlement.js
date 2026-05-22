
Ext.define('App.view.hris.leave.Entitlement', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('entitlement'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.leave.Entitlement',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
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
                                            fieldLabel: _('id'),
                                            items: [
                                                {
                                                    width: 150,
                                                    xtype: 'xtlv_type',
                                                    name: 'lt_id',
                                                    allowBlank: false,
                                                    emptyText: i18n('type')
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
                                                    width: 150,
                                                    xtype: 'xtol_type',
                                                    name: 'ol_id',
                                                    allowBlank: false,
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
                                                    width: 200,
                                                    xtype : 'datefield',
                                                    editable: false,
                                                    fieldLabel: _('date_from'),
                                                    name: 'fromdate',
                                                    format : 'Y-m-d',
                                                    value: new Date(),
                                                    maxValue : new Date(),
                                                    emptyText: i18n('date_from')
                                                },
                                                {
                                                    width: 200,
                                                    xtype : 'datefield',
                                                    editable: false,
                                                    fieldLabel: _('date_to'),
                                                    name: 'todate',
                                                    format : 'Y-m-d',
                                                    value: new Date(),
                                                    emptyText: i18n('date_to')
                                                }
                                            ]
                                        }
                                    ]
                                },
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
                                            fieldLabel: _('entitlement'),
                                            items: [
                                                {
                                                    width: 100,
                                                    xtype: 'numberfield',
                                                    name: 'entitlement',
                                                    allowBlank: false,
                                                    emptyText: i18n('entitlement')
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
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('type'),width: 100,sortable: true,dataIndex: 'lt_id'},
                {text: _('office_location'),width: 100,sortable: true,dataIndex: 'ol_id'},
                {text: _('date_from'),width: 80,sortable: true,dataIndex: 'fromdate', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('date_to'),width: 80,sortable: true,dataIndex: 'todate', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('entitlement'),flex:1,sortable: true,dataIndex: 'entitlement'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('entitlement'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['lt_id',_('type')],['ol_id',_('office_location')],['entitlement',_('entitlement')]],
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
