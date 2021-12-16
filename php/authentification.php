<?php
require_once "identifiants.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

$authentifiant=hash("sha256", uniqid());
$email=htmlspecialchars(mysqli_real_escape_string($connexion, $_POST['inputemail']));
$motdepasse=htmlspecialchars(mysqli_real_escape_string($connexion, $_POST['inputmotdepasse']));

function authentification($email, $connexion, $authentifiant){
    $requete="SELECT * FROM inscription WHERE email='$email'";
    $requetesql = $connexion->query("$requete");
    while($resultat=mysqli_fetch_object($requetesql)){
        if(password_verify($_POST['inputmotdepasse'], "$resultat->motdepasse")){
            $identifiant="$resultat->identifiant";
            $requeteauthentification="UPDATE inscription SET authentification = '$authentifiant' WHERE email='$email'";
            $requeteauthentification = $connexion->query("$requeteauthentification");
            if($requeteauthentification){
                $cookieauthentifiant=setcookie("authentifiant", $authentifiant, time()+(24*3600), NULL, NULL);
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
    };
};


if(authentification($email, $connexion, $authentifiant)==="Authentification valide"){
    echo "Authentification valide";
}else{
    echo "Authentification echoue";
};

$connexion->close();
?>