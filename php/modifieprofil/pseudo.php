<?php
require_once "../identifiants.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

$pseudo=htmlspecialchars(mysqli_real_escape_string($connexion, $_POST['nouveaupseudo']));

if(isset($_COOKIE["authentifiant"])){
    $authentifiant=htmlspecialchars(mysqli_real_escape_string($connexion, $_COOKIE["authentifiant"]));
};

function verificationExistancePseudo($connexion, $pseudo) {
    $requetePseudo="SELECT * FROM inscription WHERE pseudo='$pseudo'";
    $requetePseudosql=$connexion->query("$requetePseudo");
    while($resultat=mysqli_fetch_object($requetePseudosql)){
        if($resultat->pseudo===$pseudo){
            return "Pseudo existe";
        }
    };
};

function verificationPseudo(){
    if(preg_match("#[\w \W]#", $_POST['nouveaupseudo'])){
        return "Pseudo correct";
    }
};

function verificationTotal($connexion, $pseudo){
    if(verificationPseudo()!=="Pseudo correct"){
        echo "  Pseudo incorrect";
    }else{
        echo "  Pseudo correct";
    }
    if(verificationExistancePseudo($connexion, $pseudo)==="Pseudo existe"){
        echo "  Pseudo existe deja";
    }else{
        echo "  Pseudo existe pas";
    }
}

function modificationPseudo($connexion, $pseudo, $authentifiant){
    if(verificationPseudo()==="Pseudo correct" AND verificationExistancePseudo($connexion, $pseudo)!=="Pseudo existe"){
        $requete=" UPDATE inscription SET pseudo = '$pseudo' WHERE '$authentifiant'= authentification ";
        $requetesql = $connexion->query("$requete");
        echo "Pseudo modifie";
    }else{
        echo "Echec modification";
        verificationTotal($connexion, $pseudo);
    };
};

modificationPseudo($connexion, $pseudo, $authentifiant);

$connexion->close();
?>