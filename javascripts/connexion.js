let header=document.querySelector("header");
let nav=document.querySelector("header nav");
let ul=document.querySelector("header nav ul");
let liste=document.querySelector("header nav ul li");

function connexion(lien){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.onprogress = function() {
        if(this.response==="Authentification valide"){
            if(window.location.pathname !== "/formulaire"){
                lienDeposerAnnonce();
            };
            if(window.location.pathname !== "/mesproduits"){
                lienMesProduits();
            };
            if(window.location.pathname !== "/deconnexion"){
                lienDeconnexion();
            };
            if(window.location.pathname !== "/desinscription"){
                lienDesinscription();
            };
            if(window.location.pathname !== "/profil"){
                lienProfil();
            };
        }
    };
    xhr.send();
};

function lienDeposerAnnonce(){
    let annonce= document.createElement("li");
    let lien=document.createElement("a");
    lien.href="formulaire";
    let icon=document.createElement("i");
    icon.className="fas fa-plus";
    lien.appendChild(icon);
    let contenulien = document.createTextNode(' Deposer une annonce');
    lien.appendChild(contenulien);
    annonce.appendChild(lien);
    ul.insertBefore(annonce, liste);
};

function lienMesProduits(){
    let annonce= document.createElement("li");
    let lien=document.createElement("a");
    lien.href="mesproduits";
    let icon=document.createElement("i");
    icon.className="fas fa-store";
    lien.appendChild(icon);
    let contenulien = document.createTextNode(' Mes produits');
    lien.appendChild(contenulien);
    annonce.appendChild(lien);
    ul.insertBefore(annonce, liste);
};

function lienDeconnexion(){
    let annonce= document.createElement("li");
    let lien=document.createElement("a");
    lien.href="deconnexion";
    let icon=document.createElement("i");
    icon.className="fas fa-power-off";
    lien.appendChild(icon);
    let contenulien = document.createTextNode(' Deconnexion');
    lien.appendChild(contenulien);
    annonce.appendChild(lien);
    ul.insertBefore(annonce, liste);
    /*lien.addEventListener("click", ()=>{
        functionDeconnexion("php/deconnexion.php")
    })*/
};

function lienDesinscription(){
    let annonce= document.createElement("li");
    let lien=document.createElement("a");
    lien.href="desinscription";
    let icon=document.createElement("i");
    icon.className="fas fa-user-slash";
    lien.appendChild(icon);
    let contenulien = document.createTextNode(' Desinscription');
    lien.appendChild(contenulien);
    annonce.appendChild(lien);
    ul.insertBefore(annonce, liste);
    /*lien.addEventListener("click", ()=>{
        functionDeconnexion("php/desinscription.php")
    })*/
};

function lienProfil(){
    let annonce= document.createElement("li");
    let lien=document.createElement("a");
    lien.href="profil";
    let icon=document.createElement("i");
    icon.className="fas fa-solid fa-address-card";
    lien.appendChild(icon);
    let contenulien = document.createTextNode(' Profil');
    lien.appendChild(contenulien);
    annonce.appendChild(lien);
    ul.insertBefore(annonce, liste);
};

/*function functionDeconnexion(lien){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.onloadend = function() {
        let donnees=this.response;
    };
    xhr.send();
};

function validationIndividuelleConnexion(contenu, identifiant, position, couleurMessage){
    let incorrect=document.createElement("p");
    incorrect.className=identifiant;
    incorrect.textContent=contenu;
    incorrect.style.color=couleurMessage;
    incorrect.style.margin="0px";
    main.insertBefore(incorrect, position);
};

function validationTotalConnexion(donnees, resultat, creationId, identifiant, elementInsert, couleurMessage){
    if(donnees===resultat){
        if(!document.querySelector(identifiant)){
            validationIndividuelleLikeDislike(donnees, creationId, elementInsert, couleurMessage);
        }
    }else{
        if(document.querySelector(identifiant)){
            document.querySelector(identifiant).remove();
        }
    }
};

function envoiMessagesErreursConnexion(donnees){
    validationTotalLikeDislike(donnees, "like envoye", "likeEnvoye", ".likeEnvoye", divLikeDislike, "green");
    validationTotalLikeDislike(donnees, "echec envoie like", "echecEnvoiLike", ".echecEnvoiLike", divLikeDislike, "red");
    validationTotalLikeDislike(donnees, "vous avez deja mis un like", "dejaLike", ".dejaLike", divLikeDislike, "red");
    validationTotalLikeDislike(donnees, "Vous n'etes pas connecte", "pasConnecte", ".pasConnecte", divLikeDislike, "red");
    validationTotalLikeDislike(donnees, "dislike envoye", "dislikeEnvoye", ".dislikeEnvoye", divLikeDislike, "green");
    validationTotalLikeDislike(donnees, "echec envoie dislike", "echecEnvoiDislike", ".echecEnvoiDislike", divLikeDislike, "red");
    validationTotalLikeDislike(donnees, "vous avez deja mis un dislike", "dejaDislike", ".dejaDislike", divLikeDislike, "red");
    validationTotalLikeDislike(donnees, "Vous ne pouvez pas mettre de dislike sur votre produit", "pasDislike", ".pasDislike", divLikeDislike, "red");
    validationTotalLikeDislike(donnees, "Vous ne pouvez pas mettre de like sur votre produit", "pasLike", ".pasLike", divLikeDislike, "red");
};*/

window.addEventListener("load", ()=>{
    connexion("php/connexion.php");
});