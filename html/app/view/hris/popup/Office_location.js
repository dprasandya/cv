Ext.define('App.view.hris.popup.Office_location',
    {
        extend       : 'Ext.form.ComboBox',
        alias        : 'widget.xtol_type',
        initComponent : function()
        {
            var me = this;

            me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'ol_id', type:'string'},
                    {name:'ol_name', type:'string'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: HRIS_Office_location.popup
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
                valueField  : 'ol_id',
                displayField: 'ol_name',
                emptyText   : _('select'),
                store       : me.store
            }, null);

            me.callParent();
        }
    }
)