
Ext.define('App.model.administration.Salary', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'string'},
        {name:'usrname', type:'string'},
        {name:'js_id', type:'string'},
        {name:'js_name', type:'string'},
        {name:'active', type:'bool'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_View_Salary.select,
            update: HRIS_View_Salary.update
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});