<nav id="menu">
	<ul>
		<li>Inscription pédagogique</li>

<?php
	if ($user == "teacher") {
?>
		<li>
		    <input type="radio" id="radioSpecialities" name="menuButton" value="0">
		    <label for="radioSpecialities">Spécialités</label>
		</li>

		<li>
		    <input type="radio" id="radioTUs" name="menuButton" value="1">
		    <label for="radioTUs">UE</label>
		</li>

		<li>
			<input type="radio" id="radioMessages" name="menuButton" value="2">
		    <label for="radioMessages">Messages</label>
		</li>
<?php
	}

	if ($user == "student") {
?>
		<li><a class="studentMessages-button" data-js="open" data-view="student-messages">Messages</a></li>
<?php
	}
?>
		<li><a>Déconnexion</a></li>
	</ul>
</nav>