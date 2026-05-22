Ext.define('App.view.popup.UnitBuildingCustomer',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtunitbuildingcustomer',

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
                    {name:'registration_id', type:'integer'},
                    {name:'for_doc_id', type:'string'},
                    {name:'cust_id', type:'string'},
                    {name:'cust_name', type:'string'},
                    {name:'unit_building_id', type:'string'},
                    {name:'unit_building_name', type:'string'},
                    {name:'building_id', type:'string'},
                    {name:'building_name', type:'string'},
                    {name:'facing_id', type:'string'},
                    {name:'facing_name', type:'string'},
                    {name:'cluster_id', type:'string'},
                    {name:'cluster_name', type:'string'},
                    {name:'project_id', type:'string'},
                    {name:'project_name', type:'string'},
                    {name:'floor_id', type:'string'},
                    {name:'floor_name', type:'string'},
                    {name:'area_m2', type:'float'},
                    {name:'price_m2', type:'float'},
                    {name:'total', type:'float'},
                    {name:'remarks', type:'string'},
                    {name:'order_status', type:'string'},
                    {name:'status', type:'bool'},
                    {name:'useredit', type:'string'},
                    {name:'timeedit', type:'date'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: UnitBuilding.popup_customer
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
                title: _('unit_building'),
                listeners: {
                    scope: me,
                    select: me.gridclick,
                    itemdblclick: me.doucbleclick
                },
                columns: [
                    {text: _('type'),width: 80,sortable: true,dataIndex: 'order_status'},
                    {text: _('project'),width: 80,sortable: true,dataIndex: 'project_name'},
                    {text: _('unit_building'),width: 80,sortable: true,dataIndex: 'unit_building_name'},
                    {text: _('customer'),flex: 1,sortable: true,dataIndex: 'cust_name'},
                    {text: _('cluster'),width: 0,sortable: true,dataIndex: 'cluster_name'},
                    {text: _('area')+' m2',width: 80,sortable: true,dataIndex: 'area_m2', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                    {text: _('price')+' m2',width: 80,sortable: true,dataIndex: 'area_m2', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                    {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'}
                ],
                tbar: [
                    {
                        xtype:'combo',
                        editable: false,
                        width:100,
                        mode:'local',
                        store: [['order_status',_('type')],['unit_building_name',_('unit_building')],['cust_name',_('customer')],['facing_name',_('facing')],['cluster_name',_('cluster')],['project_name',_('project')],['building_name',_('building_type')],['area_m2',_('area')],['remarks',_('remarks')]],
                        listeners:{change:function(){me.field_name=this.getValue();}}
                    },
                    {
                        xtype:'textfield',
                        emptyText: 'enter search key',
                        width:150,
                        listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                            me.store.proxy.extraParams = {order_status:me.extraParams, field_name:me.field_name, field_search:field.value};
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
            me.store.proxy.extraParams = { order_status:me.extraParams};
            me.store.load();
            me.doComponentLayout();
        },
        gridclick: function(grid, selected){
            var me = this, form = this.up('container'), panel = form.up('panel');
            if(panel){
                var registration_id = Ext.ComponentQuery.query('[name=registration_id]', panel)[0],
                    registration_name = Ext.ComponentQuery.query('[name=registration_name]', panel)[0],
                    unit_building_name = Ext.ComponentQuery.query('[name=unit_building_name]', panel)[0],
                    cust_id = Ext.ComponentQuery.query('[name=cust_id]', panel)[0],
                    cust_name = Ext.ComponentQuery.query('[name=cust_name]', panel)[0],
                    project_id = Ext.ComponentQuery.query('[name=project_id]', panel)[0],
                    for_doc_id = Ext.ComponentQuery.query('[name=for_doc_id]', panel)[0],
                    report_doc_id = Ext.ComponentQuery.query('[name=report_doc_id]', form)[0];
            }
            if(project_id){project_id.setValue(selected.data.project_id);}
            if(registration_id){registration_id.setValue(selected.data.registration_id);}
            if(registration_name){registration_name.setValue(selected.data.cust_name);}
            if(cust_id){cust_id.setValue(selected.data.cust_id);}
            if(cust_name){cust_name.setValue(selected.data.cust_name);}
            if(unit_building_name){unit_building_name.setValue(selected.data.unit_building_name);}
            if(for_doc_id){for_doc_id.setValue(selected.data.for_doc_id);}
            this.setValue(selected.data.unit_building_id);
            if(report_doc_id){report_doc_id.setValue(selected.data.for_doc_id);}
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