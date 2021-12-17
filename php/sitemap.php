<?php
require_once "identifiants.php";
$connexion = mysqli_init();
$connexion->options(MYSQLI_CLIENT_SSL, 'SET AUTOCOMMIT = 0');
$connexion->real_connect($host,$username,$passwd,$dbname);
$connexion->query("SET NAMES utf8mb4");

$dateHeure=date("Y-m-d\TH:i:sP");
$filename="C:\wamp64\www\NouveauSite\sitemap.xml";
$handle=fopen($filename, 'w');

$premierContent="<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\">";

$deuxiemeContent="<url>
<loc>https://dimax92.github.io/NouveauSite/</loc>
<lastmod>$dateHeure</lastmod>
<priority>1.00</priority>
</url>
<url>
<loc>https://dimax92.github.io/NouveauSite/inscription</loc>
<lastmod>$dateHeure</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://dimax92.github.io/NouveauSite/authentification</loc>
<lastmod>$dateHeure</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://dimax92.github.io/NouveauSite/moteurderecherche</loc>
<lastmod>$dateHeure</lastmod>
<priority>0.80</priority>
</url>";

function creationContenuSitemap($connexion, $handle, $dateHeure){
    $requete="SELECT * FROM produits ";
    $requetesql=$connexion->query("$requete");
    while($resultat=mysqli_fetch_object($requetesql)){
        $contenu=remplacementEspacesTirets($resultat->nom);
        $contenu.="-$resultat->idproduit";
        $troisiemeContent="
        <url>
        <loc>https://dimax92.github.io/NouveauSite/$contenu</loc>
        <lastmod>$dateHeure</lastmod>
        <priority>0.80</priority>
        </url>";
        fwrite($handle, $troisiemeContent);
    };
    return "Ok";
};

$dernierContent="
</urlset>";

function creationTotalSitemap($connexion, $handle, $dateHeure, $premierContent, $deuxiemeContent, $dernierContent){
    if(fwrite($handle, $premierContent)){
        if(fwrite($handle, $deuxiemeContent)){
            if(creationContenuSitemap($connexion, $handle, $dateHeure)==="Ok"){
                fwrite($handle, $dernierContent);
            }
        }
    }
};

function remplacementEspacesTirets($espaces){
    $espacesSplit=explode(" ", $espaces);
    $nouveauEspaces=array();
    for($i=0; $i<=count($espacesSplit)-1; $i++){
        if($espacesSplit[$i]!==""){
            array_push($nouveauEspaces, $espacesSplit[$i]);
        }
    };
    return implode("-", $nouveauEspaces);
};

creationTotalSitemap($connexion, $handle, $dateHeure, $premierContent, $deuxiemeContent, $dernierContent);

fclose($handle);

$connexion->close();
?>