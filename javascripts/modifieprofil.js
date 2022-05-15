let main=document.querySelector("main");
let titre=document.querySelector("h2");
let formulairePseudo=document.querySelector("#formulairePseudo");
let formulaireEmail=document.querySelector("#formulaireEmail");
let formulaireMotdepasse=document.querySelector("#formulaireMotdepasse");
let pseudo=document.querySelector("#nouveaupseudo");
let email=document.querySelector("#nouveauemail");
let motdepasse=document.querySelector("#nouveaumotdepasse");
let boutonPseudo=document.querySelector("#buttonpseudo");
let boutonEmail=document.querySelector("#buttonemail");
let boutonMotdepasse=document.querySelector("#buttonmotdepasse");
let modification="";

function envoiDonneesPseudo(lien, reponse, formulaire){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.upload.addEventListener("progress", (e) =>{
        xhr.onprogress = function() {
            modification=this.response.split("  ");
            if(this.response===reponse){
                validationFormulaire();
                validationTotalPseudo(modification);
            }else{
                nonValidationFormulaire();
                validationTotalPseudo(modification);
            }
        }
    });
    let data = new FormData(formulaire);
    xhr.send(data);
};

function envoiDonneesEmail(lien, reponse, formulaire){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.upload.addEventListener("progress", (e) =>{
        xhr.onprogress = function() {
            modification=this.response.split("  ");
            if(this.response===reponse){
                document.location.href = 'https://machatvente.com/confirmationmodifie';
                validationTotalEmail(modification);
            }else{
                nonValidationFormulaire();
                validationTotalEmail(modification);
            }
        }
    });
    let data = new FormData(formulaire);
    xhr.send(data);
};

function envoiDonneesMotdepasse(lien, reponse, formulaire){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.upload.addEventListener("progress", (e) =>{
        xhr.onprogress = function() {
            modification=this.response.split("  ");
            if(this.response===reponse){
                validationFormulaire();
                validationTotalMotdepasse(modification);
            }else{
                nonValidationFormulaire();
                validationTotalMotdepasse(modification);
            }
        }
    });
    let data = new FormData(formulaire);
    xhr.send(data);
};

function validation(){
    let validation= document.createElement("p");
    validation.className="validationFormulaire";
    let contenuvalidation = document.createTextNode('Modifier');
    validation.appendChild(contenuvalidation);
    main.insertBefore(validation, titre);
    validation.style.color="green";
    validation.style.fontSize="2em";
    validation.style.margin="0em";
    validation.style.fontWeight="bold";
};

function nonValidation(){
    let validation= document.createElement("p");
    validation.className="nonValidationFormulaire";
    let contenuvalidation = document.createTextNode('Echec Modification');
    validation.appendChild(contenuvalidation);
    main.insertBefore(validation, titre);
    validation.style.color="red";
    validation.style.fontSize="2em";
    validation.style.margin="0em";
    validation.style.fontWeight="bold";
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

function validationIndividuelle(contenu, identifiant, position, formulaire){
    let incorrect=document.createElement("p");
    incorrect.className=identifiant;
    incorrect.textContent=contenu;
    incorrect.style.color="red";
    incorrect.style.margin="0px";
    formulaire.insertBefore(incorrect, position);
};

function validationTotalIndividuelle(reponse, reponseAttendue, classe, classeCreation, nomChamp, formulaire){
    if(reponse===reponseAttendue){
        if(!document.querySelector(classe)){
            validationIndividuelle(reponse, classeCreation, nomChamp, formulaire);
        }
    }else{
        if(document.querySelector(classe)){
            document.querySelector(classe).remove();
        }
    }
};

function validationTotalPseudo(modification){
    validationTotalIndividuelle(modification[1], "Pseudo incorrect", ".pPseudoIncorrect", "pPseudoIncorrect", pseudo, formulairePseudo);
    validationTotalIndividuelle(modification[2], "Pseudo existe deja", ".pPseudoExiste", "pPseudoExiste", pseudo, formulairePseudo);
};

function validationTotalEmail(modification){
    validationTotalIndividuelle(modification[1], "Email existe deja", ".pEmailExiste", "pEmailExiste", email, formulaireEmail);
    validationTotalIndividuelle(modification[2], "Email incorrect", ".pEmailIncorrect", "pEmailIncorrect", email, formulaireEmail);
};

function validationTotalMotdepasse(modification){
    validationTotalIndividuelle(modification[1], "Mot de passe incorrect", ".pMotdepasse", "pMotdepasse", motdepasse, formulaireMotdepasse);
};

boutonPseudo.addEventListener("click", (e)=>{
    e.preventDefault();
    envoiDonneesPseudo("php/modifieprofil/pseudo.php", "Pseudo modifie", formulairePseudo);
});

boutonEmail.addEventListener("click", (e)=>{
    e.preventDefault();
    envoiDonneesEmail("php/modifieprofil/email.php", "Email envoye", formulaireEmail);
});

boutonMotdepasse.addEventListener("click", (e)=>{
    e.preventDefault();
    envoiDonneesMotdepasse("php/modifieprofil/motdepasse.php", "Mot de passe modifie", formulaireMotdepasse);
});
