let main=document.querySelector("main");
let formulaire=document.querySelector("form");
let email=document.querySelector("#email");
let motdepasse=document.querySelector("#motdepasse");
let boutonConnexion=document.querySelector("#inscription");
let inscription="";
function envoiDonnees(lien){
    const form = document.querySelector("form");
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.upload.addEventListener("progress", (e) =>{
        xhr.onprogress = function() {
            inscription=this.response.split("  ");
            if(this.response==="Inscription valide"){
                validationFormulaire();
                validationTotal(inscription);
            }else{
                nonValidationFormulaire();
                validationTotal(inscription);
            }
        }
    });
    let data = new FormData(form);
    xhr.send(data);
};

function validation(){
    let validation= document.createElement("p");
    validation.className="validationFormulaire";
    let contenuvalidation = document.createTextNode('Inscrit');
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
    let contenuvalidation = document.createTextNode('Echec Inscription');
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

function validationTotal(inscription){
    if(inscription[1]==="Email existe deja"){
        if(!document.querySelector(".pEmailExiste")){
            validationIndividuelle(inscription[1], "pEmailExiste", email);
        }
    }else{
        if(document.querySelector(".pEmailExiste")){
            document.querySelector(".pEmailExiste").remove();
        }
    }
    if(inscription[2]==="Email incorrect"){
        if(!document.querySelector(".pEmailIncorrect")){
            validationIndividuelle(inscription[2], "pEmailIncorrect", email);
        }
    }else{
        if(document.querySelector(".pEmailIncorrect")){
            document.querySelector(".pEmailIncorrect").remove();
        }
    }
    if(inscription[3]==="Mot de passe incorrect"){
        if(!document.querySelector(".pMotdepasse")){
            validationIndividuelle(inscription[3], "pMotdepasse", motdepasse);
        }
    }else{
        if(document.querySelector(".pMotdepasse")){
            document.querySelector(".pMotdepasse").remove();
        }
    }
};

boutonConnexion.addEventListener("click", ()=>{
        envoiDonnees("php/inscription.php");
});
formulaire.addEventListener("submit",(e)=>{e.preventDefault();});
