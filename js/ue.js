/*
Cette page concerne le traitement des UE dans l'application.

Vocabulaire
    field       → parcours
    TU              → UE
    mandatory TUs   → UE obligatoires
    optional TUs    → UE optionnelles
*/

/* Récupération de l'identité de l'étudiant */
var field = "M2 DDL-DIV";
var speciality = "DILI";

var tabs = [];

var tuForm = document.getElementById("tuForm");

var previous_next = document.getElementById("previous-next");
var info = document.getElementById('info');
var nextButton = document.getElementById("nextButton");
var checkedCheckboxesNumber = document.getElementById('checkedCheckboxesNumber');
var steps = document.getElementById("steps");

var tusList, fields;
var allocatedTUs = [];
var mandatoryTUs = [];

var checked = [];
var checkedToGrade = [];

/* Récupération des libellés des UE */
var tus_requestURL = 'data/ue.json';
var tus_request = new XMLHttpRequest();

tus_request.open('GET', tus_requestURL);
tus_request.responseType = 'json';
tus_request.send();

tus_request.onload = function() {
    tusList = tus_request.response;
}

var fields_requestURL = 'data/parcours.json';
var fields_request = new XMLHttpRequest();

fields_request.open('GET', fields_requestURL);
fields_request.responseType = 'json';
fields_request.send();

fields_request.onload = function() {
    fields = fields_request.response;
}

function init() {
    if ((field == "M1 DDL-DIV" || field == "M2 DDL-DIV") && speciality == "") {
        getSpecialitiesTab();
        //getConfirmationTab();
        getSteps();

    } else {
        getWelcomeTab();
        getMandatoryTUs(fields[field]['mandatory_TUs']);
        getOptionalTUs(fields[field]['optional_TUs']);
        getGradedTUsChoiceTab();
        getRecapTab();
        getSteps();
    }
}

/* Affichage des spécialités à choisir pour les parcours DDL-DIV */
function getSpecialitiesTab() {
    var tab = new Tab("Indiquez votre spécialité");

    var ul = document.createElement('ul');

    if (field == "M1 DDL-DIV") {
        ul.appendChild(newSpecialityButton("DIANG"));
        ul.appendChild(newSpecialityButton("DIALL"));
        ul.appendChild(newSpecialityButton("DIPLU"));
        ul.appendChild(newSpecialityButton("DIFLEC"));

    } else if (field == "M2 DDL-DIV") {
        ul.appendChild(newSpecialityButton("DIF"));
        ul.appendChild(newSpecialityButton("DILI"));
        ul.appendChild(newSpecialityButton("DIALL"));
        ul.appendChild(newSpecialityButton("DIANG"));
        ul.appendChild(newSpecialityButton("DIPLU"));
        ul.appendChild(newSpecialityButton("DIFLS"));
        ul.appendChild(newSpecialityButton("DIFLEC"));
    }

    tab.setSpecialityChoiceTab(true);
    tab.add(ul);
    tab.addClass('specialityChoice');
}

/* Création d'un bouton de spécialité */
function newSpecialityButton(text) {
    var specialities = {
        "DIF": "Diffusion, ingénierie et conseil",
        "DILI": "TICE et numérique éducatif",
        "DIALL": "Didactique de l'allemand",
        "DIANG": "Didactique de l'anglais",
        "DIPLU": "Didactique du plurilinguïsme",
        "DIFLS": "Didactique du français langue seconde",
        "DIFLEC": "Didactique du français langue de l'école"
    };

    var li = document.createElement('li');

    var radio = document.createElement('input');
    radio.type = 'radio';
    radio.id = 'radio' + text;
    radio.name = 'speciality';
    radio.value = text;

    radio.addEventListener('change', function() {
        nextButton.disabled = false;
    });

    li.appendChild(radio);

    var label = document.createElement('label');
    label.htmlFor = 'radio' + text;
    label.innerHTML = specialities[text];
    li.appendChild(label);

    return li;
}

/* Affichage de la vue de bienvenue */
function getWelcomeTab() {
    var tab = new Tab("Bienvenue !");

    tab.addID("welcome");

    var p = document.createElement('p');

    p.innerHTML = "<p>Vous allez procéder à la saisie des UE que vous comptez suivre cette année. Le choix s'effectuera en plusieurs étapes, en fonction de votre parcours.</p><p>Un doute ? À tout moment il vous sera possible d'échanger avec votre responsable pour dialoguer autour de vos choix en appuyant sur le bouton « Messages ».</p>";

    tab.add(p);
}

