<?php
	class Belt {
		private $_id_belt;		// identifiant de la ceinture
		private $_id_course;	// identifiant du cours
		private $_color;		// couleur
		private $_description;	// résultat

		// Constructeur
		public function __construct($idBelt, $idCourse, $color, $description) {
		    $this->setIdBelt($idBelt);
		    $this->setIdCourse($idCourse);
		    $this->setColor($color);
		    $this->setDescription($description);
		}

		public function getIdBelt() {
			return $this->_id_belt;
		}

		public function setIdBelt($idBelt) {
		    $this->_id_belt = $idBelt;
		}

		public function getIdCourse() {
			return $this->_id_course;
		}

		public function setIdCourse($idCourse) {
		    $this->_id_course = $idCourse;
		}

		public function getColor() {
			return $this->_color;
		}

		public function setColor($color) {
		    $this->_color = $color;
		}

		public function getDescription() {
			return $this->_description;
		}

		public function setDescription($description) {
		    $this->_description = $description;
		}
	}
?>