
Ext.define('App.model.hris.employee.Emp_Report_Spv', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_spv_id', type:'string'},
        {name:'emp_spv_name', type:'string'},
        {name:'reporting_method', type:'string'},
        {name:'approval_method', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Emp_Report_Spv.select,
            create: HRIS_Emp_Report_Spv.add,
            update: HRIS_Emp_Report_Spv.update,
            destroy: HRIS_Emp_Report_Spv.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});