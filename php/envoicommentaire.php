<?php
require_once "identifiants.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

$authentifiant=mysqli_real_escape_string($connexion, $_COOKIE["authentifiant"]);
$idproduit=mysqli_real_escape_string($connexion, $_POST["idproduit"]);
$pseudo=mysqli_real_escape_string($connexion, recuperationPseudo($authentifiant, $connexion));
$commentaire=mysqli_real_escape_string($connexion, $_POST["commentaire"]);

function recuperationPseudo($authentifiant, $connexion){
    $requeteIdentifiant="SELECT * FROM inscription WHERE authentification='$authentifiant'";
    $requeteIdentifiantsql=$connexion->query("$requeteIdentifiant");
    while($resultatIdentifiant=mysqli_fetch_object($requeteIdentifiantsql)){
        return $resultatIdentifiant->pseudo;
    }
};

function envoiCommentaire($idproduit, $pseudo, $commentaire, $connexion){
    $requete="INSERT INTO commentaires(idproduit, pseudo, commentaire) VALUES ('$idproduit', '$pseudo', '$commentaire')";
    $requetesql = $connexion->query("$requete");
    if($requetesql){
        return "envoye";
    }
};

if(envoiCommentaire($idproduit, $pseudo, $commentaire, $connexion)==="envoye"){
    echo "envoye";
}else{
    echo "echec";
};

$connexion->close();
?>