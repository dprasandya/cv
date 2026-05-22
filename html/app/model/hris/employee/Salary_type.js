
Ext.define('App.model.hris.employee.Salary_type', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'st_id', type:'string'},
        {name:'st_name', type:'string'},
        {name:'st_rate', type:'float'},
        {name:'remarks', type:'string'},
        {name:'active', type:'bool'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Salary_type.select,
            create: HRIS_Salary_type.add,
            update: HRIS_Salary_type.update,
            destroy: HRIS_Salary_type.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});