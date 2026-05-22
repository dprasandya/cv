
Ext.define('App.model.hris.employee.Company', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'company_id', type:'string'},
        {name:'company_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'active', type:'bool'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Company.select,
            create: HRIS_Company.add,
            update: HRIS_Company.update,
            destroy: HRIS_Company.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});