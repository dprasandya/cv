
Ext.define('App.model.hris.leave.Leave_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'user_id', type:'integer'},
        {name:'seq_id', type:'integer'},
        {name:'lt_id', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'remarks', type:'string'},
        {name:'fromdate', type:'date'},
        {name:'todate', type:'date'},
        {name:'entitlement', type:'integer'},
        {name:'entitlement_pending', type:'integer'},
        {name:'entitlement_cancel', type:'integer'},
        {name:'entitlement_take', type:'integer'},
        {name:'status', type:'bool'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Leave_detail.select,
            create: HRIS_Leave_detail.add,
            update: HRIS_Leave_detail.update,
            destroy: HRIS_Leave_detail.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});