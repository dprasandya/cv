Ext.define('App.view.popup.UnitBuildingRent',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtunitbuildingrent',

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
                    {name:'price_rent_m2', type:'float'},
                    {name:'total_rent', type:'float'},
                    {name:'remarks', type:'string'},
                    {name:'rent_status', type:'string'},
                    {name:'status', type:'bool'},
                    {name:'useredit', type:'string'},
                    {name:'timeedit', type:'date'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: UnitBuilding.popup_rent
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
                title: _('unit_building_rent'),
                listeners: {
                    scope: me,
                    select: me.gridclick,
                    itemdblclick: me.doucbleclick
                },
                columns: [
                    {text: _('project'),width: 100,sortable: true,dataIndex: 'project_name'},
                    {text: _('id'),width: 80,sortable: true,dataIndex: 'unit_building_id'},
                    {text: _('name'),flex: 1,sortable: true,dataIndex: 'unit_building_name'},
                    {text: _('cluster'),width: 100,sortable: true,dataIndex: 'cluster_name'},
                    {text: _('area')+' m2',width: 80,sortable: true,dataIndex: 'area_m2', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                    {text: _('price')+' m2',width: 80,sortable: true,dataIndex: 'price_rent_m2', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                    {text: _('status'),width: 80,sortable: true,dataIndex: 'rent_status', align:'center'},
                    {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
                ],
                tbar: [
                    {
                        xtype:'combo',
                        editable: false,
                        width:100,
                        mode:'local',
                        store: [['unit_building_id',_('id')],['unit_building_name',_('name')],['facing_name',_('facing')],['cluster_name',_('cluster')],['project_name',_('project')],['building_name',_('building_type')],['area_m2',_('area')],['remarks',_('remarks')]],
                        listeners:{change:function(){me.field_name=this.getValue();}}
                    },
                    {
                        xtype:'textfield',
                        emptyText: 'enter search key',
                        width:150,
                        listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                            me.store.proxy.extraParams = {rent_status:me.extraParams, field_name:me.field_name, field_search:field.value};
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
            me.store.proxy.extraParams = { rent_status:me.extraParams};
            me.store.load();
            me.doComponentLayout();
        },
        gridclick: function(grid, selected){
            this.setValue(selected.data.unit_building_id);
            var me = this, form = this.up('container'), container = form.up('panel'),  plugin = container.ownerCt.editingPlugin,
                project_id = plugin.editor.form.findField('project_id'), cluster_id = plugin.editor.form.findField('cluster_id'),
                facing_id = plugin.editor.form.findField('facing_id'), area_m2 = plugin.editor.form.findField('area_m2'),
                building_id = plugin.editor.form.findField('building_id'), building_name = plugin.editor.form.findField('building_name'),
                cluster_name = plugin.editor.form.findField('cluster_name'), unit_building_name = plugin.editor.form.findField('unit_building_name'),
                floor_id = plugin.editor.form.findField('floor_id'), price = plugin.editor.form.findField('price');
            if(project_id){project_id.setValue(selected.data.project_id);}
            if(cluster_id){cluster_id.setValue(selected.data.cluster_id);}
            if(cluster_name){cluster_name.setValue(selected.data.cluster_name);}
            if(facing_id){facing_id.setValue(selected.data.facing_id);}
            if(area_m2){area_m2.setValue(selected.data.area_m2);}
            if(building_id){building_id.setValue(selected.data.building_id);}
            if(building_name){building_name.setValue(selected.data.building_name);}
            if(unit_building_name){unit_building_name.setValue(selected.data.unit_building_name);}
            if(floor_id){floor_id.setValue(selected.data.floor_id);}
            if(price){price.setValue(selected.data.total_rent);}
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