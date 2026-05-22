
Ext.define('App.view.hris.Attendance.Workplan', {
    extend: 'App.ux.RenderPanel',
    id: 'panelWorkplan',
    pageTitle: _('work plan'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.Attendance.Workplan',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_detail = Ext.create('App.store.hris.Attendance.Workplan');

        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            height: 1000,
            autoScroll: true,
            title: _('detail'),
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            plugins: [
                me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false,
                    
                })
            ],
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_id'},
                {text: _('name'),width: 150,sortable: true,dataIndex: 'emp_name'},
                {text: _('office'),width: 150,sortable: true,dataIndex: 'ol_name'},
                {text: _('afdeling'),width: 100,sortable: true,dataIndex: 'afdeling_name'},
                {text: _('active'),xtype: 'checkbox',width: 100,sortable: true,dataIndex: 'active'},
            ],
            features: [{
                ftype: 'summary'
            }],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['emp_id',_('id')],['emp_name',_('name')],['ol_id',_('category')],['afdeling_id',_('afdeling')]],
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
                    xtype: 'label'
                }
            ]
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar'); me.data= record.data;
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.doc_id = record.get('doc_id');
                    me.jurnal.store.load({params:{doc_id:me.doc_id}});

                    // disable btn add detail //
                    var btn_add_detail = me.grid_detail.down('toolbar').items.items[0];
                    if(record.data.status ==1 || record.data.status==2){btn_add_detail.setDisabled(true);}
                    else{if(me.data.doc_type=='P'){btn_add_detail.setDisabled(true)}else{btn_add_detail.setDisabled(false);}}
                }
            },
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    items:[
                        {
                            xtype: 'tabpanel',
                            items: [
                                {
                                    xtype: 'panel',
                                    title: _('work plan'),
                                    items:[
                                        {
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'fieldset',
                                                    defaultType: 'textfield',
                                                    layout: 'hbox',
                                                    flex:1,
                                                    items:[
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
                                                                    fieldLabel: _('document'),
                                                                    items: [
                                                                        {
                                                                            width: 200,
                                                                            xtype: 'textfield',
                                                                            name: 'doc_id',
                                                                            readOnly: true,
                                                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;',
                                                                            emptyText: i18n('id')
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
                                                                            xtype : 'datefield',
                                                                            editable: false,
                                                                            fieldLabel: _('docdate'),
                                                                            name: 'doc_date',
                                                                            format : 'Y-m-d',
                                                                            value: new Date(),
                                                                            maxValue : new Date(),
                                                                            emptyText: i18n('docdate'),
                                                                            allowBlank:false
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
                                                                            name: 'doc_type',
                                                                            width:130,
                                                                            mode:'local',
                                                                            store: [['P','Pemupukan'],['S','Stock Out'],['T','Transportasi']],
                                                                            emptyText   : _('select'),
                                                                            allowBlank:false,
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
                                                                    fieldLabel: _('office_location'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'xtol_type',
                                                                            editable: false,
                                                                            readOnly: true,
                                                                            name: 'ol_id',
                                                                            allowBlank: false,
                                                                            emptyText: i18n('id')
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
                                                                    fieldLabel: _('premi'),
                                                                    items: [
                                                                        {
                                                                            xtype:'xtaward_attendance',
                                                                            editable: false,
                                                                            //readOnly: true,
                                                                            width:150,
                                                                            listeners: {
                                                                                render: function(c){
                                                                                    c.getEl().on({
                                                                                        click: function() {
                                                                                            c.store.load({params:{no_sc_id:['UPM23']}});
                                                                                        }
                                                                                    });
                                                                                }
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    defaultType: 'textfield',
                                                    layout: 'hbox',
                                                    flex:1,
                                                    items:[
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
                                                                    fieldLabel: _('remarks'),
                                                                    items: [
                                                                        {
                                                                            width: 380,
                                                                            height: 50,
                                                                            xtype: 'textarea',
                                                                            style:{overflow:'auto'},
                                                                            name: 'remarks',
                                                                            allowBlank:false,
                                                                            emptyText: i18n('remarks'),
                                                                            labelAlign: 'top'
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
                                                                            width: 125,
                                                                            xtype: 'checkbox',
                                                                            fieldLabel: _('active'),
                                                                            name: 'status'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        
                                    ]
                                },
                                me.grid_detail
                            ],
                            listeners: {
                                render: function() {
                                    this.items.each(function(i, index, items){
                                        i.tab.on('click', function(){
                                            if(index==0){
                                                me.jurnal.store.load({params:{doc_id:me.data.doc_id}});
                                            }else if(index>0){
                                                i.store.proxy.extraParams = {doc_id: me.data.doc_id};
                                                i.store.load();
                                            }
                                        });
                                    });
                                }
                            }
                        }
                    ]
                })
            ],
            columns: [
                //{text: _('project'),width: 100,sortable: true,dataIndex: 'project_name'},
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('type'),width: 150,sortable: true,dataIndex: 'doc_type'},
                {text: _('category'),width: 80,sortable: true,dataIndex: 'ol_id'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('add'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['doc_type',_('type')],['ol_id',_('category')],['remarks',_('remarks')],['userinput',_('input_user')]],
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
                    xtype: 'label'
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
        me.pageBody = [ me.grid];
        me.callParent(arguments);
    },
    onNewData: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        plugin.editor.form.findField('doc_date').setValue(new Date());
    },
    /*onNewDetail:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        me.formEditingDetail.context.record.data.doc_id = me.doc_id;
        me.validation_disabled();
    },
    validation_disabled:function(){
        var me = this, plugin = me.grid_detail.editingPlugin;
        if(me.data.doc_type=='S'||me.data.doc_type=='V'||me.data.doc_type=='T'||me.data.doc_type=='B'||me.data.doc_type=='I'||me.data.doc_type=='L'||me.data.doc_type=='H'||me.data.doc_type=='W'||me.data.doc_type=='C'||me.data.doc_type=='J'||me.data.doc_type=='N'){
            plugin.editor.form.findField('item_id').setReadOnly(true);
            plugin.editor.form.findField('coa_id').setReadOnly(false);
             // protect station parameter //
             plugin.editor.form.findField('coa_id').extraParams = {station_type:['PKS'], station_group:[me.data.doc_type]}; 
        }else if(me.data.doc_type=='F' || me.data.doc_type=='G'||me.data.doc_type=='E'){
            plugin.editor.form.findField('item_id').setReadOnly(false);
            plugin.editor.form.findField('coa_id').setReadOnly(true);
            //plugin.editor.form.findField('item_id').setValue('KSWT02');
            //plugin.editor.form.findField('item_name').setValue('Kelapa Sawit (TBS Luar)');
            //plugin.editor.form.findField('unit_id').setValue('KG');
        }else if(me.data.doc_type=='M'||me.data.doc_type=='K'){
            plugin.editor.form.findField('item_id').setReadOnly(true);
            plugin.editor.form.findField('coa_id').setReadOnly(false);
             plugin.editor.form.findField('coa_id').extraParams = {station_type:['KEBUN']}; 
        }else{
            plugin.editor.form.findField('item_id').setReadOnly(true);
            plugin.editor.form.findField('coa_id').setReadOnly(false);
            plugin.editor.form.findField('coa_id').extraParams = null; 
        }
       
        

    },
    get_total:function(field){
        var container  = field.up('fieldset'), //fieldset
            textfield = container.items.items[0].items,
            qty = textfield.items[0].items.items[0],
            price = textfield.items[1].items.items[0],// harga
            total = textfield.items[2].items.items[0]; // total
        total.setValue(price.getValue() * qty.getValue());
    },

    get_change_po : function(field){
        var me= this, plugin = me.grid.editingPlugin,
            for_doc_id = plugin.editor.form.findField('for_doc_id'),
            tax_id = plugin.editor.form.findField('tax_id'),// tax
            tax_name = plugin.editor.form.findField('tax_name');// tax
        me.store_po_detail.proxy.extraParams = { doc_id : for_doc_id.getValue()};
        me.store_po_detail.load({
            callback: function(records, operation, success) {
                tax_idx = records[0].data.tax_id;
                tax_namex = records[0].data.tax_name;
                tax_id.setValue(tax_idx);
                tax_name.setValue(tax_namex);
            }
        });

    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        me.store.load();
        callback(true);
    }
});
