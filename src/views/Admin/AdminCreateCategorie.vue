<template>
    <ion-page>

        <header-component page-title="Création d'une catégorie"  page-default-back-link="/admin/categories"></header-component>

            <ion-content :fullscreen="true">

                <categorie-form :categorie_prop="categorie" @submit-form="saveCategorie"></categorie-form>

            </ion-content>

    </ion-page>
    
</template>

<script>

import HeaderComponent from "../../components/HeaderComponent.vue";

//On importe le formulaire
import CategorieForm from "../../components/CategorieForm.vue";

import { IonContent, IonPage } from '@ionic/vue';

import {useRouter} from "vue-router";
import {useStore} from "../../store";

import {afficherToast} from "../../components/utils/toast.js";

export default {
    name:"AdminCreateCategorie.vue",

    setup() {

        const store = useStore();
        const router = useRouter();

        const categorie = {
                libelle: ""
            }

        //On ajoute la catégorie à la base de données en passant par le store
        function saveCategorie(categorieEmit) {
                store.dispatch("addCategorie", categorieEmit).then ((response) => {
                    if (response.statut === 200) {
                        //Redirection vers la page d'accueil admin
                        router.push("/admin");
                        afficherToast("Categorie ajoutée avec succès", "success");
                    } else {
                        afficherToast("Erreur lors de l'ajout de la catégorie", "danger");
                    }
                });
            }
            return {saveCategorie, categorie}
        },
    
    components: {
        IonContent,
        IonPage,
        HeaderComponent,
        CategorieForm
    }
}
</script>