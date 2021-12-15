let main=document.querySelector("main");
let formulaire=document.querySelector("form");
let labelimages=document.querySelector("#labelimages");
let video=document.querySelector("#images");
let nomlieu=document.querySelector("#nomlieu");
let boutonEnvoie=document.querySelector("#buttonenvoyer");

function recuperationLattitudeLongitude(lieu){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+lieu);
    xhr.onloadend = function() {
        let reponse=JSON.parse(this.response);
        let longitude=reponse[0].lon;
        let lattitude=reponse[0].lat;
        let nomLieu=reponse[0].display_name;
        envoiDonnees("php/modifier.php", longitude, lattitude, nomLieu)
    };
    xhr.send();
};

function recuperationContenu(lien){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.onloadend=function(){
        let resultat=this.response.split(" didi: ");
        formulaire.children[1].value=JSON.parse(resultat[1]).nom;
        formulaire.children[3].value=JSON.parse(resultat[1]).marque;
        formulaire.children[4].innerText=JSON.parse(resultat[1]).videonom;
        formulaire.children[7].value=JSON.parse(resultat[1]).prix;
        formulaire.children[9].value=JSON.parse(resultat[1]).devise;
        formulaire.children[11].value=JSON.parse(resultat[1]).descriptions;
        formulaire.children[13].value=JSON.parse(resultat[1]).quantite;
        formulaire.children[15].value=JSON.parse(resultat[1]).types;
        formulaire.children[17].value=JSON.parse(resultat[1]).conditions;
        formulaire.children[19].value=JSON.parse(resultat[1]).coordonnees;
        formulaire.children[21].value=JSON.parse(resultat[1]).nomlieu;
    };
    let data = new FormData();
    data.append("idproduit", window.location.search.split("=")[1]);
    xhr.send(data);
};
recuperationContenu("php/contenu.php");

function envoiDonnees(lien, longitude, lattitude, nomLieu){
    const form = document.querySelector("form");
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.upload.addEventListener("progress", (e) =>{
        console.log(e);
        xhr.onprogress = function() {
            if(this.response==="Produit modifie"){
                validationFormulaire();
            }else{
                nonValidationFormulaire();
            }
        }
    });
    let data = new FormData(form);
    data.append("idproduit", window.location.search.split("=")[1]);
    data.append("longitude", longitude);
    data.append("lattitude", lattitude);
    data.append("nomlieu", nomLieu);
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
    recuperationLattitudeLongitude(nomlieu.value);
});

formulaire.addEventListener("submit",(e)=>{
    e.preventDefault();
});

video.addEventListener('input',()=>{
    labelimages.innerText=video.value;
});