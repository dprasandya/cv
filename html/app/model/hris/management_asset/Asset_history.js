
Ext.define('App.model.hris.management_asset.Asset_history', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'asset_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'asset_name', type:'string'},
        {name:'asset_type', type:'string'},
        {name:'request_type', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'company_id', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'remarks', type:'string'},
        {name:'start_date', type:'date'},
        {name:'end_date', type:'date'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Asset_history.select
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});