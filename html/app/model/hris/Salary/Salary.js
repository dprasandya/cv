
Ext.define('App.model.hris.Salary.Salary', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'company_id', type:'string'},
        {name:'period', type:'string'},
        {name:'sub_period', type:'integer'},
        {name:'js_name', type:'string'},
        {name:'ol_name', type:'string'},
        {name:'dept_name', type:'string'},
        {name:'pos_name', type:'string'},
        {name:'group_id', type:'string'},
        {name:'fromdate', type:'date'},
        {name:'todate', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Salary.select,
            create: HRIS_Salary.add
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});