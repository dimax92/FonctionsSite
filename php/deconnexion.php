<?php
function deconnexion(){
    setcookie('authentifiant');
    return "deconnecte";
};

if(isset($_COOKIE['authentifiant'])){
    if(deconnexion()==="deconnecte"){
        echo "Vous etes deconnecte";
    }else{
        echo "Echec deconnexion";
    }
}else{
    echo "Vous n'etes pas connecte";
}
?>