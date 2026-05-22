
Ext.define('App.ux.combo.ComboResettable', {
	extend: 'Ext.form.ComboBox',
	triggerTip: _('click_to_clear_selection'),
	spObj: '',
	spForm: '',
	spExtraParam: '',
	qtip: _('clearable_combo_box'),

	trigger1Class: 'x-form-select-trigger',
	trigger2Class: 'x-form-clear-trigger',

	onRender: function(ct, position){
		this.callParent(arguments);
		var id = this.getId();
		this.triggerConfig = {
			tag: 'div',
			cls: 'x-form-twin-triggers',
			style: 'display:block;',
			cn: [
				{
					tag: "img",
					style: Ext.isIE ? 'margin-left:0;height:21px' : '',
					src: Ext.BLANK_IMAGE_URL,
					id: "trigger2" + id,
					name: "trigger2" + id,
					cls: "x-form-trigger " + this.trigger2Class
				}
			]
		};
		this.triggerEl.replaceWith(this.triggerConfig);

		this.triggerEl.on('mouseup', function(e){
			if(e.target.name == "trigger2" + id){
				this.reset();
				this.oldValue = null;
				if(this.spObj !== '' && this.spExtraParam !== ''){
					Ext.getCmp(this.spObj).store.setExtraParam(this.spExtraParam, '');
					Ext.getCmp(this.spObj).store.load()
				}
				if(this.spForm !== ''){
					Ext.getCmp(this.spForm).getForm().reset();
				}
				this.fireEvent('fieldreset', this);
			}

		}, this);

		var trigger2 = Ext.get("trigger2" + id);
		trigger2.addClsOnOver('x-form-trigger-over');
	}
}); 