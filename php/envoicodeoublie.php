<?php
require_once "identifiants.php";
require_once "mail.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

$email=htmlspecialchars(mysqli_real_escape_string($connexion, $_POST['inputemail']));

function generationCode(){
    $tableauValeurs = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    $nombreValeurs = count($tableauValeurs);
    $premiereValeur = rand(0, $nombreValeurs-1);
    $deuxiemeValeur = rand(0, $nombreValeurs-1);
    $troisiemeValeur = rand(0, $nombreValeurs-1);
    $quatriemeValeur = rand(0, $nombreValeurs-1);
    $cinquiemeValeur = rand(0, $nombreValeurs-1);
    $sixiemeValeur = rand(0, $nombreValeurs-1);
    return $tableauValeurs[$premiereValeur].$tableauValeurs[$deuxiemeValeur].$tableauValeurs[$troisiemeValeur].$tableauValeurs[$quatriemeValeur].$tableauValeurs[$cinquiemeValeur].$tableauValeurs[$sixiemeValeur];
};

function envoiCode($connexion, $email){
    $code = generationCode();
    $tempsLimite = time()+(20*60);
    $requete="INSERT INTO oublie(code, tempslimite, email) VALUES ('$code', '$tempsLimite', '$email')";
    $requetesql = $connexion->query("$requete");
    envoiMail($email, "<html><body><p>".$code."</p></body></html>");
    return "OK";
};

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

suppressionCodePerime($connexion);
echo envoiCode($connexion, $email);

$connexion->close();
?>