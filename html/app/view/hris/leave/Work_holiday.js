
Ext.define('App.view.hris.leave.Work_holiday', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('work_holiday'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.leave.Work_holiday',{remoteSort: true, pageSize : 20, autoLoad: false});
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
                                            fieldLabel: _('work_holiday'),
                                            items: [
                                                {
                                                    width: 100,
                                                    xtype : 'datefield',
                                                    name: 'holiday_date',
                                                    format : 'Y-m-d',
                                                    value: new Date(),
                                                    emptyText: i18n('date')
                                                },
                                                {
                                                    width: 280,
                                                    xtype : 'textfield',
                                                    name: 'holiday_name',
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
                                                    store: ['Full Day', 'Half Day']
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
                                                    fieldLabel: _('repeats'),
                                                    name: 'repeats_annually'
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
                {text: _('date'),width: 80,sortable: true,dataIndex: 'holiday_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('name'),flex:1,sortable: true,dataIndex: 'holiday_name'},
                {text: _('time'),width: 100,sortable: true,dataIndex: 'day_time'},
                {text: _('repeats'),width: 100,sortable: true,dataIndex: 'repeats_annually',renderer: me.boolRenderer}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('work_holiday'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['holiday_date',_('date')],['holiday_name',_('name')],['day_time',_('time')]],
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
