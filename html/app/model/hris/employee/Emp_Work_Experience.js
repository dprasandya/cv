
Ext.define('App.model.hris.employee.Emp_Work_Experience', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'emp_id', type:'string'},
        {name:'company_name', type:'string'},
        {name:'company_desc', type:'string'},
        {name:'job_id', type:'string'},
        {name:'job_desc', type:'string'},
        {name:'dept_id', type:'string'},
        {name:'dept_name', type:'string'},
        {name:'first_date', type:'date'},
        {name:'end_date', type:'date'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Emp_Work_Experience.select,
            create: HRIS_Emp_Work_Experience.add,
            update: HRIS_Emp_Work_Experience.update,
            destroy: HRIS_Emp_Work_Experience.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});