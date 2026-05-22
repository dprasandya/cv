
Ext.define('App.ux.form.fields.CheckBoxWithText', {
	extend: 'Ext.form.FieldContainer',
	mixins: {
		field: 'Ext.form.field.Field'
	},
	xtype: 'checkboxwithtext',
	layout: 'hbox',
	boxLabel: 'boxLabel',
	emptyText: '',
	readOnly: false,
//	combineErrors: true,
	msgTarget: 'under',
	width: 400,

	inputValue: '1',
	uncheckedValue: '0',

	initComponent: function(){
		var me = this;

		me.items = me.items || [];

		me.items = [
			{
				xtype:'checkbox',
				boxLabel: me.boxLabel,
				submitValue: false,
				inputValue: me.inputValue,
				width: 130,
				margin: '0 10 0 0'
			}
		];

		me.textField = me.textField || {
			xtype:'textfield'
		};

		Ext.apply(me.textField , {
			submitValue: false,
			flex: 1,
			hidden: true,
			emptyText: me.emptyText
		});

		me.items.push(me.textField);

		if(me.layout == 'vbox') me.height = 44;

		me.callParent();

		me.chekboxField = me.items.items[0];
		me.textField = me.items.items[1];

		me.chekboxField.on('change', me.setTextField, me);

		// this dummy is necessary because Ext.Editor will not check whether an inputEl is present or not
//		this.inputEl = {
//			dom: {},
//			swallowEvent: function(){
//			}
//		};
//
		me.initField();
	},

	setTextField: function(checkbox, value){
		if(value == 0 || value == 'off' || value == false){
			this.textField.reset();
			this.textField.hide();
		}else{
			this.textField.show();
		}
	},

	getValue: function(){
		var value = '',
			ckValue = this.chekboxField.getSubmitValue(),
			txtValue = this.textField.getSubmitValue() || '';

		if(ckValue)    value = ckValue + '~' + txtValue;
		return value;
	},

	getSubmitValue: function(){
		return this.getValue();
	},

	setValue: function(value){
		if(value && value.split){
			var val = value.split('~');
			this.chekboxField.setValue(val[0] || 0);
			this.textField.setValue(val[1] || '');
			return;
		}
		this.chekboxField.setValue(0);
		this.textField.setValue('');
	},

	// Bug? A field-mixin submits the data from getValue, not getSubmitValue
	getSubmitData: function(){
		var me = this,
			data = null;
		if(!me.disabled && me.submitValue && !me.isFileUpload()){
			data = {};
			data[me.getName()] = '' + me.getSubmitValue();
		}
		return data;
	},

	setReadOnly: function(value){
		this.chekboxField.setReadOnly(value);
		this.textField.setReadOnly(value);
	}
});