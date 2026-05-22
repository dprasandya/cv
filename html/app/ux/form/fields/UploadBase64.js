

Ext.define('App.ux.form.fields.UploadBase64', {
	extend: 'Ext.window.Window',
	requires: [
		'Ext.form.field.File'
	],

	xtype: 'uploadbase64field',
	bodyPadding: 10,
	base64: '',
	ready: false,

	title: _('upload'),
	items: [
		{
			xtype: 'fileuploadfield',
			width: 300
		}
	],
	buttons: [
		{
			text: _('cancel')
		},
		{
			text: _('upload')
		}
	],

	allowExtensions: null,

	initComponent: function(){
		var me = this;

		me.callParent();

		me.uValue = '';
		me.uField = me.getComponent(0);
		me.uDock = me.getDockedItems('toolbar[dock="bottom"]')[0];
		me.uCancel = me.uDock.getComponent(0);
		me.uUpload = me.uDock.getComponent(1);

		me.uCancel.on('click', me.onCancel, me);
		me.uUpload.on('click', me.onUpload, me);

	},

	doUpload: function(){
		var me = this,
			fr = new FileReader();

		me.uValue = me.uField.getValue();

		if(me.allowExtensions){
			var re;

			if(Ext.isArray(me.allowExtensions)){
				re = new RegExp(me.allowExtensions.join('|'));
			}else{
				re = new RegExp(me.allowExtensions + '$');
			}

			if(!re.exec(me.uValue)){
				app.msg(_('oops'), Ext.String.format(_('only_extensions_{0}_allowed'), me.allowExtensions.join ? me.allowExtensions.join(', ') : me.allowExtensions ), true);
				return;
			}
		}

		me.setReady(false);
		fr.onload = function(e){
			me.base64 = e.target.result;
			me.setReady(true);
			me.fireEvent('uploadready', me, me.base64);
			me.close();
		};

		fr.readAsDataURL(me.uField.extractFileInput().files[0]);
	},

	onCancel: function(){
		return this.close();
	},

	onUpload: function(){
		this.doUpload();
	},

	isReady: function(){
		return this.ready;
	},

	setReady: function(ready){
		return this.ready = ready;
	},

	getValue: function(){
		return this.uValue;
	}

});