
Ext.define('App.model.hris.management_asset.Asset_type', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'asset_type', type:'string'},
        {name:'remarks', type:'string'},
        {name:'active', type:'bool'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Asset_type.select,
            create: HRIS_Asset_type.add,
            update: HRIS_Asset_type.update,
            destroy: HRIS_Asset_type.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});