let main=document.querySelector("main");
let formulaire=document.querySelector("form");
let nom=document.querySelector("#inputnom");
let marque=document.querySelector("#inputmarque");
let labelimages=document.querySelector("#labelimages");
let video=document.querySelector("#images");
let prix=document.querySelector("#inputprix");
let devise=document.querySelector("#inputdevise");
let description=document.querySelector("#inputcaracteristique");
let quantite=document.querySelector("#inputquantite");
let type=document.querySelector("#inputcategorie");
let condition=document.querySelector("#inputcondition");
let coordonnees=document.querySelector("#inputcoordonnees");
let nomLieus=document.querySelector("#nomlieu");
let boutonEnvoie=document.querySelector("#buttonenvoyer");
let donnees="";
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
        envoiDonnees("php/formulaire.php");
    };
    xhr.send();
};

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
                donnees=this.response.split("!");
                if(this.response==="Produit enregistre"){
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
    data.append("longitude", longitude);
    data.append("lattitude", lattitude);
    data.append("nomlieu", nomlieu);
    data.append("details", JSON.stringify(creationObjet()));
    xhr.send(data);
};

function validation(){
    let validation= document.createElement("p");
    validation.className="validationFormulaire";
    let contenuvalidation = document.createTextNode('Envoye');
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
    let contenuvalidation = document.createTextNode('Echec Envoie');
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

function validationIndividuelle(contenu, identifiant, position){
    let incorrect=document.createElement("p");
    incorrect.className=identifiant;
    incorrect.textContent=contenu;
    incorrect.style.color="red";
    incorrect.style.margin="0px";
    formulaire.insertBefore(incorrect, position);
};

function validationComplete(donnees){
    validationTotal(donnees, 1, "Nom incorrect", "nomIncorrect", ".nomIncorrect", nom);
    validationTotal(donnees, 2, "Marque incorrect", "marqueIncorrect", ".marqueIncorrect", marque);
    validationTotal(donnees, 3, "Type fichier incorrect", "fichierIncorrect", ".fichierIncorrect", video);
    validationTotal(donnees, 4, "Fichier trop lourd", "fichierLourd", ".fichierLourd", video);
    validationTotal(donnees, 5, "Prix incorrect", "prixIncorrect", ".prixIncorrect", prix);
    validationTotal(donnees, 6, "Devise incorrect", "deviseIncorrect", ".deviseIncorrect", devise);
    validationTotal(donnees, 7, "Description incorrect", "descriptionIncorrect", ".descriptionIncorrect", description);
    validationTotal(donnees, 8, "Quantite incorrect", "quantiteIncorrect", ".quantiteIncorrect", quantite);
    validationTotal(donnees, 9, "Categorie incorrect", "categorieIncorrect", ".categorieIncorrect", type);
    validationTotal(donnees, 10, "Condition incorrect", "conditionIncorrect", ".conditionIncorrect", condition);
    validationTotal(donnees, 11, "Coordonnees incorrect", "coordonneesIncorrect", ".coordonneesIncorrect", coordonnees);
    validationTotal(donnees, 12, "Coordonnees lieu incorrect", "coordonneesLieuIncorrect", ".coordonneesLieuIncorrect", nomLieus);
};

function validationTotal(donnees, numero, resultat, creationId, identifiant, elementInsert){
    if(donnees[numero]===resultat){
        if(!document.querySelector(identifiant)){
            validationIndividuelle(donnees[numero], creationId, elementInsert);
        }
    }else{
        if(document.querySelector(identifiant)){
            document.querySelector(identifiant).remove();
        }
    }
};

boutonEnvoie.addEventListener("click", ()=>{
    if(!document.querySelector(".progression")){
        recuperationLattitudeLongitude(nomLieus.value);
    };
});

formulaire.addEventListener("submit",(e)=>{
    e.preventDefault();
});

video.addEventListener('input',()=>{
    labelimages.innerText=video.value;
});

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
