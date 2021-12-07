<?php
require_once "identifiants.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

$identifiant=hash("sha256", uniqid());
$email=mysqli_real_escape_string($connexion, $_POST['inputemail']);
$motdepasse=password_hash(mysqli_real_escape_string($connexion, $_POST['inputmotdepasse']), PASSWORD_DEFAULT);

function verificationExistanceEmail($connexion, $email) {
    $requeteEmail="SELECT * FROM inscription WHERE email='$email'";
    $requeteEmailsql=$connexion->query("$requeteEmail");
    while($resultat=mysqli_fetch_object($requeteEmailsql)){
        if($resultat->email===$email){
            return "Email existe";
        }
    };
};

function verificationEmail(){
    if(preg_match("#[\w]+[@]+[\w]+[.]+[a-z]#", $_POST['inputemail'])){
        return "Email correct";
    }
};

function verificationMotdepasse(){
    if(preg_match("#[\w\W]{8,}#", $_POST['inputmotdepasse']) AND preg_match("#[A-Z]{1,}[a-z]{1,}[0-9]{1,}[\W]{1,}#", $_POST['inputmotdepasse'])){
        return "Mot de passe correct";
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
    if(verificationMotdepasse()!=="Mot de passe correct"){
        echo "  Mot de passe incorrect";
    }else{
        echo "  Mot de passe correct";
    }
}

function Inscription($connexion, $email, $identifiant, $motdepasse){
    if(verificationExistanceEmail($connexion, $email)!=="Email existe" AND verificationEmail()==="Email correct" AND verificationMotdepasse()==="Mot de passe correct"){
        $requete="INSERT INTO inscription(identifiant, email, motdepasse, authentification) VALUES ('$identifiant','$email', '$motdepasse', '')";
        $requetesql = $connexion->query("$requete");
        echo "Inscription valide";
    }else{
        echo "Inscription echoue";
        verificationTotal($connexion, $email);
    };
};

Inscription($connexion, $email, $identifiant, $motdepasse, $connexion);

$connexion->close();
?>