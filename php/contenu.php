<?php
require_once "identifiants.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

$idproduit=mysqli_real_escape_string($connexion, $_POST["idproduit"]);
$requete="SELECT * FROM produits WHERE '$idproduit'= idproduit ";
$requetesql=$connexion->query("$requete");
while($resultat=mysqli_fetch_object($requetesql)){
    //$id=json_encode($resultat->id);
    $paramnom=json_encode("nom");
    $parammarque=json_encode("marque");
    $paramvideo=json_encode("video");
    $paramvideonom=json_encode("videonom");
    $paramprix=json_encode("prix");
    $paramdevise=json_encode("devise");
    $paramdescriptions=json_encode("descriptions");
    $paramquantite=json_encode("quantite");
    $paramtypes=json_encode("types");
    $paramconditions=json_encode("conditions");
    $paramcoordonnees=json_encode("coordonnees");
    $nom=json_encode($resultat->nom);
    $marque=json_encode($resultat->marque);
    $video=json_encode($resultat->video);
    $videonom=json_encode($resultat->videonom);
    $prix=json_encode($resultat->prix);
    $devise=json_encode($resultat->devise);
    $descriptions=json_encode($resultat->descriptions);
    $quantite=json_encode($resultat->quantite);
    $types=json_encode($resultat->types);
    $conditions=json_encode($resultat->conditions);
    $coordonnees=json_encode($resultat->coordonnees);
    echo " didi: { $paramnom: $nom, $parammarque: $marque, $paramvideo: $video, $paramvideonom: $videonom, $paramprix: $prix, $paramdevise: $devise, 
        $paramdescriptions: $descriptions, $paramquantite: $quantite, $paramtypes: $types, $paramconditions: $conditions, 
        $paramcoordonnees: $coordonnees }";
}

$connexion->close();
?>