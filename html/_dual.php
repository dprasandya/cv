<?php

if (!defined('_SPIEXEC')) die('No direct access allowed.');
?>
<html>
	<head>
		<script type="text/javascript">
			var dual,
				acl = {},
				lang = {},
				user = {},
				settings = {},
				globals = {},
				ext = '<?php print EXTJS ?>',
				version = '<?php print VERSION ?>',
				site = '<?php print $site ?>',
				requires;
		</script>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>GaiaEHR</title>
		<link rel="stylesheet" type="text/css" href="resources/css/ext-all-gray.css">
		<link rel="stylesheet" type="text/css" href="resources/css/style_newui.css">
		<link rel="stylesheet" type="text/css" href="resources/css/custom_app.css">
		<link rel="shortcut icon" href="favicon.ico">
	</head>
	<body>

        <!-- slide down message div -->
        <div id="msg-div"></div>

        <!-- Loading Mask -->
        <div id="mainapp-loading-mask" class="x-mask mitos-mask" style="width: 100%; height: 100%"></div>
        <div id="mainapp-loading" class="mitos-mask-msg x-mask-msg x-layer x-mask-msg-default x-border-box">
	        <div id="mainapp-x-mask-msg" class="x-mask-msg-inner">
		        <div class="x-mask-msg-text">
			        Loading GaiaEHR...
		        </div>
	        </div>
        </div>

        <!-- Ext library -->
		<script type="text/javascript" src="lib/<?php print EXTJS ?>/ext-all-debug.js"></script>

		<!-- JSrouter and Ext.deirect API files -->
		<script src="JSrouter.php?site=<?php print $site ?>"></script>
		<script src="data/api.php?site=<?php print $site ?>"></script>

        <script type="text/javascript">

	        window.i18n = window._ = function(key){
		        return window.lang[key] || '*'+key+'*';
	        };

	        window.say = function(args){
		        console.log(args);
	        };

	        window.g = function(global){
		        return window.globals[global] || false;
	        };

	        window.a = function(acl){
		        return window.acl[acl] || false;
	        };

			/**
			 * Ext Localization file
			 * Using a anonymous function, in javascript.
			 * Is not intended to be used globally just this once.
			 */
            (function(){
                document.write('<script type="text/javascript" src="lib/<?php print EXTJS ?>/locale/' + i18n('i18nExtFile') + '?_v' + version + '"><\/script>')
            })();            // Set and enable Ext.loader for dynamic class loading
            Ext.Loader.setConfig({
                enabled: true,
                disableCaching: false,
                paths: {
                    'Ext': 'lib/<?php print EXTJS ?>/src',
	                'Ext.ux': 'lib/extjs-4.2.1/examples/ux',
                    'App': 'app',
                    'Modules': 'modules',
                    'Extensible': 'lib/extensible-1.5.1/src'
                }
            });

			for(var x = 0; x < App.data.length; x++){
				Ext.direct.Manager.addProvider(App.data[x]);
			}

			Ext.direct.Manager.on('exception', function(e, o){
				say(e);
				app.alert(
					'<p><span style="font-weight:bold">'+ (e.where != 'undefined' ? e.message : e.message.replace(/\n/g,''))  +'</span></p><hr>' +
						'<p>'+ (typeof e.where != 'undefined' ? e.where.replace(/\n/g,'<br>') : e.data) +'</p>',
					'error'
				);
			});
		</script>

		<script type="text/javascript" src="app/ux/Overrides.js"></script>
		<script type="text/javascript" src="app/ux/VTypes.js"></script>

		<script type="text/javascript">
			/**
			 * Sencha ExtJS OnReady Event
			 * When all the JS code is loaded execute the entire code once.
			 */
            Ext.application({
                name: 'App',
                models:[
	                'patient.PatientsOrders',
	                'patient.Referral',
	                'patient.PatientSocialHistory'
                ],
                stores:[
	                'patient.PatientsOrders',
	                'patient.Referrals',
	                'patient.PatientSocialHistory',
	                'administration.Medications'
                ],
                views:[
					'patient.windows.DocumentViewer'
                ],
                controllers:[
	                'DocumentViewer',
	                'DualScreen',
	                'patient.ActiveProblems',
	                'patient.AdvanceDirectives',
	                'patient.Allergies',
	                'patient.CognitiveAndFunctionalStatus',
	                'patient.DoctorsNotes',
	                'patient.Documents',
	                'patient.Immunizations',
	                'patient.LabOrders',
	                'patient.Medications',
	                'patient.RadOrders',
	                'patient.Referrals',
	                'patient.Results',
	                'patient.RxOrders',
	                'patient.Social'
                ],
                launch: function() {
	                App.Current = this;

                    dual = Ext.create('App.view.ViewportDual');
                }
            });
		</script>
	</body>
</html>