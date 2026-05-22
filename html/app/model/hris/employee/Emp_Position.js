
Ext.define('App.model.hris.employee.Emp_Position', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'emp_id', type:'string'},
        {name:'start_date', type:'date'},
        {name:'end_date', type:'date'},
        {name:'job_id', type:'string'},
        {name:'js_id', type:'string'},
        {name:'dept_id', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'company_id', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Emp_Position.select,
            create: HRIS_Emp_Position.add,
            update: HRIS_Emp_Position.update,
            destroy: HRIS_Emp_Position.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});