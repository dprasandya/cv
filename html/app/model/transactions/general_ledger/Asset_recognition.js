
Ext.define('App.model.transactions.general_ledger.Asset_recognition', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'period', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'unit_building_id', type:'string'},
        {name:'unit_building_name', type:'string'},
        {name:'area_m2', type:'float'},
        {name:'qty', type:'float'},
        {name:'price', type:'float'},
        {name:'price_ppn', type:'float'},
        {name:'price_pph', type:'float'},
        {name:'total_price', type:'float'},
        {name:'total', type:'float'},
        {name:'net_effective', type:'float'},
        {name:'net_effective_outstanding', type:'float'},
        {name:'project_cost', type:'float'},
        {name:'cost_m2', type:'float'},
        {name:'cogs_value', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Asset_recognition.select,
            create: Asset_recognition.add,
            update: Asset_recognition.update
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});