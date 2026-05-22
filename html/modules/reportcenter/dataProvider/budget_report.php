<?php
namespace modules\reportcenter\dataProvider;
if (!isset($_SESSION))
{
    session_name('SPIApp');
    session_start();
    session_cache_limiter('private');
}
include_once ('Reports.php');

class budget_report extends Reports
{
    /*
     * The first thing all classes do, the construct.
     */
    function __construct()
    {
        parent::__construct();
        return;
    }

    public function budget_detail_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        //print_r($params->params);
        $this->reportfile = ROOT . '/modules/reportcenter/report/finance_report/budget_vs_actual_detail_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function budget_af_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        //print_r($params->params);
        $this->reportfile = ROOT . '/modules/reportcenter/report/finance_report/budget_vs_actual_afdeling_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function payment_schedule_unit_building_rent_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/rent_report/payment_schedule_unit_building_rent_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function unit_building_service_charge_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/rent_report/unit_building_service_charge_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
}
