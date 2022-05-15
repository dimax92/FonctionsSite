const formulaire = document.querySelector("form");
const bouton = document.querySelector("button");
const main=document.querySelector("main");
function envoiCode(lien){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    let data = new FormData(formulaire);
    xhr.onprogress = function() {
        if(this.response==="Valide"){
            validationFormulaire();
            if(window.location.pathname !== "/formulaire"){
                lienDeposerAnnonce();
            };
            if(window.location.pathname !== "/mesproduits"){
                lienMesProduits();
            };
            if(window.location.pathname !== "/deconnexion"){
                lienDeconnexion();
            };
            if(window.location.pathname !== "/desinscription"){
                lienDesinscription();
            };
            if(window.location.pathname !== "/profil"){
                lienProfil();
            };
        }else{
            nonValidationFormulaire();
        }
    }
    xhr.send(data);
};

bouton.addEventListener("click", (e)=>{
    e.preventDefault();
    envoiCode("php/verificationcodeoublie.php");
});

function validation(){
    let validation= document.createElement("p");
    validation.className="validationFormulaire";
    let contenuvalidation = document.createTextNode('Authentification reussi');
    validation.appendChild(contenuvalidation);
    main.insertBefore(validation, formulaire);
    main.children[2].style.color="green";
    main.children[2].style.fontSize="2em";
    main.children[2].style.margin="0em";
    main.children[2].style.fontWeight="bold";
};

function nonValidation(){
    let validation= document.createElement("p");
    validation.className="nonValidationFormulaire";
    let contenuvalidation = document.createTextNode('Echec Authentification');
    validation.appendChild(contenuvalidation);
    main.insertBefore(validation, formulaire);
    main.children[2].style.color="red";
    main.children[2].style.fontSize="2em";
    main.children[2].style.margin="0em";
    main.children[2].style.fontWeight="bold";
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