/* Affichage de la liste des UE obligatoires pour l'étudiant */
function getMandatoryTUs(mTUs) {
    var tab = new Tab("Vos UE obligatoires");

    for (var section in mTUs) {
        var tus = mTUs[section];

        switch(section) {
            case "Y":
                getTUs(tus, tab);
                addTUs(mandatoryTUs, tus);
                break;

            case "S1":
                var h2 = document.createElement('h2');
                h2.textContent = "Semestre 1";
                tab.appendChild(h2);

                getTUs(tus, tab);
                addTUs(mandatoryTUs, tus);
                break;

            case "S2":
                var h2 = document.createElement('h2');
                h2.textContent = "Semestre 2";
                tab.appendChild(h2);

                getTUs(tus, tab);
                addTUs(mandatoryTUs, tus);
                break;

            case speciality:
                var h2 = document.createElement('h2');
                h2.textContent = "Spécialité";
                tab.add(h2);

                getTUs(tus, tab);
                addTUs(mandatoryTUs, tus);
                break;

            default: break;
        }
    }

    mandatoryTUs.sort();
    allocatedTUs = mandatoryTUs.slice();
}

/* Afficher la liste des UE à choisir par l'étudiant */
function getOptionalTUs(optionalTUs) {
    var remainingTUs = [];

    for (var section in optionalTUs) {
        var limit = optionalTUs[section][0];
        var tus = optionalTUs[section][1];

        switch(section) {
            case "Y":
                var tab = new CheckableTab("Choisissez ", limit, tus);
                addTUs(allocatedTUs, tus);
                break;

            case "S2":
                var tab = new CheckableTab("Semestre 2 : choisissez ", limit, tus);
                addTUs(allocatedTUs, tus);
                break;

            case "DDL":
                var tab = new CheckableTab("Module : choisissez ", limit, tus);
                addTUs(allocatedTUs, tus);
                break;

            case speciality:
                if (field == "M2 DDL-DIV") {
                    text = "Spécialité : choisissez au moins ";

                } else {
                    var text = "Spécialité : choisissez ";
                }

                var tab = new CheckableTab(text, limit, tus);
                tab.setSpecialityTab(true);

                addTUs(allocatedTUs, tus);
                break;

            default:
                addTUs(remainingTUs, tus);
                break;
        }
    }
    
    // S'il reste des éléments non classables à sélectionner, on les place ici
    if (remainingTUs.length > 0) {
        // Élimination des doublons
        remainingTUs.forEach(function(tu) {
            if (allocatedTUs.includes(tu)) {
                remainingTUs.splice(remainingTUs.indexOf(tu), 1);
            }
        });

        // Dédoublonnage
        remainingTUs = [...new Set(remainingTUs)];

        // Tri des ID dans l'ordre
        remainingTUs.sort();

        var tab = new CheckableTab("Choisissez vos UE", 0, remainingTUs);
    }
}

function addTUs(array, tus) {
    for (var i in tus) {
        array.push(tus[i]);
    }
}

function getGradedTUsChoiceTab() {
    if (field == "M2 DDL-M-FLE" || field == "M2 DDL-DIV" || field == "M2-DDL-MESR") {
        var tab = new CheckableTab("", 3, []);
        tab.setGradedTUsChoice(true);
    }
}

function getRecapTab() {
    var tab = new Tab("Récapitulatif");
    tab.setRecapTab(true);
}

/* Afficher les bulles d'étape */
function getSteps() {
    tabs.forEach(tab => newStep());
}

function newStep() {
    var step = document.createElement('span');
    step.classList.add('step');
    steps.appendChild(step);
}

