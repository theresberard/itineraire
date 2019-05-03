<article id="tus-checking" data-state="hidden">
	<h1>Valider les choix d'UE</h1>

	<?php
		include('selection.php');
	?>

	<section>
		<article id="student-TUs">
			<div>
				<header>
					<div>Beaufay Yéléna (l123456)</div>
					<div id="dateOfRequest">Demande effectuée le 29 septembre 2019</div>
					<button data-action="sendMessage"></button>
				</header>

				<section id="noted_TUs">
					<h2>UE notées</h2>
				</section>

				<section>
					<h2>UE non notées</h2>
				</section>
			</div>

			<div>
				<button name="cancel">Faire Modifier</button>
				<button name="submit">Confirmer</button>
			</div>
		</article>

		<aside>
			<button class="collapsible">Cas traités</button>
			<div></div>

			<button class="collapsible">Cas non traités</button>
			<div></div>
		</aside>
	</section>
</article>