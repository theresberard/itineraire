var popupChat = popup.querySelector('.chat');
var popupContent = popup.dataset.content;

function popupOpenClose() {
    /* Add div inside popup for layout if one doesn't exist */
    if (!document.querySelector(".wrapper")) {
        popup.innerHTML = "<div class='wrapper'>" + popup.innerHTML + "</div>";
    }
    
    /* Ouverture de la popup */
    popup.style.display = "flex";

    if (popupContent == "chat") {
        popupChat.dataset.state = "visible";

        /* Fermeture de la popup lorsque l'utilisateur clique sur l'arrière-plan */
        popup.addEventListener("click", function(e) {
            if ( e.target == this ) {
                if ($(popup).is(':visible')) {
                    $(popup).hide();
                }
            }
        });

        /* Fermeture de la popup lorsque l'utilisateur appuie sur échap */
        document.addEventListener('keydown', function(e) {
            if (popup.style.display != 'none' && e.repeat === false && e.which === 27) {
                popup.style.display = 'none';
            }
        });

        /* Fermeture de la popup lors d'un clic sur le bouton "fermer" */
        popup.querySelector("button[name='close']").addEventListener("click", function() {
            popup.style.display = 'none';
        });
    }
}

document.querySelectorAll("[data-action='sendMessage']").forEach(function(button) {
    button.addEventListener("click", function() {
        popupOpenClose();
    });
});