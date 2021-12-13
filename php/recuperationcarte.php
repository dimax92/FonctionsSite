<?php
require_once "identifiants.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

$requete="SELECT * FROM coordonneescarte";

$requetesql=$connexion->query("$requete");
while($resultat=mysqli_fetch_object($requetesql)){
    $paramidproduit=json_encode("idproduit");
    $paramnomlieu=json_encode("nomlieu");
    $paramlattitude=json_encode("lattitude");
    $paramlongitude=json_encode("longitude");

    $idproduit=json_encode($resultat->idproduit);
    $nomlieu=json_encode($resultat->nomlieu);
    $lattitude=json_encode($resultat->lattitude);
    $longitude=json_encode($resultat->longitude);
    echo " didi: { $paramidproduit: $idproduit, 
    $paramnomlieu: $nomlieu, 
    $paramlattitude: $lattitude, 
    $paramlongitude: $longitude
 }";
};
$connexion->close();
?>