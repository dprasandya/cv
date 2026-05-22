
Ext.define('App.model.transactions.jurnal.Jurnal', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'debit', type:'float'},
        {name:'credit', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Jurnal.select,
            create: Jurnal.add,
            update: Jurnal.update,
            destroy: Jurnal.delete
        },
        extraParam:{
            doc_id: this.doc_id
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        },
        autoLoad: true
    }
});