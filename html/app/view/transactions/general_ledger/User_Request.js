Ext.define('App.view.transactions.general_ledger.User_Request', {
    extend:'App.ux.RenderPanel',
    pageTitle:'User Request',
    initComponent : function()
    {
        var me = this;
        me.admin_store = ['PROGRESS','DONE','CANCEL'];
        me.user_store = ['REQUEST'];
        Ext.define('User_RequestModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'seq_id',type: 'integer'},
                {name: 'user_id',type: 'string'},
                {name: 'user_name',type: 'string'},
                {name: 'permasalahan',type: 'string'},
                {name: 'penyelesaian',type: 'string'},
                {name: 'status',type: 'string'},
                {name: 'user_done',type: 'string'},
                {name: 'timeedit',type: 'date'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read: User_Request.select,
                    create: User_Request.add,
                    update: User_Request.update,
                    destroy : User_Request.delete
                },
                reader :
                {
                    root : 'rows',
                    totalProperty : 'totals'
                }
            }

        });
        me.User_RequestStore = Ext.create('Ext.data.Store', {
            storeId : 'User_RequestStore',
            model : 'User_RequestModel',
            remoteSort : false,
            pageSize: 15,
            autoLoad: false
        });
        me.User_RequestGrid = Ext.create('App.ux.GridPanel', {
            store: me.User_RequestStore,
            height: 370,
            margin: '0 0 3 0',
            region: 'north',
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    me.data = record.data;
                    // disable btn add detail //
                    var btn_del = me.User_RequestGrid.down('toolbar').items.items[1];
                    btn_del.setDisabled(window.user.usrname=='admin' ? false: true);
                }
            },
            plugins: [
                me.formEditingDetail = Ext.create('App.ux.grid.RowFormEditing', {
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
                                    title: 'Request',
                                    layout: 'hbox',
                                    flex:1,
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
                                                    fieldLabel: _('status'),
                                                    items: [
                                                        {
                                                            xtype:'combo',
                                                            editable: false,
                                                            name: 'status',
                                                            width:100,
                                                            mode:'local',
                                                            store:window.user.usrname=='admin' ? me.admin_store:me.user_store ,
                                                            emptyText   : 'Select',
                                                            allowBlank:false,
                                                            listeners:{
                                                                change:function(field){
                                                                    var form = field.up('container'),
                                                                        user_done = Ext.ComponentQuery.query('[name=user_done]', form)[0];
                                                                    if(field.value=='DONE'){
                                                                        user_done.setDisabled(false);
                                                                    }else{
                                                                        user_done.setDisabled(true);
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype:'textfield',
                                                            name: 'user_done',
                                                            width:150,
                                                            allowBlank:false,
                                                            disabled:true
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
                                                    fieldLabel: 'Permasalahan',
                                                    items: [
                                                        {
                                                            width: 700,
                                                            height: 100,
                                                            xtype: 'textarea',
                                                            style:{overflow:'auto'},
                                                            name: 'permasalahan',
                                                            emptyText: 'Permasalahan',
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
                                                    fieldLabel: 'Penyelesaian',
                                                    items: [
                                                        {
                                                            width: 700,
                                                            disabled: window.user.usrname=='admin' ? false:true,
                                                            height: 35,
                                                            xtype: 'textarea',
                                                            style:{overflow:'auto'},
                                                            name: 'penyelesaian',
                                                            emptyText: 'Penyelesaian',
                                                            labelAlign: 'top'
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
                
            columns:[
                {width:60,header: 'No',sortable: false, dataIndex: 'sequence_no', align:'left'},
                {width:80,header: 'User Request',sortable: false, dataIndex: 'user_id', align:'center'},
                {flex:1,header: 'Permasalahan',sortable: false, dataIndex: 'permasalahan'},
                {flex:1,header: 'Penyelesaian',sortable: false, dataIndex: 'penyelesaian'},
                {width:80,header: 'User Done',sortable: false, dataIndex: 'user_done', align:'center'},
                {width:80,header: 'Status',sortable: false, dataIndex: 'status', align:'center'},
                {header: 'LastUpdate', dataIndex: 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    xtype: 'button',
                    text: _('add'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
                },               {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'delete',
                    scope:me,
                    handler:me.onDeleteRec
                },
                {
                    xtype: 'pagingtoolbar',
                    store: me.User_RequestStore,
                    beforePageText: 'Page',
                    afterPageText: 'of {0}',
                    displayMsg: 'Diplay {0} - {1} Of {2}',
                    emptyMsg: 'No Record Found',
                    dock: 'bottom',
                    displayInfo: true,
                    pageSize: 10
                },
                {
                    xtype : 'combo',
                    emptyText: ('Pilih'),
                    width:200,
                    enableKeyEvents:true,
                    typeAhead: true,
                    mode:'local',
                    store:[
                        ['user_id','User Request'],
                        ['permasalahan' ,'Permasalahan'],
                        ['penyelesaian','Penyelesaian'],
                        ['status','Status'],
                        ['user_done','User Done']
                    ],
                    listeners : {
                        change:function(){
                            me.var_search=this.getValue();
                        }
                    }
                },
                {
                    xtype : 'textfield',
                    emptyText: ('enter search key'),
                    width:250,
                    listeners : {
                        specialkey:function(field,e){
                            if(e.getKey() == e.ENTER){
                                me.User_RequestStore.load({params:{search1: me.var_search, search2: field.value}});
                            }
                        }
                    }
                }

            ]
        });

        me.pageBody = [ me.User_RequestGrid];
        me.callParent(arguments);

    },
    // end of initComponent
    onNewData:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        console.log(window.user.usrname);
      if(window.user.usrname!='admin'){plugin.editor.form.findField('status').setValue('REQUEST')}
    },

    onDeleteRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin,
            sm = grid.getSelectionModel(),
            selection = grid.getView().getSelectionModel().getSelection()[0];

        plugin.cancelEdit();
        if (selection) {
            Ext.Msg.show({
                title: 'Please Confirm' + '...',
                msg: 'Are you sure want to delete' + ' ?',
                icon: Ext.MessageBox.QUESTION,
                buttons: Ext.Msg.YESNO,
                fn: function(btn){
                    if(btn == 'yes'){
                        store.remove(selection);
                        store.sync();
                        if (store.getCount() > 0) {
                            sm.select(0);
                        }
                    }
                }
            });

        }

    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive : function(callback)
    {
        this.User_RequestStore.load();
        callback(true);
    }
});
//ens LogPage class