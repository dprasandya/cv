
Ext.define('App.view.master.Account', {
    extend: 'App.ux.RenderPanel',
    id: 'panelAccount',
    pageTitle: _('account'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'co_id', type:'string'},
                    {name:'coa_id', type:'string'},
                    {name:'coa_name', type:'string'},
                    {name:'coa_type', type:'string'},
                    {name:'coa_group', type:'string'},
                    {name:'station_type', type:'string'},
                    {name:'station_name', type:'string'},
                    {name:'station_group', type:'string'},
                    {name:'level', type:'integer'},
                    {name:'remarks', type:'string'},
                    {name:'active', type:'bool'},
                    {name:'userinput', type:'string'},
                    {name:'useredit', type:'string'},
                    {name:'timeedit', type:'date'}

                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: Account.select,
                        create: Account.add,
                        update: Account.update,
                        destroy: Account.delete
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
                                                            width: 100,
                                                            xtype: 'textfield',
                                                            name: 'coa_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('id')
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'coa_name',
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
                                                            name: 'coa_type',
                                                            emptyText: i18n('type'),
                                                            width:100,
                                                            mode:'local',
                                                            store: [['A','Asset'],['L','Liabilities'],['C','Capital'],['E','Expense'],['R','Revenue']]
                                                        },
                                                        {
                                                            xtype:'combo',
                                                            editable: false,
                                                            name: 'coa_group',
                                                            emptyText: 'coa group',
                                                            width:100,
                                                            mode:'local',
                                                            store: [['N','Neraca'],['L','Laba-Rugi']]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    items: [
                                                        {
                                                            width: 200,
                                                            labelAlign: 'right',
                                                            fieldLabel: 'Level',
                                                            xtype: 'numberfield',
                                                            name: 'level',
                                                            emptyText: 'level'
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
                                                    fieldLabel: _('station'),
                                                    items: [
                                                        {
                                                            xtype:'combo',
                                                            editable: false,
                                                            name: 'station_type',
                                                            emptyText: 'Station',
                                                            width:100,
                                                            mode:'local',
                                                            store: ['PKS','KEBUN'],
                                                            listeners:{
                                                                change:function(f){
                                                                    var cont = f.up('container'), station_group = cont.items.items[2]; 
                                                                    me.station_type=f.value;
                                                                    if(f.value=='PKS'){station_group.setDisabled(false)}
                                                                    else{
                                                                        station_group.setDisabled(true);
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype:'stationnamecombo',
                                                            name: 'station_name',
                                                            emptyText: 'Station',
                                                            width:200,
                                                            listeners: {
                                                                render: function(c){
                                                                    c.getEl().on({
                                                                        click: function() {
                                                                            c.store.load({params:{station_type:me.station_type}});
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype:'stationcombo',
                                                            name: 'station_group',
                                                            emptyText: 'Station PKS',
                                                            width:120
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
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
                {text: _('id'),width: 80,sortable: true,dataIndex: 'coa_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'coa_name'},
                {text: _('type'),width: 100,sortable: true,dataIndex: 'coa_type'},
                {text: 'Station Type',width: 150,sortable: true,dataIndex: 'station_type'},
                {text: 'Station Name',width: 150,sortable: true,dataIndex: 'station_name'},
                {text: 'Station Group',width: 100,sortable: true, align:'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                        var returnString = record.data.station_group=='S'?'PKS - S.Leading R':(record.data.station_group=='V'?'PKS - V.Sterilizer':(record.data.station_group=='T'?'PKS - Threser':(record.data.station_group=='B'?'PKS - Boiler':(record.data.station_group=='I'?'PKS - Klarifikasi':(record.data.station_group=='L'?'PKS - Kernel':(record.data.station_group=='H'?'PKS - Power House':(record.data.station_group=='W'?'PKS - Workshop':(record.data.station_group=='R'?'PKS - Others':(record.data.station_group=='C'?'PKS - Limbah':(record.data.station_group=='N'?'PKS - Laboratorium':(record.data.station_group=='J'?'PKS-Sample Produk':null))))))))))) ;
                        return returnString;
                    }},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('account'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['coa_id',_('id')],['coa_name',_('name')],['coa_type',_('type')],['station_type','Station Type'],['station_name','Station Name'],['station_group','Station Group'],['remarks',_('remarks')]],
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
                    //fieldLabel:'useredit'
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
