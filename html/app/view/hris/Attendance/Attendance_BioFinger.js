
Ext.define('App.view.hris.Attendance.Attendance_BioFinger', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('bio_finger'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.Attendance.Attendance_BioFinger',{remoteSort: true, autoLoad: false});
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            columns: [
                {text: _('sn_bio_finger'),width: 100,sortable: true,dataIndex: 'sn_bio_finger'},
                {text: _('office_location'),width: 150,sortable: true,dataIndex: 'ol_name'},
                {text: _('id'),width: 100,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'emp_name'},
                {text: _('date'),width: 80,sortable: true,dataIndex: 'attendance_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('time'),width: 80,sortable: true,dataIndex: 'attendance_time'},
                {text: _('day'),width: 100,sortable: true,dataIndex: 'day_name'},
                {text: _('type'),width: 100,sortable: true,dataIndex: 'attendance_type'},
                {text: _('sensor'),width: 100,sortable: true,dataIndex: 'sensor_name'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeinput', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'hbox'
                    },
                    fieldDefaults: {
                        labelAlign: 'right'
                    },
                    fieldLabel: _('date'),
                    items: [
                        {
                            width: 100,
                            xtype: 'datefield',
                            value: new Date(),
                            emptyText: i18n('date_from'),
                            listeners:{
                                change:function(field){
                                    me.load_data();
                                }
                            }
                        },
                        {
                            width: 100,
                            xtype: 'datefield',
                            value: new Date(),
                            emptyText: i18n('date_to'),
                            listeners:{
                                change:function(field){
                                    me.load_data();
                                }
                            }
                        }
                    ]
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['sn_bio_finger',_('sn_bio_finger')],['ol_name',_('office_location')],['emp_id',_('id')],['emp_name',_('name')],['attendance_type',_('type')],['sensor_name',_('sensor')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                            var tb = me.grid.down('toolbar'),
                                fromdate = tb.items.items[0].items.items[0],
                                todate = tb.items.items[0].items.items[1];
                            me.store.proxy.extraParams = {fromdate:fromdate.getValue(), todate:todate.getValue(), field_name:me.field_name, field_search:field.value};
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
        me.pageBody = [ me.grid ];
        me.callParent(arguments);
    },

    load_data: function(){
        var me= this,  tb = me.grid.down('toolbar'),
            fromdate = tb.items.items[0].items.items[0],
            todate = tb.items.items[0].items.items[1];
        me.store.proxy.extraParams = {fromdate:fromdate.getValue(), todate:todate.getValue()}
        me.store.loadPage(1);
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.load_data();
        callback(true);
    }
});
