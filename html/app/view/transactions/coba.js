Ext.define('App.view.transaksi.cancel-return.CancelReturn', {
    extend: 'App.ux.RenderPanel',
    id: 'panelCancelReturn',
    pageTitle: 'Cancel Transaksi',
    uses: ['App.ux.GridPanel'],
    initComponent : function()
    {
        var me = this;

        Ext.define('CancelTransaksiModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id', type: 'string'},
                {name: 'inv_code', type: 'string'},
                {name: 'inv_date', type: 'date'},
                {name: 'canceled_date', type: 'date'},
                {name: 'canceled_by', type: 'string'},
                {name: 'status', type: 'string'},
                {name: 'reason', type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'inv_type', type: 'string'},
                {name: 'nominal', type: 'string'},
                {name: 'posted_date',type: 'date'},
                {name: 'cf_code', type: 'string'},
                {name: 'inv_cancel', type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: CancelReturn.getCancelReturn,
                    create: CancelReturn.addCancelReturn,
                    update: CancelReturn.updateCancelReturn,
                    destroy: CancelReturn.deleteCancelReturn
                },
                reader :
                {
                    root : 'rows',
                    totalProperty : 'totals'
                }
            }

        });
        me.CancelTransaksiStore = Ext.create('Ext.data.Store', {
            storeId : 'CTStore',
            model : 'CancelTransaksiModel',
            remoteSort : false,
            pageSize: 20,
            autoLoad: false
        });

        me.CTGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('CTStore'),
            border:false,
            frame:false,
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            listeners: {
                scope: me,
                select: me.onGridClick
            },
            plugins:[
                Ext.create('App.ux.grid.RowFormEditing', {
                    autoCancel:false,
                    errorSummary:false,
                    clicksToEdit:1,
                    formItems:[
                        {
                            xtype:'container',
                            layout:'hbox',
                            flex:1,
                            items:[
                                {
                                    xtype:'container',
                                    flex:1,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tgl Input',
                                            format : 'd-m-Y',
                                            itemId:'tgl_input_ct',
                                            maxValue : new Date(),
                                            name:'inv_date',
                                            width:200
                                        },
                                        {
                                            xtype: "radiogroup",
                                            fieldLabel: "Modul AP",
                                            width:800,
                                            defaults: {xtype: "radio", name:'inv_type', allowBlank: false
                                            },
                                            items: [
                                                {
                                                    boxLabel: "AP Invoice",
                                                    WIDTH:250,
                                                    inputValue:'1',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtAPCancelPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                            Ext.ComponentQuery.query('#cf_code_ct')[0].remove(0);
                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "AP Bayar",
                                                    WIDTH:250,
                                                    inputValue:'2',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#cancel_tmp')[0].setValue('N');
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtAPPaymentCancelPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                            Ext.ComponentQuery.query('#cf_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#cf_code_ct')[0].add({xtype:'xtCF_IPopup',  name:'cf_code', fieldLabel:'Kode Cash Flow', allowBlank:false, value: this.getValue()});

                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "AP UM",
                                                    inputValue:'3',
                                                    WIDTH:250,
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#cancel_tmp')[0].setValue('U');
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtAPPaymentCancelPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                            Ext.ComponentQuery.query('#cf_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#cf_code_ct')[0].add({xtype:'xtCF_IPopup',  name:'cf_code', fieldLabel:'Kode Cash Flow', allowBlank:false, value: this.getValue()});

                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "AP Alokasi",
                                                    inputValue:'4',
                                                    WIDTH:250,
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#cancel_tmp')[0].setValue('A');
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtAPPaymentCancelPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                            Ext.ComponentQuery.query('#cf_code_ct')[0].remove(0);
                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "AP Deduction",
                                                    inputValue:'11',
                                                    WITDH:250,
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#cancel_tmp')[0].setValue('P');
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtAPPaymentCancelPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                            Ext.ComponentQuery.query('#cf_code_ct')[0].remove(0);
                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "GRN",
                                                    inputValue:'21',
                                                    WIDTH:250,
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtGRPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                            Ext.ComponentQuery.query('#cf_code_ct')[0].remove(0);
                                                        }
                                                    }
                                                }

                                            ]
                                        },
                                        {
                                            xtype: "radiogroup",
                                            fieldLabel: "Modul AR ",
                                            width:800,
                                            defaults: {xtype: "radio", name:'inv_type'
                                            },
                                            items: [
                                                {
                                                    boxLabel: "AR Invoice",
                                                    inputValue:'7',
                                                    WIDTH:250,
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtARCancelPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                            Ext.ComponentQuery.query('#cf_code_ct')[0].remove(0);
                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "AR Bayar",
                                                    inputValue:'8',
                                                    WIDTH:250,
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#cancel_tmp')[0].setValue('N');
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtARPaymentCancelPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                            Ext.ComponentQuery.query('#cf_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#cf_code_ct')[0].add({xtype:'xtCF_OPopup',  name:'cf_code', fieldLabel:'Kode Cash Flow',  allowBlank:false, value: this.getValue()});

                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "AR UM",
                                                    inputValue:'9',
                                                    WIDTH:250,
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#cancel_tmp')[0].setValue('U');
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtARPaymentCancelPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                            Ext.ComponentQuery.query('#cf_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#cf_code_ct')[0].add({xtype:'xtCF_OPopup',  name:'cf_code', fieldLabel:'Kode Cash Flow',  allowBlank:false, value: this.getValue()});

                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "AR Alokasi",
                                                    inputValue:'10',
                                                    WIDTH:250,
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#cancel_tmp')[0].setValue('A');
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtARPaymentCancelPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                            Ext.ComponentQuery.query('#cf_code_ct')[0].remove(0);
                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "AR Deduction",
                                                    inputValue:'14',
                                                    WIDTH:250,
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#cancel_tmp')[0].setValue('P');
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtARPaymentCancelPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                            Ext.ComponentQuery.query('#cf_code_ct')[0].remove(0);
                                                        }
                                                    }
                                                }/*,
                                                 {
                                                 boxLabel: "DO",
                                                 inputValue:'12',
                                                 handler: function(field, value) {
                                                 if (value) {
                                                 Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                 Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtDOPopup', name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                 Ext.ComponentQuery.query('#cf_code_ct')[0].remove(0);
                                                 }
                                                 }
                                                 }*/
                                            ]
                                        },
                                        {
                                            xtype: "radiogroup",
                                            fieldLabel: "Modul Lain2 ",
                                            width:800,
                                            defaults: {xtype: "radio", name:'inv_type'
                                            },
                                            items: [
                                                {
                                                    boxLabel: "AP Reclass",
                                                    inputValue:'5',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtAPRCPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                            Ext.ComponentQuery.query('#cf_code_ct')[0].remove(0);
                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "AP Manufacture",
                                                    inputValue:'6',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtAPMnfPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                            Ext.ComponentQuery.query('#cf_code_ct')[0].remove(0);
                                                        }
                                                    }
                                                },{
                                                    boxLabel: "Stok In",
                                                    inputValue:'19',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtStock_Cancel',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                            Ext.ComponentQuery.query('#cf_code_ct')[0].remove(0);
                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "Penyusutan Aset",
                                                    inputValue:'20',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'textfield',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                            Ext.ComponentQuery.query('#cf_code_ct')[0].remove(0);
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            itemId:'inv_code_ct',
                                            width:300
                                        },
                                        {
                                            itemId:'cf_code_ct',
                                            width:260
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Keterangan',
                                            name:'reason',
                                            width:385
                                        },
                                        {
                                            width: 150,
                                            xtype: 'mitos.checkbox',
                                            fieldLabel: 'Posting',
                                            name: 'status',
                                            handler: function(field, value) {
                                                if (value == true) {
                                                    Ext.ComponentQuery.query('#posting_ct')[0].setDisabled(false);
                                                    Ext.ComponentQuery.query('#posting_ct')[0].setValue(new Date());
                                                }else{
                                                    Ext.ComponentQuery.query('#posting_ct')[0].setDisabled(true);
                                                }

                                            }
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tgl Posting',
                                            format : 'd-m-Y',
                                            value : new Date(),
                                            maxValue : new Date(),
                                            name:'canceled_date',
                                            itemId:'posting_ct',
                                            disabled:true,
                                            width:200
                                        },
                                        {
                                            xtype : 'textfield',
                                            hidden:true,
                                            itemId:'cancel_tmp',
                                            width:385
                                        }


                                    ]
                                }
                            ]
                        }
                    ]
                })
            ],
            columns:[
                {text: 'Dokumen Cancel',sortable: true,dataIndex: 'inv_cancel',width: 130},
                {text: 'Kode Dokumen',sortable: true,dataIndex: 'inv_code',width: 130},
                {width: 80,text: 'Tgl Input',sortable: true,dataIndex: 'inv_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {flex: 1,text: 'Keterangan',sortable: true,dataIndex: 'reason'},
                {text: 'Menu',sortable: true,dataIndex: 'inv_type'},
                {width: 150,text: 'Nominal',sortable: true,dataIndex: 'nominal', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 80,text: 'Tgl Posting',sortable: true,dataIndex: 'canceled_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'User Input',sortable: true,dataIndex: 'userinput',width: 100},
                {width: 80,text: 'LastUpdate',sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'CancelTransaksiModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'delete',
                    scope:me,
                    handler:me.onDeleteRec
                },
                {
                    xtype: 'pagingtoolbar',
                    store: me.CancelTransaksiStore,
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
                    itemId:'kolom_data25',
                    mode:'local',
                    store:[
                        ['inv_code','No Dokumen'],
                        ['inv_cancel','Dok Cancel'],
                        ['reason','Keterangan'],
                        ['inv_type' ,'Menu'],
                        ['userinput','User Input']
                    ]
                },
                {
                    xtype : 'textfield',
                    emptyText: ('enter search key'),
                    width:250,
                    listeners : {
                        scope : me,
                        specialkey : me.onEnter
                    }
                }

            ]
        });

        me.pageBody = [me.CTGrid];
        me.callParent(arguments);

    }, // end of initComponent
    onGridClick:function(grid,selected){
        var me = this;
        var  deletebtn = me.query('button[action="delete"]')[0];
        if(selected.data.status==1 || selected.data.status==2){
            deletebtn.setDisabled(true);
        }else{
            deletebtn.setDisabled(false);
        }
    },
    onEnter : function(field, e)
    {
        var me= this;
        var kolom1 = Ext.ComponentQuery.query('#kolom_data25')[0].getValue();
        me.CancelTransaksiStore.load({params:{search1: kolom1, search2: field.value}});
    },
    onNewRec:function(btn){
        var me = this;
        var grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
        newModel = Ext.ModelManager.create({
        }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);
        Ext.ComponentQuery.query('#tgl_input_ct')[0].setValue(new Date());
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
        this.CancelTransaksiStore.load();
        callback(true);
    }
});
//ens LogPage class