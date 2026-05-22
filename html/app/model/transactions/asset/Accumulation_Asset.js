
Ext.define('App.model.transactions.asset.Accumulation_Asset', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'seq_id', type:'integer'},
        {name:'vend_id', type:'string'},
        {name:'vend_name', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'unit_building_id', type:'string'},
        {name:'unit_building_name', type:'string'},
        {name:'afdeling_id', type:'string'},
        {name:'afdeling_name', type:'string'},
        {name:'coa_id', type:'string'},
        {name:'coa_name', type:'string'},
        {name:'total', type:'float'},
        {name:'age_id', type:'string'},
        {name:'live_year', type:'float'},
        {name:'live_month', type:'float'},
        {name:'benefit_month', type:'float'},
        {name:'outstanding_month', type:'float'},
        {name:'depreciation_month', type:'float'},
        {name:'last_depreciation_date', type:'date'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Accumulation_Asset.select,
            create: Accumulation_Asset.add,
            update: Accumulation_Asset.update,
            destroy: Accumulation_Asset.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});