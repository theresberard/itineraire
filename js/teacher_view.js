var teacherMessages;

function startTeacherView() {
	popupOpenClose();
	getWelcomePopup();

	teacherMessages = document.getElementById('teacher-messages');
	getTeacherMessages();

	getTeacherMenu();
}

/* Génération de la popup de bienvenue */
function getWelcomePopup() {
	if (popupContent == "welcome") {
        document.getElementById('welcomeTeacher').dataset.state = "visible";

        /* Fermeture de la popup lors d'un clic sur le bouton "Gérer les demandes de spécialité"
           Affichage de la zone "gestion des spécialités"                                        */
        popup.querySelector("button[name='specialities']").addEventListener("click", function() {
            teacherAct(specialitiesChecking, 'radioSpecialities');
        });

        /* Fermeture de la popup lors d'un clic sur le bouton "Gérer les demandes d'UE"
           Affichage de la zone "gestion des UE"                                         */
        popup.querySelector("button[name='TUs']").addEventListener("click", function() {
            teacherAct(tusChecking, 'radioTUs');
        });

        /* Fermeture de la popup lors d'un clic sur le bouton "Voir les messages"
           Affichage de la zone "messages"                                        */
        popup.querySelector("button[name='messages']").addEventListener("click", function() {
            teacherAct(teacherMessages, 'radioMessages');
        });
    }
}

function teacherAct(view, menuRadio) {
    var welcomeTeacher = document.getElementById('welcomeTeacher');

    popup.style.display = 'none';
    view.dataset.state = 'visible';
    document.getElementById(menuRadio).checked = true;
    popup.dataset.content = "chat";
    welcomeTeacher.dataset.state = "hidden";
}

/* Génération de la messagerie */
function getTeacherMessages() {
	teacherMessages.querySelector('.chat').dataset.state = 'visible';
	teacherMessages.querySelector('.user').dataset.state = 'visible';
}

/* Génération du menu */
function getTeacherMenu() {
	var welcomeTeacher = document.getElementById('welcome-teacher');
	var specialitiesChecking = document.getElementById('specialitiesChecking');
	var tusChecking = document.getElementById('tus-checking');
	var teacherMessages = document.getElementById('teacher-messages');

	var menuRadios = menu.querySelectorAll('input');

	var teacherViews = [specialitiesChecking, tusChecking, teacherMessages];

	for (var i = 0; i < menuRadios.length; i++) {
	    menuRadios[i].addEventListener("click", function(e) {
	        if (teacherViews[this.value].dataset.state == 'hidden') {
	            for (var j = 0; j < teacherViews.length; j++) {
	                // afficher la vue concernée par l'objet sélectionné
	                if (j == this.value) {
	                    teacherViews[j].dataset.state = 'visible';

	                // masquer les vues non concernées
	                } else {
	                    teacherViews[j].dataset.state = 'hidden';
	                }
	            }
	        }
	    });
	}
}