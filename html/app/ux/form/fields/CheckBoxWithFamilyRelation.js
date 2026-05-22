
Ext.define('App.ux.form.fields.CheckBoxWithFamilyRelation', {
	extend: 'App.ux.form.fields.CheckBoxWithText',
	alias: 'widget.checkboxwithfamilyhistory',
	textField: {
		xtype: 'gaiaehr.combo',
		fieldLabel: _('relation'),
		labelAlign: 'right',
		labelWidth: 80,
		list: 109,
		allowBlank: false,
		loadStore: true
	},

	initComponent:function(){
		this.inputValue = this.code || '1';
		this.callParent();
	},

	getValue: function(){
		var value = '',
			ckValue = this.chekboxField.getSubmitValue(),
			txtValue;

		if(ckValue != '0'){
			var store = this.textField.getStore(),
				rec = store.getById(this.textField.getSubmitValue());
			txtValue = rec ? rec.data.code_type + ':' + rec.data.code : '0';
		}else{
			txtValue = '0';
		}

		if(ckValue)    value = ckValue + '~' + txtValue;
		return value;
	},

	setValue: function(value){

		if(value && value.split){
			var val = value.split('~');
			this.chekboxField.setValue(val[0] || 0);

			if(val[1] != '0' && val[1].split){
				var relation = val[1].split(':');
				this.textField.select(relation[1] || relation[0] || '');
			}else{
				this.textField.setValue('');
			}

			return;
		}
		this.chekboxField.setValue(0);
		this.textField.setValue('');
	}
});