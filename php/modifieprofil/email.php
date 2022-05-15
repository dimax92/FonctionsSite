<?php
require_once "../identifiants.php";
require_once "../cryptage.php";
require_once "../envoicode.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

$email=htmlspecialchars(mysqli_real_escape_string($connexion, $_POST['nouveauemail']));
$emailCrypt=cryptageChaineFinal($tableauOrdonnee, $email, $tableauValeursAjoutees);

if(isset($_COOKIE["authentifiant"])){
    $authentifiant=htmlspecialchars(mysqli_real_escape_string($connexion, $_COOKIE["authentifiant"]));
};

function recuperationCryptEmail($connexion, $tableauOrdonnee, $email){
    $requeteCrypt="SELECT * FROM inscription";
    $requeteCryptsql = $connexion->query("$requeteCrypt");
    while($resultatCrypt=mysqli_fetch_object($requeteCryptsql)){
        if($email === decryptageChaineFinal($resultatCrypt->email, $tableauOrdonnee)){
            return $resultatCrypt->email;
        };
    }
};
$emailVerif = recuperationCryptEmail($connexion, $tableauOrdonnee, $email);

function verificationExistanceEmail($connexion, $emailVerif) {
    $requeteEmail="SELECT * FROM inscription WHERE email='$emailVerif'";
    $requeteEmailsql=$connexion->query("$requeteEmail");
    while($resultat=mysqli_fetch_object($requeteEmailsql)){
        if($resultat->email===$emailVerif){
            return "Email existe";
        }
    };
};

function verificationEmail(){
    if(preg_match("#[\w]+[@]+[\w]+[.]+[a-z]#", $_POST['nouveauemail'])){
        return "Email correct";
    }
};

function verificationTotal($connexion, $email){
    if(verificationExistanceEmail($connexion, $email)==="Email existe"){
        echo "  Email existe deja";
    }else{
        echo "  Email existe pas";
    }
    if(verificationEmail()!=="Email correct"){
        echo "  Email incorrect";
    }else{
        echo "  Email correct";
    }
}

function modificationEmail($connexion, $email, $emailCrypt, $authentifiant){
    if(verificationExistanceEmail($connexion, $email)!=="Email existe" AND verificationEmail()==="Email correct"){
        //$requete=" UPDATE inscription SET email = '$emailCrypt' WHERE '$authentifiant'= authentification ";
        //$requetesql = $connexion->query("$requete");
        suppressionCodePerime($connexion);
        envoiCode($connexion, $email, $emailCrypt);
        echo "Email envoye";
    }else{
        echo "Echec envoie";
        verificationTotal($connexion, $email);
    };
};

modificationEmail($connexion, $email, $emailCrypt, $authentifiant);

$connexion->close();
?>