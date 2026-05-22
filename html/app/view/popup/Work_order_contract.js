Ext.define('App.view.popup.Work_order_contract',
    {
        extend       : 'Ext.form.ComboBox',
        alias        : 'widget.xtworkordercontact',
        initComponent : function()
        {
            var me = this;

            me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'co_id', type:'string'},
                    {name:'contract_no', type:'string'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: Work_order.ContractNoPopup
                    },
                    reader :{
                        root: 'rows',
                        totalProperty: 'totals'
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
                    displayField : 'contract_no',
                    valueField : 'contract_no',
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
                                '<div><span>{name} {contract_no} </span></div>'+
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
            console.log(combo, records);
            this.setValue(records[0].data.contract_no);
        },
        doucbleclick: function(grid, selected){
            var me = this;
            me.gridclick(grid, selected);
        },
    }
)