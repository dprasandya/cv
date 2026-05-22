Ext.define('App.view.transactions.marketing.Unit_building_cancel', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('unit_building_cancel'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.marketing.Unit_building_cancel',{remoteSort: true, pageSize : 20, autoLoad: false, groupField: 'cust_name'});
        me.store_detail = Ext.create('App.store.transactions.marketing.Unit_building_cancel_view',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title: _('unit_building'),
            autoScroll: true,
            plugins: [
                me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2
                })
            ],
            features: [{
                groupHeaderTpl: _('customer')+' : {name}',
                ftype: 'groupingsummary'
            }],
            columns: [
                {text: _('enabled?'),width: 60,sortable: true, dataIndex: 'status',renderer: me.boolRenderer,
                    editor:{
                        xtype:'checkbox'
                    }},
                {text: _('cancel')+' '+_('date'),width: 100,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y'), editor:{
                    xtype:'datefield',
                    format : 'Y-m-d',
                    editable : false,
                    allowBlank: false,
                    value: new Date(),
                    maxValue : new Date(),
                    emptyText: i18n('date')
                }},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks',editor:{
                    xtype:'textfield'
                }},
                {text: _('registration'),width: 80 ,sortable: true,dataIndex: 'registration_id'},
                {text: _('customer'),width: 100,sortable: true,dataIndex: 'cust_name'},
                {text: _('project'),width: 80,sortable: true,dataIndex: 'project_name'},
                {text: _('unit_building'),width: 80,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('cluster'),width: 100,sortable: true,dataIndex: 'cluster_name'},
                {text: _('facing'),width: 100,sortable: true,dataIndex: 'facing_name'},
                {text: _('building_type'),width: 80,sortable: true,dataIndex: 'building_id'},
                {text: 'Area M2',width: 100,sortable: true,dataIndex: 'area_m2', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['registration_id',_('id')],['cust_name',_('customer')],['project_name',_('project')],['unit_building_name',_('unit_building')],['cluster_name',_('cluster')],['facing_name',_('facing')],['building_id',_('building_type')],['area_m2','Area M2']],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {field_name:me.field_name, field_search:field.value};
                        me.store.loadPage(1);}}
                    }
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.store,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }

        });
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            title: _('cancel'),
            autoScroll: true,
            columns: [
                {text: _('cancel')+' '+_('date'),width: 100,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('registration'),width: 80 ,sortable: true,dataIndex: 'registration_id'},
                {text: _('customer'),width: 100,sortable: true,dataIndex: 'cust_name'},
                {text: _('project'),width: 80,sortable: true,dataIndex: 'project_name'},
                {text: _('unit_building'),width: 80,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('cluster'),width: 100,sortable: true,dataIndex: 'cluster_name'},
                {text: _('facing'),width: 100,sortable: true,dataIndex: 'facing_name'},
                {text: _('building_type'),width: 80,sortable: true,dataIndex: 'building_id'},
                {text: 'Area M2',width: 100,sortable: true,dataIndex: 'area_m2', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['registration_id',_('id')],['cust_name',_('customer')],['project_name',_('project')],['unit_building_name',_('unit_building')],['cluster_name',_('cluster')],['facing_name',_('facing')],['building_id',_('building_type')],['area_m2','Area M2']],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_detail.proxy.extraParams = {field_name:me.field_name, field_search:field.value};
                        me.store_detail.loadPage(1);}}
                    }
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.store_detail,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }

        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.grid, me.grid_detail ],
            listeners: {
                render: function() {
                    this.items.each(function(i, index, items){
                        i.tab.on('click', function(){
                            i.store.load()
                        });
                    });
                }
            }
        });
        me.formEditing.on({
            scope: this,
            afteredit: function (roweditor, changes, record, rowIndex) {
                if(roweditor.context.record.data.status=='1' || roweditor.context.record.data.status=='true'){
                    me.store.load();
                }
            }
        });
        me.pageBody = [ me.FormulirPanel];
        me.callParent(arguments);
    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */

    onActive: function(callback){
        this.store.load();
        callback(true);
    }
});
