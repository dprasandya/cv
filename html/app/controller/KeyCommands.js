Ext.define('App.controller.KeyCommands', {
    extend: 'Ext.app.Controller',
    requires:[
        'App.controller.LogOut'
    ],
	refs: [
        {
            ref:'viewport',
            selector:'viewport'
        }
	],


	init: function() {
		var me = this,
			body = Ext.getBody();

		body.on('keyup', me.onKeyUp, me);

	},

	onKeyUp: function(e, t, eOpts){

		say('onKeyUp');

		if(e.getKey() == e.ALT || e.getKey() == e.CTRL || e.getKey() == e.SHIFT){
			return;
		}

		if(e.altKey && e.ctrlKey && e.shiftKey){
			var action = '';

			if(e.getKey() == e.U){
				action = 'users';
			}else if(e.getKey() == e.A){
				action = 'accounts';
			}else if(e.getKey() == e.Q){
				action = 'logout';
                appLogout();
			}else if(e.getKey() == e.P){
				action = 'activeproblems';
			}else if(e.getKey() == e.R){
				action = 'laboratories';
			}else if(e.getKey() == e.C){
				action = 'social';

			// close window
			}else if(e.getKey() == e.W){
				var cmp = Ext.getCmp(e.getTarget(null, null, true).id);

				if(cmp.xtype == 'window'){
					cmp.close();
				}else{
					var win = cmp.up('window');
					if(win) win.close();
				}
				return;
			}

		}
	}



});