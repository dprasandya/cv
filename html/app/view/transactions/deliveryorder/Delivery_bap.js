Ext.define('App.view.transactions.deliveryorder.Delivery_bap', {
    extend: 'App.ux.RenderPanel',
    id: 'panelDelivery_bap',
    pageTitle: _('bap'),
    initComponent: function(){
        var me = this;
        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.deliveryorder.Delivery_bap',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.grid= Ext.create('Ext.grid.Panel', {
            store: me.store,
            autoScroll:false,
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            plugins: [
                me.edditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : false,
                    items: [
                        {
                            xtype:'panel',
                            layout: 'hbox',
                            items:[
                                {
                                    layout: 'hbox',
                                    items:[
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
                                                    items: [,
                                                        {
                                                            xtype: 'fieldcontainer',
                                                            layout: {
                                                                type: 'hbox'
                                                            },
                                                            fieldDefaults: {
                                                                labelAlign: 'right'
                                                            },
                                                            fieldLabel: _('address'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'textfield',
                                                                    name: 'city',
                                                                    readOnly: true,
                                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                                },
                                                                {
                                                                    width: 280,
                                                                    xtype: 'textfield',
                                                                    name: 'address',
                                                                    readOnly: true,
                                                                    emptyText: i18n('address'),
                                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
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
                                                            fieldLabel: _('trucking'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xtsupplier',
                                                                    editable: false,
                                                                    name: 'vend_id',
                                                                    allowblank: false,
                                                                    emptyText: i18n('id'),
                                                                    extraParams:'T'
                                                                },
                                                                {
                                                                    width: 280,
                                                                    xtype: 'textfield',
                                                                    name: 'vend_name',
                                                                    readOnly: true,
                                                                    emptyText: i18n('name'),
                                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
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
                                                            fieldLabel: 'Police No',
                                                            items: [
                                                                {
                                                                    width: 300,
                                                                    xtype: 'textfield',
                                                                    name: 'trucking_no',
                                                                    emptyText: 'Police No'
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
                                                            fieldLabel: 'Container',
                                                            items: [
                                                                {
                                                                    width: 300,
                                                                    xtype: 'textfield',
                                                                    name: 'container_no',
                                                                    emptyText: 'Container No'
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
                                                            fieldLabel: _('vessel_voyage'),
                                                            items: [
                                                                {
                                                                    width: 300,
                                                                    xtype: 'textfield',
                                                                    name: 'vessel_voyage',
                                                                    emptyText: i18n('vessel_voyage')
                                                                }
                                                            ]
                                                        },

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
                                                            fieldLabel: _('item'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'textfield',
                                                                    name: 'item_id',
                                                                    readOnly: true,
                                                                    emptyText: i18n('id'),
                                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                                },
                                                                {
                                                                    width: 198,
                                                                    xtype: 'textfield',
                                                                    readOnly: true,
                                                                    name: 'item_name',
                                                                    emptyText: i18n('name'),
                                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                                },
                                                                {
                                                                    width: 80,
                                                                    xtype: 'textfield',
                                                                    name: 'unit_id',
                                                                    readOnly: true,
                                                                    emptyText: i18n('unit'),
                                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
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
                                                            fieldLabel: _('quantity'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'mitos.currency',
                                                                    name: 'qty_do',
                                                                    readOnly: true,
                                                                    fieldStyle:'background-color: #F2F3F4; background-image: none; text-align:right;'
                                                                },
                                                                {
                                                                    width: 100,
                                                                    xtype: 'mitos.currency',
                                                                    name: 'qty_received'
                                                                },
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
                                                                    name: 'arrived_date',
                                                                    format : 'Y-m-d',
                                                                    maxValue : new Date(),
                                                                    emptyText: i18n('arrival_date')
                                                                },
                                                                {
                                                                    width: 100,
                                                                    xtype : 'datefield',
                                                                    editable: false,
                                                                    name: 'bap_date',
                                                                    format : 'Y-m-d',
                                                                    maxValue : new Date(),
                                                                    emptyText: i18n('bap_date')
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
                                                            fieldLabel: _('status'),
                                                            items: [
                                                                {
                                                                    xtype:'combo',
                                                                    editable: false,
                                                                    name: 'bap_status',
                                                                    width:200,
                                                                    mode:'local',
                                                                    store: [['O','On Going'],['R','Received on Destination'],['D','Delivered']]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
            ],
            columns: [
                {text: _('date'),width: 80,sortable: true,dataIndex: 'doc_date',renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('id'),width: 100,sortable: true,dataIndex: 'doc_id'},
                {text: _('salesorder'),width: 100,sortable: true,dataIndex: 'for_doc_id'},
                {text: _('customer'),flex: 1,sortable: true,dataIndex: 'cust_name'},
                {text: _('city'),width: 100,sortable: true,dataIndex: 'city'},
                {text: _('address'),flex: 1,sortable: true,dataIndex: 'address'},
                {text: _('quantity')+' Do',width: 80,sortable: true,dataIndex: 'qty_do', align:'right' ,renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('qty_received'),width: 80,sortable: true,dataIndex: 'qty_received', align:'right' ,renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('arrived_date'),width: 80,sortable: true,dataIndex: 'arrived_date', align:'right' ,renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('bap_date'),width: 80,sortable: true,dataIndex: 'bap_date', align:'right' ,renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('id')],['for_doc_id',_('salesorder')],['city',_('city')],['address',_('address')],['qty_do',_('quantity')+' Do'],['qty_received',_('qty_received')],['arrived_date',_('arrived_date')],['bap_date',_('bap_date')]],
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
        me.pageBody = [ me.grid ];
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
