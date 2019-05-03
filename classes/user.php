<?php
	abstract class User {
		private $_id;        	// identifiant
		private $_number;		// numéro
		private $_last_name;    // nom
		private $_first_name;	// prénom
		private $_alias;		// pseudonyme
		private $_chosen_name;	// nom choisi

		// Constructeur
		public function __construct($id, $number, $lastName, $firstName, $alias, $chosenName) {
		    $this->setId($id);
		    $this->setNumber($number);
		    $this->setLastName($lastName);
		    $this->setFirstName($firstName);
		    $this->setAlias($alias);
		    $this->setChosenName($chosenName);
		}

		public function getId() {
			return $this->_id;
		}

		public function setId($id) {
		    $this->_id = $id;
		}

		public function getNumber() {
			return $this->_number;
		}

		public function setNumber($number) {
		    $this->_number = $number;
		}

		public function getLastName() {
			return $this->_last_name;
		}

		public function setLastName($lastName) {
		    $this->_last_name = $lastName;
		}

		public function getFirstName() {
			return $this->_first_name;
		}

		public function setFirstName($firstName) {
		    $this->_first_name = $firstName;
		}

		public function getAlias() {
			return $this->_alias;
		}

		public function setAlias($alias) {
		    $this->_alias = $alias;
		}

		public function getChosenName() {
			switch ($this->_chosen_name) {
				case 'name':
					return $this->getFirstName().' '.$this->getLastName();
					break;
				
				case 'number':
					return $this->getNumber();
					break;

				case 'alias':
					return $this->getAlias();
					break;
			}
		}

		public function setChosenName($chosenName) {
		    $this->_chosen_name = $chosenName;
		}
	}

	final class Student extends User {
		private $_year;	// promotion

		function __construct($id, $number, $lastName, $firstName, $alias, $chosenName, $year) {
			parent::__construct($id, $number, $lastName, $firstName, $alias, $chosenName);
			$this->setYear($year);
		}

		public function getYear() {
			return $this->_year;
		}

		public function setYear($year) {
		    $this->_year = $year;
		}
	}

	class Teacher extends User {
		function __construct($id, $number, $lastName, $firstName, $alias, $status, $chosenName) {
			parent::__construct($id, $number, $lastName, $firstName, $alias, $status, $chosenName);
		}
	}

	final class Admin extends Teacher {
		function __construct($id, $number, $lastName, $firstName, $alias, $status, $chosenName) {
			parent::__construct($id, $number, $lastName, $firstName, $alias, $status, $chosenName);
		}
	}
?>