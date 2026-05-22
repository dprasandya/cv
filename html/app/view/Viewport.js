
Ext.define('App.view.Viewport', {
    extend: 'Ext.Viewport',
    // app settings

    user: window.user, // array defined on _app.php
    version: window.version, // string defined on _app.php
    minWidthToFullMode: 1700, // full mode = nav expanded 1585
    currency: g('gbl_currency_symbol'), // currency used

	// end app settings
    initComponent: function(){
        Ext.tip.QuickTipManager.init();
        var me = this;

	    me.nav = me.getController('Navigation');
	    me.cron = me.getController('Cron');
	    me.log = me.getController('LogOut');
	    me.notification = me.getController('Notification');

	    me.logged = true;

	    me.lastCardNode = null;
        me.prevNode = null;
        me.fullMode = window.innerWidth >= me.minWidthToFullMode;

        /*
         * TODO: this should be managed by the language files
         * The language file has a definition for this.
         */
        if(me.currency == '$'){
            me.icoMoney = 'icoDollar';
        }else if(me.currency == '€'){
            me.icoMoney = 'icoEuro';
        }else if(me.currency == '£'){
            me.icoMoney = 'icoLibra';
        }else if(me.currency == '¥'){
            me.icoMoney = 'icoYen';
        }

        /**
         * The panel definition for the the TreeMenu & the support button
         */
        me.navColumn = Ext.create('Ext.panel.Panel', {
            title: _('navigation'),
            action: 'mainNavPanel',
            layout: 'border',
            region: g('main_navigation_menu_left'),
            width: parseFloat(g('gbl_nav_area_width')),
            split: true,
            collapsible: true,
            collapsed: false,
            items: [
                {
                    xtype: 'treepanel',
                    region: 'center',
	                action:'mainNav',
                    cls: 'nav_tree',
                    hideHeaders: true,
                    rootVisible: false,
                    border: false,
                    width: parseFloat(g('gbl_nav_area_width')),
	                store: Ext.create('App.store.navigation.Navigation', {
		                autoLoad: true
	                })
                }
            ]
        });

        /**
         * MainPanel is where all the pages are displayed
         */
        me.MainPanel = Ext.create('Ext.container.Container', {
            region: 'center',
            layout: 'card',
            border: true,
            itemId: 'MainPanel',
            defaults: {
                layout: 'fit',
                xtype: 'container'
            },
            listeners: {
                scope: me,
                afterrender: me.removeAppMask
            }
        });

        /**
         * General Area
         */
        me.nav['App_view_dashboard_Dashboard'] = me.MainPanel.add(Ext.create('App.view.dashboard.Dashboard'));

        /**
         * Footer Panel
         */
        me.Footer = Ext.create('Ext.container.Container', {
//            height: me.fullMode ? 30 : 60,
            height: 30,
            split: false,
            padding: '3 0',
            region: 'south',
            action:'appFooter',
            items: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            text: 'Copyright (C) 2022 Saraswanti Group |:|  v' + me.version,
                            iconCls: 'icoGreen',
                            disabled: true
                        },
                        '->',
                       /* {
                            width: 250,
                            fieldLabel: 'Change '+_('project'),
                            xtype: 'projectcombo',
                            value : globals['project_id'],
                            listeners:{
                                change:function(field){
                                    var project_id = Project.setGlobal({project_id: field.value});
                                    console.log(field.value, project_id);
                                    //window.location.reload();
                                }
                            }
                        },*/
                        {
                            xtype: 'button',
                            text: me.user.fname + ' ' + me.user.lname,
                            scale: 'small',
//                            style: 'height: 42px',
//                            iconCls: isEmerAccess ? 'icoUnlocked32' : 'icoDoctor',
//                            iconCls: 'icoLogout',
                            iconAlign: 'left',
                            /*
                             plugins:[
                             {
                             ptype:'badgetext',
                             defaultText: 0
                             }
                             ],
                             */
                            itemId:'userSplitButton',
                            cls: 'drButton',
                            margin: '0 0 0 3',
                            menu: [
                                {
                                    text: i18n('my_account'),
                                    iconCls: 'icoUser',
                                    handler: function(){
                                        me.nav.navigateTo('App.view.miscellaneous.MyAccount');
                                    }
                                },
                                {
                                    text: i18n('logout'),
                                    iconCls: 'icoLogout',
                                    action:'logout'
                                }
                            ]

                        }

                    ]
                }
            ]
        });


        me.layout = {
            type: 'border',
            padding: 3
        };
        me.defaults = {
            split: true
        };
