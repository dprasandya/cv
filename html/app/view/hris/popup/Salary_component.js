Ext.define('App.view.hris.popup.Salary_component',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtsalary_component',

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
                    {name:'sc_id', type:'string'},
                    {name:'sc_name', type:'string'},
                    {name:'sc_type', type:'string'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: HRIS_Pph21_Salary_component.popup
                    },
                    extraParams:{
                        sc_type: me.extraParams
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
                title: _('salary_component'),
                listeners: {
                    scope: me,
                    select: me.gridclick,
                    itemdblclick: me.doucbleclick
                },
                columns: [
                    {text: _('id'),width: 80,sortable: true,dataIndex: 'sc_type'},
                    {text: _('name'),flex: 1,sortable: true,dataIndex: 'sc_name'},
                    {text: _('type'),width: 100,sortable: true,dataIndex: 'sc_type'}
                ],
                tbar: [
                    {
                        xtype:'combo',
                        editable: false,
                        width:100,
                        mode:'local',
                        store: [['sc_id',_('id')],['sc_name',_('name')],['sc_type',_('type')]],
                        listeners:{change:function(){me.field_name=this.getValue();}}
                    },
                    {
                        xtype:'textfield',
                        emptyText: 'enter search key',
                        width:150,
                        listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                            me.store.proxy.extraParams ={field_name:me.field_name, field_search:field.value, sc_type:me.extraParams};
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
                border : false,
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
            me.searchwin.showAt([me.getPosition()[0],me.getPosition()[1]+me.getHeight()]);
            me.store.load({params:{sc_type:me.extraParams}});
            me.doComponentLayout();
        },
        gridclick: function(grid, selected){
            var form = this.up('container'), sc_type = Ext.ComponentQuery.query('[name=sc_type]', form)[0];
            if(form.items.items[1]){
                form.items.items[1].setValue(selected.data.sc_name);
            }
            if(sc_type){sc_type.setValue(selected.data.sc_type);}
            this.setValue(selected.data.sc_id);
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