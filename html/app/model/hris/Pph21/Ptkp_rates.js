
Ext.define('App.model.hris.Pph21.Ptkp_rates', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'amount_from', type:'float'},
        {name:'amount_to', type:'float'},
        {name:'rates_type', type:'string'},
        {name:'rates', type:'float'},
        {name:'active', type:'bool'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Pph21_Ptkp_rates.select,
            create: HRIS_Pph21_Ptkp_rates.add,
            update: HRIS_Pph21_Ptkp_rates.update,
            destroy: HRIS_Pph21_Ptkp_rates.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});