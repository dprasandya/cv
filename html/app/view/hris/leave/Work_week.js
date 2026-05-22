
Ext.define('App.view.hris.leave.Work_week', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('work_week'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.leave.Work_week',{remoteSort: true, pageSize : 20, autoLoad: false});
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
                                            fieldLabel: _('day'),
                                            items: [
                                                {
                                                    width: 150,
                                                    xtype: 'textfield',
                                                    name: 'day_id',
                                                    allowBlank: false,
                                                    readOnly: true,
                                                    fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;',
                                                    emptyText: i18n('id')
                                                },
                                                {
                                                    width: 250,
                                                    xtype: 'textfield',
                                                    name: 'day_name',
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
                                                    xtype:'combo',
                                                    editable: false,
                                                    width:100,
                                                    mode:'local',
                                                    name: 'day_time',
                                                    store: ['Full Day', 'Half Day', 'Off Day']
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
                                                    editable: false,
                                                    fieldLabel: _('time_from'),
                                                    name: 'time_in',
                                                    format : 'H:i:s',
                                                    emptyText: i18n('time_from')
                                                },
                                                {
                                                    width: 200,
                                                    xtype : 'timefield',
                                                    editable: false,
                                                    fieldLabel: _('time_to'),
                                                    name: 'time_out',
                                                    format : 'H:i:s',
                                                    value: new Date(),
                                                    emptyText: i18n('time_to')
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
                {text: _('id'),width: 100,sortable: true,dataIndex: 'day_id'},
                {text: _('name'),width: 100,sortable: true,dataIndex: 'day_name'},
                {text: _('time_from'),width: 80,sortable: true,dataIndex: 'time_in'/*, renderer:Ext.util.Format.dateRenderer('d/m/Y H:i')*/},
                {text: _('time_to'),width: 80,sortable: true,dataIndex: 'time_out'/*, renderer:Ext.util.Format.dateRenderer('d/m/Y H:i')*/},
                {text: _('time'),flex:1,sortable: true,dataIndex: 'day_time'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('work_week'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['day_id',_('id')],['day_name',_('name')],['time_in',_('time_from')],['time_out',_('time_to')],['day_time',_('time')]],
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
