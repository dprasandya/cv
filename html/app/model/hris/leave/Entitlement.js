
Ext.define('App.model.hris.leave.Entitlement', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'lt_id', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'fromdate', type:'date'},
        {name:'todate', type:'date'},
        {name:'entitlement', type:'integer'},
        {name:'active', type:'bool'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Lv_Entitlement.select,
            create: HRIS_Lv_Entitlement.add,
            update: HRIS_Lv_Entitlement.update,
            destroy: HRIS_Lv_Entitlement.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});