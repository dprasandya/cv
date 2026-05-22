Ext.define('App.view.administration.Users', {
    extend: 'App.ux.RenderPanel',
    requires: [
        'App.ux.form.fields.plugin.PasswordStrength'
    ],
    pageTitle: _('users'),
    itemId: 'AdminUsersPanel',
    initComponent: function(){
        var me = this;
        me.userStore = Ext.create('App.store.administration.User', {
            remoteSort: true,
            autoSync: false
        });
        function authCk(val){
            if(val == '1'){
                return '<img src="resources/images/icons/yes.gif" />';
            }else if(val == '0'){
                return '<img src="resources/images/icons/no.gif" />';
            }
            return val;
        }
        me.store_office_location = Ext.create('App.store.administration.Office_location',{remoteSort: false, pageSize : 99999, autoLoad: false});
        me.store_company = Ext.create('App.store.administration.Company',{remoteSort: false, pageSize : 99999, autoLoad: false});
        me.store_job_status = Ext.create('App.store.administration.Job_status',{remoteSort: false, pageSize : 99999, autoLoad: false});
        me.store_salary = Ext.create('App.store.administration.Salary',{remoteSort: false, pageSize : 99999, autoLoad: false});


        me.grid_office_location = Ext.create('Ext.grid.Panel', {
            store: me.store_office_location,
            viewConfig :
                {
                    stripeRows: false,
                    getRowClass: function(record, index) {
                        return record.get('active') == '1' ? 'child-row' :  'grown-row';
                    }
                },
            /*plugins: [
                me.edditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false
                })
            ],*/
            selModel :  Ext.create( 'Ext.selection.CheckboxModel', {
                checkOnly: true,
                listeners: {
                    deselect: function(model, record, index) {
                        record.set('active', false);
                        HRIS_View_Office_location.update(record.data, function(provider, response){
                        });
                    },
                    select: function(model, record, index) {
                        record.set('active', true);
                        HRIS_View_Office_location.update(record.data, function(provider, response){
                        });
                    }
                }
            }),
            columns: [
                {text: 'active',width: 50,sortable: true,dataIndex: 'active',renderer: authCk},
                {text: _('id'),width: 100,sortable: true,dataIndex: 'ol_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'ol_name'}
                /*{text: _('active'),width: 60,sortable: true,renderer: me.boolRenderer,
                    dataIndex: 'active',
                    editor:{
                        xtype:'checkbox'
                    }}*/
            ]
        });
        me.grid_company = Ext.create('Ext.grid.Panel', {
            store: me.store_company,
            viewConfig :
                {
                    stripeRows: false,
                    getRowClass: function(record, index) {
                        return record.get('active') == '1' ? 'child-row' :  'grown-row';
                    }
                },
            /*plugins: [
                me.edditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false
                })
            ],*/
            selModel :  Ext.create( 'Ext.selection.CheckboxModel', {
                checkOnly: true,
                listeners: {
                    deselect: function(model, record, index) {
                        record.set('active', false);
                        HRIS_View_Company.update(record.data, function(provider, response){
                        });
                    },
                    select: function(model, record, index) {
                        record.set('active', true);
                        HRIS_View_Company.update(record.data, function(provider, response){
                        });
                    }
                }
            }),
            columns: [
                {text: 'active',width: 50,sortable: true,dataIndex: 'active',renderer: authCk},
                {text: _('id'),width: 100,sortable: true,dataIndex: 'company_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'company_name'}
                /*{text: _('active'),width: 60,sortable: true,renderer: me.boolRenderer,
                    dataIndex: 'active',
                    editor:{
                        xtype:'checkbox'
                    }}*/
            ]
        });
        me.grid_job_status = Ext.create('Ext.grid.Panel', {
            store: me.store_job_status,
            viewConfig :
                {
                    stripeRows: false,
                    getRowClass: function(record, index) {
                        return record.get('active') == '1' ? 'child-row' :  'grown-row';
                    }
                },
            /*plugins: [
                me.edditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false
                })
            ],*/
            selModel :  Ext.create( 'Ext.selection.CheckboxModel', {
                checkOnly: true,
                listeners: {
                    deselect: function(model, record, index) {
                        record.set('active', false);
                        HRIS_View_Job_status.update(record.data, function(provider, response){
                        });
                    },
                    select: function(model, record, index) {
                        record.set('active', true);
                        HRIS_View_Job_status.update(record.data, function(provider, response){
                        });
                    }
                }
            }),
            columns: [
                {text: 'active',width: 50,sortable: true,dataIndex: 'active',renderer: authCk},
                {text: _('id'),width: 100,sortable: true,dataIndex: 'js_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'js_name'}
                /*{text: _('active'),width: 60,sortable: true,renderer: me.boolRenderer,
                    dataIndex: 'active',
                    editor:{
                        xtype:'checkbox'
                    }}*/
            ]
        });
        me.grid_salary = Ext.create('Ext.grid.Panel', {
            store: me.store_salary,
            viewConfig :
                {
                    stripeRows: false,
                    getRowClass: function(record, index) {
                        return record.get('active') == '1' ? 'child-row' :  'grown-row';
                    }
                },
            /*plugins: [
                me.edditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false
                })
            ],*/
            selModel :  Ext.create( 'Ext.selection.CheckboxModel', {
                checkOnly: true,
                listeners: {
                    deselect: function(model, record, index) {
                        record.set('active', false);
                        HRIS_View_Salary.update(record.data, function(provider, response){
                        });
                    },
                    select: function(model, record, index) {
                        record.set('active', true);
                        HRIS_View_Salary.update(record.data, function(provider, response){
                        });
                    }
                }
            }),
            columns: [
                {text: 'active',width: 50,sortable: true,dataIndex: 'active',renderer: authCk},
                {text: _('id'),width: 100,sortable: true,dataIndex: 'js_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'js_name'}
                /*{text: _('active'),width: 60,sortable: true,renderer: me.boolRenderer,
                    dataIndex: 'active',
                    editor:{
                        xtype:'checkbox'
                    }}*/
            ]
        });

        me.userGrid = Ext.create('App.ux.GridPanel', {
            store: me.userStore,
            columns: [
                {
                    text: 'id',
                    sortable: false,
                    dataIndex: 'id',
                    hidden: true
                },
                {
                    width: 100,
                    text: i18n('username'),
                    sortable: true,
                    dataIndex: 'usrname'
                },
                {
                    width: 200,
                    text: i18n('name'),
                    sortable: true,
                    dataIndex: 'fullname'
                },
                {
                    flex: 1,
                    text: i18n('aditional_info'),
                    sortable: true,
                    dataIndex: 'info'
                },
                {
                    width: 200,
                    text: 'Level',
                    sortable: true,
                    dataIndex: 'level'
                },
                {
                    text: i18n('active'),
                    sortable: true,
                    dataIndex: 'aktif',
                    renderer: me.boolRenderer
                },
                {
                    text: i18n('authorized'),
                    sortable: true,
                    dataIndex: 'authorized',
                    renderer: me.boolRenderer
                }
            ],
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {

                                    itemId: 'UserGridEditFormContainer',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'UserGridEditFormContainerLeft',
                                            items: [
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    items: [
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            fieldLabel: _('username'),
                                                            name: 'usrname',
                                                            allowBlank: false,
                                                            validateOnBlur: true,
                                                            itemId:'usrname',
                                                            vtype: 'usernameField'
                                                        },
                                                        {
                                                            width: 275,
                                                            xtype: 'textfield',
                                                            fieldLabel: _('password'),
                                                            name: 'passwd',
                                                            inputType: 'password',
                                                            vtype: 'strength',
                                                            strength: 0,
                                                            plugins: {
                                                                ptype: 'passwordstrength'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    fieldLabel: _('name'),
                                                    items: [
                                                        {
                                                            width: 145,
                                                            xtype: 'textfield',
                                                            name: 'fname',
                                                            allowBlank: false
                                                        },
                                                        {
                                                            width: 150,
                                                            xtype: 'textfield',
                                                            name: 'lname'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    items: [
                                                        {
                                                            width: 125,
                                                            xtype: 'checkbox',
                                                            fieldLabel: _('active'),
                                                            name: 'aktif'
                                                        },
                                                        {
                                                            width: 125,
                                                            xtype: 'checkbox',
                                                            fieldLabel: _('authorized'),
                                                            name: 'authorized'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            text: _('view_data')+' '+_('location'),
                                                            handler: function(){
                                                                var usrname = Ext.ComponentQuery.query("#usrname")[0].getValue();
                                                                me.store_office_location.proxy.extraParams = {usrname:usrname};
                                                                //me.store_office_location.loadPage(1);
                                                                me.store_office_location.load({
                                                                    scope:this,
                                                                    callback: function (records, operation, success) {
                                                                        if(success){
                                                                              var sm = me.grid_office_location.getSelectionModel();
                                                                              Ext.each(records, function(record) {
                                                                                  if(record.data.active){
                                                                                    var row = record.index;
                                                                                    sm.select(row, true);
                                                                                  }
                                                                          });
                                                                        }else{
                                                                            //alert(success);
                                                                            //console.log(operation.exception);
                                                                        }
                                                                    }}
                                                                    );
                                                                me.GridShow= Ext.create('App.ux.window.Window',{
                                                                    layout: 'fit',
                                                                    title: _('office_location'),
                                                                    width: 500,
                                                                    height: 300,
                                                                    items:[me.grid_office_location],
                                                                    modal:true
                                                                });
                                                                me.GridShow.show();
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            text: _('view_data')+' '+_('company'),
                                                            handler: function(){
                                                                var usrname = Ext.ComponentQuery.query("#usrname")[0].getValue();
                                                                me.store_company.proxy.extraParams = {usrname:usrname};
                                                                //me.store_company.loadPage(1);
                                                                me.store_company.load({
                                                                    scope:this,
                                                                    callback: function (records, operation, success) {
                                                                        if(success){
                                                                              var sm = me.grid_company.getSelectionModel();
                                                                              Ext.each(records, function(record) {
                                                                                  if(record.data.active){
                                                                                    var row = record.index;
                                                                                    sm.select(row, true);
                                                                                  }
                                                                          });
                                                                        }else{
                                                                            //alert(success);
                                                                            //console.log(operation.exception);
                                                                        }
                                                                    }}
                                                                    );
                                                                me.GridShow= Ext.create('App.ux.window.Window',{
                                                                    layout: 'fit',
                                                                    title: _('company'),
                                                                    width: 500,
                                                                    height: 300,
                                                                    items:[me.grid_company],
                                                                    modal:true
                                                                });
                                                                me.GridShow.show();
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            text: _('view_data')+' '+_('job_status'),
                                                            handler: function(){
                                                                var usrname = Ext.ComponentQuery.query("#usrname")[0].getValue();
                                                                me.store_job_status.proxy.extraParams = {usrname:usrname};
                                                                //me.store_job_status.loadPage(1);
                                                                me.store_job_status.load({
                                                                    scope:this,
                                                                    callback: function (records, operation, success) {
                                                                        if(success){
                                                                              var sm = me.grid_job_status.getSelectionModel();
                                                                              Ext.each(records, function(record) {
                                                                                  if(record.data.active){
                                                                                    var row = record.index;
                                                                                    sm.select(row, true);
                                                                                  }
                                                                          });
                                                                        }else{
                                                                            //alert(success);
                                                                            //console.log(operation.exception);
                                                                        }
                                                                    }}
                                                                    );
                                                                me.GridShow= Ext.create('App.ux.window.Window',{
                                                                    layout: 'fit',
                                                                    title: _('job_status'),
                                                                    width: 500,
                                                                    height: 300,
                                                                    items:[me.grid_job_status],
                                                                    modal:true
                                                                });
                                                                me.GridShow.show();
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            text: _('view_data')+' '+_('salary'),
                                                            handler: function(){
                                                                var usrname = Ext.ComponentQuery.query("#usrname")[0].getValue();
                                                                me.store_salary.proxy.extraParams = {usrname:usrname};
                                                                //me.store_salary.loadPage(1);
                                                                me.store_salary.load({
                                                                    scope:this,
                                                                    callback: function (records, operation, success) {
                                                                        if(success){
                                                                              var sm = me.grid_salary.getSelectionModel();
                                                                              Ext.each(records, function(record) {
                                                                                  if(record.data.active){
                                                                                    var row = record.index;
                                                                                    sm.select(row, true);
                                                                                  }
                                                                          });
                                                                        }else{
                                                                            //alert(success);
                                                                            //console.log(operation.exception);
                                                                        }
                                                                    }}
                                                                    );
                                                                me.GridShow= Ext.create('App.ux.window.Window',{
                                                                    layout: 'fit',
                                                                    title: _('salary'),
                                                                    width: 500,
                                                                    height: 300,
                                                                    items:[me.grid_salary],
                                                                    modal:true
                                                                });
                                                                me.GridShow.show();
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    items: [
                                                        {
                                                            width: 300,
                                                            xtype: 'mitos.rolescombo',
                                                            fieldLabel: _('access_control'),
                                                            name: 'role_id',
                                                            allowBlank: false
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    items: [
                                                        {
                                                            xtype : 'combo',
                                                            fieldLabel : 'Level',
                                                            name:'level',
                                                            width:300,
                                                            enableKeyEvents:true,
                                                            typeAhead: true,
                                                            mode:'local',
                                                            store:[
                                                                ['STAFF','STAFF'],
                                                                ['MANAGER' ,'MANAGER'],
                                                                ['DIREKSI','DIREKSI']
                                                            ],
                                                            allowBlank: false
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    fieldLabel: 'Info',
                                                    items: [
                                                        {
                                                            width: 500,
                                                            height: 50,
                                                            xtype: 'textfield',
                                                            name: 'info',
                                                            emptyText: i18n('additional_info')
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('user'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 15,
                store: me.userStore,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }

        });
        me.pageBody = [me.userGrid];
        me.callParent(arguments);
    },

    onNewUser: function(){
        var me = this;

        me.formEditing.cancelEdit();
        me.userStore.insert(0, {
            aktif: 1,
            authorized: 1
        });
        me.formEditing.startEdit(0, 0);
    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.userStore.load();
        callback(true);
    }

});
