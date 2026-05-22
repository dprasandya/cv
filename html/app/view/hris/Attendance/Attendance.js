
Ext.define('App.view.hris.Attendance.Attendance', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('attendance'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.Attendance.Attendance',{remoteSort: true, autoLoad: false});
        me.store_checkbox = Ext.create('App.store.hris.Attendance.Attendance_Checkbox',{remoteSort: true, autoLoad: false});
        /*me.myuploadform_lt19= new Ext.FormPanel({
            fileUpload: true,
            title :'Mesin Absensi Lt 19',
            width: 500,
            autoHeight: true,
            bodyStyle: 'padding: 10px 10px 10px 10px;',
            labelWidth: 50,
            defaults: {
                anchor: '95%',
                allowBlank: false,
                msgTarget: 'side'
            },
            items:[
                {
                    xtype: 'fileuploadfield',
                    id: 'filedata_lt19',
                    emptyText: 'Select a document to upload...',
                    fieldLabel: 'File',
                    buttonText: 'Browse',
                    listeners:{
                        change:function(f,v){
                            var note = Ext.DomQuery.selectNode('input[id='+f.getInputId()+']');
                            note.value = v.replace("C:\\fakepath\\","");
                        }
                    }
                }
            ],
            buttons: [{
                text: 'Upload',
                handler: function(){
                    if(me.myuploadform_lt19.getForm().isValid()){
                        form_action=1;
                        me.myuploadform_lt19.getForm().submit({
                            url: 'dataProvider/HRIS_Attendance_Fileupload_Lt19.php',
                            waitMsg: 'Uploading file...',
                            success: function (fp, o) {
                                Ext.Msg.alert('Success', 'Your file has been uploaded.');
                            },
                            failure: function (fp, o) {
                                Ext.Msg.alert('Failure', !o.result.msg ? 'Your file did not upload correctly':o.result.msg );
                            }
                        });
                    }
                }
            }]
        });
        me.myuploadform_lt20= new Ext.FormPanel({
            fileUpload: true,
            title :'Mesin Absensi Lt 20',
            width: 500,
            autoHeight: true,
            bodyStyle: 'padding: 10px 10px 10px 10px;',
            labelWidth: 50,
            defaults: {
                anchor: '95%',
                allowBlank: false,
                msgTarget: 'side'
            },
            items:[
                {
                    xtype: 'fileuploadfield',
                    id: 'filedata_lt20',
                    emptyText: 'Select a document to upload...',
                    fieldLabel: 'File',
                    buttonText: 'Browse',
                    listeners:{
                        change:function(f,v){
                            var note = Ext.DomQuery.selectNode('input[id='+f.getInputId()+']');
                            note.value = v.replace("C:\\fakepath\\","");
                        }
                    }
                }
            ],
            buttons: [{
                text: 'Upload',
                handler: function(){
                    if(me.myuploadform_lt20.getForm().isValid()){
                        form_action=1;
                        me.myuploadform_lt20.getForm().submit({
                            url: 'dataProvider/HRIS_Attendance_Fileupload_Lt20.php',
                            waitMsg: 'Uploading file...',
                            success: function (fp, o) {
                                Ext.Msg.alert('Success', 'Your file has been uploaded.');
                            },
                            failure: function (fp, o) {
                                Ext.Msg.alert('Failure', !o.result.msg ? 'Your file did not upload correctly':o.result.msg );
                            }
                        });
                    }
                }
            }]
        });
        me.myuploadform_manual= new Ext.FormPanel({
            fileUpload: true,
            title :'Import Absensi Manual',
            width: 500,
            autoHeight: true,
            bodyStyle: 'padding: 10px 10px 10px 10px;',
            labelWidth: 50,
            defaults: {
                anchor: '95%',
                allowBlank: false,
                msgTarget: 'side'
            },
            items:[
                {
                    xtype: 'fileuploadfield',
                    id: 'filedata_manual',
                    emptyText: 'Select a document to upload...',
                    fieldLabel: 'File',
                    buttonText: 'Browse',
                    listeners:{
                        change:function(f,v){
                            var note = Ext.DomQuery.selectNode('input[id='+f.getInputId()+']');
                            note.value = v.replace("C:\\fakepath\\","");
                        }
                    }
                }
            ],
            buttons: [{
                text: 'Upload',
                handler: function(){
                    if(me.myuploadform_manual.getForm().isValid()){
                        form_action=1;
                        me.myuploadform_manual.getForm().submit({
                            url: 'dataProvider/HRIS_Attendance_Fileupload_Manual.php',
                            waitMsg: 'Uploading file...',
                            success: function (fp, o) {
                                Ext.Msg.alert('Success', 'Your file has been uploaded.');
                            },
                            failure: function (fp, o) {
                                Ext.Msg.alert('Failure', !o.result.msg ? 'Your file did not upload correctly':o.result.msg );
                            }
                        });
                    }
                }
            }]
        });
        */

        me.grid_chechbox = Ext.create('Ext.grid.Panel', {
            store: me.store_checkbox,
            title: _('checkbox_toggle'),
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
                                            width: 250,
                                            xtype : 'xtol_type',
                                            fieldLabel: _('office_location'),
                                            name: 'ol_id',
                                            emptyText: i18n('office_location')
                                        },
                                        {
                                            width: 250,
                                            xtype : 'xtafdeling_group_combo',
                                            fieldLabel: _('afdeling'),
                                            name: 'afdeling_group',
                                            emptyText: i18n('afdeling')
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
                                    items: [
                                        {
                                            width: 250,
                                            xtype : 'xtjob_status',
                                            fieldLabel: _('job_status'),
                                            name: 'js_id',
                                            emptyText: i18n('job_status')
                                        },
                                        {
                                            width: 250,
                                            xtype : 'xtmandor',
                                            fieldLabel: _('mandor'),
                                            name: 'mandor_id',
                                            emptyText: i18n('mandor')
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
                                                        company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].items.items[0].getValue(), afdeling = container_1.items.items[1].items.items[1].getValue(), 
                                                        js_id = container_1.items.items[2].items.items[0].getValue(), mandor = container_1.items.items[2].items.items[1].getValue();
                                                    me.store_checkbox.proxy.extraParams = {company_id:company_id, ol_id:ol_id, js_id:js_id, afdeling_id:afdeling, mandor:mandor, field_name:me.field_name, field_search:field.value};
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
                                            store: [['A','Alpha'],['O','Off/Libur'],['I','Ijin'],['S','Sakit(Surat Dokter)'],['K','Sakit(Tanpa Surat)'],['J','Sakit Kecelakaan Kerja)'],['C','Cuti'],['D','Dinas Luar'],['H','Hadir'],['T','Absen 1/2 Hari'],['L','Libur 1/2 Hari'],['R','Diliburkan'],['B','Lembur Hari (Libur/Besar)'],['V','Lembur 1/2 Hari (Libur/Besar)'],['P','Lembur Pengganti'],['F','Lembur Idul Fitri']],
                                            listeners:{
                                                change:function(f){
                                                    var form = f.up('container'), cont = form.up('container'),
                                                        timex = cont.items.items[3];
                                                    if(f.value=='H'){
                                                        timex.setDisabled(false);
                                                    }else{
                                                        timex.setDisabled(true);
                                                    }

                                                }
                                            }
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
                                    items: [
                                        {
                                            width: 200,
                                            xtype : 'timefield',
                                            fieldLabel: _('time_from'),
                                            name: 'time_in',
                                            format : 'H:i:s',
                                            emptyText: i18n('time_from')
                                        },
                                        {
                                            width: 200,
                                            xtype : 'timefield',
                                            fieldLabel: _('time_to'),
                                            name: 'time_out',
                                            format : 'H:i:s',
                                            emptyText: i18n('time_to')
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
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title: _('attendance'),
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == 'H' ||  record.get('status') == 'W' || record.get('status') == 'T' || record.get('status') == 'L' ||  record.get('status') == 'C' ||  record.get('status') == 'D' ||  record.get('status') == 'P' ||  record.get('status') == 'F' ||  record.get('status') == 'B' ? 'child-row' : (record.get('status') == 'O' ? 'adult-row': (record.get('status') == 'A' ? 'grown-row': 'yellow-row'));
                }
            },
            plugins: [
                me.edditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false,
                    listeners: {
                        beforeedit: function(editor,e,opt){
                            var status = editor.grid.columns[8];
                            if(e.record.data.status =='H' || e.record.data.status =='T' ){
                                editor.grid.columns[4].setEditor(true);
                                editor.grid.columns[5].setEditor(true);
                            }else{
                                editor.grid.columns[4].setEditor(false);
                                editor.grid.columns[5].setEditor(false);
                            }
                        }
                    }
                })
            ],
            columns: [
                {text: _('id'),width: 100,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'emp_name'},
                {text: _('date'),width: 80,sortable: true,dataIndex: 'attendance_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('day'),width: 100,sortable: true,dataIndex: 'day_name'},
                {text: _('in'),width: 80,sortable: true,dataIndex: 'time_in'},
                {text: _('out'),width: 80,sortable: true,dataIndex: 'time_out'},
                {text: _('duration'),width: 80,sortable: true,dataIndex: 'duration', align:'right'},
                {text: _('late')+' ('+_('minute')+' )',width: 80,sortable: true,dataIndex: 'late_time', align:'right'},
                {text: _('status'),width: 150,sortable: true,dataIndex: 'status', align:'center', renderer: function (value, meta, record, rowIndex, colIndex, store) {
                    return record.data.status == 'A' ? 'Alpha' : (record.data.status=='O' ? 'Off/Libur' : (record.data.status=='I' ? 'Ijin' : (record.data.status=='S' ? 'Sakit(S. Dokter)' : (record.data.status=='K' ? 'Sakit(Tnp. S. Dokter)' : (record.data.status=='C' ? 'Cuti Tahunan' : (record.data.status=='D' ? 'Dinas Luar' : (record.data.status=='H' ? 'Hadir' : (record.data.status=='T' ? 'Absen 1/2 Hari' : (record.data.status=='L' ? 'Libur 1/2 Hari' : (record.data.status=='B' ? 'Lembur (Hari Libur/Besar)' : (record.data.status=='R' ? 'Diliburkan' : (record.data.status=='P' ? 'Lembur Pengganti' : (record.data.status=='F' ? 'Lembur Idul Fitri' : (record.data.status=='V' ? 'Lembur 1/2 Hari (Libur/Besar)' : (record.data.status=='W' ? 'Work From Home (WFH)' : (record.data.status=='M' ? 'Isoman' : (record.data.status=='J' ? 'Sakit Kecelakaan Kerja' : (record.data.status=='CM' ? 'Cuti Melahirkan' : (record.data.status=='CK' ? 'Cuti Kematian' : (record.data.status=='CN' ? 'Cuti Menikah' : ''))))))))))))))))))));
                    },
                    editor:{
                    xtype:'combo',
                    editable: false,
                    width:150,
                    mode:'local',
                    store: [['A','Alpha'],['O','Off/Libur'],['I','Ijin'],['S','Sakit(Surat Dokter)'],['K','Sakit(Tanpa Surat)'],['J','Sakit Kecelakaan Kerja'],['C','Cuti Tahunan'],['CM','Cuti Melahirkan'],['CK','Cuti Kematian'],['CN','Cuti Menikah'],['D','Dinas Luar'],['H','Hadir'],['T','Absen 1/2 Hari'],['L','Libur 1/2 Hari'],['R','Diliburkan'],['B','Lembur Hari (Libur/Besar)'],['V','Lembur 1/2 Hari (Libur/Besar)'],['P','Lembur Pengganti'],['F','Lembur Idul Fitri'],['W','Work From Home(WFH)'],['M','Isoman']],
                    listeners:{
                        change:function(f, e){
                            var grid = this.up('grid');
                            if(this.getValue()=='H'){
                                grid.columns[4].setEditor({xtype:'timefield', format:'H:i:s', width: 80});
                                grid.columns[5].setEditor({xtype:'timefield', format:'H:i:s', width: 80});
                            }else{
                                grid.columns[4].setEditor(false);
                                grid.columns[5].setEditor(false);
                            }
                        }
                    }
                }},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks', editor:{
                    xtype:'textfield'
                }}
            ],
            tbar: [
                {
                    xtype: 'container',
                    flex:1,
                    layout:'hbox',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox'
                            },
                            fieldDefaults: {
                                labelAlign: 'right'
                            },
                            fieldLabel: _('id'),
                            items: [
                                {
                                    width: 100,
                                    xtype: 'xtemployee',
                                    editable: false,
                                    emptyText: i18n('id'),
                                    listeners:{
                                        change:function(field){
                                            me.load_data(field);
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'vbox'
                            },
                            fieldDefaults: {
                                labelAlign: 'right'
                            },
                            fieldLabel: _('date_from'),
                            items: [
                                {
                                    width: 100,
                                    xtype: 'datefield',
                                    value: new Date(),
                                    emptyText: i18n('date_from'),
                                    listeners:{
                                        change:function(field){
                                            me.load_data(field);
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'vbox'
                            },
                            fieldDefaults: {
                                labelAlign: 'right'
                            },
                            fieldLabel: _('date_to'),
                            items: [
                                {
                                    width: 100,
                                    xtype: 'datefield',
                                    value: new Date(),
                                    emptyText: i18n('date_to'),
                                    listeners:{
                                        change:function(field){
                                            me.load_data(field);
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }/*,
                {
                    xtype: 'button',
                    text: _('upload'),
                    iconCls: 'icoOutbox',
                    handler: function(){
                        me.GridShow= Ext.create('App.ux.window.Window',{
                            layout: 'fit',
                            title: _('upload'),
                            width: 500,
                            height: 120,
                            items:[me.FormulirPanel],
                            modal:true
                        });
                        me.GridShow.show();
                    }
                }*/
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
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ /*me.myuploadform_lt19,*/me.grid, me.grid_chechbox]
        });
        me.pageBody = [ me.FormulirPanel];
        me.callParent(arguments);
    },

    load_data: function(field){
        var me= this, fieldcontainer = field.up('container'), container = fieldcontainer.up('container'),
            emp_id = container.items.items[0].items.items[0],
            datetime_in = container.items.items[1].items.items[0],
            datetime_out = container.items.items[2].items.items[0];
        me.store.load({params:{emp_id:emp_id.getValue(), datetime_in:datetime_in.getValue(), datetime_out:datetime_out.getValue() }});
    },
    load_checkbox:function(){
        var me = this, tb = me.grid_chechbox.down('toolbar'), container_1 = tb.items.items[0].items.items[0], container_2 = tb.items.items[0].items.items[1],
            company_id = container_1.items.items[0].getValue(), ol_id = container_1.items.items[1].items.items[0].getValue(), afdeling_id = container_1.items.items[1].items.items[1].getValue(),
             js_id = container_1.items.items[2].items.items[0].getValue(), mandor_id = container_1.items.items[2].items.items[1].getValue();
        me.store_checkbox.proxy.extraParams = {company_id:company_id, ol_id:ol_id, js_id:js_id, afdeling_id:afdeling_id, mandor_id:mandor_id};
        me.store_checkbox.loadPage(1);

    },
    onSave: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length,
            tb = btn.up('toolbar'), container_2 = tb.items.items[0].items.items[1],
            fromdate = container_2.items.items[1].items.items[0].getValue(), todate = container_2.items.items[1].items.items[1].getValue(),
            status = container_2.items.items[2].items.items[0].getValue(),
            time_in = container_2.items.items[3].items.items[0].getValue(), time_out = container_2.items.items[3].items.items[1].getValue(),
            days = ((todate-fromdate)/86400000);
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            data.time_in=time_in; data.time_out=time_out; data.status=status;
            for(var j=0; j<=days; j++){
                var date_temp = Ext.Date.add(fromdate, Ext.Date.DAY,j);
                HRIS_Attendance.update({emp_id:data.emp_id, attendance_date:date_temp, status:status, time_in:time_in, time_out:time_out}, function(provider, response){
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
