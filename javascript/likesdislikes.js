let divLikeDislike=document.querySelector(".divLikeDislike");
let boutonLike=document.querySelector(".fa-thumbs-up");
let boutonDislike=document.querySelector(".fa-thumbs-down");

function envoiLikeDislike(lien){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.onloadend = function() {
        let donnees=this.response;
        envoiMessagesErreursLikeDislike(donnees);
    };
    let data = new FormData();
    data.append("idproduit", recuperationIdUrl(window.location.pathname));
    xhr.send(data);
};

boutonLike.addEventListener("click", ()=>{
    envoiLikeDislike("php/likes.php");
});

boutonDislike.addEventListener("click", ()=>{
    envoiLikeDislike("php/dislikes.php");
});

function recuperationIdUrl(nomUrl){
    let nomUrlSplit=nomUrl.split("-");
    return nomUrlSplit[nomUrlSplit.length-1]
};

function validationIndividuelleLikeDislike(contenu, identifiant, position, couleurMessage){
    let incorrect=document.createElement("p");
    incorrect.className=identifiant;
    incorrect.textContent=contenu;
    incorrect.style.color=couleurMessage;
    incorrect.style.margin="0px";
    main.insertBefore(incorrect, position);
};

function validationTotalLikeDislike(donnees, resultat, creationId, identifiant, elementInsert, couleurMessage){
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

function envoiMessagesErreursLikeDislike(donnees){
    validationTotalLikeDislike(donnees, "like envoye", "likeEnvoye", ".likeEnvoye", divLikeDislike, "green");
    validationTotalLikeDislike(donnees, "echec envoie like", "echecEnvoiLike", ".echecEnvoiLike", divLikeDislike, "red");
    validationTotalLikeDislike(donnees, "vous avez deja mis un like ou un dislike", "dejaLike", ".dejaLike", divLikeDislike, "red");
    validationTotalLikeDislike(donnees, "Vous n'etes pas connecte", "pasConnecte", ".pasConnecte", divLikeDislike, "red");
    validationTotalLikeDislike(donnees, "dislike envoye", "dislikeEnvoye", ".dislikeEnvoye", divLikeDislike, "green");
    validationTotalLikeDislike(donnees, "echec envoie dislike", "echecEnvoiDislike", ".echecEnvoiDislike", divLikeDislike, "red");
    validationTotalLikeDislike(donnees, "Vous ne pouvez pas mettre de dislike sur votre produit", "pasDislike", ".pasDislike", divLikeDislike, "red");
    validationTotalLikeDislike(donnees, "Vous ne pouvez pas mettre de like sur votre produit", "pasLike", ".pasLike", divLikeDislike, "red");
};