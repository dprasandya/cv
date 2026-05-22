
Ext.define('App.model.administration.Company', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'string'},
        {name:'usrname', type:'string'},
        {name:'company_id', type:'string'},
        {name:'company_name', type:'string'},
        {name:'active', type:'bool'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_View_Company.select,
            create: HRIS_View_Company.add,
            update: HRIS_View_Company.update,
            destroy: HRIS_View_Company.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});