<?php
$destination_path = "/var/www/html/NouveauSite/videos/";
$target_path = $destination_path . basename( $_FILES["inputimages"]["name"]);
move_uploaded_file($_FILES['inputimages']['tmp_name'], $target_path);
?>
