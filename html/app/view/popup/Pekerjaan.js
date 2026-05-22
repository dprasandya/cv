Ext.define('App.view.popup.Pekerjaan',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtpekerjaan',

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
                    {name:'pekerjaan_id', type:'string'},
                    {name:'pekerjaan_nama', type:'string'},
                    {name:'remarks', type:'string'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: Pekerjaan.popup
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
                    {text: _('id'),width: 80,sortable: true,dataIndex: 'pekerjaan_id'},
                    {text: _('name'),flex: 1,sortable: true,dataIndex: 'pekerjaan_nama'},
                    {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'}
                ],
                tbar: [
                    {
                        xtype:'combo',
                        editable: false,
                        width:100,
                        mode:'local',
                        store: [['pekerjaan_id',_('id')],['pekerjaan_nama',_('name')],['remarks',_('remarks')]],
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
            me.store.load();
            me.doComponentLayout();
        },
        gridclick: function(grid, selected){
            this.setValue(selected.data.kendaraan_id);
            var form = this.up('container'), container = form.up('container'),
            pekerjaan_id = Ext.ComponentQuery.query('[name=pekerjaan_id]', container)[0],
            pekerjaan_nama = Ext.ComponentQuery.query('[name=pekerjaan_nama]', container)[0];
            if(pekerjaan_id){pekerjaan_id.setValue(selected.data.pekerjaan_id);}
            if(pekerjaan_nama){pekerjaan_nama.setValue(selected.data.pekerjaan_nama);}
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