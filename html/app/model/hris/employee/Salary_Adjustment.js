
Ext.define('App.model.hris.employee.Salary_Adjustment', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'group_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'company_id', type:'string'},
        {name:'company_name', type:'string'},
        {name:'js_id', type:'string'},
        {name:'js_name', type:'string'},
        {name:'job_id', type:'string'},
        {name:'job_name', type:'string'},
        {name:'sc_id', type:'string'},
        {name:'sc_name', type:'string'},
        {name:'sc_type', type:'string'},
        {name:'pos_name', type:'string'},
        {name:'profile_name', type:'string'},
        {name:'amount_old', type:'float'},
        {name:'amount_new', type:'float'},
        {name:'nominal_01', type:'float'},
        {name:'status', type:'bool'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Salary_Adjustment.select,
            update: HRIS_Salary_Adjustment.update
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});