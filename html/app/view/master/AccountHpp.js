
Ext.define('App.view.master.AccountHpp', {
    extend: 'App.ux.RenderPanel',
    id: 'panelAccountHpp',
    pageTitle: 'Account HPP',
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'co_id', type:'string'},
                    {name:'coa_id', type:'string'},
                    {name:'coa_name', type:'string'},
                    {name:'coa_type', type:'string'},
                    {name:'coa_group', type:'string'},
                    {name:'station_type', type:'string'},
                    {name:'station_name', type:'string'},
                    {name:'station_group', type:'string'},
                    {name:'level', type:'integer'},
                    {name:'remarks', type:'string'},
                    {name:'active', type:'bool'},
                    {name:'userinput', type:'string'},
                    {name:'useredit', type:'string'},
                    {name:'timeedit', type:'date'}

                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: AccountHpp.select,
                    },
                    reader :{
                        root: 'rows',
                        totalProperty: 'totals'
                    }
                }
            });
            me.model_detail =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'co_id', type:'string'},
                    {name:'coa_id', type:'string'},
                    {name:'coa_name', type:'string'},
                    {name:'coa_type', type:'string'},
                    {name:'coa_group', type:'string'},
                    {name:'station_type', type:'string'},
                    {name:'station_name', type:'string'},
                    {name:'station_group', type:'string'},
                    {name:'level', type:'integer'},
                    {name:'remarks', type:'string'},
                    {name:'active', type:'bool'},
                    {name:'userinput', type:'string'},
                    {name:'useredit', type:'string'},
                    {name:'timeedit', type:'date'}

                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: AccountHpp.selectdetail
                    },
                    reader :{
                        root: 'rows',
                        totalProperty: 'totals'
                    }
                }
            });
        me.store = Ext.create('Ext.data.Store',{model: me.model ,remoteSort: true});
        me.store_detail = Ext.create('Ext.data.Store',{model: me.model_detail ,remoteSort: true});
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            height: 1000,
            title: _('detail'),
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'coa_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'coa_name'}
            ],
            /*tbar: [
                {
                    xtype: 'button',
                    text: _('detail'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewDetail
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['coa_id',_('id')],['coa_name',_('name')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_detail.proxy.extraParams = {field_name:me.field_name, field_search:field.value}; me.store_detail.load({params:{start:0}})}}}
                }
            ]*/
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    me.store_detail.proxy.extraParams = {station_name: record.data.station_name};
                    me.store_detail.load();
                }
            },
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    autoCancel:true,
                    items: [
                        {
                            xtype:'tabpanel',
                            items:[
                                {
                                    xtype: 'panel',
                                    title: 'Station Name',
                                    items: [
                                        {
                                            layout: 'hbox',
                                            items:[
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
                                                            fieldLabel: _('station'),
                                                            items: [
                                                                {
                                                                    xtype:'combo',
                                                                    editable: false,
                                                                    name: 'station_type',
                                                                    emptyText: 'Station',
                                                                    width:100,
                                                                    mode:'local',
                                                                    store: ['PKS','KEBUN'],
                                                                    listeners:{
                                                                        change:function(f){
                                                                            var cont = f.up('container'), station_name = cont.items.items[1], station_group = cont.items.items[2];
                                                                            cont.remove(station_name);cont.remove(station_group);
                                                                            if(f.value=='PKS'){
                                                                                cont.add({
                                                                                    xtype:'combo',
                                                                                    name: 'station_name',
                                                                                    emptyText: 'Station',
                                                                                    width:200,
                                                                                    mode:'local',
                                                                                    store:['Pengolahan PKS','Pemeliharaan PKS','Administrasi Kantor']
                                                                                });
                                                                                cont.add({xtype:'combo',
                                                                                    name: 'station_group',
                                                                                    emptyText: 'Station PKS',
                                                                                    width:120,
                                                                                    mode:'local',
                                                                                    store: [['S','PKS - S.Leading R'],['V','PKS - V.Sterilizer'],['T','PKS - Threser'],['B','PKS - Boiler'],['I','PKS - Klarifikasi'],['L','PKS - Kernel'],['H','PKS - Power House'],['W','PKS - Workshop'],['C','PKS - Limbah'],['N','PKS - Laboratorium'],['J','PKS-Sample Produk']]});
                                                                            }else if(f.value=='KEBUN'){
                                                                                cont.add({
                                                                                    xtype:'combo',
                                                                                    name: 'station_name',
                                                                                    emptyText: 'Station',
                                                                                    width:200,
                                                                                    mode:'local',
                                                                                    store:['Panen dan Pengumpulan','Pemeliharaan TM','Pemupukan','Administrasi Kantor Kebun']
                                                                                });
                                                                                cont.add({xtype:'combo',
                                                                                    name: 'station_group',
                                                                                    emptyText: 'Station PKS',
                                                                                    width:120,
                                                                                    hidden:true,
                                                                                    mode:'local',
                                                                                    store: []});
                                                                            }else{
                                                                                cont.add({
                                                                                    xtype:'combo',
                                                                                    name: 'station_name',
                                                                                    emptyText: 'Station',
                                                                                    width:200,
                                                                                    mode:'local',
                                                                                    store:['']
                                                                                });
                                                                                cont.add({xtype:'combo',
                                                                                    name: 'station_group',
                                                                                    emptyText: 'Station PKS',
                                                                                    width:120,
                                                                                    hidden:true,
                                                                                    mode:'local',
                                                                                    store: []});
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype:'combo',
                                                                    name: 'station_name',
                                                                    emptyText: 'Station',
                                                                    flex: 1,
                                                                    mode:'local'
                                                                },
                                                                {
                                                                    xtype:'combo',
                                                                    name: 'station_group',
                                                                    emptyText: 'Station PKS',
                                                                    width:120,
                                                                    mode:'local',
                                                                    store: [['S','PKS - S.Leading R'],['V','PKS - V.Sterilizer'],['T','PKS - Threser'],['B','PKS - Boiler'],['I','PKS - Klarifikasi'],['L','PKS - Kernel'],['H','PKS - Power House'],['W','PKS - Workshop'],['C','PKS - Limbah'],['N','PKS - Laboratorium'],['J','PKS-Sample Produk']]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }

                                       
                                    ]
                                },
                                me.grid_detail
                            ]
                        }
                       
                    ]
                })
            ],
             columns: [
                
                {text: 'Station Name',flex: 1,sortable: false,dataIndex: 'station_name'}
                
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['station_name','Station Name']],
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
        this.store.proxy.extraParams={};
        this.store.load();
        callback(true);
    }
});
