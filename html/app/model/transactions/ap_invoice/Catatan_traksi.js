
Ext.define('App.model.transactions.ap_invoice.Catatan_traksi', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'doc_date', type:'date'},
        {name:'doc_type', type:'string'},
        {name:'no_polisi', type:'string'},
        {name:'tujuan', type:'string'},
        {name:'waktu_penyelesaian', type:'float'},
        {name:'km', type:'float'},
        {name:'nama_sopir', type:'string'},
        {name:'pekerjaan_id', type:'string'},
        {name:'pekerjaan_nama', type:'string'},
        {name:'remarks', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Catatan_traksi.select,
            create: Catatan_traksi.add,
            update: Catatan_traksi.update,
            destroy: Catatan_traksi.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});