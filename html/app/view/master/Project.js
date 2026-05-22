
Ext.define('App.view.master.Project', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('project'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'co_id', type:'string'},
                    {name:'project_id', type:'string'},
                    {name:'project_name', type:'string'},
                    {name:'contact', type:'string'},
                    {name:'phone', type:'string'},
                    {name:'city', type:'string'},
                    {name:'region', type:'string'},
                    {name:'address', type:'string'},
                    {name:'land_dedicated', type:'float'},
                    {name:'public_facilities_type', type:'string'},
                    {name:'public_facilities_prs', type:'float'},
                    {name:'public_facilities', type:'float'},
                    {name:'net_effective', type:'float'},
                    {name:'remarks', type:'string'},
                    {name:'active', type:'bool'},
                    {name:'userinput', type:'string'},
                    {name:'useredit', type:'string'},
                    {name:'timeedit', type:'date'}

                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: Project.select,
                        create: Project.add,
                        update: Project.update,
                        destroy: Project.delete
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
                items: [
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'fieldset',
                                title: _('supplier'),
                                defaultType: 'textfield',
                                layout: 'hbox',
                                flex:1,
                                items: [
                                    {
                                        xtype: 'container',
                                        layout:'anchor',
                                        flex:1,
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
                                                        name: 'project_id',
                                                        allowBlank: false,
                                                        emptyText: i18n('id')
                                                    },
                                                    {
                                                        width: 280,
                                                        xtype: 'textfield',
                                                        name: 'project_name',
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
                                                fieldLabel: _('city'),
                                                items: [
                                                    {
                                                        width: 100,
                                                        xtype: 'textfield',
                                                        name: 'city',
                                                        emptyText: i18n('city')
                                                    },
                                                    {
                                                        width: 280,
                                                        xtype: 'textfield',
                                                        name: 'region',
                                                        emptyText: i18n('region')
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
                                                        height: 30,
                                                        xtype: 'textarea',
                                                        style:{overflow:'auto'},
                                                        name: 'address',
                                                        emptyText: i18n('address'),
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
                                                fieldLabel: _('contact_info'),
                                                items: [
                                                    {
                                                        width: 100,
                                                        xtype: 'textfield',
                                                        name: 'contact',
                                                        emptyText: i18n('contact_info')
                                                    },
                                                    {
                                                        width: 280,
                                                        xtype: 'textfield',
                                                        name: 'phone',
                                                        emptyText: i18n('phone')
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
                                    },
                                    {
                                        xtype: 'container',
                                        layout:'anchor',
                                        flex:1,
                                        items: [
                                            {
                                                xtype: 'fieldcontainer',
                                                layout: {
                                                    type: 'hbox'
                                                },
                                                fieldDefaults: {
                                                    labelAlign: 'right'
                                                },
                                                fieldLabel: _('land_dedicated'),
                                                items: [
                                                    {
                                                        width: 220,
                                                        xtype: 'mitos.currency',
                                                        name: 'land_dedicated',
                                                        allowBlank: false,
                                                        emptyText: i18n('land_dedicated'),
                                                        enableKeyEvents: true,
                                                        listeners:{
                                                            keyup:function(field, e){
                                                                me.get_total(field);
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
                                                fieldLabel: _('public_facilities'),
                                                items: [
                                                    {
                                                        width: 70,
                                                        xtype: 'combo',
                                                        name: 'public_facilities_type',
                                                        allowBlank: false,
                                                        emptyText: i18n('%'),
                                                        mode:'local',
                                                        store: [['P','Prs(%)'],['L',_('area')]],
                                                        listeners:{
                                                            change:function(field){
                                                                var form = field.up('container'),
                                                                    public_facilities_prs = form.items.items[1],
                                                                    public_facilities = form.items.items[2];
                                                                if(field.value=='P'){
                                                                    public_facilities_prs.setReadOnly(false);
                                                                    public_facilities.setReadOnly(true);
                                                                }else{public_facilities_prs.setReadOnly(true);
                                                                    public_facilities.setReadOnly(false);}
                                                            }
                                                        }
                                                    },
                                                    {
                                                        width: 50,
                                                        xtype: 'mitos.percent',
                                                        name: 'public_facilities_prs',
                                                        readOnly: true,
                                                        emptyText: i18n('%'),
                                                        enableKeyEvents: true,
                                                        listeners:{
                                                            keyup:function(field, e){
                                                                me.get_total(field);
                                                            }
                                                        }
                                                    },
                                                    {
                                                        width: 100,
                                                        xtype: 'mitos.currency',
                                                        readOnly: true,
                                                        name: 'public_facilities',
                                                        emptyText: i18n('public_facilities'),
                                                        enableKeyEvents: true,
                                                        listeners:{
                                                            keyup:function(field, e){
                                                                me.get_total(field);
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
                                                fieldLabel: _('net_effective'),
                                                items: [
                                                    {
                                                        width: 220,
                                                        xtype: 'mitos.currency',
                                                        name: 'net_effective',
                                                        readOnly: true,
                                                        emptyText: i18n('net_effective'),
                                                        fieldStyle:'background-color: #F2F3F4; text-align:right; background-image: none;'
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
                    }

                ]
            })
            ],
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'project_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'project_name'},
                {text: _('city'),width: 100,sortable: true,dataIndex: 'city'},
                {text: _('region'),width: 100,sortable: true,dataIndex: 'region'},
                {text: _('remarks'),flex:1, sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('project'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['project_id',_('id')],['project_name',_('name')],['city',_('city')],['address',_('address')],['region',_('region')],['remarks',_('remarks')]],
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
    get_total:function(field){
        var me=this, plugin = me.grid.editingPlugin,
            public_facilities_type = plugin.editor.form.findField('public_facilities_type').getValue(),
            land_dedicated = plugin.editor.form.findField('land_dedicated'),
            public_facilities_prs = plugin.editor.form.findField('public_facilities_prs'),
            public_facilities = plugin.editor.form.findField('public_facilities'),
            net_effective = plugin.editor.form.findField('net_effective');
        if(public_facilities_type=='P'){
            public_facilities.setValue(land_dedicated.getValue()*(public_facilities_prs.getValue()/100));
        }else if(public_facilities_type=='L'){
            public_facilities_prs.setValue((public_facilities.getValue()/land_dedicated.getValue()) * 100);
        }
        net_effective.setValue(land_dedicated.getValue()-public_facilities.getValue());
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
