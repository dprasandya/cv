Ext.define('App.view.hris.popup.Bpjs',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtbpjs',

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
                    {name:'bpjs_type', type:'string'},
                    {name:'bpjs_id', type:'string'},
                    {name:'bpjs_name', type:'string'},
                    {name:'sc_name_company', type:'string'},
                    {name:'rate_company', type:'float'},
                    {name:'nominal_company', type:'float'},
                    {name:'sc_name_employee', type:'string'},
                    {name:'rate_employee', type:'float'},
                    {name:'nominal_employee', type:'float'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: HRIS_Bpjs.popup
                    },
                    extraParams:{
                        bpjs_type: me.extraParams
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
                title: _('bpjs'),
                listeners: {
                    scope: me,
                    select: me.gridclick,
                    itemdblclick: me.doucbleclick
                },
                columns: [
                    {text: _('id'),width: 80,sortable: true,dataIndex: 'bpjs_id'},
                    {text: _('name'),flex: 1,sortable: true,dataIndex: 'bpjs_name'},
                    {text: _('company'),width: 100,sortable: true,dataIndex: 'sc_name_company'},
                    {text: _('amount'),width: 80,sortable: true,dataIndex: 'nominal_company', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                    {text: _('employee'),width: 100,sortable: true,dataIndex: 'sc_name_employee'},
                    {text: _('amount'),width: 80,sortable: true,dataIndex: 'nominal_employee', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')}
                ],
                tbar: [
                    {
                        xtype:'combo',
                        editable: false,
                        width:100,
                        mode:'local',
                        store: [['bpjs_id',_('id')],['bpjs_name',_('name')]],
                        listeners:{change:function(){me.field_name=this.getValue();}}
                    },
                    {
                        xtype:'textfield',
                        emptyText: 'enter search key',
                        width:150,
                        listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                            me.store.proxy.extraParams ={field_name:me.field_name, field_search:field.value, bpjs_type:me.extraParams};
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
            me.store.load({params:{bpjs_type:me.extraParams}});
            me.doComponentLayout();
        },
        gridclick: function(grid, selected){
            var form = this.up('container'), container = form.up('container'),  bpjs_name = Ext.ComponentQuery.query('[name=bpjs_name]', form)[0],
                sc_name_company = container.items.items[1].items.items[0], //Ext.ComponentQuery.query('[name=sc_name_company]', container)[0],
                nominal_company = container.items.items[1].items.items[1], //Ext.ComponentQuery.query('[name=nominal_company]', container)[0],
                rate_company = container.items.items[1].items.items[2],
                sc_name_employee = container.items.items[2].items.items[0], //Ext.ComponentQuery.query('[name=sc_name_employee]', container)[0],
                nominal_employee = container.items.items[2].items.items[1],
                rate_employee = container.items.items[2].items.items[2];//Ext.ComponentQuery.query('[name=nominal_employee]', container)[0];
            if(bpjs_name){bpjs_name.setValue(selected.data.bpjs_name);}
            if(sc_name_company){sc_name_company.setValue(selected.data.sc_name_company);}
            if(nominal_company){nominal_company.setValue(selected.data.nominal_company);}
            if(rate_company){rate_company.setValue(selected.data.rate_company);}
            if(sc_name_employee){sc_name_employee.setValue(selected.data.sc_name_employee);}
            if(nominal_employee){nominal_employee.setValue(selected.data.nominal_employee);}
            if(rate_employee){rate_employee.setValue(selected.data.rate_employee);}
            this.setValue(selected.data.bpjs_id);
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