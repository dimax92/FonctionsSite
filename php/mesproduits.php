<?php
require_once "identifiants.php";
require_once "fonctionauthentification.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

//if(testAuthentification($connexion)==="Authentification valide"){
    $authentifiant=mysqli_real_escape_string($connexion, $_COOKIE["authentifiant"]);

    $requeteIdentifiant="SELECT * FROM inscription WHERE authentification='$authentifiant'";
    $requeteIdentifiantsql=$connexion->query("$requeteIdentifiant");
    while($resultatIdentifiant=mysqli_fetch_object($requeteIdentifiantsql)){
        $identifiant=$resultatIdentifiant->identifiant;
        recuperationDonnees($identifiant, $connexion);
    };
    
    function recuperationDonnees($identifiant, $connexion){
        $identifiante=mysqli_real_escape_string($connexion, $identifiant);
        $requete="SELECT * FROM produits WHERE '$identifiante'= identifiant";
        $requetesql=$connexion->query("$requete");
        while($resultat=mysqli_fetch_object($requetesql)){
            $paramidproduit=json_encode("idproduit");
            $paramnom=json_encode("nom");
            $paramvideo=json_encode("video");
            $paramprix=json_encode("prix");
            $paramdevise=json_encode("devise");
            $idproduit=json_encode($resultat->idproduit);
            $nom=json_encode($resultat->nom);
            $video=json_encode($resultat->video);
            $prix=json_encode($resultat->prix);
            $devise=json_encode($resultat->devise);
            echo " didi: { $paramidproduit: $idproduit, $paramnom: $nom, $paramvideo: $video, $paramprix: $prix, $paramdevise: $devise }";
        }
    };
/*}else{
    echo "Vous n'etes pas connecte";
}*/

$connexion->close();
?>