
Ext.define('App.model.hris.employee.Emp_Historical_Salary', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'emp_id', type:'string'},
        {name:'sc_id', type:'string'},
        {name:'sc_name', type:'string'},
        {name:'sc_type', type:'string'},
        {name:'amount_old', type:'float'},
        {name:'amount_new', type:'float'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Emp_Salary.select_historical
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});