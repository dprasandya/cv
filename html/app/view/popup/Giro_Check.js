Ext.define('App.view.popup.Giro_Check',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtgiro_check',

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
                    {name:'reference_id', type:'string'},
                    {name:'reference_type', type:'string'},
                    {name:'reference_date', type:'date'},
                    {name:'cash_id', type:'string'},
                    {name:'reference_value', type:'float'},
                    {name:'outstanding_value', type:'float'},
                    {name:'remarks', type:'string'},
                    {name:'status', type:'bool'},
                    {name:'useredit', type:'string'},
                    {name:'timeedit', type:'date'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: Giro_Check.popup
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
                title: _('giro_check'),
                listeners: {
                    scope: me,
                    select: me.gridclick,
                    itemdblclick: me.doucbleclick
                },
                columns: [
                    {text: _('id'),width: 80,sortable: true,dataIndex: 'reference_id'},
                    {text: _('cashbank'),width: 80,sortable: true,dataIndex: 'cash_id'},
                    {text: _('type'),width: 80,sortable: true,dataIndex: 'reference_type'},
                    {text: _('outstanding'),width: 100,sortable: true,dataIndex: 'outstanding_value', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
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
                        store: [['reference_id',_('id')],['cash_id',_('cashbank')],['reference_type',_('type')],['outstanding_value',_('outstanding')],['remarks',_('remarks')]],
                        listeners:{change:function(){me.field_name=this.getValue();}}
                    },
                    {
                        xtype:'textfield',
                        emptyText: 'enter search key',
                        width:150,
                        listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                            var me = this; var form = this.up('container'), container = form.up('panel'),
                                cash_id =  Ext.ComponentQuery.query('[name=cash_id]', container)[0] ;
                            if(cash_id){me.store.proxy.extraParams={cash_id:cash_id.getValue(), outstanding_value: me.extraParams, field_name:me.field_name, field_search:field.value}}
                            else{me.store.proxy.extraParams={outstanding_value: me.extraParams, field_name:me.field_name, field_search:field.value}}
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
            var me = this; var form = this.up('container'), container = form.up('panel'),
                cash_id =  Ext.ComponentQuery.query('[name=cash_id]', container)[0] ;
            me.searchwin.show();
            //me.searchwin.showAt([me.getPosition()[0],me.getPosition()[1]+me.getHeight()]);
            if(cash_id){me.store.proxy.extraParams={cash_id:cash_id.getValue(), outstanding_value: me.extraParams}}
            else{me.store.proxy.extraParams={outstanding_value: me.extraParams}}
            me.store.load();
            me.doComponentLayout();
        },
        gridclick: function(grid, selected){
            this.setValue(selected.data.reference_id);
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