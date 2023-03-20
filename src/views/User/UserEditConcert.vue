<template>
    <ion-page>

        <header-component page-title="Modification d'un concert"  page-default-back-link="/user/concerts"></header-component>

            <ion-content :fullscreen="true">

                <concert-form :concert_prop="concert" @submit-form="saveConcert"></concert-form>

            </ion-content>

    </ion-page>
    
</template>

<script>

import HeaderComponent from "../../components/HeaderComponent.vue";

//On importe le formulaire
import ConcertForm from "../../components/ConcertForm.vue";

import { IonContent, IonPage } from '@ionic/vue';

import {useRouter, useRoute} from "vue-router";
import {useStore} from "../../store";

import {afficherToast} from "../../components/utils/toast.js";

export default {
    name:"UserEditConcert.vue",

    setup() {

        const store = useStore();
        const router = useRouter();

        const route = useRoute();

        //On récupère l'id du concert à modifier depuis l'url
        const concertId = parseInt(route.params.id);

        //On récupère les informations du concert en passant en paramètre son id
        const concert = store.getters.getConcertById(concertId);

        //On enregistre les modifications du concert dans la base de données en passant par le store
        function saveConcert(concertEmit) {
            store.dispatch("editConcert", concertEmit).then ((response) => {
                if (response.statut === 200) {
                    //Redirection vers la page de gestion des concerts
                    router.push("/user/concerts");
                    afficherToast("Concert modifié avec succès", "success");
                } else {
                    afficherToast("Erreur lors de la modification du concert", "danger");
                }
            });
        }
    return {saveConcert, concert}
},

    components: {
        HeaderComponent, IonContent, IonPage, ConcertForm
    }
}

</script>

<style scoped>

</style>