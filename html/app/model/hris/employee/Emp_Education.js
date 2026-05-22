
Ext.define('App.model.hris.employee.Emp_Education', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'emp_id', type:'string'},
        {name:'level', type:'string'},
        {name:'institution', type:'string'},
        {name:'majors', type:'string'},
        {name:'join_year', type:'integer'},
        {name:'score', type:'float'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Emp_Education.select,
            create: HRIS_Emp_Education.add,
            update: HRIS_Emp_Education.update,
            destroy: HRIS_Emp_Education.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});