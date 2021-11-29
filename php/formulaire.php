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

$typeVideo=$_FILES['inputimages']['type'];
$tailleVideo=$_FILES['inputimages']['size'];

function testDonnees($nom, $marque, $typeVideo, $tailleVideo, $prix, $devise, $descriptions, $quantite, $types, $conditions, $coordonnees) {
    if(
        preg_match("#[\W \w]#", $nom) AND 
        preg_match("#[\W \w]#", $marque) AND 
        ($typeVideo==="video/mp4" OR 
        $typeVideo==="video/3gpp" OR 
        $typeVideo==="video/mpeg" OR 
        $typeVideo==="video/ogg" OR 
        $typeVideo==="video/quicktime" OR 
        $typeVideo==="video/webm" OR 
        $typeVideo==="video/x-m4v" OR 
        $typeVideo==="video/ms-asf" OR 
        $typeVideo==="video/x-ms-wmv" OR 
        $typeVideo==="video/x-msvideo") AND 
        $tailleVideo<100000000 AND 
        preg_match("#[0-9]#", $prix) AND 
        preg_match("#[\W \w]#", $devise) AND 
        preg_match("#[\W \w]#", $descriptions) AND 
        preg_match("#[0-9]#", $quantite) AND 
        preg_match("#[\W \w]#", $types) AND 
        preg_match("#[\W \w]#", $conditions) AND 
        preg_match("#[\W \w]#", $coordonnees)
    ){
        return "conforme";
    }else{
        return "nonconforme";
    }
}

function envoiDonneesFichiers($nomfichier, $connexion, $identifiant, $idproduit, $nom, $marque, $video, $videonom, $prix, $devise, $descriptions, $quantite, $types, $conditions, $coordonnees){
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
};

if(
    testDonnees($nom, $marque, $typeVideo, $tailleVideo, $prix, $devise, $descriptions, $quantite, $types, $conditions, $coordonnees)==="conforme"
){
    envoiDonneesFichiers($nomfichier, $connexion, $identifiant, $idproduit, $nom, $marque, $video, $videonom, $prix, $devise, $descriptions, $quantite, $types, $conditions, $coordonnees);
}else{
    echo "echec";
}

$connexion->close();
?>