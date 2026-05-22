
Ext.define('App.view.hris.leave.Leave_approval', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('leave_approval'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.leave.Leave_approval',{remoteSort: true, pageSize : 20, autoLoad: false, groupField: 'emp_name'});
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            plugins: [
                me.edditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false
                })
            ],
            columns: [
                {text: _('approval'),width: 80,sortable: true, dataIndex: 'status', renderer: function (value, meta, record, rowIndex, colIndex, store) {
                    return record.data.status == '1' ? _('yes') : (record.data.status == '2' ? _('no'):_('pending'));
                },
                    editor:{
                        xtype:'combo',
                        editable: false,
                        mode:'local',
                        store:[['1',_('yes')],['2',_('no')]]
                    }},
                {text: _('date')+' '+_('leave'),width: 100,sortable: true,dataIndex: 'leave_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('type'),width: 100,sortable: true,dataIndex: 'lt_name'},
                {text: _('office_location'),width: 100,sortable: true,dataIndex: 'ol_name'}

            ],
            features: [{
                groupHeaderTpl: _('employee')+' : {name}',
                ftype: 'groupingsummary'
            }],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['emp_id',_('id')],['emp_name',_('employee')],['lt_name',_('type')],['ol_name',_('office_location')],['leave_date',_('date')+' '+_('leave')], ['remarks',_('remarks')]],
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
                pageSize: 10,
                store: me.store,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.edditing.on({
            scope: this,
            afteredit: function (roweditor, changes, record, rowIndex) {
                me.store.load();
            }
        });
        me.pageBody = [ me.grid ];
        me.callParent(arguments);
    },
    onNewUser: function(){
        var me = this;
        me.edditing.cancelEdit();
        me.store.insert(0, {aktif: 1,authorized: 1});
        me.edditing.startEdit(0, 0);
    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.store.proxy.extraParams={};
        this.store.load();
        callback(true);
    }
});
