
Ext.define('App.model.transactions.asset.Joining_Asset', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'seq_id', type:'integer'},
        {name:'coa_id', type:'string'},
        {name:'coa_name', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'unit_building_id', type:'string'},
        {name:'unit_building_name', type:'string'},
        {name:'vend_id', type:'string'},
        {name:'vend_name', type:'string'},
        {name:'total', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'bool'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Joining_Asset.select,
            create: Joining_Asset.add,
            update: Joining_Asset.update,
            destroy: Joining_Asset.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});