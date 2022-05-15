<?php
require_once "../identifiants.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

$motdepasse=password_hash(htmlspecialchars(mysqli_real_escape_string($connexion, $_POST['nouveaumotdepasse'])), PASSWORD_DEFAULT);

if(isset($_COOKIE["authentifiant"])){
    $authentifiant=htmlspecialchars(mysqli_real_escape_string($connexion, $_COOKIE["authentifiant"]));
};

function verificationMotdepasse(){
    if(preg_match("#[\w\W]{8,}#", $_POST['nouveaumotdepasse']) 
    AND preg_match("#[A-Z]{1,}#", $_POST['nouveaumotdepasse']) 
    AND preg_match("#[a-z]{1,}#", $_POST['nouveaumotdepasse']) 
    AND preg_match("#[0-9]{1,}#", $_POST['nouveaumotdepasse']) 
    AND preg_match("#[\W]{1,}#", $_POST['nouveaumotdepasse'])){
        return "Mot de passe correct";
    }
};

function verificationTotal(){
    if(verificationMotdepasse()!=="Mot de passe correct"){
        echo "  Mot de passe incorrect";
    }else{
        echo "  Mot de passe correct";
    }
}

function modificationMotdepasse($connexion, $motdepasse, $authentifiant){
    if(verificationMotdepasse()==="Mot de passe correct"){
        $requete=" UPDATE inscription SET motdepasse = '$motdepasse' WHERE '$authentifiant'= authentification ";
        $requetesql = $connexion->query("$requete");
        echo "Mot de passe modifie";
    }else{
        echo "Echec modification";
        verificationTotal();
    };
};

modificationMotdepasse($connexion, $motdepasse, $authentifiant);

$connexion->close();
?>