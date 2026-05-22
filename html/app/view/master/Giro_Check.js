
Ext.define('App.view.master.Giro_Check', {
    extend: 'App.ux.RenderPanel',
    id: 'panelGiro_Check',
    pageTitle: _('giro_check'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.model =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'co_id', type:'string'},
                {name:'reference_id', type:'string'},
                {name:'reference_type', type:'string'},
                {name:'reference_date', type:'date'},
                {name:'cash_id', type:'string'},
                {name:'reference_value', type:'float'},
                {name:'outstanding_value', type:'float'},
                {name:'remarks', type:'string'},
                {name:'status', type:'bool'},
                {name:'userinput', type:'string'},
                {name:'useredit', type:'string'},
                {name:'timeedit', type:'date'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read: Giro_Check.select,
                    create: Giro_Check.add,
                    update: Giro_Check.update,
                    destroy: Giro_Check.delete
                },
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                }
            }
        });
        me.store = Ext.create('Ext.data.Store',{model: me.model ,remoteSort: true, autoLoad: true});
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            plugins: [
                me.edditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false,
                    autoLoad : true
                })
            ],
            //selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'reference_id'},
                {text: _('cashbank'),width: 80,sortable: true,dataIndex: 'cash_id'},
                {text: _('type'),width: 80,sortable: true,dataIndex: 'reference_type'},
                {text: _('date'),width: 100,sortable: true,dataIndex: 'reference_date', editor:{
                    xtype:'datefield',
                    format : 'Y-m-d',
                    value: new Date(),
                    maxValue : new Date(),
                    emptyText: i18n('date')

                }},
                {text: _('value'),width: 100,sortable: true,dataIndex: 'reference_value', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'), editor:{
                    xtype:'mitos.currency'
                }},
                {text: _('outstanding'),width: 100,sortable: true,dataIndex: 'outstanding_value', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks', editor:{
                    xtype:'textfield'
                }},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'status',renderer: me.boolRenderer,
                    dataIndex: 'status',
                    editor:{
                        xtype:'checkbox'
                    }}
            ],
            tbar: [
                {
                    xtype: 'fieldset',
                    defaultType: 'textfield',
                    layout: 'hbox',
                    flex:1,
                    items: [
                        {
                            xtype: 'container',
                            flex:1,
                            layout:'anchor',
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    fieldDefaults: {
                                        labelAlign: 'right'
                                    },
                                    fieldLabel: 'Bank',
                                    items: [
                                        {
                                            width: 100,
                                            xtype: 'xtcashbank',
                                            editable: false,
                                            name: 'cash_id',
                                            emptyText: i18n('cashbank'),
                                            extraParams:'B'
                                        },
                                        {
                                            width: 100,
                                            xtype: 'combo',
                                            editable: false,
                                            name: 'reference_type',
                                            mode:'local',
                                            store: ['GIRO','CHECK'],
                                            emptyText   : _('select')
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
                                    fieldLabel: _('reference_id'),
                                    items: [
                                        {
                                            width: 100,
                                            xtype: 'textfield',
                                            name: 'reference_id',
                                            allowblank: false,
                                            emptyText: i18n('id')
                                        },
                                        {
                                            width: 50,
                                            xtype: 'numberfield',
                                            hideTrigger: true,
                                            name: 'start_number',
                                            allowblank: false,
                                            emptyText: i18n('from')
                                        },
                                        {
                                            width: 50,
                                            xtype: 'numberfield',
                                            hideTrigger: true,
                                            name: 'end_number',
                                            allowblank: false,
                                            emptyText: i18n('to')
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
                    items: [
                        {
                            xtype: 'container',
                            flex:1,
                            layout:'anchor',
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
                                            store: [['reference_id',_('id')],['cash_id',_('cashbank')],['reference_type',_('type')],['outstanding_value',_('value')],['remarks',_('remarks')]],
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
                                    fieldLabel: '',
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: _('add'),
                                            iconCls: 'icoAdd',
                                            scope: me,
                                            handler: me.onNewUser
                                        },
                                        {
                                            xtype: 'button',
                                            text: _('remove'),
                                            iconCls: 'icoDeleteBlack',
                                            scope: me,
                                            handler: me.onDelete
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
    onNewUser: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data = btn.up('toolbar').items;
        var cash_id = data.items[0].items.items[0].items.items[0].items.items[0].getValue(), // cash_id
            reference_type = data.items[0].items.items[0].items.items[0].items.items[1].getValue(), // reference type
            reference_id_group = data.items[0].items.items[0].items.items[1].items.items[0].getValue(), // reference id
            start_number = data.items[0].items.items[0].items.items[1].items.items[1].getValue(), // stard number
            end_number = data.items[0].items.items[0].items.items[1].items.items[2].getValue(); // end number
        for (var i = 0, len = (end_number-start_number)+1; i < len; i++) {
            var number = start_number + i,
                reference_id =  reference_id_group+""+number;
            Giro_Check.add({cash_id:cash_id, reference_type:reference_type,reference_id:reference_id});
        }
        store.load();
    },
    onDelete:function(btn){
        var me = this, grid = btn.up('grid'), sm = grid.getSelectionModel(), length = sm.selected.items.length,
            selection = grid.getView().getSelectionModel().getSelection()[0],
            plugin = grid.editingPlugin, store = grid.store;
        plugin.cancelEdit();
        if (selection) {
            Ext.Msg.show({
                title: 'Please Confirm' + '...',
                msg: 'Are you sure want to delete' + ' ?',
                icon: Ext.MessageBox.QUESTION,
                buttons: Ext.Msg.YESNO,
                fn: function(btn){
                    if(btn == 'yes'){
                        store.remove(selection);
                        store.sync();
                        if (store.getCount() > 0) {
                            sm.select(0);
                        }
                    }
                }
            });

        }

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
