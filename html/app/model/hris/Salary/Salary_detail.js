
Ext.define('App.model.hris.Salary.Salary_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'sc_id', type:'string'},
        {name:'sc_name', type:'string'},
        {name:'sc_type', type:'string'},
        {name:'pay_frequency', type:'string'},
        {name:'total_index', type:'float'},
        {name:'amount', type:'float'},
        {name:'total_amount', type:'float'},
        {name:'fromdate', type:'date'},
        {name:'todate', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Salary.select_detail
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});