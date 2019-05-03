<article id="specialitiesChecking" data-state="hidden">
    <h1>Valider les spécialités</h1>

    <?php
        include('selection.php');
    ?>

    <table id="specialitiesChecking-table">
        <thead>
            <tr>
                <th class="sortable">Numéro étudiant</th>
                <th class="sortable">Nom</th>
                <th class="sortable">Prénom</th>
                <th class="sortable">Date de la demande</th>
                <th>Validation</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>l123456</td>
                <td>Arnage</td>
                <td>Zacharie</td>
                <td>30 septembre 2019</td>
                <td>
                    <label class="switch">
                        <input type="checkbox">
                        <span class="slider round"></span>
                    </label>
                </td>
            </tr>

            <tr>
                <td>l123456</td>
                <td>Bon</td>
                <td>Jean</td>
                <td>30 septembre 2019</td>
                <td>
                    <label class="switch">
                        <input type="checkbox">
                        <span class="slider round"></span>
                    </label>
                </td>
            </tr>

            <tr>
                <td>l123456</td>
                <td>Arnage</td>
                <td>Zacharie</td>
                <td>30 septembre 2019</td>
                <td>
                    <label class="switch">
                        <input type="checkbox">
                        <span class="slider round"></span>
                    </label>
                </td>
            </tr>

            <tr>
                <td>l123456</td>
                <td>Beaufay</td>
                <td>Yéléna</td>
                <td>30 septembre 2019</td>
                <td>
                    <label class="switch">
                        <input type="checkbox">
                        <span class="slider round"></span>
                    </label>
                </td>
            </tr>
        </tbody>
    </table>

    <button>Confirmer</button>
</article>