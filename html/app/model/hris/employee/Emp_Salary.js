
Ext.define('App.model.hris.employee.Emp_Salary', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'sc_id', type:'string'},
        {name:'sc_name', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'pay_frequency', type:'string'},
        {name:'sc_type', type:'string'},
        {name:'amount', type:'float'},
        {name:'rate', type:'float'},
        {name:'rate_sc_id', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Emp_Salary.select,
            create: HRIS_Emp_Salary.add,
            update: HRIS_Emp_Salary.update,
            destroy: HRIS_Emp_Salary.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});