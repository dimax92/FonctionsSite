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
    
    function recuperationidentifiantProduit($idproduit, $connexion){
        $requeteIdentifiant="SELECT * FROM produits WHERE idproduit='$idproduit'";
        $requeteIdentifiantsql=$connexion->query("$requeteIdentifiant");
        while($resultatIdentifiant=mysqli_fetch_object($requeteIdentifiantsql)){
            return $resultatIdentifiant->identifiant;
        }
    };

    function recuperationIdentifiantUtilisateur($authentifiant, $connexion){
        $requeteIdentifiant="SELECT * FROM inscription WHERE authentification='$authentifiant'";
        $requeteIdentifiantsql=$connexion->query("$requeteIdentifiant");
        while($resultatIdentifiant=mysqli_fetch_object($requeteIdentifiantsql)){
            return $resultatIdentifiant->identifiant;
        }
    };

    function recuperationLikes($authentifiant, $connexion){
        $requeteIdentifiant="SELECT * FROM inscription WHERE authentification='$authentifiant'";
        $requeteIdentifiantsql=$connexion->query("$requeteIdentifiant");
        while($resultatIdentifiant=mysqli_fetch_object($requeteIdentifiantsql)){
            return $resultatIdentifiant->likes;
        }
    };
    
    function recuperationDislikes($authentifiant, $connexion){
        $requeteIdentifiant="SELECT * FROM inscription WHERE authentification='$authentifiant'";
        $requeteIdentifiantsql=$connexion->query("$requeteIdentifiant");
        while($resultatIdentifiant=mysqli_fetch_object($requeteIdentifiantsql)){
            return $resultatIdentifiant->dislikes;
        }
    };
    
    function ajoutLike($idproduit, $connexion){
        $requete=" UPDATE produits SET likes=likes+1 WHERE '$idproduit'= idproduit ";
        $requetesql = $connexion->query("$requete");
        if($requetesql){
            return "envoye";
        }
    };
    
    function ajoutLikeInscrit($idproduit, $authentifiant, $connexion){
        $requeteInscrit=" UPDATE inscription SET likes=CONCAT(likes, ' $idproduit') WHERE '$authentifiant'= authentification ";
        $requetesqlInscrit = $connexion->query("$requeteInscrit");
        if($requetesqlInscrit){
            return "envoye";
        }
    };
    
    function testEspace($chaine){
        if(preg_match("#[ ]#", $chaine)){
            return "Ok";
        }
    };
    
    function rechercheCorrespondanceLikes($authentifiant, $connexion, $idproduit){
        $chaine=recuperationLikes($authentifiant, $connexion);
        $compteur=0;
        if(testEspace($chaine)==="Ok"){
            $tableauLikes=explode(" ", $chaine);
            for($i=0; $i<=count($tableauLikes)-1; $i++){
                if($tableauLikes[$i]===$idproduit){
                    $compteur=1;
                }
            };
        };
        return $compteur;
    };
    
    function rechercheCorrespondanceDislikes($authentifiant, $connexion, $idproduit){
        $chaine=recuperationDislikes($authentifiant, $connexion);
        $compteur=0;
        if(testEspace($chaine)==="Ok"){
            $tableauDislikes=explode(" ", $chaine);
            for($i=0; $i<=count($tableauDislikes)-1; $i++){
                if($tableauDislikes[$i]===$idproduit){
                    $compteur=1;
                }
            };
        };
        return $compteur;
    };
    
    if(recuperationidentifiantProduit($idproduit, $connexion)!==recuperationIdentifiantUtilisateur($authentifiant, $connexion)){
        if(rechercheCorrespondanceLikes($authentifiant, $connexion, $idproduit)===0 AND rechercheCorrespondanceDislikes($authentifiant, $connexion, $idproduit)===0){
            if(ajoutLike($idproduit, $connexion)==="envoye" AND ajoutLikeInscrit($idproduit, $authentifiant, $connexion)==="envoye"){
                echo "like envoye";
            }else{
                echo "echec envoie like";
            };
        }else{
            echo "vous avez deja mis un like";
        }
    }else{
        echo "Vous ne pouvez pas mettre de like sur votre produit";
    }
}else{
    echo "Vous n'etes pas connecte";
}

$connexion->close();
?>