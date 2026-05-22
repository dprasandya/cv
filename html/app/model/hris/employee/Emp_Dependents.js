
Ext.define('App.model.hris.employee.Emp_Dependents', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'emp_id', type:'string'},
        {name:'contact_name', type:'string'},
        {name:'contact_status', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Emp_Dependents.select,
            create: HRIS_Emp_Dependents.add,
            update: HRIS_Emp_Dependents.update,
            destroy: HRIS_Emp_Dependents.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});