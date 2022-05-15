<?php
$tableauValeursAjoutees = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "!", "@", "#", "$", "%", "&", "*", "?"];
$tableauOrdonnee = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "@", ".", "-"];
//$tableauDesordonnee = ['QkJ', 'm#I', 'j3t', 'Php', 'nLD', 'ryv', 'wyf', '&1B', '9q%', 'FC3', 'Yaq', 'JAI', '3uS', '0hb', 'xoa', 'N2D', 'Oy5', '!#4', 'MXH', 'pgX', 'oz6', 'ys4', 'fGC', 'GEX', 'kUK', 'KSR', 'IDA', 'qE%', 'aUt', 'X#1', 'Ez%', 'LZT', 'Wi2', 'Cu@', '6vD', 'vUh', '@4V', 'uz5', '#T8', '2%e', 'sR$', 'ecA', 'AZH', 'l1%', 'SRB', 'Ug1', 'tTZ', 'ZcV', '1*c', '?5i', 'dHi', 'Vgc', 'T*b', '4*5', 'BzD', '*g7', 'cc8', 'Dib', 'hRR', 'Rzz', 'i8g', 'gz$', '778', 'H5%', 'bb$', 'z88', '$88', '%8%', '558', '888'];
$adressemail = "medibennaceur-923@gmail.com";
function cryptageDonnees($adressemail, $tableauOrdonnee, $tableauDesordonnee){
    $nouveauTableau=[];
    $nouvelleAdresseMail = str_split($adressemail);
    for($i=0; $i<=count($nouvelleAdresseMail)-1; $i++){
        for($j=0; $j<=count($tableauOrdonnee)-1; $j++){
            if($nouvelleAdresseMail[$i]===$tableauOrdonnee[$j]){
                array_push($nouveauTableau, $tableauDesordonnee[$j]);
            }
        }
    };
    return implode("", $nouveauTableau);
};

function decryptageDonnees($adressemail, $tableauOrdonnee, $tableauDesordonnee){
    $nouveauTableau=[];
    $ancienneAdresseMail = recuperationDonneesCryptage($adressemail);
    for($i=0; $i<=count($ancienneAdresseMail)-1; $i++){
        for($j=0; $j<=count($tableauDesordonnee)-1; $j++){
            if($ancienneAdresseMail[$i]===$tableauDesordonnee[$j]){
                array_push($nouveauTableau, $tableauOrdonnee[$j]);
            }
        }
    };
    return implode("", $nouveauTableau);
};

function creationTableauValeurs($tableau, $tableauValeursAjoutees){
    $nouveauTableau = [];
    $longueurTableau = count($tableau);
    for($i=0; $i<=$longueurTableau-1; $i++){
        $ancienTableau = $tableau;
        $tableauAjouts = $tableauValeursAjoutees;
        $nombreLettres = count($ancienTableau);
        $nombreLettresAjoutes = count($tableauAjouts);
        $numeroPremiereLettre = rand(0, $nombreLettres-1);
        $numeroDeuxiemeLettre = rand(0, $nombreLettresAjoutes-1);
        $numeroTroisiemeLettre = rand(0, $nombreLettresAjoutes-1);
        array_push($nouveauTableau, $ancienTableau[$numeroPremiereLettre].$tableauAjouts[$numeroDeuxiemeLettre].$tableauAjouts[$numeroTroisiemeLettre]);
        array_splice($ancienTableau, $numeroPremiereLettre);
    };
    return $nouveauTableau;
};

function recuperationDonneesCryptage($chaine){
    $tableauChaine=str_split($chaine);
    $longueurTableau=count($tableauChaine);
    $nouveauTableau = [];
    $numero = 0;
    $recuperationMot;
    for($i=0; $i<=$longueurTableau; $i++){
        $numero = $numero+1;
        if($numero===3){
            $recuperationMot = array_splice($tableauChaine, 0, $numero);
            array_push($nouveauTableau, implode("",$recuperationMot));
            $numero = 0;
        }
    };
    return $nouveauTableau;
};

function extractionCle($chaine){
    $separation = str_split($chaine);
    $recuperationCle = implode("", array_splice($separation, 0, 195));
    return recuperationDonneesCryptage($recuperationCle);
};

function extractionEmail($chaine){
    $separation = str_split($chaine);
    return implode("", array_splice($separation, 195, count($separation)));
};

function cryptageChaineFinal($tableauOrdonnee, $adressemail, $tableauValeursAjoutees){
    $tableauDesordonnee = creationTableauValeurs($tableauOrdonnee, $tableauValeursAjoutees);
    $cleEmail = implode("", $tableauDesordonnee).cryptageDonnees($adressemail, $tableauOrdonnee, $tableauDesordonnee);
    return $cleEmail;
};

function decryptageChaineFinal($adressemail, $tableauOrdonnee){
    $cle = extractionCle($adressemail);
    $email = extractionEmail($adressemail);
    return decryptageDonnees($email, $tableauOrdonnee, $cle);
};

?>