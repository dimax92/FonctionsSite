let boutonLike=document.querySelector(".fa-thumbs-up");
let boutonDislike=document.querySelector(".fa-thumbs-down");

function envoiLikeDislike(lien){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
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