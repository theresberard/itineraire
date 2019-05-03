class CheckableTab extends Tab {
    /* Constructeur de CheckableTab */
    constructor(tabName, limit, tus) {
        super(tabName + limit + " UE");
        this.limit = limit;
        this.specialityTab = false;
        this.gradedTUsChoice = false;

        this.tab.classList.add("checkable");

        tus.forEach(function(tuID) {
            var label = newCheckerLabel(tuID);

            this.tab.appendChild(label);
        }, this);
    }

    /* Récupération de la limite */
    getLimit() {
        return this.limit;
    }

    /* Changement de la limite d'une CheckableTab */
    setLimit(limit) {
        h1.textContent = "Choisissez " + limit + " UE";
        this.limit = limit;
    }

    /* Récupération de l'information sur le statut de la vue en lien ou non avec la spécialité de l'étudiant */
    isSpecialityTab() {
        return this.specialityTab;
    }

    /* Modification de l'information autour du statut de la vue en lien ou non avec la spécialité de l'étudiant */
    setSpecialityTab(specialityTab) {
        this.specialityTab = specialityTab;
    }

    /* Demande pour savoir si la vue concerne le choix des UE à noter ou non */
    isGradedTUsChoice() {
        return this.gradedTUsChoice;
    }

    /* Définition de la vue concernant le choix des UE à noter ou non */
    setGradedTUsChoice(gradedTUsChoice) {
        this.gradedTUsChoice = gradedTUsChoice;
    }

    /* Récupération des cases à cocher */
    getCheckboxes() {
        return this.tab.getElementsByTagName("input");
    }

    /* Récupération des éléments cochés dans la vue */
    getCheckedCheckboxes() {
        return this.tab.querySelectorAll('input[type="checkbox"]:checked');
    }

    /* Récupération des éléments non cochés dans la vue */
    getUncheckedCheckboxes() {
        return this.tab.querySelectorAll('input[type="checkbox"]:not(:checked)');
    }
}