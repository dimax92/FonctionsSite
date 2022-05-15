let plus =document.querySelector(".fa-plus");
let divCaracteristique=document.querySelector(".divCaracteristique");
let tbodyCaracteristique = document.querySelector("tbody");
let toto;

function creationCaracteristique(){
    let nouveauInput = document.createElement("div");
    nouveauInput.className="listeCaracteristiques";
    divCaracteristique.appendChild(nouveauInput);
    let suppCaracteristique=document.createElement("i");
    suppCaracteristique.className="fas suppCaracteristique fa-solid fa-plus";
    nouveauInput.appendChild(suppCaracteristique);
    let nomCaracteristique=document.createElement("input");
    nomCaracteristique.className="nomCaracteristique";
    nouveauInput.appendChild(nomCaracteristique);
    let contenuCaracteristique=document.createElement("input");
    contenuCaracteristique.className="contenuCaracteristique";
    nouveauInput.appendChild(contenuCaracteristique);
    suppCaracteristique.addEventListener("click",()=>{
        nouveauInput.remove();
    });
};

function creationObjet(){
    let objetCaracteristiques = new Object();
    for(i=0; i<=divCaracteristique.children.length-1; i++){
        let objetCaracteristiqueSup = new Object();
        objetCaracteristiqueSup["nom"] = divCaracteristique.children[i].children[1].value;
        objetCaracteristiqueSup["contenu"] = divCaracteristique.children[i].children[2].value;
        objetCaracteristiques[i] = objetCaracteristiqueSup;
    };
    return objetCaracteristiques;
};

plus.addEventListener("click", ()=>{
    creationCaracteristique();
});

function envoiDonnees(lien){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.onloadend = function() {
        let details = JSON.parse(this.response);
        for(i=0; i<=Object.keys(details).length-1; i++){
            creationTableau(details[i].nom, details[i].contenu);
        };
        for(i=0; i<=Object.keys(details).length-1; i++){
            creationCaracteristiqueModifie(details[i].nom, details[i].contenu);
        };
    };
    let data = new FormData();
    data.append("objet", JSON.stringify(creationObjet()));
    xhr.send(data);
};

function creationTableau(nom, contenu){
    let trCaracteristique = document.createElement("tr");
    tbodyCaracteristique.appendChild(trCaracteristique);
    let tdNom = document.createElement("td");
    tdNom.className="tdNom";
    tdNom.textContent=nom;
    trCaracteristique.appendChild(tdNom);
    let tdContenu = document.createElement("td");
    tdContenu.className="tdContenu";
    tdContenu.textContent=contenu;
    trCaracteristique.appendChild(tdContenu);
};

function creationCaracteristiqueModifie(nom, contenu){
    let nouveauInput = document.createElement("div");
    nouveauInput.className="listeCaracteristiques";
    divCaracteristique.appendChild(nouveauInput);
    let suppCaracteristique=document.createElement("i");
    suppCaracteristique.className="fas suppCaracteristique fa-solid fa-plus";
    nouveauInput.appendChild(suppCaracteristique);
    let nomCaracteristique=document.createElement("input");
    nomCaracteristique.className="nomCaracteristique";
    nomCaracteristique.value=nom;
    nouveauInput.appendChild(nomCaracteristique);
    let contenuCaracteristique=document.createElement("input");
    contenuCaracteristique.className="contenuCaracteristique";
    contenuCaracteristique.value=contenu;
    nouveauInput.appendChild(contenuCaracteristique);
    suppCaracteristique.addEventListener("click",()=>{
        nouveauInput.remove();
    });
};