<?php

if(!defined('_SPIEXEC')) die('No direct access allowed.');
?>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>SPIApp :: New Site Setup</title>
    <script type="text/javascript" src="lib/<?php print EXTJS ?>/ext-all.js"></script>
    <link rel="stylesheet" type="text/css" href="resources/css/ext-all.css">
    <link rel="stylesheet" type="text/css" href="resources/css/style_newui.css">
    <link rel="stylesheet" type="text/css" href="resources/css/custom_app.css">

    <link rel="shortcut icon" href="favicon.ico">
    <script src="data/api.php"></script>
    <script type="text/javascript">

        var app,
            lang = {};

        window.i18n = window._ = function(key){
            return window.lang[key] || '*'+key+'*';
        };

        window.say = function(args){
            console.log(args);
        };

        Ext.Loader.setConfig({
            enabled: true,
            disableCaching: false,
            paths: {
                'Ext': 'lib/<?php print EXTJS ?>/src',
                'Ext.ux': 'lib/<?php print EXTJS ?>/ux',
                'App': 'app'
            }
        });
    </script>
    <script type="text/javascript">
        function say(a){
            console.log(a);
        }
        for(var x = 0; x < App.data.length; x++){
            Ext.direct.Manager.addProvider(App.data[x]);
        }
        Ext.require('App.view.sitesetup.SiteSetup');
        Ext.onReady(function(){
            app = Ext.create('App.view.sitesetup.SiteSetup').show();
        });
    </script>
</head>
<body id="login">
<div id="bg_logo"></div>
<div id="copyright">
	<div>Copyright (C) 2015 UntuSoft |:| v<?php print VERSION ?></div>
</div>
</body>
</html>
