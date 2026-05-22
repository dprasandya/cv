
Ext.define('App.model.hris.Salary.Thr', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'period', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'company_id', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'ol_name', type:'string'},
        {name:'company_id', type:'string'},
        {name:'company_name', type:'string'},
        {name:'closed_date', type:'date'},
        {name:'join_date', type:'date'},
        {name:'count_days', type:'float'},
        {name:'count_months', type:'float'},
        {name:'js_id', type:'string'},
        {name:'js_name', type:'string'},
        {name:'salary', type:'float'},
        {name:'thr_amount', type:'float'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Thr.select,
            create: HRIS_Thr.add
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});