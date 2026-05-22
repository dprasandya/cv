
Ext.define('App.model.hris.management_asset.Driver_using_history', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'asset_name', type:'string'},
        {name:'driver_name', type:'string'},
        {name:'request_date', type:'date'},
        {name:'time_in', type:'time'},
        {name:'time_out', type:'time'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Driver_using_history.select
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});