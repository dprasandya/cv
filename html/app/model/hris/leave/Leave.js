
Ext.define('App.model.hris.leave.Leave', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'user_id', type:'integer'},
        {name:'lt_id', type:'string'},
        {name:'lt_name', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'ol_name', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'fromdate', type:'date'},
        {name:'todate', type:'date'},
        {name:'entitlement', type:'integer'},
        {name:'entitlement_take', type:'integer'},
        {name:'entitlement_cancel', type:'integer'},
        {name:'entitlement_pending', type:'integer'},
        {name:'outstanding_entitlement', type:'integer'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Leave.select,
            create: HRIS_Leave.add,
            update: HRIS_Leave.update,
            destroy: HRIS_Leave.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});