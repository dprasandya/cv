Ext.define('App.view.popup.CustomerSearch',
    {
        extend       : 'Ext.form.ComboBox',
        alias        : 'widget.customersearch',
        initComponent : function()
        {
            var me = this;

            me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'co_id', type:'string'},
                    {name:'cust_id', type:'string'},
                    {name:'cust_name', type:'string'},
                    {name:'identity_type', type:'string'},
                    {name:'cust_type', type:'string'},
                    {name:'gender', type:'string'},
                    {name:'blood_type', type:'string'},
                    {name:'religion', type:'string'},
                    {name:'merriage_status', type:'string'},
                    {name:'city', type:'string'},
                    {name:'nationality', type:'string'},
                    {name:'address', type:'string'},
                    {name:'contact', type:'string'},
                    {name:'npwp', type:'string'},
                    {name:'home_phone', type:'string'},
                    {name:'mobile_phone', type:'string'},
                    {name:'remarks', type:'string'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: Customer.LivePopup
                    },
                    reader :{
                        root: 'rows',
                        totalProperty: 'totals'
                    },
                    extraParams:{
                        field_name: 'status',
                        field_search: '1'
                    }
                }
            });
            me.store = Ext.create('Ext.data.Store', {
                model   : 'model',
                autoLoad: true
            });

            Ext.apply(this,
                {
                    store : me.store,
                    emptyText : 'search...',
                    valueField : 'cust_name',
                    typeAhead : false,
                    hideTrigger : true,
                    minChars : 1,
                    listConfig :
                    {
                        loadingText : 'searching...',
                        getInnerTpl : function()
                        {
                            return '<table width="100%">'+
                                '<tr>'+
                                '<td style="vertical-align:top;width:100%">'+
                                '<div><span style="font-weight:bold;">{name} {cust_name} </span><span style="float:right;color:blue">{cust_id}</span></div>'+
                                '</td>'+
                                '</tr>'+
                                '</table>';
                        }
                    },
                    listeners: {
                        scope: me,
                        select: me.gridclick,
                        itemdblclick: me.doucbleclick
                    },
                    pageSize : 10
                }, null);
            me.callParent();
        },
        gridclick: function(combo, records){
            var form = this.up('container'), container = form.up('container'),
                first_name = Ext.ComponentQuery.query('[name=first_name]', container)[0],
                identity_type = Ext.ComponentQuery.query('[name=identity_type]', container)[0],
                gender = Ext.ComponentQuery.query('[name=gender]', container)[0],
                blood_type = Ext.ComponentQuery.query('[name=blood_type]', container)[0],
                religion = Ext.ComponentQuery.query('[name=religion]', container)[0],
                merriage_status = Ext.ComponentQuery.query('[name=merriage_status]', container)[0],
                city = Ext.ComponentQuery.query('[name=city]', container)[0],
                nationality = Ext.ComponentQuery.query('[name=nationality]', container)[0],
                address = Ext.ComponentQuery.query('[name=address]', container)[0],
                contact = Ext.ComponentQuery.query('[name=contact]', container)[0],
                home_phone = Ext.ComponentQuery.query('[name=home_phone]', container)[0],
                mobile_phone = Ext.ComponentQuery.query('[name=mobile_phone]', container)[0];
            if(first_name){first_name.setValue(records[0].data.cust_name);}
            if(identity_type){identity_type.setValue(records[0].data.identity_type);}
            if(gender){gender.setValue(records[0].data.gender);}
            if(blood_type){blood_type.setValue(records[0].data.blood_type);}
            if(religion){religion.setValue(records[0].data.religion);}
            if(merriage_status){merriage_status.setValue(records[0].data.merriage_status);}
            if(city){city.setValue(records[0].data.city);}
            if(nationality){nationality.setValue(records[0].data.nationality);}
            if(address){address.setValue(records[0].data.address);}
            if(contact){contact.setValue(records[0].data.contact);}
            if(home_phone){home_phone.setValue(records[0].data.home_phone);}
            if(mobile_phone){mobile_phone.setValue(records[0].data.mobile_phone);}
            this.setValue(records[0].data.cust_id);
        },
        doucbleclick: function(grid, selected){
            var me = this;
            me.gridclick(grid, selected);
        },
    }
)