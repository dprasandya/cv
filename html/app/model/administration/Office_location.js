
Ext.define('App.model.administration.Office_location', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'string'},
        {name:'usrname', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'ol_name', type:'string'},
        {name:'active', type:'bool'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_View_Office_location.select,
            create: HRIS_View_Office_location.add,
            update: HRIS_View_Office_location.update,
            destroy: HRIS_View_Office_location.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});