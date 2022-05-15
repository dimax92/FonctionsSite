<?php
function testAuthentification($connexion){
    if(isset($_COOKIE["authentifiant"])){
        $authentifiant=htmlspecialchars(mysqli_real_escape_string($connexion, $_COOKIE["authentifiant"]));
        $requete="SELECT authentification FROM inscription WHERE authentification='$authentifiant'";
        $requetesql = $connexion->query("$requete");
        while($resultat=mysqli_fetch_object($requetesql)){
            if(($resultat->authentification===$authentifiant)){
                return "Authentification valide";
            }else{
                return "Authentification invalide";
            }
        }
    }else{
        return "Authentification invalide";
    };
}
?>