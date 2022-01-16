let section=document.querySelector("main section");
let formulaire=document.querySelector("form");
let recherche=document.querySelector("#inputrecherche");
let buttonRecherche=document.querySelector("button");
let buttonDecroissant=document.querySelector(".buttonDecroissant");
let buttonCroissant=document.querySelector(".buttonCroissant");
let inputlieu=document.querySelector(".inputlieu");
let inputdistance=document.querySelector(".inputdistance");

let comparaisonLattitudeLongitudeReponse;

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
            let valLattitude=JSON.parse(resultat[a]).lattitude;
            let valLongitude=JSON.parse(resultat[a]).longitude;
            let produitsEnsemble=valNom+" "+
            valMarque+" "+
            valDescriptions+" "+
            valTypes+" "+
            valConditions;
            comparaisonLattitudeLongitude(inputlieu.value, valLattitude, valLongitude, rechercheValeur, produitsEnsemble, valId, valNom, valVideo, valPrix, valDevise);
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
    lien.href=remplacementEspacesTirets(valnom)+"-"+valid;
    section.appendChild(lien);
    let titre=document.createElement("h2");
    titre.className="pnom";
    titre.textContent=valnom
    lien.appendChild(titre);
    let video=document.createElement("video");
    video.className="imageproduit";
    video.src="/videos/"+valvideo;
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
};

function remplacementEspacesTirets(espaces){
    let espacesSplit=espaces.split(" ");
    let nouveauEspaces=[];
    for(i=0; i<=espacesSplit.length-1; i++){
        if(espacesSplit[i]!==""){
            nouveauEspaces.push(espacesSplit[i]);
        }
    };
    return nouveauEspaces.join("-");
};

function comparaisonLattitudeLongitude(lieu, valLattitude, valLongitude, rechercheValeur, produitsEnsemble, valId, valNom, valVideo, valPrix, valDevise){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+lieu);
    xhr.onloadend = function() {
        let reponseLatLon=JSON.parse(this.response);
        if(reponseLatLon.length>=1){
            let longitude=reponseLatLon[0].lon;
            let lattitude=reponseLatLon[0].lat;
            if(calculDistance(lattitude, longitude, valLattitude, valLongitude, "K")<=inputdistance.value){
                if(filtreRecherche(rechercheValeur, produitsEnsemble)>=0.8){
                    creationProduit(valId, valNom, valVideo, valPrix, valDevise);
                };
            }
        }else{
            if(filtreRecherche(rechercheValeur, produitsEnsemble)>=0.8){
                creationProduit(valId, valNom, valVideo, valPrix, valDevise);
            };
        }
    };
    xhr.send();
};

function calculDistance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
};
