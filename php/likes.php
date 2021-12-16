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
    $identifiant=mysqli_real_escape_string($connexion, recuperationIdentifiantUtilisateur($authentifiant, $connexion));

    function recuperationLikes($identifiant, $connexion, $idproduit){
        $compteur=0;
        $requeteIdentifiant="SELECT * FROM likes WHERE identifiant='$identifiant'";
        $requeteIdentifiantsql=$connexion->query("$requeteIdentifiant");
        while($resultatIdentifiant=mysqli_fetch_object($requeteIdentifiantsql)){
            if($resultatIdentifiant->idproduit === $idproduit){
                $compteur=1;
            }
        };
        return $compteur;
    };
    
    function recuperationDislikes($identifiant, $connexion, $idproduit){
        $compteur=0;
        $requeteIdentifiant="SELECT * FROM dislikes WHERE identifiant='$identifiant'";
        $requeteIdentifiantsql=$connexion->query("$requeteIdentifiant");
        while($resultatIdentifiant=mysqli_fetch_object($requeteIdentifiantsql)){
            if($resultatIdentifiant->idproduit === $idproduit){
                $compteur=1;
            }
        };
        return $compteur;
    };
    
    function ajoutLike($identifiant, $idproduit, $connexion){
        $requete="INSERT INTO likes(identifiant, idproduit) VALUES ('$identifiant', '$idproduit')";
        $requetesql = $connexion->query("$requete");
        if($requetesql){
            return "envoye";
        }
    };

    function ajoutLikeProduit($idproduit, $connexion){
        $requete=" UPDATE produits SET likes=likes+1 WHERE '$idproduit'= idproduit ";
        $requetesql = $connexion->query("$requete");
        if($requetesql){
            return "envoye";
        }
    };
    
    
    if(recuperationidentifiantProduit($idproduit, $connexion)!==recuperationIdentifiantUtilisateur($authentifiant, $connexion)){
        if(recuperationLikes($identifiant, $connexion, $idproduit)===0 AND recuperationDislikes($identifiant, $connexion, $idproduit)===0){
            if(ajoutLike($identifiant, $idproduit, $connexion)==="envoye" AND ajoutLikeProduit($idproduit, $connexion)==="envoye"){
                echo "like envoye";
            }else{
                echo "echec envoie like";
            };
        }else{
            echo "vous avez deja mis un like ou un dislike";
        }
    }else{
        echo "Vous ne pouvez pas mettre de like sur votre produit";
    }
}else{
    echo "Vous n'etes pas connecte";
};

$connexion->close();
?>