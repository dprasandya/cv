Ext.define('App.view.hris.popup.Type',
    {
        extend       : 'Ext.form.ComboBox',
        alias        : 'widget.xtlv_type',
        initComponent : function()
        {
            var me = this;

            me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'lt_id', type:'string'},
                    {name:'lt_name', type:'string'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: HRIS_Lv_Type.popup
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

            Ext.apply(this, {
                editable    : false,
                queryMode   : 'local',
                valueField  : 'lt_id',
                displayField: 'lt_name',
                emptyText   : _('select'),
                store       : me.store,
                listeners: {
                    beforequery: function(c) {
                        c.combo.store.load();
                    }
                }
            }, null);

            me.callParent();
        }
    }
)