<?php
require_once "identifiants.php";
require_once "fonctionauthentification.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

if(testAuthentification($connexion)==="Authentification valide"){
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
    
    function recuperationNbCommentaires($authentifiant, $connexion){
        $requeteIdentifiant="SELECT * FROM inscription WHERE authentification='$authentifiant'";
        $requeteIdentifiantsql=$connexion->query("$requeteIdentifiant");
        while($resultatIdentifiant=mysqli_fetch_object($requeteIdentifiantsql)){
            return $resultatIdentifiant->nbcommentaires;
        }
    };
    
    function recuperationTempsAttente($authentifiant, $connexion){
        $requeteIdentifiant="SELECT * FROM inscription WHERE authentification='$authentifiant'";
        $requeteIdentifiantsql=$connexion->query("$requeteIdentifiant");
        while($resultatIdentifiant=mysqli_fetch_object($requeteIdentifiantsql)){
            return $resultatIdentifiant->tempsattente;
        }
    };
    
    function envoiCommentaire($idproduit, $pseudo, $commentaire, $connexion){
        $requete="INSERT INTO commentaires(idproduit, pseudo, commentaire) VALUES ('$idproduit', '$pseudo', '$commentaire')";
        $requetesql = $connexion->query("$requete");
        if($requetesql){
            return "envoye";
        }
    };
    
    function nbCommentaires($authentifiant, $connexion){
        $requeteNombre=" UPDATE inscription SET nbcommentaires=nbcommentaires+1 WHERE '$authentifiant'= authentification ";
        $requetesqlNombre = $connexion->query("$requeteNombre");
        if($requetesqlNombre){
            return "envoye";
        }
    };
    
    function nbCommentairesZero($authentifiant, $connexion){
        $requeteNombre=" UPDATE inscription SET nbcommentaires=0 WHERE '$authentifiant'= authentification ";
        $requetesqlNombre = $connexion->query("$requeteNombre");
        if($requetesqlNombre){
            return "envoye";
        }
    };
    
    function tempsAttente($authentifiant, $connexion){
        $tempsAttente=time()+86400;
        $requeteNombre=" UPDATE inscription SET tempsattente='$tempsAttente' WHERE '$authentifiant'= authentification ";
        $requetesqlNombre = $connexion->query("$requeteNombre");
        if($requetesqlNombre){
            return "envoye";
        }
    };
    
    if(recuperationNbCommentaires($authentifiant, $connexion)>=2){
        nbCommentairesZero($authentifiant, $connexion);
        tempsAttente($authentifiant, $connexion);
        echo "Vous n'avez le droit qu'a 2 commentaires par jour";
    }else{
        if(recuperationTempsAttente($authentifiant, $connexion)<=time()){
            if(envoiCommentaire($idproduit, $pseudo, $commentaire, $connexion)==="envoye"){
                nbCommentaires($authentifiant, $connexion);
                echo "Commentaire envoye";
            }else{
                echo "Echec envoi commentaire";
            }
        }else{
            echo "Vous n'avez le droit qu'a 2 commentaires par jour";
        }
    };
}else{
    echo "Vous n'etes pas connecte";
}

$connexion->close();
?>