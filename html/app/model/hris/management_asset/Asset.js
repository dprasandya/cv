
Ext.define('App.model.hris.management_asset.Asset', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'asset_id', type:'string'},
        {name:'asset_name', type:'string'},
        {name:'asset_type', type:'string'},
        {name:'request_type', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'company_id', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'remarks', type:'string'},
        {name:'join_date', type:'date'},
        {name:'active', type:'bool'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Asset.select,
            create: HRIS_Asset.add,
            update: HRIS_Asset.update,
            destroy: HRIS_Asset.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});