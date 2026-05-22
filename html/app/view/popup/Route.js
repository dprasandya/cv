Ext.define('App.view.popup.Route',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtroute',

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
                    {name:'route_id', type:'string'},
                    {name:'route_name', type:'string'},
                    {name:'from_city', type:'string'},
                    {name:'to_city', type:'string'},
                    {name:'remarks', type:'string'},
                    {name:'status', type:'bool'},
                    {name:'useredit', type:'string'},
                    {name:'timeedit', type:'date'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: Route.select
                    },
                    extraParams:{
                        field_name: 'status',
                        field_search: '1'
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
                title: _('salesman'),
                listeners: {
                    scope: me,
                    select: me.gridclick,
                    itemdblclick: me.doucbleclick
                },
                columns: [
                    {text: _('id'),width: 80,sortable: true,dataIndex: 'route_id'},
                    {text: _('name'),flex: 1,sortable: true,dataIndex: 'route_name'},
                    {text: _('from')+' '+_('city'),width: 100,sortable: true,dataIndex: 'from_city'},
                    {text: _('to')+' '+_('city'),width: 100,sortable: true,dataIndex: 'to_city'},
                    {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                    {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                    {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'status'}
                ],
                tbar: [
                    {
                        xtype:'combo',
                        editable: false,
                        width:100,
                        mode:'local',
                        store: [['route_id',_('id')],['route_name',_('name')],['from_city',_('from')+' '+_('city')],['to_city',_('to')+' '+_('city')],['remarks',_('remarks')]],
                        listeners:{change:function(){me.field_name=this.getValue();}}
                    },
                    {
                        xtype:'textfield',
                        emptyText: 'enter search key',
                        width:150,
                        listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store.load({params:{field_name:me.field_name, field_search:field.value, start:0, limit:15}})}}}
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
            me.store.load();
            me.doComponentLayout();
        },
        gridclick: function(grid, selected){
            this.setValue(selected.data.route_id);
            var form = this.up('container'),
                route_name = Ext.ComponentQuery.query('[name=route_name]', form)[0];
            if(route_name){route_name.setValue(selected.data.route_name);}
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