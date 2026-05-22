<?php

$API = array(
	'Modules' => array(
		'methods' => array(
			'getAllModules' => array(
				'len' => 0
			),
			'getActiveModules' => array(
				'len' => 0
			),
			'getEnabledModules' => array(
				'len' => 0
			),
			'getDisabledModules' => array(
				'len' => 0
			),
			'getModuleByName' => array(
				'len' => 1
			),
			'updateModule' => array(
				'len' => 1
			)
		)
	),
	'Globals' => array(
		'methods' => array(
			'setGlobals' => array(
				'len' => 0
			),
			'getGlobals' => array(
				'len' => 0
			),
			'getAllGlobals' => array(
				'len' => 0
			),
			'updateGlobals' => array(
				'len' => 1
			),
            'getLogoURL' => array(
                'len' => 1
            )
		)
	),
	'User' => array(
		'methods' => array(
			'getUsers' => array(
				'len' => 1
			),
			'getUser' => array(
				'len' => 1
			),
			'addUser' => array(
				'len' => 1
			),
			'updateUser' => array(
				'len' => 1
			),
            'deleteUser' => array(
				'len' => 1
			),
			'changePassword' => array(
				'len' => 1
			),
			'usernameExist' => array(
				'len' => 1
			),
			'getCurrentUserData' => array(
				'len' => 0
			),
			'getCurrentUserBasicData' => array(
				'len' => 0
			),
			'updateMyAccount' => array(
				'len' => 1
			),
			'verifyUserPass' => array(
				'len' => 1
			),
			'getUserFullNameById' => array(
				'len' => 1
			),'select' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
		)
	),
	'authProcedures' => array(
		'methods' => array(
			'login' => array(
				'len' => 1
			),
			'ckAuth' => array(
				'len' => 0
			),
			'unAuth' => array(
				'len' => 0
			),
			'getSites' => array(
				'len' => 0
			),
            'getUrl' => array(
                'len' => 1
            )
		)
	),
    /**
     * Comobo Boxes Data Functions
     */
    'CombosData' => array(
        'methods' => array(
            'getOptionsByListId' => array(
                'len' => 1
            ),
            'getTimeZoneList' => array(
                'len' => 1
            ),
            'getUsers' => array(
                'len' => 0
            ),
            'getRoles' => array(
                'len' => 0
            ),
            'getFiledXtypes' => array(
                'len' => 0
            ),
            'getThemes' => array(
                'len' => 0
            )
        )),

	'Navigation' => array(
		'methods' => array(
			'getNavigation' => array(
				'len' => 0
			)
		)
	),
    'Navigations' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
	'Rolesx' => array(
		'methods' => array(
			'getRolePerms' => array(
				'len' => 0
			),
			'updateRolePerm' => array(
				'len' => 1
			),
			'getRolesData' => array(
				'len' => 0
			),
			'saveRolesData' => array(
				'len' => 1
			)
		)
	),
    'Roles' => array(
        'methods' => array(
            'hasRolePerms' => array(
                'len' => 0
            ),
            'getRole' => array(
                'len' => 1
            ),
            'addRole' => array(
                'len' => 1
            ),
            'updateRole' => array(
                'len' => 1
            ),
            'deleteRole' => array(
                'len' => 1
            ),
            'getPermissions' => array(
                'len' => 1
            ),
            'addPermissions' => array(
                'len' => 1
            ),
            'updatePermissions' => array(
                'len' => 1
            ),
            'deletePermissions' => array(
                'len' => 1
            ),
            'getRolePermissions' => array(
                'len' => 1
            ),
            'addRolePermissions' => array(
                'len' => 1
            ),
            'updateRolePermissions' => array(
                'len' => 1
            ),
            'deleteRolePermissions' => array(
                'len' => 1
            ),
            'getUserPermissions' => array(
                'len' => 1
            ),
            'addUserPermissions' => array(
                'len' => 1
            ),
            'updateUserPermissions' => array(
                'len' => 1
            ),
            'deleteUserPermissions' => array(
                'len' => 1
            ),
            'getTypes' => array(
                'len' => 1
            ),
            'addTypes' => array(
                'len' => 1
            ),
            'updateTypes' => array(
                'len' => 1
            ),
            'deleteTypes' => array(
                'len' => 1
            ),
            'popupTypes' => array(
                'len' => 1
            ),'getcRoles' => array(
                'len' => 0
            ),'popup' => array(
                'len' => 1
            ),'getPerm_Key' => array(
                'len' => 1
            ),'getPerm_Key_Btn' => array(
                'len' => 1
            )

        )
    ),
	'ACL' => array(
		'methods' => array(

			'getAclGroups' => array(
				'len' => 1
			),
			'getAclGroup' => array(
				'len' => 1
			),
			'addAclGroup' => array(
				'len' => 1
			),
			'updateAclGroup' => array(
				'len' => 1
			),
			'deleteAclGroup' => array(
				'len' => 1
			),
			'getGroupPerms' => array(
				'len' => 1
			),
			'updateGroupPerms' => array(
				'len' => 1
			),
			'getAclRoles' => array(
				'len' => 1
			),
			'getAclRole' => array(
				'len' => 1
			),
			'addAclRole' => array(
				'len' => 1
			),
			'updateAclRole' => array(
				'len' => 1
			),


			'getAllUserPermsAccess' => array(
				'len' => 0
			),
			'hasPermission' => array(
				'len' => 1
			),
			'emergencyAccess' => array(
				'len' => 1
			)
		)
	),

	'CronJob' => array(
		'methods' => array(
			'run' => array(
				'len' => 0
			)
		)
	),
	'i18nRouter' => array(
		'methods' => array(
			'getTranslation' => array(
				'len' => 0
			),
			'getDefaultLanguage' => array(
				'len' => 0
			),
			'getAvailableLanguages' => array(
				'len' => 0
			)
		)
	),
	'SiteSetup' => array(
		'methods' => array(
			'checkDatabaseCredentials' => array(
				'len' => 1
			),
			'checkRequirements' => array(
				'len' => 0
			),
			'setSiteDirBySiteId' => array(
				'len' => 1
			),
			'createDatabaseStructure' => array(
				'len' => 1
			),
			'loadDatabaseData' => array(
				'len' => 1
			),
			'createSiteAdmin' => array(
				'len' => 1
			),
			'createSConfigurationFile' => array(
				'len' => 1
			),
			'loadCode' => array(
				'len' => 1
			)
		)
	),
    'Customer' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'LivePopup' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'adddetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            ),
            'deletedetail' => array(
                'len' => 1
            )
        )
    ),
    'Supplier' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),

    'Tax' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'CashBank' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'Cashflow' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'Account' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'AccountHpp' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'Chart' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'jenis_order' => array(
                'len' => 1
            )
        )
    ),
    'Items' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'ItemsRowMaterial' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'ItemsFormerBag' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'ItemsPlantation' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'AgingAsset' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'Jurnal' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Cashbook' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'adddetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            ),
            'deletedetail' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'Bankbook' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'adddetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            ),
            'deletedetail' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'adddetail_rlm' => array(
                'len' => 1
            ),
            'updatedetail_rlm' => array(
                'len' => 1
            ),
        )
    ),
    'Warehouse' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'Purchase_order' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'adddetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            ),
            'deletedetail' => array(
                'len' => 1
            )
        )
    ),
    'Approved_Purchase_order' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            )
        )
    ),
    'Closing_Purchase_order' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            )
        )
    ),
    'Goods_received' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'adddetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            ),
            'deletedetail' => array(
                'len' => 1
            )
        )
    ),
    'Former_items' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'DocumentSetting' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            )
        )
    ),
    'Unit' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Salesman' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Department' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Types' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'Form' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'Sales_order' => array(
        'methods' => array(
            'popup' => array(
                'len' => 1
            ),
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            ),
            'selectdetail_ext' => array(
                'len' => 1
            ),
            'adddetail_ext' => array(
                'len' => 1
            ),
            'updatedetail_ext' => array(
                'len' => 1
            ),
            'deletedetail_ext' => array(
                'len' => 1
            ),
        )
    ),
    'Sales_order_revision' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            ),
            'selectdetail_ext' => array(
                'len' => 1
            ),
            'adddetail_ext' => array(
                'len' => 1
            ),
            'updatedetail_ext' => array(
                'len' => 1
            ),
            'deletedetail_ext' => array(
                'len' => 1
            )
        )
    ),
    'Closing_Sales_order' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            )
        )
    ),
    'AP_Invoice' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'select_holding' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'adddetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            ),
            'deletedetail' => array(
                'len' => 1
            )
        )
    ),
    'AP_Invoice_Retention' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'AP_Invoice_buyback_unit' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'AP_Payment' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'adddetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            ),
            'deletedetail' => array(
                'len' => 1
            )
        )
    ),
    'AP_Deduction' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'AP_Alocation' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'AP_Advance' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Workshop' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Workshop_detail' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            )
        )
    ),
    'Workshop_detail_coa' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'AR_Invoice' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'adddetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            ),
            'deletedetail' => array(
                'len' => 1
            ),
            'select_address_send' => array(
                'len' => 1
            ),
            'update_address_send' => array(
                'len' => 1
            )
        )
    ),
    'AR_Payment' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'adddetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            ),
            'deletedetail' => array(
                'len' => 1
            )
        )
    ),
    'AR_Deduction' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'AR_Alocation' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'AR_Advance' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'AR_Bad_debt_provision' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            )
        )
    ),

    'Refund' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'General_ledger' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'adddetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            ),
            'deletedetail' => array(
                'len' => 1
            )
        )
    ),
    'DepreciationAsset' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Accumulation_Asset' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'JurnalAccumulation_Asset' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'Cashbon' => array(
        'methods' => array(
            'select_settlament' => array(
                'len' => 1
            ),
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'adddetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            ),
            'deletedetail' => array(
                'len' => 1
            )
        )
    ),
    'Route' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Delivery_order' => array(
        'methods' => array(
            'select_delivery' => array(
                'len' => 1
            ),
            'select_delivery_bap' => array(
                'len' => 1
            ),
            'update_delivery_bap' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'adddetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            ),
            'deletedetail' => array(
                'len' => 1
            )
        )
    ),
    'Deliveryorder_transport' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Approved_salesorder' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Production' => array(
        'methods' => array(
            'select_salesorder' => array(
                'len' => 1
            ),'popup' => array(
                'len' => 1
            )
        )
    ),
    'Production_row_material' => array(
        'methods' => array(
            'select_salesorder' => array(
                'len' => 1
            ),
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Production_row_material_rm' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'formula' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Production_row_material_rma' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Production_row_material_wp' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Production_row_material_fg' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            
            'formula' => array(
                'len' => 1
            )
        )
    ),
    'Production_row_material_fi' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Production_row_material_coa' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Closing' => array(
        'methods' => array(
            'select_month' => array(
                'len' => 1
            ),
            'add_month' => array(
                'len' => 1
            ),
            'update_month' => array(
                'len' => 1
            ),
            'delete_month' => array(
                'len' => 1
            ),
            'select_year' => array(
                'len' => 1
            ),
            'add_year' => array(
                'len' => 1
            ),
            'update_year' => array(
                'len' => 1
            ),
            'delete_year' => array(
                'len' => 1
            )
        )
    ),
    'Audit_adjustment' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'adddetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            ),
            'deletedetail' => array(
                'len' => 1
            )
        )
    ),
    'Closing_Asset' => array(
        'methods' => array(
            'popup' => array(
                'len' => 1
            ),
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Production_finish_goods' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Production_finish_goods_fg' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Production_finish_goods_coa' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Company' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Giro_Check' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Stock_opname' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'JurnalStock_opname' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'Items_change' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),'select_jurnal' => array(
                'len' => 1
            )
        )
    ),
    'Warehouse_tx' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Warehouse_rx' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Warehouse_tx_rx_detail' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Reclass' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Reclass_plasma' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'JurnalReclass' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'JurnalReclass_plasma' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'Reclass_hpp' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'User_Request' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'JurnalReclass_hpp' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'Reclass_transport' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'JurnalReclass_transport' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'Reclass_afdeling' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'select_detail' => array(
                'len' => 1
            ),
            'add_detail' => array(
                'len' => 1
            )
        )
    ),
    'JurnalReclass_afdeling' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'Reclass_plantation' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'JurnalReclass_plantation' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'Recalculate' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Unposting_transactions' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Transfer_transactions' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            )
        )
    ),
    'Rounding' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Joining_Asset' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Joining_Asset_Detail' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            )
        )
    ),
    'Asset_Age_Changing' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Cancel_transactions' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'JurnalCancel_transactions' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'Formula' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'adddetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            ),
            'deletedetail' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'Tax_payment' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'JurnalTax_payment' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'Purchase_order_out' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'adddetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            ),
            'deletedetail' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'Purchase_order_in' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'adddetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            ),
            'deletedetail' => array(
                'len' => 1
            )
        )
    ),
    'Borrow_items' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Borrow_items_return' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'AccountSetting' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Work_order_letter' => array(
        'methods' => array(
            'popup' => array(
                'len' => 1
            ),
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            )
        )
    ),
    'Delivery_order_letter' => array(
        'methods' => array(
            'popup' => array(
                'len' => 1
            ),
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            )
        )
    ),
    'Charts_sales' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'Charts_order' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),


    'Project' => array(
        'methods' => array(
            'popup' => array(
                'len' => 1
            ),
            'setGlobal' => array(
                'len' => 1
            ),
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Cluster' => array(
        'methods' => array(
            'popup' => array(
                'len' => 1
            ),
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )

    ),
    'UnitBuilding' => array(
        'methods' => array(
            'popup' => array(
                'len' => 1
            ),
            'popup_customer' => array(
                'len' => 1
            ),
            'popup_rent' => array(
                'len' => 1
            ),
            'popup_ci' => array(
                'len' => 1
            ),
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )

    ),
    'BuildingType' => array(
        'methods' => array(
            'popup' => array(
                'len' => 1
            ),
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )

    ),
    'Floor' => array(
        'methods' => array(
            'popup' => array(
                'len' => 1
            ),
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )

    ),
    'Legal' => array(
        'methods' => array(
            'popup' => array(
                'len' => 1
            ),
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Facing' => array(
        'methods' => array(
            'popup' => array(
                'len' => 1
            ),
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Block' => array(
        'methods' => array(
            'popup' => array(
                'len' => 1
            ),
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )

    ),
    'PaymentMethod' => array(
        'methods' => array(
            'popup' => array(
                'len' => 1
            ),
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'CostCode' => array(
        'methods' => array(
            'popup' => array(
                'len' => 1
            ),
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Budget' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'Budgetdetail' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            )
        )
    ),
    'Budgetjurnal' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'Work_order' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'ContractNoPopup' => array(
                'len' => 1
            ),
        )
    ),
    'Work_order_detail' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Work_order_progress' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'Work_order_progress_detail' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Registration' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Registration_unit' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Registration_unit_rent' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Registration_unit_ci' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Registration_unit_ci_change' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            )
        )
    ),
    'Registration_unit_co' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'select_detail' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Registration_approved' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            )
        )
    ),
    'AR_Generate_billing' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            )
        )
    ),
    'Generate_rent' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'select_detail' => array(
                'len' => 1
            )
        )
    ),
    'LandArea' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Kpa' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Legal_unit_building' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'LegalUnitBuilding' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'Sales_recognition' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'select_jurnal' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            )
        )
    ),
    'Cogs_recognition' => array(
        'methods' => array(
            'select_jurnal' => array(
                'len' => 1
            )
        )
    ),
    'Asset_recognition' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'select_jurnal' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            )
        )
    ),
    'Asset_recognition_sales' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'select_jurnal' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            )
        )
    ),
    'Stock_out' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'select_detail' => array(
                'len' => 1
            ),
            'update_detail' => array(
                'len' => 1
            ),
        )
    ),
    'Stock_out_traksi' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'select_detail' => array(
                'len' => 1
            ),
            'update_detail' => array(
                'len' => 1
            ),
        )
    ),
    'Stock_in' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'select_detail' => array(
                'len' => 1
            ),
            'update_detail' => array(
                'len' => 1
            ),
        )
    ),
    'Registration_change' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'select_view' => array(
                'len' => 1
            )
        )
    ),
    'Registration_unit_change' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'select_view' => array(
                'len' => 1
            )
        )
    ),
    'Registration_unit_rent_change' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'select_view' => array(
                'len' => 1
            )
        )
    ),
    'Bpl_M' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),

    'Bpl' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'select_detail' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'ServiceCharge_M' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'ServiceCharge' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'select_detail' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Unit_building_cancel' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'select_detail' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            )
        )
    ),
    'Note' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'RoomType' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'RoomStatus' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'ExtraBed' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'ItemsFormula' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Generate_room_rate' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'select_jurnal' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Generate_advance' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            )
        )
    ),
    'Room_status' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            )
        )
    ),
    'AR_Payment_direct' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            )
        )
    ),
    'Registration_unit_ci_advance' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'TableFB' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'AR_Items' => array(
        'methods' => array(
            'selectdetail' => array(
                'len' => 1
            ),
            'adddetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            ),
            'deletedetail' => array(
                'len' => 1
            )
        )
    ),
    'Kendaraan' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'Afdeling' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'afdeling_group' => array(
                'len' => 1
            )
        )
    ),
    'Afdeling_premi' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'afdeling_group' => array(
                'len' => 1
            )
        )
    ),
    'Mandor' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'adddetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            ),
            'deletedetail' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),




    'HRIS_Workplan' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Sharing_hpp' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Sharing_tbs' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'Reclass_sharing_hpp' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'Reclass_TBM' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'JurnalReclass_TBM' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'Actual_Cost' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'selectdetail' => array(
                'len' => 1
            ),
            'adddetail' => array(
                'len' => 1
            ),
            'updatedetail' => array(
                'len' => 1
            ),
            'deletedetail' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'Station' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'Buy_tbs_plasma' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'Catatan_traksi' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'Pekerjaan' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),


    /* HRIS */
    'HRIS_Job_title' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Job_status' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Department' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Position' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Office_location' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Price_office_location' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Salary_location' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_View_Office_location' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_View_Company' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_View_Job_status' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_View_Salary' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Employee' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'image_upload' => array(
                'len' => 1
            ),
            'select_group' => array(
                'len' => 1
            ),
            'upload_to_machine' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Emp_Education' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Emp_Emergency_Contact' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Emp_Work_Experience' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Emp_Report_Spv' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Emp_Salary' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'select_historical' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Emp_Dependents' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Emp_Training' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Emp_Position' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Emp_Bpjs' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Company' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Lv_Type' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Lv_Entitlement' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Work_week' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Office_hours_detail' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Office_hours' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Work_holiday' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Leave' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Leave_detail' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Leave_list' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Leave_list_approval' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Leave_approval' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Asset_type' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Asset' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Asset_management' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Approved_Asset_management' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Asset_mutation' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Driver' => array(
        'methods' => array(
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Asset_history' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Asset_using_history' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Driver_using_history' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Pph21_Ptkp' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Pph21_Ptkp_rates' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Pph21_Salary_component' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Attendance' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'select_checkbox' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Attendance_sharing_id' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Attendance_BioFinger' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Schedule_shift' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'select_schedule' => array(
                'len' => 1
            ),
            'update_schedule' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Schedule_non_shift' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Shift' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Shift_detail' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Outstation' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Outstation_alocation' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Overtime' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Overtime_detail' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Overtime_rate' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Overtime_request' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Overtime_request_detail' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Overtime_replace' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Salary' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'select_detail' => array(
                'len' => 1
            ),
            'onViewSalary' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Thr' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Salary_unpost' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Salary_correction' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Pph21' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Pph21_period' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Pph21_unpost' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Pph21_updown_rate' => array(
        'methods' => array(
            'update' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Pph21_simulation_period' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Pph21_simulation_unpost' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Pph21_simulation_employee_salary' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Pph21_simulation_updown_rate' => array(
        'methods' => array(
            'update' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Mutation' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Bpjs' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'select_rate' => array(
                'len' => 1
            ),
            'add_rate' => array(
                'len' => 1
            ),
            'update_rate' => array(
                'len' => 1
            ),
            'delete_rate' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Bonus' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_LoanOffice' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Award_attendance' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'select_detail' => array(
                'len' => 1
            ),
            'add_detail' => array(
                'len' => 1
            ),
            'update_detail' => array(
                'len' => 1
            ),
            'delete_detail' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Salary_type' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'select_detail' => array(
                'len' => 1
            ),
            'add_detail' => array(
                'len' => 1
            ),
            'update_detail' => array(
                'len' => 1
            ),
            'delete_detail' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Salary_Adjustment' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Bpjs_employee' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Finger_delete' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),

    'HRIS_Emp_Active_Chart' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Emp_Detail_Active_Chart' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Directorate' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            ),
            'popup' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Penalty' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            )
        )
    ),

    'HRIS_Premi' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            )
        )
    ),
    'HRIS_Premi_coa' => array(
        'methods' => array(
            'select' => array(
                'len' => 1
            ),
            'add' => array(
                'len' => 1
            ),
            'update' => array(
                'len' => 1
            ),
            'delete' => array(
                'len' => 1
            )
        )
    ),








);
