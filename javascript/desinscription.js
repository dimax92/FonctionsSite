let main=document.querySelector("main");
let boutonDesinscription=document.querySelector(".boutonDeconnexion");

function functionDesinscription(lien){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.onloadend = function() {
        let donnees=this.response;
        envoiMessagesErreursDesinscription(donnees);
    };
    xhr.send();
};

function validationIndividuelleDesinscription(contenu, identifiant, position, couleurMessage){
    let incorrect=document.createElement("p");
    incorrect.className=identifiant;
    incorrect.textContent=contenu;
    incorrect.style.color=couleurMessage;
    incorrect.style.margin="0px";
    main.insertBefore(incorrect, position);
};

function validationTotalDesinscription(donnees, resultat, creationId, identifiant, elementInsert, couleurMessage){
    if(donnees===resultat){
        if(!document.querySelector(identifiant)){
            validationIndividuelleDesinscription(donnees, creationId, elementInsert, couleurMessage);
        }
    }else{
        if(document.querySelector(identifiant)){
            document.querySelector(identifiant).remove();
        }
    }
};

function envoiMessagesErreursDesinscription(donnees){
    validationTotalDesinscription(donnees, "Vous n'etes plus inscrit", "plusInscrit", ".plusInscrit", boutonDesinscription, "green");
    validationTotalDesinscription(donnees, "Echec de la desinscription", "echecDesinscription", ".echecDesinscription", boutonDesinscription, "red");
    validationTotalDesinscription(donnees, "Vous n'etes pas connecte", "pasConnecte", ".pasConnecte", boutonDesinscription, "red");
};

boutonDesinscription.addEventListener("click", ()=>{
    functionDesinscription("php/desinscription.php");
});