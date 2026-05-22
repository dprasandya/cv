
Ext.define('App.model.hris.Pph21.Ptkp', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'ptkp_id', type:'string'},
        {name:'ptkp_name', type:'string'},
        {name:'wp_personal', type:'float'},
        {name:'wp_additional', type:'float'},
        {name:'wp_total', type:'float'},
        {name:'active', type:'bool'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Pph21_Ptkp.select,
            create: HRIS_Pph21_Ptkp.add,
            update: HRIS_Pph21_Ptkp.update,
            destroy: HRIS_Pph21_Ptkp.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});