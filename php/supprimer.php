<?php
require_once "identifiants.php";
require_once "fonctionauthentification.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

if(testAuthentification($connexion)==="Authentification valide"){
    $idproduit=mysqli_real_escape_string($connexion, $_POST["idproduit"]);

    function suppressionFichier($connexion, $idproduit) {
        $requeteSuppression="SELECT * FROM produits WHERE '$idproduit'= idproduit ";
        $requetesqlSuppression=$connexion->query("$requeteSuppression");
        while($resultat=mysqli_fetch_object($requetesqlSuppression)){
            $unlink=unlink("C:/wamp64/www/NouveauSite/Videos/".basename("$resultat->video"));
            if($unlink){
                if(suppressionDonnees($connexion, $idproduit)==="Donnees supprime"){
                    echo "Produit supprime";
                }else{
                    echo "echec";
                }
            }else{
                echo "echec";
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
    
    suppressionFichier($connexion, $idproduit);
}else{
    echo "Vous n'etes pas connecte";
}

$connexion->close();
?>