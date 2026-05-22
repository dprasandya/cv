
Ext.define('App.view.transactions.purchase_order.Approved_Purchase_order', {
    extend: 'App.ux.RenderPanel',
    id: 'panelApproved_Purchase_order',
    pageTitle: _('approved_purchase_order'),
    initComponent: function(){
        var me = this;
        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.model =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'co_id', type:'string'},
                {name:'doc_id', type:'string'},
                {name:'doc_date', type:'date'},
                {name:'approved_date', type:'date'},
                {name:'requester', type:'string'},
                {name:'department_id', type:'string'},
                {name:'vend_id', type:'string'},
                {name:'vend_name', type:'string'},
                {name:'project_id', type:'string'},
                {name:'project_name', type:'string'},
                {name:'remarks', type:'string'},
                {name:'status', type:'bool'},
                {name:'useredit', type:'string'},
                {name:'timeedit', type:'date'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read: Approved_Purchase_order.select,
                    update: Approved_Purchase_order.update
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
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'status',renderer: me.boolRenderer,
                    dataIndex: 'status',
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
                {text: _('project'),width: 100,sortable: true,dataIndex: 'project_name'},
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('supplier'),width: 150,sortable: true,dataIndex: 'vend_name'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks', editor:{
                    xtype:'textfield'
                }},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['project_name',_('project')],['doc_id',_('document')],['vend_name',_('supplier')],['remarks',_('remarks')]],
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
