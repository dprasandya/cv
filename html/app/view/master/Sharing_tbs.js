
Ext.define('App.view.master.Sharing_tbs', {
    extend: 'App.ux.RenderPanel',
    pageTitle: 'Sharing Cost TBS',
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.model =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'co_id', type:'string'},
                {name:'seq_id', type:'integer'},
                {name:'item_id', type:'string'},
                {name:'item_name', type:'string'},
                {name:'unit_id', type:'string'},
                {name:'percentase', type:'float'},
                {name:'percentase_fee', type:'float'},
                {name:'percentase_piutang', type:'float'},
                {name:'coa_fee', type:'string'},
                {name:'coa_piutang', type:'string'},
                {name:'userinput', type:'string'},
                {name:'useredit', type:'string'},
                {name:'timeedit', type:'date'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read: Sharing_tbs.select,
                    create: Sharing_tbs.add,
                    update: Sharing_tbs.update,
                    destroy: Sharing_tbs.delete
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
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
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
                                    fieldLabel: _('item'),
                                    items: [
                                        {
                                            width: 100,
                                            xtype: 'xtitems',
                                            name: 'item_id',
                                            editable: false,
                                            emptyText: i18n('id'),
                                            extraParams:['HK'],
                                            listeners:{
                                                change:function(field){
                                                    me.type=field.value;
                                                    var container = field.up('container'), form = container.up('panel'),
                                                        percentase_fee = Ext.ComponentQuery.query('[name=percentase_fee]', form)[0],
                                                        percentase_piutang = Ext.ComponentQuery.query('[name=percentase_piutang]', form)[0];
                                                    if(me.type=='KSWT01'){
                                                        percentase_fee.setDisabled(true);percentase_piutang.setDisabled(true); 
                                                    }else {
                                                        percentase_fee.setDisabled(false);percentase_piutang.setDisabled(false); 
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            width: 198,
                                            xtype: 'textfield',
                                            readOnly: true,
                                            name: 'item_name',
                                            emptyText: i18n('name'),
                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                        },
                                        {
                                            width: 80,
                                            xtype: 'textfield',
                                            name: 'unit_id',
                                            readOnly: true,
                                            emptyText: i18n('unit'),
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
                                    fieldLabel: 'Percentase TBS',
                                    items: [
                                        {
                                            width: 100,
                                            xtype: 'mitos.percent',
                                            name: 'percentase',
                                            emptyText: 'Persentase'
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
                                            fieldLabel: 'Percentase Fee',
                                            width: 200,
                                            xtype: 'mitos.percent',
                                            name: 'percentase_fee',
                                            emptyText: 'Persentase'
                                        },
                                        {
                                            fieldLabel: 'Coa Fee',
                                            width: 200,
                                            xtype: 'xtaccount',
                                            editable: false,
                                            name: 'coa_fee',
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
                                    items: [
                                        {
                                            fieldLabel: 'Percentase Piutang',
                                            width: 200,
                                            xtype: 'mitos.percent',
                                            name: 'percentase_piutang',
                                            emptyText: 'Persentase'
                                        },
                                        {
                                            fieldLabel: 'Coa Piutang',
                                            width: 200,
                                            xtype: 'xtaccount',
                                            editable: false,
                                            name: 'coa_piutang',
                                            emptyText: i18n('id')
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
                    me.item_id = record.data.item_id;
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('no'),width: 60,sortable: true,dataIndex: 'seq_id'},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'item_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'item_name'},
                {text: 'Percentase',width: 80,sortable: true,dataIndex: 'percentase', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00%')},
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
                    store: [['item_id',_('id')],['itemd_name',_('name')],['persentase','Persentase']],
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
