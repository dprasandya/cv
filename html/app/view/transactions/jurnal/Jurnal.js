
Ext.define('App.view.transactions.jurnal.Jurnal', {
    extend: 'App.ux.RenderPanel',
    id: 'panelJurnal',
    pageTitle: _('jurnal'),
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
                    {name:'coa_id', type:'string'},
                    {name:'coa_name', type:'string'},
                    {name:'debit', type:'float'},
                    {name:'credit', type:'float'},
                    {name:'remarks', type:'string'},
                    {name:'status', type:'string'},
                    {name:'useredit', type:'string'},
                    {name:'timeedit', type:'date'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: Jurnal.select,
                        create: Jurnal.add,
                        update: Jurnal.update,
                        destroy: Jurnal.delete
                    },
                    reader :{
                        root: 'rows',
                        totalProperty: 'totals'
                    },
                    autoLoad: true
                }
            });
        me.store = Ext.create('Ext.data.Store',{model: me.model ,remoteSort: true, autoLoad: true});
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            scrollable: true,
            title: _('jurnal'),
            columns: [
                {text: _('date'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('account'),width: 80,sortable: true,dataIndex: 'coa_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'coa_name',summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('debit'),width: 100,sortable: true,dataIndex: 'debit', align: 'right',renderer: Ext.util.Format.numberRenderer('0,000.00'),summaryType:'sum',
                    summaryRenderer : function(value, summaryData, dataIndex) {
                    var debit = Ext.util.Format.number(value, '0,000.00');
                    return '<span style="font-weight:bold;">' + debit + "</span>";
                }},
                {text: _('credit'),width: 100,sortable: true,dataIndex: 'credit', align: 'right',renderer: Ext.util.Format.numberRenderer('0,000.00'),summaryType:'sum', summaryRenderer : function(value, summaryData, dataIndex) {
                    var credit = Ext.util.Format.number(value, '0,000.00');
                    return '<span style="font-weight:bold;">' + credit + "</span>";
                }},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'status'}
            ],
            features: [{
                ftype: 'summary'
            }]
        });
        me.pageBody = [ me.grid ];
        me.callParent(arguments);
    },

    onActive: function(callback){
        this.store.load();
        callback(true);
    }
});
