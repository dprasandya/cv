
Ext.define('App.model.hris.employee.Emp_Training', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'emp_id', type:'string'},
        {name:'start_date', type:'date'},
        {name:'end_date', type:'date'},
        {name:'training_name', type:'string'},
        {name:'institution', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Emp_Training.select,
            create: HRIS_Emp_Training.add,
            update: HRIS_Emp_Training.update,
            destroy: HRIS_Emp_Training.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});