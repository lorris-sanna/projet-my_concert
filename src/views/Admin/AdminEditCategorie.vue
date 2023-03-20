<template>
    <ion-page>

        <header-component page-title="Modification d'une catégorie"  page-default-back-link="/admin/categories"></header-component>

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

import {useRouter, useRoute} from "vue-router";
import {useStore} from "../../store";

import {afficherToast} from "../../components/utils/toast.js";

export default {
    name:"AdminEditCategorie.vue",

    setup() {

        const store = useStore();
        const router = useRouter();

        const route = useRoute();

        //On récupère l'id de la catégorie à modifier depuis l'url
        const categorieId = parseInt(route.params.id);

        //On récupère les informations de la catégorie en passant en paramètre son id
        const categorie = store.getters.getCategorieById(categorieId);

        //On enregistre les modifications de la catégorie dans la base de données en passant par le store
        function saveCategorie(categorieEmit) {
            store.dispatch("editCategorie", categorieEmit).then ((response) => {
                if (response.statut === 200) {
                    //Redirection vers la page de gestion des catégories
                    router.push("/admin/categories");
                    afficherToast("Catégorie modifiée avec succès", "success");
                } else {
                    afficherToast("Erreur lors de la modification de la catégorie", "danger");
                }
            });
        }
    return {saveCategorie, categorie}
},

    components: {
        HeaderComponent, IonContent, IonPage, CategorieForm
    }
}

</script>

<style scoped>

</style>