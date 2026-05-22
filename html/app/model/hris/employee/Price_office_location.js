
Ext.define('App.model.hris.employee.Price_office_location', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'ol_name', type:'string'},
        {name:'js_id', type:'string'},
        {name:'js_name', type:'string'},
        {name:'price', type:'float'},
        {name:'remarks', type:'string'},
        {name:'active', type:'bool'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Price_office_location.select,
            create: HRIS_Price_office_location.add,
            update: HRIS_Price_office_location.update,
            destroy: HRIS_Price_office_location.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});