<?php
	if ($user == 'student') {
		$popupContent = 'chat';

	} else if ($user == 'teacher') {
		$popupContent = 'welcome';
	}
?>

<div id="popup" data-content="<?php echo $popupContent ?>">
	<button name="close"></button>

	<h1></h1>

	<?php
		include('chat.php');
		include('welcome_teacher.php')
	?>
</div>