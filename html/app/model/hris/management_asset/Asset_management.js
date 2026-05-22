
Ext.define('App.model.hris.management_asset.Asset_management', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'asset_type', type:'string'},
        {name:'driver_id', type:'string'},
        {name:'driver_name', type:'string'},
        {name:'asset_id', type:'string'},
        {name:'asset_name', type:'string'},
        {name:'request_date', type:'date'},
        {name:'time_in', type:'time'},
        {name:'time_out', type:'time'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Asset_management.select,
            create: HRIS_Asset_management.add,
            update: HRIS_Asset_management.update,
            destroy: HRIS_Asset_management.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});