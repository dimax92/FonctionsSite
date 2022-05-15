<?php
$fichier = "tonyrtriopjpg";

function recuperationFinFichier($fichier){
    $fichierExplode = explode(".", $fichier);
    $fichierType = $fichierExplode[count($fichierExplode)-1];
    return $fichierType;
};

echo recuperationFinFichier($fichier);
?>