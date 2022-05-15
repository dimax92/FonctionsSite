<?php
require_once "../identifiants.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

$code = htmlspecialchars(mysqli_real_escape_string($connexion, $_POST['inputcode']));

if(isset($_COOKIE["authentifiant"])){
    $authentifiant=htmlspecialchars(mysqli_real_escape_string($connexion, $_COOKIE["authentifiant"]));
};

function suppressionCodePerime($connexion){
    $requeteVerif="SELECT * FROM confirmation";
    $requeteVerifsql = $connexion->query("$requeteVerif");
    while($resultatVerif=mysqli_fetch_object($requeteVerifsql)){
        $tempsActuelle = time();
        $tempsLimite = $resultatVerif->tempslimite;
        $email = $resultatVerif->email;
        if($tempsActuelle >= $tempsLimite){
            $id = $resultatVerif->id;
            $requeteSupp="DELETE FROM confirmation WHERE '$id'= id";
            $requeteSuppsql=$connexion->query("$requeteSupp");
        }
    };
    return "Supprime";
};

function suppressionCodeValide($connexion, $id){
    $requeteSupp="DELETE FROM confirmation WHERE '$id'= id";
    $requeteSuppsql=$connexion->query("$requeteSupp");
};

function verificationCode($connexion, $code, $authentifiant){
    $requeteVerif="SELECT * FROM confirmation";
    $requeteVerifsql = $connexion->query("$requeteVerif");
    $reponse = "Non valide";
    while($resultatVerif=mysqli_fetch_object($requeteVerifsql)){
        if($code === $resultatVerif->code){
            $email=$resultatVerif->email;
            $requeteModif=" UPDATE inscription SET email = '$email' WHERE '$authentifiant'= authentification ";
            $requeteModifsql = $connexion->query("$requeteModif");
            suppressionCodeValide($connexion, $resultatVerif->id);
            $reponse = "Valide";
        }
    };
    return $reponse;
};

suppressionCodePerime($connexion);
echo verificationCode($connexion, $code, $authentifiant);

$connexion->close();
?>