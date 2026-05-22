Ext.define('App.view.popup.Kendaraan',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtkendaraan',

        trigger1Cls: Ext.baseCSSPrefix + 'form-search-trigger',

        paramName : 'query',
        hasSearch : false,

        initComponent : function()
        {
            var me = this;
            me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'co_id', type:'string'},
                    {name:'kendaraan_id', type:'string'},
                    {name:'nopol', type:'string'},
                    {name:'nama_sopir', type:'string'},
                    {name:'warna', type:'string'},
                    {name:'kapasitas', type:'float'},
                    {name:'merk', type:'string'},
                    {name:'remarks', type:'string'},
                    {name:'unit_id', type:'string'},
                    {name:'ol_id', type:'string'},
                    {name:'bahan_bakar', type:'string'},
                    {name:'active', type:'bool'},
                    {name:'userinput', type:'string'},
                    {name:'useredit', type:'string'},
                    {name:'timeinput', type:'date'},
                    {name:'timeedit', type:'date'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: Kendaraan.popup
                    },
                    reader :{
                        root: 'rows',
                        totalProperty: 'totals'
                    }
                }
            });
            me.store = Ext.create('Ext.data.Store',{model: me.model ,remoteSort: true});
            // create the Grid
            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                height: 200,
                width: 610,
                title: 'Kendaraan',
                listeners: {
                    scope: me,
                    select: me.gridclick,
                    itemdblclick: me.doucbleclick
                },
                columns: [
                    {text: _('id'),width: 80,sortable: true,dataIndex: 'kendaraan_id'},
                    {text: _('driver'),flex: 1,sortable: true,dataIndex: 'nama_sopir'},
                    {text: 'Nopol',width: 80,sortable: true,dataIndex: 'nopol'},
                    {text: 'Merk',width: 80,sortable: true,dataIndex: 'merk'},
                    {text: 'Warna',width: 80,sortable: true,dataIndex: 'warna'},
                    {text: _('capacity'),width: 100,sortable: true,dataIndex: 'kapasitas', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                    {text: _('unit'),width: 80,sortable: true,dataIndex: 'unit_id'},
                ],
                tbar: [
                    {
                        xtype:'combo',
                        editable: false,
                        width:100,
                        mode:'local',
                        store: [['kendaraan_id',_('id')],['nama_sopir',_('driver')],['nopol','Nopol'],['merk','Merk'],['kapasitas',_('capacity')]],
                        listeners:{change:function(){me.field_name=this.getValue();}}
                    },
                    {
                        xtype:'textfield',
                        emptyText: 'enter search key',
                        width:150,
                        listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                            me.store.proxy.extraParams = {field_name:me.field_name, field_search:field.value, cflow_type:me.extraParams};
                            me.store.loadPage(1);}}
                        }
                    },
                    {
                        xtype: 'pagingtoolbar',
                        pageSize: 10,
                        store: me.store,
                        displayMsg: 'Diplay {0} - {1} Of {2}',
                        emptyMsg: 'No Record Found',
                        displayInfo: true
                    }
                ]
            });

            me.searchwin = Ext.create('App.ux.window.Window', {
                layout: 'fit',//border : false,
                items: [ me.grid ],
                buttons: [
                    {
                        text: 'Pilih',
                        cls: 'winSave',
                        handler : function(btn){
                            btn.up('window').close();
                        }
                    },
                    '-',
                    {
                        text: i18n('cancel'),
                        scope: me,
                        handler: me.btnCancelPressed
                    }
                ]
            });

            me.callParent(arguments);
            me.on('specialkey', function(f, e){
                if(e.getKey() == e.ENTER){
                    me.onTrigger1Click();
                }
            }, me);
        },
        onTrigger1Click : function(){
            var me = this;
            me.searchwin.show();
            //me.searchwin.showAt([me.getPosition()[0],me.getPosition()[1]+me.getHeight()]);
           //me.store.proxy.extraParams={cflow_type:me.extraParams};
            me.store.load();
            me.doComponentLayout();
        },
        gridclick: function(grid, selected){
            this.setValue(selected.data.kendaraan_id);
            var form = this.up('container'), container = form.up('container'),
            nopol = Ext.ComponentQuery.query('[name=nopol]', container)[0],
            nama_sopir = Ext.ComponentQuery.query('[name=nama_sopir]', container)[0];
            if(nopol){nopol.setValue(selected.data.nopol);}
            if(nama_sopir){nama_sopir.setValue(selected.data.nama_sopir);}
        },
        doucbleclick: function(grid, selected){
            var me = this;
            me.gridclick(grid, selected);
            me.searchwin.close();
        },

        btnCancelPressed : function(btn) {
            var me = this;
            this.reset();
            me.searchwin.close();
        }
    }
)