/* Création d'un nouveau label cocheur (cliquer sur le label cochera la case) */
function newCheckerLabel(tuID) {
    var tab = tabs[currentTab];

    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = tuID;
    checkbox.name = "tus";
    checkbox.value = tuID;

    var span = document.createElement('span');
    span.innerHTML = getTU(tuID);

    var label = document.createElement('label');
    label.for = tuID;
    label.appendChild(span);
    label.appendChild(checkbox);

    checkbox.addEventListener('click', function() {
        if (this.checked) {
            // coloration du label
            label.classList.add("selected");

            // ajout de l'UE au catalogue
            if (!tab.isGradedTUsChoice)
                checked.push(tuID);

            else
                checkedToGrade.push(tuID);

        } else {
            // décoloration du label
            label.classList.remove("selected");

            // retrait de l'UE au catalogue
            if (!tab.isGradedTUsChoice)
                checked.splice(checked.indexOf(tuID), 1);

            else
                checkedToGrade.splice(checkedToGrade.indexOf(tuID), 1);
        }

        updateCheckedCheckboxesNumber();
    });

    return label;
}

/* Affichage d'une liste d'UE */
function getTUs(tus, tab) {
    var ul = document.createElement('ul');

    for (var tu in tus) {
        var li = document.createElement('li');
        li.innerHTML = getTU(tus[tu]);
        ul.appendChild(li);
    }

    tab.add(ul);
}

var currentTab = 0; // Current tab is set to be the first tab (0)
var lastTab = 0;

/* Affichage d'une vue */
function showTab(n) {
    var h1 = tuForm.getElementsByTagName('h1')[0];

    var tab = tabs[n];

    // Affichage de la vue
    tab.show();

    var previousTab = tabs[currentTab - 1];
    var specialityTabBefore = false;

    // Écriture du titre
    h1.textContent = tab.getTabName();

    // Affichage de la mention "UE sélectionnées" si la vue incite à faire une sélection
    if (tab instanceof CheckableTab) {
        if (field == "M2 DDL-DIV") {
            var x = 0;

            if (previousTab instanceof CheckableTab) {
                // Vérification du statut de la vue à partir de la précédente
                specialityTabBefore = previousTab.isSpecialityTab();
            }

            var limit = tab.getLimit();

            if (!tab.isGradedTUsChoice()) {
                if (speciality == "DIF" && specialityTabBefore) {
                    x = previousTab.getCheckedCheckboxes().length;
                    tab.setLimit(5 - x);

                } else if ((speciality == "DILI" || speciality == "DIALL" || speciality == "DIANG" || speciality == "DIPLU")
                    && specialityTabBefore) {

                    x = previousTab.getCheckedCheckboxes().length;
                    tab.setLimit(6 - x);

                } else if (speciality == "DIFLS") {
                    tab.setLimit(2);

                } else if (speciality == "DIFLEC") {
                    tab.setLimit(3);
                }

            } else if (tab.isGradedTUsChoice()) {
                h1.textContent = 'Choisissez 3 UE à faire noter';

                if (lastTab < currentTab) {
                    tab.removeChildren();

                    var tuIDs = mandatoryTUs.concat(checked);
                    tuIDs.sort();

                    tuIDs.forEach(function(tuID) {
                        if (tuID != "stage" && tuID != "mémoire") {
                            var label = newCheckerLabel(tuID);
                            tab.add(label);
                        }
                    });
                }

                // Affichage du nombre d'UE sélectionnées
                info.style.display = "inline";
                updateCheckedCheckboxesNumber();
            }

            // Affichage du nombre d'UE sélectionnées
            info.style.display = "inline";
            updateCheckedCheckboxesNumber();
        }

    } else {
        if (tab.isRecapTab()) {
            // Vider la vue pour éviter les doublons
            tab.removeChildren();

            // S'il y a eu un choix à faire, on affiche d'abord les choix effectués
            if (previousTab instanceof CheckableTab && previousTab.isGradedTUsChoice()) {
                // Affichage des UE notées
                var gradedTUs_h2 = newH2('UE notées');
                tab.add(gradedTUs_h2);

                var gradedTUsChoice = document.createElement('ul');

                // Affichage des UE notées choisies par l'étudiant
                checkedElements = Array.from(previousTab.getCheckedCheckboxes());
                checkedElements.forEach(function(input) {
                    var li = newTU_li(input.value);
                    gradedTUsChoice.appendChild(li);
                });

                // Affichage des UE notées qui sont imposées à l'étudiant
                var imposedMandatoryTUs = ["stage", "mémoire"];
                imposedMandatoryTUs.forEach(function(tu) {
                    if (mandatoryTUs.includes(tu)) {
                        var li = newTU_li(tu);
                        gradedTUsChoice.appendChild(li);
                    }
                });

                tab.add(gradedTUsChoice);

                // Affichage des UE non notées
                var notGradedTUs_h2 = newH2('UE non notées');
                tab.add(notGradedTUs_h2);

                var notGradedTUsChoice = document.createElement('ul');

                // Affichage des UE notées choisies par l'étudiant
                var uncheckedElements = Array.from(previousTab.getUncheckedCheckboxes());
                uncheckedElements.forEach(function(input) {
                    var li = newTU_li(input.value);
                    notGradedTUsChoice.appendChild(li);
                });

                tab.add(notGradedTUsChoice);

            // Si aucun choix d'UE à noter n'a été demandé, on affiche les UE obligatoires et choisies
            } else {
                var ul = document.createElement('ul');

                mandatoryTUs.forEach(function(tuID) {
                    var li = newTU_li(tuID);
                    ul.appendChild(li);
                });

                // Récupération des éléments cochés
                var checkedElements = tuForm.querySelectorAll('input[type="checkbox"]:checked');
                checkedElements.forEach(function(input) {
                    var li = newTU_li(input.value);
                    ul.appendChild(li);
                });

                tab.add(ul);
            }
        } else if (tab.isSpecialityChoiceTab()) {
            nextButton.disabled = true;
        }

        info.style.display = "none";
    }

    // Gestion des boutons "précédent" / "suivant"
    if (n == 0 && !tab.isSpecialityChoiceTab()) {
        previous_next.style.justifyContent = "center";
        document.getElementById("previousButton").style.display = "none";
        nextButton.innerHTML = "Commencer";

    } else if (tab.isSpecialityChoiceTab()) {
        previous_next.style.justifyContent = "center";
        document.getElementById("previousButton").style.display = "none";
        nextButton.innerHTML = "Valider";

    } else if (n == (tabs.length - 1)) {
        nextButton.innerHTML = "Soumettre";
    
    } else {
        previous_next.style.justifyContent = "space-between";
        document.getElementById("previousButton").style.display = "inline-block";
        nextButton.innerHTML = "Suivant";
    }

    // Affichage de l'étape correspondante
    fixStepIndicator(n);

    // Aller en haut de la page
    topFunction();
}

