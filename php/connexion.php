<?php
require_once "identifiants.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

if(isset($_COOKIE["identifiant"]) AND isset($_COOKIE["identifiant"])){
    $identifiant=mysqli_real_escape_string($connexion, $_COOKIE["identifiant"]);
    $authentifiant=mysqli_real_escape_string($connexion, $_COOKIE["authentifiant"]);
    $requete="SELECT authentification FROM inscription WHERE identifiant='$identifiant'";
    $requetesql = $connexion->query("$requete");
    while($resultat=mysqli_fetch_object($requetesql)){
        if(($resultat->authentification===$authentifiant)){
            echo "Authentification valide";
        }else{
            echo "Authentification invalide";
        }
    }
}else{
    echo "Authentification invalide";
};

$connexion->close();
?>