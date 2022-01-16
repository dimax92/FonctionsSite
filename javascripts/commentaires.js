let divCommentaireSup=document.querySelector(".divCommentaireSup");
let textCommentaire=document.querySelector(".textCommentaire");
let boutonCommentaire=document.querySelector(".boutonCommentaire");

function envoiCommentaire(lien){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.onloadend=function(){
        donnees=this.response;
        envoiMessagesErreursCommentaires(donnees);
    }
    let data = new FormData();
    data.append("idproduit", recuperationIdUrl(window.location.pathname));
    data.append("commentaire", textCommentaire.value);
    xhr.send(data);
};

function recevoirCommentaires(lien){
    let xhr=new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.onloadend=function(){
        let resultat=this.response.split(" didi: ");
        for(i=1; i<=resultat.length-1; i++){
            let valPseudo=JSON.parse(resultat[i]).pseudo;
            let valCommentaire=JSON.parse(resultat[i]).commentaire;
            creationCommentaire(valPseudo, valCommentaire);
        };
    };
    let data = new FormData();
    data.append("idproduit", recuperationIdUrl(window.location.pathname));
    xhr.send(data);
};

recevoirCommentaires("php/recuperationcommentaire.php");

boutonCommentaire.addEventListener("click", ()=>{
    envoiCommentaire("php/envoicommentaire.php");
});

function recuperationIdUrl(nomUrl){
    let nomUrlSplit=nomUrl.split("-");
    return nomUrlSplit[nomUrlSplit.length-1]
};

function creationCommentaire(valPseudo, valCommentaire){
    let divCommentaire=document.createElement("div");
    divCommentaire.className="divCommentaire";
    divCommentaireSup.appendChild(divCommentaire);
    let pseudo=document.createElement("p");
    pseudo.className="pseudo";
    pseudo.textContent=valPseudo;
    divCommentaire.appendChild(pseudo);
    let commentaire=document.createElement("p");
    commentaire.className="commentaire";
    commentaire.textContent=valCommentaire;
    divCommentaire.appendChild(commentaire);
};

function validationIndividuelleCommentaires(contenu, identifiant, position, couleurMessage){
    let incorrect=document.createElement("p");
    incorrect.className=identifiant;
    incorrect.textContent=contenu;
    incorrect.style.color=couleurMessage;
    incorrect.style.margin="0px";
    divCommentaireSup.insertBefore(incorrect, position);
};

function validationTotalCommentaires(donnees, resultat, creationId, identifiant, elementInsert, couleurMessage){
    if(donnees===resultat){
        if(!document.querySelector(identifiant)){
            validationIndividuelleCommentaires(donnees, creationId, elementInsert, couleurMessage);
        }
    }else{
        if(document.querySelector(identifiant)){
            document.querySelector(identifiant).remove();
        }
    }
};

function envoiMessagesErreursCommentaires(donnees){
    validationTotalCommentaires(donnees, "Commentaire envoye", "commentaireEnvoye", ".commentaireEnvoye", textCommentaire, "green");
    validationTotalCommentaires(donnees, "Vous n'avez le droit qu'a 2 commentaires par jour", "deuxCommentaires", ".deuxCommentaires", textCommentaire, "red");
    validationTotalCommentaires(donnees, "Echec envoi commentaire", "echecCommentaire", ".echecCommentaire", textCommentaire, "red");
    validationTotalCommentaires(donnees, "Vous n'etes pas connecte", "pasConnecteCommentaire", ".pasConnecteCommentaire", textCommentaire, "red");
    validationTotalCommentaires(donnees, "Vous ne pouvez pas mettre de commentaire sur votre produit", "pasCommentaire", ".pasCommentaire", textCommentaire, "red");
};