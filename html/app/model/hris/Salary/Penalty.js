
Ext.define('App.model.hris.Salary.Penalty', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'company_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'ol_id', type:'string'},
        {name:'ol_name', type:'string'},
        {name:'js_id', type:'string'},
        {name:'js_name', type:'string'},
        {name:'afdeling_id', type:'string'},
        {name:'afdeling_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'nominal', type:'float'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeinput', type:'date'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Penalty.select,
            update: HRIS_Penalty.update
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});