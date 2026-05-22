

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

		me.userGrid = Ext.create('Ext.grid.Panel', {
			itemId: 'AdminUserGridPanel',
			store: me.userStore,
			columns: [
				{
					text: 'id',
					sortable: false,
					dataIndex: 'id',
					width: 50
				},
				{
					width: 100,
					text: _('username'),
					sortable: true,
					dataIndex: 'username'
				},
				{
					width: 200,
					text: _('name'),
					sortable: true,
					dataIndex: 'fullname'
				},
				{
					flex: 1,
					text: _('aditional_info'),
					sortable: true,
					dataIndex: 'notes'
				},
				{
					text: _('active'),
					sortable: true,
					dataIndex: 'active',
					renderer: me.boolRenderer
				}
			],
			plugins: [
				me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
					clicksToEdit: 1,
					items: [
						{
							xtype: 'tabpanel',
							items: [
								{
									title: _('general'),
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
															name: 'username',
															allowBlank: false,
															validateOnBlur: true,
															vtype: 'usernameField'
														},
														{
															width: 275,
															xtype: 'textfield',
															fieldLabel: _('password'),
															name: 'password',
															inputType: 'password',
															vtype: 'strength',
															strength: 24,
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
															width: 50,
															xtype: 'mitos.titlescombo',
															name: 'title'
														},
														{
															width: 145,
															xtype: 'textfield',
															name: 'fname',
															allowBlank: false
														},
														{
															width: 100,
															xtype: 'textfield',
															name: 'mname'
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
															name: 'active'
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
															width: 555,
															xtype: 'mitos.rolescombo',
															fieldLabel: _('access_control'),
															name: 'role_id',
															allowBlank: false
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
				pageSize: 10,
				store: me.userStore,
				displayInfo: true,
				plugins: new Ext.ux.SlidingPager()
			}

		});

		me.pageBody = [me.userGrid];
		me.callParent(arguments);

	},

	onNewUser: function(){
		var me = this;

		me.formEditing.cancelEdit();
		me.userStore.insert(0, {
			create_date: new Date(),
			update_date: new Date(),
			create_uid: app.user.id,
			update_uid: app.user.id,
			active: 1,
			authorized: 0,
			calendar: 0
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
