<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Chart
{

    /**
     * @var dbHelper
     */
    private $db;
    /**
     * @var
     */

    function __construct()
    {
        $this->db = new dbHelper();
        return;
    }
    public function jenis_order(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        if($params->module=='jenis_so_order') {
            /*$sql = "select periode, item_id, sum(qty)as qty, sum(total)as total from
            (select (select period from get_period(a.doc_date))as periode,b.item_id, b.qty, b.qty*b.price_sale as total
            from ar_sale a
            left join ar_sale_detail b on a.co_id=b.co_id and a.doc_id=b.doc_id
            where extract(year from a.doc_date)=extract(year from current_date) and a.status<>0
            )
            group by periode, item_id";*/
            $sql = "select periode, sum(iif(item_id='CPO01',qty,0))as qty1,sum(iif(item_id='KER01',qty,0))as qty2, sum(total)as total from
            (select (select period from get_period(a.doc_date))as periode,b.item_id, b.qty, b.qty*b.price_sale as total
            from ar_sale a
            left join ar_sale_detail b on a.co_id=b.co_id and a.doc_id=b.doc_id
            where extract(year from a.doc_date)=extract(year from current_date) and a.status<>0
            )
            group by periode";
        }else if($params->module=='jenis_inv_order'){
            $sql ="select periode, item_id, sum(qty)as qty, sum(total)as total from
            (select (select period from get_period(a.doc_date))as periode,b.item_id, b.qty, b.qty*b.price_sale as total
            from ar_sale a
            left join ar_sale_detail b on a.co_id=b.co_id and a.doc_id=b.doc_id
            where extract(year from a.doc_date)=extract(year from current_date) and b.item_id='KER01' and a.status<>0
            )
            group by periode, item_id";
        }


        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }

}
//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());