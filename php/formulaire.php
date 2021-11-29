<?php
require_once "identifiants.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

$nomfichier=hash("sha256", uniqid());

$identifiant=mysqli_real_escape_string($connexion, $_COOKIE["identifiant"]);
$idproduit=hash("sha256", uniqid());
$nom=mysqli_real_escape_string($connexion, $_POST['inputnom']);
$marque=mysqli_real_escape_string($connexion, $_POST['inputmarque']);
$video=mysqli_real_escape_string($connexion, $nomfichier.$_FILES['inputimages']['name']);
$videonom=mysqli_real_escape_string($connexion, $_FILES['inputimages']['name']);
$prix=mysqli_real_escape_string($connexion, $_POST['inputprix']);
$devise=mysqli_real_escape_string($connexion, $_POST['inputdevise']);
$descriptions=mysqli_real_escape_string($connexion, $_POST['inputcaracteristique']);
$quantite=mysqli_real_escape_string($connexion, $_POST['inputquantite']);
$types=mysqli_real_escape_string($connexion, $_POST['inputcategorie']);
$conditions=mysqli_real_escape_string($connexion, $_POST['condition']);
$coordonnees=mysqli_real_escape_string($connexion, $_POST['coordonnees']);

$requete="INSERT INTO produits(identifiant, idproduit, nom, marque, video, videonom, prix, devise, descriptions, quantite, types, conditions, coordonnees) 
VALUES ('$identifiant', '$idproduit', '$nom', '$marque', '$video', '$videonom', '$prix', '$devise', '$descriptions', '$quantite', '$types', '$conditions', '$coordonnees')";
$requetesql = $connexion->query("$requete");
if($requetesql){
    $envoifichier=move_uploaded_file($_FILES['inputimages']['tmp_name'], "C:/wamp64/www/NouveauSite/Videos/".$nomfichier.basename($_FILES['inputimages']['name']));
    if($envoifichier){
        echo "Produit enregistre";
    }else{
        echo "echec";
    }
}else{
    echo "echec";
};

$connexion->close();
?>