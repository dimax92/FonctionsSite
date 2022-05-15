let main=document.querySelector("main");
let formulaire=document.querySelector("form");
let nom=document.querySelector("#inputnom");
let marque=document.querySelector("#inputmarque");
let labelimages=document.querySelector("#labelimages");
let video=document.querySelector("#images");
let prix=document.querySelector("#inputprix");
let devise=document.querySelector("#inputdevise");
let caracteristique=document.querySelector("#inputcaracteristique");
let quantite=document.querySelector("#inputquantite");
let categorie=document.querySelector("#inputcategorie");
let condition=document.querySelector("#inputcondition");
let coordonnees=document.querySelector("#inputcoordonnees");
let nomLieus=document.querySelector("#nomlieu");
let boutonEnvoie=document.querySelector("#buttonenvoyer");
let longitude="";
let lattitude="";
let nomlieu="";
let plus = document.querySelector(".fa-plus");
let divCaracteristique= document.querySelector(".divCaracteristique");

function recuperationLattitudeLongitude(lieu){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+lieu);
    xhr.onloadend = function() {
        let reponse=JSON.parse(this.response);
        if(reponse.length >= 1){
            longitude=reponse[0].lon;
            lattitude=reponse[0].lat;
            nomlieu=reponse[0].display_name;
        };
        envoiDonnees("php/modifier.php");
    };
    xhr.send();
};

function recuperationContenu(lien){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.onloadend=function(){
        let resultat=this.response.split(" didi: ");
        nom.value=JSON.parse(resultat[1]).nom;
        marque.value=JSON.parse(resultat[1]).marque;
        labelimages.innerText=JSON.parse(resultat[1]).videonom;
        prix.value=JSON.parse(resultat[1]).prix;
        devise.value=JSON.parse(resultat[1]).devise;
        caracteristique.value=JSON.parse(resultat[1]).descriptions;
        quantite.value=JSON.parse(resultat[1]).quantite;
        categorie.value=JSON.parse(resultat[1]).types;
        condition.value=JSON.parse(resultat[1]).conditions;
        coordonnees.value=JSON.parse(resultat[1]).coordonnees;
        nomLieus.value=JSON.parse(resultat[1]).nomlieu;
        let details = JSON.parse(resultat[1]).details;
        for(i=0; i<=Object.keys(details).length-1; i++){
            creationCaracteristiqueModifie(details[i].nom, details[i].contenu);
        };
    };
    let data = new FormData();
    data.append("idproduit", window.location.search.split("=")[1]);
    xhr.send(data);
};
recuperationContenu("php/contenu.php");

function envoiDonnees(lien){
    const form = document.querySelector("form");
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    let progression= document.createElement("progress");
    progression.className="progression";
    main.insertBefore(progression, formulaire);
    xhr.upload.addEventListener("progress", (e) =>{
        progression.max=e.total*1.2;
        progression.value=e.loaded;
        xhr.onloadend = function() {
            if(e.loaded===e.total && this.status===200){
                document.querySelector(".progression").value=e.total*1.2;
                let progression=document.querySelector(".progression");
                main.removeChild(progression);
                if(this.response==="Produit modifie"){
                    validationFormulaire();
                    validationComplete(donnees);
                }else{
                    nonValidationFormulaire();
                    validationComplete(donnees);
                };
            };
            functionSitemap();
        }
    });
    let data = new FormData(form);
    data.append("idproduit", window.location.search.split("=")[1]);
    data.append("longitude", longitude);
    data.append("lattitude", lattitude);
    data.append("nomlieu", nomlieu);
    data.append("details", JSON.stringify(creationObjet()));
    xhr.send(data);
};

function validation(){
    let validation= document.createElement("p");
    validation.className="validationFormulaire";
    let contenuvalidation = document.createTextNode('Produit Modifie');
    validation.appendChild(contenuvalidation);
    main.insertBefore(validation, formulaire);
    main.children[1].style.color="green";
    main.children[1].style.fontSize="2em";
    main.children[1].style.margin="0em";
    main.children[1].style.fontWeight="bold";
};

function nonValidation(){
    let validation= document.createElement("p");
    validation.className="nonValidationFormulaire";
    let contenuvalidation = document.createTextNode('Echec Modification');
    validation.appendChild(contenuvalidation);
    main.insertBefore(validation, formulaire);
    main.children[1].style.color="red";
    main.children[1].style.fontSize="2em";
    main.children[1].style.margin="0em";
    main.children[1].style.fontWeight="bold";
};

function nonValidationFormulaire(){
    if(document.querySelector(".validationFormulaire")){
        let validationFormulaire=document.querySelector(".validationFormulaire");
        main.removeChild(validationFormulaire);
        nonValidation();
    }else{
        if(!document.querySelector(".nonValidationFormulaire")){
            nonValidation();
        }
    }
};

function validationFormulaire(){
    if(document.querySelector(".nonValidationFormulaire")){
        let nonValidationFormulaire=document.querySelector(".nonValidationFormulaire");
        main.removeChild(nonValidationFormulaire);
        validation();
      }else{
          if(!document.querySelector(".validationFormulaire")){
              validation();
          }
    }
};

boutonEnvoie.addEventListener("click", ()=>{
    recuperationLattitudeLongitude(nomLieus.value);
});

formulaire.addEventListener("submit",(e)=>{
    e.preventDefault();
});

video.addEventListener('input',()=>{
    labelimages.innerText=video.value;
});

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