
Ext.define('App.model.master.Customer', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'cust_id', type:'string'},
        {name:'cust_name', type:'string'},
        {name:'contact', type:'string'},
        {name:'tlp', type:'integer'},
        {name:'city', type:'string'},
        {name:'address', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timedit', type:'date'}

    ],
    proxy:{
        type:'direct',
        api:{
            read: Customer.select,
            create: Customer.add,
            update: Customer.update,
            destroy: Customer.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});