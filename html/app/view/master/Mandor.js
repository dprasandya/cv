
Ext.define('App.view.master.Mandor', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('mandor'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'co_id', type:'string'},
                    {name:'mandor_id', type:'string'},
                    {name:'seq_id', type:'integer'},
                    {name:'emp_id', type:'string'},
                    {name:'emp_name', type:'string'},
                    {name:'ol_id', type:'string'},
                    {name:'ol_name', type:'string'},
                    {name:'afdeling_group', type:'string'},
                    {name:'remarks', type:'string'},
                    {name:'active', type:'bool'},
                    {name:'userinput', type:'string'},
                    {name:'useredit', type:'string'},
                    {name:'timeedit', type:'date'}

                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: Mandor.select,
                        create: Mandor.add,
                        update: Mandor.update,
                        destroy: Mandor.delete
                    },
                    reader :{
                        root: 'rows',
                        totalProperty: 'totals'
                    }
                }
            });
        me.model_detail =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'co_id', type:'string'},
                {name:'mandor_id', type:'string'},
                {name:'emp_id', type:'string'},
                {name:'emp_name', type:'string'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read: Mandor.selectdetail,
                    create: Mandor.adddetail,
                    update: Mandor.updatedetail,
                    destroy: Mandor.deletedetail
                },
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                }
            }
        });
        me.store = Ext.create('Ext.data.Store',{model: me.model ,remoteSort: true});
        me.store_detail = Ext.create('Ext.data.Store',{model: me.model_detail ,remoteSort: true});
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            height: 1000,
            title: _('detail'),
            plugins: [
                me.formEditingDetail = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    listeners: {
                        beforeedit: function(editor,e,opt){
                            if(me.data.status == '1' || me.data.status =='2'){
                                return false;
                            }else{
                                return true
                            }
                        }
                    },
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
                                                    fieldLabel: _('employee'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtemployee',
                                                            name: 'emp_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('id')
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'emp_name',
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
                {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'emp_name'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('add'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewDetail
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['emp_id',_('id')],['emp_name',_('name')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_detail.proxy.extraParams = {mandor_id:me.data.mandor_id, field_name:me.field_name, field_search:field.value}; me.store_detail.load({params:{start:0}})}}}
                }
            ]
        });
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
                    items: [
                        {
                            xtype:'tabpanel',
                            items:[
                                {
                                    xtype: 'panel',
                                    title: _('mandor'),
                                    items: [
                                        {
                                            layout: 'hbox',
                                            items:[
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
                                                                    name: 'mandor_id',
                                                                    readOnly: true,
                                                                    fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;',
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
                                                            fieldLabel: _('employee'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xtemployee',
                                                                    name: 'emp_id',
                                                                    allowBlank: false,
                                                                    emptyText: i18n('id')
                                                                },
                                                                {
                                                                    width: 280,
                                                                    xtype: 'textfield',
                                                                    name: 'emp_name',
                                                                    readOnly: true,
                                                                    emptyText: i18n('name'),
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
                                                                    width: 100,
                                                                    xtype: 'xtol_type',
                                                                    name: 'ol_id',
                                                                    allowBlank: false,
                                                                    emptyText: i18n('office_location')
                                                                }
                                                            ]
                                                        },
                                                        /*{
                                                            xtype: 'fieldcontainer',
                                                            layout: {
                                                                type: 'hbox'
                                                            },
                                                            fieldDefaults: {
                                                                labelAlign: 'right'
                                                            },
                                                            fieldLabel: _('afdeling_group'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xtafdeling_group_combo',
                                                                    name: 'afdeling_group',
                                                                    allowBlank: false,
                                                                    emptyText: i18n('afdeling_group')
                                                                }
                                                            ]
                                                        },*/
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
                                        }

                                    ]
                                },
                                me.grid_detail
                            ]
                        }


                    ]
                })
            ],
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.data= record.data;
                    me.store_detail.proxy.extraParams = {mandor_id:me.data.mandor_id};
                    me.store_detail.load();
                    // disable btn add detail //
                    var btn_add_detail = me.grid_detail.down('toolbar').items.items[0];
                    if(record.data.status ==1 || record.data.status==2){btn_add_detail.setDisabled(true);}
                    else{btn_add_detail.setDisabled(false);}
                }
            },
            columns: [
                {text: _('mandor'),width: 80,sortable: true,dataIndex: 'mandor_id'},
                {text: _('id'),flex: 1,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'emp_name'},
                {text: _('office_location'),width: 100,sortable: true,dataIndex: 'ol_name'},
                //{text: _('afdeling_group'),width: 80,sortable: true,dataIndex: 'afdeling_group'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('add'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['mandor_id',_('mandor')],['emp_name',_('name')],['ol_name',_('office_location')],['remarks',_('remarks')]],
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
    onNewDetail: function(){
        var me = this;
        me.formEditingDetail.cancelEdit();
        me.store_detail.insert(0, {aktif: 1,authorized: 1});
        me.formEditingDetail.startEdit(0, 0);
        me.formEditingDetail.context.record.data.mandor_id = me.data.mandor_id;
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
