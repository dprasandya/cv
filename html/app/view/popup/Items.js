Ext.define('App.view.popup.Items',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtitems',

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
                    {name:'item_id', type:'string'},
                    {name:'item_type', type:'string'},
                    {name:'item_name', type:'string'},
                    {name:'unit_id', type:'string'},
                    {name:'coa_id', type:'string'},
                    {name:'remarks', type:'string'},
                    {name:'status', type:'bool'},
                    {name:'useredit', type:'string'},
                    {name:'timeedit', type:'date'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: Items.popup
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
                title: _('item'),
                listeners: {
                    scope: me,
                    select: me.gridclick,
                    itemdblclick: me.doucbleclick
                },
                columns: [
                    {text: _('id'),width: 80,sortable: true,dataIndex: 'item_id'},
                    {text: _('name'),flex: 1,sortable: true,dataIndex: 'item_name'},
                    {text: _('unit'),width: 80,sortable: true,dataIndex: 'unit_id'},
                    {text: _('type'),width: 80,sortable: true,dataIndex: 'item_type'},
                    {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
                ],
                tbar: [
                    {
                        xtype:'combo',
                        editable: false,
                        width:100,
                        mode:'local',
                        store: [['item_id',_('id')],['item_name',_('name')],['unit_id',_('unit')],['item_type',_('type')]],
                        listeners:{change:function(){me.field_name=this.getValue();}}
                    },
                    {
                        xtype:'textfield',
                        emptyText: 'enter search key',
                        width:150,
                        listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                            me.store.proxy.extraParams ={field_name:me.field_name, field_search:field.value, item_type:me.extraParams };
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
            me.store.proxy.extraParams={item_type:me.extraParams};
            me.store.load();
            me.doComponentLayout();
        },
        gridclick: function(grid, selected){
            var form = this.up('container'), container = form.up('container');
            var item_name = Ext.ComponentQuery.query('[name=item_name]', form)[0],
                unit_id = Ext.ComponentQuery.query('[name=unit_id]', form)[0],
                costcode_id = Ext.ComponentQuery.query('[name=costcode_id]', container)[0],
                costcode_name = Ext.ComponentQuery.query('[name=costcode_name]', container)[0],
                item_name_new = Ext.ComponentQuery.query('[name=item_name_new]', form)[0],
                unit_id_new = Ext.ComponentQuery.query('[name=unit_id_new]', form)[0];
            if(item_name){item_name.setValue(selected.data.item_name);}
            if(unit_id){unit_id.setValue(selected.data.unit_id);}
            if(costcode_id){costcode_id.setValue(selected.data.costcode_id);}
            if(costcode_name){costcode_name.setValue(selected.data.costcode_name);}
            if(item_name_new){item_name_new.setValue(selected.data.item_name);}
            if(unit_id_new){unit_id_new.setValue(selected.data.unit_id);}
            this.setValue(selected.data.item_id);
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