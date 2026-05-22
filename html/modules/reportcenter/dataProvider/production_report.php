<?php
namespace modules\reportcenter\dataProvider;
if (!isset($_SESSION))
{
    session_name('SPIApp');
    session_start();
    session_cache_limiter('private');
}
include_once ('Reports.php');

class production_report extends Reports
{
    /*
     * The first thing all classes do, the construct.
     */
    function __construct()
    {
        parent::__construct();
        return;
    }
    public function work_order_letter_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/production_report/work_order_letter.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function production_by_day_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/production_report/production_by_day_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function detail_production_day_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/production_report/detail_production_day_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function deliveryorder_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/production_report/deliveryorder_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function do_monitoring_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/production_report/do_monitoring_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function deliveryorder_bap_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/production_report/deliveryorder_bap_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }

}
