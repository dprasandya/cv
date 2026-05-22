
Ext.define('App.view.master.Actual_Cost', {
    extend: 'App.ux.RenderPanel',
    
    pageTitle: _('actual_cost'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.model =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'co_id', type:'string'},
                {name:'seq_id', type:'interger'},
                {name:'doc_name', type:'string'},
                {name:'remarks', type:'string'},
                {name:'userinput', type:'string'},
                {name:'useredit', type:'string'},
                {name:'timeinput', type:'date'},
                {name:'timeedit', type:'date'},
                {name:'status', type:'string'}
                

            ],
            proxy:{
                type:'direct',
                api:{
                    read: Actual_Cost.select,
                    create: Actual_Cost.add,
                    update: Actual_Cost.update,
                    destroy: Actual_Cost.delete
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
                {name:'seq_id', type:'integer'},
                {name:'coa_id', type:'string'},
                {name:'coa_name', type:'string'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read: Actual_Cost.selectdetail,
                    create: Actual_Cost.adddetail,
                    update: Actual_Cost.updatedetail,
                    destroy: Actual_Cost.deletedetail
                },
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                }
            }
        });
        me.store = Ext.create('Ext.data.Store',{model: me.model ,remoteSort: true, autoLoad: true});
        me.store_detail = Ext.create('Ext.data.Store',{model: me.model_detail ,remoteSort: true});
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            height: 1000,
            title: _('detail'),
            plugins: [
                me.formEditingDetail = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    fieldDefaults: {
                                        labelAlign: 'right'
                                    },
                                    fieldLabel: _('account'),
                                    items: [
                                        {
                                            width: 100,
                                            xtype: 'xtaccount',
                                            name: 'coa_id',
                                            editable: false,
                                            emptyText: i18n('id'),
                                            extraParams:{level:'3'}
                                        },
                                        {
                                            width: 198,
                                            xtype: 'textfield',
                                            readOnly: true,
                                            name: 'coa_name',
                                            emptyText: i18n('name'),
                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                        }
                                    ]
                                }
                            ]
                        }

                    ]
                })
            ],
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'coa_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'coa_name'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('detail'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewDetail
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['coa_id',_('id')],['coa_name',_('name')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_detail.proxy.extraParams = {field_name:me.field_name, field_search:field.value}; me.store_detail.load({params:{start:0}})}}}
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
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar'); me.seq_id = record.data.seq_id ;
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.store_detail.proxy.extraParams = {seq_id: record.data.seq_id};
                    me.store_detail.load({params:{seq_id:record.data.seq_id}});
                    var btn_add_detail = me.grid_detail.down('toolbar').items.items[0];
                    if(record.data.status ==1 || record.data.status==2){btn_add_detail.setDisabled(true);}
                    else{btn_add_detail.setDisabled(false);}
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
                                    title: _('actual_cost'),
                                    items: [
                                        {
                                            layout: 'hbox',
                                            items:[
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
                                                                    width: 280,
                                                                    xtype: 'textfield',
                                                                    name: 'doc_name',
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
                                                                    name: 'status'
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
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'seq_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'doc_name'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('actual_cost'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['seq_id',_('id')],['doc_name',_('name')],['remarks',_('remarks')]],
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
        me.formEditingDetail.context.record.data.seq_id = me.seq_id;
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
