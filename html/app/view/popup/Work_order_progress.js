Ext.define('App.view.popup.Work_order_progress',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtwork_order_progress',

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
                    {name:'doc_date', type:'date'},
                    {name:'for_doc_id', type:'string'},
                    {name:'project_id', type:'string'},
                    {name:'project_name', type:'string'},
                    {name:'project_type', type:'string'},
                    {name:'costcode_id', type:'string'},
                    {name:'costcode_name', type:'string'},
                    {name:'vend_id', type:'string'},
                    {name:'vend_name', type:'string'},
                    {name:'contract_no', type:'string'},
                    {name:'tax_id', type:'string'},
                    {name:'tax_name', type:'string'},
                    {name:'outstanding_progress', type:'float'},
                    {name:'outstanding_retention', type:'float'},
                    {name:'remarks', type:'string'},
                    {name:'status', type:'bool'},
                    {name:'useredit', type:'string'},
                    {name:'timeedit', type:'date'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: Work_order_progress.popup
                    },
                    reader :{
                        root: 'rows',
                        totalProperty: 'totals'
                    }
                }
            });
            me.store = Ext.create('Ext.data.Store',{model: me.model ,remoteSort: true, pageSize : 10, autoLoad: false});
            // create the Grid
            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                height: 200,
                width: 610,
                title: _('work_order_progress'),
                listeners: {
                    scope: me,
                    select: me.gridclick,
                    itemdblclick: me.doucbleclick
                },
                columns: [
                    {text: _('project'),width: 80,sortable: true,dataIndex: 'project_name'},
                    {text: _('document'),width: 130,sortable: true,dataIndex: 'doc_id'},
                    {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                    {text: _('work_order'),width: 130,sortable: true,dataIndex: 'for_doc_id'},
                    {text: _('supplier'),width: 100,sortable: true,dataIndex: 'vend_name'},
                    {text: _('contract_no'),width: 100,sortable: true,dataIndex: 'contract_no'},
                    {text: _('outstanding') +' Progress', hidden : me.extraParams=='outstanding_progress' ? false: true,  width: 100,sortable: true,dataIndex: 'outstanding_progress', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                    {text: _('outstanding') +' Retention', hidden : me.extraParams=='outstanding_retention' ? false: true, width: 100,sortable: true,dataIndex: 'outstanding_retention', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                    {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'}
                ],
                tbar: [
                    {
                        xtype:'combo',
                        editable: false,
                        width:100,
                        mode:'local',
                        store: [['project_name',_('project')],['doc_id',_('document')],['for_doc_id',_('work_order')],['vend_name',_('supplier')],['contract_no',_('contract_no')],['outstanding_progress',_('outstanding')+' Progress'],['outstanding_retention',_('outstanding')+' Retention'],['remarks',_('remarks')]],
                        listeners:{change:function(){me.field_name=this.getValue();}}
                    },
                    {
                        xtype:'textfield',
                        emptyText: 'enter search key',
                        width:150,
                        listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                            me.store.proxy.extraParams = {outstanding:me.extraParams, field_name:me.field_name, field_search:field.value};
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
            me.store.proxy.extraParams ={outstanding:me.extraParams};
            me.store.load();
            me.doComponentLayout();
        },
        gridclick: function(grid, selected){
            var form = this.up('container'), container = form.up('container'),  panel = form.up('panel'),
                project_id = Ext.ComponentQuery.query('[name=project_id]', panel)[0],
                project_type = Ext.ComponentQuery.query('[name=project_type]', panel)[0],
                costcode_id = Ext.ComponentQuery.query('[name=costcode_id]', panel)[0],
                costcode_name = Ext.ComponentQuery.query('[name=costcode_name]', panel)[0],
                vend_id = Ext.ComponentQuery.query('[name=vend_id]', panel)[0],
                vend_name = Ext.ComponentQuery.query('[name=vend_name]', panel)[0],
                tax_id = Ext.ComponentQuery.query('[name=tax_id]', panel)[0],
                tax_name = Ext.ComponentQuery.query('[name=tax_name]', panel)[0];
            if(project_id){project_id.setValue(selected.data.project_id);}
            if(project_type){project_type.setValue(selected.data.project_type);}
            if(costcode_id){costcode_id.setValue(selected.data.costcode_id);}
            if(costcode_name){costcode_name.setValue(selected.data.costcode_name);}
            if(vend_id){vend_id.setValue(selected.data.vend_id);}
            if(vend_name){vend_name.setValue(selected.data.vend_name);}
            if(tax_id){tax_id.setValue(selected.data.tax_id);}
            if(tax_name){tax_name.setValue(selected.data.tax_name);}
            this.setValue(selected.data.doc_id);

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