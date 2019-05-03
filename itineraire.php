<!DOCTYPE html>

<?php
	session_start();

	$user = 'student';

	// Vérifier si l'utilisateur est connecté ou non
	/*if (!isset($_SESSION['username']) || !isset($_SESSION['password'])) {
		// Si l'utilisateur n'est pas connecté, il est automatiquement redirigé vers la page d'identification.
		header('Location: identification.php');
		exit();
	}

	$user = unserialize($_SESSION['user']);*/
?>

<html lang="fr">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

		<!-- Fichiers CSS -->
		<link type="text/css" rel="stylesheet" href="css/common.css" />
		<link type="text/css" rel="stylesheet" href="css/form.css" />
		<link type="text/css" rel="stylesheet" href="css/main.css" />
		<link type="text/css" rel="stylesheet" href="css/menu.css" />
		<link type="text/css" rel="stylesheet" href="css/popup.css" />
		<link type="text/css" rel="stylesheet" href="css/teacher.css" />

		<!-- Font Awesome -->
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
        
		<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.3.1.min.js"></script>

		<title>Itinéraire</title>
	</head>
	<body>
		<?php
			include("header.php");
			include("popup.php");
		?>

		<main>
			<?php
				if ($user == 'student') {
					include("student_view.php");

					/* Contenu uniquement visible sur la version mobile */
					include('chat.php');
					include('user.php');
					include('more.php');

				} else if ($user == 'teacher') {
					include("teacher_view.php");
				}

				/*if ($user instanceof Teacher) {
					include("gestion_ceintures.php");
					include("evaluation.php");
				}

				include("statistiques_section.php");

				if ($user instanceof Admin) {
					include("identifiants.php");
					include("gestion_matieres.php");
				}*/
			?>

			
		</main>
		
		<?php
			include("footer.php");
		?>

		<script type="text/javascript" src="js/common.js"></script>
		<script type="text/javascript" src="js/selection.js"></script>
		<script type="text/javascript" src="js/tab.js"></script>
		<script type="text/javascript" src="js/checkable-tab.js"></script>
		<script type="text/javascript" src="js/ue.js"></script>
		<script type="text/javascript" src="js/popup.js"></script>
		<script type="text/javascript" src="js/student_view.js"></script>
		<script type="text/javascript" src="js/teacher_view.js"></script>
	</body>
</html>