/* Ce fichier gère les différentes vues sur mobile

@author Thérésien Esberard */
var form = document.getElementsByTagName('form')[0];        // code 0
var chat = main.getElementsByClassName('chat')[0];   // code 1
var user = main.getElementsByClassName('user')[0];          // code 2
var more = document.getElementById('more');                 // code 3

var footerButtons = document.getElementById('footer-buttons');
var footerButtons_radios = footerButtons.getElementsByTagName('input');

// liste des vues possibles
var views = [form, chat, user, more];

function startStudentView() {
    for (var i = 0; i < footerButtons_radios.length; i++) {
        footerButtons_radios[i].addEventListener("click", function(e) {
            if (views[this.value].dataset.state == 'hidden') {
                for (var j = 0; j < views.length; j++) {
                    // afficher la vue concernée par l'objet sélectionné
                    if (j == this.value) {
                        views[j].dataset.state = 'visible';

                    // masquer les vues non concernées
                    } else {
                        views[j].dataset.state = 'hidden';
                    }
                }
            }
        });
    }

    init();
    showTab(currentTab);
}