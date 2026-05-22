Ext.define('App.view.popup.WarehouseCombo',
    {
        extend       : 'Ext.form.ComboBox',
        alias        : 'widget.warehousecombo',
        initComponent : function()
        {
            var me = this;

            me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'warehouse_id', type:'string'},
                    {name:'warehouse_name', type:'string'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: Warehouse.popup
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

            Ext.apply(this, {
                editable    : false,
                queryMode   : 'local',
                valueField  : 'warehouse_id',
                displayField: 'warehouse_name',
                emptyText   : _('warehouse'),
                store       : me.store,
                listeners: {
                    beforequery: function(c) {
                        console.log(c.combo.extraParams);
                        c.combo.store.load({params:{warehouse_type:c.combo.extraParams}});
                    }
                }
            }, null);

            me.callParent();
        }
    }
)