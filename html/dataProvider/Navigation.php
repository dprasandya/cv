<?php


//include_once(ROOT . '/dataProvider/ACL.php');
include_once(ROOT . '/dataProvider/i18nRouter.php');
include_once (ROOT . '/classes/dbHelper.php');

class Navigation
{
	/**
	 * @var \ACL
	 */
	private $ACL;
	private $i18n;
	private $t;
    private $db;

	function __construct()
	{
		//$this->ACL = new ACL();
		$this->i18n = i18nRouter::getTranslation();
        (object)$this->db = new dbHelper();
        return;
	}

	private function i18n($w){
		return isset($this->i18n[$w]) ? $this->i18n[$w] : '*' . $w . '*';
	}

	public function getNavigation()
	{
		$nav = array();
        $user_id = $_SESSION['user']['id'];
		$nav[] = array(
			'text' => $this->i18n('dashboard'),
			'leaf' => true,
			'cls' => 'file',
			'iconCls' => 'icoDash',
			'id' => 'App.view.dashboard.Dashboard'
		);
		// *************************************************************************************
		// Administration Folder
		// *************************************************************************************

        $perm_cat = "SELECT * FROM acl_perm_cat_permissions('$user_id') where perm_cat<>'reports'";
        $this->db->setSQL($perm_cat);
        $rows_perm_cat = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row_perm_cat) {
            $master = ($row_perm_cat['PERM_CAT']=='master' || $row_perm_cat['PERM_CAT']=='mhris' || $row_perm_cat['PERM_CAT']=='thris') ? false : true;
            $rows_perm_cat = array(
                'text' => $this->i18n( $row_perm_cat['PERM_CAT'] ),
                'cls' => 'file',
                'expanded' => $master,
                'iconCls' => 'icoLogo',
                'id' =>  $row_perm_cat['PERM_CAT']
            );
            $var_perm_cat = $row_perm_cat['PERM_CAT'];
            // sub role //
            $perm_name = "SELECT * FROM acl_perm_key_permissions('$user_id') where perm_cat='$var_perm_cat'";
            $this->db->setSQL($perm_name);
            foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row_perm_name) {
                $rows_perm_cat['children'][] = array(
                    'text' => $this->i18n( $row_perm_name['PERM_NAME'] ),
                    'cls' => 'file',
                    'leaf' => true,
                    'id' =>  $row_perm_name['PERM_KEY']
                );
            }

            array_push($nav, $rows_perm_cat);
        }
