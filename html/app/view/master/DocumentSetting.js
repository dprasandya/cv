
Ext.define('App.view.master.DocumentSetting', {
    extend: 'App.ux.RenderPanel',
    id: 'panelDocumentSetting',
    pageTitle: _('document_setting'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.model =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'co_id', type:'string'},
                {name:'module', type:'string'},
                {name:'table_name', type:'string'},
                {name:'limit', type:'float'},
                {name:'doc_name', type:'string'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read: DocumentSetting.select,
                    update: DocumentSetting.update
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
                    errorSummary : false
                })
            ],
            columns: [
                {text: _('modules'),width: 120,sortable: true,dataIndex: 'module'},
                {text: _('table'),flex: 1,sortable: true,dataIndex: 'table_name'},
                {text: 'Doc Name',width: 100,sortable: true,dataIndex: 'doc_name',editor: {
                    xtype:'textfield',
                    allowBlank:false,
                    maxLength : 5
                }},
                {text: 'Limit',width: 100,sortable: true,dataIndex: 'limit', align:'right',editor: {
                    xtype:'mitos.currency',
                    allowBlank:false,
                    maxValue : 5
                }}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['module',_('modules')],['table_name',_('table')],['doc_name','Doc Name'],['limit','Limit']],
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
