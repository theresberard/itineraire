<footer>
	<?php
		include("credits.php");
	?>

	<div id="footer-buttons">
	    <input type="radio" id="radioHome" name="footerButton" value="0" checked>
	    <label for="radioHome"><i class="fas fa-home"></i><br/>Accueil</label>

	    <input type="radio" id="radioChat" name="footerButton" value="1">
	    <label for="radioChat"><i class="far fa-envelope"></i><br/>Messages</label>

	    <input type="radio" id="radioUser" name="footerButton" value="2">
	    <label for="radioUser"><i class="far fa-user"></i><br/>Profil</label>

		<input type="radio" id="radioMore" name="footerButton" value="3">
	    <label for="radioMore"><i class="fas fa-ellipsis-h"></i><br/>Plus</label>
	</div>
</footer>