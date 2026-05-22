
Ext.define('App.view.miscellaneous.MyAccount', {
	extend: 'App.ux.RenderPanel',
	pageTitle: _('my_account'),

	requires: [
		'App.ux.window.Window',
		'App.ux.form.fields.plugin.PasswordStrength'
	],

	initComponent: function(){
		var me = this;

		// *************************************************************************************
		// My Account Data Store
		// *************************************************************************************
		me.store = Ext.create('App.store.miscellaneous.Users');

		// *************************************************************************************
		// User Settings Form
		// Add or Edit purpose
		// *************************************************************************************
		me.myAccountForm = Ext.create('App.ux.form.Panel', {
			cls: 'form-white-bg',
			frame: true,
			hideLabels: true,
			defaults: {
				labelWidth: 89,
				layout: {
					type: 'hbox',
					defaultMargins: {
						top: 0,
						right: 5,
						bottom: 0,
						left: 0
					}
				}
			},
			items: [
				{
					xtype: 'textfield',
					hidden: true,
					name: 'id'
				},
				{
					xtype: 'fieldset',
					title: _('my_account'),
					defaultType: 'textfield',
					layout: 'anchor',
					defaults: {
						labelWidth: 89,
						anchor: '100%',
						layout: {
							type: 'hbox',
							defaultMargins: {
								top: 0,
								right: 5,
								bottom: 0,
								left: 0
							}
						}
					},
					items: [
						{
							xtype: 'fieldcontainer',
							defaults: {
								hideLabel: true
							},
							msgTarget: 'under',
							items: [
								{
									width: 110,
									xtype: 'displayfield',
									value: 'First, Last: '
								},
								{
									width: 105,
									xtype: 'textfield',
									name: 'fname'
								},
								{
									width: 175,
									xtype: 'textfield',
									name: 'lname'
								}
							]
						}
					]
				},
				{
					xtype: 'fieldset',
					title: _('login_info'),
					defaultType: 'textfield',
					layout: 'anchor',
					defaults: {
						labelWidth: 89,
						anchor: '100%',
						layout: {
							type: 'hbox',
							defaultMargins: {
								top: 0,
								right: 5,
								bottom: 0,
								left: 0
							}
						}
					},
					items: [
						{
							xtype: 'fieldcontainer',
							defaults: {
								hideLabel: true
							},
							msgTarget: 'under',
							items: [
								{
									width: 110,
									xtype: 'displayfield',
									value: 'Username: '
								},
								{
									width: 170,
									xtype: 'textfield',
									name: 'usrname'
								},
								{
									width: 100,
									xtype: 'displayfield',
									value: 'Password: '
								},
								{
									width: 175,
									xtype: 'textfield',
									name: 'passwd',
									inputType: 'password',
									disabled: true
								}
							]
						}
					]
				}
			],
			tbar:[
				{
					text: _('change_password'),
					iconCls: 'save',
					scope: me,
					handler: me.onPasswordChange
				}
			],
			buttons: [
				{
					text: _('save'),
					iconCls: 'save',
					scope: me,
					handler: me.onSaveClick
				}
			]
		});

		me.win = Ext.create('App.ux.window.Window', {
			width: 420,
			title: _('change_you_password'),
			items: [
				{
					xtype: 'form',
					bodyPadding: 15,
					defaultType: 'textfield',
					defaults: {
						labelWidth: 130,
						width: 380,
						inputType: 'password'
					},
					items: [
						{
							name: 'id',
							hidden: true
						},
						{
							fieldLabel: _('old_password'),
							name: 'oPassword',
							allowBlank: false
						},
						{
							fieldLabel: _('new_password'),
							name: 'nPassword',
							allowBlank: false,
							id: 'myAccountPage_nPassword',
							vtype      : 'strength',
							strength   : 0,
							plugins    : {
								ptype : 'passwordstrength'
							}
						},
						{
							fieldLabel: _('re_type_password'),
							name: 'vPassword',
							allowBlank: false,
							vtype: 'password',
							initialPassField: 'myAccountPage_nPassword',
							validateOnChange: true
						}
					]
				}
			],
			buttons: [
				{
					text: _('save'),
					scope: me,
					handler: me.onPasswordSave
				},
				{
					text: _('cancel'),
					scope: me,
					handler: me.onCancel
				}
			],
			listeners: {
				scope: me,
				close: me.onClose
			}

		});
		me.pageBody = [me.myAccountForm];

		me.callParent(arguments);
	},

	onPasswordSave: function(btn){
		var me = this,
			form = me.win.down('form').getForm(),
			values = form.getValues(),
			id = me.myAccountForm.getForm().getRecord().data.id,
			params;

		if(values.nPassword != values.vPassword){
			app.msg(_('oops'), _('password_does_not_match'), true);
			return;
		}

		if(form.isValid()){
			params = {
				id:id,
				old_password:values.oPassword,
				new_password:values.nPassword
			};

			User.changePassword(params, function(provider, response){

				if(response.result.success){
					app.msg(_('sweet'), _('record_updated'));
					me.win.close();
				}else{
					app.msg(_('oops'), _(response.result.message), true);
				}
			});

		}


	},

	onPasswordChange: function(){
		this.win.show();
	},

	onCancel: function(){
		this.win.close();
	},

	onClose: function(){
		this.win.down('form').getForm().reset();
	},

	onSaveClick:function(btn){
		var me = this,
			form = me.myAccountForm.getForm(),
			record = form.getRecord(),
			values = form.getValues();

		record.set(values);
		record.save({
			callback:function(){
				app.msg(_('sweet'), _('record_update'))
			}
		});
	},

	/**
	 * This function is called from Viewport.js when
	 * this panel is selected in the navigation panel.
	 * place inside this function all the functions you want
	 * to call every this panel becomes active
	 */
	onActive: function(callback){
		var me = this,
			form = me.myAccountForm.getForm();

		this.store.load({
			callback: function(record){
				form.loadRecord(record[0]);
			}
		});

		callback(true);

	}
}); 