/*


		$admin = array(
			'text' => $this->i18n('administration'),
			'cls' => 'folder',
			'expanded' => true,
			'iconCls' => 'icoLogo',
			'id' => 'administration'
		);
        $admin['children'][] = array(
            'text' => $this->i18n('company'),
            'leaf' => true,
            'cls' => 'file',
            'id' => 'App.view.administration.Company'
        );
//		if($this->ACL->hasPermission('access_gloabal_settings')){
			$admin['children'][] = array(
				'text' => $this->i18n('global_settings'),
				'leaf' => true,
				'cls' => 'file',
				'id' => 'App.view.administration.Globals'
			);
//		}
//		if($this->ACL->hasPermission('access_users')){
			$admin['children'][] = array(
				'text' => $this->i18n('users'),
				'leaf' => true,
				'cls' => 'file',
				'id' => 'App.view.administration.Users'
			);
//		}
//		if($this->ACL->hasPermission('access_roles')){
			$admin['children'][] = array(
				'text' => $this->i18n('roles'),
				'leaf' => true,
				'cls' => 'file',
				'id' => 'App.view.administration.Roles'
			);
//		}
//		if($this->ACL->hasPermission('access_admin_modules')){
			$admin['children'][] = array(
				'text' => $this->i18n('modules'),
				'leaf' => true,
				'cls' => 'file',
				'id' => 'App.view.administration.Modules'
			);
            $admin['children'][] = array(
                'text' => $this->i18n('navigation'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.administration.Navigations'
            );
//		}

		if(isset($admin['children']) && count($admin['children']) > 0) array_push($nav, $admin);

        // *************************************************************************************
        // Master
        // *************************************************************************************
        /*$master = array(
            'text' => $this->i18n('master'),
            'cls' => 'folder',
            'expanded' => true,
            'iconCls' => 'icoLogo',
            'id' => 'master'
        );
        $master['children'][] = array(
            'text' => $this->i18n('unit'),
            'leaf' => true,
            'cls' => 'file',
            'id' => 'App.view.master.Unit'
        );
        $master['children'][] = array(
            'text' => $this->i18n('type'),
            'leaf' => true,
            'cls' => 'file',
            'id' => 'App.view.master.Types'
        );
        $master['children'][] = array(
            'text' => $this->i18n('salesman'),
            'leaf' => true,
            'cls' => 'file',
            'id' => 'App.view.master.Salesman'
        );
        $master['children'][] = array(
            'text' => $this->i18n('departments'),
            'leaf' => true,
            'cls' => 'file',
            'id' => 'App.view.master.Department'
        );
        $master['children'][] = array(
            'text' => $this->i18n('customer'),
            'leaf' => true,
            'cls' => 'file',
            'id' => 'App.view.master.Customer'
        );
        $master['children'][] = array(
            'text' => $this->i18n('supplier'),
            'leaf' => true,
            'cls' => 'file',
            'id' => 'App.view.master.Supplier'
        );
        $master['children'][] = array(
            'text' => $this->i18n('route'),
            'leaf' => true,
            'cls' => 'file',
            'id' => 'App.view.master.Route'
        );
        $master['children'][] = array(
            'text' => $this->i18n('tax'),
            'leaf' => true,
            'cls' => 'file',
            'id' => 'App.view.master.Tax'
        );
        $master['children'][] = array(
            'text' => $this->i18n('cashbank'),
            'leaf' => true,
            'cls' => 'file',
            'id' => 'App.view.master.CashBank'
        );
        $master['children'][] = array(
            'text' => $this->i18n('cashflow'),
            'leaf' => true,
            'cls' => 'file',
            'id' => 'App.view.master.Cashflow'
        );
        $master['children'][] = array(
            'text' => $this->i18n('my_account'),
            'leaf' => true,
            'cls' => 'file',
            'id' => 'App.view.master.Account'
        );
        $master['children'][] = array(
            'text' => $this->i18n('account_setting'),
            'leaf' => true,
            'cls' => 'file',
            'id' => 'App.view.master.AccountSetting'
        );
        $master['children'][] = array(
            'text' => $this->i18n('items'),
            'leaf' => true,
            'cls' => 'file',
            'id' => 'App.view.master.Items'
        );
        $master['children'][] = array(
            'text' => $this->i18n('warehouse'),
            'leaf' => true,
            'cls' => 'file',
            'id' => 'App.view.master.Warehouse'
        );
        $master['children'][] = array(
            'text' => $this->i18n('agingasset'),
            'leaf' => true,
            'cls' => 'file',
            'id' => 'App.view.master.AgingAsset'
        );
        $master['children'][] = array(
            'text' => $this->i18n('depreciation_asset'),
            'leaf' => true,
            'cls' => 'file',
            'id' => 'App.view.master.DepreciationAsset'
        );
        $master['children'][] = array(
            'text' => $this->i18n('giro_check'),
            'leaf' => true,
            'cls' => 'file',
            'id' => 'App.view.master.Giro_Check'
        );
        $master['children'][] = array(
            'text' => $this->i18n('rounding'),
            'leaf' => true,
            'cls' => 'file',
            'id' => 'App.view.master.Rounding'
        );
        $master['children'][] = array(
            'text' => $this->i18n('document_setting'),
            'leaf' => true,
            'cls' => 'file',
            'id' => 'App.view.master.DocumentSetting'
        );
        if(isset($master['children']) && count($master['children']) > 0) array_push($nav, $master);
// *************************************************************************************
        // Miscellaneous Folder
        // *************************************************************************************

        $marketing = array(
            'text' => $this->i18n('marketing'),
            'cls' => 'folder',
            'expanded' => true,
            'iconCls' => 'icoLogo',
            'id' => 'marketing'
        );
            $marketing['children'][] = array(
                'text' => $this->i18n('salesorder'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.salesorder.Sales_order'
            );
            $marketing['children'][] = array(
                'text' => $this->i18n('approved_salesorder'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.salesorder.Approved_salesorder'
            );

        $logistics = array(
            'text' => $this->i18n('logistics'),
            'cls' => 'folder',
            'expanded' => true,
            'iconCls' => 'icoLogo',
            'id' => 'logistics'
        );
            $logistics['children'][] = array(
                'text' => $this->i18n('purchaseorder'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.purchase_order.Purchase_order'
            );
            $logistics['children'][] = array(
                'text' => $this->i18n('stock_opname'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.stock.Stock_opname'
            );
            $logistics['children'][] = array(
                'text' => $this->i18n('formula'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.master.Formula'
            );
        $production = array(
            'text' => $this->i18n('production'),
            'cls' => 'folder',
            'expanded' => true,
            'iconCls' => 'icoLogo',
            'id' => 'production'
        );
            $production['children'][] = array(
                'text' => $this->i18n('goodsreceived'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.purchase_order.Goods_received'
            );
            $production['children'][] = array(
                'text' => $this->i18n('purchaseorder_out'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.purchase_order.Purchase_order_out'
            );
            $production['children'][] = array(
                'text' => $this->i18n('purchaseorder_in'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.purchase_order.Purchase_order_in'
            );
            $production['children'][] = array(
                'text' => $this->i18n('production'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.production.Production'
            );
            $production['children'][] = array(
                'text' => $this->i18n('deliveryorder'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.deliveryorder.Delivery_order'
            );
            $production['children'][] = array(
                'text' => $this->i18n('warehouse_tx_rx'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.stock.Warehouse_tx_rx'
            );

        $ar = array(
            'text' => $this->i18n('ar'),
            'cls' => 'folder',
            'expanded' => true,
            'iconCls' => 'icoLogo',
            'id' => 'ar'
        );
            $ar['children'][] = array(
                'text' => $this->i18n('ar'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.ar_invoice.AR_Invoice'
            );
            $ar['children'][] = array(
                'text' => $this->i18n('ar_add_billing'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.ar_invoice.AR_Add_Billing'
            );
            $ar['children'][] = array(
                'text' => $this->i18n('ar_payment'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.ar_invoice.AR_Payment'
            );
            $ar['children'][] = array(
                'text' => $this->i18n('ar_deduction'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.ar_invoice.AR_Deduction'
            );
            $ar['children'][] = array(
                'text' => $this->i18n('ar_advance'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.ar_invoice.AR_Advance'
            );
            $ar['children'][] = array(
                'text' => $this->i18n('ar_alocation'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.ar_invoice.AR_Alocation'
            );
            $ar['children'][] = array(
                'text' => $this->i18n('refund'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.refund.Refund_AR'
            );
        $ap = array(
            'text' => $this->i18n('ap'),
            'cls' => 'folder',
            'expanded' => true,
            'iconCls' => 'icoLogo',
            'id' => 'ap'
        );
            $ap['children'][] = array(
                'text' => $this->i18n('ap'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.ap_invoice.AP_Invoice'
            );
            $ap['children'][] = array(
                'text' => $this->i18n('ap_payment'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.ap_invoice.AP_Payment'
            );
            $ap['children'][] = array(
                'text' => $this->i18n('ap_deduction'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.ap_invoice.AP_Deduction'
            );
            $ap['children'][] = array(
                'text' => $this->i18n('ap_advance'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.ap_invoice.AP_Advance'
            );
            $ap['children'][] = array(
                'text' => $this->i18n('ap_alocation'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.ap_invoice.AP_Alocation'
            );
            $ap['children'][] = array(
                'text' => $this->i18n('refund'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.refund.Refund_AP'
            );
        $cashbank = array(
            'text' => $this->i18n('cashbank'),
            'cls' => 'folder',
            'expanded' => true,
            'iconCls' => 'icoLogo',
            'id' => 'cashbank'
        );
            $cashbank['children'][] = array(
                'text' => $this->i18n('cashbookin'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.cashbank.Cashbook_in'
            );
            $cashbank['children'][] = array(
                'text' => $this->i18n('cashbookout'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.cashbank.Cashbook_out'
            );
            $cashbank['children'][] = array(
                'text' => $this->i18n('cashbon'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.cashbank.Cashbon'
            );
            $cashbank['children'][] = array(
                'text' => $this->i18n('bankbookin'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.cashbank.Bankbook_in'
            );
            $cashbank['children'][] = array(
                'text' => $this->i18n('bankbookout'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.cashbank.Bankbook_out'
            );
        $gl = array(
            'text' => $this->i18n('gl'),
            'cls' => 'folder',
            'expanded' => true,
            'iconCls' => 'icoLogo',
            'id' => 'gl'
        );
            $gl['children'][] = array(
                'text' => $this->i18n('accumulation_depreciation_asset'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.asset.Accumulation_Asset'
            );
            $gl['children'][] = array(
                'text' => $this->i18n('joining_asset'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.asset.Joining_Asset'
            );
            $gl['children'][] = array(
                'text' => $this->i18n('tax_payment'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.tax.Tax_payment'
            );
            $gl['children'][] = array(
                'text' => $this->i18n('closing_asset'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.asset.Closing_Asset'
            );
            $gl['children'][] = array(
                'text' => $this->i18n('gl'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.general_ledger.General_ledger'
            );
            $gl['children'][] = array(
                'text' => $this->i18n('audit_adjustment'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.general_ledger.Audit_adjustment'
            );
            $gl['children'][] = array(
                'text' => $this->i18n('reclass'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.reclass.Reclass'
            );
            $gl['children'][] = array(
                'text' => 'Reclass Hpp',
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.reclass.Reclass_hpp'
            );
            $gl['children'][] = array(
                'text' => 'Reclass Transport',
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.reclass.Reclass_transport'
            );
            $gl['children'][] = array(
                'text' => $this->i18n('recalculate'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.recalculate.Recalculate'
            );
            $gl['children'][] = array(
                'text' => $this->i18n('unpost'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.recalculate.Unposting_transactions'
            );
            $gl['children'][] = array(
                'text' => $this->i18n('cancel'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.recalculate.Cancel_transactions'
            );
            $gl['children'][] = array(
                'text' => $this->i18n('closed'),
                'leaf' => true,
                'cls' => 'file',
                'id' => 'App.view.transactions.closing.Closing'
            );

        if(isset($marketing['children']) && count($marketing['children']) >= 0) array_push($nav, $marketing);
        if(isset($logistics['children']) && count($logistics['children']) >= 0) array_push($nav, $logistics);
        if(isset($production['children']) && count($production['children']) >= 0) array_push($nav, $production);
        if(isset($ar['children']) && count($ar['children']) >= 0) array_push($nav, $ar);
        if(isset($ap['children']) && count($ap['children']) >= 0) array_push($nav, $ap);
        if(isset($cashbank['children']) && count($cashbank['children']) >= 0) array_push($nav, $cashbank);
        if(isset($gl['children']) && count($gl['children']) >= 0) array_push($nav, $gl);
*/

		// *************************************************************************************
		// Miscellaneous Folder
		// *************************************************************************************
		$misc = array(
			'text' => $this->i18n('miscellaneous'),
			'cls' => 'folder',
			'expanded' => true,
			'iconCls' => 'icoLogo',
			'id' => 'miscellaneous'
		);

		$misc['children'][] = array(
			'text' => $this->i18n('my_account'),
			'leaf' => true,
			'cls' => 'file',
			'id' => 'App.view.miscellaneous.MyAccount'
		);

		if(isset($misc['children']) && count($misc['children']) > 0) array_push($nav, $misc);

		return $nav;

	}

}
