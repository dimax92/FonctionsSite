<?php
require_once "identifiants.php";
require_once "cryptage.php";
//require_once "verifstatutinscrit.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

$authentifiant=hash("sha256", uniqid());
$email=htmlspecialchars(mysqli_real_escape_string($connexion, $_POST['inputemail']));
$motdepasse=htmlspecialchars(mysqli_real_escape_string($connexion, $_POST['inputmotdepasse']));

function verificationCodeConfirmation($connexion, $email, $tableauOrdonnee){
    $requeteVerif="SELECT * FROM confirmation";
    $requeteVerifsql = $connexion->query("$requeteVerif");
    $reponse = "Verifie";
    while($resultatVerif=mysqli_fetch_object($requeteVerifsql)){
        if($email === decryptageChaineFinal($resultatVerif->email, $tableauOrdonnee)){
            $reponse = "Non Verifie";
        }
    };
    return $reponse;
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

function authentification($emailVerif, $email, $connexion, $authentifiant, $tableauOrdonnee){
    $requete="SELECT * FROM inscription WHERE email='$emailVerif'";
    $requetesql = $connexion->query("$requete");
    while($resultat=mysqli_fetch_object($requetesql)){
        if(verificationCodeConfirmation($connexion, $email, $tableauOrdonnee)!=="Non Verifie"){
            if(password_verify($_POST['inputmotdepasse'], "$resultat->motdepasse")){
                $identifiant="$resultat->identifiant";
                $requeteauthentification="UPDATE inscription SET authentification = '$authentifiant' WHERE email='$emailVerif'";
                $requeteauthentification = $connexion->query("$requeteauthentification");
                if($requeteauthentification){
                    $cookieauthentifiant=setcookie("authentifiant", $authentifiant, time()+(24*3600), NULL, NULL, true, true);
                    if($cookieauthentifiant){
                        return "Authentification valide";
                    }else{
                        return "Authentification echoue";
                    }
                }else{
                    return "Authentification echoue";
                }
            }else{
                return "Authentification echoue";
            }
        }else{
            return "Authentification echoue";
        }
    };
};


if(authentification($emailVerif, $email, $connexion, $authentifiant, $tableauOrdonnee)==="Authentification valide"){
    echo "Authentification valide";
}else{
    echo "Authentification echoue";
};

$connexion->close();
?>