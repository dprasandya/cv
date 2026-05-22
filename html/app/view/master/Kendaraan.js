
Ext.define('App.view.master.Kendaraan', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('kendaraan'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.model =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'co_id', type:'string'},
                {name:'kendaraan_id', type:'string'},
                {name:'nopol', type:'string'},
                {name:'warna', type:'string'},
                {name:'kapasitas', type:'float'},
                {name:'merk', type:'string'},
                {name:'remarks', type:'string'},
                {name:'unit_id', type:'string'},
                {name:'ol_id', type:'string'},
                {name:'bahan_bakar', type:'string'},
                {name:'nama_sopir', type:'string'},
                {name:'active', type:'bool'},
                {name:'userinput', type:'string'},
                {name:'useredit', type:'string'},
                {name:'timeinput', type:'date'},
                {name:'timeedit', type:'date'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read: Kendaraan.select,
                    create: Kendaraan.add,
                    update: Kendaraan.update,
                    destroy: Kendaraan.delete
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
                            xtype: 'panel',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
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
                                                            width: 150,
                                                            xtype: 'textfield',
                                                            name: 'kendaraan_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('id')
                                                        },
                                                        {
                                                            width: 300,
                                                            fieldLabel: 'Nopol',
                                                            xtype: 'textfield',
                                                            name: 'nopol',
                                                            allowBlank:false,
                                                            emptyText: i18n('nomor')
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
                                                    fieldLabel: _('driver'),
                                                    items: [
                                                        {
                                                            width: 380,
                                                            xtype: 'textfield',
                                                            name: 'nama_sopir',
                                                            allowBlank: false,
                                                            emptyText: i18n('driver')
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
                                                    fieldLabel: _('merk'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'textfield',
                                                            name: 'merk',
                                                            allowBlank:false,
                                                            emptyText: i18n('merk')
                                                        },
                                                        {
                                                            width: 300,
                                                            fieldLabel: 'Warna',
                                                            xtype: 'textfield',
                                                            name: 'warna',
                                                            emptyText: i18n('warna')
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
                                                            fieldLabel: _('capacity'),
                                                            width: 195,
                                                            xtype: 'mitos.currency',
                                                            name: 'kapasitas'
                                                        },
                                                        {
                                                            width: 60,
                                                            xtype: 'unitcombo',
                                                            name: 'unit_id',
                                                            emptyText: i18n('unit'),
                                                        },
                                                        {
                                                            width: 300,
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Jenis Bahan Bakar',
                                                            name: 'bahan_bakar',
                                                            emptyText: i18n('BBM')
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
                                                    fieldLabel: 'Cost Area',
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtol_type',
                                                            name: 'ol_id',
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
                {text: _('id'),width: 80,sortable: true,dataIndex: 'kendaraan_id'},
                {text: _('driver'),flex: 1,sortable: true,dataIndex: 'nama_sopir'},
                {text: 'Nopol',width: 80,sortable: true,dataIndex: 'nopol'},
                {text: _('merk'),width: 100,sortable: true,dataIndex: 'merk'},
                {text: 'Warna',width: 80,sortable: true,dataIndex: 'warna'},
                {text: _('capacity'),width: 100,sortable: true,dataIndex: 'kapasitas', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('unit'),width: 80,sortable: true,dataIndex: 'unit_id'},
                {text: 'BBM',width: 80,sortable: true,dataIndex: 'bahan_bakar', align:'right'},
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
                    store: [['kendaraan_id',_('id')],['nama_sopir',_('driver')],['nopol',_('nopol')],['merk',_('merk')],['remarks',_('remarks')]],
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
                    displayfield:'useredit'
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
