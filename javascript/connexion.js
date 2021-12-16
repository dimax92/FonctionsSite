let header=document.querySelector("header");
let nav=document.querySelector("header nav");
let ul=document.querySelector("header nav ul");
let liste=document.querySelector("header nav ul li");

function connexion(lien){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.onprogress = function() {
        if(this.response==="Authentification valide"){
            boutonDeconnexion();
            if(window.location.pathname !== "/formulaire.html"){
                lienDeposerAnnonce();
            };
            if(window.location.pathname !== "/mesproduits.html"){
                lienMesProduits();
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

function boutonDeconnexion(){
    let deconnexion= document.createElement("button");
    deconnexion.textContent="Deconnexion";
    deconnexion.className="boutonDeconnexion";
    header.insertBefore(deconnexion, nav);
    deconnexion.addEventListener("click", ()=>{
        functionDeconnexion("php/deconnexion.php");
    });
};

function functionDeconnexion(lien){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.onprogress = function() {
        console.log(this.response);
    };
    xhr.send();
};

window.addEventListener("load", ()=>{
    connexion("php/connexion.php");
});