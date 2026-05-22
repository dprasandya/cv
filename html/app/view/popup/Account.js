Ext.define('App.view.popup.Account',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtaccount',

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
                    {name:'coa_id', type:'string'},
                    {name:'coa_name', type:'string'},
                    {name:'coa_type', type:'string'},
                    {name:'station_type', type:'string'},
                    {name:'station_group', type:'string'},
                    {name:'level', type:'integer'},
                    {name:'remarks', type:'string'},
                    {name:'status', type:'bool'},
                    {name:'useredit', type:'string'},
                    {name:'timeedit', type:'date'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: Account.popup
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
                title: _('my_account'),
                listeners: {
                    scope: me,
                    select: me.gridclick,
                    itemdblclick: me.doucbleclick
                },
                columns: [
                    {text: _('id'),width: 80,sortable: true,dataIndex: 'coa_id'},
                    {text: _('name'),flex: 1,sortable: true,dataIndex: 'coa_name'},
                    {text: _('type'),width: 100,sortable: true,dataIndex: 'coa_type'},
                    {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                    {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
                ],
                tbar: [
                    {
                        xtype:'combo',
                        editable: false,
                        width:100,
                        mode:'local',
                        store: [['coa_id',_('id')],['coa_name',_('name')],['coa_type',_('type')],['remarks',_('remarks')]],
                        listeners:{change:function(){me.field_name=this.getValue();}}
                    },
                    {
                        xtype:'textfield',
                        emptyText: 'enter search key',
                        width:150,
                        listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                            if(me.extraParams){
                                me.store.proxy.extraParams = { coa_parent:me.extraParams.coa_parent, coa_type:me.extraParams.coa_type,level:me.extraParams.level, station_type:me.extraParams.station_type, station_group:me.extraParams.station_group,  field_name:me.field_name, field_search:field.value};
                            }else{
                                me.store.proxy.extraParams = { field_name:me.field_name, field_search:field.value};
                            }
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
            if(me.extraParams){
                me.store.proxy.extraParams = {coa_parent:me.extraParams.coa_parent,level:me.extraParams.level, coa_type:me.extraParams.coa_type, station_type:me.extraParams.station_type, station_group:me.extraParams.station_group};
            }
            me.store.load();
            me.doComponentLayout();
        },
        gridclick: function(grid, selected){
            var form = this.up('container');
            if(form.items.items[1]){
                form.items.items[1].setValue(selected.data.coa_name);
            }
            this.setValue(selected.data.coa_id);
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