
Ext.define('App.model.hris.employee.Salary_type_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'st_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'from_rate', type:'float'},
        {name:'to_rate', type:'float'},
        {name:'remarks', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Salary_type.select_detail,
            create: HRIS_Salary_type.add_detail,
            update: HRIS_Salary_type.update_detail,
            destroy: HRIS_Salary_type.delete_detail
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});