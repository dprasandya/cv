
Ext.define('App.model.transactions.asset.Closing_Asset', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'seq_id', type:'integer'},
        {name:'for_doc_id', type:'string'},
        {name:'coa_revenue', type:'string'},
        {name:'coa_revenue_name', type:'string'},
        {name:'coa_id', type:'string'},
        {name:'coa_name', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'unit_building_id', type:'string'},
        {name:'unit_building_name', type:'string'},
        {name:'cash_id', type:'string'},
        {name:'cash_name', type:'string'},
        {name:'cflow_id', type:'string'},
        {name:'cflow_name', type:'string'},
        {name:'selling_price', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Closing_Asset.select,
            create: Closing_Asset.add,
            update: Closing_Asset.update,
            destroy: Closing_Asset.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});