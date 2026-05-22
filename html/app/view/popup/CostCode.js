Ext.define('App.view.popup.CostCode',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtcostcode',

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
                    {name:'costcode_id', type:'string'},
                    {name:'costcode_name', type:'string'},
                    {name:'project_id', type:'string'},
                    {name:'project_name', type:'string'},
                    {name:'nominal', type:'float'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: CostCode.popup
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
                title: _('costcode'),
                listeners: {
                    scope: me,
                    select: me.gridclick,
                    itemdblclick: me.doucbleclick
                },
                columns: [
                    {text: _('project'),width: 80,sortable: true,dataIndex: 'project_name', hidden:me.extraParams.project_id==''? true:false},
                    {text: _('id'),width: 100,sortable: true,dataIndex: 'costcode_id'},
                    {text: _('name'),flex: 1,sortable: true,dataIndex: 'costcode_name'},
                    {text: _('outstanding'),width: 100,sortable: true,dataIndex: 'nominal', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'),hidden:me.extraParams.project_id==''? true:false}
                ],
                tbar: [
                    {
                        xtype:'combo',
                        editable: false,
                        width:100,
                        mode:'local',
                        store: [['project_name',_('project')],['costcode_id',_('id')],['costcode_name',_('name')],['nominal',_('outstanding')]],
                        listeners:{change:function(){me.field_name=this.getValue();}}
                    },
                    {
                        xtype:'textfield',
                        emptyText: 'enter search key',
                        width:150,
                        listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                            me.store.proxy.extraParams = {project_id:me.extraParams.project_id, doc_type:me.extraParams.doc_type, nominal:(me.extraParams.doc_type==''? -1 :0), field_name:me.field_name, field_search:field.value};
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
            me.store.proxy.extraParams = { project_id:me.extraParams.project_id, doc_type:me.extraParams.doc_type, nominal:(me.extraParams.doc_type==''? -1 :0)};
            me.store.load();
            me.doComponentLayout();
        },
        gridclick: function(grid, selected){
            this.setValue(selected.data.costcode_id);
            var form = this.up('container'),
                costcode_name = Ext.ComponentQuery.query('[name=costcode_name]', form)[0];
            if(costcode_name){costcode_name.setValue(selected.data.costcode_name);}

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