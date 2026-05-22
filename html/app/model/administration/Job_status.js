
Ext.define('App.model.administration.Job_status', {
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
            read: HRIS_View_Job_status.select,
            update: HRIS_View_Job_status.update
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});