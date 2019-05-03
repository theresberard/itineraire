/**
	Ce fichier gère la configuration des zones de sélection

	@author Thérésien Esberard
*/

/* Récupérer la référence de la zone active */

var selections = document.querySelectorAll('.selection');

var masterSelect = document.getElementById('master-select');

var fieldSelect_select = document.getElementById('field-select');
var fieldSelect;
var selected_m1Field, selected_m2Field;

var specialitySelect_select = document.getElementById('speciality-select');
var specialitySelect;
var selected_m1Speciality, selected_m2Speciality;

/* Récupération des formations existantes */
var formations;
var formations_requestURL = 'data/formations.json';
var formations_request = new XMLHttpRequest();

formations_request.open('GET', formations_requestURL);
formations_request.responseType = 'json';
formations_request.send();

formations_request.onload = function() {
    formations = formations_request.response;

    selections.forEach(function(selection) {
    	createFakeSelect(selection);
    });
}

function createFakeSelect(selection) {
	fieldSelect = fieldSelect_select.parentNode;
	specialitySelect = specialitySelect_select.parentNode;

	/* Recensement de tous les conteneurs de <select> */
	var customSelects = selection.querySelectorAll(".custom-select");

	for (var i = 0; i < customSelects.length; i++) {
		var select = customSelects[i].querySelector("select");

		/* Pour chaque <select>, on crée un nouveau <div> qui jouera le rôle d'objet sélectionné */
		var div_selected = document.createElement("DIV");
		div_selected.setAttribute("class", "select-selected");
		div_selected.innerHTML = select.options[select.selectedIndex].innerHTML;
		customSelects[i].appendChild(div_selected);

	  	/* Pour chaque <select>, on crée un div qui contiendra la liste des <option> */
	  	var div_options = document.createElement("DIV");
	  	div_options.setAttribute("class", "select-items select-hide");

	  	for (var j = 1; j < select.length; j++) {
	  		/* Pour chaque <option> dans le <select> orignal, on crée un nouveau <div> qui agira de la même façon */
	  		var div_option = newDivOption(select.options[j].value);

	  		if (i != 0) {
	  			div_option.classList.add('hidden');
	  		}

	    	div_option.addEventListener("click", function(e) {
	    		/* Lors d'un clic sur l'objet, on met à jour le <select> original ainsi que le faux <select> */
	        	var s = this.parentNode.parentNode.querySelector("select");
	        	var h = this.parentNode.previousSibling;
	        
	        	for (var k = 0; k < s.length; k++) {
	        		if (s.options[k].value == this.dataset.value) {
	            		s.selectedIndex = k;
	            		h.innerHTML = this.innerHTML;
	            		
	            		var y = this.parentNode.querySelectorAll(".same-as-selected");
	            		
	            		for (l = 0; l < y.length; l++) {
	            			y[l].classList.remove(".same-as-selected");
	            		}

	            		this.setAttribute("class", "same-as-selected");
	            		break;
	          		}
	        	}

	        	switch (s.id) {
	        		case "master-select":
	        			if (this.dataset.value == "1") {
	        				show(fieldSelect, ["M1-P DDL-FLE", "M1-D DDL-FLE", "M1 DDL-DIV"]);
	        				hide(fieldSelect, ["M2 DDL-M-FLE", "M2 DDL-DIV", "M2 DDL-MESR"]);
	        				
	        				setFieldSelect(selected_m1Field);

						} else if (this.dataset.value == "2") {
	        				hide(fieldSelect, ["M1-P DDL-FLE", "M1-D DDL-FLE", "M1 DDL-DIV"]);
	        				show(fieldSelect, ["M2 DDL-M-FLE", "M2 DDL-DIV", "M2 DDL-MESR"]);
							
	        				setFieldSelect(selected_m2Field);
						}

	        			break;

	        		case "field-select":
	        			if (masterSelect.value == "1" && selected_m1Field != this) {
	        				selected_m1Field = this;

	        			} else if (masterSelect.value == "2" && selected_m2Field != this) {
	        				selected_m2Field = this;
	        			}

	        			if (this.dataset.value == "M1 DDL-DIV") {
	        				show(specialitySelect, ["DIALL", "DIANG", "DIPLU", "DIFLEC"]);
	        				hide(specialitySelect, ["DIF", "DILI", "DIFLS"]);
	        				
	        				setSpecialitySelect(selected_m1Speciality);

						} else if (this.dataset.value == "M2 DDL-DIV") {
	        				show(specialitySelect, ["DIF", "DILI", "DIALL", "DIANG", "DIPLU", "DIFLS", "DIFLEC"]);
							
	        				setSpecialitySelect(selected_m2Speciality);

						} else {
							hide(specialitySelect, ["DIF", "DILI", "DIALL", "DIANG", "DIPLU", "DIFLS", "DIFLEC"]);
							
							setSpecialitySelect();
						}

	        			break;

	        		case "speciality-select":
	        			if (fieldSelect_select.value == "M1 DDL-DIV" && selected_m1Speciality != this) {
	        				selected_m1Speciality = this;

	        			} else if (fieldSelect_select.value == "M2 DDL-DIV" && selected_m2Speciality != this) {
	        				selected_m2Speciality = this;
	        			}

	        			break;

	        		default:
	        			break;
	        	}
	        	
	        	h.click();
	    	});
	    	
	    	div_options.appendChild(div_option);
	  	}

	  	customSelects[i].appendChild(div_options);

		div_selected.addEventListener("click", function(e) {
			/* Lors d'un clic sur un <select> pour l'ouvrir ou le fermer, les autres sont automatiquement fermés */
		    e.stopPropagation();
		    closeAllSelect(this);
		    this.nextSibling.classList.toggle("select-hide");
		    this.classList.toggle("select-arrow-active");
		});
	}
}

