<?php
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect("localhost","root","","nouveausite");
$connexion->query("SET NAMES utf8mb4");

$objet = $_POST["objet"];
$requete="INSERT INTO caracteristiques(objet) VALUES ('$objet')";
$requetesql = $connexion->query("$requete");

$requeteq="SELECT * FROM caracteristiques WHERE id=1";
$requetesqlq=$connexion->query("$requeteq");
while($resultat=mysqli_fetch_object($requetesqlq)){
    echo $resultat->objet;
};
$connexion->close();
?>