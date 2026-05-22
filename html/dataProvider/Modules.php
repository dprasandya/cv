<?php

include_once(ROOT . '/classes/dbHelper.php');
include_once(ROOT . '/classes/FileManager.php');

class Modules {
	/**
	 * @var string
	 */
	private $modulesDir;
    private $db;

	function __construct() {
		$this->modulesDir = ROOT . '/modules/';
        $this->db = new dbHelper();
		$this->setNewModules();
	}

	/**
	 * get all modules inside the modules directory
	 * @return array
	 */
	public function getAllModules() {
		$modules = array();
		foreach(FileManager::scanDir($this->modulesDir) AS $module){
			$modules[] = $this->getModuleConfig($module);
		}
		return $modules;
	}

	/**
	 * get only modules that are set "active":true in conf.json
	 * @return array
	 */
	public function getActiveModules() {
        $modules = array();
        foreach (FileManager::scanDir($this->modulesDir) AS $module) {
            $foo = $this->getModuleConfig($module);
            if ($foo['active']){
                $name = $foo['module_name'];
                $this->db->setSQL("SELECT * FROM modules WHERE module_name = '$name'");
                $rec = $this->db->fetchRecord(PDO::FETCH_ASSOC);
                $rec = array_change_key_case($rec);
                if($rec === false)
                    continue;
                $modules[] = array_merge($foo, $rec);
            }
        }
        return $modules;
	}

	/**
	 * get only site enabled modules
	 * @return array
	 */
	public function getEnabledModules() {
        $modules = array();
        $this->db->setSQL("SELECT * FROM modules WHERE enabled = 1");
        foreach($this->db->fetchRecords(PDO::FETCH_ASSOC) AS $m){
            $m = array_change_key_case($m);
            $foo = $this->getModuleConfig($m['module_name']);
            if ($foo['active']) {
                $modules[] = $foo;
                if (isset($foo['actionsAPI']))
                    unset($foo['actionsAPI']);
                if (isset($foo['extjs']))
                    unset($foo['extjs']);
                if (isset($foo['install']))
                    unset($foo['install']);
                $_SESSION['site']['modules'][$foo['name']] = $foo;
            }
        }
        return $modules;

	}

	/**
	 * get only site disabled modules
	 * @return array
	 */
	public function getDisabledModules() {
        $modules = array();
        $this->db->setSQL("SELECT * FROM modules WHERE enabled = 0");
        foreach($this->db->fetchRecords(PDO::FETCH_ASSOC) AS $m){
            $m = array_change_key_case($m);
            $foo = $this->getModuleConfig($m['module_name']);
            if ($foo['active']) $modules[] = $foo;
        }
        return $modules;
    }

	public function updateModule($params) {
        $data = array();
        if(isset($params->enabled))     $data['enabled']    = $params->enabled;
        if(isset($params->licensekey))  $data['licensekey'] = $params->licensekey;
        if(isset($params->localkey))    $data['localkey']   = $params->localkey;
        $this->db->setSQL($this->db->sqlBind($data, 'modules', 'U', array('module_name' => $params->module_name)));
        $this->db->execOnly();
        return $params;
	}

	public function getEnabledModulesAPI() {
		$actions = array();
		foreach($this->getEnabledModules() AS $module){
			$actions = array_merge($actions, $module['actionsAPI']);
		}
		return $actions;
	}

	/**
	 * get modules config data by module name
	 * @param $moduleName
	 * @return bool|mixed
	 */
	private function getModuleConfig($moduleName) {
		if(is_dir($this->modulesDir . $moduleName)){
			$text = file_get_contents($this->modulesDir . $moduleName . '/conf.json');
			return json_decode($text, true);
		}
		return false;
	}

	public function getModuleByName($moduleName) {
        $this->db->setSQL("SELECT * FROM modules WHERE module_name = '$moduleName'");
        $m = $this->db->fetchRecord(PDO::FETCH_ASSOC);
        $m = array_change_key_case($m);
        $foo = $this->getModuleConfig($m['module_name']);
        if ($foo['active']) {
            return array_merge($m,$foo);
        }else{
            return array();
        }
	}

	/**
	 * this method will insert the new active modules in site database if
	 * does not exist
	 */
	private function setNewModules() {
		foreach(FileManager::scanDir($this->modulesDir) AS $module){
			$ModuleConfig = $this->getModuleConfig($module);
			if($ModuleConfig['active']){

                $name = $ModuleConfig['module_name'];
                $this->db->setSQL("SELECT count(*) AS total FROM modules WHERE module_name = '$name'");
                $rec = $this->db->fetchRecord(PDO::FETCH_ASSOC);
                $rec = array_change_key_case($rec);
                if($rec['total'] == 0){
                    $data['module_name'] = $ModuleConfig['name'];
                    $data['enabled'] = 0;
                    $data['installed_version'] = $ModuleConfig['version'];
                    $this->db->setSQL($this->db->sqlBind($data, 'modules', 'I'));
                    $this->db->execOnly();
                }

			}
		}
		return;
	}
}

//print '<pre>';
//$m = new Modules();

//print '****All MODULES***** <br>';
/*
print_r($m->getAllModules());
print '*****Active MODULES***** <br>';
print_r($m->getActiveModules());
print '*****Enabled MODULES***** <br>';
print_r($m->getEnabledModules());
print '*****Disabled MODULES***** <br>';
print_r($m->getDisabledModules());

print_r($m->getModuleByName('reportcenter'));
print 'hello';
*/