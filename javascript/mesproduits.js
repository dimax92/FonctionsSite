let section=document.querySelector("main section");

function recevoirDonnees(lien){
    let xhr=new XMLHttpRequest();
    xhr.onloadend=function(){
        let resultat=this.response.split(" didi: ");
        for(i=1; i<=resultat.length-1; i++){
            let valNom=JSON.parse(resultat[i]).nom;
            let valVideo=JSON.parse(resultat[i]).video;
            let valPrix=JSON.parse(resultat[i]).prix;
            let valDevise=JSON.parse(resultat[i]).devise;
            creationProduit(valNom, valVideo, valPrix, valDevise);
        };
    };
    xhr.open("GET", lien);
    xhr.send();
};
recevoirDonnees("php/mesproduits.php");

function creationProduit(valnom, valvideo, valprix, valdevise){
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
    lienModifier.href="#";
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
    lienSupprimer.appendChild(buttonSupprimer);
}