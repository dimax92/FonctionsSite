let main=document.querySelector("main");
let video=document.querySelector("video");
let bouton=document.querySelector(".fas"); 
let temps=document.querySelector(".temps"); 
let inputRange=document.querySelector(".inputRange"); 
function recuperationContenu(lien){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.onloadend=function(){
        let resultat=this.response.split(" didi: ");
        main.children[0].textContent=JSON.parse(resultat[1]).nom;
        main.children[2].textContent=JSON.parse(resultat[1]).marque;
        main.children[4].children[0].src="Videos/"+JSON.parse(resultat[1]).video;
        main.children[6].textContent=JSON.parse(resultat[1]).prix+" "+JSON.parse(resultat[1]).devise;
        main.children[8].textContent=JSON.parse(resultat[1]).descriptions;
        main.children[10].textContent=JSON.parse(resultat[1]).quantite;
        main.children[12].textContent=JSON.parse(resultat[1]).types;
        main.children[14].textContent=JSON.parse(resultat[1]).conditions;
        main.children[16].textContent=JSON.parse(resultat[1]).coordonnees;
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