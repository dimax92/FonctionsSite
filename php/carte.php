<?php

$nomLieu=mysqli_real_escape_string($connexion, $_POST['nomlieu']);
$lattitude=mysqli_real_escape_string($connexion, $_POST['lattitude']);
$longitude=mysqli_real_escape_string($connexion, $_POST['longitude']);

function envoiCoordonneesCarte($idproduit, $nomLieu, $lattitude, $longitude, $connexion){
    $requete="INSERT INTO coordonneescarte(idproduit, nomlieu, lattitude, longitude) 
    VALUES ('$idproduit', '$nomLieu', '$lattitude', '$longitude')";
    $requetesql = $connexion->query("$requete");
};

?>