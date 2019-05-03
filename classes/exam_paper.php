<?php
	class ExamPaper {
		private $_id_exam_paper;	// identifiant du cours
		private $_id_belt;			// intitulé du cours
		private $_link;				// lien vers le document

		// Constructeur
		public function __construct($idExamPaper, $idBelt, $link) {
		    $this->setIdExamPaper($idExamPaper);
		    $this->setIdBelt($idBelt);
		    $this->setLink($link);
		}
		
		public function getIdExamPaper() {
			return $this->_id_exam_paper;
		}

		public function setIdExamPaper($idExamPaper) {
		    $this->_id_exam_paper = $idExamPaper;
		}

		public function getIdBelt() {
			return $this->_id_belt;
		}

		public function setIdBelt($idBelt) {
		    $this->_id_belt = $idBelt;
		}

		public function getLink() {
			return $this->_link;
		}

		public function setLink($link) {
		    $this->_link = $link;
		}
	}
?>