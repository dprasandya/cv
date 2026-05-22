
Ext.define('App.model.transactions.row_land_management.Bankbook_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'doc_id', type:'string'},
        {name:'costcode_id', type:'string'},
        {name:'costcode_name', type:'string'},
        {name:'location_rlm', type:'string'},
        {name:'owner_rlm', type:'string'},
        {name:'area_rlm', type:'float'},
        {name:'numberletters_rlm', type:'string'},
        {name:'management_rlm', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'nominal', type:'float'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Bankbook.selectdetail,
            create: Bankbook.adddetail_rlm,
            update: Bankbook.updatedetail_rlm,
            destroy: Bankbook.deletedetail
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        },
        autoLoad: true
    }
});