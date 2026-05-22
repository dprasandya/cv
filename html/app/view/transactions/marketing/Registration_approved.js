
Ext.define('App.view.transactions.marketing.Registration_approved', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('registration_approved'),
    initComponent: function(){
        var me = this;
        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.marketing.Registration_approved',{remoteSort: true,  pageSize : 20,  autoLoad: false});

        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            plugins: [
                me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2
                })
            ],
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[3].setText("UserEdit : " +record.data.useredit);
                }
            },
            columns: [
                {text: _('enabled?'),width: 60,sortable: true, dataIndex: 'status',renderer: me.boolRenderer,
                    editor:{
                        xtype:'checkbox'
                }},
                {text: _('approval')+' '+_('date'),width: 100,sortable: true,dataIndex: 'approved_date', renderer:Ext.util.Format.dateRenderer('d-m-Y'), editor:{
                    xtype:'datefield',
                    format : 'Y-m-d',
                    editable : false,
                    allowBlank: false,
                    value: new Date(),
                    maxValue : new Date(),
                    emptyText: i18n('date')
                }},
                {text: _('type'),width: 80,sortable: true,dataIndex: 'registration_type'},
                {text: _('billing')+' '+_('date'),width: 80,sortable: true,dataIndex: 'start_billing', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('project'),width: 100,sortable: true,dataIndex: 'project_name'},
                {text: _('name'),width: 100,sortable: true,dataIndex: 'full_name'},
                {text: _('unit_building'),width: 150,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('area'),width: 100,sortable: true,dataIndex: 'area_m2',align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('payment_method'),width: 150, sortable: true,dataIndex: 'payment_name'},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'total', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['project_name',_('project')],['registration_id',_('registration')],['full_name',_('name')],['unit_building_name',_('unit_building')],['area_m2',_('area')],['payment_name',_('payment_method')],['remarks',_('remarks')]],
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
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
             bbar: {
                 xtype: 'pagingtoolbar',
                 pageSize: 10,
                 store: me.store,
                 displayMsg: 'Diplay {0} - {1} Of {2}',
                 emptyMsg: 'No Record Found',
                 displayInfo: true
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
        me.pageBody = [ me.grid ];
        me.callParent(arguments);
    },
    onNewUser: function(){
        var me = this;
        me.formEditing.cancelEdit();
        me.store.insert(0, {aktif: 1,authorized: 1});
        me.formEditing.startEdit(0, 0);
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
