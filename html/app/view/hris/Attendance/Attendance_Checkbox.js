
Ext.define('App.view.hris.Attendance.Attendance_Checkbox', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('attendance'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store_checkbox = Ext.create('App.store.hris.Attendance.Attendance_Checkbox',{remoteSort: true, autoLoad: false});

        me.grid_chechbox = Ext.create('Ext.grid.Panel', {
            store: me.store_checkbox,
            viewConfig :
                {
                    stripeRows: false,
                    getRowClass: function(record, index) {
                        return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                    }
                },
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                }
            },
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex:1,sortable: true,dataIndex: 'emp_name'},
                {text: _('company'),width: 80,sortable: true,dataIndex: 'company_id'},
                {text: _('job_status'),width: 150,sortable: true,dataIndex: 'js_name'},
                {text: _('office_location'),width: 80,sortable: true,dataIndex: 'ol_name'},
                {text: _('position'),width: 100,sortable: true,dataIndex: 'pos_name'},
                {text: _('group_by'),width: 80,sortable: true,dataIndex: 'group_id'}
            ],
            tbar: [
                {
                    xtype: 'container',
                    layout:'hbox',
                    flex:1,
                    items: [
                        {
                            xtype: 'container',
                            layout:'anchor',
                            flex: 1,
                            items: [
                                {width: 270, xtype : 'xtcompany', fieldLabel: _('company'), labelAlign: 'right', name : 'company_id', emptyText: i18n('company')},
                                {width: 270, xtype : 'xtol_type', fieldLabel: _('office_location'), labelAlign: 'right', name : 'ol_id', emptyText: i18n('office_location')},
                                {width: 270, xtype : 'xtjob_status', fieldLabel: _('job_status'), labelAlign: 'right', name : 'js_id', emptyText: i18n('job_status')},
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    fieldDefaults: {
                                        labelAlign: 'right'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: _('view_data'),
                                            iconCls: 'generate_report',
                                            scope: me,
                                            handler: me.load_checkbox
                                        },
                                        {
                                            xtype: 'button',
                                            text: _('save'),
                                            iconCls: 'icoAdd',
                                            scope: me,
                                            handler: me.onSave
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            xtype: 'container',
                            layout:'anchor',
                            flex:1,
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    fieldDefaults: {
                                        labelAlign: 'right'
                                    },
                                    fieldLabel: _('search'),
                                    items: [
                                        {
                                            xtype:'combo',
                                            editable: false,
                                            width:100,
                                            mode:'local',
                                            store: [['emp_id',_('id')],['emp_name',_('name')],['company_id',_('company')],['ol_name',_('office_location')],['pos_name',_('position')],['group_id',_('group_by')]],
                                            listeners:{change:function(){me.field_name=this.getValue();}}
                                        },
                                        {
                                            xtype:'textfield',
                                            emptyText: 'enter search key',
                                            width:150,
                                            listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                                                    var tb = me.grid_chechbox.down('toolbar'), container_1 = tb.items.items[0].items.items[0],
                                                        company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(), js_id = container_1.items.items[2].getValue();
                                                    me.store_checkbox.proxy.extraParams = {company_id:company_id, ol_id:ol_id, js_id:js_id, field_name:me.field_name, field_search:field.value};
                                                    me.store_checkbox.loadPage(1);
                                                }}}
                                        }
                                    ]
                                },
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
                                            xtype : 'datefield',
                                            editable: false,
                                            format : 'Y-m-d',
                                            value: new Date(),
                                            emptyText: i18n('start_date')
                                        },
                                        {
                                            width: 100,
                                            xtype : 'datefield',
                                            editable: false,
                                            format : 'Y-m-d',
                                            value: new Date(),
                                            emptyText: i18n('end_date')
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    fieldDefaults: {
                                        labelAlign: 'right'
                                    },
                                    fieldLabel: _('type'),
                                    items: [
                                        {
                                            xtype:'combo',
                                            editable: false,
                                            width:200,
                                            name: 'day_type',
                                            store: [['A','Alpha'],['O','Off/Libur'],['I','Ijin'],['S','Sakit(Surat Dokter)'],['K','Sakit(Tanpa Surat)'],['C','Cuti Tahunan'],['CM','Cuti Melahirkan'],['CK','Cuti Kematian'],['CN','Cuti Menikah'],['D','Dinas Luar'],['T','Absen 1/2 Hari'],['L','Libur 1/2 Hari'],['R','Diliburkan'],['B','Lembur Hari (Libur/Besar)'],['V','Lembur 1/2 Hari (Libur/Besar)'],['P','Lembur Pengganti'],['F','Lembur Idul Fitri'],['W','Work From Home(WFH)'],['M','Isoman'],['','Batal/Hapus']] //['J','Sakit Kecelakaan Kerja'],
                                        }
                                    ]
                                }

                            ]
                        }

                    ]
                }

            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_checkbox,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });

        me.pageBody = [ me.grid_chechbox];
        me.callParent(arguments);
    },

    load_checkbox:function(){
        var me = this, tb = me.grid_chechbox.down('toolbar'), container_1 = tb.items.items[0].items.items[0], container_2 = tb.items.items[0].items.items[1],
            company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].getValue(), js_id = container_1.items.items[2].getValue();
        me.store_checkbox.proxy.extraParams = {company_id:company_id, ol_id:ol_id, js_id:js_id};
        me.store_checkbox.loadPage(1);

    },
    onSave: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length,
            tb = btn.up('toolbar'), container_2 = tb.items.items[0].items.items[1],
            fromdate = container_2.items.items[1].items.items[0].getValue(), todate = container_2.items.items[1].items.items[1].getValue(),
            status = container_2.items.items[2].items.items[0].getValue(),
            //time_in = container_2.items.items[3].items.items[0].getValue(), time_out = container_2.items.items[3].items.items[1].getValue(),
            days = ((todate-fromdate)/86400000);
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            //data.time_in=time_in; data.time_out=time_out;
            data.status=status;
            for(var j=0; j<=days; j++){
                var date_temp = Ext.Date.add(fromdate, Ext.Date.DAY,j);
                HRIS_Attendance.update({emp_id:data.emp_id, attendance_date:date_temp, status:status}, function(provider, response){
                    if (response.type == 'exception'){
                        var error = response.message;
                        Ext.Msg.show({
                            title: 'Failed!',
                            msg: error,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        });
                    }else{
                        Ext.MessageBox.alert('Sukses', '!!!!');

                    }
                });
            }
        }
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        callback(true);
    }
});
