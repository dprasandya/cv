
Ext.define('App.model.hris.management_asset.Asset_mutation', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'asset_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'old_asset_name', type:'string'},
        {name:'old_asset_type', type:'string'},
        {name:'old_request_type', type:'string'},
        {name:'old_emp_id', type:'string'},
        {name:'old_emp_name', type:'string'},
        {name:'old_company_id', type:'string'},
        {name:'old_ol_id', type:'string'},
        {name:'new_asset_name', type:'string'},
        {name:'new_asset_type', type:'string'},
        {name:'new_request_type', type:'string'},
        {name:'new_emp_id', type:'string'},
        {name:'new_emp_name', type:'string'},
        {name:'new_company_id', type:'string'},
        {name:'new_ol_id', type:'string'},
        {name:'new_join_date', type:'date'},
        {name:'remarks', type:'string'},
        {name:'status', type:'bool'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Asset_mutation.select,
            create: HRIS_Asset_mutation.add,
            update: HRIS_Asset_mutation.update,
            destroy: HRIS_Asset_mutation.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});