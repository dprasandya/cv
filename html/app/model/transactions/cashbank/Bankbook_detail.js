
Ext.define('App.model.transactions.cashbank.Bankbook_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'doc_id', type:'string'},
        {name:'costcode_id', type:'string'},
        {name:'costcode_name', type:'string'},
        {name:'coa_id', type:'string'},
        {name:'coa_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'nominal', type:'float'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Bankbook.selectdetail,
            create: Bankbook.adddetail,
            update: Bankbook.updatedetail,
            destroy: Bankbook.deletedetail
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        },
        autoLoad: true
    }
});