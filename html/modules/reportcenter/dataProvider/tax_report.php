<?php
namespace modules\reportcenter\dataProvider;
if (!isset($_SESSION))
{
    session_name('SPIApp');
    session_start();
    session_cache_limiter('private');
}
include_once ('Reports.php');

class tax_report extends Reports
{
    /*
     * The first thing all classes do, the construct.
     */
    function __construct()
    {
        parent::__construct();
        return;
    }

    public function tax_in_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/tax_report/tax_in_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function tax_out_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/tax_report/tax_out_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }

}
