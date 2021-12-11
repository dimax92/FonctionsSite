let divCommentaireSup=document.querySelector(".divCommentaireSup");
let textCommentaire=document.querySelector(".textCommentaire");
let boutonCommentaire=document.querySelector(".boutonCommentaire");

function envoiLikeDislike(lien){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
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
    envoiLikeDislike("php/envoicommentaire.php");
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