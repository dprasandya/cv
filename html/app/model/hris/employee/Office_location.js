
Ext.define('App.model.hris.employee.Office_location', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'ol_name', type:'string'},
        {name:'ol_city', type:'string'},
        {name:'ol_address', type:'string'},
        {name:'ol_zipcode', type:'string'},
        {name:'ol_tlp', type:'string'},
        {name:'sn_bio_finger', type:'string'},
        {name:'remarks', type:'string'},
        {name:'active', type:'bool'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Office_location.select,
            create: HRIS_Office_location.add,
            update: HRIS_Office_location.update,
            destroy: HRIS_Office_location.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});