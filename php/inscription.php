<?php
require_once "identifiants.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

$identifiant=hash("sha256", uniqid());
$email=mysqli_real_escape_string($connexion, $_POST['inputemail']);
$motdepasse=password_hash(mysqli_real_escape_string($connexion, $_POST['inputmotdepasse']), PASSWORD_DEFAULT);

if(preg_match("#[\w]+[@]+[\w]+[.]+[a-z]#", $_POST['inputemail']) AND
    (preg_match("#[\w\W]{8,}#", $_POST['inputmotdepasse']) AND preg_match("#[A-Z]{1,}[a-z]{1,}[0-9]{1,}[\W]{1,}#", $_POST['inputmotdepasse']))){
        $requete="INSERT INTO inscription(identifiant, email, motdepasse, authentification) VALUES ('$identifiant','$email', '$motdepasse', '')";
        $requetesql = $connexion->query("$requete");
        echo "Inscription valide";
}else{
    echo "Inscription echoue";
};

$connexion->close();
?>