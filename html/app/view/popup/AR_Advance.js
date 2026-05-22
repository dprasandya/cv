Ext.define('App.view.popup.AR_Advance',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtar_advance',

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
                    {name:'doc_id', type:'string'},
                    {name:'doc_type', type:'string'},
                    {name:'doc_date', type:'date'},
                    {name:'cash_id', type:'string'},
                    {name:'cash_name', type:'string'},
                    {name:'cflow_id', type:'string'},
                    {name:'cflow_name', type:'string'},
                    {name:'cust_id', type:'string'},
                    {name:'cust_name', type:'string'},
                    {name:'coa_advance', type:'string'},
                    {name:'outstanding_advance', type:'float'},
                    {name:'nominal', type:'float'},
                    {name:'reference_id', type:'string'},
                    {name:'unit_building_id', type:'string'},
                    {name:'unit_building_name', type:'string'},
                    {name:'tax_id', type:'string'},
                    {name:'remarks', type:'string'},
                    {name:'status', type:'bool'},
                    {name:'useredit', type:'string'},
                    {name:'timeedit', type:'date'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: AR_Advance.popup
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
                title: _('advance'),
                listeners: {
                    scope: me,
                    select: me.gridclick,
                    itemdblclick: me.doucbleclick
                },
                columns: [
                    {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                    {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                    {text: _('customer'),width: 150,sortable: true,dataIndex: 'cust_name'},
                    {text: _('advance'),width: 100,sortable: true,dataIndex: 'outstanding_advance',  align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                    {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'}
                ],
                tbar: [
                    {
                        xtype:'combo',
                        editable: false,
                        width:100,
                        mode:'local',
                        store: [['doc_id',_('document')],['cust_id',_('id')],['cust_name',_('customer')],['tax_id',_('tax')],['outstanding_advance',_('advance')],['remarks',_('remarks')]],
                        listeners:{change:function(){me.field_name=this.getValue();}}
                    },
                    {
                        xtype:'textfield',
                        emptyText: 'enter search key',
                        width:150,
                        listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                            if(me.cust_id){me.store.proxy.extraParams = {cust_id:me.cust_id.getValue(), field_name:me.field_name, field_search:field.value};}
                            else{me.store.proxy.extraParams = {outstanding_advance:me.extraParams, field_name:me.field_name, field_search:field.value};}
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
            var me = this; var form = this.up('container'), container = form.up('panel');//, cust_id = form.up('panel').items.items[0].items.items[0].items.items[1].items.items[0];
                me.cust_id = Ext.ComponentQuery.query('[name=cust_id]', container)[0];
            me.searchwin.show();
            //me.searchwin.showAt([me.getPosition()[0],me.getPosition()[1]+me.getHeight()]);
            if(me.cust_id.getValue()){me.store.proxy.extraParams = {cust_id: me.cust_id.getValue(), outstanding_advance:me.extraParams}}
            else{me.store.proxy.extraParams = {outstanding_advance:me.extraParams}}
            me.store.load();
            me.doComponentLayout();
        },
        gridclick: function(grid, selected){
            this.setValue(selected.data.doc_id);
            var form = this.up('container'), container = form.up('container')
            var outstanding_advance = Ext.ComponentQuery.query('[name=outstanding_advance]', container)[0],
                cust_id = Ext.ComponentQuery.query('[name=cust_id]', container)[0],
                cust_name = Ext.ComponentQuery.query('[name=cust_name]', container)[0];
            if(outstanding_advance){outstanding_advance.setValue(selected.data.outstanding_advance);}
            if(cust_id){cust_id.setValue(selected.data.cust_id);}
            if(cust_name){cust_name.setValue(selected.data.cust_name);}
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