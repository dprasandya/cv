<?php

if (!defined('_SPIEXEC')) die('No direct access allowed.');
?>
<html>
	<head>
		<script type="text/javascript">
			var app,
				acl = {},
				lang = {},
				user = {},
				settings = {},
				globals = {},
				ext = '<?php print EXTJS ?>',
				version = '<?php print VERSION ?>',
				site = '<?php print $site ?>',
				requires,
				AppClipboard;
		</script>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>App :: Loading...</title>
		<link rel="stylesheet" type="text/css" href="resources/css/dashboard.css">
		<link rel="stylesheet" type="text/css" href="resources/css/ext-all-gray.css">
		<link rel="stylesheet" type="text/css" href="resources/css/style_newui.css">
		<link rel="stylesheet" type="text/css" href="resources/css/custom_app.css">
		<link rel="shortcut icon" href="favicon.ico">
	</head>
	<body>
		<!-- Loading Mask -->
		<div id="mainapp-loading-mask" class="x-mask mitos-mask" style="width: 100%; height: 100%"></div>
		<div id="mainapp-loading" class="mitos-mask-msg x-mask-msg x-layer x-mask-msg-default x-border-box">
			<div id="mainapp-x-mask-msg" class="x-mask-msg-inner">
				<div class="x-mask-msg-text">
					Loading Application...
				</div>
			</div>
		</div>

        <!-- slide down message div -->
        <div id="msg-div"></div>

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
	            return window.globals[global] === undefined ? false : window.globals[global];
            };

            window.a = function(acl){
	            return eval(window.acl[acl]) || false;
            };


            (function(){

	            /**
	             * Ext Localization file
	             * Using a anonymous function, in javascript.
	             * Is not intended to be used globally just this once.
	             */
                document.write('<script type="text/javascript" src="lib/<?php print EXTJS ?>/locale/' + i18n('i18nExtFile') + '?_v' + version + '"><\/script>');

	            /**
	             * Modules Styles
	             */
	            /*for(var s = 0; s < window.styles.length; s++){
		            document.write('<link rel="stylesheet" type="text/style" href="' + window.styles[s] + '?_v' + version + '"><\/link>');
	            }*/

            })();

            Ext.Loader.setConfig({
                enabled: true,
                disableCaching: false,
                paths: {
                    'Ext': 'lib/<?php print EXTJS ?>/src',
                    'Ext.ux': 'lib/<?php print EXTJS ?>/examples/ux',
                    'App': 'app',
                    'Modules': 'modules'
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

		<!-- this is the compiled/minified version -->
<!--		<script type="text/javascript" src="app/app.min.js?_v<?php print VERSION ?>"></script>-->

		<script type="text/javascript">
            /**
			 * Function to Copy to the clip board.
			 * This function is consumable in all the application.
			 */
            function copyToClipBoard(token){
                app.msg('Sweet!', token + ' copied to clipboard, Ctrl-V or Paste where need it.');
                if(window.clipboardData){
                    window.clipboardData.setData('text', token);
                    return null;
                }else{
                    return (token);
                }
            }
            /**
			 * Sencha ExtJS OnReady Event
			 * When all the JS code is loaded execute the entire code once.
			 */
            Ext.application({
                name: 'App',

	            requires:[
		            //'Ext.ux.LiveSearchGridPanel',
		            //'Ext.ux.SlidingPager',
		            //'Ext.ux.PreviewPlugin',
		            //'Ext.ux.form.SearchField',
		            'App.ux.RatingField',
		            'App.ux.grid.GridToHtml',
		            'App.ux.grid.Printer',
                    'App.ux.GridPanel',

		            /*
		             * Load the activity by the user
		             * This will detect the activity of the user, if the user are idle by a
		             * certain time, it will logout.
		             */
		            'App.ux.ActivityMonitor',
		            /*
		             * Load the classes that the CORE application needs
		             */
		            'App.ux.AbstractPanel',
		            'App.ux.ManagedIframe',
		            'App.ux.NodeDisabled',
		            /*
		             * Load the RenderPanel
		             * This is the main panel when all the forms are rendered.
		             */
		            'App.ux.RenderPanel',
		            /*
		             * Load the charts related controls
		             */
		            'Ext.fx.target.Sprite',
		            /*
		             * Load the DropDown related components
		             */
		            'Ext.dd.DropZone', 'Ext.dd.DragZone',
		            /*
		             * Load the form specific related fields
		             * Not all the fields are the same.
		             */
		            'App.ux.form.fields.Help',
		            'App.ux.form.fields.Checkbox',
		            'App.ux.form.fields.ColorPicker',
		            'App.ux.form.fields.Currency',
		            'App.ux.form.fields.CustomTrigger',
		            'App.ux.form.fields.DateTime',
		            'App.ux.form.fields.MultiText',
		            'App.ux.form.fields.Percent',
		            'App.ux.form.fields.plugin.BadgeText',
		            'App.ux.form.AdvanceForm',
		            'App.ux.form.Panel',
		            'App.ux.grid.DeleteColumn',
		            'App.ux.grid.EventHistory',
		            'App.ux.grid.RowFormEditing',
		            'App.ux.grid.RowFormEditor',
                    'App.ux.combo.Languages',
                    'App.ux.combo.Roles',
                    'App.ux.combo.Types',
		            'App.ux.combo.Units',
		            'App.ux.combo.Users',
		            'App.ux.combo.YesNoNa',
		            'App.ux.combo.YesNo',
		            'App.ux.window.Window',
		            'App.ux.NodeDisabled'
		           // 'Modules.Module'
	            ],

                models:[
                    'administration.Modules',
                    'administration.User',
                    'administration.Globals',
	                'navigation.Navigation'
                ],
                stores:[
                    'administration.Globals',
                    'administration.User',
                    'administration.Modules',
	                'navigation.Navigation'
                ],
                views:[
	                'dashboard.Dashboard',
                    'administration.Company',
	                'administration.Globals',
	                'administration.Modules',
	                'administration.Roles',
	                'administration.Users',
					'administration.Navigations',

					'master.Account',
					'master.Project',
					'master.Unit',
					'master.UnitBuilding',
					'master.Cluster',
					'master.BuildingType',
					'master.Floor',
					'master.Legal',
                    'master.Block',
					'master.Facing',
					'master.PaymentMethod',
					'master.CashBank',
					'master.Cashflow',
					'master.Tax',
					'master.Customer',
					'master.Supplier',
					'master.CostCode',
					'master.DocumentSetting',
					'master.Items',
					'master.ItemsRowMaterialFnB',
                    'master.ItemsRowMaterialProject',
					'master.Types',
					'master.Department',
					'master.Warehouse',
					'master.LandArea',
					'master.Kpa',
					'master.Bpl_M',
					'master.ServiceCharge_M',
                    'master.Note',
                    'master.RoomType',
                    'master.RoomStatus',
                    'master.ExtraBed',
                    'master.TableFB',
					'master.ItemsPlantation',
					'master.Afdeling',
					'master.Sharing_hpp',
                    // master //
                    /*
					'master.Form',
                    'master.Salesman',
                    'master.Route',
					'master.AccountSetting',
					'master.ItemsRowMaterial',
					'master.ItemsFormerBag',
                    'master.Formula',

                    'master.AgingAsset',
                    'master.DepreciationAsset',
                    'master.Giro_Check',
                    'master.Rounding',
                    */


                    // transactions //

					// logistics //
					'transactions.purchase_order.Purchase_order',
					'transactions.purchase_order.Approved_Purchase_order',
					'transactions.purchase_order.Goods_received',
					'transactions.stock.Stock_opname',
					'transactions.purchase_order.Borrow_items',
					'transactions.purchase_order.Borrow_items_return',
					'transactions.purchase_order.Closing_Purchase_order',
                    'transactions.stock.Items_change',
					'transactions.stock.Stock_out',

					// ap invoice //
					'transactions.ap_invoice.AP_Invoice',
					'transactions.ap_invoice.AP_Invoice_Retention',
					'transactions.ap_invoice.AP_Invoice_buyback_unit',
					'transactions.ap_invoice.AP_Payment',
					'transactions.ap_invoice.AP_Deduction',
					'transactions.ap_invoice.AP_Alocation',
					'transactions.ap_invoice.AP_Advance',
					'transactions.refund.Refund_AP',

					// ar sale //
					'transactions.ar_invoice.AR_Generate_billing',
                    'transactions.ar_invoice.AR_House_Keeping',
                    'transactions.ar_invoice.AR_Drug_Store',
                    'transactions.ar_invoice.AR_Business_Center',
                    'transactions.ar_invoice.AR_Invoice',
					'transactions.ar_invoice.AR_Add_Billing',
                    'transactions.ar_invoice.AR_Room_Service',
                    'transactions.ar_invoice.AR_PUB',
                    'transactions.ar_invoice.AR_Banquete',
					'transactions.ar_invoice.AR_Payment',
					'transactions.ar_invoice.AR_Deduction',
					'transactions.ar_invoice.AR_Alocation',
					'transactions.ar_invoice.AR_Advance',
                    'transactions.ar_invoice.AR_Bad_debt_provision',
					'transactions.refund.Refund_AR',
                    'transactions.ar_invoice.AR_Payment_direct',


					// cash & bank //
					'transactions.cashbank.Cashbook_in',
					'transactions.cashbank.Cashbook_out',
					'transactions.cashbank.Bankbook_in',
					'transactions.cashbank.Bankbook_out',
					'transactions.cashbank.Cashbon',

					// project //
					'transactions.project.Budget',
					'transactions.project.Work_order',
					'transactions.project.Work_order_progress',

                    // row land management //
                    'transactions.row_land_management.Bankbook_out',

					// General Ledger //
					'transactions.asset.Accumulation_Asset',
					'transactions.asset.Joining_Asset',
					'transactions.asset.Asset_Age_Changing',
					'transactions.asset.Closing_Asset',
					'transactions.general_ledger.General_ledger',
					'transactions.general_ledger.Audit_adjustment',
					'transactions.general_ledger.Sales_recognition',
					'transactions.general_ledger.Asset_recognition',
					'transactions.general_ledger.Asset_recognition_sales',
                    'transactions.recalculate.Unposting_transactions',
                    'transactions.recalculate.Cancel_transactions',
                    'transactions.closing.Closing',
                    'transactions.jurnal.Jurnal',

					// marketing //
					'transactions.marketing.Registration',
					'transactions.marketing.Registration_approved',
                    'transactions.marketing.Registration_unit_co',
                    'transactions.marketing.Generate_room_rate',
                    'transactions.marketing.Room_status',
					'transactions.marketing.Legal_unit_building',
					'transactions.marketing.Registration_change',
					'transactions.marketing.Registration_unit_change',
					'transactions.marketing.Unit_building_cancel',

					// stock //

					// management Properti //
                    'transactions.management_properti.Generate_rent',
					'transactions.management_properti.Bpl',
					'transactions.management_properti.ServiceCharge',
                    /*
                    'transactions.salesorder.Sales_order',
                    'transactions.salesorder.Approved_salesorder',
					'transactions.salesorder.Charts_sales',
					'transactions.salesorder.Sales_order_revision',
					'transactions.salesorder.Closing_Sales_order',

					'transactions.purchase_order.Former_items',
					'transactions.purchase_order.Purchase_order_out',
					'transactions.purchase_order.Purchase_order_in',

					'transactions.production.Work_order_letter',
                    'transactions.production.Production',
                    'transactions.deliveryorder.Delivery_order',
					'transactions.deliveryorder.Delivery_bap',

                    'transactions.stock.Warehouse_tx',
					'transactions.stock.Warehouse_rx',


					'transactions.tax.Tax_payment',
                    'transactions.reclass.Reclass',
                    'transactions.reclass.Reclass_hpp',
                    'transactions.reclass.Reclass_transport',
                    'transactions.recalculate.Recalculate',
                   ,*/
	                'miscellaneous.MyAccount',
                    //-----Popup--------//
					'popup.Roles',
                    'popup.EntityCombo',
					'popup.ProjectCombo',
					'popup.BuildingType',
					'popup.Cluster',
					'popup.Floor',
                    'popup.Block',
					'popup.FacingCombo',
					'popup.CostCode',
					'popup.UnitBuilding',
					'popup.UnitBuildingCustomer',
                    'popup.UnitBuildingRent',
                    'popup.UnitBuildingCi',
					'popup.PaymentMethod',
					'popup.Work_order',
					'popup.Work_order_contract',
					'popup.Work_order_progress',
					'popup.ProjectTypeCombo',
					'popup.Kpa',
					'popup.Bpl_MCombo',
					'popup.ServiceCharge_MCombo',
					'popup.CustomerSearch',
                    'popup.RoomType',
					'popup.ActualcostCombo',
					'popup.budget_report',


                    'popup.Customer',
                    'popup.CashBank',
                    'popup.Cashflow',
                    'popup.Supplier',
                    'popup.Account',
                    'popup.Tax',
                    'popup.Items',
                    'popup.ItemsConversion',
                    'popup.WarehouseCombo',
                    'popup.AgingAsset',
                    'popup.Salesman',
                    'popup.Route',
                    'popup.UnitCombo',
                    'popup.TypesCombo',
					'popup.FormCombo',
                    'popup.DepartmentCombo',
                    'popup.Purchase_order',
					'popup.Purchase_order_out',
					'popup.Work_order_letter',
					'popup.Delivery_order_letter',
                    'popup.AP_Invoice',
                    'popup.AP_Advance',
                    'popup.AR_Invoice',
                    'popup.AR_Advance',
                    'popup.Goods_received',
                    'popup.Delivery_order',
                    'popup.Asset',
                    'popup.Sales_order',
                    'popup.Giro_Check',
                    'popup.Warehouse_tx',
                    'popup.Cashbook',
                    'popup.Bankbook',
					'popup.RolesTypesCombo',
                    'popup.Formula',
                    'popup.RoomStatusCombo',
                    'popup.TableFB',
					'popup.Afdeling',
					'popup.Production',
					'popup.Reclass_Afdeling',
					'popup.StationCombo',
					'popup.StationNameCombo',
					'popup.AfdelingGroup',
					'popup.Mandor',
					'popup.Kendaraan',
					'popup.Pekerjaan',


					/*HRIS*/

                    'hris.employee.Job_title',
                    'hris.employee.Job_status',
                    'hris.employee.Department',
					'hris.employee.Position',
                    'hris.employee.Office_location',
					'hris.employee.Employee',
					'hris.employee.Company',
                    'hris.employee.Bonus',
                    'hris.employee.LoanOffice',
                    'hris.employee.Salary_type',
                    'hris.employee.Directorate',
                    'hris.employee.Salary_Adjustment',
                    'hris.employee.Price_office_location',
					'hris.leave.Type',
					'hris.leave.Entitlement',
					'hris.leave.Leave',
					'hris.leave.Leave_approval',
					'App.view.hris.leave.Work_week',
					'App.view.hris.leave.Work_holiday',
					'hris.management_asset.Asset_type',
					'hris.management_asset.Asset',
					'hris.management_asset.Asset_management',
					'hris.management_asset.Approved_Asset_management',
					'hris.management_asset.Asset_mutation',
					'hris.Pph21.Ptkp',
					'hris.Pph21.Salary_component',
                    'hris.Pph21.Bpjs',
					'hris.Attendance.Attendance',
                    'hris.Attendance.Award_attendance',
                    'hris.Attendance.Attendance_sharing_id',
                    'hris.Attendance.Attendance_BioFinger',
					'hris.Attendance.Outstation',
					'hris.Attendance.Overtime_request',
					'hris.Attendance.Overtime',
					'hris.Attendance.Schedule_shift',
                    'hris.Attendance.Finger_delete',
					'App.view.hris.Attendance.Office_hours',
                    'hris.Salary.Salary',
                    'hris.Salary.Salary_correction',
                    'hris.Salary.Thr',
					'hris.Pph21.Pph21',
					'hris.Pph21_simulation.Pph21_simulation',
					'hris.Mutation.Mutation',
                    'hris.Pph21.Bpjs_employee',
                    


					'hris.popup.Department',
					'hris.popup.Job_status',
					'hris.popup.Job_title',
					'hris.popup.Office_location',
					'hris.popup.Type',
					'hris.popup.Employee',
                    'hris.popup.EmployeeSearch',
                    'hris.popup.Salary_type',
					'hris.popup.Asset_type',
					'hris.popup.Company',
					'hris.popup.Asset',
					'hris.popup.Driver',
					'hris.popup.Salary_component',
                    'hris.popup.SalaryComponentCombo',
					'hris.popup.Ptkp',
					'hris.popup.Leave',
					'hris.popup.Asset_management',
					'hris.popup.Overtime_request',
					'hris.popup.Position',
					'hris.popup.Office_hours',
                    'hris.popup.Bpjs',
                    'hris.popup.Shift',
                    'hris.popup.Directorate',
					'hris.popup.Award_attendance'



                ],
                controllers:[
	                'dashboard.Dashboard',
	                'AlwaysOnTop',
	                'Cron',
	                'Header',
	                'KeyCommands',
	                'LogOut',
	                'Navigation',
	                'Notification'
                ],
                launch: function() {

                    App.Current = this;

                    CronJob.run(function(){
                        say('Loading Application');
                        window.app = Ext.create('App.view.Viewport');
                    });
                }
            });
		</script>
	</body>
</html>