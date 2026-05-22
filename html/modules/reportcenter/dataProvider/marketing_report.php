<?php
namespace modules\reportcenter\dataProvider;
if (!isset($_SESSION))
{
    session_name('SPIApp');
    session_start();
    session_cache_limiter('private');
}
include_once ('Reports.php');

class marketing_report extends Reports
{
    /*
     * The first thing all classes do, the construct.
     */
    function __construct()
    {
        parent::__construct();
        return;
    }

    public function unit_building_monitoring_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/marketing_report/unit_building_monitoring_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function unit_payment_schedule_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/marketing_report/unit_payment_schedule_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function unit_payment_schedule_change_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/marketing_report/unit_payment_schedule_change_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function unit_change_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/marketing_report/unit_change_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function unit_building_cancel_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/marketing_report/unit_building_cancel_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function buyback_unit_building_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/marketing_report/buyback_unit_building_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function unit_building_summary_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/marketing_report/unit_building_summary_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function legal_unit_building_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/marketing_report/legal_unit_building_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function order_letter_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/marketing_report/order_letter_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function recapitulation_sales_order_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/marketing_report/recapitulation_sales_order_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function order_monitoring_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/marketing_report/order_monitoring_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function order_monitoring_recapitulation_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/marketing_report/order_monitoring_recapitulation_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function room_ocupancy_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/marketing_report/room_ocupancy_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }

}
