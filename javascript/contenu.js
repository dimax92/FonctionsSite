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
let iFrameCarte=document.querySelector(".iFrameCarte");
let bouton=document.querySelector(".boutonPlay"); 
let temps=document.querySelector(".temps"); 
let inputRange=document.querySelector(".inputRange"); 
function recuperationContenu(lien){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.onloadend=function(){
        let resultat=this.response.split(" didi: ");
        nomProduit.textContent=JSON.parse(resultat[1]).nom;
        marque.textContent=JSON.parse(resultat[1]).marque;
        video.src="Videos/"+JSON.parse(resultat[1]).video;
        prix.textContent=JSON.parse(resultat[1]).prix+" "+JSON.parse(resultat[1]).devise;
        description.textContent=JSON.parse(resultat[1]).descriptions;
        quantite.textContent=JSON.parse(resultat[1]).quantite;
        categorie.textContent=JSON.parse(resultat[1]).types;
        condition.textContent=JSON.parse(resultat[1]).conditions;
        coordonneesContact.textContent=JSON.parse(resultat[1]).coordonnees;
        carteProduit(JSON.parse(resultat[1]).lattitude, JSON.parse(resultat[1]).longitude)
    };
    let data = new FormData();
    data.append("idproduit", recuperationIdUrl(window.location.pathname));
    xhr.send(data);
};
recuperationContenu("php/contenu.php");

setTimeout(function() {
    let secondes=(Math.floor(video.currentTime));
    inputRange.min=0;
    inputRange.max=Math.round(video.duration);
    temps.textContent="00:"+0+secondes+"/"+"00:"+inputRange.max;
    inputRange.value=0;
}, 500);
inputRange.step=1;
inputRange.addEventListener("input", ()=>{
    video.currentTime=inputRange.value
});

function playPauseVideo(boutonControle){
    boutonControle.addEventListener("click",()=>{
        if(video.paused){
            video.play();
            bouton.className="fas fa-pause";
        }else{
            video.pause();
            bouton.className="fas fa-play";
        }
    });
};

playPauseVideo(bouton);
playPauseVideo(video);

video.addEventListener('timeupdate',()=>{
    inputRange.value=video.currentTime;
    let secondes=(Math.floor(video.currentTime));
    let tempsVideo=(Math.floor(video.duration));
    if(video.currentTime===video.duration){
    video.currentTime=0;
    bouton.className="fas fa-play";
    };
    if(secondes<10){
        temps.textContent="00:"+0+secondes+"/"+"00:"+tempsVideo;
    }else{
        temps.textContent="00:"+secondes+"/"+"00:"+tempsVideo;
    }
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
        accessToken: 'your.mapbox.access.token'
    }).addTo(map);
    let marker = L.marker([lattitude, longitude]).addTo(map);
    marker.on('click', (e)=>{
        console.log(e);
    });
};