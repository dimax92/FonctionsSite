<?php
require_once "identifiants.php";
require_once "fonctionauthentification.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

if(testAuthentification($connexion)==="Authentification valide"){
    $idproduit=htmlspecialchars(mysqli_real_escape_string($connexion, $_POST["idproduit"]));

    function suppressionFichier($nomFichierUpload, $connexion, $idproduit) {
        $requeteSuppression="SELECT * FROM produits WHERE '$idproduit'= idproduit ";
        $requetesqlSuppression=$connexion->query("$requeteSuppression");
        while($resultat=mysqli_fetch_object($requetesqlSuppression)){
            $unlink=unlink($nomFichierUpload.basename("$resultat->video"));
            if($unlink){
                return "envoye";
            }else{
                return "echec";
            }
        }
    };
    
    function suppressionDonnees($connexion, $idproduit) {
        $requete="DELETE FROM produits WHERE '$idproduit'= idproduit";
        $requetesql=$connexion->query("$requete");
        if($requetesql){
            return "Donnees supprime";
        }else{
            return "echec";
        }
    };

    function suppressionCommentairesIdProduit($idproduit, $connexion){
        $requete="DELETE FROM commentaires WHERE idproduit='$idproduit'";
        $requetesql = $connexion->query("$requete");
        if($requetesql){
            return "envoye";
        }else{
            return "echec";
        }
    };

    function suppressionLikesIdProduit($idproduit, $connexion){
        $requete="DELETE FROM likes WHERE idproduit='$idproduit'";
        $requetesql = $connexion->query("$requete");
        if($requetesql){
            return "envoye";
        }else{
            return "echec";
        }
    };

    function suppressionDislikesIdProduit($idproduit, $connexion){
        $requete="DELETE FROM dislikes WHERE idproduit='$idproduit'";
        $requetesql = $connexion->query("$requete");
        if($requetesql){
            return "envoye";
        }else{
            return "echec";
        }
    };
    
    if(suppressionFichier($nomFichierUpload, $connexion, $idproduit)==="envoye"){
        if(suppressionCommentairesIdProduit($idproduit, $connexion)==="envoye" AND 
        suppressionLikesIdProduit($idproduit, $connexion)==="envoye" AND 
        suppressionDislikesIdProduit($idproduit, $connexion)==="envoye"){
            if(suppressionDonnees($connexion, $idproduit)==="Donnees supprime"){
                echo "Produit supprime";
            }
        }else{
            echo "echec";
        }
    }else{
        echo "echec";
    }
}else{
    echo "Vous n'etes pas connecte";
}

$connexion->close();
?>