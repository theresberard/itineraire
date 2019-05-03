class Tab {
/* Constructeur de Tab */
	constructor(tabName) {
		this.tab = document.createElement('div');
		this.tab.classList.add("tab");

		this.tabName = tabName;

		this.recapTab = false;
		this.specialityChoiceTab = false;

	    tuForm.insertBefore(this.tab, previous_next);
	    tabs.push(this);
	};

	/* Récupération du nom de la vue */
	getTabName() {
		return this.tabName;
	}

	/* Récupération de l'information sur le statut de la vue en tant que récapitulatif */
    isRecapTab() {
        return this.recapTab;
    }

    /* Modification de l'information sur le statut de la vue en tant que récapitulatif */
    setRecapTab(recapTab) {
        this.recapTab = recapTab;
    }

	/* Ajout d'un élément dans la vue */
	add(element) {
		this.tab.appendChild(element);
	};

	/* Ajout d'un ID pour la vue */
	addID(id) {
		this.tab.id = id;
	}

	/* Ajout d'une classe pour la vue */
	addClass(element) {
		this.tab.classList.add(element);
	};

	/* Affichage d'une vue */
	show() {
		this.tab.style.display = "block";
	}

	/* Masque d'une vue */
	hide() {
		this.tab.style.display = "none";
	}

	/* Supprimer tous les enfants de la vue */
	removeChildren() {
		while (this.tab.firstChild) {
			this.tab.removeChild(this.tab.firstChild);
		}
	}

	/* Récupération de l'information sur le statut de la vue en tant que choix d'une spécialité */
    isSpecialityChoiceTab() {
        return this.specialityChoiceTab;
    }

    /* Modification de l'information autour du statut de la vue en tant que choix d'une spécialité */
    setSpecialityChoiceTab(specialityChoiceTab) {
        this.specialityChoiceTab = specialityChoiceTab;
    }
}