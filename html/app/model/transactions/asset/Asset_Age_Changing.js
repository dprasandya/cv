
Ext.define('App.model.transactions.asset.Asset_Age_Changing', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'seq_id', type:'integer'},
        {name:'for_doc_id', type:'string'},
        {name:'coa_id', type:'string'},
        {name:'coa_name', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'unit_building_id', type:'string'},
        {name:'unit_building_name', type:'string'},
        {name:'total', type:'float'},
        {name:'age_id_old', type:'string'},
        {name:'age_id_new', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'bool'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Asset_Age_Changing.select,
            create: Asset_Age_Changing.add,
            update: Asset_Age_Changing.update,
            destroy: Asset_Age_Changing.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});