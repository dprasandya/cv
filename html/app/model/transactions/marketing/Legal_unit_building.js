
Ext.define('App.model.transactions.marketing.Legal_unit_building', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'unit_building_id', type:'string'},
        {name:'unit_building_name', type:'string'},
        {name:'legal_id', type:'string'},
        {name:'legal_name', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'doc_no', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'bool'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Legal_unit_building.select,
            create: Legal_unit_building.add,
            update: Legal_unit_building.update,
            destroy: Legal_unit_building.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});