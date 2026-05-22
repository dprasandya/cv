
Ext.define('App.model.transactions.general_ledger.JurnalAsset_recognition_sales', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'period', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'for_doc_id', type:'string'},
        {name:'unit_building_id', type:'string'},
        {name:'unit_building_name', type:'string'},
        {name:'area_m2', type:'float'},
        {name:'age_id', type:'float'},
        {name:'live_year', type:'float'},
        {name:'live_month', type:'float'},
        {name:'benefit_month', type:'float'},
        {name:'outstanding_month', type:'float'},
        {name:'total', type:'float'},
        {name:'depreciation_month', type:'float'},
        {name:'last_depreciation_date', type:'date'},
        {name:'coa_id', type:'string'},
        {name:'coa_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Asset_recognition_sales.select_jurnal,
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});