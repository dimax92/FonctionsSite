function recuperationLattitudeLongitude(lieu){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+lieu);
    xhr.onloadend = function() {
        let reponse=JSON.parse(this.response);
        let longitude=reponse[0].lon;
        let lattitude=reponse[0].lat;
        let nomLieu=reponse[0].display_name;
        console.log(reponse);
        envoiLattitudeLongitude("php/carte.php", longitude, lattitude, nomLieu);
    };
    xhr.send();
};

function envoiLattitudeLongitude(lien, longitude, lattitude, nomLieu){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lien);
    let data = new FormData();
    data.append("longitude", longitude);
    data.append("lattitude", lattitude);
    data.append("nomlieu", nomLieu);
    xhr.send(data);
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

function recevoirDonneesLattitudeLongitude(lien){
    let xhr=new XMLHttpRequest();
    xhr.open("GET", lien);
    xhr.onloadend=function(){
        let resultat=this.response.split(" didi: ");
        let lat1=JSON.parse(resultat[1]).lattitude;
        let lon1=JSON.parse(resultat[1]).longitude;
        let lat2=JSON.parse(resultat[2]).lattitude;
        let lon2=JSON.parse(resultat[2]).longitude;
        console.log(calculDistance(lat1, lon1, lat2, lon2, "K")+" km");
    };
    xhr.send();
};

recevoirDonnees("php/recuperationcarte.php");