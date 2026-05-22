
Ext.define('App.model.transactions.stock.Stock_out', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'warehouse_id', type:'string'},
        {name:'warehouse_name', type:'string'},
        {name:'project_type', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'qty', type:'float'},
        {name:'total', type:'float'},
        {name:'afdeling_id', type:'string'},
        {name:'afdeling_name', type:'string'},
        {name:'doc_id_rm', type:'string'},
        {name:'category', type:'string'},
        {name:'station_id', type:'string'},
        {name:'remarks', type:'string'},
        {name:'kendaraan_id', type:'string'},
        {name:'jam_mulai', type:'time'},
        {name:'jam_selesai', type:'time'},
        {name:'km_mulai', type:'float'},
        {name:'km_selesai', type:'float'},
        {name:'traksi_type', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Stock_out.select,
            create: Stock_out.add,
            update: Stock_out.update,
            destroy: Stock_out.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});