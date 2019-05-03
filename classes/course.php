<?php
	class Course {
		private $_id;	// identifiant du cours
		private $_name;			// intitulé du cours

		// Constructeur
		public function __construct($id, $name) {
		    $this->setId($id);
		    $this->setName($name);
		}
		
		public function getId() {
			return $this->_id;
		}

		public function setId($id) {
		    $this->_id = $id;
		}

		public function getName() {
			return $this->_name;
		}

		public function setName($name) {
		    $this->_name = $name;
		}
	}
?>