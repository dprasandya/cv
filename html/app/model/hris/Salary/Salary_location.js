
Ext.define('App.model.hris.Salary.Salary_location', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'ol_id', type:'string'},
        {name:'ol_name', type:'string'},
        {name:'js_id', type:'string'},
        {name:'js_name', type:'string'},
        {name:'company_id', type:'string'},
        {name:'group_id', type:'string'},
        {name:'qty', type:'float'},
        {name:'price', type:'float'},
        {name:'total', type:'float'},
        {name:'status', type:'bool'},
        {name:'time_in', type:'time'},
        {name:'time_out', type:'time'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Salary_location.select,
            create: HRIS_Salary_location.add,
            update: HRIS_Salary_location.update
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});