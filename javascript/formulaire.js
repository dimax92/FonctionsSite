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
let boutonEnvoie=document.querySelector("#buttonenvoyer");
let donnees="";

function envoiDonnees(lien){
    const form = document.querySelector("form");
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.upload.addEventListener("progress", (e) =>{
        console.log(e);
        xhr.onloadend = function() {
            donnees=this.response.split("!");
            if(this.response==="Produit enregistre"){
                validationFormulaire();
                validationComplete(donnees);
            }else{
                nonValidationFormulaire();
                validationComplete(donnees);
            }
        }
    });
    let data = new FormData(form);
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
    validationTotal(donnees, 1, "Nom incorrect", ".nomIncorrect", nom);
    validationTotal(donnees, 2, "Marque incorrect", ".marqueIncorrect", marque);
    validationTotal(donnees, 3, "Type fichier incorrect", ".fichierIncorrect", video);
    validationTotal(donnees, 4, "Fichier trop lourd", ".fichierLourd", video);
    validationTotal(donnees, 5, "Prix incorrect", ".prixIncorrect", prix);
    validationTotal(donnees, 6, "Devise incorrect", ".deviseIncorrect", devise);
    validationTotal(donnees, 7, "Description incorrect", ".descriptionIncorrect", description);
    validationTotal(donnees, 8, "Quantite incorrect", ".quantiteIncorrect", quantite);
    validationTotal(donnees, 9, "Categorie incorrect", ".categorieIncorrect", type);
    validationTotal(donnees, 10, "Condition incorrect", ".conditionIncorrect", condition);
    validationTotal(donnees, 11, "Coordonnees incorrect", ".coordonneesIncorrect", coordonnees);
};

function validationTotal(donnees, numero, resultat, identifiant, elementInsert){
    if(donnees[numero]===resultat){
        if(!document.querySelector(identifiant)){
            validationIndividuelle(donnees[numero], resultat, elementInsert);
        }
    }else{
        if(document.querySelector(identifiant)){
            document.querySelector(identifiant).remove();
        }
    }
};

boutonEnvoie.addEventListener("click", ()=>{
        envoiDonnees("php/formulaire.php");
});

formulaire.addEventListener("submit",(e)=>{
    e.preventDefault();
});

video.addEventListener('input',()=>{
    labelimages.innerText=video.value;
});