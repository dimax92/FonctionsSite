<?php
require_once "identifiants.php";
require_once "cryptage.php";
require_once "envoicode.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

$identifiant=hash("sha256", uniqid());
$pseudo=htmlspecialchars(mysqli_real_escape_string($connexion, $_POST['inputpseudo']));
$email=htmlspecialchars(mysqli_real_escape_string($connexion, $_POST['inputemail']));
$emailCrypt=cryptageChaineFinal($tableauOrdonnee, $email, $tableauValeursAjoutees);
$motdepasse=password_hash(htmlspecialchars(mysqli_real_escape_string($connexion, $_POST['inputmotdepasse'])), PASSWORD_DEFAULT);

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

function verificationExistanceEmail($connexion, $email, $emailVerif) {
    $requeteEmail="SELECT * FROM inscription WHERE email='$emailVerif'";
    $requeteEmailsql=$connexion->query("$requeteEmail");
    while($resultat=mysqli_fetch_object($requeteEmailsql)){
        if($resultat->email===$emailVerif ){
            return "Email existe";
        }
    };
};

function verificationExistancePseudo($connexion, $pseudo) {
    $requetePseudo="SELECT * FROM inscription WHERE pseudo='$pseudo'";
    $requetePseudosql=$connexion->query("$requetePseudo");
    while($resultat=mysqli_fetch_object($requetePseudosql)){
        if($resultat->pseudo===$pseudo){
            return "Pseudo existe";
        }
    };
};

function verificationPseudo(){
    if(preg_match("#[\w \W]#", $_POST['inputpseudo'])){
        return "Pseudo correct";
    }
};

function verificationEmail(){
    if(preg_match("#[\w]+[@]+[\w]+[.]+[a-z]#", $_POST['inputemail'])){
        return "Email correct";
    }
};

function verificationMotdepasse(){
    if(preg_match("#[\w\W]{8,}#", $_POST['inputmotdepasse']) 
    AND preg_match("#[A-Z]{1,}#", $_POST['inputmotdepasse']) 
    AND preg_match("#[a-z]{1,}#", $_POST['inputmotdepasse']) 
    AND preg_match("#[0-9]{1,}#", $_POST['inputmotdepasse']) 
    AND preg_match("#[\W]{1,}#", $_POST['inputmotdepasse'])){
        return "Mot de passe correct";
    }
};

function verificationTotal($connexion, $email, $pseudo, $emailVerif){
    if(verificationPseudo()!=="Pseudo correct"){
        echo "  Pseudo incorrect";
    }else{
        echo "  Pseudo correct";
    }
    if(verificationExistanceEmail($connexion, $email, $emailVerif)==="Email existe"){
        echo "  Email existe deja";
    }else{
        echo "  Email existe pas";
    }
    if(verificationExistancePseudo($connexion, $pseudo)==="Pseudo existe"){
        echo "  Pseudo existe deja";
    }else{
        echo "  Pseudo existe pas";
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

function inscription($connexion, $pseudo, $email, $emailCrypt, $identifiant, $motdepasse, $emailVerif){
    if(verificationPseudo()==="Pseudo correct" AND verificationExistanceEmail($connexion, $email, $emailVerif)!=="Email existe" AND verificationExistancePseudo($connexion, $pseudo)!=="Pseudo existe" AND verificationEmail()==="Email correct" AND verificationMotdepasse()==="Mot de passe correct"){
        $requete="INSERT INTO inscription(identifiant, pseudo, email, motdepasse, authentification, nbcommentaires, tempsattente) VALUES ('$identifiant', '$pseudo', '$emailCrypt', '$motdepasse', '', 0, 0)";
        $requetesql = $connexion->query("$requete");
        suppressionCodePerime($connexion);
        envoiCode($connexion, $email, $emailCrypt);
        echo "Inscription valide";
    }else{
        echo "Inscription echoue";
        verificationTotal($connexion, $email, $pseudo, $emailVerif);
    };
};

inscription($connexion, $pseudo, $email, $emailCrypt, $identifiant, $motdepasse, $emailVerif);

$connexion->close();
?>
