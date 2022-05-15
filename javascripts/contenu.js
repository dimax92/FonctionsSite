let main=document.querySelector("main");
let section=document.querySelector("section");
let nomProduit=document.querySelector(".hNomProduit");
let marque=document.querySelector(".pmarque");
let video=document.querySelector("video");
let prix=document.querySelector(".pPrix");
let description=document.querySelector(".pDescription");
let quantite=document.querySelector(".pQuantite");
let categorie=document.querySelector(".pCategorie");
let condition=document.querySelector(".pCondition");
let coordonneesContact=document.querySelector(".pCoordonneesContact");
let bouton=document.querySelector(".boutonPlay"); 
let boutonGrandEcran=document.querySelector(".boutonGrandEcran");
let boutonVolume=document.querySelector(".boutonVolume");
let temps=document.querySelector(".temps"); 
let inputRange=document.querySelector(".inputRange"); 
let inputRangeVolume=document.querySelector(".inputRangeVolume"); 
let nombreLikes=document.querySelector(".nombreLikes");
let nombreDislikes=document.querySelector(".nombreDislikes");
let tbodyCaracteristique = document.querySelector("tbody");

function recuperationMetaDescription(chaine){
    if(chaine.length<=150){
        return chaine;
    }
    if(chaine.length>=151){
        return chaine.slice(0, 150);
    }
};

function recuperationContenu(lien){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.onloadend=function(){
        let resultat=this.response.split(" didi: ");
        document.querySelector('meta[name="description"]').content=recuperationMetaDescription(JSON.parse(resultat[1]).descriptions);
        document.title=JSON.parse(resultat[1]).nom;
        nombreLikes.textContent=JSON.parse(resultat[1]).likes;
        nombreDislikes.textContent=JSON.parse(resultat[1]).dislikes;
        nomProduit.textContent=JSON.parse(resultat[1]).nom;
        marque.textContent=JSON.parse(resultat[1]).marque;
        video.src="videos/"+JSON.parse(resultat[1]).video;
        prix.textContent=JSON.parse(resultat[1]).prix+" "+JSON.parse(resultat[1]).devise;
        description.textContent=JSON.parse(resultat[1]).descriptions;
        quantite.textContent=JSON.parse(resultat[1]).quantite;
        categorie.textContent=JSON.parse(resultat[1]).types;
        condition.textContent=JSON.parse(resultat[1]).conditions;
        coordonneesContact.textContent=JSON.parse(resultat[1]).coordonnees;
        carteProduit(JSON.parse(resultat[1]).lattitude, JSON.parse(resultat[1]).longitude);
        let details = JSON.parse(resultat[1]).details;
        for(i=0; i<=Object.keys(details).length-1; i++){
            creationTableau(details[i].nom, details[i].contenu);
        };
    };
    let data = new FormData();
    data.append("idproduit", recuperationIdUrl(window.location.pathname));
    xhr.send(data);
};
recuperationContenu("php/contenu.php");

function minutesSecondes(resultatTemps){
    let temps=resultatTemps/60;
    let minutes=Math.trunc(temps);
    let secondes=Math.trunc((temps-minutes)*60);
    if(minutes<10){
        affichageMinutes="0"+minutes+":";
    }else{
        affichageMinutes=minutes+":";
    };
    if(secondes<10){
        affichageSecondes="0"+secondes;
    }else{
        affichageSecondes=secondes;
    };
    return affichageMinutes+affichageSecondes;
};

function gradientInputRange(inputRange){
    let valeurGradient=(inputRange.value/inputRange.max)*100;
    inputRange.style.background="linear-gradient(90deg, #03a9f4 "+valeurGradient+"%, white 0%)";
}
setTimeout(function() {
    inputRange.min=0;
    inputRange.max=Math.round(video.duration);
    temps.textContent=minutesSecondes(video.currentTime)+"/"+minutesSecondes(video.duration);
    inputRange.value=0;
}, 2000);
inputRange.step=1;
inputRange.addEventListener("input", ()=>{
    video.currentTime=inputRange.value;
    gradientInputRange(inputRange);
});

function playPauseVideo(boutonControle){
    boutonControle.addEventListener("click",()=>{
        if(video.paused){
            video.play();
            bouton.className="boutonPlay fas fa-pause";
        }else{
            video.pause();
            bouton.className="boutonPlay fas fa-play";
        }
    });
};

playPauseVideo(bouton);
playPauseVideo(video);

function grandEcran(){
    boutonGrandEcran.addEventListener("click",()=>{
        if (video.requestFullscreen) {
            video.requestFullscreen();
        }
    })
};

grandEcran();

function volumeVideo(){
    inputRangeVolume.step=0.1;
    inputRangeVolume.min=0;
    inputRangeVolume.max=1;
    gradientInputRange(inputRangeVolume);
    inputRangeVolume.addEventListener("input", ()=>{
        gradientInputRange(inputRangeVolume);
        if(boutonVolume.className==="boutonVolume fas fa-volume-up"){
            video.volume=parseFloat(inputRangeVolume.value);
        }
    });
    boutonVolume.addEventListener("click",()=>{
        if(video.volume > 0){
            video.volume=0;
            boutonVolume.className="boutonVolume fas fa-volume-mute";
        }else{
            video.volume=parseFloat(inputRangeVolume.value);
            boutonVolume.className="boutonVolume fas fa-volume-up";
        }
    });
};

volumeVideo();

video.addEventListener('timeupdate',()=>{
    inputRange.value=video.currentTime;
    gradientInputRange(inputRange);
    if(video.currentTime===video.duration){
    video.currentTime=0;
    bouton.className="fas fa-play";
    };
    temps.textContent=minutesSecondes(video.currentTime)+"/"+minutesSecondes(video.duration);
});

function recuperationIdUrl(nomUrl){
    let nomUrlSplit=nomUrl.split("-");
    return nomUrlSplit[nomUrlSplit.length-1]
};

function carteProduit(lattitude, longitude){
    let map = L.map('map').setView([lattitude, longitude], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGltYXg5MiIsImEiOiJja3g1NnJiMTMwY2NzMnZuemN3Z3djcnVtIn0.PcBZuTLeR4U2cEZ1346szw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: ''
    }).addTo(map);
    let marker = L.marker([lattitude, longitude]).addTo(map);
};

function creationTableau(nom, contenu){
    let trCaracteristique = document.createElement("tr");
    tbodyCaracteristique.appendChild(trCaracteristique);
    let tdNom = document.createElement("td");
    tdNom.className="tdNom";
    tdNom.textContent=nom;
    trCaracteristique.appendChild(tdNom);
    let tdContenu = document.createElement("td");
    tdContenu.className="tdContenu";
    tdContenu.textContent=contenu;
    trCaracteristique.appendChild(tdContenu);
}