Ext.define('App.view.hris.popup.Position',
    {
        extend       : 'Ext.form.ComboBox',
        alias        : 'widget.xtposition',
        initComponent : function()
        {
            var me = this;
            me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'pos_id', type:'string'},
                    {name:'pos_name', type:'string'},
                    {name:'dept_id', type:'string'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: HRIS_Position.popup
                    },
                    reader :{
                        root: 'rows',
                        totalProperty: 'totals'
                    }
                }
            });
            me.store = Ext.create('Ext.data.Store', {
                model   : 'model',
                autoLoad : true
            });
            Ext.apply(this, {
                editable    : false,
                queryMode   : 'local',
                valueField  : 'pos_id',
                displayField: 'pos_name',
                emptyText   : _('select'),
                store       : me.store
            }, null);

            me.callParent();
        }

    }
)