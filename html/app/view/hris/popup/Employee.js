Ext.define('App.view.hris.popup.Employee',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtemployee',

        trigger1Cls: Ext.baseCSSPrefix + 'form-search-trigger',

        paramName : 'query',
        hasSearch : false,

        initComponent : function()
        {
            var me = this;

            me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'co_id', type:'string'},
                    {name:'emp_id', type:'string'},
                    {name:'emp_name', type:'string'},
                    {name:'emp_company_id', type:'string'},
                    {name:'ol_name', type:'string'},
                    {name:'pos_name', type:'string'},
                    {name:'emp_job_id', type:'string'},
                    {name:'emp_job_desc', type:'string'},
                    {name:'emp_salary', type:'string'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: HRIS_Employee.popup
                    },
                    extraParams:{
                        emp_job_id: me.extraParams
                    },
                    reader :{
                        root: 'rows',
                        totalProperty: 'totals'
                    }
                }
            });
            me.store = Ext.create('Ext.data.Store',{model: me.model ,remoteSort: true});
            // create the Grid
            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                height: 200,
                width: 610,
                title: _('employee'),
                listeners: {
                    scope: me,
                    select: me.gridclick,
                    itemdblclick: me.doucbleclick
                },
                columns: [
                    {text: _('company'),width: 60,sortable: true,dataIndex: 'emp_company_id'},
                    {text: _('id'),width: 80,sortable: true,dataIndex: 'emp_id'},
                    {text: _('name'),flex: 1,sortable: true,dataIndex: 'emp_name'},
                    {text: _('office_location'),flex: 1,sortable: true,dataIndex: 'ol_name'},
                    {text: _('position'),flex: 1,sortable: true,dataIndex: 'pos_name'},
                    {text: _('job_title'),width: 100,sortable: true,dataIndex: 'emp_job_desc'}
                ],
                tbar: [
                    {
                        xtype:'combo',
                        editable: false,
                        width:100,
                        mode:'local',
                        store: [['emp_company_id',_('company')],['emp_id',_('id')],['emp_name',_('name')],['ol_name',_('office_location')],['pos_name',_('position')],['emp_job_desc',_('job_title')]],
                        listeners:{change:function(){me.field_name=this.getValue();}}
                    },
                    {
                        xtype:'textfield',
                        emptyText: 'enter search key',
                        width:150,
                        listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                            me.store.proxy.extraParams ={field_name:me.field_name, field_search:field.value, emp_job_id:me.extraParams};
                            me.store.loadPage(1);}}
                        }
                    },
                    {
                        xtype: 'pagingtoolbar',
                        pageSize: 10,
                        store: me.store,
                        displayMsg: 'Diplay {0} - {1} Of {2}',
                        emptyMsg: 'No Record Found',
                        displayInfo: true
                    }
                ]
            });

            me.searchwin = Ext.create('App.ux.window.Window', {
                layout: 'fit',//border : false,
                items: [ me.grid ],
                buttons: [
                    {
                        text: 'Pilih',
                        cls: 'winSave',
                        handler : function(btn){
                            btn.up('window').close();
                        }
                    },
                    '-',
                    {
                        text: i18n('cancel'),
                        scope: me,
                        handler: me.btnCancelPressed
                    }
                ]
            });

            me.callParent(arguments);
            me.on('specialkey', function(f, e){
                if(e.getKey() == e.ENTER){
                    me.onTrigger1Click();
                }
            }, me);
        },
        onTrigger1Click : function(){
            var me = this;
            me.searchwin.show();
            //me.searchwin.showAt([me.getPosition()[0],me.getPosition()[1]+me.getHeight()]);
            if(me.extraParams==''){
                me.store.load();
            } else{
                me.store.load({params:{emp_job_id:me.extraParams}});
            }
            me.doComponentLayout();
        },
        gridclick: function(grid, selected){
            var form = this.up('container'), cont = form.up('container');
            var emp_spv_name = Ext.ComponentQuery.query('[name=emp_spv_name]', form)[0],
                emp_name = Ext.ComponentQuery.query('[name=emp_name]', form)[0],
                new_emp_name = Ext.ComponentQuery.query('[name=new_emp_name]', form)[0],
                salary = Ext.ComponentQuery.query('[name=salary]', cont)[0],
                company_id = Ext.ComponentQuery.query('[name=company_id_01]', form)[0];
            if(emp_spv_name){emp_spv_name.setValue(selected.data.emp_name);}
            if(emp_name){emp_name.setValue(selected.data.emp_name);}
            if(new_emp_name){new_emp_name.setValue(selected.data.emp_name);}
            if(salary){salary.setValue(selected.data.emp_salary);}
            if(company_id){
                form.items.items[2].setValue(selected.data.emp_company_id);
                //company_id.setValue(selected.data.emp_company_id);
            }
            this.setValue(selected.data.emp_id);
        },
        doucbleclick: function(grid, selected){
            var me = this;
            me.gridclick(grid, selected);
            me.searchwin.close();
        },

        btnCancelPressed : function(btn) {
            var me = this;
            this.reset();
            me.searchwin.close();
        }
    }
)