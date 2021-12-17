let main=document.querySelector("main");
let section=document.querySelector("main section");

function recevoirDonnees(lien){
    let xhr=new XMLHttpRequest();
    xhr.onloadend=function(){
        let resultat=this.response.split(" didi: ");
        for(i=1; i<=resultat.length-1; i++){
            let valIdProduit=JSON.parse(resultat[i]).idproduit;
            let valNom=JSON.parse(resultat[i]).nom;
            let valVideo=JSON.parse(resultat[i]).video;
            let valPrix=JSON.parse(resultat[i]).prix;
            let valDevise=JSON.parse(resultat[i]).devise;
            creationProduit(valIdProduit, valNom, valVideo, valPrix, valDevise);
        };
    };
    xhr.open("GET", lien);
    xhr.send();
};
recevoirDonnees("php/mesproduits.php");

function creationProduit(valIdProduit, valnom, valvideo, valprix, valdevise){
    let divProduit=document.createElement("div");
    divProduit.className="divProduit";
    section.appendChild(divProduit);
    let titre=document.createElement("h2");
    titre.className="pnom";
    titre.textContent=valnom
    divProduit.appendChild(titre);
    let video=document.createElement("video");
    video.className="imageproduit";
    video.src="Videos/"+valvideo;
    divProduit.appendChild(video);
    let prix=document.createElement("p");
    prix.className="pprix";
    prix.textContent=valprix+" "+valdevise;
    divProduit.appendChild(prix);
    let divModifier=document.createElement("div");
    divModifier.className="divModifier";
    divProduit.appendChild(divModifier);
    let lienModifier=document.createElement("a");
    lienModifier.href="modifier.html?id="+valIdProduit;
    divModifier.appendChild(lienModifier);
    let buttonModifier=document.createElement("button");
    buttonModifier.className="buttonModifier";
    buttonModifier.textContent="Modifier";
    lienModifier.appendChild(buttonModifier);
    let lienSupprimer=document.createElement("a");
    lienSupprimer.href="#";
    divModifier.appendChild(lienSupprimer);
    let buttonSupprimer=document.createElement("button");
    buttonSupprimer.className="buttonSupprimer";
    buttonSupprimer.textContent="Supprimer";
    buttonSupprimer.addEventListener("click",()=>{
        supprimer("php/supprimer.php", valIdProduit);
    })
    lienSupprimer.appendChild(buttonSupprimer);
};

function supprimer(lien, idproduit){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.onloadend = function() {
        if(this.response==="Produit supprime"){
            validationFormulaire();
        }else{
            nonValidationFormulaire();
        };
        functionSitemap();
    }
    let data = new FormData();
    data.append("idproduit", idproduit);
    xhr.send(data);
};

function validation(){
    let validation= document.createElement("p");
    validation.className="validationFormulaire";
    let contenuvalidation = document.createTextNode('Produit supprime');
    validation.appendChild(contenuvalidation);
    main.insertBefore(validation, section);
    main.children[1].style.color="green";
    main.children[1].style.fontSize="2em";
    main.children[1].style.margin="0em";
    main.children[1].style.fontWeight="bold";
};

function nonValidation(){
    let validation= document.createElement("p");
    validation.className="nonValidationFormulaire";
    let contenuvalidation = document.createTextNode('Echec Suppression');
    validation.appendChild(contenuvalidation);
    main.insertBefore(validation, section);
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