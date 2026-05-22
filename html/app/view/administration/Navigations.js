
Ext.define('App.view.administration.Navigations', {
    extend: 'App.ux.RenderPanel',
    id: 'panelNavigations',
    pageTitle: _('navigation'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'co_id', type:'string'},
                    {name:'nav_id', type:'string'},
                    {name:'nav_name', type:'string'},
                    {name:'nav_type', type:'string'},
                    {name:'module', type:'string'}

                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: Navigations.select,
                        create: Navigations.add,
                        update: Navigations.update,
                        destroy: Navigations.delete
                    },
                    reader :{
                        root: 'rows',
                        totalProperty: 'totals'
                    }
                }
            });
        me.store = Ext.create('Ext.data.Store',{model: me.model ,remoteSort: true});
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    autoCancel:true,
                    items: [
                        {
                            xtype: 'panel',
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
                                                    fieldLabel: _('id'),
                                                    items: [
                                                        {
                                                            width: 500,
                                                            xtype: 'textfield',
                                                            name: 'nav_id',
                                                            allowBlank: false,
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
                                                    fieldLabel: _('name'),
                                                    items: [
                                                        {
                                                            width: 200,
                                                            xtype: 'textfield',
                                                            name: 'nav_name',
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
                                                            xtype:'combo',
                                                            editable: false,
                                                            name: 'nav_type',
                                                            emptyText: i18n('type'),
                                                            width:100,
                                                            mode:'local',
                                                            store: [['M','Main'],['C','Children']]
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
                                                    fieldLabel: 'Module',
                                                    items: [
                                                        {
                                                            xtype:'combo',
                                                            editable: false,
                                                            name: 'module',
                                                            emptyText: i18n('modules'),
                                                            width:150,
                                                            mode:'local',
                                                            store: ['Administrations','Master','Marketing','Logistics','Production','Account Receivable','Account Payable','Cash Bank','General Ledger']
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
                {text: _('id'),flex: 1,sortable: true,dataIndex: 'nav_id'},
                {text: _('name'),width: 100,sortable: true,dataIndex: 'nav_name'},
                {text: _('type'),width: 100,sortable: true,dataIndex: 'nav_type'},
                {text: _('modules'),width: 150,sortable: true,dataIndex: 'module'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('navigation'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['nav_id',_('id')],['nav_name',_('name')],['nav_type',_('type')],['module',_('modules')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store.proxy.extraParams = {field_name:me.field_name, field_search:field.value}; me.store.load({params:{start:0}})}}}
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
        this.store.load();
        callback(true);
    }
});
