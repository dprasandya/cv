
Ext.define('App.model.hris.employee.Emp_Active_Chart', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'emp_company_id', type:'string'},
        {name:'emp_active', type:'integer'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Emp_Active_Chart.select
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});