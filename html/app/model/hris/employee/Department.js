
Ext.define('App.model.hris.employee.Department', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'dept_id', type:'string'},
        {name:'dept_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'active', type:'bool'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Department.select,
            create: HRIS_Department.add,
            update: HRIS_Department.update,
            destroy: HRIS_Department.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});