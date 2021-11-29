let section=document.querySelector("main section");
let formulaire=document.querySelector("form");
let recherche=document.querySelector("#inputrecherche");
let buttonRecherche=document.querySelector("button");
let buttonDecroissant=document.querySelector(".buttonDecroissant");
let buttonCroissant=document.querySelector(".buttonCroissant");

function recevoirDonnees(lien){
    let xhr=new XMLHttpRequest();
    xhr.open("GET", lien);
    xhr.onloadend=function(){
        let resultat=this.response.split(" didi: ");
        let rechercheValeur=recherche.value;
        for(a=1; a<=resultat.length-1; a++){
            let valId=JSON.parse(resultat[a]).idproduit;
            let valNom=JSON.parse(resultat[a]).nom;
            let valMarque=JSON.parse(resultat[a]).marque;
            let valVideo=JSON.parse(resultat[a]).video;
            let valPrix=JSON.parse(resultat[a]).prix;
            let valDevise=JSON.parse(resultat[a]).devise;
            let valDescriptions=JSON.parse(resultat[a]).descriptions;
            let valQuantite=JSON.parse(resultat[a]).quantite;
            let valTypes=JSON.parse(resultat[a]).types;
            let valConditions=JSON.parse(resultat[a]).conditions;
            let produitsEnsemble=valNom+" "+
            valMarque+" "+
            valDescriptions+" "+
            valTypes+" "+
            valConditions;
            if(filtreRecherche(rechercheValeur, produitsEnsemble)>=0.8){
                creationProduit(valId, valNom, valVideo, valPrix, valDevise);
            };
        };
    };
    xhr.send();
};

buttonRecherche.addEventListener("click", ()=>{
        suppressionContenu();
    recevoirDonnees("php/moteurderecherche.php");
});

buttonCroissant.addEventListener("click", ()=>{
    triCroissant();
});

buttonDecroissant.addEventListener("click", ()=>{
    triDecroissant();
});

function creationProduit(valid, valnom, valvideo, valprix, valdevise){
    let lien=document.createElement("a");
    lien.href="contenu.html?id="+valid;
    section.appendChild(lien);
    let titre=document.createElement("h2");
    titre.className="pnom";
    titre.textContent=valnom
    lien.appendChild(titre);
    let video=document.createElement("video");
    video.className="imageproduit";
    video.src="Videos/"+valvideo;
    video.muted="muted";
    lien.appendChild(video);
    sourisVideo(video);
    let prix=document.createElement("p");
    prix.className="pprix";
    prix.textContent=valprix+" "+valdevise;
    lien.appendChild(prix);
};

function sourisVideo(video){
    video.addEventListener("mouseover",()=>{
        video.play();
    });
    video.addEventListener("mouseout",()=>{
        video.pause();
    });
};

formulaire.addEventListener("submit",(e)=>{e.preventDefault();});

function suppressionContenu(){
    if(section.children[0]!==undefined){
        if(section.children.length>=2){
            for(i=0; i<=section.children.length-1; i++){
                section.children[i].remove();
            };
            section.children[0].remove();
        }else{
            if(section.children.length<=1){
                section.children[0].remove();
            }
        }
    }
};

function triCroissant(){
    for(i=0; i<=section.children.length-1; i++){
        for(j=0; j<=(section.children.length-1-i); j++){
            if(section.children[j+1]!==undefined){
                if(parseInt(section.children[j+1].children[2].textContent.split(" ")[0])
                < parseInt(section.children[j].children[2].textContent.split(" ")[0])){
                    section.insertBefore(section.children[j+1],section.children[j]);
                }
            }
        }
    }
};

function triDecroissant(){
    for(i=0; i<=section.children.length-1; i++){
        for(j=0; j<=(section.children.length-1-i); j++){
            if(section.children[j+1]!==undefined){
                if(parseInt(section.children[j+1].children[2].textContent.split(" ")[0])
                > parseInt(section.children[j].children[2].textContent.split(" ")[0])){
                    section.insertBefore(section.children[j+1],section.children[j]);
                }
            }
        }
    }
};

function filtreRecherche(valeur, valeurRetour){
    let valeurTotal=0;
    let valeurUnique=0;
    let valeurDecomposee=valeur.split(" ");
    let valeurRetourDecomposee=valeurRetour.split(" ");
    for(i=0; i<=valeurDecomposee.length-1; i++){
        for(j=0; j<=valeurRetourDecomposee.length-1; j++){
            if(ressemblanceMots(valeurDecomposee[i], valeurRetourDecomposee[j])>=0.8){
                valeurUnique=1;
            }
        }
        if(valeurUnique>=1){
            valeurTotal=valeurTotal+1;
            valeurUnique=0;
        }
    };
    return valeurTotal/valeurDecomposee.length;
};

function ressemblanceMots(valeur, valeurRetour){
    let valeurTotal=0;
    for(o=0; o<=valeur.length-1; o++){
        if(valeur[o]===valeurRetour[o]){
            valeurTotal=valeurTotal+1;
        }
    };
    return valeurTotal/valeur.length;
}