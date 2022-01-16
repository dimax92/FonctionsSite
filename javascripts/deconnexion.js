let main=document.querySelector("main");
let boutonDeconnexion=document.querySelector(".boutonDeconnexion");

function functionDeconnexion(lien){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.onloadend = function() {
        let donnees=this.response;
        envoiMessagesErreursDeconnexion(donnees);
    };
    xhr.send();
};

function validationIndividuelleDeconnexion(contenu, identifiant, position, couleurMessage){
    let incorrect=document.createElement("p");
    incorrect.className=identifiant;
    incorrect.textContent=contenu;
    incorrect.style.color=couleurMessage;
    incorrect.style.margin="0px";
    main.insertBefore(incorrect, position);
};

function validationTotalDeconnexion(donnees, resultat, creationId, identifiant, elementInsert, couleurMessage){
    if(donnees===resultat){
        if(!document.querySelector(identifiant)){
            validationIndividuelleDeconnexion(donnees, creationId, elementInsert, couleurMessage);
        }
    }else{
        if(document.querySelector(identifiant)){
            document.querySelector(identifiant).remove();
        }
    }
};

function envoiMessagesErreursDeconnexion(donnees){
    validationTotalDeconnexion(donnees, "Vous etes deconnecte", "deconnecte", ".deconnecte", boutonDeconnexion, "green");
    validationTotalDeconnexion(donnees, "Echec deconnexion", "echecDeconnexion", ".echecDeconnexion", boutonDeconnexion, "red");
    validationTotalDeconnexion(donnees, "Vous n'etes pas connecte", "pasConnecte", ".pasConnecte", boutonDeconnexion, "red");
};

boutonDeconnexion.addEventListener("click", ()=>{
    functionDeconnexion("php/deconnexion.php");
});