
Ext.define('App.model.hris.Pph21_simulation.Pph21_simulation_employee_salary', {
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
            read: HRIS_Pph21_simulation_employee_salary.select,
            create: HRIS_Pph21_simulation_employee_salary.add,
            update: HRIS_Pph21_simulation_employee_salary.update,
            destroy: HRIS_Pph21_simulation_employee_salary.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});