
Ext.define('App.model.hris.Salary.Salary_correction', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'company_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'ol_id', type:'string'},
        {name:'ol_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'amount', type:'float'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeinput', type:'date'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Salary_correction.select,
            create: HRIS_Salary_correction.add,
            update: HRIS_Salary_correction.update,
            destroy: HRIS_Salary_correction.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});