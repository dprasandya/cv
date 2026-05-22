
Ext.define('App.view.master.UnitBuilding', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('unit_building'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.model =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'co_id', type:'string'},
                {name:'unit_building_id', type:'string'},
                {name:'unit_building_name', type:'string'},
                {name:'floor_id', type:'string'},
                {name:'floor_name', type:'string'},
                {name:'building_id', type:'string'},
                {name:'building_name', type:'string'},
                {name:'project_id', type:'string'},
                {name:'project_name', type:'string'},
                {name:'cluster_id', type:'string'},
                {name:'cluster_name', type:'string'},
                {name:'facing_id', type:'string'},
                {name:'facing_name', type:'string'},
                {name:'rt_id', type:'string'},
                {name:'rt_name', type:'string'},
                {name:'block_id', type:'string'},
                {name:'block_name', type:'string'},
                {name:'area_m2', type:'float'},
                {name:'area_m2_revision', type:'float'},
                {name:'net_effective', type:'float'},
                {name:'price_m2', type:'float'},
                {name:'total', type:'float'},
                {name:'price_rent_m2', type:'float'},
                {name:'total_rent', type:'float'},
                {name:'room_rate', type:'float'},
                {name:'remarks', type:'string'},
                {name:'unit_building_status', type:'string'},
                {name:'rent_status', type:'string'},
                {name:'active', type:'bool'},
                {name:'userinput', type:'string'},
                {name:'useredit', type:'string'},
                {name:'timeedit', type:'date'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read: UnitBuilding.select,
                    create: UnitBuilding.add,
                    update: UnitBuilding.update,
                    destroy: UnitBuilding.delete
                },
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                }
            }
        });
        me.store = Ext.create('Ext.data.Store',{model: me.model ,remoteSort: true, autoLoad: true, groupField: 'project_id'});
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar'); me.data = record.data;
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                }
            },
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: _('unit'),
                                    defaultType: 'textfield',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'container',
                                            items: [
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    fieldLabel: _('project'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'projectcombo',
                                                            name: 'project_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('id'),
                                                            listeners:{
                                                                change: function(f){
                                                                    var plugin = me.grid.editingPlugin,
                                                                        cluster_id =  plugin.editor.form.findField('cluster_id'),
                                                                        facing_id = plugin.editor.form.findField('facing_id'),
                                                                        building_id = plugin.editor.form.findField('building_id'),
                                                                        block_id = plugin.editor.form.findField('block_id'),
                                                                        floor_id = plugin.editor.form.findField('floor_id');
                                                                    cluster_id.extraParams =[f.value]; facing_id.extraParams =[f.value]; floor_id.extraParams =[f.value];
                                                                    block_id.extraParams =[f.value]; building_id.extraParams =[{project_id:f.value, cluster_id:cluster_id.getValue()}];
                                                                    /*cluster_id.setValue('');
                                                                    facing_id.setValue('');
                                                                    floor_id.setValue('');
                                                                    block_id.setValue('');
                                                                    building_id.setValue('');*/
                                                                    me.project_id = f.value;
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
                                                    fieldLabel: _('id'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'textfield',
                                                            name: 'unit_building_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('id')
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'unit_building_name',
                                                            allowBlank: false,
                                                            emptyText: i18n('name')
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
                                                            fieldLabel: _('area')+' m2',
                                                            xtype: 'mitos.currency',
                                                            name: 'area_m2',
                                                            emptyText: i18n('area'),
                                                            enableKeyEvents: true,
                                                            listeners:{
                                                                keyup:function(field, e){
                                                                    me.get_total(field);
                                                                }
                                                            }
                                                        },
                                                        {
                                                            width: 200,
                                                            fieldLabel: _('revision_area')+' m2',
                                                            xtype: 'mitos.currency',
                                                            name: 'area_m2_revision',
                                                            emptyText: i18n('revision_area'),
                                                            enableKeyEvents: true
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
                                                    fieldLabel: _('price_sale'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'mitos.currency',
                                                            name: 'price_m2',
                                                            allowBlank: false,
                                                            emptyText: i18n('price_sale'),
                                                            enableKeyEvents: true,
                                                            listeners:{
                                                                keyup:function(field, e){
                                                                    me.get_total(field);
                                                                }
                                                            }
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'mitos.currency',
                                                            name: 'total',
                                                            readOnly: true,
                                                            emptyText: i18n('total'),
                                                            fieldStyle:'background-color: #F2F3F4; text-align:right; background-image: none;'
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
                                                    fieldLabel: _('price_rent'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'mitos.currency',
                                                            name: 'price_rent_m2',
                                                            allowBlank: false,
                                                            emptyText: i18n('price_rent'),
                                                            enableKeyEvents: true,
                                                            listeners:{
                                                                keyup:function(field, e){
                                                                    me.get_total(field);
                                                                }
                                                            }
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'mitos.currency',
                                                            name: 'total_rent',
                                                            readOnly: true,
                                                            emptyText: i18n('total'),
                                                            fieldStyle:'background-color: #F2F3F4; text-align:right; background-image: none;'
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
                                                    fieldLabel: _('room_rate'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'mitos.currency',
                                                            name: 'room_rate',
                                                            allowBlank: false,
                                                            emptyText: i18n('room_rate')
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
                                                            width: 230,
                                                            fieldLabel: _('room_status'),
                                                            xtype: 'xtroomstatuscombo',
                                                            name: 'rent_status',
                                                            emptyText: i18n('room_status')
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
                                                            name: 'active'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            items: [
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    fieldLabel: _('cluster'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtcluster',
                                                            name: 'cluster_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('id'),
                                                            listeners:{
                                                                change: function(f){
                                                                    var plugin = me.grid.editingPlugin,
                                                                        project_id =  plugin.editor.form.findField('project_id'),
                                                                        facing_id = plugin.editor.form.findField('facing_id'),
                                                                        building_id = plugin.editor.form.findField('building_id');
                                                                    facing_id.extraParams =[f.value]; building_id.extraParams =[{project_id:project_id.getValue(), cluster_id:f.value}];
                                                                    //facing_id.setValue('');
                                                                    //building_id.setValue('');
                                                                }
                                                            }
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'cluster_name',
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
                                                    fieldLabel: _('building_type'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtbuildingtype',
                                                            name: 'building_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('id')
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'building_name',
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
                                                    fieldLabel: _('floor'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtfloor',
                                                            name: 'floor_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('id')
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'floor_name',
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
                                                    fieldLabel: _('block'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtblock',
                                                            name: 'block_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('id')
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'block_name',
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
                                                    fieldLabel: _('facing'),
                                                    items: [
                                                        {
                                                            width: 120,
                                                            xtype: 'xtfacingcombo',
                                                            name: 'facing_id',
                                                            emptyText: i18n('facing'),
                                                            listeners: {
                                                                render: function(c){
                                                                    c.getEl().on({
                                                                        click: function() {
                                                                            c.store.load({params:{project_id:me.project_id}});
                                                                        }
                                                                    });
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
                                                    fieldLabel: _('room_type'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtroom_type',
                                                            name: 'rt_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('id')
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'rt_name',
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
                                                    fieldLabel: _('remarks'),
                                                    items: [
                                                        {
                                                            width: 380,
                                                            height: 50,
                                                            xtype: 'textarea',
                                                            style:{overflow:'auto'},
                                                            name: 'remarks',
                                                            emptyText: i18n('remarks'),
                                                            labelAlign: 'top'
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
                {text: _('project'),width: 80,sortable: true,dataIndex: 'project_name'},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'unit_building_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'unit_building_name'},
                //{text: _('area')+' m2',width: 80,sortable: true,dataIndex: 'area_m2', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('area')+' m2',width: 80,sortable: true,dataIndex: 'area_m2', align: 'right',renderer: Ext.util.Format.numberRenderer('0,000.00'),summaryType:'sum',
                    summaryRenderer : function(value, summaryData, dataIndex) {
                        var area_m2 = Ext.util.Format.number(value, '0,000.00');
                        return '<span style="font-weight:bold;">' + area_m2 + "</span>";
                    }},
                {text: _('price')+' m2',width: 80,sortable: true,dataIndex: 'price_m2', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('cluster'),width: 100,sortable: true,dataIndex: 'cluster_name'},
                {text: _('type'),width: 100,sortable: true,dataIndex: 'building_name'},
                {text: _('block'),width: 100,sortable: true,dataIndex: 'block_name'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('rent')+' Status',width: 80,sortable: true,dataIndex: 'rent_status'},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'active'}
            ],
            features: [{
                groupHeaderTpl: _('project')+' : {[values.rows[0].data.project_name]} - '+ _('net_effective')+' : {[values.rows[0].data.net_effective]} m2',
                ftype: 'groupingsummary'
            }],
            tbar: [
                {
                    xtype: 'button',
                    text: _('unit_building'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['project_name',_('project')],['unit_building_id',_('id')],['unit_building_name',_('name')],['cluster_name',_('cluster')],['floor_name',_('floor')],['building_name',_('building_type')],['area_m2',_('area')],['remarks',_('remarks')],['room_service',_('room_service')]],
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
    onNewUser: function(){
        var me = this;
        me.formEditing.cancelEdit();
        me.store.insert(0, {aktif: 1,authorized: 1});
        me.formEditing.startEdit(0, 0);
        me.formEditing.context.record.data.unit_building_status = 'UNSOLD';
    },
    get_total:function(field){
        var me=this, plugin = me.grid.editingPlugin,
            area_m2 = plugin.editor.form.findField('area_m2'),
            price_m2 = plugin.editor.form.findField('price_m2'),// harga
            total = plugin.editor.form.findField('total'), // total
            price_rent_m2 = plugin.editor.form.findField('price_rent_m2'),// harga
            total_rent = plugin.editor.form.findField('total_rent'); // total
        total.setValue(area_m2.getValue()*price_m2.getValue());
        total_rent.setValue(area_m2.getValue()*price_rent_m2.getValue());
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
