<?php
require_once "identifiants.php";
require_once "fonctionauthentification.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

if(testAuthentification($connexion)==="Authentification valide"){
    $nomfichier=hash("sha256", uniqid());
    $authentifiant=mysqli_real_escape_string($connexion, $_COOKIE["authentifiant"]);
    $idproduit=hash("sha256", uniqid());
    $nom=mysqli_real_escape_string($connexion, $_POST['inputnom']);
    $marque=mysqli_real_escape_string($connexion, $_POST['inputmarque']);
    $video=mysqli_real_escape_string($connexion, $nomfichier.$_FILES['inputimages']['name']);
    $videonom=mysqli_real_escape_string($connexion, $_FILES['inputimages']['name']);
    $prix=mysqli_real_escape_string($connexion, $_POST['inputprix']);
    $devise=mysqli_real_escape_string($connexion, $_POST['inputdevise']);
    $descriptions=mysqli_real_escape_string($connexion, $_POST['inputcaracteristique']);
    $quantite=mysqli_real_escape_string($connexion, $_POST['inputquantite']);
    $types=mysqli_real_escape_string($connexion, $_POST['inputcategorie']);
    $conditions=mysqli_real_escape_string($connexion, $_POST['condition']);
    $coordonnees=mysqli_real_escape_string($connexion, $_POST['coordonnees']);
    $nomLieu=mysqli_real_escape_string($connexion, $_POST['nomlieu']);
    $lattitude=mysqli_real_escape_string($connexion, $_POST['lattitude']);
    $longitude=mysqli_real_escape_string($connexion, $_POST['longitude']);
    
    $typeVideo=$_FILES['inputimages']['type'];
    $tailleVideo=$_FILES['inputimages']['size'];
    
    function testNom($nom){
        if(preg_match("#[\W \w]#", $nom)){
            return "Ok";
        }
    };
    
    function testMarque($marque){
        if(preg_match("#[\W \w]#", $marque)){
            return "Ok";
        }
    };
    
    function testTypeVideo($typeVideo){
        if($typeVideo==="video/mp4" OR 
        $typeVideo==="video/3gpp" OR 
        $typeVideo==="video/mpeg" OR 
        $typeVideo==="video/ogg" OR 
        $typeVideo==="video/quicktime" OR 
        $typeVideo==="video/webm" OR 
        $typeVideo==="video/x-m4v" OR 
        $typeVideo==="video/ms-asf" OR 
        $typeVideo==="video/x-ms-wmv" OR 
        $typeVideo==="video/x-msvideo"){
            return "Ok";
        }
    };
    
    function testTailleVideo($tailleVideo){
        if($tailleVideo<100000000){
            return "Ok";
        }
    };
    
    function testPrix($prix){
        if(preg_match("#[0-9]#", $prix)){
            return "Ok";
        }
    };
    
    function testDevise($devise){
        if(preg_match("#[\W \w]#", $devise)){
            return "Ok";
        }
    };
    
    function testDescriptions($descriptions){
        if(preg_match("#[\W \w]#", $descriptions)){
            return "Ok";
        }
    };
    
    function testQuantite($quantite){
        if(preg_match("#[0-9]#", $quantite)){
            return "Ok";
        }
    };
    
    function testTypes($types){
        if(preg_match("#[\W \w]#", $types)){
            return "Ok";
        }
    };
    
    function testConditions($conditions){
        if(preg_match("#[\W \w]#", $conditions)){
            return "Ok";
        }
    };
    
    function testCoordonnees($coordonnees){
        if(preg_match("#[\W \w]#", $coordonnees)){
            return "Ok";
        }
    };
    
    function testNomLieu($nomLieu){
        if(preg_match("#[\W \w]#", $nomLieu)){
            return "Ok";
        }
    };
    
    function testDonnees($nom, $marque, $typeVideo, $tailleVideo, $prix, $devise, $descriptions, $quantite, $types, $conditions, $coordonnees, $nomLieu) {
        if(
            testNom($nom)==="Ok" AND 
            testMarque($marque)==="Ok" AND 
            testTypeVideo($typeVideo)==="Ok" AND 
            testTailleVideo($tailleVideo)==="Ok" AND 
            testPrix($prix)==="Ok" AND 
            testDevise($devise)==="Ok" AND 
            testDescriptions($descriptions)==="Ok" AND 
            testQuantite($quantite)==="Ok" AND 
            testTypes($types)==="Ok" AND 
            testConditions($conditions)==="Ok" AND 
            testCoordonnees($coordonnees)==="Ok" AND 
            testNomLieu($nomLieu)==="Ok"
        ){
            return "conforme";
        }else{
            return "nonconforme";
        }
    };
    
    function testDonneesIndividuelles($nom, $marque, $typeVideo, $tailleVideo, $prix, $devise, $descriptions, $quantite, $types, $conditions, $coordonnees, $nomLieu){
        if(testNom($nom)==="Ok"){
            echo "!Nom correct";
        }else{
            echo "!Nom incorrect";
        }
        if(testMarque($marque)==="Ok"){
            echo "!Marque correct";
        }else{
            echo "!Marque incorrect";
        }
        if(testTypeVideo($typeVideo)==="Ok"){
            echo "!Type fichier correct";
        }else{
            echo "!Type fichier incorrect";
        }
        if(testTailleVideo($tailleVideo)==="Ok"){
            echo "!Taille fichier correct";
        }else{
            echo "!Fichier trop lourd";
        }
        if(testPrix($prix)==="Ok"){
            echo "!Prix correct";
        }else{
            echo "!Prix incorrect";
        }
        if(testDevise($devise)==="Ok"){
            echo "!Devise correct";
        }else{
            echo "!Devise incorrect";
        }
        if(testDescriptions($descriptions)==="Ok"){
            echo "!Description correct";
        }else{
            echo "!Description incorrect";
        }
        if(testQuantite($quantite)==="Ok"){
            echo "!Quantite correct";
        }else{
            echo "!Quantite incorrect";
        }
        if(testTypes($types)==="Ok"){
            echo "!Categorie correct";
        }else{
            echo "!Categorie incorrect";
        }
        if(testConditions($conditions)==="Ok"){
            echo "!Condition correct";
        }else{
            echo "!Condition incorrect";
        }
        if(testCoordonnees($coordonnees)==="Ok"){
            echo "!Coordonnees correct";
        }else{
            echo "!Coordonnees incorrect";
        }
        if(testNomLieu($nomLieu)==="Ok"){
            echo "!Coordonnees lieu correct";
        }else{
            echo "!Coordonnees lieu incorrect";
        }
    };
    
    function envoiDonneesFichiers($nomfichier, $connexion, $identifiant, $idproduit, $nom, $marque, $video, $videonom, $prix, $devise, $descriptions, $quantite, $types, $conditions, $coordonnees, $nomLieu, $lattitude, $longitude){
        $identifiante=mysqli_real_escape_string($connexion, $identifiant);
        $requete="INSERT INTO produits(identifiant, idproduit, nom, marque, video, videonom, prix, devise, descriptions, quantite, types, conditions, coordonnees, likes, dislikes, nomlieu, lattitude, longitude) 
        VALUES ('$identifiante', '$idproduit', '$nom', '$marque', '$video', '$videonom', '$prix', '$devise', '$descriptions', '$quantite', '$types', '$conditions', '$coordonnees', 0, 0, '$nomLieu', '$lattitude', '$longitude')";
        $requetesql = $connexion->query("$requete");
        if($requetesql){
            $envoifichier=move_uploaded_file($_FILES['inputimages']['tmp_name'], "C:/wamp64/www/NouveauSite/Videos/".$nomfichier.basename($_FILES['inputimages']['name']));
            if($envoifichier){
                echo "Produit enregistre";
            }else{
                echo "echec";
            }
        }else{
            echo "echec";
        };
    };
    
    function recuperationIdentifiant($connexion, $authentifiant){
        $requeteIdentifiant="SELECT * FROM inscription WHERE authentification='$authentifiant'";
        $requeteIdentifiantsql=$connexion->query("$requeteIdentifiant");
        while($resultatIdentifiant=mysqli_fetch_object($requeteIdentifiantsql)){
            $identifiant=$resultatIdentifiant->identifiant;
            return $identifiant;
        };
    };
    
    $identifiant=recuperationIdentifiant($connexion, $authentifiant);
    
    if(
        testDonnees($nom, $marque, $typeVideo, $tailleVideo, $prix, $devise, $descriptions, $quantite, $types, $conditions, $coordonnees, $nomLieu)==="conforme"
    ){
        envoiDonneesFichiers($nomfichier, $connexion, $identifiant, $idproduit, $nom, $marque, $video, $videonom, $prix, $devise, $descriptions, $quantite, $types, $conditions, $coordonnees, $nomLieu, $lattitude, $longitude);
    }else{
        echo "echec";
        testDonneesIndividuelles($nom, $marque, $typeVideo, $tailleVideo, $prix, $devise, $descriptions, $quantite, $types, $conditions, $coordonnees, $nomLieu);
    }
}else{
    echo "Vous n'etes pas connecte";
}

$connexion->close();
?>