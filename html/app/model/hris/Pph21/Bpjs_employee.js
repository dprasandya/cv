
Ext.define('App.model.hris.Pph21.Bpjs_employee', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'bpjs_type', type:'string'},
        {name:'bpjs_id', type:'string'},
        {name:'bpjs_name', type:'string'},
        {name:'salary', type:'float'},
        {name:'sc_id_company', type:'string'},
        {name:'sc_name_company', type:'string'},
        {name:'nominal_company', type:'float'},
        {name:'sc_id_employee', type:'string'},
        {name:'sc_name_employee', type:'string'},
        {name:'nominal_employee', type:'float'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'company_id', type:'string'},
        {name:'company_name', type:'string'},
        {name:'dept_id', type:'string'},
        {name:'dept_name', type:'string'},
        {name:'js_id', type:'string'},
        {name:'js_name', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'ol_name', type:'string'},
        {name:'salary_calculation', type:'float'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Bpjs_employee.select,
            create: HRIS_Bpjs_employee.add,
            update: HRIS_Bpjs_employee.update,
            destroy: HRIS_Bpjs_employee.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});