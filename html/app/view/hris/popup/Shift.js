Ext.define('App.view.hris.popup.Shift',
    {
        extend       : 'Ext.form.ComboBox',
        alias        : 'widget.xtshift',
        initComponent : function()
        {
            var me = this;

            me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'seq_id', type:'integer'},
                    {name:'shift', type:'string'},
                    {name:'time_in', type:'time'},
                    {name:'time_out', type:'time'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: HRIS_Shift.select
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
                valueField  : 'shift',
                displayField: 'shift',
                emptyText   : _('select'),
                store       : me.store
            }, null);

            me.callParent();
        }
    }
)