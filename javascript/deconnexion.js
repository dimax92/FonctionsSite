function connexion(lien){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.onprogress = function() {
        console.log(this.response);
    };
    xhr.send();
};
connexion("php/deconnexion.php");