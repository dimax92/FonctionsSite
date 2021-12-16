<?php
require_once "identifiants.php";
require_once "fonctionauthentification.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

if(testAuthentification($connexion)==="Authentification valide"){
    $authentifiant=mysqli_real_escape_string($connexion, $_COOKIE["authentifiant"]);

    function recuperationIdentifiantUtilisateur($authentifiant, $connexion){
        $requeteIdentifiant="SELECT * FROM inscription WHERE authentification='$authentifiant'";
        $requeteIdentifiantsql=$connexion->query("$requeteIdentifiant");
        while($resultatIdentifiant=mysqli_fetch_object($requeteIdentifiantsql)){
            return $resultatIdentifiant->identifiant;
        }
    };
    $identifiant=mysqli_real_escape_string($connexion, recuperationIdentifiantUtilisateur($authentifiant, $connexion));

    function recuperationPseudo($authentifiant, $connexion){
        $requeteIdentifiant="SELECT * FROM inscription WHERE authentification='$authentifiant'";
        $requeteIdentifiantsql=$connexion->query("$requeteIdentifiant");
        while($resultatIdentifiant=mysqli_fetch_object($requeteIdentifiantsql)){
            return $resultatIdentifiant->pseudo;
        }
    };
    $pseudo=mysqli_real_escape_string($connexion, recuperationPseudo($authentifiant, $connexion));

    function recuperationProduits($identifiant, $connexion){
        $requeteIdentifiant="SELECT * FROM produits WHERE identifiant='$identifiant'";
        $requeteIdentifiantsql=$connexion->query("$requeteIdentifiant");
        while($resultatIdentifiant=mysqli_fetch_object($requeteIdentifiantsql)){
            suppressionCommentairesIdProduit($resultatIdentifiant->idproduit, $connexion);
            suppressionLikesIdProduit($resultatIdentifiant->idproduit, $connexion);
            suppressionDislikesIdProduit($resultatIdentifiant->idproduit, $connexion);
            suppressionFichier($resultatIdentifiant->idproduit, $connexion);
            MiseJourLikeProduit($resultatIdentifiant->idproduit, $connexion);
            MiseJourDislikeProduit($resultatIdentifiant->idproduit, $connexion);
        };
        return "efface";
    };

    function suppressionProduits($identifiant, $connexion){
        $requete="DELETE FROM produits WHERE identifiant='$identifiant'";
        $requetesql = $connexion->query("$requete");
        if($requetesql){
            return "envoye";
        }else{
            return "echec";
        }
    };

    function suppressionCommentairesIdProduit($idproduit, $connexion){
        $idproduit=mysqli_real_escape_string($connexion, $idproduit);
        $requete="DELETE FROM commentaires WHERE idproduit='$idproduit'";
        $requetesql = $connexion->query("$requete");
        if($requetesql){
            return "envoye";
        }else{
            return "echec";
        }
    };

    function suppressionLikesIdProduit($idproduit, $connexion){
        $idproduit=mysqli_real_escape_string($connexion, $idproduit);
        $requete="DELETE FROM likes WHERE idproduit='$idproduit'";
        $requetesql = $connexion->query("$requete");
        if($requetesql){
            return "envoye";
        }else{
            return "echec";
        }
    };

    function suppressionDislikesIdProduit($idproduit, $connexion){
        $idproduit=mysqli_real_escape_string($connexion, $idproduit);
        $requete="DELETE FROM dislikes WHERE idproduit='$idproduit'";
        $requetesql = $connexion->query("$requete");
        if($requetesql){
            return "envoye";
        }else{
            return "echec";
        }
    };

    function suppressionCommentairesIdentifiant($pseudo, $connexion){
        $requete="DELETE FROM commentaires WHERE pseudo='$pseudo'";
        $requetesql = $connexion->query("$requete");
        if($requetesql){
            return "envoye";
        }else{
            return "echec";
        }
    };

    function suppressionLikesIdentifiant($identifiant, $connexion){
        $requete="DELETE FROM likes WHERE identifiant='$identifiant'";
        $requetesql = $connexion->query("$requete");
        if($requetesql){
            return "envoye";
        }else{
            return "echec";
        }
    };

    function suppressionDislikesIdentifiant($identifiant, $connexion){
        $requete="DELETE FROM dislikes WHERE identifiant='$identifiant'";
        $requetesql = $connexion->query("$requete");
        if($requetesql){
            return "envoye";
        }else{
            return "echec";
        }
    };

    function desinscription($connexion, $authentifiant){
        $requete="DELETE FROM inscription WHERE authentification='$authentifiant'";
        $requetesql = $connexion->query("$requete");
        if($requetesql){
            return "envoye";
        }else{
            return "echec";
        }
    };

    function MiseJourDislikeProduit($idproduit, $connexion){
        $idproduit=mysqli_real_escape_string($connexion, $idproduit);
        $requete=" UPDATE produits SET dislikes=dislikes-1 WHERE '$idproduit'= idproduit ";
        $requetesql = $connexion->query("$requete");
        if($requetesql){
            return "envoye";
        }
    };

    function MiseJourLikeProduit($idproduit, $connexion){
        $idproduit=mysqli_real_escape_string($connexion, $idproduit);
        $requete=" UPDATE produits SET likes=likes-1 WHERE '$idproduit'= idproduit ";
        $requetesql = $connexion->query("$requete");
        if($requetesql){
            return "envoye";
        }
    };

    function suppressionFichier($idproduit, $connexion) {
        $idproduit=mysqli_real_escape_string($connexion, $idproduit);
        $requeteSuppression="SELECT * FROM produits WHERE '$idproduit'= idproduit ";
        $requetesqlSuppression=$connexion->query("$requeteSuppression");
        while($resultat=mysqli_fetch_object($requetesqlSuppression)){
            $unlink=unlink("C:/wamp64/www/NouveauSite/Videos/".basename("$resultat->video"));
        };
    };

    if(recuperationProduits($identifiant, $connexion)==="efface" AND 
    suppressionCommentairesIdentifiant($pseudo, $connexion)==="envoye" AND 
    suppressionLikesIdentifiant($identifiant, $connexion)==="envoye" AND 
    suppressionDislikesIdentifiant($identifiant, $connexion)==="envoye"){
        if(suppressionProduits($identifiant, $connexion)==="envoye"){
            if(desinscription($connexion, $authentifiant)==="envoye"){
                echo "Vous n'etes plus inscrit";
            }else{
                echo "Echec de la desinscription";
            }
        }else{
            echo "Donnees non supprimes";
        }
    }else{
        echo "Donnees non supprimes";
    }
}else{
    echo "Vous n'etes pas connecte";
}


$connexion->close();
?>