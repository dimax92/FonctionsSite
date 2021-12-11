<?php
require_once "identifiants.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

$idproduit=mysqli_real_escape_string($connexion, $_POST["idproduit"]);

function recuperationDonnees($idproduit, $connexion){
    $requete="SELECT * FROM commentaires WHERE '$idproduit'= idproduit";
    $requetesql=$connexion->query("$requete");
    while($resultat=mysqli_fetch_object($requetesql)){
        $parampseudo=json_encode("pseudo");
        $paramcommentaire=json_encode("commentaire");
        $pseudo=json_encode($resultat->pseudo);
        $commentaire=json_encode($resultat->commentaire);
        echo " didi: { $parampseudo: $pseudo, $paramcommentaire: $commentaire }";
    }
};

recuperationDonnees($idproduit, $connexion);

$connexion->close();
?>