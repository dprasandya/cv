Ext.define('App.view.popup.Afdeling',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtafdeling',

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
                    {name:'ol_id', type:'string'},
                    {name:'afdeling_id', type:'string'},
                    {name:'afdeling_name', type:'string'},
                    {name:'area', type:'float'},
                    {name:'blok', type:'string'},
                    {name:'growing_year', type:'integer'},
                    {name:'remarks', type:'string'},
                    {name:'qty_seedling', type:'float'},
                    {name:'unit_id', type:'string'},
                    {name:'status', type:'bool'},
                    {name:'useredit', type:'string'},
                    {name:'reclass_tm', type:'string'},
                    {name:'timeedit', type:'date'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: Afdeling.popup
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
                title: _('cashflow'),
                listeners: {
                    scope: me,
                    select: me.gridclick,
                    itemdblclick: me.doucbleclick
                },
                columns: [
                    {text: _('id'),width: 80,sortable: true,dataIndex: 'afdeling_id'},
                    {text: _('name'),flex: 1,sortable: true,dataIndex: 'afdeling_name'},
                    {text: 'Reclass TM',width: 80,sortable: true,dataIndex: 'reclass_tm'},
                    {text: 'Blok',width: 80,sortable: true,dataIndex: 'blok'},
                    {text: _('quantity'),width: 100,sortable: true,dataIndex: 'qty_seedling', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                    {text: _('unit'),width: 80,sortable: true,dataIndex: 'unit_id'},
                    {text: _('growing_year'),width: 80,sortable: true,dataIndex: 'growing_year', align:'right'}
                ],
                tbar: [
                    {
                        xtype:'combo',
                        editable: false,
                        width:100,
                        mode:'local',
                        store: [['afdeling_id',_('id')],['afdeling_name',_('name')],['blok','Blok'],['growing_year',_('growing_year')],['remarks',_('remarks')]],
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
            this.setValue(selected.data.afdeling_id);
            var form = this.up('container'), container = form.up('container'),
            afdeling_name  = Ext.ComponentQuery.query('[name=afdeling_name]', container)[0],
            ol_id = Ext.ComponentQuery.query('[name=ol_id]', container)[0];
            //if(form.items.items[1]){form.items.items[1].setValue(selected.data.afdeling_name);}
            if(afdeling_name){afdeling_name.setValue(selected.data.afdeling_name);}
            if(ol_id){ol_id.setValue(selected.data.ol_id);}
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