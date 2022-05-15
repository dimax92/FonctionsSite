let tableauValeursAjoutees = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "!", "@", "#", "$", "%", "&", "*", "?"];
let tableauOrdonnee = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "@", ".", "-"];
let tableauDesordonnee = ['QkJ', 'm#I', 'j3t', 'Php', 'nLD', 'ryv', 'wyf', '&1B', '9q%', 'FC3', 'Yaq', 'JAI', '3uS', '0hb', 'xoa', 'N2D', 'Oy5', '!#4', 'MXH', 'pgX', 'oz6', 'ys4', 'fGC', 'GEX', 'kUK', 'KSR', 'IDA', 'qE%', 'aUt', 'X#1', 'Ez%', 'LZT', 'Wi2', 'Cu@', '6vD', 'vUh', '@4V', 'uz5', '#T8', '2%e', 'sR$', 'ecA', 'AZH', 'l1%', 'SRB', 'Ug1', 'tTZ', 'ZcV', '1*c', '?5i', 'dHi', 'Vgc', 'T*b', '4*5', 'BzD', '*g7', 'cc8', 'Dib', 'hRR', 'Rzz', 'i8g', 'gz$', '778', 'H5%', 'bb$', 'z88', '$88', '%8%', '558', '888'];
let adressemail = "medibennaceur@gmail.com";
function cryptageDonnees(adressemail){
    let nouveauTableau=[];
    let nouvelleAdresseMail = adressemail.split("");
    for(i=0; i<=nouvelleAdresseMail.length-1; i++){
        for(j=0; j<=tableauOrdonnee.length-1; j++){
            if(nouvelleAdresseMail[i]===tableauOrdonnee[j]){
                nouveauTableau.push(tableauDesordonnee[j]);
            }
        }
    };
    return nouveauTableau.join("");
};

function decryptageDonnees(adressemail){
    let nouveauTableau=[];
    let ancienneAdresseMail = recuperationDonneesCryptage(adressemail);
    for(i=0; i<=ancienneAdresseMail.length-1; i++){
        for(j=0; j<=tableauDesordonnee.length-1; j++){
            if(ancienneAdresseMail[i]===tableauDesordonnee[j]){
                nouveauTableau.push(tableauOrdonnee[j]);
            }
        }
    };
    return nouveauTableau.join("");
};

function creationTableauValeurs(tableau){
    let nouveauTableau = [];
    let longueurTableau = tableau.length - 1;
    for(i=0; i<=longueurTableau; i++){
        let ancienTableau = tableau;
        let tableauAjouts = tableauValeursAjoutees;
        let nombreLettres = ancienTableau.length;
        let nombreLettresAjoutes = tableauValeursAjoutees.length;
        let numeroPremiereLettre = Math.floor(Math.random() * nombreLettres);
        let numeroDeuxiemeLettre = Math.floor(Math.random() * nombreLettresAjoutes);
        let numeroTroisiemeLettre = Math.floor(Math.random() * nombreLettresAjoutes);
        nouveauTableau.push(ancienTableau[numeroPremiereLettre]+tableauAjouts[numeroDeuxiemeLettre]+tableauAjouts[numeroTroisiemeLettre]);
        ancienTableau.splice(numeroPremiereLettre, 1);
    };
    return nouveauTableau;
};

function recuperationDonneesCryptage(chaine){
    let tableauChaine=chaine.split("");
    let longueurTableau=tableauChaine.length;
    let nouveauTableau = [];
    let numero = 0;
    let recuperationMot;
    for(i=0; i<=longueurTableau; i++){
        numero = numero+1;
        if(numero===3){
            recuperationMot = tableauChaine.splice(0,numero);
            nouveauTableau.push(recuperationMot.join(""));
            numero = 0;
        }
    };
    return nouveauTableau;
};