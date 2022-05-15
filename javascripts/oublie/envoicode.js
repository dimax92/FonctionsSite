const formulaire = document.querySelector("form");
const bouton = document.querySelector("button");
function envoiCode(lien){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    xhr.onloadend = function() {
        if(this.response==="OK"){
            document.location.href = 'https://machatvente.com/confirmationoublie';
        }
    }
    let data = new FormData(formulaire);
    xhr.send(data);
};

bouton.addEventListener("click", (e)=>{
    e.preventDefault();
    envoiCode("php/envoicodeoublie.php");
});