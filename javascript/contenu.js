let main=document.querySelector("main");
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
        main.children[16].textContent=JSON.parse(resultat[1]).devise;
    };
    let data = new FormData();
    data.append("idproduit", window.location.search.split("=")[1]);
    xhr.send(data);
};
recuperationContenu("php/contenu.php");