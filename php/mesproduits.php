<?php
require_once "identifiants.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

$identifiant=mysqli_real_escape_string($connexion, $_COOKIE["identifiant"]);
$requete="SELECT * FROM produits WHERE '$identifiant'= identifiant ";
$requetesql=$connexion->query("$requete");
while($resultat=mysqli_fetch_object($requetesql)){
    //$id=json_encode($resultat->id);
    $paramnom=json_encode("nom");
    $paramvideo=json_encode("video");
    $paramprix=json_encode("prix");
    $paramdevise=json_encode("devise");
    $nom=json_encode($resultat->nom);
    $video=json_encode($resultat->video);
    $prix=json_encode($resultat->prix);
    $devise=json_encode($resultat->devise);
echo " didi: { $paramnom: $nom, $paramvideo: $video, $paramprix: $prix, $paramdevise: $devise }";
}

$connexion->close();
?>