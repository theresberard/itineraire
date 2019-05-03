<?php
	class Attempt {
		private $_id_student;		// identifiant de l'étudiant
		private $_id_exam_paper;	// identifiant du sujet
		private $_number;			// numéro de la tentative
		private $_result;			// résultat

		// Constructeur
		public function __construct($idStduent, $idExamPaper, $number, $result) {
		    $this->setIdStudent($idStduent);
		    $this->setIdExamPaper($idExamPaper);
		    $this->setNumber($number);
		    $this->setResult($result);
		}

		public function getIdStudent() {
			return $this->_id_student;
		}

		public function setIdStudent($idStduent) {
		    $this->_id_student = $idStduent;
		}

		public function getIdExamPaper() {
			return $this->_id_exam_paper;
		}

		public function setIdExamPaper($idExamPaper) {
		    $this->_id_exam_paper = $idExamPaper;
		}

		public function getNumber() {
			return $this->_number;
		}

		public function setNumber($number) {
		    $this->_number = $number;
		}

		public function getResult() {
			return $this->_result;
		}

		public function setResult($result) {
		    $this->_result = $result;
		}
	}
?>