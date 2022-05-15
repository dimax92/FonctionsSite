let main=document.querySelector("main");
let formulaire=document.querySelector("form");
let boutonConnexion=document.querySelector("#seconnecter");

function envoiAuthentification(lien){
    const form = document.querySelector("form");
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.upload.addEventListener("progress", (e) =>{
        xhr.onprogress = function() {
            if(this.response==="Authentification valide"){
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
    });
    let data = new FormData(form);
    xhr.send(data);
};

function validation(){
    let validation= document.createElement("p");
    validation.className="validationFormulaire";
    let contenuvalidation = document.createTextNode('Authentification reussi');
    validation.appendChild(contenuvalidation);
    main.insertBefore(validation, formulaire);
    main.children[1].style.color="green";
    main.children[1].style.fontSize="2em";
    main.children[1].style.margin="0em";
    main.children[1].style.fontWeight="bold";
    main.children[1].style.textAlign="center";
};

function nonValidation(){
    let validation= document.createElement("p");
    validation.className="nonValidationFormulaire";
    let contenuvalidation = document.createTextNode('Echec Authentification');
    validation.appendChild(contenuvalidation);
    main.insertBefore(validation, formulaire);
    main.children[1].style.color="red";
    main.children[1].style.fontSize="2em";
    main.children[1].style.margin="0em";
    main.children[1].style.fontWeight="bold";
    main.children[1].style.textAlign="center";
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

boutonConnexion.addEventListener("click", ()=>{
    envoiAuthentification("php/authentification.php");
});
formulaire.addEventListener("submit",(e)=>{e.preventDefault();});