function nextPrev(n) {
    // Récupérer la vue actuelle
    var tab = tabs[currentTab];

    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;

    // Hide the current tab:
    tab.hide();

    // Retenir la vue précédente
    lastTab = currentTab;

    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;

    // if you have reached the end of the form... :
    if (currentTab >= tabs.length) {
        //...the form gets submitted:
        document.getElementById("tuForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

/* Vérification du bon accomplissement d'une étape */
function validateForm() {
    var tab, i, valid = true;

    tab = tabs[currentTab];

    if (tab instanceof CheckableTab) {
        var checkboxes = tab.getCheckboxes();
        var limit = tab.getLimit();

        // Vérification du nombre de cases cochées
        var checkedCheckboxesNumber = tabs[currentTab].getCheckedCheckboxes().length;

        if (checkedCheckboxesNumber < limit || (checkedCheckboxesNumber > limit && !tab.isSpecialityTab())) {
            showError();
            valid = false;
        }
    }

    // Si le statut est valide, marquer l'étape comme validée
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }

    // Envoi du statut valide en retour
    return valid;
}

function showError() {
    // Ajout de la classe permettant l'animation du texte
    info.classList.add('error');
              
    // Retrait de la classe après l'animation
    setTimeout(function() {
        info.classList.remove('error');
    }, 500);
}

function updateCheckedCheckboxesNumber() {
    checkedCheckboxesNumber.textContent = tabs[currentTab].getCheckedCheckboxes().length;
}

/* Gestion de l'indicateur d'étape */
function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");

    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    
    //... and adds the "active" class to the current step:
    x[n].className += " active";
}

/* Créer un titre 2 */
function newH2(text) {
    var h2 = document.createElement('h2');
    h2.textContent = text;
    return h2;
}

/* Créer un élément de liste */
function newTU_li(tuID) {
    var li = document.createElement('li');
    li.innerHTML = getTU(tuID);
    return li;
}

/* Afficher un UE pour une liste */
function getTU(tuID) {
    var tuName = tusList[tuID];

    return '<div class="tu-id">' + tuID + '</div> ' + tuName;
}

/* Aller en haut de page */
function topFunction() {
    document.getElementsByTagName('main')[0].scrollTop = 0;
}