function newDivOption(value) {
	var divOption = document.createElement('div');
	divOption.dataset.value = value;
	divOption.innerHTML = formations[value];
	return divOption;
}

function setFieldSelect(selectedField) {
	if (selectedField) {
		selectedField.click();

	} else {
		fieldSelect.querySelector('.select-selected').innerHTML = "Choisissez";
		fieldSelect_select.selectedIndex = 0;
		setSpecialitySelect();
	}
}

function setSpecialitySelect(selectedSpeciality) {
	if (selectedSpeciality) {
		selectedSpeciality.click();

	} else {
		specialitySelect.querySelector('.select-selected').innerHTML = "Choisissez";
		specialitySelect_select.selectedIndex = 0;
	}
}

function closeAllSelect(element) {
	/* Cette fonction ferme tous les <select> du document, hormis le <select> actif */
	var arrNo = [];

	var selectItems = document.getElementsByClassName("select-items");
	var selectSelected = document.getElementsByClassName("select-selected");

	for (var i = 0; i < selectSelected.length; i++) {
    	if (element == selectSelected[i]) {
      		arrNo.push(i)
    	
    	} else {
      		selectSelected[i].classList.remove("select-arrow-active");
    	}
  	}

  	for (var j = 0; j < selectItems.length; j++) {
    	if (arrNo.indexOf(j)) {
      		selectItems[j].classList.add("select-hide");
    	}
  	}
}

/* Si l'utilisateur clique en dehors du <select>, tous les <select> seront fermés */
document.addEventListener("click", closeAllSelect);

function show(select, values) {
	for (var i = 0; i < values.length; i++) {
		select.querySelector('.select-items [data-value="' + values[i] +'"]').classList.remove('hidden');
	}
}

function hide(select, values) {
	for (var i = 0; i < values.length; i++) {
		select.querySelector('.select-items [data-value="' + values[i] +'"]').classList.add('hidden');
	}
}