
Ext.define('App.view.master.BuildingType', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('building_type'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.model =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'co_id', type:'string'},
                {name:'building_id', type:'string'},
                {name:'building_name', type:'string'},
                {name:'project_id', type:'string'},
                {name:'project_name', type:'string'},
                {name:'cluster_id', type:'string'},
                {name:'cluster_name', type:'string'},
                {name:'remarks', type:'string'},
                {name:'active', type:'bool'},
                {name:'userinput', type:'string'},
                {name:'useredit', type:'string'},
                {name:'timeedit', type:'date'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read: BuildingType.select,
                    create: BuildingType.add,
                    update: BuildingType.update,
                    destroy: BuildingType.delete
                },
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                }
            }
        });
        me.store = Ext.create('Ext.data.Store',{model: me.model ,remoteSort: true, autoLoad: true});
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                }
            },
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: _('building_type'),
                                    defaultType: 'textfield',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'container',
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
                                                            xtype: 'textfield',
                                                            name: 'building_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('id')
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'building_name',
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
                                },
                                {
                                    xtype: 'fieldset',
                                    title: _('project'),
                                    defaultType: 'textfield',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'container',
                                            items: [
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    fieldLabel: _('project'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'projectcombo',
                                                            name: 'project_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('project'),
                                                            listeners:{
                                                                change: function(f){
                                                                    var container = f.up('container'), form = container.up('container'),
                                                                        cluster_id =  Ext.ComponentQuery.query('[name=cluster_id]', form)[0];
                                                                    cluster_id.setValue(''); cluster_id.extraParams =[f.value];
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
                                                    fieldLabel: _('cluster'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtcluster',
                                                            name: 'cluster_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('id')
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'cluster_name',
                                                            readOnly: true,
                                                            emptyText: i18n('name'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
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
                {text: _('project'),width: 100,sortable: true,dataIndex: 'project_name'},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'building_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'building_name'},
                {text: _('cluster'),flex: 1,sortable: true,dataIndex: 'cluster_name'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('building_type'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['project_name',_('project')],['cluster_name',_('name')],['building_id',_('id')],['building_name',_('name')],['remarks',_('remarks')]],
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
                    xtype: 'label'
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