//        me.items = [me.Header, me.navColumn, me.MainPanel, me.Footer];
        me.items = [me.navColumn, me.MainPanel, me.Footer];
        me.listeners = {
	        scope: me,
            render: me.appRender,
            beforerender: me.beforeAppRender
        };
        me.callParent(arguments);

    },
	getController:function(controller){
		return App.Current.getController(controller);
	},
	setWindowTitle:function(facility){
		window.document.title = 'Untusoft :: ' + facility;
	},

    /**
     * AuditLog('Data created');
     * Function to inject logs to the audit log table
     * This function should be used on every screen that display
     * health information of patient.
     * Event: create, read, update, delete
     */
    AuditLog: function(message){
        var log = Ext.create('App.model.administration.AuditLog',{
//            eid: this.patient.eid,
//            patient_id: this.patient.pid,
            event: message
        }).save({
           callback:function(){
               delete this;
           }
        });
    },


    onNewDocumentsWin: function(action){
        this.PatientOrdersWindow.eid = this.patient.eid;
        this.PatientOrdersWindow.pid = this.patient.pid;
        this.PatientOrdersWindow.show();
        this.PatientOrdersWindow.cardSwitch(action);
    },

    onWebCamComplete: function(msg){
        var panel = this.getActivePanel();
        if(panel.id == 'panelSummary'){
            panel.demographics.completePhotoId();
        }
        this.msg('Sweet!', _('patient_image_saved'));
    },

	onPatientLog: function(){
        if(this.patientArrivalLog){
            this.patientArrivalLog.show();
        }else{
            this.patientArrivalLog = Ext.create('App.view.patient.windows.ArrivalLog').show();
        }
    },

	openDashboard: function(){
        var me = this,
	        cls = me.nav.getNavRefByClass('App.view.dashboard.Dashboard'),
	        panel =  me.nav[cls];

//		if(panel && panel == me.nav.activePanel) panel.loadPatient();

        me.nav.navigateTo('App.view.dashboard.Dashboard');


    },
    getActivePanel: function(){
        return this.MainPanel.getLayout().getActiveItem();
    },
    appRender: function(){
        this.loadModules();
    },

    /**
     * Load all the modules on the modules folder.
     * This folder will hold modules created by third-party.
     */
    loadModules: function(){
        //say('*** Loading Modules ***');

        Modules.getEnabledModules(function(provider, response){
            var modules = response.result;
            for(var i = 0; i < modules.length; i++){

	            try{
		            App.app.getController('Modules.' + modules[i].dir + '.Main');
	            }catch(error){
					app.msg(_('oops'), (_('unable_to_load_module') + ' ' + modules[i].title + '<br>Error: ' +  error), true);
	            }
            }

	        app.doLayout();

        });
    },

    removeAppMask: function(){
        if(Ext.get('mainapp-loading')) Ext.get('mainapp-loading').remove();
        if(Ext.get('mainapp-loading-mask')) Ext.get('mainapp-loading-mask').fadeOut({
            remove: true
        });
        window.document.title = window.site;//'Accounting Software';
    },

    beforeAppRender: function(){
	    var me = this,
		    params = me.nav.getUrlParams();
    },
    getApp: function(){
        return this;
    },

    /**
     * Access denied massage.
     */
    accessDenied: function(){
        Ext.Msg.show({
            title: 'Oops!',
            msg: _('access_denied'),
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });
    },

	msg: function(title, format, error, persistent) {
		var msgBgCls = (error === true) ? 'msg-red' : 'msg-green';

		if(typeof error === 'string') msgBgCls = 'msg-' + error;

		this.msgCt = Ext.get('msg-div');
		if(!this.msgCt) this.msgCt = Ext.fly('msg-div');

		var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1)),
			m = Ext.core.DomHelper.append(this.msgCt, {
				html: '<div class="flyMsg ' + msgBgCls + '"><h3>' + (title || '') + '</h3><p>' + s + '</p></div>'
			}, true);

		this.msgCt.alignTo(document, 't-t');

		// if persitent return the message element without the fade animation
		if (persistent === true) return m;

		m.addCls('fadeded');

		Ext.create('Ext.fx.Animator', {
			target: m,
			duration: error === true ? 8000 : 3000,
			keyframes: {
				0: { opacity: 0 },
				10: { opacity: 1 },
				80: { opacity: 1 },
				100: { opacity: 0, height: 0 }
			},
			listeners: {
				afteranimate: function(anim) {
					anim.target.target.destroy();
				}
			}
		});

		m.on('click', function(){
			m.applyStyles('visibility:hidden; display:none');
		});

		return true;
	},

    alert: function(msg, icon){
        if(icon == 'error'){
            icon = Ext.Msg.ERROR;
        }else if(icon == 'warning'){
            icon = Ext.Msg.WARNING;
        }else if(icon == 'question'){
            icon = Ext.Msg.QUESTION;
        }else{
            icon = Ext.Msg.INFO;
        }

        Ext.Msg.show({
            msg: msg,
            buttons: Ext.Msg.OK,
            icon: icon,
	        maxWidth: 1200,
	        modal: false
        });
    }


});
