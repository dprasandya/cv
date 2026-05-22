
Ext.define('App.model.hris.Salary.Bonus', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'company_id', type:'string'},
        {name:'period', type:'string'},
        {name:'sub_period', type:'integer'},
        {name:'sc_id', type:'string'},
        {name:'sc_name', type:'string'},
        {name:'js_id', type:'string'},
        {name:'js_name', type:'string'},
        {name:'nominal', type:'float'},
        {name:'userinput', type:'string'},
        {name:'timeinput', type:'date'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Bonus.select
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});