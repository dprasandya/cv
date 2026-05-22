<?php
namespace modules\reportcenter\dataProvider;
if (!isset($_SESSION))
{
    session_name('SPIApp');
    session_start();
    session_cache_limiter('private');
}
include_once ('Reports.php');

class hris_report extends Reports
{
    /*
     * The first thing all classes do, the construct.
     */
    function __construct()
    {
        parent::__construct();
        return;
    }

    public function employee_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $params->params->report_usrname = $_SESSION['user']['usrname'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/employee_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function pph21_form_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/pph21_form_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function tax_pph21_form_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/tax_pph21_form_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function pph21_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/pph21_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function tax_pph21_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/tax_pph21_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function pph21_year_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/pph21_year_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function pph21_sim_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/pph21_sim_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function salary_slip_form_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $params->params->report_usrname = $_SESSION['user']['usrname'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/salary_slip_form_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function salary_slip_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $params->params->report_usrname = $_SESSION['user']['usrname'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/salary_slip_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function salary_format_bni_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $params->params->report_usrname = $_SESSION['user']['usrname'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/salary_format_bni_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function tax_salary_slip_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/tax_salary_slip_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function salary_pph21_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/salary_pph21_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function bonus_thr_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $params->params->report_usrname = $_SESSION['user']['usrname'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/bonus_thr_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }

    public function tax_bonus_thr_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/tax_bonus_thr_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }

    public function salary_slip_rekening_agro(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/salary_slip_rekening_agro.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }

    public function employee_form_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $params->params->report_root_image = ROOT . '/upload/';
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/employee_form_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }

    public function employee_form_ringkasan(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $params->params->report_root_image = ROOT . '/upload/';
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/emp_daftar_employee.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function attendance_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/attendance_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function attendance_summary_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $params->params->report_usrname = $_SESSION['user']['usrname'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/attendance_summary_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function attendance_summary_2_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $params->params->report_usrname = $_SESSION['user']['usrname'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/attendance_summary_2_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function attendance_overtime_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $params->params->report_usrname = $_SESSION['user']['usrname'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/attendance_overtime_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function schedule_shift_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $params->params->report_usrname = $_SESSION['user']['usrname'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/schedule_shift_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function leave_form_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $params->params->report_user_id = $_SESSION['user']['id'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/leave_form_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function outstation_form_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/outstation_form_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function hris_asset_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/asset_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function asset_management_form_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $params->params->report_user_id = $_SESSION['user']['id'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/asset_management_form_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function overtime_form_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $params->params->report_user_id = $_SESSION['user']['id'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/overtime_form_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function overtime_detail_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $params->params->report_usrname = $_SESSION['user']['usrname'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/overtime_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function premi_detail_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $params->params->report_usrname = $_SESSION['user']['usrname'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/premi_detail_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function premi_emp_detail_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $params->params->report_usrname = $_SESSION['user']['usrname'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/premi_emp_detail_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function premi_afd_detail_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $params->params->report_usrname = $_SESSION['user']['usrname'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/premi_afdeling_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function mutation_form_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/mutation_form_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function salary_slip_harian_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $params->params->report_usrname = $_SESSION['user']['usrname'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/salary_slip_harian_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function salary_tr_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $params->params->report_usrname = $_SESSION['user']['usrname'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/salary_tr_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function kopra_mandiri_report(\stdClass $params)
    {
        $params->params->report_co_id = $_SESSION['user']['site'];
        $params->params->report_usrname = $_SESSION['user']['usrname'];
        $this->reportfile = ROOT . '/modules/reportcenter/report/hris_report/kopra_mandiri_report.jasper';
        $url = $this->report_execute($params);
        return array(
            'success' => true,
            'url' => $url
        );
    }



}
