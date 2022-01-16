<?php
function recuperationAddresseIp(){
    $addresseIp="";
    if(isset($_SERVER["HTTP_CLIENT_IP"]))
        $addresseIp=$_SERVER["HTTP_CLIENT_IP"];
    else if(isset($_SERVER["HTTP_X_FORWARDED_FOR"]))
        $addresseIp=$_SERVER["HTTP_X_FORWARDED_FOR"];
    else if(isset($_SERVER["HTTP_X_FORWARDED"]))
        $addresseIp=$_SERVER["HTTP_X_FORWARDED"];
    else if(isset($_SERVER["HTTP_FORWARDED_FOR"]))
        $addresseIp=$_SERVER["HTTP_FORWARDED_FOR"];
    else if(isset($_SERVER["HTTP_FORWARDED"]))
        $addresseIp=$_SERVER["HTTP_FORWARDED"];
    else if(isset($_SERVER["REMOTE_ADDR"]))
        $addresseIp=$_SERVER["REMOTE_ADDR"];
    else
        $addresseIp="UNKNOWN";
    return $addresseIp;
};

echo recuperationAddresseIp();
?>
