<?php
require_once "identifiants.php";
require_once "cryptage.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

$code = htmlspecialchars(mysqli_real_escape_string($connexion, $_POST['inputcode']));
$authentifiant=hash("sha256", uniqid());

function suppressionCodePerime($connexion){
    $requeteVerif="SELECT * FROM oublie";
    $requeteVerifsql = $connexion->query("$requeteVerif");
    while($resultatVerif=mysqli_fetch_object($requeteVerifsql)){
        $tempsActuelle = time();
        $tempsLimite = $resultatVerif->tempslimite;
        $email = $resultatVerif->email;
        if($tempsActuelle >= $tempsLimite){
            $id = $resultatVerif->id;
            $requeteSupp="DELETE FROM oublie WHERE '$id'= id";
            $requeteSuppsql=$connexion->query("$requeteSupp");
        }
    };
    return "Supprime";
};

function suppressionCodeValide($connexion, $id){
    $requeteSupp="DELETE FROM oublie WHERE '$id'= id";
    $requeteSuppsql=$connexion->query("$requeteSupp");
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

function authentification($email, $authentifiant, $connexion){
    $requeteauthentification="UPDATE inscription SET authentification = '$authentifiant' WHERE email='$email'";
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
};

function verificationCode($connexion, $code, $authentifiant, $tableauOrdonnee){
    $requeteVerif="SELECT * FROM oublie";
    $requeteVerifsql = $connexion->query("$requeteVerif");
    $reponse = "Non valide";
    while($resultatVerif=mysqli_fetch_object($requeteVerifsql)){
        if($code === $resultatVerif->code){
            $emailVerif = recuperationCryptEmail($connexion, $tableauOrdonnee, $resultatVerif->email);
            if(authentification($emailVerif, $authentifiant, $connexion) === "Authentification valide"){
                suppressionCodeValide($connexion, $resultatVerif->id);
                $reponse = "Valide";
            }
        }
    };
    return $reponse;
};

suppressionCodePerime($connexion);
echo verificationCode($connexion, $code, $authentifiant, $tableauOrdonnee);

$connexion->close();
?>