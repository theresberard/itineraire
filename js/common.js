/**
    Ce fichier concerne les éléments communs aux différentes interfaces

    @author Thérésien Esberard
*/

/* Variables globales */
var main = document.querySelector('main');

var popup = document.getElementById('popup');

var menu = document.getElementById('menu');

var chat = document.getElementById('chat');
var welcomeTeacher = document.getElementById('welcomeTeacher');
var specialitiesChecking = document.getElementById('specialitiesChecking');
var tusChecking = document.getElementById('tus-checking');

var userType = 'student';

/* Vues */
window.addEventListener('load', function () {
    if (userType == "student") {
        startStudentView(); // fonction implémentée dans student_view.js

    } else if (userType == "teacher") {
        startTeacherView(); // fonction implémentée dans teacher_view.js
    }
})

/* Configuration des colonnes de tri */
document.querySelectorAll('.sortable').forEach(function(sortable) {
    sortable.addEventListener('click', function(e) {
        sortTable(this);        
    });
});

/* Tri des données d'un tableau selon une colonne */
function sortTable(th) {
    var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;

    // récupération du tableau
    var table = th.parentNode;

    while(table.tagName != 'TABLE') {
        table = table.parentNode;
    }

    // récupération du numéro de colonne
    var column = th.cellIndex;

    switching = true;

    // Positionner le tri en ascendant
    dir = "asc";

    /* Boucler tant qu'il y a des échanges */
    while (switching) {
        // Débuter en déclarant qu'il n'y a pas d'échange à faire
        switching = false;

        rows = table.rows;

        /* Explorer toutes les lignes du tableau, sauf la première (en-tête) */
        for (i = 1; i < (rows.length - 1); i++) {
            // débuter en indiquant aucun échanger à effectuer
            shouldSwitch = false;

            /* Récupération des deux premiers éléments succesifs à comparer */
            x = rows[i].getElementsByTagName("TD")[column];
            y = rows[i + 1].getElementsByTagName("TD")[column];
        
            /* Vérification de la nécessité ou non d'un échange de place entre les lignes */
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // si oui, indiquer l'échange et quitter la boucle
                    shouldSwitch = true;
                    break;
                }

            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // si oui, indiquer l'échange et quitter la boucle
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            /* Procéder à l'échange et l'indiquer */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            
            // Incrémentation du compteur à chaque échange
            switchcount ++;

        } else {
            /* Si aucun échange n'a été fait et que le tri est déclaré ascendant, changer la direction du tri et reprendre la boucle */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }

    console.log(th.className);

    /* Gestion de la flèche */
    if (dir == "asc") {
        th.classList.add('asc');
        th.classList.remove('desc');

    } else if(dir =="desc") {
        th.classList.add('desc');
        th.classList.remove('asc');
    }
}

/* Boîtes déroulantes */
document.querySelectorAll(".collapsible").forEach(function(collapsible) {
    collapsible.addEventListener("click", function() {
        this.classList.toggle("collapsed");

        var content = this.nextElementSibling;

        if (content.style.maxHeight){
            content.style.maxHeight = null;

        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    })
});