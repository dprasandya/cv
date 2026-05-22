
Ext.define('App.model.transactions.marketing.Registration', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'registration_id', type:'integer'},
        {name:'first_name', type:'string'},
        {name:'last_name', type:'string'},
        {name:'full_name', type:'string'},
        {name:'identity_type', type:'string'},
        {name:'identity_no', type:'string'},
        {name:'identity_no_old', type:'string'},
        {name:'religion', type:'string'},
        {name:'merriage_status', type:'string'},
        {name:'blood_type', type:'string'},
        {name:'address', type:'string'},
        {name:'city', type:'string'},
        {name:'nationality', type:'string'},
        {name:'gender', type:'string'},
        {name:'home_phone', type:'string'},
        {name:'mobile_phone', type:'string'},
        {name:'sales_id', type:'string'},
        {name:'sales_name', type:'string'},
        {name:'cust_id', type:'string'},
        {name:'cust_name', type:'string'},
        {name:'cust_contact', type:'string'},
        {name:'cust_npwp', type:'string'},
        {name:'phone', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Registration.select,
            create: Registration.add,
            update: Registration.update,
            destroy: Registration.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});